import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if ((session.user as { role?: string }).role !== "admin") {
      return NextResponse.json(
        { error: "Access denied. Admin role required." },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const planType = searchParams.get("planType") || "all";
    const status = searchParams.get("status") || "all";

    // Build query for paid users
    const query: Record<string, unknown> = {
      paidUser: true, // Only get paid users
    };

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (planType !== "all") {
      query.planType = planType;
    }

    if (status !== "all") {
      query.subscriptionStatus = status;
    }

    // Get total count for pagination
    const total = await User.countDocuments(query);

    // Get users with pagination
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select(
        "firstName lastName email paidUser subscriptionStatus planType createdAt lastActiveAt"
      );

    // Get stats
    const stats = {
      total: await User.countDocuments({ paidUser: true }),
      active: await User.countDocuments({
        paidUser: true,
        subscriptionStatus: { $in: ["active", "professional", "enterprise"] },
      }),
      professional: await User.countDocuments({
        paidUser: true,
        planType: "professional",
      }),
      enterprise: await User.countDocuments({
        paidUser: true,
        planType: "enterprise",
      }),
      thisWeek: await User.countDocuments({
        paidUser: true,
        createdAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      }),
      thisMonth: await User.countDocuments({
        paidUser: true,
        createdAt: {
          $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      }),
    };

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats,
    });
  } catch (error) {
    console.error("Error fetching paid users:", error);
    return NextResponse.json(
      { error: "Failed to fetch paid users" },
      { status: 500 }
    );
  }
}

// Update user's paid status
export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if ((session.user as { role?: string }).role !== "admin") {
      return NextResponse.json(
        { error: "Access denied. Admin role required." },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const { userId, paidUser, planType, subscriptionStatus } =
      await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Build update object
    const updateData: Record<string, unknown> = {};

    if (typeof paidUser === "boolean") {
      updateData.paidUser = paidUser;
    }

    if (planType) {
      updateData.planType = planType;
    }

    if (subscriptionStatus) {
      updateData.subscriptionStatus = subscriptionStatus;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("firstName lastName email paidUser subscriptionStatus planType");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `User ${
        paidUser ? "upgraded to paid" : "downgraded to free"
      } successfully`,
      user,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "Failed to update user status" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import Newsletter from "@/lib/models/Newsletter";
import connectToDatabase from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
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
    const status = searchParams.get("status") || "all"; // all, active, inactive

    // Build query
    const query: Record<string, unknown> = {};

    if (search) {
      query.email = { $regex: search, $options: "i" };
    }

    if (status === "active") {
      query.isActive = true;
    } else if (status === "inactive") {
      query.isActive = false;
    }

    // Get total count for pagination
    const total = await Newsletter.countDocuments(query);

    // Get subscribers with pagination
    const subscribers = await Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("email subscribedAt isActive source");

    // Get stats
    const stats = {
      total: await Newsletter.countDocuments(),
      active: await Newsletter.countDocuments({ isActive: true }),
      inactive: await Newsletter.countDocuments({ isActive: false }),
      thisWeek: await Newsletter.countDocuments({
        subscribedAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        isActive: true,
      }),
      thisMonth: await Newsletter.countDocuments({
        subscribedAt: {
          $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
        isActive: true,
      }),
    };

    return NextResponse.json({
      subscribers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats,
    });
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter subscribers" },
      { status: 500 }
    );
  }
}

// Update subscriber status (activate/deactivate)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied. Admin role required." },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const { email, isActive } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const subscriber = await Newsletter.findOneAndUpdate(
      { email: email.toLowerCase() },
      { isActive },
      { new: true }
    );

    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Subscriber ${
        isActive ? "activated" : "deactivated"
      } successfully`,
      subscriber,
    });
  } catch (error) {
    console.error("Error updating subscriber status:", error);
    return NextResponse.json(
      { error: "Failed to update subscriber status" },
      { status: 500 }
    );
  }
}

// Delete subscriber
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied. Admin role required." },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const deletedSubscriber = await Newsletter.findOneAndDelete({
      email: email.toLowerCase(),
    });

    if (!deletedSubscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Subscriber deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 }
    );
  }
}

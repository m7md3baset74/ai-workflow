import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongodb";

// Handle subscription purchases
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { planType } = await request.json();

    if (!planType) {
      return NextResponse.json(
        { error: "Plan type is required" },
        { status: 400 }
      );
    }

    // Validate plan types
    const validPlans = ["free", "professional", "business", "enterprise"];
    if (!validPlans.includes(planType)) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    // Find and update user
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          paidUser: planType !== "free", // Set to true for paid plans
          planType,
          subscriptionStatus: planType === "free" ? "free" : planType, // Use planType as status for paid plans
          ...(planType !== "free" && {
            subscriptionStartDate: new Date(),
            // Clear cancellation data when upgrading
            cancelledAt: null,
            cancellationReason: null,
          }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully ${
        planType === "free" ? "downgraded to" : "upgraded to"
      } ${planType} plan`,
      user: {
        id: user._id,
        email: user.email,
        paidUser: user.paidUser,
        planType: user.planType,
        subscriptionStatus: user.subscriptionStatus,
      },
    });
  } catch (error) {
    console.error("Error processing subscription:", error);
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}

// Get current user's subscription status
export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email }).select(
      "paidUser planType subscriptionStatus"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      paidUser: user.paidUser || false,
      planType: user.planType || "free",
      subscriptionStatus: user.subscriptionStatus || "free",
    });
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription status" },
      { status: 500 }
    );
  }
}

// Handle subscription cancellation
export async function DELETE(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { cancellationReason = "User requested cancellation" } =
      (await request.json().catch(() => ({}))) || {};

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          paidUser: false,
          planType: "free",
          subscriptionStatus: "cancelled",
          cancelledAt: new Date(),
          cancellationReason,
        },
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Subscription cancelled successfully",
      user: {
        id: user._id,
        email: user.email,
        paidUser: user.paidUser,
        planType: user.planType,
        subscriptionStatus: user.subscriptionStatus,
      },
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}

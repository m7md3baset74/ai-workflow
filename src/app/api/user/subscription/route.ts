import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import User from "@/lib/models/User";
import connectDB from "@/lib/mongodb";
import type { Session } from "next-auth";

// Disable static generation for this API route
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = (await getServerSession(authOptions)) as Session | null;

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Find user with subscription details
    const user = await User.findOne({ email: session.user.email }).select(
      "paidUser subscriptionStatus stripeCustomerId subscriptionId subscriptionStartDate subscriptionEndDate planType"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      paidUser: user.paidUser || false,
      subscriptionStatus: user.subscriptionStatus || "free",
      planType: user.planType || "free",
      subscriptionStartDate: user.subscriptionStartDate || null,
      subscriptionEndDate: user.subscriptionEndDate || null,
      hasStripeCustomer: !!user.stripeCustomerId,
      hasActiveSubscription: !!user.subscriptionId,
    });
  } catch (error) {
    console.error("Subscription status error:", error);
    return NextResponse.json(
      { error: "Failed to get subscription status" },
      { status: 500 }
    );
  }
}

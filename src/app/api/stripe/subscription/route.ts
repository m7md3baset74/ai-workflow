import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If user doesn't have a subscription ID, return null
    if (!user.subscriptionId) {
      return NextResponse.json({ subscription: null });
    }

    try {
      // For now, return mock data based on user's plan type
      // In a real implementation, you would fetch from Stripe
      const now = Math.floor(Date.now() / 1000);
      const planPricing = {
        professional: { amount: 2900, currency: "usd" },
        business: { amount: 7900, currency: "usd" },
        enterprise: { amount: 19900, currency: "usd" },
      };

      const userPlan = user.planType || "professional";
      const pricing =
        planPricing[userPlan as keyof typeof planPricing] ||
        planPricing.professional;

      return NextResponse.json({
        subscription: {
          id: user.subscriptionId,
          status: "active",
          current_period_start: now - 30 * 24 * 60 * 60, // 30 days ago
          current_period_end: now + 30 * 24 * 60 * 60, // 30 days from now
          plan: {
            amount: pricing.amount,
            currency: pricing.currency,
            interval: "month",
            nickname: `${
              userPlan.charAt(0).toUpperCase() + userPlan.slice(1)
            } Plan`,
          },
          customer: {
            email: session.user.email,
          },
        },
      });
    } catch (stripeError) {
      console.error("Error fetching subscription from Stripe:", stripeError);
      // If subscription doesn't exist in Stripe, return null
      return NextResponse.json({ subscription: null });
    }
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}

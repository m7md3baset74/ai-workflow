import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import User from "@/lib/models/User";
import connectDB from "@/lib/mongodb";

export async function POST() {
  try {
    // Using our type-safe getSession utility
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Find user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { error: "No subscription found. Please subscribe to a plan first." },
        { status: 400 }
      );
    }

    try {
      // Create Stripe customer portal session
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: `${process.env.NEXTAUTH_URL}/dashboard`,
      });

      return NextResponse.json({ url: portalSession.url });
    } catch (stripeError: unknown) {
      console.error("Stripe portal error:", stripeError);

      // Handle specific Stripe configuration error
      const error = stripeError as { type?: string; message?: string };
      if (
        error.type === "StripeInvalidRequestError" &&
        error.message?.includes("No configuration provided")
      ) {
        return NextResponse.json(
          {
            error: "Billing portal is not configured. Please contact support.",
            requiresSetup: true,
          },
          { status: 503 }
        );
      }

      throw stripeError;
    }
  } catch (error) {
    console.error("Portal session error:", error);
    return NextResponse.json(
      { error: "Unable to access billing portal. Please try again later." },
      { status: 500 }
    );
  }
}

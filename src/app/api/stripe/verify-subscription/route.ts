import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSession } from "@/lib/auth";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(request: NextRequest) {
  try {
    console.log("=== Payment Verification Started ===");

    const session = await getSession();
    if (!session?.user?.email) {
      console.log("❌ Unauthorized: No session or email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("✅ User authenticated:", session.user.email);

    const { sessionId } = await request.json();
    if (!sessionId) {
      console.log("❌ No sessionId provided");
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    console.log("✅ SessionId received:", sessionId);

    // Add a small delay to ensure Stripe data consistency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("✅ Checkout session retrieved:", {
      id: checkoutSession.id,
      customer: checkoutSession.customer,
      customer_email: checkoutSession.customer_email,
      payment_status: checkoutSession.payment_status,
    });

    if (!checkoutSession) {
      console.log("Invalid session: session not found");
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    // Connect to database to get user info
    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      console.log("User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify that the session belongs to the current user
    // Check either customer_email or customer ID match
    const sessionBelongsToUser =
      checkoutSession.customer_email === session.user.email ||
      checkoutSession.customer === user.stripeCustomerId;

    console.log("Session verification:", {
      checkoutSessionEmail: checkoutSession.customer_email,
      userEmail: session.user.email,
      checkoutCustomer: checkoutSession.customer,
      userCustomerId: user.stripeCustomerId,
      belongs: sessionBelongsToUser,
    });

    if (!sessionBelongsToUser) {
      console.log("Session does not belong to user");
      return NextResponse.json(
        { error: "Session does not belong to user" },
        { status: 403 }
      );
    }

    // Check if payment was successful
    if (checkoutSession.payment_status === "paid") {
      console.log("Payment successful, processing subscription...");

      // Get the subscription details
      const subscriptionResponse = await stripe.subscriptions.retrieve(
        checkoutSession.subscription as string
      );
      const subscription = subscriptionResponse as Stripe.Subscription;
      console.log("Subscription retrieved:", subscription.id);

      let planType = "free";

      // Determine plan type based on the subscription
      if (subscription.items.data[0]?.price?.lookup_key) {
        const lookupKey = subscription.items.data[0].price.lookup_key;
        console.log("Lookup key:", lookupKey);
        if (lookupKey.includes("professional")) {
          planType = "professional";
        } else if (lookupKey.includes("business")) {
          planType = "business";
        } else if (lookupKey.includes("enterprise")) {
          planType = "enterprise";
        }
      } else {
        // Fallback: check metadata from checkout session
        const metadata = checkoutSession.metadata;
        if (metadata?.planType) {
          planType = metadata.planType;
          console.log("Plan type from metadata:", planType);
        }
      }

      // Update user's subscription status in database
      const updatedUser = await User.findOneAndUpdate(
        { email: session.user.email },
        {
          planType, // Update both planType and subscriptionStatus
          subscriptionStatus: planType, // Set subscriptionStatus to the actual plan
          stripeCustomerId: checkoutSession.customer,
          subscriptionId: subscription.id,
          subscriptionStartDate: new Date(subscription.created * 1000),
          paidUser: true, // Mark as paid user
        },
        { new: true }
      );

      if (!updatedUser) {
        console.log("Failed to update user");
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      console.log("User updated successfully:", {
        email: updatedUser.email,
        planType: updatedUser.planType,
        subscriptionStatus: updatedUser.subscriptionStatus,
      });

      const planNames = {
        professional: "Professional",
        business: "Business",
        enterprise: "Enterprise",
      };

      const response = {
        success: true,
        planType,
        subscriptionStatus: "active",
        message: "Subscription activated successfully",
        plan: {
          name: planNames[planType as keyof typeof planNames] || "Professional",
          type: planType,
        },
        user: {
          email: updatedUser.email,
          planType: updatedUser.planType,
          subscriptionStatus: updatedUser.subscriptionStatus,
        },
      };

      console.log("✅ Payment verification completed successfully:", response);
      return NextResponse.json(response);
    } else {
      console.log(
        "❌ Payment not completed, status:",
        checkoutSession.payment_status
      );
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("❌ Error verifying subscription:", {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: "Failed to verify subscription",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

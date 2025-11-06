import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import User from "@/lib/models/User";
import connectDB from "@/lib/mongodb";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await connectDB();

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { userId, planType } = session.metadata as {
    userId: string;
    planType: string;
  };

  if (!userId || !planType) {
    console.error("Missing metadata in checkout session");
    return;
  }

  const user = await User.findById(userId);
  if (!user) {
    console.error("User not found:", userId);
    return;
  }

  // Update user subscription info
  user.paidUser = planType !== "free";
  user.subscriptionStatus = planType as
    | "free"
    | "professional"
    | "business"
    | "enterprise"
    | "cancelled"
    | "expired";
  user.planType = planType as
    | "free"
    | "professional"
    | "business"
    | "enterprise";
  user.stripeCustomerId = session.customer as string;

  if (session.subscription) {
    user.subscriptionId = session.subscription as string;
  }

  await user.save();
  console.log(`Updated user ${userId} with plan ${planType}`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const user = await User.findOne({ stripeCustomerId: subscription.customer });
  if (!user) {
    console.error("User not found for customer:", subscription.customer);
    return;
  }

  // Get plan type from subscription items
  const priceId = subscription.items.data[0]?.price.id;
  const planType = getPlanTypeFromPriceId(priceId);

  user.subscriptionId = subscription.id;
  user.subscriptionStatus =
    subscription.status === "active"
      ? planType
      : mapStripeStatusToUserStatus(subscription.status);
  user.paidUser = subscription.status === "active" && planType !== "free";
  user.planType = planType as
    | "free"
    | "professional"
    | "business"
    | "enterprise";

  // Clear cancellation data if subscription is reactivated
  if (subscription.status === "active") {
    user.cancelledAt = null;
    user.cancellationReason = null;
  }

  // Access period dates correctly using unknown type first
  const subscriptionData = subscription as unknown as Record<string, unknown>;
  if (subscriptionData.current_period_start) {
    user.subscriptionStartDate = new Date(
      (subscriptionData.current_period_start as number) * 1000
    );
  }
  if (subscriptionData.current_period_end) {
    user.subscriptionEndDate = new Date(
      (subscriptionData.current_period_end as number) * 1000
    );
  }

  await user.save();
  console.log(`Updated subscription for user ${user._id}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const user = await User.findOne({ stripeCustomerId: subscription.customer });
  if (!user) {
    console.error("User not found for customer:", subscription.customer);
    return;
  }

  user.paidUser = false;
  user.subscriptionStatus = "cancelled";
  user.planType = "free";
  user.subscriptionId = null;
  user.cancelledAt = new Date();
  user.cancellationReason = "Cancelled via Stripe";

  // Access period end correctly
  const subscriptionData = subscription as unknown as Record<string, unknown>;
  if (subscriptionData.current_period_end) {
    user.subscriptionEndDate = new Date(
      (subscriptionData.current_period_end as number) * 1000
    );
  }

  await user.save();
  console.log(`Cancelled subscription for user ${user._id}`);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const invoiceData = invoice as unknown as Record<string, unknown>;
  if (!invoiceData.subscription) return;

  const user = await User.findOne({ stripeCustomerId: invoice.customer });
  if (!user) return;

  // Ensure user is marked as paid if payment succeeded
  if (
    user.subscriptionStatus === "professional" ||
    user.subscriptionStatus === "business" ||
    user.subscriptionStatus === "enterprise"
  ) {
    user.paidUser = true;
    await user.save();
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const invoiceData = invoice as unknown as Record<string, unknown>;
  if (!invoiceData.subscription) return;

  const user = await User.findOne({ stripeCustomerId: invoice.customer });
  if (!user) return;

  // Mark as unpaid if payment failed
  user.paidUser = false;
  user.subscriptionStatus = "expired";
  await user.save();
}

function getPlanTypeFromPriceId(priceId: string): string {
  // This is a simplified version - you'd want to create a mapping
  // based on your actual Stripe price IDs
  if (priceId?.includes("professional")) return "professional";
  if (priceId?.includes("business")) return "business";
  if (priceId?.includes("enterprise")) return "enterprise";
  return "free";
}

function mapStripeStatusToUserStatus(stripeStatus: string): string {
  switch (stripeStatus) {
    case "active":
    case "trialing":
      return "professional"; // or determine based on price
    case "canceled":
    case "cancelled":
      return "cancelled";
    case "past_due":
    case "unpaid":
      return "expired";
    default:
      return "free";
  }
}

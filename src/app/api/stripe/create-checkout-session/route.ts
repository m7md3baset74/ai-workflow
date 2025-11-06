import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { stripe, STRIPE_PRICE_IDS } from "@/lib/stripe";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";

interface CheckoutRequestBody {
  planType: string;
  billingInterval: string;
}

export async function POST(req: NextRequest) {
  try {
    // Using our type-safe getSession utility
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CheckoutRequestBody = await req.json();
    const { planType, billingInterval } = body;

    if (!planType || !billingInterval) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get the appropriate price ID
    const priceKey =
      `${planType}_${billingInterval}` as keyof typeof STRIPE_PRICE_IDS;
    const priceId = STRIPE_PRICE_IDS[priceKey];

    if (!priceId || priceId === "") {
      console.error("Price ID not found or empty:", {
        priceKey,
        availableKeys: Object.keys(STRIPE_PRICE_IDS),
      });
      return NextResponse.json(
        {
          error: `Invalid plan configuration. Price ID not found for ${priceKey}`,
        },
        { status: 400 }
      );
    }

    let customerId = user.stripeCustomerId;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || `${user.firstName} ${user.lastName}`,
        metadata: {
          userId: user._id.toString(),
        },
      });

      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    // Create Stripe Checkout Session
    console.log("Creating checkout session with:", {
      customerId,
      priceId,
      planType,
      billingInterval,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXTAUTH_URL}/payment-success?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId: user._id.toString(),
        planType,
        billingInterval,
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
    });

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import Newsletter from "@/lib/models/Newsletter";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { email, source = "footer" } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({
      email: email.toLowerCase(),
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return NextResponse.json(
          { error: "This email is already subscribed to our newsletter" },
          { status: 409 }
        );
      } else {
        // Reactivate subscription if it was previously deactivated
        existingSubscription.isActive = true;
        existingSubscription.subscribedAt = new Date();
        await existingSubscription.save();

        return NextResponse.json({
          success: true,
          message: "Welcome back! Your subscription has been reactivated.",
        });
      }
    }

    // Create new subscription
    const newSubscription = new Newsletter({
      email: email.toLowerCase(),
      source,
    });

    await newSubscription.save();

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! You'll receive our latest updates.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    // Handle duplicate key error (race condition)
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json(
        { error: "This email is already subscribed to our newsletter" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const totalSubscribers = await Newsletter.countDocuments({
      isActive: true,
    });
    const recentSubscribers = await Newsletter.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .limit(5)
      .select("email subscribedAt source");

    return NextResponse.json({
      totalSubscribers,
      recentSubscribers,
    });
  } catch (error) {
    console.error("Error fetching newsletter stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter statistics" },
      { status: 500 }
    );
  }
}

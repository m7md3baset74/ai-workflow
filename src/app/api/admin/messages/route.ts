import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Message from "@/lib/models/Message";
import { requireAdmin } from "@/lib/admin-middleware";
import type {
  AdminMessagesResponse,
  AdminErrorResponse,
  MongoQuery,
  MessageDocument,
} from "@/types/admin";

// Disable static generation for this API route
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
): Promise<NextResponse<AdminMessagesResponse | AdminErrorResponse>> {
  try {
    // Check admin authentication
    await requireAdmin();

    // Connect to database
    await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const inquiryType = searchParams.get("inquiryType");

    // Build query
    const query: MongoQuery = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (inquiryType && inquiryType !== "all") {
      query.inquiryType = inquiryType;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<MessageDocument[]>();

    const total = await Message.countDocuments(query);

    // Transform messages for frontend
    const transformedMessages = messages.map((message) => ({
      id: message._id.toString(),
      firstName: message.firstName,
      lastName: message.lastName,
      email: message.email,
      company: message.company,
      phone: message.phone,
      subject: message.subject,
      message: message.message,
      inquiryType: message.inquiryType,
      status: message.status,
      createdAt: message.createdAt.toISOString(),
      updatedAt: message.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      messages: transformedMessages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Admin messages fetch error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch messages";
    const status =
      message === "Unauthorized"
        ? 401
        : message === "Admin access required"
        ? 403
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}

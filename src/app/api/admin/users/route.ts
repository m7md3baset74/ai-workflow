import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import { requireAdmin } from "@/lib/admin-middleware";
import type {
  AdminUsersResponse,
  AdminErrorResponse,
  MongoQuery,
  UserDocument,
} from "@/types/admin";

// Disable static generation for this API route
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
): Promise<NextResponse<AdminUsersResponse | AdminErrorResponse>> {
  try {
    // Check admin authentication
    await requireAdmin();

    // Connect to database
    await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const role = searchParams.get("role");

    // Build query
    const query: MongoQuery = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
      ];
    }

    if (role && role !== "all") {
      query.role = role;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const users = await User.find(query)
      .select("-password") // Exclude password field
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<UserDocument[]>();

    const total = await User.countDocuments(query);

    // Transform users for frontend
    const transformedUsers = users.map((user) => ({
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role,
      phone: user.phone,
      company: user.company,
      jobTitle: user.jobTitle,
      provider: user.provider,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      users: transformedUsers,
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
    console.error("Admin users fetch error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch users";
    const status =
      message === "Unauthorized"
        ? 401
        : message === "Admin access required"
        ? 403
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}

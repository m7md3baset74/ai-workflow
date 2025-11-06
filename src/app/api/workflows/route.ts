import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Workflow from "@/lib/models/Workflow";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "12");
    const search = searchParams.get("search") || "";

    // Validate pagination parameters
    const validatedPage = Math.max(1, page);
    const validatedPerPage = Math.min(Math.max(1, perPage), 100); // Max 100 per page
    const skip = (validatedPage - 1) * validatedPerPage;

    await connectToDatabase();

    // Build search query
    const searchQuery: Record<string, unknown> = { owner: session.user.id };

    if (search.trim()) {
      searchQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Get total count for pagination
    const totalCount = await Workflow.countDocuments(searchQuery);

    // Get paginated workflows
    const workflows = await Workflow.find(searchQuery)
      .select(
        "name description isActive lastExecuted nodes edges createdAt updatedAt"
      )
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(validatedPerPage);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / validatedPerPage);
    const hasNextPage = validatedPage < totalPages;
    const hasPreviousPage = validatedPage > 1;

    return NextResponse.json({
      workflows,
      pagination: {
        currentPage: validatedPage,
        perPage: validatedPerPage,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    });
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      description,
      nodes = [],
      edges = [],
      isActive = false,
    } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await connectToDatabase();

    const workflow = await Workflow.create({
      name,
      description,
      owner: session.user.id,
      nodes,
      edges,
      isActive,
    });
    return NextResponse.json({ workflow }, { status: 201 });
  } catch (error) {
    console.error("Error creating workflow:", error);

    // More specific error handling
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);

      // Handle validation errors
      if (error.message.includes("validation")) {
        return NextResponse.json(
          { error: `Validation error: ${error.message}` },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

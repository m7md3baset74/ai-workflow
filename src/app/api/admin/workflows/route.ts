import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Workflow from "@/lib/models/Workflow";
import { requireAdmin } from "@/lib/admin-middleware";
import type {
  AdminWorkflowsResponse,
  AdminErrorResponse,
  MongoQuery,
  WorkflowDocument,
  UserDocument,
} from "@/types/admin";

// Disable static generation for this API route
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
): Promise<NextResponse<AdminWorkflowsResponse | AdminErrorResponse>> {
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
    const status = searchParams.get("status");

    // Build query
    const query: MongoQuery = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (status && status !== "all") {
      query.isActive = status === "active";
    }

    interface PopulatedWorkflow extends Omit<WorkflowDocument, "owner"> {
      owner: UserDocument;
    }

    // Execute query with pagination and populate owner
    const skip = (page - 1) * limit;
    const workflows = await Workflow.find(query)
      .populate("owner", "firstName lastName email username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean<PopulatedWorkflow[]>();

    const total = await Workflow.countDocuments(query);

    // Transform workflows for frontend
    const transformedWorkflows = workflows.map((workflow) => ({
      id: workflow._id.toString(),
      name: workflow.name,
      description: workflow.description,
      owner: {
        id: workflow.owner?._id?.toString() || "unknown",
        name: workflow.owner
          ? `${workflow.owner.firstName || ""} ${
              workflow.owner.lastName || ""
            }`.trim() || "Unknown User"
          : "Unknown User",
        email: workflow.owner?.email || "unknown@example.com",
      },
      nodesCount: workflow.nodes?.length || 0,
      isActive: workflow.isActive,
      lastExecuted: workflow.lastExecuted?.toISOString(),
      createdAt: workflow.createdAt.toISOString(),
      updatedAt: workflow.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      workflows: transformedWorkflows,
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
    console.error("Admin workflows fetch error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch workflows";
    const status =
      message === "Unauthorized"
        ? 401
        : message === "Admin access required"
        ? 403
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}

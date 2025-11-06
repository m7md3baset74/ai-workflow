import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { checkWorkflowLimit } from "@/lib/user-limits";

export async function GET() {
  try {
    // Using our type-safe getSession utility
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const canCreate = await checkWorkflowLimit();

    return NextResponse.json({ canCreateWorkflow: canCreate });
  } catch (error) {
    console.error("Error checking workflow limit:", error);
    return NextResponse.json(
      { error: "Failed to check workflow limit" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Using our type-safe getSession utility
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { action } = await request.json();

    if (action === "check-limit") {
      const canCreate = await checkWorkflowLimit();

      if (!canCreate) {
        return NextResponse.json(
          {
            error: "Workflow limit reached",
            message:
              "You have reached your workflow limit for your current plan. Please upgrade to create more workflows.",
            upgradeUrl: "/pricing",
          },
          { status: 403 }
        );
      }

      return NextResponse.json({ canCreateWorkflow: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in workflow limit check:", error);
    return NextResponse.json(
      { error: "Failed to check workflow limit" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import Workflow from "@/lib/models/Workflow";
import connectToDatabase from "@/lib/mongodb";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    console.log("Session:", session);

    if (!session?.user?.email) {
      console.log("No session or email found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user.id) {
      console.log("No user ID found in session");
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    const { templateId, templateData } = await request.json();
    console.log("Received data:", {
      templateId,
      templateData: templateData?.title,
    });

    if (!templateId || !templateData) {
      console.log("Missing template data");
      return NextResponse.json(
        { error: "Template data required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Create workflow nodes based on template steps
    const nodes = templateData.steps.map((step: string, index: number) => ({
      id: `node-${index + 1}`,
      type: index === 0 ? "trigger" : "action",
      position: { x: 250 + index * 300, y: 250 },
      data: {
        label: step,
        nodeType: index === 0 ? "webhook" : "email",
        config: {
          name: step,
          description: `Auto-generated from template: ${templateData.title}`,
        },
      },
    }));

    // Create connections between nodes
    const edges = templateData.steps
      .slice(1)
      .map((_step: string, index: number) => ({
        id: `edge-${index + 1}`,
        source: `node-${index + 1}`,
        target: `node-${index + 2}`,
        type: "smoothstep",
      }));

    // Create the workflow
    const workflow = new Workflow({
      name: templateData.title,
      description: templateData.description,
      owner: new mongoose.Types.ObjectId(session.user.id),
      nodes,
      edges,
      isActive: false,
      tags: templateData.tags || [],
      metadata: {
        templateId,
        templateTitle: templateData.title,
        category: templateData.category,
        complexity: templateData.complexity,
        estimatedTime: templateData.estimatedTime,
        createdFromTemplate: true,
      },
    });

    const savedWorkflow = await workflow.save();
    console.log("Workflow saved successfully:", savedWorkflow._id);

    return NextResponse.json({
      success: true,
      workflowId: savedWorkflow._id.toString(),
      message: "Workflow created successfully from template",
    });
  } catch (error) {
    console.error("Error creating workflow from template:", error);

    // Log more details about the error
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    return NextResponse.json(
      {
        error: "Failed to create workflow from template",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

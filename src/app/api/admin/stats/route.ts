import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import Workflow from "@/lib/models/Workflow";
import Message from "@/lib/models/Message";
import { requireAdmin } from "@/lib/admin-middleware";
import type { DashboardStats, AdminErrorResponse } from "@/types/admin";

// Disable static generation for this API route
export const dynamic = "force-dynamic";

export async function GET(): Promise<
  NextResponse<DashboardStats | AdminErrorResponse>
> {
  try {
    // Check admin authentication
    await requireAdmin();

    // Connect to database
    await connectToDatabase();

    // Get date for "last month" comparison
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    // Fetch user stats
    const totalUsers = await User.countDocuments();
    const newUsers = await User.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    // Fetch workflow stats
    const totalWorkflows = await Workflow.countDocuments();
    const activeWorkflows = await Workflow.countDocuments({ isActive: true });

    // For executed workflows this month, we'll use a simple count of workflows that have lastExecuted date
    const thisMonth = new Date();
    thisMonth.setDate(1); // First day of current month
    const executedWorkflows = await Workflow.countDocuments({
      lastExecuted: { $gte: thisMonth },
    });

    // Fetch message stats
    const totalMessages = await Message.countDocuments();
    const unreadMessages = await Message.countDocuments({ status: "unread" });
    const recentMessages = await Message.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    const stats = {
      users: {
        total: totalUsers,
        active: totalUsers, // For now, consider all users as active
        new: newUsers,
      },
      workflows: {
        total: totalWorkflows,
        active: activeWorkflows,
        executed: executedWorkflows,
      },
      messages: {
        total: totalMessages,
        unread: unreadMessages,
        recent: recentMessages,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Admin stats error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch stats";
    const status =
      message === "Unauthorized"
        ? 401
        : message === "Admin access required"
        ? 403
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}

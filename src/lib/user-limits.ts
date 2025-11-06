import { getSession } from "@/lib/auth";
import User from "@/lib/models/User";
import Workflow from "@/lib/models/Workflow";
import connectToDatabase from "@/lib/mongodb";
import {
  canCreateWorkflow,
  canExecuteWorkflow,
  getPlanLimits,
  PlanType,
} from "@/lib/plans";

export interface UserLimits {
  canCreateWorkflow: boolean;
  remainingWorkflows: number;
  canExecuteWorkflow: boolean;
  remainingExecutions: number;
  currentPlan: PlanType;
  currentWorkflowCount: number;
  monthlyExecutions: number;
}

export async function getUserLimits(
  userId?: string
): Promise<UserLimits | null> {
  try {
    await connectToDatabase();

    let user;
    if (userId) {
      user = await User.findById(userId);
    } else {
      // Using our type-safe getSession utility
      const session = await getSession();
      if (!session?.user?.email) return null;
      user = await User.findOne({ email: session.user.email });
    }

    if (!user) return null;

    // Determine the effective plan type based on subscription status
    let planType: PlanType =
      user.subscriptionStatus === "cancelled" ||
      user.subscriptionStatus === "free" ||
      !user.paidUser
        ? "free"
        : user.subscriptionStatus || user.planType || "free";

    // Ensure planType is valid, default to "free" if invalid
    if (
      !["free", "professional", "business", "enterprise"].includes(planType)
    ) {
      console.warn(
        `Invalid plan type "${planType}" for user ${user.email}, defaulting to "free"`
      );
      planType = "free";
    }

    const limits = getPlanLimits(planType);

    // Additional safety check
    if (!limits) {
      console.error(
        `Failed to get limits for plan type "${planType}", defaulting to free plan`
      );
      return {
        canCreateWorkflow: true,
        remainingWorkflows: 3,
        canExecuteWorkflow: true,
        remainingExecutions: 100,
        currentPlan: "free" as PlanType,
        currentWorkflowCount: 0,
        monthlyExecutions: 0,
      };
    }

    // Count current workflows
    const currentWorkflowCount = await Workflow.countDocuments({
      owner: user._id,
    });

    // Count monthly executions (you'll need to implement execution tracking)
    const monthlyExecutions = 0; // TODO: Implement execution tracking

    const remainingWorkflows =
      limits.maxWorkflows === -1
        ? Infinity
        : Math.max(0, limits.maxWorkflows - currentWorkflowCount);

    const remainingExecutions =
      limits.maxExecutionsPerMonth === -1
        ? Infinity
        : Math.max(0, limits.maxExecutionsPerMonth - monthlyExecutions);

    return {
      canCreateWorkflow: canCreateWorkflow(currentWorkflowCount, planType),
      remainingWorkflows:
        remainingWorkflows === Infinity ? -1 : remainingWorkflows,
      canExecuteWorkflow: canExecuteWorkflow(monthlyExecutions, planType),
      remainingExecutions:
        remainingExecutions === Infinity ? -1 : remainingExecutions,
      currentPlan: planType,
      currentWorkflowCount,
      monthlyExecutions,
    };
  } catch (error) {
    console.error("Error getting user limits:", error);
    return null;
  }
}

export async function checkWorkflowLimit(userId?: string): Promise<boolean> {
  const limits = await getUserLimits(userId);
  return limits?.canCreateWorkflow || false;
}

export async function checkExecutionLimit(userId?: string): Promise<boolean> {
  const limits = await getUserLimits(userId);
  return limits?.canExecuteWorkflow || false;
}

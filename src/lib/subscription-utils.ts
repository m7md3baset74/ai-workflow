import { IUser } from "@/lib/models/User";

export function isUserOnPaidPlan(user: IUser | null): boolean {
  if (!user) return false;
  return (
    user.paidUser &&
    user.subscriptionStatus !== "cancelled" &&
    user.subscriptionStatus !== "expired"
  );
}

export function getUserPlanFeatures(user: IUser | null) {
  if (!user) return null;

  const planType = user.planType || "free";

  const planFeatures = {
    free: {
      name: "Free",
      workflows: 3,
      executions: 100,
      integrations: "Basic",
      support: "Community",
      features: ["3 workflows", "Basic integrations", "Community support"],
    },
    professional: {
      name: "Professional",
      workflows: "Unlimited",
      executions: 10000,
      integrations: "Advanced",
      support: "Priority",
      features: [
        "Unlimited workflows",
        "Advanced integrations",
        "Priority support",
        "Analytics",
      ],
    },
    business: {
      name: "Business",
      workflows: "Unlimited",
      executions: 100000,
      integrations: "Advanced + Custom",
      support: "Priority + Phone",
      features: [
        "Everything in Professional",
        "Team collaboration",
        "Advanced analytics",
        "Custom integrations",
      ],
    },
    enterprise: {
      name: "Enterprise",
      workflows: "Unlimited",
      executions: "Unlimited",
      integrations: "All + Custom Development",
      support: "Dedicated + SLA",
      features: [
        "Everything in Business",
        "Dedicated support",
        "SLA",
        "Custom development",
      ],
    },
  };

  return (
    planFeatures[planType as keyof typeof planFeatures] || planFeatures.free
  );
}

export function canUserCreateWorkflow(
  user: IUser | null,
  currentWorkflowCount: number
): boolean {
  if (!user) return false;

  const planType = user.planType || "free";

  if (planType === "free") {
    return currentWorkflowCount < 3;
  }

  // All paid plans have unlimited workflows
  return true;
}

export function canUserExecuteWorkflow(
  user: IUser | null,
  currentMonthlyExecutions: number
): boolean {
  if (!user) return false;

  const planType = user.planType || "free";

  switch (planType) {
    case "free":
      return currentMonthlyExecutions < 100;
    case "professional":
      return currentMonthlyExecutions < 10000;
    case "business":
      return currentMonthlyExecutions < 100000;
    case "enterprise":
      return true; // unlimited
    default:
      return false;
  }
}

export function getSubscriptionStatus(user: IUser | null): string {
  if (!user) return "No subscription";

  if (!user.paidUser) return "Free plan";

  switch (user.subscriptionStatus) {
    case "professional":
    case "business":
    case "enterprise":
      return `${
        user.subscriptionStatus.charAt(0).toUpperCase() +
        user.subscriptionStatus.slice(1)
      } plan`;
    case "cancelled":
      return "Subscription cancelled";
    case "expired":
      return "Subscription expired";
    default:
      return "Free plan";
  }
}

export function formatSubscriptionDate(
  date: Date | string | undefined
): string {
  if (!date) return "N/A";

  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

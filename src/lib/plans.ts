// Plan configuration with limits and pricing
export const PLAN_LIMITS = {
  free: {
    maxWorkflows: 6,
    maxExecutionsPerMonth: 100,
    features: [
      "Up to 6 workflows",
      "100 executions/month",
      "Basic templates",
      "Email support",
      "Community access",
    ],
    limitations: [
      "Limited integrations",
      "Basic analytics",
      "Standard support",
    ],
  },
  professional: {
    maxWorkflows: 50,
    maxExecutionsPerMonth: 10000,
    features: [
      "Up to 50 workflows",
      "10,000 executions/month",
      "Advanced templates",
      "Priority email support",
      "Advanced integrations",
      "Custom webhooks",
      "Analytics dashboard",
      "Version control",
    ],
    limitations: ["No team collaboration", "Standard SLA"],
  },
  business: {
    maxWorkflows: 200,
    maxExecutionsPerMonth: 50000,
    features: [
      "Up to 200 workflows",
      "50,000 executions/month",
      "Team collaboration",
      "Advanced analytics",
      "Custom integrations",
      "API access",
      "SSO integration",
      "Priority support",
      "Advanced templates",
      "Workflow sharing",
    ],
    limitations: ["Standard SLA"],
  },
  enterprise: {
    maxWorkflows: -1, // Unlimited
    maxExecutionsPerMonth: -1, // Unlimited
    features: [
      "Unlimited workflows",
      "Unlimited executions",
      "Enterprise integrations",
      "Custom development",
      "Dedicated support",
      "99.9% SLA guarantee",
      "Advanced security",
      "On-premise deployment",
      "Custom branding",
      "Training & onboarding",
    ],
    limitations: [],
  },
} as const;

export const PLAN_PRICING = {
  professional: {
    monthly: 29,
    yearly: 290, // 2 months free
    originalYearly: 348,
  },
  business: {
    monthly: 79,
    yearly: 790, // 2 months free
    originalYearly: 948,
  },
  enterprise: {
    monthly: "Custom",
    yearly: "Custom",
    originalYearly: "Custom",
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;

export const isPaidPlan = (planType: PlanType): boolean => {
  return planType !== "free";
};

export const getPlanLimits = (planType: PlanType) => {
  return PLAN_LIMITS[planType];
};

export const canCreateWorkflow = (
  currentCount: number,
  planType: PlanType
): boolean => {
  const limits = getPlanLimits(planType);
  if (limits.maxWorkflows === -1) return true; // Unlimited
  return currentCount < limits.maxWorkflows;
};

export const canExecuteWorkflow = (
  currentMonthlyExecutions: number,
  planType: PlanType
): boolean => {
  const limits = getPlanLimits(planType);
  if (limits.maxExecutionsPerMonth === -1) return true; // Unlimited
  return currentMonthlyExecutions < limits.maxExecutionsPerMonth;
};

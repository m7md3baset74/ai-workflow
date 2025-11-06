import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

// Stripe Price IDs (these should be set in your environment variables)
export const STRIPE_PRICE_IDS = {
  professional_monthly: process.env.STRIPE_PROFESSIONAL_MONTHLY_PRICE_ID || "",
  professional_yearly: process.env.STRIPE_PROFESSIONAL_YEARLY_PRICE_ID || "",
  business_monthly: process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID || "",
  business_yearly: process.env.STRIPE_BUSINESS_YEARLY_PRICE_ID || "",
  enterprise_monthly: process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || "",
  enterprise_yearly: process.env.STRIPE_ENTERPRISE_YEARLY_PRICE_ID || "",
};

// Plan configuration
export const PLAN_CONFIG = {
  free: {
    name: "Free",
    features: ["3 workflows", "Basic integrations", "Community support"],
    limits: {
      workflows: 3,
      executions: 100,
    },
  },
  professional: {
    name: "Professional",
    features: [
      "Unlimited workflows",
      "Advanced integrations",
      "Priority support",
      "Analytics",
    ],
    limits: {
      workflows: -1, // unlimited
      executions: 10000,
    },
  },
  business: {
    name: "Business",
    features: [
      "Everything in Professional",
      "Team collaboration",
      "Advanced analytics",
      "Custom integrations",
    ],
    limits: {
      workflows: -1,
      executions: 100000,
    },
  },
  enterprise: {
    name: "Enterprise",
    features: [
      "Everything in Business",
      "Dedicated support",
      "SLA",
      "Custom development",
    ],
    limits: {
      workflows: -1,
      executions: -1, // unlimited
    },
  },
};

export type PlanType = keyof typeof PLAN_CONFIG;
export type BillingInterval = "monthly" | "yearly";

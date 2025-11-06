"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useSubscriptionUpdates } from "@/hooks/use-subscription-updates";
import {
  Crown,
  Building,
  Sparkles,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface PaymentIntegrationProps {
  planType: "professional" | "business" | "enterprise";
  priceId: string;
  currentPlan?: string;
}

interface ExtendedSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    paidUser?: boolean;
    subscriptionStatus?: string;
    cancelledAt?: Date | null;
  };
}

export default function PaymentIntegration({
  planType,
  priceId,
  currentPlan = "free",
}: PaymentIntegrationProps) {
  const { data: session } = useSession() as { data: ExtendedSession | null };
  const { refreshSession } = useSubscriptionUpdates();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const planConfig = {
    professional: {
      name: "Professional",
      price: "$29",
      icon: <Sparkles className="h-5 w-5" />,
      color: "bg-blue-500",
      features: [
        "Unlimited workflows",
        "10,000 monthly executions",
        "Advanced integrations",
        "Priority support",
        "Analytics dashboard",
      ],
    },
    business: {
      name: "Business",
      price: "$79",
      icon: <Crown className="h-5 w-5" />,
      color: "bg-purple-500",
      features: [
        "Everything in Professional",
        "100,000 monthly executions",
        "Team collaboration",
        "Advanced analytics",
        "Custom integrations",
        "Phone support",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: "Custom",
      icon: <Building className="h-5 w-5" />,
      color: "bg-green-500",
      features: [
        "Everything in Business",
        "Unlimited executions",
        "Dedicated support",
        "SLA guarantees",
        "Custom development",
        "On-premise deployment",
      ],
    },
  };

  const config = planConfig[planType];
  const isCurrentPlan = currentPlan === planType;
  const isPaidUser = session?.user?.paidUser;
  const isDowngrade =
    isPaidUser && getPlanTier(currentPlan) > getPlanTier(planType);
  const isUpgrade =
    !isPaidUser || getPlanTier(currentPlan) < getPlanTier(planType);

  function getPlanTier(plan: string): number {
    const tiers = { free: 0, professional: 1, business: 2, enterprise: 3 };
    return tiers[plan as keyof typeof tiers] || 0;
  }

  const handleStripeCheckout = async () => {
    if (!session?.user?.email) {
      toast.error("Please sign in to upgrade your plan");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          planType,
          successUrl: `${window.location.origin}/billing?success=true`,
          cancelUrl: `${window.location.origin}/pricing?cancelled=true`,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create checkout session");
      }

      const { url } = await response.json();

      // Store the plan type we're upgrading to
      sessionStorage.setItem("upgrading-to-plan", planType);

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to start checkout process"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDirectUpgrade = async () => {
    if (!session?.user?.email) {
      toast.error("Please sign in to upgrade your plan");
      return;
    }

    setIsUpgrading(true);
    try {
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upgrade plan");
      }

      await response.json();

      // Refresh session to get updated subscription data
      await refreshSession();

      // Dispatch payment success event for other components
      window.dispatchEvent(
        new CustomEvent("payment-success", {
          detail: { planType, method: "direct" },
        })
      );

      toast.success(`Successfully upgraded to ${config.name} plan!`);
    } catch (error) {
      console.error("Direct upgrade error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to upgrade plan"
      );
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleManageBilling = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Portal error:", error);
      toast.error("Unable to open billing portal. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getButtonText = () => {
    if (isCurrentPlan) return "Current Plan";
    if (isDowngrade) return "Downgrade";
    if (isUpgrade) return `Upgrade to ${config.name}`;
    return `Choose ${config.name}`;
  };

  const getButtonAction = () => {
    if (isCurrentPlan) return handleManageBilling;
    if (planType === "enterprise")
      return () => window.open("/contact", "_blank");
    return process.env.NODE_ENV === "production"
      ? handleStripeCheckout
      : handleDirectUpgrade;
  };

  return (
    <Card
      className={`relative h-full ${
        isCurrentPlan ? "ring-2 ring-primary" : ""
      }`}
    >
      {isCurrentPlan && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          Current Plan
        </Badge>
      )}

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${config.color} text-white`}>
            {config.icon}
          </div>
          {config.name}
        </CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold text-foreground">
            {config.price}
          </span>
          {planType !== "enterprise" && (
            <span className="text-muted-foreground">/month</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          {config.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={getButtonAction()}
          disabled={isProcessing || isUpgrading}
          className="w-full"
          variant={isCurrentPlan ? "outline" : "default"}
        >
          {(isProcessing || isUpgrading) && (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          )}
          {getButtonText()}
        </Button>

        {session?.user?.subscriptionStatus === "cancelled" && isCurrentPlan && (
          <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-700 dark:text-yellow-400">
              Your subscription will end on{" "}
              {session.user.cancelledAt
                ? new Date(session.user.cancelledAt).toLocaleDateString()
                : "the current billing period"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

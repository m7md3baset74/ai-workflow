import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Crown, Sparkles, AlertTriangle, X } from "lucide-react";
import Link from "next/link";
import type { UserLimits } from "@/lib/user-limits";

interface UpgradePromptProps {
  trigger?: "workflow-limit" | "execution-limit" | "feature-limit";
  message?: string;
  className?: string;
  variant?: "banner" | "card" | "inline";
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function UpgradePrompt({
  trigger = "workflow-limit",
  message,
  className = "",
  variant = "banner",
  dismissible = true,
  onDismiss,
}: UpgradePromptProps) {
  const [limits, setLimits] = useState<UserLimits | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLimits();
  }, []);

  const fetchLimits = async () => {
    try {
      const response = await fetch("/api/user/limits");
      if (response.ok) {
        const data = await response.json();
        setLimits(data);
      }
    } catch (error) {
      console.error("Error fetching limits:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  if (loading || dismissed || !limits || limits.currentPlan !== "free") {
    return null;
  }

  // Check if we should show based on trigger
  const shouldShow = () => {
    switch (trigger) {
      case "workflow-limit":
        return !limits.canCreateWorkflow;
      case "execution-limit":
        return !limits.canExecuteWorkflow;
      case "feature-limit":
        return true; // Always show for feature upgrades
      default:
        return false;
    }
  };

  if (!shouldShow()) {
    return null;
  }

  const getDefaultMessage = () => {
    switch (trigger) {
      case "workflow-limit":
        return `You've reached your ${limits.currentWorkflowCount} workflow limit. Upgrade to create unlimited workflows.`;
      case "execution-limit":
        return "You've reached your monthly execution limit. Upgrade for more executions.";
      case "feature-limit":
        return "Unlock advanced features with a paid plan.";
      default:
        return "Upgrade your plan for more features and higher limits.";
    }
  };

  const displayMessage = message || getDefaultMessage();

  const upgradePlans = [
    {
      name: "Professional",
      price: "$29/mo",
      icon: Sparkles,
      color:
        "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200",
      features: ["50 workflows", "10K executions/mo", "Priority support"],
    },
    {
      name: "Business",
      price: "$79/mo",
      icon: Crown,
      color:
        "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950 dark:border-orange-800 dark:text-orange-200",
      features: ["200 workflows", "50K executions/mo", "Team collaboration"],
    },
  ];

  if (variant === "inline") {
    return (
      <div
        className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}
      >
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <span>{displayMessage}</span>
        <Link href="/pricing">
          <Button size="sm" variant="outline" className="h-6 text-xs">
            Upgrade
          </Button>
        </Link>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <Card
        className={`border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 ${className}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h3 className="font-medium text-amber-800 dark:text-amber-200">
                Upgrade Required
              </h3>
            </div>
            {dismissible && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0 text-amber-600 hover:text-amber-800"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
            {displayMessage}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {upgradePlans.map((plan) => (
              <div
                key={plan.name}
                className={`p-3 rounded-lg border ${plan.color}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <plan.icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{plan.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {plan.price}
                  </Badge>
                </div>
                <ul className="text-xs space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-current rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link href="/pricing">
            <Button className="w-full" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View All Plans
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Banner variant (default)
  return (
    <Alert
      className={`border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200 font-medium">
            {displayMessage}
          </AlertDescription>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/pricing">
            <Button
              size="sm"
              variant="outline"
              className="border-amber-300 text-amber-800 hover:bg-amber-100"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Upgrade
            </Button>
          </Link>
          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-8 w-8 p-0 text-amber-600 hover:text-amber-800"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
}

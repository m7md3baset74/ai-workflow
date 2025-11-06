import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  Crown,
  Building,
  Sparkles,
  ChevronDown,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BarChart3,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import type { UserLimits } from "@/lib/user-limits";

interface PlanBadgeProps {
  className?: string;
  variant?: "header" | "compact" | "detailed";
}

export function PlanBadge({ className, variant = "header" }: PlanBadgeProps) {
  const [limits, setLimits] = useState<UserLimits | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLimits();

    // Listen for subscription updates
    const handleSubscriptionUpdate = () => {
      fetchLimits();
    };

    window.addEventListener("subscription-updated", handleSubscriptionUpdate);

    return () => {
      window.removeEventListener(
        "subscription-updated",
        handleSubscriptionUpdate
      );
    };
  }, []);

  const fetchLimits = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/user/limits", {
        // Add cache busting to ensure we get fresh data
        headers: {
          "Cache-Control": "no-cache",
        },
      });
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

  console.log("limits", limits);

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-6 w-16 bg-muted rounded-full"></div>
      </div>
    );
  }

  if (!limits) {
    return null;
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "professional":
        return <Sparkles className="h-3 w-3" />;
      case "business":
        return <Crown className="h-3 w-3" />;
      case "enterprise":
        return <Building className="h-3 w-3" />;
      default:
        return <Zap className="h-3 w-3" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "professional":
        return "bg-blue-50 text-blue-700 hover:bg-blue-100 border-2 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-600";
      case "business":
        return "bg-purple-50 text-purple-700 hover:bg-purple-100 border-2 border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-600";
      case "enterprise":
        return "bg-amber-50 text-amber-700 hover:bg-amber-100 border-2 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-600";
      default:
        return "bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600";
    }
  };

  const getPlanPrice = (plan: string) => {
    switch (plan) {
      case "professional":
        return "$29/mo";
      case "business":
        return "$79/mo";
      case "enterprise":
        return "Custom";
      default:
        return "Free";
    }
  };

  const workflowUsagePercentage =
    limits.remainingWorkflows === -1
      ? 0
      : (limits.currentWorkflowCount /
          (limits.currentWorkflowCount + limits.remainingWorkflows)) *
        100;

  const isNearLimit = workflowUsagePercentage > 80;
  const isAtLimit =
    !limits.canCreateWorkflow && limits.remainingWorkflows !== -1;

  if (variant === "compact") {
    return (
      <Badge
        className={`${getPlanColor(
          limits.currentPlan
        )} capitalize cursor-pointer ${className}`}
      >
        {getPlanIcon(limits.currentPlan)}
        {limits.currentPlan}
      </Badge>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center justify-between">
          <Badge className={`${getPlanColor(limits.currentPlan)} capitalize`}>
            {getPlanIcon(limits.currentPlan)}
            {limits.currentPlan}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {getPlanPrice(limits.currentPlan)}
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Workflows</span>
            <span>
              {limits.currentWorkflowCount}
              {limits.remainingWorkflows === -1
                ? ""
                : ` / ${
                    limits.currentWorkflowCount + limits.remainingWorkflows
                  }`}
            </span>
          </div>
          {limits.remainingWorkflows !== -1 && (
            <Progress value={workflowUsagePercentage} className="h-1" />
          )}
        </div>

        {(isNearLimit || isAtLimit) && limits.currentPlan === "free" && (
          <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
            <AlertCircle className="h-3 w-3" />
            <span>{isAtLimit ? "Limit reached" : "Near limit"}</span>
          </div>
        )}
      </div>
    );
  }

  // Header variant (default)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`${getPlanColor(
              limits.currentPlan
            )} border-0 h-7 text-xs font-medium gap-1 ${className}`}
          >
            {getPlanIcon(limits.currentPlan)}
            {limits.currentPlan}
            {(isNearLimit || isAtLimit) && limits.currentPlan === "free" && (
              <AlertCircle className="h-3 w-3 ml-1" />
            )}
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium capitalize">
                {limits.currentPlan} Plan
              </span>
              <Badge variant="outline" className="text-xs">
                {getPlanPrice(limits.currentPlan)}
              </Badge>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Workflows used:</span>
                <span className="font-medium">
                  {limits.currentWorkflowCount}
                  {limits.remainingWorkflows === -1
                    ? ""
                    : ` / ${
                        limits.currentWorkflowCount + limits.remainingWorkflows
                      }`}
                </span>
              </div>

              {limits.remainingWorkflows !== -1 && (
                <Progress value={workflowUsagePercentage} className="h-2" />
              )}

              {isAtLimit && (
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>Workflow limit reached</span>
                </div>
              )}

              {limits.currentPlan === "free" && (
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs">
                  <CheckCircle className="h-3 w-3" />
                  <span>Free plan active</span>
                </div>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setShowDetails(true)}>
            <BarChart3 className="h-4 w-4 mr-2" />
            View Usage Details
          </DropdownMenuItem>

          {limits.currentPlan === "free" && (
            <Link href="/pricing">
              <DropdownMenuItem>
                <TrendingUp className="h-4 w-4 mr-2" />
                Upgrade Plan
              </DropdownMenuItem>
            </Link>
          )}

          <Link href="/billing">
            <DropdownMenuItem>
              <CreditCard className="h-4 w-4 mr-2" />
              Manage Billing
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Usage Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getPlanIcon(limits.currentPlan)}
              {limits.currentPlan} Plan Usage
            </DialogTitle>
            <DialogDescription>
              Current usage and limits for your plan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Workflows</span>
                <span className="text-sm text-muted-foreground">
                  {limits.currentWorkflowCount}
                  {limits.remainingWorkflows === -1
                    ? " / Unlimited"
                    : ` / ${
                        limits.currentWorkflowCount + limits.remainingWorkflows
                      }`}
                </span>
              </div>
              {limits.remainingWorkflows !== -1 && (
                <Progress value={workflowUsagePercentage} className="h-2" />
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Monthly Executions</span>
                <span className="text-sm text-muted-foreground">
                  {limits.monthlyExecutions}
                  {limits.remainingExecutions === -1
                    ? " / Unlimited"
                    : ` / ${
                        limits.monthlyExecutions + limits.remainingExecutions
                      }`}
                </span>
              </div>
              {limits.remainingExecutions !== -1 && (
                <Progress
                  value={
                    limits.remainingExecutions === 0
                      ? 100
                      : (limits.monthlyExecutions /
                          (limits.monthlyExecutions +
                            limits.remainingExecutions)) *
                        100
                  }
                  className="h-2"
                />
              )}
            </div>

            {limits.currentPlan === "free" && (
              <div className="mt-4">
                <Link href="/pricing">
                  <Button className="w-full" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Upgrade for More Workflows
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

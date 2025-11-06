import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Crown, Building, AlertTriangle, Sparkles } from "lucide-react";
import Link from "next/link";
import type { UserLimits } from "@/lib/user-limits";

interface PlanLimitCardProps {
  className?: string;
}

export function PlanLimitCard({ className }: PlanLimitCardProps) {
  const [limits, setLimits] = useState<UserLimits | null>(null);
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

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  if (!limits) {
    return null;
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "professional":
        return <Sparkles className="h-4 w-4" />;
      case "business":
        return <Crown className="h-4 w-4" />;
      case "enterprise":
        return <Building className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "professional":
        return "bg-blue-100 text-blue-800";
      case "business":
        return "bg-orange-100 text-orange-800";
      case "enterprise":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            Current Plan
            <Badge className={`${getPlanColor(limits.currentPlan)} capitalize`}>
              {getPlanIcon(limits.currentPlan)}
              {limits.currentPlan}
            </Badge>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Workflow Usage */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Workflows Used</span>
            <span className="text-sm text-gray-600">
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
        </div>

        {/* Monthly Executions */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Monthly Executions</span>
            <span className="text-sm text-gray-600">
              {limits.monthlyExecutions}
              {limits.remainingExecutions === -1
                ? " / Unlimited"
                : ` / ${limits.monthlyExecutions + limits.remainingExecutions}`}
            </span>
          </div>
          {limits.remainingExecutions !== -1 && (
            <Progress
              value={
                (limits.monthlyExecutions /
                  (limits.monthlyExecutions + limits.remainingExecutions)) *
                100
              }
              className="h-2"
            />
          )}
        </div>

        {/* Alerts */}
        {isAtLimit && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              You&apos;ve reached your workflow limit. Upgrade to create more
              workflows.
            </AlertDescription>
          </Alert>
        )}

        {isNearLimit && !isAtLimit && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              You&apos;re approaching your workflow limit. Consider upgrading
              soon.
            </AlertDescription>
          </Alert>
        )}

        {/* Upgrade Button */}
        {limits.currentPlan === "free" && (
          <Link href="/pricing">
            <Button className="w-full" variant="outline">
              Upgrade Plan
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

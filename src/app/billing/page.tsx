"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CreditCard,
  Calendar,
  Users,
  Workflow,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  ArrowLeft,
  Crown,
  Sparkles,
  Building,
  Zap,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import type { UserLimits } from "@/lib/user-limits";

interface SubscriptionDetails {
  id: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  plan: {
    amount: number;
    currency: string;
    interval: string;
    nickname: string;
  };
  customer: {
    email: string;
  };
}

export default function BillingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [limits, setLimits] = useState<UserLimits | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const fetchBillingData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch user limits
      const limitsResponse = await fetch("/api/user/limits");
      if (limitsResponse.ok) {
        const limitsData = await limitsResponse.json();
        setLimits(limitsData);
      }

      // Fetch subscription details if user has an active subscription
      if (session?.user?.email) {
        const subResponse = await fetch("/api/stripe/subscription");
        if (subResponse.ok) {
          const subData = await subResponse.json();
          setSubscription(subData.subscription);
        }
      }
    } catch (error) {
      console.error("Error fetching billing data:", error);
      toast.error("Failed to load billing information");
    } finally {
      setLoading(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    fetchBillingData();
  }, [session, status, router, fetchBillingData]);

  const handleManageBilling = async () => {
    try {
      setPortalLoading(true);
      const response = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 503 && errorData.requiresSetup) {
          toast.error(
            "Billing portal setup required. Please contact support for subscription management."
          );
        } else if (response.status === 400) {
          toast.error(
            errorData.error ||
              "No active subscription found. Please subscribe to a plan first."
          );
        } else {
          toast.error(
            "Unable to access billing portal. Please try again later."
          );
        }
        return;
      }
    } catch (error) {
      console.error("Error opening billing portal:", error);
      toast.error("Unable to open billing portal. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      setCancelLoading(true);
      const response = await fetch("/api/subscription", {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success(
          "Subscription cancelled successfully. You are now on the Free plan."
        );

        // Update local state immediately to show cancellation
        setSubscription(null);
        setLimits((prev) =>
          prev
            ? {
                ...prev,
                currentPlan: "free",
                canCreateWorkflow: true, // Free plan can still create limited workflows
                remainingWorkflows: 3, // Free plan limit
              }
            : null
        );

        // Trigger subscription update event for other components (like PlanBadge)
        window.dispatchEvent(new CustomEvent("subscription-updated"));

        // Refresh the page data to get accurate server state
        await fetchBillingData();

        // Give a moment for the event to propagate, then redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast.error("Failed to cancel subscription. Please try again.");
    } finally {
      setCancelLoading(false);
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "professional":
        return <Sparkles className="h-5 w-5" />;
      case "business":
        return <Crown className="h-5 w-5" />;
      case "enterprise":
        return <Building className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "professional":
        return "bg-primary/10 text-primary border border-primary/20";
      case "business":
        return "bg-secondary/10 text-secondary border border-secondary/20";
      case "enterprise":
        return "bg-accent/10 text-accent border border-accent/20";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading billing information...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const workflowUsagePercentage = limits
    ? limits.remainingWorkflows === -1
      ? 0
      : (limits.currentWorkflowCount /
          (limits.currentWorkflowCount + limits.remainingWorkflows)) *
        100
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Billing & Subscription
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your subscription and view usage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Current Plan Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {limits && getPlanIcon(limits.currentPlan)}
                  <div>
                    <CardTitle className="text-xl">Current Plan</CardTitle>
                    <CardDescription>
                      Your active subscription and benefits
                    </CardDescription>
                  </div>
                </div>
                {limits && (
                  <Badge
                    className={`${getPlanColor(limits.currentPlan)} capitalize`}
                  >
                    {limits.currentPlan}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscription && subscription.status === "active" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Active Subscription</p>
                        <p className="text-sm text-muted-foreground">
                          {subscription.plan.nickname}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {formatPrice(
                          subscription.plan.amount,
                          subscription.plan.currency
                        )}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{subscription.plan.interval}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-4 bg-card border rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Current Period</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(subscription.current_period_start)} -{" "}
                          {formatDate(subscription.current_period_end)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-card border rounded-lg">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Next Billing</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(subscription.current_period_end)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleManageBilling}
                      disabled={portalLoading}
                      className="flex-1"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {portalLoading ? "Loading..." : "Manage Billing"}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <Link href="/pricing">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Upgrade Plan
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-full mx-auto mb-4">
                    <Zap className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Free Plan</h3>
                  <p className="text-muted-foreground mb-4">
                    You&apos;re currently on the free plan. Upgrade to unlock
                    more features and higher limits.
                  </p>
                  <Button asChild>
                    <Link href="/pricing">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Plans & Pricing
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Overview */}
          {limits && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Usage Overview
                </CardTitle>
                <CardDescription>
                  Track your current usage against plan limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Workflows Usage */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Workflow className="h-4 w-4 text-primary" />
                      <span className="font-medium">Workflows</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {limits.currentWorkflowCount} /{" "}
                      {limits.remainingWorkflows === -1
                        ? "Unlimited"
                        : limits.currentWorkflowCount +
                          limits.remainingWorkflows}
                    </div>
                  </div>
                  {limits.remainingWorkflows !== -1 && (
                    <div className="space-y-1">
                      <Progress
                        value={workflowUsagePercentage}
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {limits.remainingWorkflows === 0 ? (
                          <span className="flex items-center gap-1 text-amber-600">
                            <AlertCircle className="h-3 w-3" />
                            Limit reached - Upgrade to create more workflows
                          </span>
                        ) : workflowUsagePercentage > 80 ? (
                          <span className="flex items-center gap-1 text-amber-600">
                            <AlertCircle className="h-3 w-3" />
                            {limits.remainingWorkflows} workflows remaining
                          </span>
                        ) : (
                          `${limits.remainingWorkflows} workflows remaining`
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Monthly Executions */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="font-medium">Monthly Executions</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {limits.monthlyExecutions} /{" "}
                      {limits.remainingExecutions === -1
                        ? "Unlimited"
                        : limits.monthlyExecutions + limits.remainingExecutions}
                    </div>
                  </div>
                  {limits.remainingExecutions !== -1 && (
                    <div className="space-y-1">
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
                      <p className="text-xs text-muted-foreground">
                        Resets monthly
                      </p>
                    </div>
                  )}
                </div>

                {(limits.remainingWorkflows === 0 ||
                  (limits.remainingExecutions !== -1 &&
                    limits.remainingExecutions < 100)) && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200">
                          Approaching Usage Limits
                        </p>
                        <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                          Consider upgrading your plan to avoid interruptions to
                          your workflows.
                        </p>
                        <Button size="sm" className="mt-3" asChild>
                          <Link href="/pricing">View Upgrade Options</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Billing Actions */}
          {(subscription && subscription.status === "active") ||
          limits?.currentPlan !== "free" ? (
            <Card>
              <CardHeader>
                <CardTitle>Billing Actions</CardTitle>
                <CardDescription>
                  Manage your subscription and billing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subscription ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={handleManageBilling}
                      disabled={portalLoading}
                      className="justify-start"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {portalLoading ? "Loading..." : "Update Payment Method"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleManageBilling}
                      disabled={portalLoading}
                      className="justify-start"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {portalLoading ? "Loading..." : "View Billing History"}
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800 dark:text-blue-200">
                          Limited Billing Options
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                          Full billing management is temporarily unavailable.
                          You can still cancel your subscription below.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Cancel Subscription
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will immediately cancel your subscription and
                        downgrade your account to the free plan.
                        {subscription && (
                          <>
                            {" "}
                            You&apos;ll continue to have access to premium
                            features until{" "}
                            {formatDate(subscription.current_period_end)}.
                          </>
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleCancelSubscription}
                        disabled={cancelLoading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {cancelLoading
                          ? "Cancelling..."
                          : "Cancel Subscription"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}

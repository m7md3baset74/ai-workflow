"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Calendar,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import { IUser } from "@/lib/models/User";
import {
  getUserPlanFeatures,
  getSubscriptionStatus,
  formatSubscriptionDate,
  isUserOnPaidPlan,
} from "@/lib/subscription-utils";

interface SubscriptionCardProps {
  user: IUser;
}

export default function SubscriptionCard({ user }: SubscriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const planFeatures = getUserPlanFeatures(user);
  const subscriptionStatus = getSubscriptionStatus(user);
  const isPaid = isUserOnPaidPlan(user);

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      // Create customer portal session
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
      console.error("Error opening customer portal:", error);
      alert("Unable to open billing portal. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!isPaid) {
      return <Badge variant="secondary">Free Plan</Badge>;
    }

    switch (user.subscriptionStatus) {
      case "professional":
      case "business":
      case "enterprise":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">Free Plan</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Current Subscription
          </div>
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan Information */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{planFeatures?.name} Plan</h3>
          <p className="text-sm text-muted-foreground">{subscriptionStatus}</p>
        </div>

        {/* Plan Features */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Plan Features:</h4>
          <ul className="space-y-1">
            {planFeatures?.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Usage Limits */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <p className="text-xs text-muted-foreground">Workflows</p>
            <p className="font-medium">{planFeatures?.workflows}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Monthly Executions</p>
            <p className="font-medium">
              {planFeatures?.executions.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Subscription Dates */}
        {isPaid && (user.subscriptionStartDate || user.subscriptionEndDate) && (
          <div className="space-y-2 pt-2 border-t">
            {user.subscriptionStartDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span>
                  Started: {formatSubscriptionDate(user.subscriptionStartDate)}
                </span>
              </div>
            )}
            {user.subscriptionEndDate && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-orange-500" />
                <span>
                  {user.subscriptionStatus === "cancelled"
                    ? "Ends:"
                    : "Next billing:"}{" "}
                  {formatSubscriptionDate(user.subscriptionEndDate)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          {!isPaid ? (
            <Button className="flex-1" asChild>
              <a href="/pricing">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Upgrade Plan
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleManageSubscription}
              disabled={isLoading}
              className="flex-1"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              {isLoading ? "Loading..." : "Manage Billing"}
            </Button>
          )}

          {user.subscriptionStatus === "expired" && (
            <Button className="flex-1" asChild>
              <a href="/pricing">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Reactivate
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

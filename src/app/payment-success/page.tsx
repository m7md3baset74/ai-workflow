"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Loader2,
  AlertCircle,
  ArrowRight,
  CreditCard,
  Users,
  Zap,
} from "lucide-react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [planDetails, setPlanDetails] = useState<{ name: string } | null>(null);
  const [hasVerified, setHasVerified] = useState(false);

  const sessionId = searchParams.get("session_id");
  const success = searchParams.get("success");

  useEffect(() => {
    // Prevent multiple verification attempts
    if (hasVerified) return;

    const verifyPayment = async () => {
      try {
        setIsLoading(true);
        setVerificationStatus("pending");

        if (sessionId) {
          // Verify Stripe payment
          const response = await fetch("/api/stripe/verify-subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Payment verification failed:", {
              status: response.status,
              statusText: response.statusText,
              error: errorData,
            });
            throw new Error(
              `Failed to verify payment: ${
                errorData.error || response.statusText
              }`
            );
          }

          const result = await response.json();

          setPlanDetails(result.plan);

          // Refresh session to get updated user data

          await update();

          // Mark as verified to prevent re-runs
          setHasVerified(true);

          // Dispatch success event for other components
          window.dispatchEvent(
            new CustomEvent("payment-success", {
              detail: { sessionId, timestamp: new Date() },
            })
          );

          setVerificationStatus("success");
        } else {
          throw new Error("No session ID provided");
        }
      } catch (error) {
        console.error("Payment verification failed:", error);
        setVerificationStatus("error");
        setHasVerified(true); // Prevent retry loops
      } finally {
        setIsLoading(false);
      }
    };

    if ((success === "true" || sessionId) && !hasVerified) {
      // Add a small delay to ensure the page is fully loaded
      const timer = setTimeout(() => {
        verifyPayment();
      }, 500);

      return () => clearTimeout(timer);
    } else if (!sessionId && !success) {
      setIsLoading(false);
      setVerificationStatus("error");
      setHasVerified(true);
    }
  }, [sessionId, success, hasVerified, update]);

  const getPlanFeatures = (planType: string) => {
    const features = {
      professional: [
        "Unlimited workflows",
        "10,000 monthly executions",
        "Advanced integrations",
        "Priority support",
      ],
      business: [
        "Everything in Professional",
        "100,000 monthly executions",
        "Team collaboration",
        "Advanced analytics",
      ],
      enterprise: [
        "Everything in Business",
        "Unlimited executions",
        "Dedicated support",
        "SLA guarantees",
      ],
    };
    return features[planType as keyof typeof features] || [];
  };

  const handleContinue = () => {
    router.push("/dashboard");
  };

  const handleViewBilling = () => {
    router.push("/billing");
  };

  if (isLoading || verificationStatus === "pending") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center p-10">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <Loader2 className="h-10 w-10 animate-spin text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Verifying Your Payment
            </h2>
            <div className="space-y-3 text-center">
              <p className="text-slate-600 font-medium">
                Please wait while we confirm your subscription...
              </p>
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-6 text-center font-medium">
              This usually takes just a few seconds
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-25 to-orange-50/50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center p-10">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400/30 to-rose-500/30 rounded-full blur"></div>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-center bg-gradient-to-r from-red-700 to-rose-600 bg-clip-text text-transparent">
              Payment Error
            </h2>
            <p className="text-slate-600 text-center mb-8 leading-relaxed">
              There was an issue processing your payment. Please try again or
              contact our support team for assistance.
            </p>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => router.push("/pricing")}
                className="flex-1 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
              >
                Try Again
              </Button>
              <Button
                onClick={() => router.push("/contact")}
                className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-md"
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-25 to-teal-50/50 flex items-center justify-center py-12">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="h-14 w-14 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-full blur animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-300/10 to-green-400/10 rounded-full blur-lg animate-pulse delay-75"></div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent">
            Payment Successful! 🎉
          </CardTitle>
          <p className="text-slate-600 text-lg font-medium">
            Welcome to WebflowApp! Your{" "}
            <span className="font-bold text-emerald-600">
              {planDetails?.name || "Professional"}
            </span>{" "}
            plan is now active.
          </p>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          {/* Subscription Details */}
          {(planDetails || session?.user) && (
            <div className="bg-gradient-to-r from-emerald-50 via-green-50/50 to-teal-50 border border-emerald-200/50 rounded-2xl p-8 shadow-inner">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-xl bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                    {planDetails?.name || "Professional"} Plan
                  </h3>
                  <p className="text-slate-600 font-medium mt-1">
                    Your subscription is now active
                  </p>
                </div>
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 px-4 py-2 text-sm font-semibold shadow-md">
                  ✨ Active
                </Badge>
              </div>

              {/* Plan Features */}
              <div className="grid gap-4">
                <h4 className="font-bold text-emerald-700 uppercase tracking-wider text-sm">
                  What&apos;s included:
                </h4>
                <div className="grid gap-3">
                  {getPlanFeatures("professional").map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-white/60 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-bold text-slate-700">Workflows</p>
              <p className="text-xs text-blue-600 font-semibold">Unlimited</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-bold text-slate-700">Team Access</p>
              <p className="text-xs text-purple-600 font-semibold">Included</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-bold text-slate-700">Billing</p>
              <p className="text-xs text-emerald-600 font-semibold">Monthly</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              onClick={handleContinue}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all font-semibold py-3"
            >
              Continue to Dashboard
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={handleViewBilling}
              className="border-emerald-200 text-emerald-700/80 hover:text-emerald-900 hover:bg-emerald-50 hover:border-emerald-300 font-semibold py-3 px-6"
            >
              <CreditCard className="h-5 w-5 mr-2" />
              View Billing
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center text-sm pt-6 border-t border-emerald-100">
            <p className="text-slate-600">
              Need help getting started?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 hover:text-emerald-700 font-semibold"
                onClick={() => router.push("/docs")}
              >
                Check our documentation
              </Button>{" "}
              <span className="text-slate-400">or</span>{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-emerald-600 hover:text-emerald-700 font-semibold"
                onClick={() => router.push("/contact")}
              >
                contact support
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

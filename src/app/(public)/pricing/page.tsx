"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSubscriptionUpdates } from "@/hooks/use-subscription-updates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { PLAN_LIMITS, PLAN_PRICING } from "@/lib/plans";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  X,
  Star,
  Zap,
  Crown,
  Building,
  ArrowRight,
  Phone,
  Users,
  BarChart3,
  Headphones,
  Award,
  CreditCard,
  Shield,
  Check,
} from "lucide-react";

type Plan = {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  monthlyPrice: number | string;
  yearlyPrice: number | string;
  originalYearlyPrice: number | string;
  color: string;
  gradient: string;
  darkGradient?: string;
  features: readonly string[];
  limitations: readonly string[];
  cta: string;
  isPopular: boolean;
  isEnterprise: boolean;
  isFree: boolean;
};

export default function Pricing() {
  const { data: session } = useSession();
  const { refreshSession } = useSubscriptionUpdates();
  const [isYearly, setIsYearly] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSubscription, setCurrentSubscription] =
    useState<string>("free");

  // Fetch user's current subscription status
  useEffect(() => {
    const fetchSubscription = async () => {
      if (!session?.user?.email) {
        setCurrentSubscription("free");
        return;
      }

      try {
        const response = await fetch("/api/user/limits");
        if (response.ok) {
          const data = await response.json();
          setCurrentSubscription(data.currentPlan || "free");
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
        setCurrentSubscription("free");
      }
    };

    fetchSubscription();
  }, [session]);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);

    // Check authentication status
    if (!session) {
      // User is not logged in, show success modal for all plans
      setShowSuccessModal(true);
      return;
    }

    if (plan.isFree) {
      // For free plan, show success modal for enrollment
      setShowSuccessModal(true);
      return;
    }

    if (plan.isEnterprise) {
      // For enterprise, go to contact
      window.location.href = "/contact";
      return;
    }

    // For paid plans, show confirmation modal
    setSelectedPlan(plan);
    setShowConfirmModal(true);
  };

  const handleConfirmPayment = async () => {
    if (!selectedPlan || !session) return;

    setIsProcessing(true);

    try {
      const planType = selectedPlan.name.toLowerCase();
      const billingInterval = isYearly ? "yearly" : "monthly";

      // For free plan, handle directly
      if (planType === "free") {
        const response = await fetch("/api/subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planType: "free",
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update subscription");
        }

        await refreshSession();
        setCurrentSubscription("free");
        setShowConfirmModal(false);
        setShowSuccessModal(true);
        return;
      }

      // For paid plans, redirect to Stripe checkout
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planType,
          billingInterval,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { url } = await response.json();

      // Close modal before redirect
      setShowConfirmModal(false);

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);

    // Redirect based on authentication status and plan type
    if (!session) {
      // User is not logged in, always redirect to signup
      window.location.href = "/auth/signup";
    } else if (selectedPlan?.isFree) {
      // User is logged in and selected free plan, redirect to dashboard
      window.location.href = "/dashboard";
    } else {
      // User is logged in and selected paid plan, redirect to dashboard
      window.location.href = "/dashboard";
    }

    setSelectedPlan(null);
  };

  const plans = [
    {
      name: "Free",
      description: "Perfect for individuals getting started with automation",
      icon: Zap,
      monthlyPrice: 0,
      yearlyPrice: 0,
      originalYearlyPrice: 0,
      color: "from-gray-500 to-gray-600",
      gradient: "from-gray-50 to-blue-50",
      darkGradient: "from-gray-950 to-blue-950",
      features: PLAN_LIMITS.free.features,
      limitations: PLAN_LIMITS.free.limitations,
      cta: "Free",
      isPopular: false,
      isEnterprise: false,
      isFree: true,
    },
    {
      name: "Professional",
      description: "Ideal for growing teams and power users",
      icon: Star,
      monthlyPrice: PLAN_PRICING.professional.monthly,
      yearlyPrice: Math.round(PLAN_PRICING.professional.yearly / 12),
      originalYearlyPrice: PLAN_PRICING.professional.originalYearly / 12,
      color: "from-blue-500 to-purple-600",
      gradient: "from-blue-50 to-purple-50",
      darkGradient: "from-blue-950 to-purple-950",
      features: PLAN_LIMITS.professional.features,
      limitations: PLAN_LIMITS.professional.limitations,
      cta: "Start Professional",
      isPopular: true,
      isEnterprise: false,
      isFree: false,
    },
    {
      name: "Business",
      description: "For larger teams with advanced automation needs",
      icon: Crown,
      monthlyPrice: PLAN_PRICING.business.monthly,
      yearlyPrice: Math.round(PLAN_PRICING.business.yearly / 12),
      originalYearlyPrice: PLAN_PRICING.business.originalYearly / 12,
      color: "from-orange-500 to-red-600",
      gradient: "from-orange-50 to-red-50",
      darkGradient: "from-orange-950 to-red-950",
      features: PLAN_LIMITS.business.features,
      limitations: PLAN_LIMITS.business.limitations,
      cta: "Start Business",
      isPopular: false,
      isEnterprise: false,
      isFree: false,
    },
    {
      name: "Enterprise",
      description: "Custom solution for large organizations",
      icon: Building,
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      originalYearlyPrice: "Custom",
      color: "from-green-500 to-emerald-600",
      gradient: "from-green-50 to-emerald-50",
      darkGradient: "from-green-950 to-emerald-950",
      features: PLAN_LIMITS.enterprise.features,
      limitations: PLAN_LIMITS.enterprise.limitations,
      cta: "Contact Sales",
      isPopular: false,
      isEnterprise: true,
      isFree: false,
    },
  ];

  const faqs = [
    {
      question: "What happens when I exceed my execution limit?",
      answer:
        "We'll notify you when you're approaching your limit. You can upgrade your plan or purchase additional executions. We never stop your workflows without warning.",
    },
    {
      question: "Can I change my plan anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll provide a full refund.",
    },
    {
      question: "What's included in the free trial?",
      answer:
        "All paid plans include a 14-day free trial with full access to all features. No credit card required to start.",
    },
    {
      question: "Do you offer discounts for nonprofits or education?",
      answer:
        "Yes, we offer special pricing for qualified nonprofits and educational institutions. Contact our sales team for details.",
    },
  ];

  const addOns = [
    {
      name: "Additional Executions",
      description: "Extra workflow executions beyond your plan limit",
      price: "$5 per 1,000 executions",
      icon: BarChart3,
    },
    {
      name: "Premium Support",
      description: "Priority phone support and faster response times",
      price: "$99/month",
      icon: Headphones,
    },
    {
      name: "Professional Services",
      description: "Custom workflow development and consulting",
      price: "Custom pricing",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 px-4 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold theme-gradient-text mb-6 theme-typography">
              Choose Your Plan
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Start free, scale as you grow. All plans include our core features
              with no hidden fees or surprises.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span
                className={`text-lg ${
                  !isYearly
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="scale-125"
              />
              <span
                className={`text-lg ${
                  isYearly
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                Yearly
              </span>
              {isYearly && (
                <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                  Save 17%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              const originalYearlyPrice = (plan?.monthlyPrice as number) * 12;

              return (
                <Card
                  key={index}
                  className={`border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group relative ${
                    plan.isPopular ? "ring-2 ring-primary scale-105" : ""
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="theme-gradient text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div
                      className={`mx-auto p-4 rounded-full bg-gradient-to-r ${plan.color} mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>

                    {plan.isEnterprise ? (
                      <div className="text-3xl font-bold">Custom</div>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-4xl font-bold">
                          ${price}
                          {(price as number) > 0 && (
                            <span className="text-lg text-muted-foreground font-normal">
                              /{isYearly ? "year" : "month"}
                            </span>
                          )}
                        </div>
                        {isYearly && (plan.monthlyPrice as number) > 0 && (
                          <div className="text-sm text-muted-foreground line-through">
                            Was ${originalYearlyPrice}/year
                          </div>
                        )}
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}

                      {plan.limitations.map((limitation, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-3 opacity-50"
                        >
                          <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {limitation}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    {(() => {
                      const isCurrentPlan =
                        currentSubscription === plan.name.toLowerCase();

                      if (isCurrentPlan) {
                        return (
                          <Button
                            className="w-full bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 border border-green-300"
                            size="lg"
                            disabled
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Current Plan
                          </Button>
                        );
                      }

                      return (
                        <Button
                          className={`w-full ${
                            plan.isPopular || plan.isEnterprise
                              ? "theme-gradient text-white hover:opacity-90"
                              : "border border-primary text-primary-foreground hover:bg-primary hover:text-white"
                          }`}
                          size="lg"
                          onClick={() => handlePlanSelect(plan)}
                        >
                          {plan.cta}
                          {!plan.isEnterprise && (
                            <ArrowRight className="ml-2 h-4 w-4" />
                          )}
                        </Button>
                      );
                    })()}

                    {!plan.isEnterprise &&
                      (plan.monthlyPrice as number) > 0 && (
                        <p className="text-xs text-center text-muted-foreground">
                          Secure payment • Cancel anytime
                        </p>
                      )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              Compare All Features
            </h2>
            <p className="text-lg text-muted-foreground">
              See what&apos;s included in each plan
            </p>
          </div>

          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Feature</th>
                    <th className="text-center p-4 font-medium">Starter</th>
                    <th className="text-center p-4 font-medium">
                      Professional
                    </th>
                    <th className="text-center p-4 font-medium">Business</th>
                    <th className="text-center p-4 font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Workflows</td>
                    <td className="text-center p-4">5</td>
                    <td className="text-center p-4">Unlimited</td>
                    <td className="text-center p-4">Unlimited</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr className="border-t bg-muted/20">
                    <td className="p-4 font-medium">Monthly Executions</td>
                    <td className="text-center p-4">1,000</td>
                    <td className="text-center p-4">10,000</td>
                    <td className="text-center p-4">50,000</td>
                    <td className="text-center p-4">Custom</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">Team Members</td>
                    <td className="text-center p-4">1</td>
                    <td className="text-center p-4">5</td>
                    <td className="text-center p-4">25</td>
                    <td className="text-center p-4">Unlimited</td>
                  </tr>
                  <tr className="border-t bg-muted/20">
                    <td className="p-4 font-medium">Support</td>
                    <td className="text-center p-4">Email</td>
                    <td className="text-center p-4">Email + Chat</td>
                    <td className="text-center p-4">Email + Chat</td>
                    <td className="text-center p-4">
                      24/7 Phone + Dedicated Manager
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4 font-medium">SLA</td>
                    <td className="text-center p-4">
                      <X className="h-4 w-4 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <X className="h-4 w-4 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <X className="h-4 w-4 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center p-4">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              Add-ons & Extras
            </h2>
            <p className="text-lg text-muted-foreground">
              Enhance your plan with additional services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <Card
                  key={index}
                  className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto p-4 rounded-full theme-gradient mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{addon.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {addon.description}
                    </p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold mb-4 theme-primary">
                      {addon.price}
                    </div>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
            <Users className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4 theme-typography">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of teams who are already automating their
              workflows. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/auth/signup">
                  Start Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md bg-background border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <CreditCard className="w-5 h-5 text-primary" />
              Confirm Your Plan
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              You&apos;re about to enroll in the {selectedPlan?.name} plan
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/50">
              <h4 className="font-semibold text-lg mb-2 text-foreground">
                {selectedPlan?.name} Plan
              </h4>
              <div className="flex justify-between items-center mb-2 text-foreground">
                <span>Plan Price:</span>
                <span className="font-semibold text-primary">
                  $
                  {isYearly
                    ? selectedPlan?.yearlyPrice
                    : selectedPlan?.monthlyPrice}
                  /month
                </span>
              </div>
              {isYearly && (
                <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
                  <span>Annual Savings:</span>
                  <span className="font-semibold">
                    $
                    {(() => {
                      const original =
                        typeof selectedPlan?.originalYearlyPrice === "number"
                          ? selectedPlan.originalYearlyPrice
                          : 0;
                      const yearly =
                        typeof selectedPlan?.yearlyPrice === "number"
                          ? selectedPlan.yearlyPrice
                          : 0;
                      return (original - yearly) * 12;
                    })()}
                    /year
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>
                Secure payment • Cancel anytime • 30-day money back guarantee
              </span>
            </div>
          </div>

          <DialogFooter className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirmModal(false)}
              className="flex-1 border-border hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {isProcessing ? "Processing..." : "Pay with Stripe"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md bg-background border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              {!session
                ? "Welcome to WebflowApp!"
                : selectedPlan?.isFree
                ? "Welcome to WebflowApp!"
                : "Payment Successful!"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {!session
                ? `You've selected the ${selectedPlan?.name} plan! Create your account to get started with amazing workflows.`
                : selectedPlan?.isFree
                ? `You've successfully enrolled in our ${selectedPlan?.name} plan! Start building amazing workflows today.`
                : `Welcome to WebflowApp! Your ${selectedPlan?.name} plan is now active.`}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-lg mb-2 text-emerald-800 dark:text-emerald-200">
                What&apos;s Next?
              </h4>
              <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                {!session ? (
                  <>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Create your account to get started
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Access your plan features
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Begin building workflows
                    </li>
                  </>
                ) : selectedPlan?.isFree ? (
                  <>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Build your first 3 workflows
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Explore basic integrations
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Access your dashboard
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Check your email for setup instructions
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Access your dashboard to create workflows
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Explore our integration library
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleSuccessClose}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700"
            >
              {!session ? "Create Account" : "Go to Dashboard"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

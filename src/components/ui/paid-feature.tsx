"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Lock,
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  Check,
} from "lucide-react";

interface PaidFeatureProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  features?: string[];
}

export function PaidFeature({
  title,
  description,
  icon: Icon = Lock,
  features = [
    "Advanced analytics and reporting",
    "Priority support",
    "Unlimited access",
    "Custom integrations",
  ],
}: PaidFeatureProps) {
  return (
    <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <Card className="max-w-3xl w-full border-2 border-primary/20 shadow-2xl relative overflow-hidden backdrop-blur-sm bg-card/95 hover:shadow-primary/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />

        {/* Animated Border Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ clipPath: "inset(0 0 99% 0)" }}
        />

        <CardContent className="p-8 sm:p-12 relative">
          <div className="text-center space-y-8">
            {/* Floating Icons Animation */}
            <div className="absolute top-4 right-4 opacity-20">
              <Star
                className="h-6 w-6 text-amber-500 animate-spin"
                style={{ animationDuration: "8s" }}
              />
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
              <Zap
                className="h-6 w-6 text-blue-500 animate-bounce"
                style={{ animationDuration: "3s" }}
              />
            </div>

            {/* Icon with Enhanced Animation */}
            <div className="relative inline-flex group">
              {/* Pulsing Rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-20 animate-ping" />
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-10 animate-pulse"
                style={{ animationDuration: "3s" }}
              />

              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />

              {/* Main Icon Container */}
              <div className="relative p-8 rounded-full bg-gradient-to-br from-primary via-purple-600 to-blue-600 shadow-2xl transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-6">
                <Icon className="h-16 w-16 text-white drop-shadow-lg" />
              </div>

              {/* Sparkle Effect */}
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
              </div>
            </div>

            {/* Premium Badge with Animation */}
            <div className="flex justify-center animate-in fade-in slide-in-from-top-2 duration-700">
              <Badge className="px-6 py-2 text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-shimmer">
                <Crown
                  className="h-5 w-5 mr-2 animate-bounce"
                  style={{ animationDuration: "2s" }}
                />
                Premium Feature
              </Badge>
            </div>

            {/* Title with Gradient Animation */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150">
              <h2 className="text-4xl sm:text-5xl font-bold theme-gradient-text theme-typography leading-tight">
                {title}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto">
                {description}
              </p>
            </div>

            {/* Features List with Staggered Animation */}
            <div className="bg-gradient-to-br from-muted/50 via-muted/30 to-transparent rounded-2xl p-8 border border-border/50 shadow-inner backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 hover:border-primary/30 transition-all duration-500">
              <h3 className="text-base font-bold text-foreground mb-6 flex items-center justify-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </div>
                Premium Features Included
              </h3>
              <ul className="space-y-4 text-left max-w-md mx-auto">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-base group hover:translate-x-2 transition-transform duration-300"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${
                        index * 0.1 + 0.5
                      }s both`,
                    }}
                  >
                    <div className="shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Check className="w-4 h-4 text-white font-bold" />
                    </div>
                    <span className="text-foreground font-medium leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button with Enhanced Hover Effects */}
            <div className="flex justify-center pt-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-500">
              <Button
                size="lg"
                asChild
                className="group relative overflow-hidden px-8 py-6 text-base font-bold theme-gradient text-white shadow-2xl hover:shadow-primary/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-0"
              >
                <Link
                  href={process.env.NEXT_PUBLIC_PURCHASE_LINK || "/pricing"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 flex items-center gap-3"
                >
                  <Crown className="h-6 w-6 group-hover:animate-bounce" />
                  <span>Purchase Premium Access</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                </Link>
              </Button>
            </div>

            {/* Additional Info with Icon */}
            <div className="pt-6 border-t border-border/50 animate-in fade-in duration-700 delay-700">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground max-w-md mx-auto">
                <div className="p-1.5 rounded-md bg-muted">
                  <Lock className="h-3.5 w-3.5" />
                </div>
                <p>
                  This is a{" "}
                  <span className="font-semibold text-foreground">
                    Premium Feature
                  </span>
                  . Purchase once to unlock all admin features forever.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CSS Keyframes for Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

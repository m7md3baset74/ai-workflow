"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Settings,
  BarChart3,
  Shield,
  Globe,
  Clock,
  Info,
  CheckCircle,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CookiePolicy() {
  const lastUpdated = "December 1, 2024";
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: true,
    marketing: false,
    preferences: true,
  });

  const cookieTypes = [
    {
      id: "essential",
      title: "Essential Cookies",
      icon: Shield,
      description:
        "Required for basic website functionality and security. These cannot be disabled.",
      examples: [
        "Authentication and login status",
        "Session management",
        "Security tokens",
        "Load balancing",
      ],
      duration: "Session or up to 1 year",
      canDisable: false,
      color: "from-red-500 to-red-600",
    },
    {
      id: "analytics",
      title: "Analytics Cookies",
      icon: BarChart3,
      description:
        "Help us understand how visitors use our website to improve user experience.",
      examples: [
        "Google Analytics (_ga, _gat, _gid)",
        "Page views and user interactions",
        "Performance monitoring",
        "Error tracking",
      ],
      duration: "Up to 2 years",
      canDisable: true,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "preferences",
      title: "Preference Cookies",
      icon: Settings,
      description:
        "Remember your settings and preferences for a personalized experience.",
      examples: [
        "Theme preferences (dark/light mode)",
        "Language settings",
        "Dashboard layout",
        "Notification preferences",
      ],
      duration: "Up to 1 year",
      canDisable: true,
      color: "from-green-500 to-green-600",
    },
    {
      id: "marketing",
      title: "Marketing Cookies",
      icon: Globe,
      description:
        "Used to track visitors for advertising and marketing purposes.",
      examples: [
        "Advertising platform cookies",
        "Social media tracking",
        "Conversion tracking",
        "Retargeting pixels",
      ],
      duration: "Up to 1 year",
      canDisable: true,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const thirdPartyServices = [
    {
      name: "Google Analytics",
      purpose: "Website analytics and performance monitoring",
      cookies: "_ga, _gat, _gid",
      privacy: "https://policies.google.com/privacy",
    },
    {
      name: "Intercom",
      purpose: "Customer support and communication",
      cookies: "intercom-*",
      privacy: "https://www.intercom.com/legal/privacy",
    },
    {
      name: "Stripe",
      purpose: "Payment processing and fraud detection",
      cookies: "__stripe_*",
      privacy: "https://stripe.com/privacy",
    },
    {
      name: "Cloudflare",
      purpose: "Content delivery and security",
      cookies: "__cf_*",
      privacy: "https://www.cloudflare.com/privacypolicy/",
    },
  ];

  const handleCookiePreference = (type: string, enabled: boolean) => {
    if (type === "essential") return; // Cannot disable essential cookies

    setCookiePreferences((prev) => ({
      ...prev,
      [type]: enabled,
    }));
  };

  const savePreferences = () => {
    // Here you would typically save preferences to localStorage and update actual cookie settings
    console.log("Saving cookie preferences:", cookiePreferences);
    alert("Cookie preferences saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 font-medium">
              Cookie Settings
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="theme-gradient-text">Cookie Policy</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn about how we use cookies and similar technologies to improve
              your experience on WebflowApp.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 border border-border/50 shadow-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <Info className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-card-foreground">
                  What Are Cookies?
                </h2>
              </div>
              <p className="text-card-foreground/90 leading-relaxed">
                Cookies are small text files that are stored on your device when
                you visit our website. They help us provide you with a better
                experience by remembering your preferences, analyzing how you
                use our site, and enabling certain functionality. You can manage
                your cookie preferences below.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {cookieTypes.map((type) => {
              const Icon = type.icon;
              const isEnabled =
                cookiePreferences[type.id as keyof typeof cookiePreferences];

              return (
                <Card
                  key={type.id}
                  className="border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-3 text-xl text-card-foreground">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${type.color}/10 border border-primary/20`}
                        >
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <span>{type.title}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {type.canDisable ? (
                          <Switch
                            checked={isEnabled}
                            onCheckedChange={(checked) =>
                              handleCookiePreference(type.id, checked)
                            }
                          />
                        ) : (
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Required</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground/90 mb-4">
                      {type.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-card-foreground mb-2">
                          Examples:
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {type.examples.map((example, idx) => (
                            <li
                              key={idx}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-card-foreground mb-2">
                          Duration:
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {type.duration}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Save Preferences Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={savePreferences}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              Save Cookie Preferences
            </Button>
          </div>
        </div>
      </section>

      {/* Third Party Services */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Third-Party Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thirdPartyServices.map((service, index) => (
              <Card
                key={index}
                className="border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <h3 className="font-semibold text-card-foreground mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.purpose}
                  </p>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-medium text-card-foreground">
                        Cookies:{" "}
                      </span>
                      <span className="text-muted-foreground">
                        {service.cookies}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-card-foreground">
                        Privacy Policy:{" "}
                      </span>
                      <Link
                        href={service.privacy}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        View Policy
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border border-border/50 shadow-lg bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Questions About Cookies?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have any questions about our use of cookies or need help
                managing your preferences, please contact us.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <p>
                  Email:{" "}
                  <span className="text-primary font-medium">
                    privacy@webflowapp.com
                  </span>
                </p>
                <p>
                  Address: 123 Market Street, Suite 500, San Francisco, CA 94105
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10"
                >
                  <Link href="/privacy">Privacy Policy</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10"
                >
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

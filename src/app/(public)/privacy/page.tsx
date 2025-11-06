"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Eye,
  Database,
  Lock,
  Globe,
  Users,
  Settings,
  Clock,
  Mail,
  FileText,
  Cookie,
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const lastUpdated = "December 1, 2024";

  const sections = [
    {
      id: "information-collection",
      title: "1. Information We Collect",
      icon: Database,
      content: [
        "Personal Information: We collect information you provide directly, such as your name, email address, and account details when you register or use our services.",
        "Usage Data: We automatically collect information about how you interact with our platform, including workflow data, feature usage, and performance metrics.",
        "Device Information: We collect information about the device and browser you use to access our services, including IP address, browser type, and operating system.",
        "Cookies and Tracking: We use cookies and similar technologies to enhance your experience and analyze usage patterns.",
      ],
    },
    {
      id: "information-use",
      title: "2. How We Use Your Information",
      icon: Settings,
      content: [
        "Provide and maintain our services, including processing workflows and managing your account.",
        "Improve our platform by analyzing usage patterns and user feedback.",
        "Communicate with you about service updates, security alerts, and promotional offers.",
        "Ensure security and prevent fraud or abuse of our services.",
        "Comply with legal obligations and enforce our terms of service.",
      ],
    },
    {
      id: "information-sharing",
      title: "3. Information Sharing and Disclosure",
      icon: Users,
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "Service Providers: We may share information with trusted third-party service providers who assist in operating our platform.",
        "Legal Requirements: We may disclose information when required by law or to protect our rights and safety.",
        "Business Transfers: In the event of a merger or acquisition, user information may be transferred as part of the business assets.",
        "Consent: We may share information with your explicit consent for specific purposes.",
      ],
    },
    {
      id: "data-security",
      title: "4. Data Security",
      icon: Lock,
      content: [
        "We implement industry-standard security measures to protect your data, including encryption at rest and in transit.",
        "Access controls ensure that only authorized personnel can access your information.",
        "Regular security audits and monitoring help detect and prevent unauthorized access.",
        "We follow SOC 2 Type II standards and maintain compliance with security best practices.",
        "In the event of a data breach, we will notify affected users promptly as required by law.",
      ],
    },
    {
      id: "data-retention",
      title: "5. Data Retention",
      icon: Clock,
      content: [
        "We retain your personal information for as long as necessary to provide our services.",
        "Account data is retained while your account is active and for a reasonable period after account closure.",
        "Workflow data is retained according to your subscription plan and backup policies.",
        "Some information may be retained longer to comply with legal obligations or resolve disputes.",
        "You can request deletion of your data by contacting our support team.",
      ],
    },
    {
      id: "user-rights",
      title: "6. Your Rights and Choices",
      icon: Eye,
      content: [
        "Access: You can request a copy of the personal information we hold about you.",
        "Correction: You can update or correct your personal information through your account settings.",
        "Deletion: You can request deletion of your personal information, subject to legal and operational requirements.",
        "Portability: You can export your workflow data and other information in common formats.",
        "Opt-out: You can unsubscribe from marketing communications at any time.",
      ],
    },
    {
      id: "cookies",
      title: "7. Cookies and Tracking Technologies",
      icon: Cookie,
      content: [
        "Essential Cookies: Required for basic functionality, including authentication and security.",
        "Analytics Cookies: Help us understand how users interact with our platform to improve our services.",
        "Preference Cookies: Remember your settings and preferences for a better user experience.",
        "You can control cookie settings through your browser, but disabling certain cookies may affect functionality.",
        "We use Google Analytics and similar services to analyze usage patterns while respecting privacy.",
      ],
    },
    {
      id: "international-transfers",
      title: "8. International Data Transfers",
      icon: Globe,
      content: [
        "Our services are primarily hosted in the United States with global content delivery networks.",
        "We ensure appropriate safeguards are in place when transferring data internationally.",
        "We comply with applicable data protection laws, including GDPR for European users.",
        "Standard contractual clauses and adequacy decisions guide our international data transfers.",
        "Users can contact us for specific information about data transfer mechanisms.",
      ],
    },
    {
      id: "childrens-privacy",
      title: "9. Children's Privacy",
      icon: Shield,
      content: [
        "Our services are not directed to children under 13 years of age.",
        "We do not knowingly collect personal information from children under 13.",
        "If we become aware that we have collected information from a child under 13, we will delete it promptly.",
        "Parents who believe their child has provided information should contact us immediately.",
        "We encourage parents to monitor their children's internet activities.",
      ],
    },
    {
      id: "policy-changes",
      title: "10. Changes to This Privacy Policy",
      icon: FileText,
      content: [
        "We may update this privacy policy from time to time to reflect changes in our practices.",
        "Significant changes will be announced via email or prominent notice on our platform.",
        "Continued use of our services after changes constitutes acceptance of the updated policy.",
        "We will maintain previous versions of our privacy policy for reference.",
        "The date of the last update is indicated at the top of this policy.",
      ],
    },
  ];

  const gdprRights = [
    "Right to access your personal data",
    "Right to rectification of inaccurate data",
    "Right to erasure (right to be forgotten)",
    "Right to restrict processing",
    "Right to data portability",
    "Right to object to processing",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 font-medium">
              Privacy & Security
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="theme-gradient-text">Privacy Policy</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information when you use
              WebflowApp.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.id}
                  className="border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3 text-xl text-card-foreground">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-primary/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.content.map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-card-foreground/90 leading-relaxed text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* GDPR Rights Section */}
          <Card className="mt-12 border border-border/50 shadow-lg bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-xl text-card-foreground">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span>GDPR Rights (EU Users)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/90 mb-6">
                If you are a resident of the European Union, you have the
                following rights under the General Data Protection Regulation
                (GDPR):
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {gdprRights.map((right, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full"></div>
                    <span className="text-sm text-card-foreground/80">
                      {right}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                To exercise these rights, please contact us at
                privacy@webflowapp.com with your request.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="mt-8 border border-border/50 shadow-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Privacy Questions or Concerns?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We&apos;re committed to protecting your privacy. If you have any
                questions about this policy or our data practices, please reach
                out.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <p>
                  Privacy Team:{" "}
                  <span className="text-primary font-medium">
                    privacy@webflowapp.com
                  </span>
                </p>
                <p>
                  Data Protection Officer:{" "}
                  <span className="text-primary font-medium">
                    dpo@webflowapp.com
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
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Link href="/terms">View Terms of Service</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

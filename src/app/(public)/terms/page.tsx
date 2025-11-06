"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Shield,
  Users,
  Globe,
  AlertTriangle,
  Scale,
  Clock,
  Mail,
} from "lucide-react";

export default function TermsOfService() {
  const lastUpdated = "December 1, 2024";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: FileText,
      content: [
        "By accessing and using WebflowApp's services, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These terms apply to all users of the service, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.",
      ],
    },
    {
      id: "service-description",
      title: "2. Service Description",
      icon: Globe,
      content: [
        "WebflowApp provides workflow automation tools and services that allow users to create, manage, and execute automated workflows.",
        "Our platform includes visual workflow builders, integration capabilities, and monitoring tools.",
        "We reserve the right to modify, suspend, or discontinue any part of our services at any time with appropriate notice.",
      ],
    },
    {
      id: "user-accounts",
      title: "3. User Accounts and Registration",
      icon: Users,
      content: [
        "You must provide accurate, current, and complete information during the registration process.",
        "You are responsible for safeguarding your account credentials and for all activities that occur under your account.",
        "You must notify us immediately of any unauthorized use of your account.",
        "We reserve the right to suspend or terminate accounts that violate our terms of service.",
      ],
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable Use Policy",
      icon: Shield,
      content: [
        "You may not use our service for any illegal or unauthorized purpose.",
        "You must not violate any laws in your jurisdiction when using our service.",
        "You are prohibited from using the service to transmit worms, viruses, or any code of a destructive nature.",
        "You may not use our service to spam, harass, or abuse other users.",
        "Automated data collection or scraping is prohibited without explicit written consent.",
      ],
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property Rights",
      icon: Scale,
      content: [
        "The service and its original content, features, and functionality are and will remain the exclusive property of WebflowApp.",
        "The service is protected by copyright, trademark, and other laws.",
        "You retain ownership of content you create using our platform.",
        "By using our service, you grant us a limited license to host and display your content as necessary to provide the service.",
      ],
    },
    {
      id: "privacy-data",
      title: "6. Privacy and Data Protection",
      icon: Shield,
      content: [
        "Your privacy is important to us. Please review our Privacy Policy for details on how we collect and use your information.",
        "We implement appropriate security measures to protect your personal information.",
        "We comply with applicable data protection laws, including GDPR and CCPA.",
        "You have the right to request access to, correction of, or deletion of your personal data.",
      ],
    },
    {
      id: "service-availability",
      title: "7. Service Availability and Support",
      icon: Clock,
      content: [
        "We strive to maintain high service availability but cannot guarantee 100% uptime.",
        "Scheduled maintenance will be announced in advance when possible.",
        "Technical support is provided according to your subscription plan.",
        "We are not liable for any losses resulting from service interruptions.",
      ],
    },
    {
      id: "limitation-liability",
      title: "8. Limitation of Liability",
      icon: AlertTriangle,
      content: [
        "In no event shall WebflowApp be liable for any indirect, incidental, special, consequential, or punitive damages.",
        "Our total liability shall not exceed the amount paid by you for the service in the twelve months preceding the claim.",
        "Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability for consequential damages.",
        "These limitations apply to all claims, whether based on warranty, contract, tort, or any other legal theory.",
      ],
    },
    {
      id: "termination",
      title: "9. Termination",
      icon: AlertTriangle,
      content: [
        "You may terminate your account at any time by contacting our support team.",
        "We may terminate or suspend your account immediately, without prior notice, for conduct that violates these terms.",
        "Upon termination, your right to use the service will cease immediately.",
        "We will provide reasonable access to export your data following account termination.",
      ],
    },
    {
      id: "changes-terms",
      title: "10. Changes to Terms",
      icon: FileText,
      content: [
        "We reserve the right to modify these terms at any time.",
        "Changes will be effective immediately upon posting on our website.",
        "Continued use of the service after changes constitutes acceptance of the new terms.",
        "We will notify users of significant changes via email or service announcements.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 font-medium">
              Legal Documents
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="theme-gradient-text">Terms of Service</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services. By
              using WebflowApp, you agree to be bound by these terms.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
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
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-primary/20">
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

          {/* Contact Section */}
          <Card className="mt-12 border border-border/50 shadow-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Questions About These Terms?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have any questions about these Terms of Service, please
                don&apos;t hesitate to contact our legal team.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Email:{" "}
                  <span className="text-primary font-medium">
                    legal@webflowapp.com
                  </span>
                </p>
                <p>
                  Address: 123 Market Street, Suite 500, San Francisco, CA 94105
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

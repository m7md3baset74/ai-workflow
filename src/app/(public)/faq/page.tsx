"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  Zap,
  Users,
  CreditCard,
  Shield,
  Settings,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
      questions: [
        {
          question: "How do I create my first workflow?",
          answer:
            "Creating your first workflow is easy! After signing up, click 'Create Workflow' from your dashboard. You'll be taken to our visual workflow builder where you can drag and drop nodes to create your automation. Start with a trigger (like 'When a form is submitted') and add actions (like 'Send an email'). Our getting started guide walks you through this process step by step.",
        },
        {
          question: "What integrations are available?",
          answer:
            "We support over 500+ integrations including popular tools like Gmail, Slack, Salesforce, HubSpot, Shopify, Google Sheets, Dropbox, and many more. You can find a complete list in our integrations directory. If you need a specific integration that's not available, let us know and we'll prioritize it for development.",
        },
        {
          question: "Do I need coding knowledge to use WebflowApp?",
          answer:
            "No coding knowledge is required! Our visual workflow builder is designed to be intuitive and user-friendly. You can create powerful automations using our drag-and-drop interface. However, if you have coding experience, you can also use our JavaScript nodes and API integrations for advanced customizations.",
        },
      ],
    },
    {
      title: "Workflows & Automation",
      icon: Settings,
      color: "from-green-500 to-green-600",
      questions: [
        {
          question: "How many workflows can I create?",
          answer:
            "The number of workflows you can create depends on your plan. Free accounts can create up to 5 workflows, Professional plans offer unlimited workflows, and Enterprise plans include additional features like team collaboration and advanced analytics.",
        },
        {
          question: "Can I schedule workflows to run at specific times?",
          answer:
            "Yes! You can schedule workflows using our time-based triggers. Set workflows to run daily, weekly, monthly, or at any custom interval. You can also set specific dates and times for one-time executions. Our scheduler supports complex timing patterns and timezone configurations.",
        },
        {
          question: "What happens if a workflow fails?",
          answer:
            "When a workflow fails, we automatically retry the execution based on your retry settings. You'll receive notifications about failures, and can view detailed error logs in your dashboard. Failed workflows can be manually retried, and we provide debugging tools to help identify and fix issues.",
        },
        {
          question: "Can multiple people work on the same workflow?",
          answer:
            "Yes, with our Professional and Enterprise plans, you can collaborate on workflows with your team. Multiple users can edit workflows simultaneously with real-time synchronization. You can also set permissions to control who can view, edit, or execute specific workflows.",
        },
      ],
    },
    {
      title: "Pricing & Plans",
      icon: CreditCard,
      color: "from-purple-500 to-purple-600",
      questions: [
        {
          question: "Is there a free plan available?",
          answer:
            "Yes! Our Starter plan is completely free and includes up to 5 workflows, 1,000 executions per month, basic integrations, and community support. It's perfect for individuals and small teams just getting started with automation.",
        },
        {
          question: "Can I change plans at any time?",
          answer:
            "Absolutely! You can upgrade or downgrade your plan at any time from your account settings. When upgrading, you'll have immediate access to new features. When downgrading, changes take effect at the end of your current billing cycle, and you'll retain access to premium features until then.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise customers. All payments are processed securely through Stripe. We also offer annual billing with significant discounts.",
        },
        {
          question: "Do you offer refunds?",
          answer:
            "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied with WebflowApp within the first 30 days, contact our support team for a full refund. For Enterprise customers, we can arrange custom terms during the sales process.",
        },
      ],
    },
    {
      title: "Security & Privacy",
      icon: Shield,
      color: "from-red-500 to-red-600",
      questions: [
        {
          question: "How secure is my data?",
          answer:
            "Security is our top priority. We use enterprise-grade encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Our infrastructure is SOC 2 Type II certified, and we undergo regular security audits. We never store sensitive credentials in plain text and use secure vaults for integration tokens.",
        },
        {
          question: "Do you comply with GDPR and other privacy regulations?",
          answer:
            "Yes, we're fully GDPR compliant and also comply with CCPA, HIPAA (for Enterprise customers), and other major privacy regulations. We provide data processing agreements, maintain detailed privacy policies, and offer tools for data export and deletion upon request.",
        },
        {
          question: "Where is my data stored?",
          answer:
            "Your data is stored in secure, geographically distributed data centers. Primary storage is in the US with redundant backups in multiple regions. Enterprise customers can choose specific geographic regions for data storage to meet compliance requirements.",
        },
      ],
    },
    {
      title: "Account & Support",
      icon: Users,
      color: "from-orange-500 to-orange-600",
      questions: [
        {
          question: "How can I contact support?",
          answer:
            "We offer multiple support channels: email support for all users, live chat for Professional and Enterprise customers, and phone support for Enterprise accounts. You can also access our comprehensive documentation, video tutorials, and community forum for self-service help.",
        },
        {
          question: "Can I export my workflows?",
          answer:
            "Yes! You can export your workflows as JSON files for backup or migration purposes. Enterprise customers also have access to our API for programmatic workflow management. We believe your data should always be portable and accessible.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "You can delete your account at any time from your account settings. Before deletion, make sure to export any important workflows or data. Account deletion is permanent and cannot be undone. We'll completely remove your data within 30 days of deletion request.",
        },
      ],
    },
  ];

  const filteredFAQs = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const itemId = categoryIndex * 1000 + questionIndex;
    setOpenItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isOpen = (categoryIndex: number, questionIndex: number) => {
    const itemId = categoryIndex * 1000 + questionIndex;
    return openItems.includes(itemId);
  };

  return (
    <div className="min-h-screen gradient-bg-enhanced public-page">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-sm badge-enhanced">
              Help Center
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="theme-gradient-text">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-xl text-enhanced-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about WebflowApp. Can&apos;t find
              what you&apos;re looking for? Our support team is here to help.
            </p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-enhanced-subtle" />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-border/50 rounded-lg bg-card/80 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <Card className="card-enhanced text-center py-12">
              <CardContent>
                <HelpCircle className="h-12 w-12 text-enhanced-subtle mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-enhanced mb-2">
                  No results found
                </h3>
                <p className="text-enhanced-muted">
                  Try different keywords or browse all categories below.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {filteredFAQs.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <div key={categoryIndex}>
                    <div className="flex items-center space-x-3 mb-6">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-r ${category.color}/10 border border-primary/20`}
                      >
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-enhanced">
                        {category.title}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {category.questions.map((item, questionIndex) => (
                        <Card key={questionIndex} className="card-enhanced">
                          <CardHeader
                            className="cursor-pointer hover:bg-muted/20 transition-colors"
                            onClick={() =>
                              toggleItem(categoryIndex, questionIndex)
                            }
                          >
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg text-enhanced pr-4">
                                {item.question}
                              </CardTitle>
                              {isOpen(categoryIndex, questionIndex) ? (
                                <ChevronUp className="h-5 w-5 text-enhanced-subtle flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-enhanced-subtle flex-shrink-0" />
                              )}
                            </div>
                          </CardHeader>
                          {isOpen(categoryIndex, questionIndex) && (
                            <CardContent className="pt-0">
                              <p className="text-enhanced-muted leading-relaxed">
                                {item.answer}
                              </p>
                            </CardContent>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="card-enhanced bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-enhanced mb-2">
                Still Need Help?
              </h3>
              <p className="text-enhanced-muted mb-6 max-w-2xl mx-auto">
                Can&apos;t find the answer you&apos;re looking for? Our support
                team is ready to help you get the most out of WebflowApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10 button-enhanced"
                >
                  <Link href="/help">Browse Help Center</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
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

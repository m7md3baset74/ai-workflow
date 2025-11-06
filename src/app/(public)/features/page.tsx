"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Workflow,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Clock,
  Settings,
  Database,
  MessageSquare,
  GitBranch,
  RotateCw,
  Eye,
  Play,
  CheckCircle,
  ArrowRight,
  Star,
  Layers,
  Cloud,
  Lock,
  Smartphone,
  Palette,
} from "lucide-react";

export default function Features() {
  const coreFeatures = [
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
      description:
        "Create complex workflows with our intuitive drag-and-drop interface. No coding required.",
      features: [
        "Drag & drop nodes",
        "Visual connections",
        "Real-time preview",
        "Auto-save functionality",
      ],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Real-time Execution",
      description:
        "Execute workflows instantly and see results in real-time with comprehensive monitoring.",
      features: [
        "Instant execution",
        "Live monitoring",
        "Performance metrics",
        "Error tracking",
      ],
      gradient: "from-yellow-500 to-orange-600",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level security with encryption, compliance, and role-based access control.",
      features: [
        "End-to-end encryption",
        "SOC 2 compliance",
        "Role-based access",
        "Audit logs",
      ],
      gradient: "from-green-500 to-teal-600",
    },
    {
      icon: Globe,
      title: "200+ Integrations",
      description:
        "Connect with your favorite tools and services through our extensive integration library.",
      features: [
        "Pre-built connectors",
        "Custom integrations",
        "API support",
        "Webhook triggers",
      ],
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const advancedFeatures = [
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description:
        "Track performance and optimize workflows with detailed analytics.",
    },
    {
      icon: Clock,
      title: "Scheduled Execution",
      description: "Run workflows on schedules with cron-like flexibility.",
    },
    {
      icon: Settings,
      title: "Advanced Configuration",
      description:
        "Fine-tune every aspect of your workflows with detailed settings.",
    },
    {
      icon: Database,
      title: "Data Transformation",
      description: "Transform and manipulate data seamlessly between systems.",
    },
    {
      icon: MessageSquare,
      title: "Collaboration Tools",
      description: "Work together with team comments and shared workspaces.",
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description: "Track changes and maintain workflow versions like code.",
    },
    {
      icon: RotateCw,
      title: "Error Handling",
      description: "Robust error handling with retry logic and fallbacks.",
    },
    {
      icon: Eye,
      title: "Monitoring & Logs",
      description: "Comprehensive monitoring with detailed execution logs.",
    },
    {
      icon: Cloud,
      title: "Cloud Native",
      description:
        "Built for the cloud with auto-scaling and high availability.",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Manage workflows on any device with our responsive design.",
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description:
        "Your data stays secure with industry-leading privacy controls.",
    },
    {
      icon: Palette,
      title: "Custom Theming",
      description:
        "Customize the interface to match your brand and preferences.",
    },
  ];

  const useCases = [
    {
      title: "Customer Onboarding",
      description:
        "Automate new customer setup, account creation, and welcome sequences.",
      example:
        "Slack notification → Create account → Send welcome email → Add to CRM",
    },
    {
      title: "Data Synchronization",
      description: "Keep data in sync across multiple platforms and databases.",
      example:
        "Salesforce update → Transform data → Update database → Notify team",
    },
    {
      title: "Order Processing",
      description: "Streamline order management from purchase to fulfillment.",
      example:
        "New order → Payment processing → Inventory update → Shipping notification",
    },
    {
      title: "Content Management",
      description: "Automate content publishing and distribution workflows.",
      example:
        "Content approval → Format content → Publish to platforms → Analytics tracking",
    },
  ];

  return (
    <div className="min-h-screen gradient-bg-enhanced public-page">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 px-4 py-1 text-sm badge-enhanced">
              Powerful Features
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold theme-gradient-text mb-6 theme-typography">
              Everything You Need
            </h1>
            <p className="text-xl sm:text-2xl text-enhanced-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              Build, deploy, and manage powerful automation workflows with our
              comprehensive feature set designed for teams of all sizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="theme-gradient hover:opacity-90 text-white text-lg px-8 py-4"
              >
                <Link href="/auth/signup">
                  <Play className="mr-2 h-5 w-5" />
                  Try It Free
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-4"
              >
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 theme-typography">
              Core Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The essential tools you need to build powerful automation
              workflows
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {feature.title}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 gap-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Features Grid */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 theme-typography">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-grade features for enterprise workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {advancedFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-200 hover:scale-105 group border-border bg-card/50 backdrop-blur"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full theme-gradient group-hover:scale-110 transition-transform w-fit">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:theme-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 theme-typography">
              Real-World Use Cases
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how teams are using WebflowApp to automate their processes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur"
              >
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-2" />
                    {useCase.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm font-mono text-foreground">
                      {useCase.example}
                    </p>
                  </div>
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
            <Layers className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4 theme-typography">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of teams who are already automating their workflows
              with WebflowApp. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

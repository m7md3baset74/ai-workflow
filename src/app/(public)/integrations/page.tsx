"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  Search,
  Filter,
  Star,
  ExternalLink,
  CheckCircle,
  Plus,
  ArrowRight,
  Code,
  Clock,
  Users,
  Mail,
  MessageSquare,
  CreditCard,
  FileText,
  BarChart3,
  Smartphone,
  ShoppingCart,
  Cloud,
  GitBranch,
  Headphones,
} from "lucide-react";

export default function Integrations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "communication", label: "Communication" },
    { value: "crm-sales", label: "CRM & Sales" },
    { value: "productivity", label: "Productivity" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "marketing", label: "Marketing" },
    { value: "finance", label: "Finance & Accounting" },
    { value: "development", label: "Development" },
    { value: "analytics", label: "Analytics" },
    { value: "storage", label: "Cloud Storage" },
    { value: "support", label: "Customer Support" },
  ];

  const integrations = [
    {
      id: 1,
      name: "Slack",
      description:
        "Send messages, create channels, and manage your Slack workspace directly from workflows.",
      category: "communication",
      icon: MessageSquare,
      color: "bg-purple-500",
      rating: 4.9,
      usageCount: "15.2k",
      isPopular: true,
      isFeatured: true,
      features: [
        "Send messages",
        "Create channels",
        "User management",
        "File uploads",
      ],
      setupTime: "2 minutes",
    },
    {
      id: 2,
      name: "Gmail",
      description:
        "Send emails, manage labels, and automate your email workflows with Gmail integration.",
      category: "communication",
      icon: Mail,
      color: "bg-red-500",
      rating: 4.8,
      usageCount: "23.7k",
      isPopular: true,
      isFeatured: true,
      features: [
        "Send emails",
        "Read messages",
        "Label management",
        "Attachment handling",
      ],
      setupTime: "3 minutes",
    },
    {
      id: 3,
      name: "Salesforce",
      description:
        "Sync contacts, manage leads, and automate your sales processes with Salesforce CRM.",
      category: "crm-sales",
      icon: Users,
      color: "bg-blue-600",
      rating: 4.7,
      usageCount: "8.9k",
      isPopular: true,
      isFeatured: false,
      features: [
        "Contact sync",
        "Lead management",
        "Opportunity tracking",
        "Custom objects",
      ],
      setupTime: "5 minutes",
    },
    {
      id: 4,
      name: "Google Sheets",
      description:
        "Read, write, and manipulate spreadsheet data with Google Sheets integration.",
      category: "productivity",
      icon: FileText,
      color: "bg-green-600",
      rating: 4.8,
      usageCount: "19.3k",
      isPopular: true,
      isFeatured: false,
      features: ["Read data", "Write data", "Create sheets", "Cell formatting"],
      setupTime: "2 minutes",
    },
    {
      id: 5,
      name: "Shopify",
      description:
        "Manage products, orders, and customers in your Shopify store through automated workflows.",
      category: "ecommerce",
      icon: ShoppingCart,
      color: "bg-green-500",
      rating: 4.6,
      usageCount: "6.7k",
      isPopular: false,
      isFeatured: true,
      features: [
        "Product management",
        "Order processing",
        "Customer sync",
        "Inventory tracking",
      ],
      setupTime: "4 minutes",
    },
    {
      id: 6,
      name: "HubSpot",
      description:
        "Automate marketing campaigns, manage contacts, and track deals with HubSpot CRM.",
      category: "marketing",
      icon: BarChart3,
      color: "bg-orange-500",
      rating: 4.7,
      usageCount: "11.4k",
      isPopular: true,
      isFeatured: false,
      features: [
        "Contact management",
        "Email campaigns",
        "Deal tracking",
        "Analytics",
      ],
      setupTime: "4 minutes",
    },
    {
      id: 7,
      name: "Stripe",
      description:
        "Process payments, manage subscriptions, and handle billing with Stripe integration.",
      category: "finance",
      icon: CreditCard,
      color: "bg-purple-600",
      rating: 4.9,
      usageCount: "9.8k",
      isPopular: true,
      isFeatured: true,
      features: [
        "Payment processing",
        "Subscription management",
        "Invoice creation",
        "Webhooks",
      ],
      setupTime: "3 minutes",
    },
    {
      id: 8,
      name: "GitHub",
      description:
        "Automate code workflows, manage issues, and track repositories with GitHub integration.",
      category: "development",
      icon: GitBranch,
      color: "bg-gray-800",
      rating: 4.8,
      usageCount: "7.2k",
      isPopular: false,
      isFeatured: false,
      features: [
        "Repository management",
        "Issue tracking",
        "Pull requests",
        "Webhooks",
      ],
      setupTime: "3 minutes",
    },
    {
      id: 9,
      name: "Google Analytics",
      description:
        "Track website performance, analyze user behavior, and generate reports automatically.",
      category: "analytics",
      icon: BarChart3,
      color: "bg-yellow-500",
      rating: 4.6,
      usageCount: "5.9k",
      isPopular: false,
      isFeatured: false,
      features: [
        "Traffic analysis",
        "Goal tracking",
        "Custom reports",
        "Real-time data",
      ],
      setupTime: "5 minutes",
    },
    {
      id: 10,
      name: "Dropbox",
      description:
        "Upload files, sync folders, and manage cloud storage with Dropbox integration.",
      category: "storage",
      icon: Cloud,
      color: "bg-blue-500",
      rating: 4.5,
      usageCount: "4.3k",
      isPopular: false,
      isFeatured: false,
      features: [
        "File upload",
        "Folder sync",
        "Share links",
        "Storage management",
      ],
      setupTime: "3 minutes",
    },
    {
      id: 11,
      name: "Zendesk",
      description:
        "Manage support tickets, automate responses, and track customer satisfaction.",
      category: "support",
      icon: Headphones,
      color: "bg-green-600",
      rating: 4.7,
      usageCount: "6.1k",
      isPopular: false,
      isFeatured: false,
      features: [
        "Ticket management",
        "Auto responses",
        "SLA tracking",
        "Customer satisfaction",
      ],
      setupTime: "4 minutes",
    },
    {
      id: 12,
      name: "Twilio",
      description:
        "Send SMS messages, make phone calls, and manage communications programmatically.",
      category: "communication",
      icon: Smartphone,
      color: "bg-red-600",
      rating: 4.8,
      usageCount: "3.7k",
      isPopular: false,
      isFeatured: false,
      features: [
        "SMS messaging",
        "Voice calls",
        "WhatsApp",
        "Programmable video",
      ],
      setupTime: "4 minutes",
    },
  ];

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || integration.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredIntegrations = integrations.filter(
    (integration) => integration.isFeatured
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 px-4 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              200+ Integrations
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold theme-gradient-text mb-6 theme-typography">
              Connect Everything
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Integrate with your favorite tools and services. Build powerful
              workflows that connect your entire tech stack seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="theme-gradient hover:opacity-90 text-white text-lg px-8 py-4"
              >
                <Link href="/auth/signup">
                  <Globe className="mr-2 h-5 w-5" />
                  Explore Integrations
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-4"
              >
                <Link href="/contact">
                  <Plus className="mr-2 h-5 w-5" />
                  Request Integration
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold theme-gradient-text mb-2">
                200+
              </div>
              <div className="text-muted-foreground">Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold theme-gradient-text mb-2">
                50M+
              </div>
              <div className="text-muted-foreground">API Calls/Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold theme-gradient-text mb-2">
                99.9%
              </div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold theme-gradient-text mb-2">
                {"< 2min"}
              </div>
              <div className="text-muted-foreground">Setup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Integrations */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              Featured Integrations
            </h2>
            <p className="text-lg text-muted-foreground">
              Our most popular and powerful integrations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredIntegrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <Card
                  key={integration.id}
                  className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group cursor-pointer"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`mx-auto p-4 rounded-full ${integration.color} mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="group-hover:theme-primary transition-colors">
                      {integration.name}
                    </CardTitle>
                    <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{integration.rating}</span>
                      <span>•</span>
                      <span>{integration.usageCount} users</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      {integration.description}
                    </p>
                    <Button className="w-full theme-gradient text-white group-hover:opacity-90">
                      Connect Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Integrations */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              All Integrations
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse our complete library of integrations
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search integrations..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-6">
            Showing {filteredIntegrations.length} of {integrations.length}{" "}
            integrations
          </div>

          {/* Integrations Grid */}
          {filteredIntegrations.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No integrations found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or category filter
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <Card
                    key={integration.id}
                    className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`p-3 rounded-lg ${integration.color} group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-2">
                          {integration.isPopular && (
                            <Badge className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                              Popular
                            </Badge>
                          )}
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs">
                              {integration.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:theme-primary transition-colors">
                        {integration.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {integration.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Features */}
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                            Key Features
                          </h4>
                          <div className="grid grid-cols-2 gap-1">
                            {integration.features
                              .slice(0, 4)
                              .map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center text-xs"
                                >
                                  <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {integration.setupTime}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {integration.usageCount} users
                          </div>
                        </div>

                        {/* Action */}
                        <Button
                          size="sm"
                          className="w-full theme-gradient text-white"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
            <Code className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4 theme-typography">
              Need a Custom Integration?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Don&apos;t see the tool you need? We can build custom integrations
              for your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/contact">
                  Request Integration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/docs/api">View API Docs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

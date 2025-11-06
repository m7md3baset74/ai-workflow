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
  Search,
  HelpCircle,
  MessageSquare,
  Play,
  Workflow,
  Users,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Download,
  Globe,
  Shield,
  Code,
  Lightbulb,
  AlertCircle,
  Star,
} from "lucide-react";

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Topics" },
    { value: "getting-started", label: "Getting Started" },
    { value: "workflows", label: "Workflows" },
    { value: "integrations", label: "Integrations" },
    { value: "troubleshooting", label: "Troubleshooting" },
    { value: "account", label: "Account & Billing" },
    { value: "security", label: "Security" },
    { value: "api", label: "API & Development" },
  ];

  const popularArticles = [
    {
      title: "Getting Started with Your First Workflow",
      description:
        "A step-by-step guide to creating your first automation workflow",
      category: "getting-started",
      readTime: "5 min read",
      views: "12.3k",
      rating: 4.9,
      isNew: false,
    },
    {
      title: "How to Connect Slack to Your Workflows",
      description:
        "Learn how to integrate Slack and automate your team communications",
      category: "integrations",
      readTime: "3 min read",
      views: "8.7k",
      rating: 4.8,
      isNew: false,
    },
    {
      title: "Understanding Workflow Triggers and Actions",
      description:
        "Master the basics of workflow automation with triggers and actions",
      category: "workflows",
      readTime: "7 min read",
      views: "15.2k",
      rating: 4.9,
      isNew: false,
    },
    {
      title: "Troubleshooting Common Workflow Errors",
      description: "Fix the most common issues in workflow execution",
      category: "troubleshooting",
      readTime: "4 min read",
      views: "6.1k",
      rating: 4.7,
      isNew: false,
    },
    {
      title: "Setting Up Conditional Logic in Workflows",
      description: "Create smart workflows that make decisions based on data",
      category: "workflows",
      readTime: "8 min read",
      views: "9.4k",
      rating: 4.8,
      isNew: true,
    },
    {
      title: "Managing Team Access and Permissions",
      description: "Control who can access and modify your workflows",
      category: "account",
      readTime: "6 min read",
      views: "4.8k",
      rating: 4.6,
      isNew: true,
    },
  ];

  const helpTopics = [
    {
      title: "Getting Started",
      description: "New to WebflowApp? Start here to learn the basics",
      icon: Lightbulb,
      color: "from-blue-500 to-blue-600",
      articles: 28,
    },
    {
      title: "Building Workflows",
      description: "Learn how to create and customize powerful workflows",
      icon: Workflow,
      color: "from-purple-500 to-purple-600",
      articles: 45,
    },
    {
      title: "Integrations",
      description: "Connect your favorite tools and services",
      icon: Globe,
      color: "from-green-500 to-green-600",
      articles: 67,
    },
    {
      title: "Troubleshooting",
      description: "Solve common issues and get your workflows running",
      icon: AlertCircle,
      color: "from-red-500 to-red-600",
      articles: 32,
    },
    {
      title: "Account & Billing",
      description: "Manage your account, plans, and billing information",
      icon: Users,
      color: "from-orange-500 to-orange-600",
      articles: 19,
    },
    {
      title: "Security",
      description: "Keep your data safe and secure",
      icon: Shield,
      color: "from-teal-500 to-teal-600",
      articles: 15,
    },
    {
      title: "API & Development",
      description: "Technical guides for developers and advanced users",
      icon: Code,
      color: "from-indigo-500 to-indigo-600",
      articles: 23,
    },
    {
      title: "Best Practices",
      description: "Tips and tricks from workflow automation experts",
      icon: Star,
      color: "from-yellow-500 to-yellow-600",
      articles: 36,
    },
  ];

  const quickActions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageSquare,
      action: "Start Chat",
      available: "24/7",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message and we'll respond quickly",
      icon: Mail,
      action: "Send Email",
      available: "< 2 hour response",
    },
    {
      title: "Phone Support",
      description: "Talk directly with our technical experts",
      icon: Phone,
      action: "Schedule Call",
      available: "Business hours",
    },
    {
      title: "Community Forum",
      description: "Connect with other users and share knowledge",
      icon: Users,
      action: "Visit Forum",
      available: "Always open",
    },
  ];

  const resources = [
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides for common tasks",
      icon: Play,
      count: "50+ videos",
      link: "/tutorials",
    },
    {
      title: "API Documentation",
      description: "Complete reference for developers using our API",
      icon: Code,
      count: "200+ endpoints",
      link: "/docs/api",
    },
    {
      title: "Workflow Templates",
      description: "Pre-built workflows you can copy and customize",
      icon: Download,
      count: "100+ templates",
      link: "/templates",
    },
    {
      title: "System Status",
      description: "Check current system status and uptime",
      icon: CheckCircle,
      count: "99.9% uptime",
      link: "/status",
    },
  ];

  const filteredArticles = popularArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 px-4 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              We&apos;re Here to Help
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold theme-gradient-text mb-6 theme-typography">
              Help Center
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Find answers to your questions, learn best practices, and get the
              most out of WebflowApp.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles..."
                  className="pl-12 h-14 text-lg border-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Card
                    key={index}
                    className="border hover:shadow-lg transition-all duration-200 hover:scale-105 group cursor-pointer bg-card/50 backdrop-blur"
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                      <h3 className="font-medium text-sm mb-1">
                        {action.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {action.available}
                      </p>
                      <Button size="sm" className="w-full text-xs">
                        {action.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              Browse by Topic
            </h2>
            <p className="text-lg text-muted-foreground">
              Find help articles organized by category
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Card
                  key={index}
                  className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group cursor-pointer"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`mx-auto p-4 rounded-full bg-gradient-to-r ${topic.color} mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:theme-primary transition-colors">
                      {topic.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {topic.description}
                    </p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary" className="mb-4">
                      {topic.articles} articles
                    </Badge>
                    <Button className="w-full" variant="outline">
                      Browse Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              Popular Articles
            </h2>
            <p className="text-lg text-muted-foreground">
              The most helpful articles from our knowledge base
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[200px]">
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
            <div className="text-sm text-muted-foreground">
              Showing {filteredArticles.length} of {popularArticles.length}{" "}
              articles
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <Card
                key={index}
                className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {
                        categories.find((c) => c.value === article.category)
                          ?.label
                      }
                    </Badge>
                    {article.isNew && (
                      <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                        New
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:theme-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center">
                        <HelpCircle className="h-3 w-3 mr-1" />
                        {article.views} views
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                      {article.rating}
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Read Article
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              Additional Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              More ways to learn and get help
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card
                  key={index}
                  className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 rounded-full theme-gradient mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant="secondary" className="mb-4">
                      {resource.count}
                    </Badge>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href={resource.link}>
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
            <MessageSquare className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4 theme-typography">
              Still Need Help?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our support team is
              standing by to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Live Chat
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

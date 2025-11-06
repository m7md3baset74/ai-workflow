"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Workflow,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  Users,
  Star,
  Mail,
  Database,
  MessageSquare,
  ShoppingCart,
  FileText,
  Settings,
  BarChart3,
  Smartphone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function Templates() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedComplexity, setSelectedComplexity] = useState("all");
  const [creatingWorkflow, setCreatingWorkflow] = useState<number | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<
    (typeof templates)[0] | null
  >(null);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  const handleUseTemplate = async (template: (typeof templates)[0]) => {
    // Check if user is logged in
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    try {
      setCreatingWorkflow(template.id);

      console.log("Creating workflow from template:", template.title);
      console.log("Session:", session);

      // Create a new workflow based on the template
      const response = await fetch("/api/workflows/create-from-template", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: template.id,
          templateData: template,
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(
          errorData.error || "Failed to create workflow from template"
        );
      }

      const { workflowId } = await response.json();

      // Show success message and redirect to the new workflow editor
      toast.success("Workflow created successfully from template!");
      router.push(`/workflow/${workflowId}`);
    } catch (error) {
      console.error("Error creating workflow from template:", error);
      toast.error("Failed to create workflow. Please try again.");
    } finally {
      setCreatingWorkflow(null);
    }
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "customer-service", label: "Customer Service" },
    { value: "sales-marketing", label: "Sales & Marketing" },
    { value: "data-ops", label: "Data Operations" },
    { value: "hr-onboarding", label: "HR & Onboarding" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "content-management", label: "Content Management" },
    { value: "finance-accounting", label: "Finance & Accounting" },
    { value: "devops", label: "DevOps & IT" },
  ];

  const complexityLevels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const templates = [
    {
      id: 1,
      title: "Customer Support Ticket Automation",
      description:
        "Automatically route support tickets, assign to agents, and send acknowledgment emails based on priority and category.",
      category: "customer-service",
      complexity: "beginner",
      estimatedTime: "15 minutes",
      usageCount: "2,347",
      rating: 4.8,
      icon: MessageSquare,
      tags: ["Support", "Email", "Routing", "CRM"],
      steps: [
        "New ticket created",
        "Categorize ticket",
        "Assign to agent",
        "Send acknowledgment",
      ],
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "Lead Nurturing Campaign",
      description:
        "Multi-step email campaign that nurtures leads based on their behavior, interests, and engagement levels.",
      category: "sales-marketing",
      complexity: "intermediate",
      estimatedTime: "30 minutes",
      usageCount: "1,892",
      rating: 4.9,
      icon: Mail,
      tags: ["Email Marketing", "CRM", "Lead Scoring", "Automation"],
      steps: [
        "Lead capture",
        "Score lead",
        "Send personalized email",
        "Track engagement",
      ],
      gradient: "from-green-500 to-green-600",
    },
    {
      id: 3,
      title: "E-commerce Order Processing",
      description:
        "Complete order fulfillment workflow from payment processing to inventory management and shipping notifications.",
      category: "ecommerce",
      complexity: "advanced",
      estimatedTime: "45 minutes",
      usageCount: "1,567",
      rating: 4.7,
      icon: ShoppingCart,
      tags: ["Orders", "Inventory", "Shipping", "Payments"],
      steps: [
        "Order received",
        "Process payment",
        "Update inventory",
        "Generate shipping label",
      ],
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      title: "Employee Onboarding Sequence",
      description:
        "Streamline new employee onboarding with automated document collection, account creation, and welcome sequences.",
      category: "hr-onboarding",
      complexity: "intermediate",
      estimatedTime: "25 minutes",
      usageCount: "934",
      rating: 4.6,
      icon: Users,
      tags: ["HR", "Onboarding", "Documents", "Accounts"],
      steps: [
        "New hire form",
        "Create accounts",
        "Send welcome packet",
        "Schedule meetings",
      ],
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: 5,
      title: "Data Backup & Sync",
      description:
        "Automated data synchronization between multiple systems with backup verification and error handling.",
      category: "data-ops",
      complexity: "advanced",
      estimatedTime: "60 minutes",
      usageCount: "756",
      rating: 4.9,
      icon: Database,
      tags: ["Data Sync", "Backup", "API", "Validation"],
      steps: [
        "Extract data",
        "Transform format",
        "Load to destination",
        "Verify integrity",
      ],
      gradient: "from-red-500 to-red-600",
    },
    {
      id: 6,
      title: "Content Publishing Pipeline",
      description:
        "Automated content workflow from creation to publishing across multiple platforms with approval processes.",
      category: "content-management",
      complexity: "intermediate",
      estimatedTime: "35 minutes",
      usageCount: "623",
      rating: 4.5,
      icon: FileText,
      tags: ["Content", "Publishing", "Approval", "Social Media"],
      steps: [
        "Content creation",
        "Review & approval",
        "Schedule publication",
        "Track performance",
      ],
      gradient: "from-teal-500 to-teal-600",
    },
    {
      id: 7,
      title: "Invoice Generation & Follow-up",
      description:
        "Automatic invoice creation, delivery, and payment follow-up reminders based on customer payment history.",
      category: "finance-accounting",
      complexity: "beginner",
      estimatedTime: "20 minutes",
      usageCount: "1,234",
      rating: 4.8,
      icon: FileText,
      tags: ["Invoicing", "Payments", "Reminders", "Accounting"],
      steps: [
        "Generate invoice",
        "Send to customer",
        "Track payment",
        "Send reminders",
      ],
      gradient: "from-yellow-500 to-yellow-600",
    },
    {
      id: 8,
      title: "Server Monitoring & Alerts",
      description:
        "Monitor server health, performance metrics, and automatically alert the team when thresholds are exceeded.",
      category: "devops",
      complexity: "advanced",
      estimatedTime: "40 minutes",
      usageCount: "445",
      rating: 4.7,
      icon: BarChart3,
      tags: ["Monitoring", "Alerts", "DevOps", "Performance"],
      steps: [
        "Check server metrics",
        "Evaluate thresholds",
        "Send alerts",
        "Log incidents",
      ],
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      id: 9,
      title: "Social Media Scheduler",
      description:
        "Schedule and publish content across multiple social media platforms with optimal timing and engagement tracking.",
      category: "sales-marketing",
      complexity: "beginner",
      estimatedTime: "15 minutes",
      usageCount: "2,156",
      rating: 4.6,
      icon: Smartphone,
      tags: ["Social Media", "Scheduling", "Content", "Analytics"],
      steps: [
        "Create content",
        "Optimize timing",
        "Publish posts",
        "Track engagement",
      ],
      gradient: "from-pink-500 to-pink-600",
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    const matchesComplexity =
      selectedComplexity === "all" ||
      template.complexity === selectedComplexity;

    return matchesSearch && matchesCategory && matchesComplexity;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 px-4 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              Ready-to-Use Templates
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold theme-gradient-text mb-6 theme-typography">
              Workflow Templates
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Jump-start your automation journey with our collection of proven
              workflow templates. Copy, customize, and deploy in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="theme-gradient hover:opacity-90 text-white text-lg px-8 py-4"
              >
                <Link href="/auth/signup">
                  <Download className="mr-2 h-5 w-5" />
                  Browse Templates
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-4"
              >
                <Link href="/workflow/new">
                  <Workflow className="mr-2 h-5 w-5" />
                  Create From Scratch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30 border-y">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
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
              <Select
                value={selectedComplexity}
                onValueChange={setSelectedComplexity}
              >
                <SelectTrigger className="w-[160px]">
                  <Settings className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {complexityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredTemplates.length} of {templates.length} templates
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedComplexity("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <Card
                    key={template.id}
                    className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${template.gradient} shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {template.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:theme-primary transition-colors">
                        {template.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        <Badge
                          className={`text-xs ${getComplexityColor(
                            template.complexity
                          )}`}
                        >
                          {template.complexity}
                        </Badge>
                        {template.tags.slice(0, 2).map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Workflow Steps Preview */}
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                            Workflow Steps
                          </h4>
                          <div className="space-y-1">
                            {template.steps.map((step, idx) => (
                              <div
                                key={idx}
                                className="flex items-center text-xs"
                              >
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {template.estimatedTime}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {template.usageCount} uses
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1 theme-gradient text-white"
                            onClick={() => handleUseTemplate(template)}
                            disabled={creatingWorkflow === template.id}
                          >
                            {creatingWorkflow === template.id ? (
                              <>
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                                Creating...
                              </>
                            ) : (
                              <>
                                <Download className="h-3 w-3 mr-1" />
                                Use Template
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setPreviewTemplate(template)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
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
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
            <Workflow className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4 theme-typography">
              Can&apos;t Find What You Need?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Create your own custom workflow or request a new template. Our
              team is always adding new automation recipes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/workflow/new">
                  Build Custom Workflow
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Request Template</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Template Preview Modal */}
      <Dialog
        open={!!previewTemplate}
        onOpenChange={() => setPreviewTemplate(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {previewTemplate && (
                <>
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r ${previewTemplate.gradient}`}
                  >
                    <previewTemplate.icon className="h-6 w-6 text-white" />
                  </div>
                  {previewTemplate.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {previewTemplate?.description}
            </DialogDescription>
          </DialogHeader>

          {previewTemplate && (
            <div className="space-y-6">
              {/* Template Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Category</h4>
                  <Badge variant="secondary" className="capitalize">
                    {previewTemplate.category.replace("-", " ")}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Complexity</h4>
                  <Badge variant="outline" className="capitalize">
                    {previewTemplate.complexity}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Estimated Time</h4>
                  <p className="text-sm text-muted-foreground">
                    {previewTemplate.estimatedTime}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Usage</h4>
                  <p className="text-sm text-muted-foreground">
                    {previewTemplate.usageCount} uses
                  </p>
                </div>
              </div>

              {/* Workflow Steps */}
              <div className="space-y-3">
                <h4 className="font-medium">Workflow Steps</h4>
                <div className="space-y-2">
                  {previewTemplate.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <h4 className="font-medium">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => {
                    setPreviewTemplate(null);
                    handleUseTemplate(previewTemplate);
                  }}
                  className="flex-1 theme-gradient text-white"
                  disabled={creatingWorkflow === previewTemplate.id}
                >
                  {creatingWorkflow === previewTemplate.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Use This Template
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPreviewTemplate(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

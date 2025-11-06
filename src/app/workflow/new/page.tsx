"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useWorkflowStore } from "@/store/workflowStore";
import { CustomNode, CustomEdge } from "@/lib/types";

// Types
interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: string;
  defaultName: string;
  defaultDescription: string;
  templateNodes?: TemplateNode[];
}

interface TemplateNode {
  nodeType: string;
  label: string;
  position: { x: number; y: number };
  config: Record<string, unknown>;
}

type WorkflowSuggestions = {
  [category: string]: string[];
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { PageLoader, InlineLoader } from "@/components/ui/loader";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import {
  Workflow,
  Sparkles,
  ArrowLeft,
  Zap,
  Target,
  Clock,
  CheckCircle,
  PlayCircle,
  Settings,
  BookOpen,
  Mail,
  Database,
  Globe,
  Calendar,
  ShoppingCart,
  Users,
  Layers,
  Copy,
  FileText,
} from "lucide-react";

export default function NewWorkflow() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { createWorkflow, isLoading } = useWorkflowStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [selectedTemplate, setSelectedTemplate] =
    useState<WorkflowTemplate | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Workflow name suggestions by category
  const workflowSuggestions: WorkflowSuggestions = {
    "Customer Management": [
      "Customer Onboarding Flow",
      "Lead Qualification Process",
      "Customer Support Ticketing",
      "Customer Feedback Collection",
      "User Registration Workflow",
    ],
    "Marketing & Sales": [
      "Email Marketing Campaign",
      "Social Media Automation",
      "Lead Nurturing Sequence",
      "Product Launch Campaign",
      "Abandoned Cart Recovery",
    ],
    "Business Operations": [
      "Invoice Processing System",
      "Expense Report Approval",
      "Document Review Process",
      "Inventory Management",
      "Order Fulfillment Workflow",
    ],
    "Data & Integration": [
      "Data Sync Pipeline",
      "API Integration Workflow",
      "Report Generation System",
      "Database Backup Process",
      "File Processing Automation",
    ],
    "HR & Team Management": [
      "Employee Onboarding",
      "Leave Request Approval",
      "Performance Review Process",
      "Meeting Scheduler",
      "Team Notification System",
    ],
    "Content & Communications": [
      "Content Publishing Workflow",
      "Newsletter Distribution",
      "Blog Post Automation",
      "Social Media Posting",
      "Press Release Distribution",
    ],
  };

  // Quick setup templates
  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: "email-automation",
      name: "Email Automation",
      description:
        "Automated email sequences for marketing and customer communication",
      icon: Mail,
      category: "Marketing & Sales",
      defaultName: "Email Marketing Campaign",
      defaultDescription:
        "Automate email sequences based on customer actions and triggers",
      templateNodes: [
        {
          nodeType: "webhook",
          label: "Customer Signup",
          position: { x: 100, y: 150 },
          config: {
            url: "https://your-domain.com/webhook/customer-signup",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Webhook-Secret": "your-secret-key",
            },
            description: "Triggered when a new customer signs up",
          },
        },
        {
          nodeType: "if-else",
          label: "Check Email Type",
          position: { x: 400, y: 150 },
          config: {
            condition: "email_preference",
            operator: "equals",
            value: "newsletter",
            description: "Route based on customer email preferences",
          },
        },
        {
          nodeType: "api-call",
          label: "Send Welcome Email",
          position: { x: 700, y: 100 },
          config: {
            url: "https://api.sendgrid.com/v3/mail/send",
            method: "POST",
            headers: {
              Authorization: "Bearer YOUR_SENDGRID_API_KEY",
              "Content-Type": "application/json",
            },
            body: {
              personalizations: [
                {
                  to: [{ email: "{{customer.email}}" }],
                  subject: "Welcome to Our Platform!",
                },
              ],
              from: { email: "noreply@yourcompany.com" },
              content: [
                {
                  type: "text/html",
                  value: "<h1>Welcome!</h1><p>Thanks for signing up.</p>",
                },
              ],
            },
            description: "Send personalized welcome email via SendGrid",
          },
        },
        {
          nodeType: "api-call",
          label: "Add to Newsletter",
          position: { x: 700, y: 200 },
          config: {
            url: "https://api.mailchimp.com/3.0/lists/LIST_ID/members",
            method: "POST",
            headers: {
              Authorization: "Bearer YOUR_MAILCHIMP_API_KEY",
              "Content-Type": "application/json",
            },
            body: {
              email_address: "{{customer.email}}",
              status: "subscribed",
              merge_fields: {
                FNAME: "{{customer.first_name}}",
                LNAME: "{{customer.last_name}}",
              },
            },
            description: "Subscribe customer to newsletter list",
          },
        },
      ],
    },
    {
      id: "data-processing",
      name: "Data Processing",
      description: "Process and transform data from various sources",
      icon: Database,
      category: "Data & Integration",
      defaultName: "Data Processing Pipeline",
      defaultDescription:
        "Extract, transform, and load data from multiple sources",
      templateNodes: [
        {
          nodeType: "schedule",
          label: "Daily Data Import",
          position: { x: 100, y: 150 },
          config: {
            schedule: "0 2 * * *", // Daily at 2 AM
            timezone: "UTC",
            description: "Trigger data import every day at 2 AM",
          },
        },
        {
          nodeType: "api-call",
          label: "Fetch Raw Data",
          position: { x: 400, y: 150 },
          config: {
            url: "https://api.datasource.com/v1/export",
            method: "GET",
            headers: {
              Authorization: "Bearer YOUR_API_KEY",
              Accept: "application/json",
            },
            params: {
              format: "json",
              date_from: "{{yesterday}}",
              limit: "1000",
            },
            description: "Extract data from external API",
          },
        },
        {
          nodeType: "api-call",
          label: "Transform Data",
          position: { x: 700, y: 150 },
          config: {
            url: "https://your-domain.com/api/transform",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": "your-transform-key",
            },
            body: {
              data: "{{previous.response}}",
              transformations: [
                "normalize_dates",
                "clean_duplicates",
                "validate_fields",
              ],
            },
            description: "Apply data transformations and cleaning",
          },
        },
        {
          nodeType: "database-update",
          label: "Store in Database",
          position: { x: 1000, y: 150 },
          config: {
            connection: "postgresql://user:pass@localhost/db",
            table: "processed_data",
            operation: "insert",
            mapping: {
              id: "{{data.id}}",
              processed_at: "{{now}}",
              content: "{{transformed.data}}",
            },
            description: "Store processed data in PostgreSQL database",
          },
        },
      ],
    },
    {
      id: "api-integration",
      name: "API Integration",
      description: "Connect and sync data between different applications",
      icon: Globe,
      category: "Data & Integration",
      defaultName: "API Integration Workflow",
      defaultDescription:
        "Synchronize data between different systems and applications",
      templateNodes: [
        {
          nodeType: "webhook",
          label: "Data Update Trigger",
          position: { x: 100, y: 150 },
          config: {
            url: "https://your-domain.com/webhook/data-sync",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            description: "Receive data updates from external system",
          },
        },
        {
          nodeType: "api-call",
          label: "Validate Data",
          position: { x: 400, y: 150 },
          config: {
            url: "https://your-domain.com/api/validate",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": "your-validation-key",
            },
            body: {
              data: "{{webhook.body}}",
              schema: "user_profile",
              strict: true,
            },
            description: "Validate incoming data structure",
          },
        },
        {
          nodeType: "if-else",
          label: "Check Validation",
          position: { x: 700, y: 150 },
          config: {
            condition: "validation.success",
            operator: "equals",
            value: true,
            description: "Process only valid data",
          },
        },
        {
          nodeType: "api-call",
          label: "Sync to CRM",
          position: { x: 1000, y: 100 },
          config: {
            url: "https://api.crm-system.com/v2/contacts",
            method: "PUT",
            headers: {
              Authorization: "Bearer CRM_API_TOKEN",
              "Content-Type": "application/json",
            },
            body: {
              id: "{{data.user_id}}",
              email: "{{data.email}}",
              name: "{{data.full_name}}",
              last_updated: "{{now}}",
            },
            description: "Update contact in CRM system",
          },
        },
        {
          nodeType: "slack-message",
          label: "Sync Complete",
          position: { x: 1000, y: 200 },
          config: {
            webhook_url: "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK",
            channel: "#integrations",
            username: "Workflow Bot",
            text: "✅ Data sync completed for {{data.email}}",
            description: "Notify team of successful sync",
          },
        },
      ],
    },
    {
      id: "scheduled-tasks",
      name: "Scheduled Tasks",
      description: "Run automated tasks on a schedule",
      icon: Calendar,
      category: "Business Operations",
      defaultName: "Scheduled Automation",
      defaultDescription: "Execute automated tasks at specified intervals",
      templateNodes: [
        {
          nodeType: "schedule",
          label: "Weekly Report",
          position: { x: 100, y: 150 },
          config: {
            schedule: "0 9 * * 1", // Every Monday at 9 AM
            timezone: "America/New_York",
            description: "Generate weekly performance report",
          },
        },
        {
          nodeType: "api-call",
          label: "Fetch Analytics",
          position: { x: 400, y: 150 },
          config: {
            url: "https://api.analytics.com/v1/reports",
            method: "GET",
            headers: {
              Authorization: "Bearer ANALYTICS_API_KEY",
              Accept: "application/json",
            },
            params: {
              period: "week",
              metrics: "sessions,conversions,revenue",
              format: "json",
            },
            description: "Retrieve weekly performance metrics",
          },
        },
        {
          nodeType: "api-call",
          label: "Generate Report",
          position: { x: 700, y: 150 },
          config: {
            url: "https://your-domain.com/api/reports/generate",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": "report-generator-key",
            },
            body: {
              template: "weekly-performance",
              data: "{{analytics.response}}",
              format: "pdf",
              recipients: ["team@company.com"],
            },
            description: "Create formatted PDF report",
          },
        },
        {
          nodeType: "api-call",
          label: "Email Report",
          position: { x: 1000, y: 150 },
          config: {
            url: "https://api.sendgrid.com/v3/mail/send",
            method: "POST",
            headers: {
              Authorization: "Bearer SENDGRID_API_KEY",
              "Content-Type": "application/json",
            },
            body: {
              personalizations: [
                {
                  to: [{ email: "team@company.com" }],
                  subject: "Weekly Performance Report - {{date}}",
                },
              ],
              from: { email: "reports@company.com" },
              content: [
                {
                  type: "text/html",
                  value:
                    "<p>Please find attached the weekly performance report.</p>",
                },
              ],
              attachments: [
                {
                  content: "{{report.base64}}",
                  filename: "weekly-report.pdf",
                  type: "application/pdf",
                },
              ],
            },
            description: "Email report to team",
          },
        },
      ],
    },
    {
      id: "ecommerce-automation",
      name: "E-commerce",
      description: "Automate order processing and customer management",
      icon: ShoppingCart,
      category: "Customer Management",
      defaultName: "Order Processing Automation",
      defaultDescription:
        "Automate order fulfillment and customer notifications",
      templateNodes: [
        {
          nodeType: "webhook",
          label: "New Order",
          position: { x: 100, y: 150 },
          config: {
            url: "https://your-store.com/webhook/order-created",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            description: "Triggered when customer places new order",
          },
        },
        {
          nodeType: "if-else",
          label: "Check Payment",
          position: { x: 400, y: 150 },
          config: {
            condition: "order.payment_status",
            operator: "equals",
            value: "paid",
            description: "Verify payment is completed",
          },
        },
        {
          nodeType: "api-call",
          label: "Update Inventory",
          position: { x: 700, y: 100 },
          config: {
            url: "https://inventory-api.com/v1/stock/reduce",
            method: "POST",
            headers: {
              Authorization: "Bearer INVENTORY_API_KEY",
              "Content-Type": "application/json",
            },
            body: {
              items: "{{order.items}}",
              order_id: "{{order.id}}",
            },
            description: "Reduce stock levels for ordered items",
          },
        },
        {
          nodeType: "api-call",
          label: "Send Order Confirmation",
          position: { x: 700, y: 200 },
          config: {
            url: "https://api.sendgrid.com/v3/mail/send",
            method: "POST",
            headers: {
              Authorization: "Bearer SENDGRID_API_KEY",
              "Content-Type": "application/json",
            },
            body: {
              personalizations: [
                {
                  to: [{ email: "{{order.customer.email}}" }],
                  subject: "Order Confirmation #{{order.id}}",
                },
              ],
              from: { email: "orders@yourstore.com" },
              content: [
                {
                  type: "text/html",
                  value:
                    "<h2>Thanks for your order!</h2><p>Order #{{order.id}} has been confirmed.</p>",
                },
              ],
            },
            description: "Email order confirmation to customer",
          },
        },
      ],
    },
    {
      id: "team-collaboration",
      name: "Team Collaboration",
      description: "Streamline team communications and project management",
      icon: Users,
      category: "HR & Team Management",
      defaultName: "Team Collaboration Workflow",
      defaultDescription:
        "Coordinate team activities and project communications",
      templateNodes: [
        {
          nodeType: "webhook",
          label: "Task Assigned",
          position: { x: 100, y: 150 },
          config: {
            url: "https://your-domain.com/webhook/task-assigned",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            description: "Triggered when task is assigned to team member",
          },
        },
        {
          nodeType: "slack-message",
          label: "Notify Assignee",
          position: { x: 400, y: 100 },
          config: {
            webhook_url: "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK",
            channel: "#tasks",
            username: "Task Bot",
            text: "📝 New task assigned to {{task.assignee}}: *{{task.title}}*\nDue: {{task.due_date}}\nPriority: {{task.priority}}",
            description: "Notify team member of new task assignment",
          },
        },
        {
          nodeType: "if-else",
          label: "High Priority?",
          position: { x: 400, y: 200 },
          config: {
            condition: "task.priority",
            operator: "equals",
            value: "high",
            description: "Check if task requires immediate attention",
          },
        },
        {
          nodeType: "api-call",
          label: "Send Email Alert",
          position: { x: 700, y: 200 },
          config: {
            url: "https://api.sendgrid.com/v3/mail/send",
            method: "POST",
            headers: {
              Authorization: "Bearer SENDGRID_API_KEY",
              "Content-Type": "application/json",
            },
            body: {
              personalizations: [
                {
                  to: [{ email: "{{task.assignee_email}}" }],
                  subject: "🚨 High Priority Task Assigned",
                },
              ],
              from: { email: "tasks@company.com" },
              content: [
                {
                  type: "text/html",
                  value:
                    "<h2>High Priority Task</h2><p>You have been assigned a high priority task: <strong>{{task.title}}</strong></p><p>Due: {{task.due_date}}</p>",
                },
              ],
            },
            description: "Send urgent email for high priority tasks",
          },
        },
      ],
    },
  ];

  // Helper functions
  const selectTemplate = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    setName(template.defaultName);
    setDescription(template.defaultDescription);
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion: string) => {
    setName(suggestion);
    setShowSuggestions(false);
  };

  const clearTemplate = () => {
    setSelectedTemplate(null);
    setName("");
    setDescription("");
  };

  // Helper function to generate unique node IDs
  const generateNodeId = () =>
    `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Helper function to create workflow nodes from template
  const createWorkflowWithTemplate = async (
    workflowName: string,
    workflowDescription: string,
    template: WorkflowTemplate | null
  ) => {
    // Reset the store to ensure a clean slate
    const { reset } = useWorkflowStore.getState();
    reset();

    // Create the workflow first (without any nodes)
    await createWorkflow(workflowName, workflowDescription);

    // Only add template nodes if a template was selected
    if (template?.templateNodes && template.templateNodes.length > 0) {
      const { setNodes, setEdges } = useWorkflowStore.getState();

      // Create nodes with proper IDs and structure
      const templateNodes: CustomNode[] = template.templateNodes.map(
        (templateNode) => ({
          id: generateNodeId(),
          type: "custom",
          position: templateNode.position,
          data: {
            label: templateNode.label,
            nodeType: templateNode.nodeType,
            config: templateNode.config,
            isValid: Object.keys(templateNode.config).length > 0,
          },
        })
      );

      // Create edges to connect nodes in sequence (optional - can be customized per template)
      const templateEdges: CustomEdge[] = templateNodes
        .slice(0, -1)
        .map((node, index) => ({
          id: `edge-${node.id}-${templateNodes[index + 1].id}`,
          source: node.id,
          target: templateNodes[index + 1].id,
          type: "smoothstep",
        }));

      // Set the nodes and edges in the store
      setNodes(templateNodes);
      setEdges(templateEdges);

      // Save the workflow with the template nodes
      const saveWorkflow = useWorkflowStore.getState().saveWorkflow;
      await saveWorkflow();
    }
    // If no template is selected, the board will remain empty
    // Nodes will only be added when the user drags them from the sidebar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Workflow name is required");
      return;
    }

    try {
      await createWorkflowWithTemplate(
        name.trim(),
        description.trim(),
        selectedTemplate
      );
      const workflow = useWorkflowStore.getState().workflow;

      if (workflow?._id) {
        const templateMessage = selectedTemplate
          ? `Created with ${selectedTemplate.name} template and example nodes!`
          : `"${name}" is ready for you to build.`;

        toast.success("Workflow created successfully!", {
          description: templateMessage,
          duration: 4000,
        });

        // Always redirect to the workflow editor
        router.push(`/workflow/${workflow._id}`);
      }
    } catch (err) {
      console.error("Failed to create workflow:", err);
      setError("Failed to create workflow");
      toast.error("Failed to create workflow", {
        description:
          "Please try again or contact support if the problem persists.",
        duration: 4000,
      });
    }
  };

  if (status === "loading") {
    return <PageLoader text="Preparing workflow creation..." />;
  }

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-linear-to-br from-background via-background to-muted/20">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-primary/5 via-background to-secondary/5 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <div className="p-3 theme-gradient rounded-xl shadow-lg animate-pulse">
                  <Workflow className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold theme-gradient-text">
                  Create New Workflow
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Build powerful automation workflows with our intuitive
                drag-and-drop builder. Start from scratch or use a template to
                get started quickly.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium">Visual Builder</span>
                </div>
                <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="font-medium">Real-time Testing</span>
                </div>
                <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium">Easy Integration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push("/dashboard")}
                    className="p-0 h-auto font-normal hover:text-primary"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Dashboard
                  </Button>
                </div>

                <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="space-y-4 pb-8">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">
                          Workflow Configuration
                        </CardTitle>
                        <CardDescription className="text-base">
                          Set up the basic details for your new workflow
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    {/* Quick Templates */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-semibold flex items-center gap-2">
                            <Layers className="h-4 w-4 text-primary" />
                            Quick Start Templates
                          </Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Select a pre-built template or start from scratch
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowSuggestions(!showSuggestions)}
                          className="text-xs"
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          {showSuggestions ? "Hide" : "Browse"} Suggestions
                        </Button>
                      </div>

                      {/* Start from Scratch Option */}
                      <div
                        onClick={() => clearTemplate()}
                        className={`p-5 border-2 rounded-xl cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5 hover:shadow-md ${
                          !selectedTemplate
                            ? "border-primary bg-primary/10 shadow-md"
                            : "border-border"
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-linear-to-br from-primary to-primary/60 rounded-xl shadow-lg">
                            <Sparkles className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-base">
                                Start from Scratch
                              </p>
                              <Badge variant="secondary" className="text-xs">
                                Empty Canvas
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Build your workflow from the ground up with
                              complete flexibility. Add nodes from the sidebar
                              as you need them.
                            </p>
                          </div>
                          {!selectedTemplate && (
                            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">
                            Or choose a template
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {workflowTemplates.slice(0, 4).map((template) => {
                          const IconComponent = template.icon;
                          return (
                            <div
                              key={template.id}
                              onClick={() => selectTemplate(template)}
                              className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5 ${
                                selectedTemplate?.id === template.id
                                  ? "border-primary bg-primary/10"
                                  : "border-border"
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                  <IconComponent className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm">
                                    {template.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {template.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {selectedTemplate && (
                        <div className="p-4 bg-linear-to-r from-primary/10 via-primary/5 to-transparent border-l-4 border-primary rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <CheckCircle className="h-5 w-5 text-primary" />
                              <div>
                                <span className="text-sm font-semibold block">
                                  Template Selected: {selectedTemplate.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Pre-configured nodes will be added to your
                                  workflow
                                </span>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={clearTemplate}
                              className="text-xs h-8 px-3 hover:bg-destructive/10 hover:text-destructive"
                            >
                              Clear
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label
                            htmlFor="name"
                            className="text-base font-semibold flex items-center gap-2"
                          >
                            <Settings className="h-4 w-4 text-primary" />
                            Workflow Name{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowSuggestions(!showSuggestions)}
                            className="text-xs h-7"
                          >
                            <Sparkles className="h-3 w-3 mr-1" />
                            {showSuggestions ? "Hide" : "Show"} Ideas
                          </Button>
                        </div>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Customer Onboarding, Invoice Processing, Email Automation"
                          maxLength={100}
                          className="text-base py-6 px-4 border-2 focus:border-primary/50 transition-all"
                        />

                        {showSuggestions && (
                          <div className="border rounded-lg p-4 bg-muted/30 space-y-3">
                            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground">
                              <Layers className="h-4 w-4" />
                              <span>Popular Workflow Names by Category</span>
                            </div>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                              {Object.entries(workflowSuggestions).map(
                                ([category, suggestions]) => (
                                  <div key={category} className="space-y-2">
                                    <p className="text-xs font-semibold text-primary">
                                      {category}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {suggestions.map((suggestion) => (
                                        <button
                                          key={suggestion}
                                          type="button"
                                          onClick={() =>
                                            selectSuggestion(suggestion)
                                          }
                                          className="text-xs px-2 py-1 bg-background border border-border rounded hover:border-primary/50 hover:bg-primary/5 transition-colors"
                                        >
                                          <Copy className="h-3 w-3 inline mr-1" />
                                          {suggestion}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground">
                          Choose a descriptive name that reflects the
                          workflow&apos;s purpose
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Label
                          htmlFor="description"
                          className="text-base font-semibold flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4 text-primary" />
                          Description{" "}
                          <span className="text-muted-foreground text-sm font-normal">
                            (Optional)
                          </span>
                        </Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          placeholder="Describe what this workflow accomplishes, its key steps, and any important details..."
                          maxLength={500}
                          className="text-base py-3 px-4 border-2 focus:border-primary/50 resize-none transition-all"
                        />
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>
                            Help your team understand the workflow&apos;s
                            purpose and functionality
                          </span>
                          <span>{description.length}/500 characters</span>
                        </div>
                      </div>

                      {error && (
                        <div className="p-4 bg-destructive/10 border-l-4 border-destructive rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="shrink-0">
                              <svg
                                className="h-5 w-5 text-destructive"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-destructive text-sm font-semibold">
                                Error
                              </p>
                              <p className="text-destructive/80 text-sm">
                                {error}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="flex-1 h-12 hover:bg-muted"
                          onClick={() => router.push("/dashboard")}
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          size="lg"
                          className="flex-1 h-12 theme-gradient text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                          disabled={isLoading || !name.trim()}
                        >
                          {isLoading ? (
                            <InlineLoader
                              text="Creating workflow..."
                              size="sm"
                            />
                          ) : (
                            <>
                              <PlayCircle className="h-5 w-5 mr-2" />
                              Create & Start Building
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar - Help & Features */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Start Guide */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Quick Start Guide</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-sm">Add Triggers</p>
                        <p className="text-xs text-muted-foreground">
                          Start your workflow with events like webhooks,
                          schedules, or manual triggers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-sm">Connect Actions</p>
                        <p className="text-xs text-muted-foreground">
                          Process data with built-in actions or custom code
                          blocks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-sm">Add Logic</p>
                        <p className="text-xs text-muted-foreground">
                          Use conditions and loops for advanced workflow control
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <div>
                        <p className="font-medium text-sm">Test & Deploy</p>
                        <p className="text-xs text-muted-foreground">
                          Test your workflow and deploy when ready
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Templates */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Layers className="h-5 w-5 text-primary" />
                    <span>More Templates</span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Additional workflow templates to get you started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workflowTemplates.slice(4).map((template) => {
                      const IconComponent = template.icon;
                      return (
                        <div
                          key={template.id}
                          onClick={() => selectTemplate(template)}
                          className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5 ${
                            selectedTemplate?.id === template.id
                              ? "border-primary bg-primary/10"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="p-1.5 bg-primary/10 rounded-lg">
                              <IconComponent className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-xs">
                                {template.name}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                {template.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Features Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>What You Can Build</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Data processing pipelines</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Email automation sequences</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>API integrations</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Scheduled tasks</span>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <span>Custom business logic</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Tips */}
              <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-900/10">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2 text-amber-800 dark:text-amber-200">
                    <Clock className="h-5 w-5" />
                    <span>Pro Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-amber-800 dark:text-amber-200">
                  <div className="space-y-2">
                    <p>
                      💡 <strong>Start simple:</strong> Begin with basic
                      triggers and actions, then add complexity
                    </p>
                    <p>
                      🔄 <strong>Test frequently:</strong> Use the test mode to
                      validate each step as you build
                    </p>
                    <p>
                      📝 <strong>Document well:</strong> Good descriptions help
                      your team understand workflows
                    </p>
                    <p>
                      🚀 <strong>Use templates:</strong> Browse our template
                      library for common workflow patterns
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

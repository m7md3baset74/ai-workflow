"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Play,
  Zap,
  Settings,
  Share,
  Code,
  Workflow,
  Users,
  FileText,
  Github,
  BookOpen,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Timer,
  Shield,
} from "lucide-react";

export default function Documentation() {
  const { data: session } = useSession();

  const features = [
    {
      icon: <Workflow className="h-8 w-8 text-blue-600" />,
      title: "Visual Workflow Builder",
      description:
        "Create complex automation workflows with our intuitive drag-and-drop interface. No coding required.",
    },
    {
      icon: <Code className="h-8 w-8 text-green-600" />,
      title: "Custom Node Types",
      description:
        "Use pre-built nodes or create custom nodes to handle any automation task your workflow requires.",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Real-time Execution",
      description:
        "Execute workflows instantly and see results in real-time with detailed execution logs and status updates.",
    },
    {
      icon: <Share className="h-8 w-8 text-purple-600" />,
      title: "Team Collaboration",
      description:
        "Share workflows with your team, collaborate on complex automations, and maintain version control.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-red-600" />,
      title: "Analytics & Monitoring",
      description:
        "Track workflow performance, monitor execution times, and analyze success rates with detailed analytics.",
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Secure & Scalable",
      description:
        "Enterprise-grade security with role-based access control and scalable infrastructure for any workload.",
    },
  ];

  const quickStartSteps = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Sign up for a free account to get started with WebflowApp.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      step: 2,
      title: "Build Your First Workflow",
      description:
        "Use our visual builder to create your first automation workflow.",
      icon: <Plus className="h-6 w-6" />,
    },
    {
      step: 3,
      title: "Configure Nodes",
      description:
        "Add and configure nodes to define your workflow logic and data flow.",
      icon: <Settings className="h-6 w-6" />,
    },
    {
      step: 4,
      title: "Test & Execute",
      description:
        "Test your workflow and execute it to see automation in action.",
      icon: <Play className="h-6 w-6" />,
    },
  ];

  const workflowActions = [
    {
      icon: <Plus className="h-5 w-5" />,
      action: "Create",
      description: "Build new workflows from scratch",
    },
    {
      icon: <Edit className="h-5 w-5" />,
      action: "Edit",
      description: "Modify existing workflows",
    },
    {
      icon: <Play className="h-5 w-5" />,
      action: "Execute",
      description: "Run workflows and view results",
    },
    {
      icon: <Trash2 className="h-5 w-5" />,
      action: "Delete",
      description: "Remove workflows you no longer need",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold theme-gradient-text mb-6">
              WebflowApp Documentation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Learn how to create powerful automation workflows with our visual
              drag-and-drop interface. From simple tasks to complex business
              processes, WebflowApp makes automation accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                <>
                  <Button
                    size="lg"
                    asChild
                    className="theme-gradient hover:opacity-90 text-white transition-opacity"
                  >
                    <Link href="/dashboard">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Go to Dashboard
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/workflow/new">
                      <Plus className="mr-2 h-5 w-5" />
                      Create Your First Workflow
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    asChild
                    className="theme-gradient hover:opacity-90 text-white transition-opacity"
                  >
                    <Link href="/">
                      <Play className="mr-2 h-5 w-5" />
                      Get Started
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/auth/signin">
                      <Users className="mr-2 h-5 w-5" />
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the comprehensive set of tools and features that make
              WebflowApp the perfect choice for your automation needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border shadow-lg"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-muted/50">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="py-16 bg-card rounded-2xl shadow-lg border">
          <div className="px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Quick Start Guide
              </h2>
              <p className="text-lg text-muted-foreground">
                Get up and running with WebflowApp in just a few simple steps.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {quickStartSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                    {index < quickStartSteps.length - 1 && (
                      <ChevronRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300 h-6 w-6" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use WebflowApp */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              How to Use WebflowApp
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master the core functionality of WebflowApp with these essential
              guides and tutorials.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Workflow className="mr-3 h-6 w-6 text-blue-600" />
                  Creating Workflows
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">Navigate to Dashboard</h4>
                      <p className="text-sm text-gray-600">
                        Access your dashboard to view existing workflows and
                        create new ones.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">
                        Click &quot;New Workflow&quot;
                      </h4>
                      <p className="text-sm text-gray-600">
                        Start building your automation by creating a new
                        workflow project.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">Design Your Flow</h4>
                      <p className="text-sm text-gray-600">
                        Use the visual canvas to drag, drop, and connect nodes
                        to build your workflow logic.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">
                        4
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">Configure & Save</h4>
                      <p className="text-sm text-gray-600">
                        Configure node settings, test your workflow, and save
                        your automation.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Settings className="mr-3 h-6 w-6 text-green-600" />
                  Managing Workflows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflowActions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-green-600">{action.icon}</div>
                      <div className="text-gray-600">
                        <h4 className="font-medium">{action.action}</h4>
                        <p className="text-sm">{action.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Timer className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Pro Tip</h4>
                      <p className="text-sm text-blue-700">
                        Use the execution results modal to debug and optimize
                        your workflows. You can view detailed logs and
                        performance metrics for each run.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Additional Resources
            </h2>
            <p className="text-lg text-primary/50">
              Explore more resources to get the most out of WebflowApp.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gray-50">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Tutorials</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-primary/50 mb-4">
                  Step-by-step tutorials for common workflow patterns and
                  advanced use cases.
                </p>
                <Button variant="outline" className="w-full">
                  View Tutorials
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gray-50">
                  <Github className="h-8 w-8 text-gray-600" />
                </div>
                <CardTitle className="text-xl">API Reference</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-primary/50 mb-4">
                  Complete API documentation for developers who want to
                  integrate or extend WebflowApp.
                </p>
                <Button variant="outline" className="w-full">
                  API Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-gray-50">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Examples</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-primary/50 mb-4">
                  Pre-built workflow templates and examples to help you get
                  started quickly.
                </p>
                <Button variant="outline" className="w-full">
                  Browse Examples
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who are already automating their workflows
              with WebflowApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                <>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/dashboard">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Go to Dashboard
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                    asChild
                  >
                    <Link href="/workflow/new">
                      <Plus className="mr-2 h-5 w-5" />
                      Create Workflow
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/">
                      <Play className="mr-2 h-5 w-5" />
                      Get Started
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                    asChild
                  >
                    <Link href="/auth/signin">
                      <Users className="mr-2 h-5 w-5" />
                      Sign In
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

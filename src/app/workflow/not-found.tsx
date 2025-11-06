"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Workflow,
  ArrowLeft,
  Plus,
  Home,
  Search,
  FileText,
  Zap,
  Play,
} from "lucide-react";

export default function WorkflowNotFound() {
  const router = useRouter();

  const workflowLinks = [
    {
      href: "/workflow/new",
      label: "Create New Workflow",
      description: "Start building a new automation",
      icon: Plus,
    },
    {
      href: "/dashboard",
      label: "My Workflows",
      description: "View your existing workflows",
      icon: Workflow,
    },
    {
      href: "/templates",
      label: "Workflow Templates",
      description: "Browse pre-built templates",
      icon: FileText,
    },
    {
      href: "/docs",
      label: "Documentation",
      description: "Learn how to build workflows",
      icon: Search,
    },
  ];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 Visual */}
        <div className="relative">
          <div className="text-9xl font-bold theme-gradient-text opacity-20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full shadow-2xl">
              <Workflow className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground theme-typography">
            Workflow Not Found
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            The workflow you&apos;re looking for doesn&apos;t exist or may have
            been deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleGoBack}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>

          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-blue-600 text-white hover:opacity-90"
          >
            <Link href="/workflow/new">
              <Plus className="h-5 w-5 mr-2" />
              Create Workflow
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/dashboard">
              <Home className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>

        {/* Workflow Quick Links */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2 theme-typography">
              Workflow Actions
            </h2>
            <p className="text-muted-foreground">
              Get started with workflow automation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {workflowLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Card
                  key={link.href}
                  className="hover:shadow-lg transition-all duration-200 hover:scale-105 group cursor-pointer border-border bg-card/50 backdrop-blur"
                >
                  <Link href={link.href}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-600 group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                            {link.label}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {link.description}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <Card className="bg-muted/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Zap className="h-8 w-8 text-yellow-500" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">
                  Need Help with Workflows?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to create powerful automations with our
                  comprehensive guides.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/docs">
                    <FileText className="h-4 w-4 mr-2" />
                    Documentation
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/templates">
                    <Play className="h-4 w-4 mr-2" />
                    View Templates
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Details */}
        <div className="text-xs text-muted-foreground space-y-1 opacity-75">
          <p>Error Code: 404 - Workflow Not Found</p>
          <p>Section: Workflow Management</p>
        </div>
      </div>
    </div>
  );
}

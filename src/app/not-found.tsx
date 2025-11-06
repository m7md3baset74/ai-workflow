"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home,
  ArrowLeft,
  Search,
  FileText,
  Workflow,
  Mail,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const quickLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      description: "Go to your workflow dashboard",
      icon: Home,
    },
    {
      href: "/workflow/new",
      label: "Create Workflow",
      description: "Start building a new workflow",
      icon: Workflow,
    },
    {
      href: "/docs",
      label: "Documentation",
      description: "Learn how to use WebflowApp",
      icon: FileText,
    },
    {
      href: "/help",
      label: "Help Center",
      description: "Find answers to common questions",
      icon: Search,
    },
  ];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleRefresh = () => {
    window.location.reload();
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
            <div className="p-6 theme-gradient rounded-full shadow-2xl">
              <Search className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground theme-typography">
            Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Oops! The page you&apos;re looking for seems to have gone missing.
            Don&apos;t worry, we&apos;ll help you find your way back.
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
            onClick={handleRefresh}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Refresh Page
          </Button>

          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto theme-gradient text-white hover:opacity-90"
          >
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2 theme-typography">
              Or try one of these
            </h2>
            <p className="text-muted-foreground">
              Here are some popular destinations to get you back on track
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Card
                  key={link.href}
                  className="hover:shadow-lg transition-all duration-200 hover:scale-105 group cursor-pointer border-border bg-card/50 backdrop-blur"
                >
                  <Link href={link.href}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg theme-gradient group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <CardTitle className="text-lg group-hover:theme-primary transition-colors">
                            {link.label}
                          </CardTitle>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
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
              <Mail className="h-8 w-8 text-primary" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">
                  Still need help?
                </h3>
                <p className="text-sm text-muted-foreground">
                  If you believe this is an error or need assistance, our
                  support team is here to help.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Details */}
        <div className="text-xs text-muted-foreground space-y-1 opacity-75">
          <p>Error Code: 404 - Page Not Found</p>
          <p>If this problem persists, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  ArrowLeft,
  Settings,
  Users,
  BarChart3,
  Home,
  AlertTriangle,
  Lock,
} from "lucide-react";

export default function AdminNotFound() {
  const router = useRouter();

  const adminLinks = [
    {
      href: "/admin/dashboard",
      label: "Admin Dashboard",
      description: "View system overview and analytics",
      icon: BarChart3,
    },
    {
      href: "/admin/users",
      label: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
    },
    {
      href: "/admin/workflows",
      label: "Workflow Management",
      description: "Monitor and manage all workflows",
      icon: Settings,
    },
    {
      href: "/admin/settings",
      label: "System Settings",
      description: "Configure system preferences",
      icon: Settings,
    },
  ];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/admin/dashboard");
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
            <div className="p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground theme-typography">
            Admin Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            The admin page you&apos;re looking for doesn&apos;t exist or you may
            not have permission to access it.
          </p>
        </div>

        {/* Permission Warning */}
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 text-yellow-800 dark:text-yellow-200">
              <Lock className="h-5 w-5" />
              <p className="text-sm font-medium">
                Admin access required. Please ensure you have administrative
                privileges.
              </p>
            </div>
          </CardContent>
        </Card>

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
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white hover:opacity-90"
          >
            <Link href="/admin/dashboard">
              <Shield className="h-5 w-5 mr-2" />
              Admin Dashboard
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
              User Dashboard
            </Link>
          </Button>
        </div>

        {/* Admin Quick Links */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2 theme-typography">
              Admin Navigation
            </h2>
            <p className="text-muted-foreground">
              Quick access to admin sections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Card
                  key={link.href}
                  className="hover:shadow-lg transition-all duration-200 hover:scale-105 group cursor-pointer border-border bg-card/50 backdrop-blur"
                >
                  <Link href={link.href}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <CardTitle className="text-lg group-hover:text-red-600 transition-colors">
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

        {/* Security Notice */}
        <Card className="bg-muted/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <AlertTriangle className="h-8 w-8 text-amber-500" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">
                  Security Notice
                </h3>
                <p className="text-sm text-muted-foreground">
                  This area is restricted to administrators only. All access
                  attempts are logged.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Details */}
        <div className="text-xs text-muted-foreground space-y-1 opacity-75">
          <p>Error Code: 404 - Admin Page Not Found</p>
          <p>Section: Administrative Interface</p>
        </div>
      </div>
    </div>
  );
}

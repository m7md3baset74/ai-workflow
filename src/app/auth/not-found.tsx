"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UserX,
  ArrowLeft,
  LogIn,
  UserPlus,
  Home,
  Lock,
  Mail,
  Shield,
} from "lucide-react";

export default function AuthNotFound() {
  const router = useRouter();

  const authLinks = [
    {
      href: "/auth/signin",
      label: "Sign In",
      description: "Login to your existing account",
      icon: LogIn,
    },
    {
      href: "/auth/signup",
      label: "Sign Up",
      description: "Create a new account",
      icon: UserPlus,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      description: "Go to your dashboard",
      icon: Home,
    },
  ];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
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
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl">
              <UserX className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground theme-typography">
            Authentication Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            The authentication page you&apos;re looking for doesn&apos;t exist.
            Let&apos;s get you back on track.
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
            className="w-full sm:w-auto theme-gradient text-white hover:opacity-90"
          >
            <Link href="/auth/signin">
              <LogIn className="h-5 w-5 mr-2" />
              Sign In
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Auth Quick Links */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2 theme-typography">
              Authentication Options
            </h2>
            <p className="text-muted-foreground">
              Choose how you&apos;d like to continue
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {authLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Card
                  key={link.href}
                  className="hover:shadow-lg transition-all duration-200 hover:scale-105 group cursor-pointer border-border bg-card/50 backdrop-blur"
                >
                  <Link href={link.href}>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 rounded-lg theme-gradient group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-lg group-hover:theme-primary transition-colors text-center">
                          {link.label}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors text-center">
                        {link.description}
                      </p>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Security Info */}
        <Card className="bg-muted/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Shield className="h-8 w-8 text-green-500" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">
                  Secure Authentication
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected with industry-standard security
                  measures.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/help">
                    <Mail className="h-4 w-4 mr-2" />
                    Need Help?
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">
                    <Lock className="h-4 w-4 mr-2" />
                    Security Info
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Details */}
        <div className="text-xs text-muted-foreground space-y-1 opacity-75">
          <p>Error Code: 404 - Authentication Page Not Found</p>
          <p>Section: User Authentication</p>
        </div>
      </div>
    </div>
  );
}

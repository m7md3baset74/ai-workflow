"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  ArrowLeft,
  Home,
  FileText,
  DollarSign,
  Phone,
  HelpCircle,
  ExternalLink,
  Info,
} from "lucide-react";

export default function PublicNotFound() {
  const router = useRouter();

  const publicLinks = [
    {
      href: "/features",
      label: "Features",
      description: "Discover our powerful features",
      icon: Info,
    },
    {
      href: "/pricing",
      label: "Pricing",
      description: "View our pricing plans",
      icon: DollarSign,
    },
    {
      href: "/help",
      label: "Help Center",
      description: "Get help and support",
      icon: HelpCircle,
    },
    {
      href: "/contact",
      label: "Contact Us",
      description: "Get in touch with our team",
      icon: Phone,
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
            <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full shadow-2xl">
              <Globe className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground theme-typography">
            Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist. Let&apos;s
            explore what we have to offer.
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
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:opacity-90"
          >
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/auth/signin">
              <Globe className="h-5 w-5 mr-2" />
              Sign In
            </Link>
          </Button>
        </div>

        {/* Public Pages Links */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2 theme-typography">
              Explore Our Platform
            </h2>
            <p className="text-muted-foreground">
              Discover what makes our platform special
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {publicLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Card
                  key={link.href}
                  className="hover:shadow-lg transition-all duration-200 hover:scale-105 group cursor-pointer border-border bg-card/50 backdrop-blur"
                >
                  <Link href={link.href}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
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

        {/* Company Info */}
        <Card className="bg-muted/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Globe className="h-8 w-8 text-blue-500" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">
                  Welcome to WebflowApp
                </h3>
                <p className="text-sm text-muted-foreground">
                  Streamline your workflow automation with our powerful
                  platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/about">
                    <Info className="h-4 w-4 mr-2" />
                    About Us
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/docs">
                    <FileText className="h-4 w-4 mr-2" />
                    Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Details */}
        <div className="text-xs text-muted-foreground space-y-1 opacity-75">
          <p>Error Code: 404 - Public Page Not Found</p>
          <p>Section: Public Information</p>
        </div>
      </div>
    </div>
  );
}

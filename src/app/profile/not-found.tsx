"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  ArrowLeft,
  Home,
  Settings,
  Edit3,
  Bell,
  UserCog,
} from "lucide-react";

export default function ProfileNotFound() {
  const router = useRouter();

  const profileLinks = [
    {
      href: "/profile",
      label: "My Profile",
      description: "View and edit your profile",
      icon: User,
    },
    {
      href: "/profile/complete",
      label: "Complete Profile",
      description: "Complete your profile setup",
      icon: Edit3,
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
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-2xl">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground theme-typography">
            Profile Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            The profile page you&apos;re looking for doesn&apos;t exist or may
            not be available.
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
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:opacity-90"
          >
            <Link href="/profile">
              <User className="h-5 w-5 mr-2" />
              My Profile
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

        {/* Profile Quick Links */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2 theme-typography">
              Profile Options
            </h2>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {profileLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Card
                  key={link.href}
                  className="hover:shadow-lg transition-all duration-200 hover:scale-105 group cursor-pointer border-border bg-card/50 backdrop-blur"
                >
                  <Link href={link.href}>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-purple-600 transition-colors text-center">
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

        {/* Account Features */}
        <Card className="bg-muted/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <UserCog className="h-8 w-8 text-blue-500" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">
                  Account Management
                </h3>
                <p className="text-sm text-muted-foreground">
                  Customize your profile, privacy settings, and preferences.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile">
                    <Settings className="h-4 w-4 mr-2" />
                    Profile Settings
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile/complete">
                    <Bell className="h-4 w-4 mr-2" />
                    Complete Setup
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Details */}
        <div className="text-xs text-muted-foreground space-y-1 opacity-75">
          <p>Error Code: 404 - Profile Page Not Found</p>
          <p>Section: User Profile</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExtendedUser } from "@/lib/types";
import {
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  Shield,
  X,
  Workflow,
  Settings2,
  Crown,
  Bell,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (
      status === "authenticated" &&
      (session?.user as ExtendedUser)?.role !== "admin"
    ) {
      router.push("/dashboard");
      return;
    }
  }, [session, status, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Unauthorized
  if (!session || (session.user as ExtendedUser)?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
          <p className="text-muted-foreground mb-4">
            You don&apos;t have permission to access this area.
          </p>
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: BarChart3,
      current: pathname === "/admin/dashboard",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      current: pathname === "/admin/users",
    },
    {
      name: "Paid Members",
      href: "/admin/paid-members",
      icon: Crown,
      current: pathname === "/admin/paid-members",
    },
    {
      name: "Workflows",
      href: "/admin/workflows",
      icon: Workflow,
      current: pathname === "/admin/workflows",
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
      current: pathname === "/admin/messages",
    },
    {
      name: "Email Subscriptions",
      href: "/admin/newsletter",
      icon: Bell,
      current: pathname === "/admin/newsletter",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: pathname === "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Layout Container */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 lg:hidden ${
            sidebarOpen ? "" : "hidden"
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Mobile sidebar */}
        <div
          className={`fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-72 transform bg-card border-r transition-transform lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b bg-muted/50">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold theme-gradient-text">
                Admin Panel
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="p-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.current
                      ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:scale-[1.02]"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-72 lg:flex-col lg:bg-card lg:border-r">
          <div className="flex items-center px-6 py-4 border-b bg-muted/50">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold theme-gradient-text">
                Admin Panel
              </span>
            </div>
          </div>
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.current
                      ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:scale-[1.02]"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:pl-0">
          {/* Mobile header bar */}
          <div className="sticky top-16 z-30 flex h-14 items-center gap-x-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="h-8 w-8 border"
            >
              <Settings2 className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20"
              >
                Admin
              </Badge>
            </div>
          </div>

          {/* Page content */}
          <main className="p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

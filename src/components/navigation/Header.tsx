"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ExtendedUser } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import {
  User,
  LogOut,
  Settings,
  FileText,
  Shield,
  Menu,
  Home,
  BarChart3,
  HelpCircle,
  Users,
  CreditCard,
  Globe,
  Phone,
  Building,
  Briefcase,
  BookOpen,
  Calendar,
  MessageSquare,
  Play,
  Layers,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ThemeCustomizer } from "@/components/ui/theme-customizer";
import { PlanBadge } from "@/components/ui/plan-badge";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoading = status === "loading";

  const isActive = (path: string) => pathname === path;

  // Navigation items for authenticated users
  const authenticatedNavItems = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/docs", label: "Documentation", icon: FileText },
    { href: "/profile", label: "Profile", icon: User },
  ];

  // Navigation items for public pages
  const publicNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/features", label: "Features", icon: Zap },
    { href: "/pricing", label: "Pricing", icon: CreditCard },
    { href: "/about", label: "About", icon: Building },
    { href: "/contact", label: "Contact", icon: Phone },
    { href: "/help", label: "Help", icon: HelpCircle },
    { href: "/docs", label: "Documentation", icon: FileText },
  ];

  // Additional menu items
  const additionalNavItems = [
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/careers", label: "Careers", icon: Briefcase },
    { href: "/community", label: "Community", icon: Users },
    { href: "/webinars", label: "Webinars", icon: Calendar },
    { href: "/tutorials", label: "Tutorials", icon: Play },
    { href: "/templates", label: "Templates", icon: Layers },
    { href: "/integrations", label: "Integrations", icon: Globe },
    { href: "/status", label: "Status", icon: BarChart3 },
    { href: "/changelog", label: "Changelog", icon: MessageSquare },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden border"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur border-border/50"
                >
                  <SheetHeader className="text-left">
                    <SheetTitle className="flex items-center space-x-2">
                      <div className="h-6 w-6 theme-gradient rounded-md flex items-center justify-center">
                        <span className="text-white font-bold text-xs">WF</span>
                      </div>
                      <span className="theme-gradient-text font-bold">
                        WebflowApp
                      </span>
                    </SheetTitle>
                    <SheetDescription className="text-muted-foreground">
                      Navigate through our platform
                    </SheetDescription>
                  </SheetHeader>

                  <div className="py-6 space-y-6">
                    {/* User Info Section */}
                    {session && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                          {session?.user?.image ? (
                            <Image
                              src={session?.user?.image as string}
                              width={32}
                              height={32}
                              alt="userImage"
                              className="rounded-full"
                            />
                          ) : (
                            <div className="p-2 rounded-full theme-gradient flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <p className="font-medium text-sm text-foreground">
                              {session.user?.name || "User"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {session.user?.email}
                            </p>
                          </div>
                        </div>

                        {/* Plan Badge in Mobile Menu */}
                        <div className="px-3">
                          <PlanBadge variant="detailed" className="w-full" />
                        </div>

                        <Separator />
                      </div>
                    )}

                    {/* Main Navigation */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">
                        {session ? "Dashboard" : "Main Pages"}
                      </h3>
                      <nav className="space-y-2">
                        {(session ? authenticatedNavItems : publicNavItems).map(
                          (item) => {
                            const IconComponent = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={handleLinkClick}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                  isActive(item.href)
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                              >
                                <IconComponent className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                  {item.label}
                                </span>
                              </Link>
                            );
                          }
                        )}
                      </nav>
                    </div>

                    <Separator />

                    {/* Additional Pages */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-sm text-foreground uppercase tracking-wider">
                        Resources
                      </h3>
                      <nav className="space-y-2">
                        {additionalNavItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={handleLinkClick}
                              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                isActive(item.href)
                                  ? "bg-primary/10 text-primary border border-primary/20"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              }`}
                            >
                              <IconComponent className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                {item.label}
                              </span>
                            </Link>
                          );
                        })}
                      </nav>
                    </div>

                    <Separator />

                    {/* Auth Actions */}
                    <div className="space-y-3">
                      {session ? (
                        <>
                          {(session.user as ExtendedUser)?.role === "admin" && (
                            <Link
                              href="/admin/dashboard"
                              onClick={handleLinkClick}
                              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                              <Shield className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                Admin Dashboard
                              </span>
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              handleLinkClick();
                              signOut();
                            }}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
                          >
                            <LogOut className="h-4 w-4" />
                            <span className="text-sm font-medium">
                              Sign Out
                            </span>
                          </button>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <Link
                            href="/auth/signin"
                            onClick={handleLinkClick}
                            className="flex items-center justify-center px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                          >
                            <span className="text-sm font-medium">Sign In</span>
                          </Link>
                          <Link
                            href="/auth/signup"
                            onClick={handleLinkClick}
                            className="flex items-center justify-center px-4 py-2 rounded-lg theme-gradient text-white hover:opacity-90 transition-opacity"
                          >
                            <span className="text-sm font-medium">Sign Up</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 theme-gradient rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">WF</span>
                </div>
                <span className="text-xl font-bold theme-gradient-text theme-typography hidden md:inline-flex">
                  WebflowApp
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {session && (
              <nav className="hidden md:flex space-x-6">
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors theme-typography ${
                    isActive("/dashboard")
                      ? "theme-primary"
                      : "text-muted-foreground hover:theme-primary"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/docs"
                  className={`text-sm font-medium transition-colors theme-typography ${
                    isActive("/docs")
                      ? "theme-primary"
                      : "text-muted-foreground hover:theme-primary"
                  }`}
                >
                  Documentation
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Public Navigation */}
            {!session && (
              <nav className="hidden md:flex space-x-6">
                <Link
                  href="/docs"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive("/docs") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Documentation
                </Link>
              </nav>
            )}

            <ThemeToggle />
            <ThemeCustomizer />

            {/* Plan Badge - only show for authenticated users */}
            {session && <PlanBadge className="hidden sm:flex" />}

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {session?.user?.image ? (
                    <div className="w-10 h-10 rounded-full border hover:border-primary/50 flex items-center justify-center hover:bg-primary/10 duration-300 cursor-pointer">
                      <Image
                        src={session?.user?.image as string}
                        width={32}
                        height={32}
                        alt="userImage"
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="p-2 rounded-full theme-gradient flex items-center justify-center shadow-lg ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64"
                  align="end"
                  sideOffset={4}
                >
                  <div className="flex items-center justify-start gap-3 p-3">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">
                        {session.user?.name || "User"}
                      </p>
                      <p className="w-[180px] truncate text-xs text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/docs" className="cursor-pointer">
                      <FileText className="mr-2 h-4 w-4" />
                      Documentation
                    </Link>
                  </DropdownMenuItem>
                  {(session.user as ExtendedUser)?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin/dashboard"
                          className="cursor-pointer"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onSelect={(event) => {
                      event.preventDefault();
                      signOut();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

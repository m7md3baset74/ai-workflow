"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  FileText,
  Shield,
  HelpCircle,
  Zap,
  Users,
  BookOpen,
  Globe,
  Workflow,
  Play,
  Settings,
  TrendingUp,
  Award,
  Lightbulb,
  MessageCircle,
  Youtube,
  Instagram,
} from "lucide-react";

export default function Footer() {
  const { data: session } = useSession();
  // Use a static year value to avoid prerender issues with cacheComponents
  const currentYear = 2025;
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          source: "footer",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      toast.success(data.message || "Successfully subscribed to newsletter!");
      setEmail(""); // Clear the form
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to subscribe. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-background border-t">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 theme-gradient rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">WF</span>
              </div>
              <span className="text-xl font-bold theme-gradient-text theme-typography">
                WebflowApp
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Build powerful workflows and automate your business processes with
              our intuitive drag-and-drop platform. Streamline operations, save
              time, and boost productivity for teams of all sizes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://github.com/webflowapp"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted/30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/webflowapp"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted/30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/webflowapp"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted/30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com/@webflowapp"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted/30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com/webflowapp"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted/30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:support@webflowapp.com"
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted/30"
                aria-label="Email Support"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Zap className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/workflows"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Workflow className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Workflow Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <BookOpen className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Globe className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="/automation"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Settings className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Automation Tools
                </Link>
              </li>
              {session && (
                <li>
                  <Link
                    href="/dashboard"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <TrendingUp className="h-4 w-4 mr-2 group-hover:text-primary" />
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Award className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <FileText className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <HelpCircle className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Play className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Video Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Lightbulb className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Best Practices
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <BookOpen className="h-4 w-4 mr-2 group-hover:text-primary" />
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <FileText className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Blog & Updates
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <MessageCircle className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Community Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/webinars"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Users className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Live Webinars
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Users className="h-4 w-4 mr-2 group-hover:text-primary" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <TrendingUp className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <FileText className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Press Kit
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Mail className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Contact Sales
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Shield className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <FileText className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Shield className="h-4 w-4 mr-2 group-hover:text-primary" />
                  Security & Compliance
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                >
                  <Globe className="h-4 w-4 mr-2 group-hover:text-primary" />
                  System Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t bg-muted/20 rounded-lg">
          <div className="max-w-2xl mx-auto text-center lg:max-w-none lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-3">
              <Mail className="h-5 w-5 mr-2 text-primary" />
              <h3 className="text-lg font-semibold">Stay Updated</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Subscribe to our newsletter and get the latest updates about new
              features, workflow automation tips, and exclusive insights
              delivered to your inbox.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
            >
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  aria-label="Email address for newsletter subscription"
                  disabled={isSubscribing}
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-3 text-sm font-medium text-white theme-gradient rounded-lg hover:opacity-90 transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Subscribe to newsletter"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-3 max-w-md mx-auto lg:mx-0">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from WebflowApp.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center text-sm text-muted-foreground space-y-1 sm:space-y-0 sm:space-x-6">
              <span>© {currentYear} WebflowApp. All rights reserved.</span>
              <div className="flex items-center space-x-4 text-xs">
                <Link
                  href="/sitemap"
                  className="hover:text-primary transition-colors"
                >
                  Sitemap
                </Link>
                <span>•</span>
                <Link
                  href="/accessibility"
                  className="hover:text-primary transition-colors"
                >
                  Accessibility
                </Link>
                <span>•</span>
                <span>Version 2.1.0</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center text-sm text-muted-foreground space-y-2 sm:space-y-0 sm:space-x-4">
              <Link
                href={"https://buymeacoffee.com/reactbd/extras"}
                target="blank"
              >
                <span className="flex items-center">
                  Made with{" "}
                  <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" />{" "}
                  for productivity
                </span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

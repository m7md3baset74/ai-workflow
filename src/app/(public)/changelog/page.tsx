"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Shield,
  Bug,
  Plus,
  ArrowUp,
  Calendar,
  GitCommit,
  Star,
  Sparkles,
  Settings,
  Database,
  Globe,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function Changelog() {
  const releases = [
    {
      version: "2.4.0",
      date: "2024-12-01",
      type: "major",
      title: "Enhanced Workflow Analytics & Performance Improvements",
      description:
        "Major update with improved analytics dashboard and significant performance optimizations.",
      changes: [
        {
          type: "feature",
          title: "Advanced Analytics Dashboard",
          description:
            "New comprehensive analytics with detailed workflow performance metrics, execution history, and success rates.",
        },
        {
          type: "feature",
          title: "Real-time Collaboration",
          description:
            "Multiple team members can now edit workflows simultaneously with live cursor tracking.",
        },
        {
          type: "improvement",
          title: "50% Faster Workflow Execution",
          description:
            "Optimized workflow engine reduces average execution time by 50% across all workflow types.",
        },
        {
          type: "improvement",
          title: "Enhanced Node Library",
          description:
            "Added 15 new integration nodes including Slack, Notion, and Airtable with advanced configuration options.",
        },
        {
          type: "fix",
          title: "Resolved Connection Issues",
          description:
            "Fixed intermittent connection drops that affected workflow reliability during peak hours.",
        },
      ],
    },
    {
      version: "2.3.2",
      date: "2024-11-15",
      type: "patch",
      title: "Security Updates & Bug Fixes",
      description:
        "Important security patches and critical bug fixes for improved stability.",
      changes: [
        {
          type: "security",
          title: "Enhanced Authentication Security",
          description:
            "Implemented additional security layers for API authentication and session management.",
        },
        {
          type: "fix",
          title: "Fixed Workflow Save Issues",
          description:
            "Resolved issues where complex workflows wouldn't save properly in certain edge cases.",
        },
        {
          type: "fix",
          title: "Improved Error Handling",
          description:
            "Better error messages and recovery options when workflows encounter unexpected issues.",
        },
      ],
    },
    {
      version: "2.3.1",
      date: "2024-11-01",
      type: "patch",
      title: "UI Improvements & Mobile Optimization",
      description:
        "Focused update on user interface enhancements and mobile experience improvements.",
      changes: [
        {
          type: "improvement",
          title: "Mobile-Responsive Design",
          description:
            "Completely redesigned mobile interface for better workflow management on mobile devices.",
        },
        {
          type: "improvement",
          title: "Dark Mode Enhancements",
          description:
            "Refined dark mode with better contrast ratios and improved readability.",
        },
        {
          type: "feature",
          title: "Workflow Templates Gallery",
          description:
            "New template gallery with 50+ pre-built workflows for common automation scenarios.",
        },
        {
          type: "fix",
          title: "Canvas Performance",
          description:
            "Improved canvas rendering performance for workflows with 100+ nodes.",
        },
      ],
    },
    {
      version: "2.3.0",
      date: "2024-10-15",
      type: "minor",
      title: "Team Collaboration & Workspace Management",
      description:
        "Major collaboration features and enhanced workspace management capabilities.",
      changes: [
        {
          type: "feature",
          title: "Team Workspaces",
          description:
            "Create separate workspaces for different teams with granular permission controls.",
        },
        {
          type: "feature",
          title: "Role-Based Access Control",
          description:
            "Define custom roles with specific permissions for viewing, editing, and executing workflows.",
        },
        {
          type: "feature",
          title: "Workflow Comments & Reviews",
          description:
            "Add comments to workflow nodes and request reviews before publishing changes.",
        },
        {
          type: "improvement",
          title: "Enhanced Audit Logs",
          description:
            "Detailed activity logs showing who made what changes and when across all workflows.",
        },
      ],
    },
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "feature":
        return <Plus className="h-4 w-4 text-green-600" />;
      case "improvement":
        return <ArrowUp className="h-4 w-4 text-blue-600" />;
      case "fix":
        return <Bug className="h-4 w-4 text-orange-600" />;
      case "security":
        return <Shield className="h-4 w-4 text-purple-600" />;
      default:
        return <GitCommit className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-green-100 text-green-800 border-green-200";
      case "improvement":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "fix":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "security":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getVersionIcon = (type: string) => {
    switch (type) {
      case "major":
        return <Star className="h-6 w-6 text-yellow-500" />;
      case "minor":
        return <Sparkles className="h-6 w-6 text-blue-500" />;
      case "patch":
        return <Settings className="h-6 w-6 text-green-500" />;
      default:
        return <GitCommit className="h-6 w-6 text-gray-500" />;
    }
  };

  const getVersionColor = (type: string) => {
    switch (type) {
      case "major":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "minor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "patch":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen gradient-bg-enhanced public-page">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-sm badge-enhanced">
              Product Updates
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="theme-gradient-text">Changelog</span>
            </h1>
            <p className="text-xl text-enhanced-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              Stay up to date with the latest features, improvements, and fixes
              in WebflowApp. We ship new updates regularly to make your
              automation experience better.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-enhanced-subtle">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Weekly Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <GitCommit className="h-4 w-4 text-blue-500" />
                <span>Version 2.4.0</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-green-500" />
                <span>Latest: Dec 1, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Releases */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {releases.map((release) => (
              <Card key={release.version} className="card-enhanced">
                <CardHeader className="pb-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        {getVersionIcon(release.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <CardTitle className="text-2xl text-enhanced">
                            Version {release.version}
                          </CardTitle>
                          <Badge
                            className={`text-xs px-2 py-1 ${getVersionColor(
                              release.type
                            )}`}
                          >
                            {release.type}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-enhanced-muted mb-2">
                          {release.title}
                        </h3>
                        <p className="text-enhanced-subtle">
                          {release.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-enhanced-subtle">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(release.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {release.changes.map((change, changeIndex) => (
                      <div
                        key={changeIndex}
                        className="flex space-x-4 p-4 rounded-lg bg-muted/30"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {getChangeIcon(change.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-enhanced">
                              {change.title}
                            </h4>
                            <Badge
                              className={`text-xs px-2 py-1 ${getChangeColor(
                                change.type
                              )}`}
                            >
                              {change.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-enhanced-muted">
                            {change.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Release Statistics */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-enhanced text-center mb-8">
            Release Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card-enhanced">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Plus className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-enhanced mb-1">47</div>
                <div className="text-sm text-enhanced-subtle">New Features</div>
              </CardContent>
            </Card>
            <Card className="card-enhanced">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <ArrowUp className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-enhanced mb-1">89</div>
                <div className="text-sm text-enhanced-subtle">Improvements</div>
              </CardContent>
            </Card>
            <Card className="card-enhanced">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Bug className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-enhanced mb-1">156</div>
                <div className="text-sm text-enhanced-subtle">Bug Fixes</div>
              </CardContent>
            </Card>
            <Card className="card-enhanced">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-enhanced mb-1">23</div>
                <div className="text-sm text-enhanced-subtle">
                  Security Updates
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stay Updated */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="card-enhanced bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-600">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-enhanced mb-2">
                Never Miss an Update
              </h3>
              <p className="text-enhanced-muted mb-6 max-w-2xl mx-auto">
                Subscribe to our release notes and get notified about new
                features, improvements, and important updates as soon as
                they&apos;re available.
              </p>
              <div className="space-y-3 text-sm text-enhanced-subtle mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>
                    Follow our blog for detailed feature announcements
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>View technical documentation for API changes</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10 button-enhanced"
                >
                  <Link href="/blog">Read Our Blog</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                >
                  <Link href="mailto:updates@webflowapp.com">
                    Subscribe to Updates
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

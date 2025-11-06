"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  Server,
  Database,
  Globe,
  Shield,
  Mail,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function Status() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const systemStatus = [
    {
      service: "API Services",
      status: "operational",
      uptime: "99.98%",
      response: "145ms",
      icon: Server,
      description: "All API endpoints are responding normally",
    },
    {
      service: "Database",
      status: "operational",
      uptime: "99.99%",
      response: "12ms",
      icon: Database,
      description: "Database performance is optimal",
    },
    {
      service: "Workflow Engine",
      status: "operational",
      uptime: "99.97%",
      response: "89ms",
      icon: Activity,
      description: "Workflow execution is running smoothly",
    },
    {
      service: "Authentication",
      status: "operational",
      uptime: "99.99%",
      response: "67ms",
      icon: Shield,
      description: "User authentication services are stable",
    },
    {
      service: "CDN & Assets",
      status: "degraded",
      uptime: "98.45%",
      response: "320ms",
      icon: Globe,
      description: "Experiencing minor delays in some regions",
    },
    {
      service: "Email Delivery",
      status: "operational",
      uptime: "99.95%",
      response: "2.1s",
      icon: Mail,
      description: "Email notifications are being delivered normally",
    },
  ];

  const recentIncidents = [
    {
      id: 1,
      title: "Increased API Response Times",
      status: "investigating",
      severity: "minor",
      started: "2024-12-01 14:30 UTC",
      description:
        "We're investigating reports of increased API response times affecting some users.",
      updates: [
        {
          time: "14:45 UTC",
          message: "We've identified the root cause and are working on a fix.",
        },
        {
          time: "14:30 UTC",
          message: "We're investigating reports of slower API responses.",
        },
      ],
    },
    {
      id: 2,
      title: "Scheduled Maintenance - Database Optimization",
      status: "completed",
      severity: "maintenance",
      started: "2024-11-28 02:00 UTC",
      completed: "2024-11-28 04:30 UTC",
      description: "Scheduled database optimization completed successfully.",
      updates: [
        {
          time: "04:30 UTC",
          message:
            "Maintenance completed successfully. All services are operational.",
        },
        {
          time: "02:00 UTC",
          message:
            "Maintenance window started. Brief service interruptions expected.",
        },
      ],
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "down":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800 border-green-200";
      case "degraded":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "down":
        return "bg-red-100 text-red-800 border-red-200";
      case "investigating":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "maintenance":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const overallStatus = systemStatus.every(
    (service) => service.status === "operational"
  )
    ? "All systems operational"
    : "Experiencing issues";

  return (
    <div className="min-h-screen gradient-bg-enhanced public-page">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-sm badge-enhanced">
              System Health
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="theme-gradient-text">System Status</span>
            </h1>
            <p className="text-xl text-enhanced-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              Real-time status and performance information for all WebflowApp
              services.
            </p>
            <div className="flex items-center justify-center space-x-4">
              {getStatusIcon(
                overallStatus === "All systems operational"
                  ? "operational"
                  : "degraded"
              )}
              <span className="text-lg font-medium text-enhanced">
                {overallStatus}
              </span>
              <span className="text-sm text-enhanced-subtle">
                {currentDate}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-enhanced mb-8">
            Current Status
          </h2>
          <div className="space-y-4">
            {systemStatus.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="card-enhanced">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-enhanced">
                            {service.service}
                          </h3>
                          <p className="text-sm text-enhanced-subtle">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <div className="text-enhanced-subtle">Uptime</div>
                          <div className="font-medium text-enhanced">
                            {service.uptime}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-enhanced-subtle">Response</div>
                          <div className="font-medium text-enhanced">
                            {service.response}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(service.status)}
                          <Badge
                            className={`text-xs px-2 py-1 ${getStatusColor(
                              service.status
                            )}`}
                          >
                            {service.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-enhanced mb-8">
            Recent Incidents
          </h2>
          <div className="space-y-6">
            {recentIncidents.map((incident) => (
              <Card key={incident.id} className="card-enhanced">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-enhanced">
                        {incident.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge
                          className={`text-xs px-2 py-1 ${getStatusColor(
                            incident.status
                          )}`}
                        >
                          {incident.status}
                        </Badge>
                        <Badge
                          className={`text-xs px-2 py-1 ${getStatusColor(
                            incident.severity
                          )}`}
                        >
                          {incident.severity}
                        </Badge>
                        <span className="text-sm text-enhanced-subtle">
                          Started: {incident.started}
                        </span>
                        {incident.completed && (
                          <span className="text-sm text-enhanced-subtle">
                            Completed: {incident.completed}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-enhanced-muted mb-4">
                    {incident.description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-medium text-enhanced">Updates:</h4>
                    {incident.updates.map((update, idx) => (
                      <div key={idx} className="flex space-x-3 text-sm">
                        <span className="text-enhanced-subtle font-medium min-w-fit">
                          {update.time}
                        </span>
                        <span className="text-enhanced-muted">
                          {update.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-enhanced mb-8">
            Performance Metrics (Last 30 Days)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-enhanced">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  99.97%
                </div>
                <div className="text-enhanced">Overall Uptime</div>
              </CardContent>
            </Card>
            <Card className="card-enhanced">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  187ms
                </div>
                <div className="text-enhanced">Avg Response Time</div>
              </CardContent>
            </Card>
            <Card className="card-enhanced">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  2.1M+
                </div>
                <div className="text-enhanced">Successful Requests</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="card-enhanced bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-enhanced mb-2">
                Stay Updated
              </h3>
              <p className="text-enhanced-muted mb-6 max-w-2xl mx-auto">
                Subscribe to status updates and get notified about incidents,
                maintenance, and system improvements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10 button-enhanced"
                >
                  <Link href="https://status.webflowapp.com" target="_blank">
                    Status Page <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Link href="mailto:status-subscribe@webflowapp.com">
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

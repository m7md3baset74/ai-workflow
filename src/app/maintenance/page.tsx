"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wrench,
  Clock,
  Home,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Timer,
  Mail,
  Settings,
} from "lucide-react";

export default function Maintenance() {
  const estimatedTime = "2 hours";
  const completionTime = "3:00 PM EST";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Maintenance Visual */}
        <div className="relative">
          <div className="text-9xl font-bold theme-gradient-text opacity-20 select-none">
            503
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full shadow-2xl animate-pulse">
              <Wrench className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground theme-typography">
            Under Maintenance
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            We&apos;re currently performing scheduled maintenance to improve
            your experience.
          </p>
        </div>

        {/* Maintenance Status */}
        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-3 text-orange-800 dark:text-orange-200 mb-4">
              <AlertCircle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Maintenance in Progress</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-orange-700 dark:text-orange-300">
                  Estimated Duration:
                </span>
                <span className="font-semibold text-orange-800 dark:text-orange-200">
                  {estimatedTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-700 dark:text-orange-300">
                  Expected Completion:
                </span>
                <span className="font-semibold text-orange-800 dark:text-orange-200">
                  {completionTime}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>65%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-yellow-600 h-3 rounded-full transition-all duration-500"
              style={{ width: "65%" }}
            ></div>
          </div>
        </div>

        {/* What's Being Updated */}
        <Card className="bg-muted/30 border-border/50 text-left">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>What&apos;s Being Updated</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Database optimization</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Security updates</span>
            </div>
            <div className="flex items-center space-x-3">
              <Timer className="h-4 w-4 text-orange-500 animate-pulse" />
              <span className="text-sm">Performance improvements</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                New feature deployment
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => window.location.reload()}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-yellow-600 text-white hover:opacity-90"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Check Status
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/">
              <Home className="h-5 w-5 mr-2" />
              Try Homepage
            </Link>
          </Button>
        </div>

        {/* Status Updates */}
        <Card className="bg-muted/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Mail className="h-8 w-8 text-blue-500" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">Stay Updated</h3>
                <p className="text-sm text-muted-foreground">
                  Follow our status page for real-time updates on the
                  maintenance progress.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Status Page
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Details */}
        <div className="text-xs text-muted-foreground space-y-1 opacity-75">
          <p>Service Status: 503 - Temporary Unavailable</p>
          <p>Maintenance ID: MAINT-{new Date().getTime()}</p>
          <p>Started: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

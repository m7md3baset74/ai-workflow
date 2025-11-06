"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Bug,
  Mail,
  ArrowLeft,
} from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Error Visual */}
        <div className="relative">
          <div className="text-9xl font-bold theme-gradient-text opacity-20 select-none">
            500
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-6 bg-gradient-to-r from-red-500 to-orange-600 rounded-full shadow-2xl animate-pulse">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground theme-typography">
            Something Went Wrong
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            We encountered an unexpected error. Don&apos;t worry, our team has
            been notified.
          </p>
        </div>

        {/* Error Details Card */}
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-left">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800 dark:text-red-200">
              <Bug className="h-5 w-5" />
              <span>Error Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-red-700 dark:text-red-300 font-mono bg-red-100 dark:bg-red-900/40 p-2 rounded">
              {error.message || "An unexpected error occurred"}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 dark:text-red-400">
                Error ID: {error.digest}
              </p>
            )}
            <p className="text-xs text-red-600 dark:text-red-400">
              Timestamp: {new Date().toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={reset}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-orange-600 text-white hover:opacity-90"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>

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
            onClick={handleRefresh}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Refresh Page
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          <Button asChild variant="outline" className="h-auto p-4">
            <Link href="/" className="flex flex-col items-center space-y-2">
              <Home className="h-6 w-6" />
              <div>
                <div className="font-semibold">Go Home</div>
                <div className="text-xs text-muted-foreground">
                  Return to homepage
                </div>
              </div>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-auto p-4">
            <Link
              href="/contact"
              className="flex flex-col items-center space-y-2"
            >
              <Mail className="h-6 w-6" />
              <div>
                <div className="font-semibold">Report Issue</div>
                <div className="text-xs text-muted-foreground">
                  Contact support
                </div>
              </div>
            </Link>
          </Button>
        </div>

        {/* Help Section */}
        <Card className="bg-muted/30 border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Mail className="h-8 w-8 text-blue-500" />
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">
                  Need Additional Help?
                </h3>
                <p className="text-sm text-muted-foreground">
                  If this error persists, please contact our support team with
                  the error details above.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/help">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Help Center
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Tips */}
        <div className="text-xs text-muted-foreground space-y-1 opacity-75">
          <p>
            This error has been automatically reported to our development team.
          </p>
          <p>
            Try refreshing the page or going back to continue using the
            application.
          </p>
        </div>
      </div>
    </div>
  );
}

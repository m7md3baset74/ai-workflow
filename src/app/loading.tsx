"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Workflow } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <Card className="max-w-md mx-auto bg-card/50 backdrop-blur border-border">
        <CardContent className="p-8 text-center space-y-6">
          {/* Loading Animation */}
          <div className="relative">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Workflow className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground theme-typography">
              Loading...
            </h2>
            <p className="text-sm text-muted-foreground">
              Please wait while we prepare your experience
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>

          {/* Subtle Loading Bar */}
          <div className="w-full bg-muted rounded-full h-1">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full animate-pulse"></div>
          </div>

          {/* Loading Tips */}
          <div className="text-xs text-muted-foreground space-y-1 opacity-75">
            <p>Setting up your workspace...</p>
            <p>This usually takes just a moment</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

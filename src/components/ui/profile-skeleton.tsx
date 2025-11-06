"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <Skeleton className="h-9 w-48" /> {/* Title */}
            <Skeleton className="h-4 w-80" /> {/* Description */}
          </div>
          <Skeleton className="h-10 w-28" /> {/* Edit button */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card Skeleton */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Skeleton className="h-6 w-6" /> {/* User icon */}
                  <Skeleton className="h-7 w-40" /> {/* Title */}
                </div>
                <Skeleton className="h-4 w-64" /> {/* Description */}
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" /> {/* Label */}
                  <Skeleton className="h-32 w-32 rounded-full mx-auto" />{" "}
                  {/* Profile picture */}
                </div>

                <Separator />

                {/* Personal Information Skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-6 w-40" /> {/* Section title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" /> {/* Label */}
                      <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" /> {/* Label */}
                      <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Label */}
                    <Skeleton className="h-10 w-full" /> {/* Input */}
                    <Skeleton className="h-3 w-48" /> {/* Helper text */}
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" /> {/* Label */}
                    <Skeleton className="h-10 w-full" /> {/* Input */}
                  </div>
                </div>

                <Separator />

                {/* Password Section Skeleton */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-20" /> {/* Section title */}
                    <Skeleton className="h-8 w-32" /> {/* Button */}
                  </div>
                </div>

                <Separator />

                {/* Professional Information Skeleton */}
                <div className="space-y-4">
                  <Skeleton className="h-6 w-48" /> {/* Section title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" /> {/* Label */}
                      <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" /> {/* Label */}
                      <Skeleton className="h-10 w-full" /> {/* Input */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Info Sidebar Skeleton */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
              <CardHeader>
                <Skeleton className="h-6 w-32" /> {/* Title */}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-8" /> {/* Label */}
                  <Skeleton className="h-4 w-16" /> {/* Value */}
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" /> {/* Label */}
                  <Skeleton className="h-4 w-20" /> {/* Value */}
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-20" /> {/* Label */}
                  <Skeleton className="h-4 w-24" /> {/* Value */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

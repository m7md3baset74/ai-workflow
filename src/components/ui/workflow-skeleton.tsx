import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WorkflowSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Date and node info */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 mr-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-1 mx-2" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-14" />
            </div>
            <Skeleton className="h-8 w-18" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function WorkflowSkeletonGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <WorkflowSkeleton key={index} />
      ))}
    </div>
  );
}
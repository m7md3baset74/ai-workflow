"use client";

import { PaidFeature } from "@/components/ui/paid-feature";
import { Workflow } from "lucide-react";

export default function AdminWorkflows() {
  return (
    <PaidFeature
      title="Workflow Management"
      description="Upgrade to Premium to access advanced workflow management features including comprehensive analytics, bulk operations, and detailed execution logs."
      icon={Workflow}
      features={[
        "View and manage all workflows",
        "Monitor workflow executions in real-time",
        "Advanced filtering and analytics",
        "Bulk workflow operations",
        "Export workflow data and reports",
        "Performance optimization tools",
      ]}
    />
  );
}

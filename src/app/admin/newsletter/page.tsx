"use client";

import { PaidFeature } from "@/components/ui/paid-feature";
import { Bell } from "lucide-react";

export default function AdminNewsletter() {
  return (
    <PaidFeature
      title="Newsletter Management"
      description="Upgrade to Premium to access advanced newsletter features including campaign management, analytics, and automated email sequences."
      icon={Bell}
      features={[
        "Manage all newsletter subscribers",
        "Email campaign analytics",
        "Advanced segmentation tools",
        "Automated email sequences",
        "Export subscriber data",
        "A/B testing capabilities",
      ]}
    />
  );
}

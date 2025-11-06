"use client";

import { PaidFeature } from "@/components/ui/paid-feature";
import { Settings } from "lucide-react";

export default function AdminSettings() {
  return (
    <PaidFeature
      title="Admin Settings"
      description="Upgrade to Premium to access advanced configuration options including system preferences, security settings, and integration management."
      icon={Settings}
      features={[
        "Advanced system configuration",
        "Security and access controls",
        "Integration management",
        "Backup and restore options",
        "Audit logs and monitoring",
        "Custom branding settings",
      ]}
    />
  );
}

"use client";

import { PaidFeature } from "@/components/ui/paid-feature";
import { MessageSquare } from "lucide-react";

export default function AdminMessages() {
  return (
    <PaidFeature
      title="Message Management"
      description="Upgrade to Premium to access advanced messaging features including inbox management, automated responses, and comprehensive message analytics."
      icon={MessageSquare}
      features={[
        "View and manage all messages",
        "Advanced filtering and search",
        "Automated response templates",
        "Message analytics and insights",
        "Export message data",
        "Priority message handling",
      ]}
    />
  );
}

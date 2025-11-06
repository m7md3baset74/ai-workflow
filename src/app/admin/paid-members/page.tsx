"use client";

import { PaidFeature } from "@/components/ui/paid-feature";
import { Crown } from "lucide-react";

export default function AdminPaidMembers() {
  return (
    <PaidFeature
      title="Paid Members Management"
      description="Upgrade to Premium to access subscriber management features including detailed analytics, revenue tracking, and advanced member controls."
      icon={Crown}
      features={[
        "View all paid subscribers",
        "Subscription analytics dashboard",
        "Revenue tracking and reports",
        "Member tier management",
        "Export subscription data",
        "Automated billing management",
      ]}
    />
  );
}

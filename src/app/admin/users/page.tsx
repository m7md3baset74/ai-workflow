"use client";

import { PaidFeature } from "@/components/ui/paid-feature";
import { Users } from "lucide-react";

export default function AdminUsers() {
  return (
    <PaidFeature
      title="User Management"
      description="Upgrade to Premium to access advanced user management features including bulk operations, detailed analytics, and comprehensive user controls."
      icon={Users}
      features={[
        "View and manage all users",
        "Edit user roles and permissions",
        "Advanced filtering and search",
        "Bulk user operations",
        "Export user data",
        "User activity tracking",
      ]}
    />
  );
}

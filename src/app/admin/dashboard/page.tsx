"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  Workflow,
  Activity,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { AdminDashboardSkeleton } from "@/components/ui/admin-skeleton";

interface DashboardStats {
  users: {
    total: number;
    active: number;
    new: number;
  };
  workflows: {
    total: number;
    active: number;
    executed: number;
  };
  messages: {
    total: number;
    unread: number;
    recent: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your platform&apos;s key metrics and activities.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.users.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              +{stats?.users.new || 0} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Workflows
            </CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.workflows.active || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.workflows.total || 0} total workflows
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.messages.unread || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.messages.total || 0} total messages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Executions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.workflows.executed || 0}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage user accounts, roles, and permissions.
            </p>
            <div className="flex space-x-2">
              <Button size="sm" asChild>
                <Link href="/admin/users">View Users</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/admin/users?tab=create">Add User</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Workflow className="h-5 w-5 mr-2" />
              Workflow Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Monitor and manage user workflows and automations.
            </p>
            <div className="flex space-x-2">
              <Button size="sm" asChild>
                <Link href="/admin/workflows">View Workflows</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/admin/workflows?status=active">Active Only</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Contact Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Review and respond to user inquiries and feedback.
            </p>
            <div className="flex space-x-2">
              <Button size="sm" asChild>
                <Link href="/admin/messages">View Messages</Link>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/admin/messages?status=unread">
                  Unread ({stats?.messages.unread || 0})
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Database Connection</span>
              </div>
              <Badge variant="secondary" className="text-green-600">
                Healthy
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">API Services</span>
              </div>
              <Badge variant="secondary" className="text-green-600">
                Online
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">Workflow Execution</span>
              </div>
              <Badge variant="outline" className="text-yellow-600">
                Normal
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm">New user registration</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm">Workflow executed successfully</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm">New contact message received</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

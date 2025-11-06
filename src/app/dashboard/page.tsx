"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  Play,
  Edit,
  Trash2,
  Calendar,
  Search,
  Loader2,
  X,
  Copy,
} from "lucide-react";
import { WorkflowData, ExecutionResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ExecutionResultsModal from "@/components/workflow/ExecutionResultsModal";
import { toast } from "sonner";
import { PageLoader } from "@/components/ui/loader";
import { DeleteConfirmationModal } from "@/components/ui/delete-confirmation-modal";
import { WorkflowSkeletonGrid } from "@/components/ui/workflow-skeleton";

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 12,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [executionResults, setExecutionResults] = useState<ExecutionResult[]>(
    []
  );
  const [showExecutionResults, setShowExecutionResults] = useState(false);
  const [executedWorkflowName, setExecutedWorkflowName] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    workflowId?: string;
    workflowName?: string;
  }>({
    isOpen: false,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search effect
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Clear search loading immediately when search term is cleared
    if (!searchTerm) {
      setSearchLoading(false);
      if (status === "authenticated") {
        fetchWorkflows(1, "", false);
      }
      return;
    }

    // Set search loading only when we have a search term
    if (searchTerm && status === "authenticated") {
      setSearchLoading(true);
    }

    // Debounce the actual search API call
    searchTimeoutRef.current = setTimeout(() => {
      if (status === "authenticated") {
        fetchWorkflows(1, searchTerm, false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, status]);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    fetchWorkflows(1, searchTerm, false);
  }, [session, status, router, searchTerm]);

  // Handle payment success
  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const success = searchParams.get("success");
      const sessionId = searchParams.get("session_id");

      if (success === "true" && sessionId && session?.user?.email) {
        try {
          // Verify and update subscription status
          const response = await fetch("/api/stripe/verify-subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          });

          if (response.ok) {
            await response.json();

            // Update the session to reflect the new subscription
            await update();

            // Wait a moment for the database to update, then refresh UI
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent("subscription-updated"));
            }, 1000);

            // Show success message
            toast.success(
              "Payment successful! Your subscription has been activated.",
              {
                position: "top-center",
                duration: 5000,
              }
            );

            // Clean up URL parameters
            const url = new URL(window.location.href);
            url.searchParams.delete("success");
            url.searchParams.delete("session_id");
            router.replace(url.pathname + url.search, { scroll: false });
          } else {
            console.error("Failed to verify subscription");
          }
        } catch (error) {
          console.error("Error verifying subscription:", error);
        }
      }
    };

    if (status === "authenticated") {
      handlePaymentSuccess();
    }
  }, [searchParams, session, status, update, router]);

  // Infinite scroll setup
  const lastWorkflowElementCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || loadingMore || searchLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pagination.hasNextPage) {
          fetchWorkflows(pagination.currentPage + 1, searchTerm, true);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [
      loading,
      loadingMore,
      searchLoading,
      pagination.hasNextPage,
      pagination.currentPage,
      searchTerm,
    ]
  );

  // Cleanup observer
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const fetchWorkflows = async (page = 1, search = "", append = false) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const queryParams = new URLSearchParams({
        page: page.toString(),
        perPage: "12",
        ...(search && { search }),
      });

      const response = await fetch(`/api/workflows?${queryParams}`);
      if (response.ok) {
        const data = await response.json();

        if (append && page > 1) {
          setWorkflows((prev) => [...prev, ...data.workflows]);
        } else {
          setWorkflows(data.workflows);
        }

        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching workflows:", error);
      toast.error("Failed to load workflows", {
        description: "Please try refreshing the page",
        duration: 4000,
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setSearchLoading(false);
    }
  };

  const openDeleteModal = (id: string | undefined, name: string) => {
    if (!id) {
      toast.error("Workflow ID is missing");
      return;
    }
    setDeleteModal({
      isOpen: true,
      workflowId: id,
      workflowName: name,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false });
  };

  const deleteWorkflow = async () => {
    const { workflowId } = deleteModal;
    if (!workflowId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/workflows/${workflowId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setWorkflows(workflows.filter((w) => (w.id || w._id) !== workflowId));
        // Update total count
        setPagination((prev) => ({
          ...prev,
          totalCount: Math.max(0, prev.totalCount - 1),
        }));
        toast.success("Workflow deleted successfully", {
          description: "The workflow has been permanently removed.",
          duration: 3000,
        });
        closeDeleteModal();
      } else {
        toast.error("Failed to delete workflow", {
          description:
            "Please try again or contact support if the problem persists.",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error deleting workflow:", error);
      toast.error("Failed to delete workflow", {
        description: "An unexpected error occurred. Please try again.",
        duration: 4000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const runWorkflow = async (id: string | undefined, workflowName: string) => {
    if (!id) {
      alert("Workflow ID is missing");
      return;
    }

    try {
      const response = await fetch("/api/workflows/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflowId: id }),
      });

      if (response.ok) {
        const data = await response.json();
        setExecutionResults(data.result || []);
        setExecutedWorkflowName(workflowName);
        setShowExecutionResults(true);
        // Refresh current page
        fetchWorkflows(pagination.currentPage, searchTerm, false);

        toast.success("Workflow executed successfully!", {
          description: `"${workflowName}" completed execution. Check the results below.`,
          duration: 4000,
        });
      } else {
        const error = await response.json();
        toast.error("Failed to execute workflow", {
          description:
            error.error || "An unexpected error occurred during execution.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error running workflow:", error);
      toast.error("Failed to execute workflow", {
        description: "An unexpected error occurred. Please try again.",
        duration: 4000,
      });
    }
  };

  const duplicateWorkflow = async (workflow: WorkflowData) => {
    if (!workflow.id && !workflow._id) {
      toast.error("Unable to duplicate workflow", {
        description: "Workflow ID is missing",
        duration: 3000,
      });
      return;
    }

    try {
      const newWorkflowName = `${workflow.name} (Copy)`;

      const response = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newWorkflowName,
          description: workflow.description
            ? `${workflow.description} (Copy)`
            : "",
          nodes: workflow.nodes,
          edges: workflow.edges,
          isActive: false, // Set copies to inactive by default
        }),
      });

      if (response.ok) {
        // Refresh the workflows list
        fetchWorkflows(pagination.currentPage, searchTerm, false);

        toast.success("Workflow duplicated successfully!", {
          description: `"${newWorkflowName}" has been created`,
          duration: 4000,
        });
      } else {
        const error = await response.json();
        toast.error("Failed to duplicate workflow", {
          description: error.error || "An unexpected error occurred",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error duplicating workflow:", error);
      toast.error("Failed to duplicate workflow", {
        description: "Network error. Please try again.",
        duration: 4000,
      });
    }
  };

  if (status === "loading") {
    return <PageLoader text="Loading your workflows..." />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="border-b bg-card">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-6 space-y-4 lg:space-y-0">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-3xl font-bold text-foreground">
                    Dashboard
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Welcome back, {session.user?.name || session.user?.email}
                  </p>
                  {pagination.totalCount > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {pagination.totalCount} workflow
                      {pagination.totalCount !== 1 ? "s" : ""} total
                      {searchTerm && ` • Searching for "${searchTerm}"`}
                    </p>
                  )}
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-4 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search workflows..."
                    className="pl-10 pr-20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    {searchLoading && (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSearchLoading(false);
                        }}
                        className="p-1 hover:bg-muted rounded-sm transition-colors"
                        type="button"
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button asChild>
                <Link href="/workflow/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Workflow
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {loading ? (
            <WorkflowSkeletonGrid />
          ) : searchLoading ? (
            <WorkflowSkeletonGrid />
          ) : workflows.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-muted-foreground">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium">
                {searchTerm ? "No workflows found" : "No workflows"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm
                  ? `No workflows match "${searchTerm}". Try a different search term.`
                  : "Get started by creating a new workflow."}
              </p>
              <div className="mt-6">
                {searchTerm ? (
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSearchLoading(false);
                    }}
                    variant="outline"
                  >
                    Clear Search
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/workflow/new">
                      <Plus className="h-4 w-4 mr-2" />
                      New Workflow
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {workflows.map((workflow, index) => (
                  <Card
                    key={workflow?._id}
                    className="hover:shadow-lg transition-shadow duration-200"
                    ref={
                      index === workflows.length - 1
                        ? lastWorkflowElementCallback
                        : null
                    }
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg truncate">
                          {workflow.name}
                        </CardTitle>
                        <Badge
                          variant={workflow.isActive ? "default" : "secondary"}
                        >
                          {workflow.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>

                      {workflow.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                          {workflow.description}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            Updated{" "}
                            {workflow.updatedAt
                              ? new Date(
                                  workflow.updatedAt
                                ).toLocaleDateString()
                              : "recently"}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <span>{workflow.nodes.length} nodes</span>
                          <span className="mx-2">•</span>
                          <span>{workflow.edges.length} connections</span>
                        </div>

                        {workflow.lastExecuted && (
                          <div>
                            Last run:{" "}
                            {new Date(workflow.lastExecuted).toLocaleString()}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between gap-2 items-center mt-4 pt-4 border-t">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              runWorkflow(
                                workflow.id || workflow._id,
                                workflow.name
                              )
                            }
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Run
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link
                              href={`/workflow/${workflow.id || workflow._id}`}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => duplicateWorkflow(workflow)}
                            title="Duplicate workflow"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            openDeleteModal(
                              workflow.id || workflow._id,
                              workflow.name
                            )
                          }
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Loading More Indicator */}
              {loadingMore && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Loading more workflows...
                    </p>
                  </div>
                </div>
              )}

              {/* End of results indicator */}
              {!loading &&
                !loadingMore &&
                workflows.length > 0 &&
                !pagination.hasNextPage && (
                  <div className="text-center py-20">
                    <p className="text-sm text-muted-foreground">
                      You&apos;ve reached the end! Showing all{" "}
                      {pagination.totalCount} workflow
                      {pagination.totalCount !== 1 ? "s" : ""}.
                    </p>
                  </div>
                )}
            </>
          )}
        </div>
      </main>

      <ExecutionResultsModal
        isOpen={showExecutionResults}
        onClose={() => setShowExecutionResults(false)}
        results={executionResults}
        workflowName={executedWorkflowName}
      />

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={deleteWorkflow}
        title="Delete Workflow"
        itemName={deleteModal.workflowName}
        description={`Are you sure you want to delete "${deleteModal.workflowName}"? This will permanently remove the workflow and all its data. This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
}

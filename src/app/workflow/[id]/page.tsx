"use client";

import { useEffect, useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactFlowProvider } from "@xyflow/react";
import { useWorkflowStore } from "@/store/workflowStore";
import WorkflowCanvas from "@/components/workflow/WorkflowCanvas";
import Sidebar from "@/components/workflow/Sidebar";
import Toolbar from "@/components/workflow/Toolbar";
import WorkflowInfoPanel from "@/components/workflow/WorkflowInfoPanel";
import FloatingMenu from "@/components/workflow/FloatingMenu";

// Disable static generation for this dynamic route
export const dynamic = "force-dynamic";

export default function WorkflowEditor() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { loadWorkflowSafely, isLoading, errors } = useWorkflowStore();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const workflowId = params.id as string;

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    if (workflowId) {
      loadWorkflowSafely(workflowId);
    }
  }, [workflowId, session, status, router, loadWorkflowSafely]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          {/* Enhanced Loader Animation */}
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-transparent theme-gradient mx-auto shadow-2xl">
              <div className="h-full w-full rounded-full bg-background"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-3 w-3 animate-pulse rounded-full theme-gradient"></div>
            </div>
            <div className="absolute inset-0 rounded-full theme-gradient opacity-20 blur-xl animate-pulse"></div>
          </div>

          {/* Loading Progress Steps */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground theme-typography">
              Loading Workflow
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full theme-primary animate-pulse"></div>
                <span>Fetching workflow data...</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full theme-secondary animate-pulse [animation-delay:0.2s]"></div>
                <span>Loading nodes and connections...</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full theme-accent animate-pulse [animation-delay:0.4s]"></div>
                <span>Preparing canvas...</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-1.5 mt-6">
              <div className="h-1.5 theme-gradient rounded-full animate-[loading_2s_ease-in-out_infinite] w-0"></div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              This may take a few moments for complex workflows
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (errors.length > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-destructive mb-4 theme-typography">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 theme-gradient text-white rounded-md hover:opacity-90 theme-typography"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Component that has access to ReactFlow context for proper drop handling
  const DropZone = () => {
    const onDragOver = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const nodeType = event.dataTransfer.getData("application/reactflow");
      if (!nodeType) return;

      // Get the position where the node was dropped
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left - 110, // Center the node
        y: event.clientY - reactFlowBounds.top - 50,
      };

      // Add node at the drop position
      useWorkflowStore.getState().addNode(nodeType, position);
    }, []);

    return (
      <div className="h-full w-full" onDragOver={onDragOver} onDrop={onDrop}>
        <WorkflowCanvas />
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-background theme-typography overflow-hidden">
      <Toolbar />

      <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        {/* Desktop Sidebar - Hidden on small screens */}
        <div className="hidden lg:flex lg:flex-col w-80 border-r bg-card overflow-hidden h-full">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <WorkflowInfoPanel />
            <Sidebar />
          </div>
        </div>

        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden fixed top-20 left-4 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Open Node Library"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative w-80 max-w-[85vw] bg-card shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Close Node Library"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex-1 min-h-0 overflow-y-auto">
                <WorkflowInfoPanel />
                <Sidebar />
              </div>
            </div>
          </div>
        )}

        {/* Main content area */}
        <div className="flex-1 relative overflow-hidden">
          <ReactFlowProvider>
            <DropZone />
            <FloatingMenu />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}

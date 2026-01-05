"use client";

import { ReactFlowProvider } from "@xyflow/react";
import WorkflowCanvas from "@/components/workflow/WorkflowCanvas";
import Sidebar from "@/components/workflow/Sidebar";
import Toolbar from "@/components/workflow/Toolbar";
import { useParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useWorkflowStore } from "@/store/workflowStore";

export default function WorkflowPage() {
  const { id } = useParams<{ id: string }>();
  const { loadWorkflow, reset, addNode } = useWorkflowStore();

  useEffect(() => {
    if (!id) return;

    if (id === "new") {
      reset(); // builder فاضي
    } else {
      loadWorkflow(id);
    }
  }, [id, loadWorkflow, reset]);

  // Drag over canvas
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Drop node on canvas
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData(
        "application/reactflow"
      );
      if (!nodeType) return;

      const bounds = event.currentTarget.getBoundingClientRect();

      const position = {
        x: event.clientX - bounds.left - 110,
        y: event.clientY - bounds.top - 50,
      };

      addNode(nodeType, position);
    },
    [addNode]
  );

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden">
        {/* Sidebar with scroll */}
        <div className="w-80 border-r bg-card h-full overflow-hidden">
          <div className="flex-1 min-h-0 h-full overflow-y-auto">
            <Sidebar />
          </div>
        </div>

        {/* Main Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Toolbar title="Workflow Builder (Demo)" />

          {/* Canvas Drop Zone */}
          <div
            className="flex-1 relative"
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            <WorkflowCanvas />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

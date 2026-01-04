"use client";

import { ReactFlowProvider } from "reactflow";
import WorkflowCanvas from "@/components/workflow/WorkflowCanvas";
import Sidebar from "@/components/workflow/Sidebar";
import Toolbar from "@/components/workflow/Toolbar";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useWorkflowStore } from "@/store/workflowStore";


export default function WorkflowPage() {

   const { id } = useParams<{ id: string }>();
  const { loadWorkflow, reset } = useWorkflowStore();

  useEffect(() => {
    if (!id) return;

    if (id === "new") {
      reset(); // Builder فاضي
    } else {
      loadWorkflow(id); // Load workflow
    }
  }, [id]);


  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Sidebar (Nodes) */}
        <Sidebar />

        {/* Main Area */}
        <div className="flex flex-1 flex-col">
          {/* Top Toolbar */}
          <Toolbar title="Workflow Builder (Demo)" />

          {/* Canvas */}
          <div className="flex-1">
            <WorkflowCanvas />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

"use client";

import { ReactFlowProvider } from "reactflow";
import WorkflowCanvas from "@/components/workflow/WorkflowCanvas";
import Sidebar from "@/components/workflow/Sidebar";
import Toolbar from "@/components/workflow/Toolbar";

export default function WorkflowPage() {
  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Sidebar (Nodes) */}
        <Sidebar />

        {/* Main Area */}
        <div className="flex flex-1 flex-col">
          {/* Top Toolbar */}
          <Toolbar title="Workflow Builder (Dragify Demo)" />

          {/* Canvas */}
          <div className="flex-1">
            <WorkflowCanvas />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  NodeTypes,
  NodeProps,
  ConnectionMode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useWorkflowStore } from "@/store/workflowStore";
import CustomNodeComponent from "./nodes/CustomNode";
import NodeConfigModal from "./nodes/NodeConfigModal";
import { CustomNodeData } from "@/lib/types";

const nodeTypes: NodeTypes = {
  custom: CustomNodeComponent as React.ComponentType<NodeProps>,
};

export default function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeData,
  } = useWorkflowStore();

  const [selectedNode, setSelectedNode] =
    useState<Node<CustomNodeData> | null>(null);

  const onNodeDoubleClick = useCallback(
    (_: React.MouseEvent, node: Node<CustomNodeData>) => {
      setSelectedNode(node);
    },
    []
  );

  const handleConfigSave = useCallback(
    (config: Record<string, unknown>) => {
      if (!selectedNode) return;

      updateNodeData(selectedNode.id, {
        config,
        isValid: Object.values(config).some((v) => v !== ""),
      });

      setSelectedNode(null);
    },
    [selectedNode, updateNodeData]
  );

  const defaultEdgeOptions = useMemo(
    () => ({
      type: "smoothstep",
      animated: true,
      style: {
        strokeWidth: 2,
      },
    }),
    []
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        className="bg-background"
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} />
        <Controls position="top-left" />
        <MiniMap zoomable pannable />
      </ReactFlow>

      {selectedNode && (
        <NodeConfigModal
          isOpen
          nodeData={selectedNode.data}
          onClose={() => setSelectedNode(null)}
          onSave={handleConfigSave}
        />
      )}
    </>
  );
}

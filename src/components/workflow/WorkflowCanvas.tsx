"use client";

import React, { useCallback, useState, useMemo, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  ConnectionMode,
  NodeTypes,
  NodeProps,
  OnInit,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useWorkflowStore } from "@/store/workflowStore";
import { useThemeCustomizer } from "@/components/providers/ThemeCustomizerProvider";
import CustomNodeComponent from "./nodes/CustomNode";
import NodeConfigModal from "./nodes/NodeConfigModal";
import { CustomNodeData, CustomNode, CustomEdge } from "@/lib/types";

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

  const { customTheme } = useThemeCustomizer();
  const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(
    null
  );
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onNodeDoubleClick = useCallback(
    (_event: React.MouseEvent, node: Node<CustomNodeData>) => {
      setSelectedNode(node);
      setIsConfigModalOpen(true);
    },
    []
  );

  const handleConfigSave = useCallback(
    (config: Record<string, unknown>) => {
      if (selectedNode) {
        updateNodeData(selectedNode.id, {
          config,
          isValid:
            Object.keys(config).length > 0 &&
            Object.values(config).some((v) => v !== ""),
        });
      }
    },
    [selectedNode, updateNodeData]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent) => {
    _event.stopPropagation();
  }, []);

  const onPaneClick = useCallback(() => {
    // Clear any selection when clicking on empty canvas
  }, []);

  const onInit: OnInit<CustomNode, CustomEdge> = useCallback(
    (reactFlowInstance) => {
      // Ensure zoom is working properly on initialization
      console.log("ReactFlow initialized:", reactFlowInstance);
    },
    []
  );

  const onNodeDragStart = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      // Add visual feedback for dragging
      const nodeElement = document.querySelector(`[data-id="${node.id}"]`);
      if (nodeElement) {
        nodeElement.classList.add("dragging");
      }
    },
    []
  );

  const onNodeDragStop = useCallback((_event: React.MouseEvent, node: Node) => {
    // Remove visual feedback
    const nodeElement = document.querySelector(`[data-id="${node.id}"]`);
    if (nodeElement) {
      nodeElement.classList.remove("dragging");
    }
  }, []);

  const defaultEdgeOptions = useMemo(
    () => ({
      type: "smoothstep",
      animated: true,
      style: {
        strokeWidth: 3,
        stroke: customTheme.variant.colors.accent,
        strokeDasharray: "0",
      },
    }),
    [customTheme.variant.colors.accent]
  );

  return (
    <>
      <div ref={reactFlowWrapper} className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodeClick={onNodeClick}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          onPaneClick={onPaneClick}
          onInit={onInit}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView={false}
          className="bg-background theme-typography"
          defaultEdgeOptions={defaultEdgeOptions}
          snapToGrid={false}
          panOnDrag={true}
          panOnScroll={false}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={true}
          preventScrolling={true}
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Shift"
          selectNodesOnDrag={false}
          nodeDragThreshold={1}
          minZoom={0.1}
          maxZoom={4}
          defaultViewport={{ x: 100, y: 100, zoom: 1 }}
          panActivationKeyCode="Space"
          proOptions={{ hideAttribution: true }}
        >
          <Background
            color={customTheme.variant.colors.primary}
            gap={20}
            size={2}
            className="opacity-20"
          />
          <Controls
            className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl shadow-xl"
            position="top-left"
            showZoom={true}
            showFitView={true}
            showInteractive={false}
          />
          <MiniMap
            className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-xl shadow-xl hidden sm:block"
            nodeColor={(node) => {
              if (
                node.data &&
                typeof node.data === "object" &&
                "nodeType" in node.data
              ) {
                const nodeType = node.data.nodeType as string;
                if (["webhook", "schedule"].includes(nodeType))
                  return customTheme.variant.colors.primary;
                if (
                  ["api-call", "database-update", "slack-message"].includes(
                    nodeType
                  )
                )
                  return customTheme.variant.colors.accent;
                if (["if-else", "loop"].includes(nodeType))
                  return customTheme.variant.colors.secondary;
              }
              return customTheme.variant.colors.primary;
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
        </ReactFlow>
      </div>

      {selectedNode && (
        <NodeConfigModal
          isOpen={isConfigModalOpen}
          onClose={() => {
            setIsConfigModalOpen(false);
            setSelectedNode(null);
          }}
          nodeData={selectedNode.data}
          onSave={handleConfigSave}
        />
      )}
    </>
  );
}

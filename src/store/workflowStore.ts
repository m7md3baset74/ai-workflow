import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  NodeChange,
  EdgeChange,
} from "@xyflow/react";
import {
  CustomNode,
  CustomEdge,
  WorkflowData,
  NODE_TYPES,
  CustomNodeData,
} from "@/lib/types";

interface WorkflowStore {
  // Workflow data
  workflow: WorkflowData | null;
  nodes: CustomNode[];
  edges: CustomEdge[];

  // UI state
  selectedNodes: string[];
  selectedEdges: string[];
  isLoading: boolean;
  isSaving: boolean;
  errors: string[];
  hasUnsavedChanges: boolean;

  // Actions
  setWorkflow: (workflow: WorkflowData) => void;
  updateWorkflow: (updates: Partial<WorkflowData>) => void;
  setNodes: (nodes: CustomNode[]) => void;
  setEdges: (edges: CustomEdge[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  // Node operations
  findGoodNodePosition: (suggestedPosition?: { x: number; y: number }) => {
    x: number;
    y: number;
  };
  addNode: (nodeType: string, position?: { x: number; y: number }) => void;
  deleteNode: (nodeId: string) => void;
  updateNodeData: (nodeId: string, data: Partial<CustomNode["data"]>) => void;

  // Edge operations
  deleteEdge: (edgeId: string) => void;

  // Selection
  setSelectedNodes: (nodeIds: string[]) => void;
  setSelectedEdges: (edgeIds: string[]) => void;
  clearSelection: () => void;

  // Workflow operations
  saveWorkflow: () => Promise<void>;
  loadWorkflow: (workflowId: string) => Promise<void>;
  createWorkflow: (name: string, description?: string) => Promise<void>;

  // Validation
  validateWorkflow: () => boolean;

  // UI state
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setErrors: (errors: string[]) => void;
  addError: (error: string) => void;
  clearErrors: () => void;
  setHasUnsavedChanges: (hasChanges: boolean) => void;

  // Persistence
  loadWorkflowSafely: (workflowId: string) => Promise<void>;
  testNode: (nodeId: string) => Promise<unknown>;

  // Reset
  reset: () => void;
}

let nodeId = 0;
const getNodeId = () => {
  nodeId++;
  return `node_${Date.now()}_${nodeId}`;
};

// let edgeId = 0;
// const getEdgeId = () => {
//   edgeId++;
//   return `edge_${Date.now()}_${edgeId}`;
// };

// Helper function to transform nodes for API
const transformNodesForAPI = (nodes: CustomNode[]) => {
  return nodes.map((node) => {
    const nodeDefinition = NODE_TYPES.find(
      (nt) => nt.type === node.data.nodeType
    );
    return {
      ...node,
      type: nodeDefinition?.category || "action", // Default to 'action' if not found
    };
  });
};

// Helper function to restore nodes from API
const restoreNodesFromAPI = (nodes: unknown[]): CustomNode[] => {
  return nodes.map((node) => {
    // Type guard to ensure node is an object
    if (!node || typeof node !== "object") {
      throw new Error("Invalid node data received from API");
    }

    const nodeObj = node as Record<string, unknown>;
    const nodeData = (nodeObj.data as Record<string, unknown>) || {};

    // Get the proper label for the node type
    const getNodeLabel = (nodeType: string) => {
      const nodeDefinition = NODE_TYPES.find((nt) => nt.type === nodeType);
      return (
        nodeDefinition?.label ||
        nodeType.charAt(0).toUpperCase() + nodeType.slice(1)
      );
    };

    const nodeType = (nodeData.nodeType as string) || "api-call";
    const config = (nodeData.config as Record<string, unknown>) || {};

    return {
      ...nodeObj,
      type: "custom", // Always restore to 'custom' type for proper rendering
      data: {
        label: (nodeData.label as string) || getNodeLabel(nodeType),
        nodeType: nodeType,
        config: config,
        isValid:
          nodeData.isValid !== undefined
            ? (nodeData.isValid as boolean)
            : Object.keys(config).length > 0,
      } as CustomNodeData,
    } as CustomNode;
  });
};

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  // Initial state
  workflow: null,
  nodes: [],
  edges: [],
  selectedNodes: [],
  selectedEdges: [],
  isLoading: false,
  isSaving: false,
  errors: [],
  hasUnsavedChanges: false,

  // Setters
  setWorkflow: (workflow) => set({ workflow }),
  updateWorkflow: (updates) => {
    const currentWorkflow = get().workflow;
    if (currentWorkflow) {
      const updatedWorkflow = { ...currentWorkflow, ...updates };
      set({ workflow: updatedWorkflow, hasUnsavedChanges: true });
    }
  },
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  // React Flow handlers
  onNodesChange: (changes) => {
    const { nodes } = get();
    const newNodes = applyNodeChanges(changes, nodes) as CustomNode[];

    // Only mark as unsaved if there are actual changes besides position updates during drag
    const hasSignificantChanges = changes.some(
      (change) =>
        change.type !== "position" ||
        (change.type === "position" && change.position && !change.dragging)
    );

    set({
      nodes: newNodes,
      hasUnsavedChanges: hasSignificantChanges ? true : get().hasUnsavedChanges,
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges) as CustomEdge[],
      hasUnsavedChanges: true,
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges) as CustomEdge[],
      hasUnsavedChanges: true,
    });
  },

  // Helper function to find a good position for a new node
  findGoodNodePosition: (suggestedPosition?: { x: number; y: number }) => {
    const { nodes } = get();

    if (nodes.length === 0) {
      // First node - place in center
      return { x: 250, y: 150 };
    }

    if (suggestedPosition) {
      // Check if suggested position is clear
      const isPositionTaken = nodes.some(
        (node) =>
          Math.abs(node.position.x - suggestedPosition.x) < 100 &&
          Math.abs(node.position.y - suggestedPosition.y) < 100
      );

      if (!isPositionTaken) {
        return suggestedPosition;
      }
    }

    // Find the rightmost node and place new node to its right
    const rightmostNode = nodes.reduce((rightmost, node) =>
      node.position.x > rightmost.position.x ? node : rightmost
    );

    return {
      x: rightmostNode.position.x + 280, // 280px spacing
      y: rightmostNode.position.y,
    };
  },

  // Node operations
  addNode: (nodeType, position) => {
    const finalPosition = position || get().findGoodNodePosition();
    const newNode: CustomNode = {
      id: getNodeId(),
      type: "custom",
      position: finalPosition,
      data: {
        label: nodeType.charAt(0).toUpperCase() + nodeType.slice(1),
        nodeType,
        config: {},
        isValid: true,
      },
    };

    set({
      nodes: [...get().nodes, newNode],
      hasUnsavedChanges: true,
    });
  },

  deleteNode: (nodeId) => {
    const { nodes, edges } = get();
    set({
      nodes: nodes.filter((node) => node.id !== nodeId),
      edges: edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNodes: get().selectedNodes.filter((id) => id !== nodeId),
      hasUnsavedChanges: true,
    });
  },

  updateNodeData: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
      hasUnsavedChanges: true,
    });
  },

  // Edge operations
  deleteEdge: (edgeId) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== edgeId),
      selectedEdges: get().selectedEdges.filter((id) => id !== edgeId),
    });
  },

  // Selection
  setSelectedNodes: (nodeIds) => set({ selectedNodes: nodeIds }),
  setSelectedEdges: (edgeIds) => set({ selectedEdges: edgeIds }),
  clearSelection: () => set({ selectedNodes: [], selectedEdges: [] }),

  // Workflow operations
  saveWorkflow: async () => {
    const { workflow, nodes, edges } = get();
    if (!workflow) return;

    const workflowId = workflow.id || workflow._id;
    if (!workflowId) {
      get().addError("No workflow ID found");
      return;
    }

    set({ isSaving: true, errors: [] });

    try {
      const transformedNodes = transformNodesForAPI(nodes);

      const response = await fetch(`/api/workflows/${workflowId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: workflow.name,
          description: workflow.description,
          nodes: transformedNodes,
          edges,
          isActive: workflow.isActive,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save workflow");
      }

      const data = await response.json();
      set({ workflow: data.workflow, hasUnsavedChanges: false });
    } catch (error) {
      get().addError("Failed to save workflow");
      console.error("Save error:", error);
    } finally {
      set({ isSaving: false });
    }
  },

  loadWorkflow: async (workflowId) => {
    set({ isLoading: true, errors: [] });

    try {
      const response = await fetch(`/api/workflows/${workflowId}`);

      if (!response.ok) {
        throw new Error("Failed to load workflow");
      }

      const data = await response.json();
      const workflow = data.workflow;

      set({
        workflow,
        nodes: restoreNodesFromAPI(workflow.nodes || []),
        edges: workflow.edges || [],
        hasUnsavedChanges: false,
      });
    } catch (error) {
      get().addError("Failed to load workflow");
      console.error("Load error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadWorkflowSafely: async (workflowId) => {
    const { hasUnsavedChanges, workflow } = get();

    // If no unsaved changes or this is the same workflow, just load normally
    if (
      !hasUnsavedChanges ||
      (workflow && (workflow.id === workflowId || workflow._id === workflowId))
    ) {
      await get().loadWorkflow(workflowId);
      return;
    }

    // If there are unsaved changes, warn the user
    const shouldProceed = window.confirm(
      "You have unsaved changes that will be lost. Do you want to continue loading this workflow?"
    );

    if (shouldProceed) {
      await get().loadWorkflow(workflowId);
    }
  },

  createWorkflow: async (name, description) => {
    set({ isLoading: true, errors: [] });

    try {
      const { nodes, edges } = get();
      const transformedNodes = transformNodesForAPI(nodes);

      const response = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          nodes: transformedNodes,
          edges,
          isActive: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || errorData.message || "Failed to create workflow"
        );
      }

      const data = await response.json();
      set({
        workflow: data.workflow,
        nodes: [],
        edges: [],
        hasUnsavedChanges: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create workflow";
      get().addError(errorMessage);
      console.error("Create error:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Validation
  validateWorkflow: () => {
    const { nodes, edges } = get();
    const errors: string[] = [];

    // Check for orphaned nodes (no connections)
    const connectedNodes = new Set([
      ...edges.map((e) => e.source),
      ...edges.map((e) => e.target),
    ]);

    const orphanedNodes = nodes.filter((node) => !connectedNodes.has(node.id));
    if (orphanedNodes.length > 0) {
      errors.push(`${orphanedNodes.length} nodes are not connected`);
    }

    // Check for invalid node configurations
    const invalidNodes = nodes.filter((node) => !node.data.isValid);
    if (invalidNodes.length > 0) {
      errors.push(`${invalidNodes.length} nodes have invalid configurations`);
    }

    set({ errors });
    return errors.length === 0;
  },

  // UI state
  setLoading: (loading) => set({ isLoading: loading }),
  setSaving: (saving) => set({ isSaving: saving }),
  setErrors: (errors) => set({ errors }),
  addError: (error) => set({ errors: [...get().errors, error] }),
  clearErrors: () => set({ errors: [] }),
  setHasUnsavedChanges: (hasChanges) => set({ hasUnsavedChanges: hasChanges }),

  // Node testing
  testNode: async (nodeId) => {
    const { nodes } = get();
    const node = nodes.find((n) => n.id === nodeId);

    if (!node) {
      throw new Error("Node not found");
    }

    try {
      const response = await fetch("/api/workflows/test-node", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodeType: node.data.nodeType,
          config: node.data.config,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to test node");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Node test error:", error);
      throw error;
    }
  },

  // Reset
  reset: () =>
    set({
      workflow: null,
      nodes: [],
      edges: [],
      selectedNodes: [],
      selectedEdges: [],
      isLoading: false,
      isSaving: false,
      errors: [],
      hasUnsavedChanges: false,
    }),
}));

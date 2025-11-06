"use client";

import { useEffect } from "react";
import { useWorkflowStore } from "@/store/workflowStore";
import { toast } from "sonner";

export default function WorkflowKeyboardShortcuts() {
  const {
    saveWorkflow,
    validateWorkflow,
    nodes,
    selectedNodes,
    deleteNode,
    clearSelection,
  } = useWorkflowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent shortcuts when typing in inputs, textareas, etc.
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.hasAttribute("contenteditable"));

      if (isInputActive) return;

      // Cmd/Ctrl + S: Save workflow
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        saveWorkflow();
        toast.success("Workflow saved", { duration: 2000 });
        return;
      }

      // Cmd/Ctrl + Shift + V: Validate workflow
      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "v"
      ) {
        e.preventDefault();
        const isValid = validateWorkflow();
        if (isValid) {
          toast.success("Workflow is valid!", { duration: 2000 });
        }
        return;
      }

      // Delete/Backspace: Delete selected nodes
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedNodes.length > 0
      ) {
        e.preventDefault();
        selectedNodes.forEach((nodeId) => deleteNode(nodeId));
        toast.success(
          `Deleted ${selectedNodes.length} node${
            selectedNodes.length > 1 ? "s" : ""
          }`,
          {
            duration: 2000,
          }
        );
        return;
      }

      // Escape: Clear selection
      if (e.key === "Escape") {
        e.preventDefault();
        clearSelection();
        return;
      }

      // Cmd/Ctrl + A: Select all nodes
      if ((e.metaKey || e.ctrlKey) && e.key === "a") {
        e.preventDefault();
        const allNodeIds = nodes.map((node) => node.id);
        useWorkflowStore.getState().setSelectedNodes(allNodeIds);
        toast.success(`Selected ${nodes.length} nodes`, { duration: 2000 });
        return;
      }

      // Cmd/Ctrl + D: Deselect all
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        clearSelection();
        toast.success("Cleared selection", { duration: 1500 });
        return;
      }

      // Show keyboard shortcuts help with Cmd/Ctrl + ?
      if ((e.metaKey || e.ctrlKey) && (e.key === "?" || e.key === "/")) {
        e.preventDefault();
        showKeyboardShortcuts();
        return;
      }
    };

    const showKeyboardShortcuts = () => {
      toast.info("Keyboard Shortcuts", {
        description: (
          <div className="text-sm space-y-1">
            <div>
              <kbd className="px-1 py-0.5 text-xs bg-muted rounded">
                ⌘/Ctrl + S
              </kbd>{" "}
              Save workflow
            </div>
            <div>
              <kbd className="px-1 py-0.5 text-xs bg-muted rounded">
                ⌘/Ctrl + Shift + V
              </kbd>{" "}
              Validate
            </div>
            <div>
              <kbd className="px-1 py-0.5 text-xs bg-muted rounded">
                Delete/Backspace
              </kbd>{" "}
              Delete selected
            </div>
            <div>
              <kbd className="px-1 py-0.5 text-xs bg-muted rounded">Escape</kbd>{" "}
              Clear selection
            </div>
            <div>
              <kbd className="px-1 py-0.5 text-xs bg-muted rounded">
                ⌘/Ctrl + A
              </kbd>{" "}
              Select all
            </div>
            <div>
              <kbd className="px-1 py-0.5 text-xs bg-muted rounded">
                ⌘/Ctrl + D
              </kbd>{" "}
              Deselect all
            </div>
          </div>
        ),
        duration: 8000,
      });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    saveWorkflow,
    validateWorkflow,
    nodes,
    selectedNodes,
    deleteNode,
    clearSelection,
  ]);

  return null; // This component doesn't render anything
}

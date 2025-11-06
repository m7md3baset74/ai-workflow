"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Save,
  Play,
  Download,
  Upload,
  Eye,
  EyeOff,
  Activity,
  Home,
  Power,
  PowerOff,
  Edit3,
  Check,
  X,
  HelpCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkflowStore } from "@/store/workflowStore";
import { ExecutionResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ExecutionResultsModal from "./ExecutionResultsModal";
import { ThemeCustomizer } from "../ui/theme-customizer";

export default function Toolbar() {
  const router = useRouter();
  const {
    workflow,
    nodes,
    edges,
    isSaving,
    saveWorkflow,
    validateWorkflow,
    errors,
    updateWorkflow,
  } = useWorkflowStore();

  const [isValidating, setIsValidating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResults, setExecutionResults] = useState<ExecutionResult[]>(
    []
  );
  const [showExecutionResults, setShowExecutionResults] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  const handleSave = async () => {
    await saveWorkflow();
  };

  const handleEditName = () => {
    if (workflow) {
      setEditedName(workflow.name);
      setIsEditingName(true);
    }
  };

  const handleSaveName = async () => {
    if (!workflow || !editedName.trim()) return;

    try {
      updateWorkflow({ name: editedName.trim() });
      await saveWorkflow();
      setIsEditingName(false);
      toast.success("Workflow name updated", {
        description: `Renamed to "${editedName.trim()}"`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to update workflow name:", error);
      toast.error("Failed to update workflow name", {
        description: "Please try again",
        duration: 3000,
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditedName("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveName();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const showKeyboardShortcuts = () => {
    toast.info("Keyboard Shortcuts", {
      description: (
        <div className="text-sm space-y-2">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs bg-muted rounded">⌘ S</kbd>
              <span className="text-xs">Save</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs bg-muted rounded">⌘⇧ V</kbd>
              <span className="text-xs">Validate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs bg-muted rounded">Del</kbd>
              <span className="text-xs">Delete</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs bg-muted rounded">Esc</kbd>
              <span className="text-xs">Deselect</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs bg-muted rounded">⌘ A</kbd>
              <span className="text-xs">Select all</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs bg-muted rounded">⌘ D</kbd>
              <span className="text-xs">Deselect</span>
            </div>
          </div>
        </div>
      ),
      duration: 8000,
    });
  };

  const handleRun = async () => {
    if (!workflow?.id && !workflow?._id) return;

    setIsRunning(true);
    try {
      const response = await fetch("/api/workflows/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workflowId: workflow.id || workflow._id }),
      });

      if (response.ok) {
        const data = await response.json();
        setExecutionResults(data.result || []);
        setShowExecutionResults(true);
        toast.success("Workflow executed successfully!", {
          description: `Executed ${
            data.executedNodes || data.result?.length || 0
          } nodes`,
          duration: 4000,
        });
      } else {
        const error = await response.json();
        toast.error("Failed to execute workflow", {
          description:
            error.details || error.error || "An unexpected error occurred",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error running workflow:", error);
      toast.error("Failed to execute workflow", {
        description: "Network error or server is unavailable",
        duration: 5000,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleValidate = () => {
    setIsValidating(true);
    const isValid = validateWorkflow();

    setTimeout(() => {
      setIsValidating(false);
      if (isValid) {
        toast.success("Workflow is valid!", {
          description: "All nodes are properly configured and connected",
          duration: 3000,
        });
      } else {
        toast.error("Workflow validation failed", {
          description: `Found ${errors.length} error${
            errors.length !== 1 ? "s" : ""
          }. Check the details in the sidebar.`,
          duration: 4000,
        });
      }
    }, 500);
  };

  const handleExport = () => {
    if (!workflow) {
      toast.error("No workflow to export", {
        description: "Please save your workflow first",
        duration: 3000,
      });
      return;
    }

    try {
      const exportData = {
        ...workflow,
        nodes,
        edges,
        exportedAt: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${workflow.name.replace(/\s+/g, "_")}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Workflow exported successfully!", {
        description: `Downloaded ${workflow.name}.json`,
        duration: 3000,
      });
    } catch {
      toast.error("Failed to export workflow", {
        description: "An error occurred while creating the export file",
        duration: 4000,
      });
    }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            // This would need to be implemented in the store
            console.log("Import data:", data);
            toast.info("Import feature coming soon!", {
              description: "Workflow import functionality is under development",
              duration: 4000,
            });
          } catch {
            toast.error("Invalid file format", {
              description: "Please select a valid JSON workflow file",
              duration: 4000,
            });
          }
        };
        reader.readAsText(file);
      }
    };

    input.click();
  };

  const handleToggleActive = async () => {
    if (!workflow) return;

    try {
      const workflowId = workflow.id || workflow._id;
      const newActiveState = !workflow.isActive;

      const response = await fetch(`/api/workflows/${workflowId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: workflow.name,
          description: workflow.description,
          nodes,
          edges,
          isActive: newActiveState,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        useWorkflowStore.setState({ workflow: data.workflow });

        toast.success(
          newActiveState ? "Workflow activated!" : "Workflow deactivated!",
          {
            description: newActiveState
              ? "Your workflow is now active and ready to run"
              : "Your workflow has been deactivated",
            duration: 3000,
          }
        );
      } else {
        throw new Error("Failed to update workflow status");
      }
    } catch {
      toast.error("Failed to update workflow status", {
        description:
          "Please try again or contact support if the problem persists",
        duration: 4000,
      });
    }
  };

  return (
    <div className="h-18 bg-card border-b flex items-center justify-between px-4 sm:px-6 py-4 theme-typography sticky top-0 z-50">
      <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
        {/* Home Button */}
        <Button
          onClick={() => router.push("/dashboard")}
          variant="outline"
          size="sm"
          className="theme-typography whitespace-nowrap"
        >
          <Home className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Dashboard</span>
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Primary Actions */}
        <Button
          onClick={handleSave}
          disabled={isSaving || !workflow}
          className="whitespace-nowrap"
        >
          <Save className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">
            {isSaving ? "Saving..." : "Save"}
          </span>
        </Button>

        <Button
          onClick={handleRun}
          disabled={(!workflow?.id && !workflow?._id) || isRunning}
          variant="outline"
          className="theme-accent border-current hover:bg-accent/10 whitespace-nowrap"
        >
          {isRunning ? (
            <div className="animate-spin h-4 w-4 sm:mr-2 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Play className="h-4 w-4 sm:mr-2" />
          )}
          <span className="hidden sm:inline">
            {isRunning ? "Running..." : "Run"}
          </span>
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Secondary Actions - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            onClick={handleValidate}
            disabled={isValidating}
            variant="outline"
            className="whitespace-nowrap"
          >
            {isValidating ? (
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-primary border-t-transparent rounded-full" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            Validate
          </Button>

          <Button
            onClick={handleExport}
            disabled={!workflow}
            variant="outline"
            className="whitespace-nowrap"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <Button
            onClick={handleImport}
            variant="outline"
            className="whitespace-nowrap"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>

          <Button
            onClick={showKeyboardShortcuts}
            variant="ghost"
            size="sm"
            className="whitespace-nowrap"
            title="Show keyboard shortcuts"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Workflow Status Toggle */}
        <Button
          onClick={handleToggleActive}
          disabled={!workflow}
          variant={workflow?.isActive ? "default" : "outline"}
          className={`whitespace-nowrap ${
            workflow?.isActive ? "theme-gradient text-white" : ""
          }`}
        >
          {workflow?.isActive ? (
            <Power className="h-4 w-4 sm:mr-2" />
          ) : (
            <PowerOff className="h-4 w-4 sm:mr-2" />
          )}
          <span className="hidden sm:inline">
            {workflow?.isActive ? "Active" : "Inactive"}
          </span>
        </Button>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Workflow Stats - Hidden on small screens */}
        <div className="hidden sm:block text-sm text-muted-foreground">
          <span className="mr-4">{nodes.length} nodes</span>
          <span>{edges.length} connections</span>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2">
          {/* Validation Status */}
          {errors.length > 0 && (
            <Badge variant="destructive" className="text-xs">
              <EyeOff className="h-3 w-3 mr-1" />
              {errors.length} error{errors.length !== 1 ? "s" : ""}
            </Badge>
          )}

          {/* Activity Indicator */}
          {(isRunning || isSaving) && (
            <Badge variant="outline" className="text-xs animate-pulse">
              <Activity className="h-3 w-3 mr-1" />
              {isRunning ? "Running" : "Saving"}
            </Badge>
          )}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Workflow Name and Theme Customizer - Responsive */}
        {workflow && (
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full theme-gradient"></div>
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <Input
                    ref={nameInputRef}
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="h-7 text-sm font-medium min-w-32 max-w-48"
                    placeholder="Workflow name"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={handleSaveName}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div
                  className="flex items-center gap-1 group cursor-pointer"
                  onClick={handleEditName}
                >
                  <div className="text-sm font-medium text-foreground truncate max-w-32 sm:max-w-none">
                    {workflow.name}
                  </div>
                  <Edit3 className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              <ThemeCustomizer />
            </div>
          </div>
        )}
      </div>

      <ExecutionResultsModal
        isOpen={showExecutionResults}
        onClose={() => setShowExecutionResults(false)}
        results={executionResults}
        workflowName={workflow?.name}
      />
    </div>
  );
}

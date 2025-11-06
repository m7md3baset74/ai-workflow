"use client";

import React, { useState, useRef, useEffect } from "react";
import { useWorkflowStore } from "@/store/workflowStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Edit3,
  Check,
  X,
  Calendar,
  Clock,
  Activity,
  Tag,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

export default function WorkflowInfoPanel() {
  const { workflow, nodes, edges, updateWorkflow, saveWorkflow, isSaving } =
    useWorkflowStore();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (isEditingDescription && descriptionTextareaRef.current) {
      descriptionTextareaRef.current.focus();
    }
  }, [isEditingDescription]);

  // Don't render if there's no workflow
  if (!workflow) return null;

  // Check if workflow is empty (new workflow without template or data)
  const isEmptyWorkflow =
    !workflow.name &&
    !workflow.description &&
    nodes.length === 0 &&
    edges.length === 0;

  // Return null for empty workflows
  if (isEmptyWorkflow) return null;

  const handleEditName = () => {
    setEditedName(workflow.name);
    setIsEditingName(true);
  };

  const handleEditDescription = () => {
    setEditedDescription(workflow.description || "");
    setIsEditingDescription(true);
  };

  const handleSaveName = async () => {
    if (!editedName.trim()) return;

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

  const handleSaveDescription = async () => {
    try {
      updateWorkflow({ description: editedDescription.trim() });
      await saveWorkflow();
      setIsEditingDescription(false);
      toast.success("Workflow description updated", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to update workflow description:", error);
      toast.error("Failed to update workflow description", {
        description: "Please try again",
        duration: 3000,
      });
    }
  };

  const handleCancelNameEdit = () => {
    setIsEditingName(false);
    setEditedName("");
  };

  const handleCancelDescriptionEdit = () => {
    setIsEditingDescription(false);
    setEditedDescription("");
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    type: "name" | "description"
  ) => {
    if (e.key === "Enter") {
      if (type === "name") {
        handleSaveName();
      } else if (type === "description" && !e.shiftKey) {
        e.preventDefault();
        handleSaveDescription();
      }
    } else if (e.key === "Escape") {
      if (type === "name") {
        handleCancelNameEdit();
      } else {
        handleCancelDescriptionEdit();
      }
    }
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Unknown";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="shadow-sm border-x-0 border-t-0 rounded-none">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-full theme-gradient"></div>
            Workflow Info
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 w-8 p-0"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Workflow Name */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Tag className="h-3 w-3" />
            Name
          </div>
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                ref={nameInputRef}
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, "name")}
                className="flex-1"
                placeholder="Workflow name"
                disabled={isSaving}
              />
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={handleSaveName}
                disabled={isSaving}
              >
                <Check className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={handleCancelNameEdit}
                disabled={isSaving}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 group cursor-pointer p-2 rounded-md hover:bg-muted/50 transition-colors"
              onClick={handleEditName}
            >
              <span className="font-medium flex-1">{workflow.name}</span>
              <Edit3 className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
            </div>
          )}
        </div>

        {/* Workflow Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="h-3 w-3" />
            Description
          </div>
          {isEditingDescription ? (
            <div className="space-y-2">
              <Textarea
                ref={descriptionTextareaRef}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e, "description")}
                className="min-h-20 resize-none"
                placeholder="Describe what this workflow does..."
                disabled={isSaving}
              />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveDescription}
                  disabled={isSaving}
                >
                  <Check className="h-3 w-3 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelDescriptionEdit}
                  disabled={isSaving}
                >
                  <X className="h-3 w-3 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="group cursor-pointer p-2 rounded-md hover:bg-muted/50 transition-colors min-h-10 flex items-start"
              onClick={handleEditDescription}
            >
              <span className="text-sm text-muted-foreground flex-1">
                {workflow.description ||
                  "No description provided. Click to add one."}
              </span>
              <Edit3 className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity mt-0.5" />
            </div>
          )}
        </div>

        {isExpanded && (
          <>
            <Separator />

            {/* Workflow Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Activity className="h-3 w-3" />
                  Nodes
                </div>
                <div className="text-sm font-medium">{nodes.length}</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Activity className="h-3 w-3" />
                  Connections
                </div>
                <div className="text-sm font-medium">{edges.length}</div>
              </div>
            </div>

            <Separator />

            {/* Status and Dates */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={workflow.isActive ? "default" : "secondary"}>
                  {workflow.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Created
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(workflow.createdAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Updated
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(workflow.updatedAt)}
                  </span>
                </div>

                {workflow.lastExecuted && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Activity className="h-3 w-3" />
                      Last Run
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(workflow.lastExecuted)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  Zap,
  Save,
  Eye,
  Download,
  Upload,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize,
  HelpCircle,
  Grid3X3,
} from "lucide-react";
import { useWorkflowStore } from "@/store/workflowStore";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "ghost"
  | "secondary"
  | "link";

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [gridVisible, setGridVisible] = useState(true);
  const { saveWorkflow, validateWorkflow, isSaving, errors } =
    useWorkflowStore();

  const { zoomIn, zoomOut, fitView, setViewport } = useReactFlow();

  const handleSave = async () => {
    await saveWorkflow();
    toast.success("Workflow saved", { duration: 2000 });
  };

  const handleValidate = () => {
    const isValid = validateWorkflow();
    if (isValid) {
      toast.success("Workflow is valid!", { duration: 2000 });
    }
  };

  const handleZoomIn = () => {
    zoomIn();
    toast.success("Zoomed in", { duration: 1000 });
  };

  const handleZoomOut = () => {
    zoomOut();
    toast.success("Zoomed out", { duration: 1000 });
  };

  const handleFitView = () => {
    fitView({ padding: 0.2 });
    toast.success("Fit to view", { duration: 1000 });
  };

  const handleReset = () => {
    setViewport({ x: 0, y: 0, zoom: 1 });
    toast.success("Reset view", { duration: 1000 });
  };

  const handleToggleGrid = () => {
    setGridVisible(!gridVisible);
    toast.success(`Grid ${!gridVisible ? "enabled" : "disabled"}`, {
      duration: 1000,
    });
  };

  const handleExport = () => {
    toast.info("Export feature coming soon", { duration: 2000 });
  };

  const handleImport = () => {
    toast.info("Import feature coming soon", { duration: 2000 });
  };

  const showShortcuts = () => {
    toast.info("Keyboard Shortcuts", {
      description: (
        <div className="text-sm space-y-1">
          <div>
            <kbd className="px-1 py-0.5 text-xs bg-muted rounded">⌘ S</kbd> Save
          </div>
          <div>
            <kbd className="px-1 py-0.5 text-xs bg-muted rounded">⌘⇧ V</kbd>{" "}
            Validate
          </div>
          <div>
            <kbd className="px-1 py-0.5 text-xs bg-muted rounded">Del</kbd>{" "}
            Delete selected
          </div>
          <div>
            <kbd className="px-1 py-0.5 text-xs bg-muted rounded">Esc</kbd>{" "}
            Clear selection
          </div>
        </div>
      ),
      duration: 5000,
    });
  };

  const menuItems: Array<{
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    disabled: boolean;
    variant: ButtonVariant;
  }> = [
    {
      icon: Save,
      label: "Save",
      onClick: handleSave,
      disabled: isSaving,
      variant: "default",
    },
    {
      icon: Eye,
      label: "Validate",
      onClick: handleValidate,
      disabled: false,
      variant: errors.length > 0 ? "destructive" : "outline",
    },
    {
      icon: ZoomIn,
      label: "Zoom In",
      onClick: handleZoomIn,
      disabled: false,
      variant: "outline",
    },
    {
      icon: ZoomOut,
      label: "Zoom Out",
      onClick: handleZoomOut,
      disabled: false,
      variant: "outline",
    },
    {
      icon: Maximize,
      label: "Fit View",
      onClick: handleFitView,
      disabled: false,
      variant: "outline",
    },
    {
      icon: RotateCcw,
      label: "Reset View",
      onClick: handleReset,
      disabled: false,
      variant: "outline",
    },
    {
      icon: Download,
      label: "Export",
      onClick: handleExport,
      disabled: false,
      variant: "outline",
    },
    {
      icon: Upload,
      label: "Import",
      onClick: handleImport,
      disabled: false,
      variant: "outline",
    },
    {
      icon: Grid3X3,
      label: gridVisible ? "Hide Grid" : "Show Grid",
      onClick: handleToggleGrid,
      disabled: false,
      variant: gridVisible ? "default" : "outline",
    },
    {
      icon: HelpCircle,
      label: "Help",
      onClick: showShortcuts,
      disabled: false,
      variant: "ghost",
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Menu Card */}
      {isOpen && (
        <Card className="mb-3 shadow-xl border backdrop-blur-sm bg-card/95 animate-in slide-in-from-bottom-2 fade-in duration-300">
          <CardContent className="p-3">
            <div className="flex flex-col gap-1.5 min-w-[150px] max-h-[60vh] overflow-y-auto">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={index}
                    variant={item.variant}
                    size="sm"
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className="justify-start h-9 text-xs font-medium hover:scale-105 transition-transform duration-150"
                  >
                    <Icon className="h-3.5 w-3.5 mr-2.5" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 theme-gradient ${
          isOpen ? "rotate-180" : "rotate-0"
        } hover:scale-110 active:scale-95`}
        title={isOpen ? "Close workflow menu" : "Open workflow menu"}
      >
        {isOpen ? (
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <Zap className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
      </Button>
    </div>
  );
}

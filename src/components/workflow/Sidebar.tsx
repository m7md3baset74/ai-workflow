"use client";

import React, { useState, useMemo } from "react";
import { NODE_TYPES } from "@/lib/types";
import { useWorkflowStore } from "@/store/workflowStore";
import { useThemeCustomizer } from "@/components/providers/ThemeCustomizerProvider";
import {
  Webhook,
  Clock,
  Globe,
  Database,
  MessageSquare,
  GitBranch,
  RotateCw,
  Settings,
  FileText,
  Mail,
  Upload,
  MessageCircle,
  Code,
  Shuffle,
  Layers,
  Filter,
  Workflow,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Webhook":
      return Webhook;
    case "Clock":
      return Clock;
    case "Globe":
      return Globe;
    case "Database":
      return Database;
    case "MessageSquare":
      return MessageSquare;
    case "GitBranch":
      return GitBranch;
    case "RotateCw":
      return RotateCw;
    case "FileText":
      return FileText;
    case "Mail":
      return Mail;
    case "Upload":
      return Upload;
    case "MessageCircle":
      return MessageCircle;
    case "Code":
      return Code;
    case "Shuffle":
      return Shuffle;
    case "Layers":
      return Layers;
    case "Filter":
      return Filter;
    case "Workflow":
      return Workflow;
    default:
      return Settings;
  }
};

export default function Sidebar() {
  const { addNode } = useWorkflowStore();
  const { customTheme } = useThemeCustomizer();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNodeTypes = useMemo(() => {
    if (!searchTerm) return NODE_TYPES;

    return NODE_TYPES.filter(
      (node) =>
        node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleAddNode = (nodeType: string) => {
    // Add node at center of viewport
    const position = { x: 250, y: 200 };
    addNode(nodeType, position);
  };

  const groupedNodes = filteredNodeTypes.reduce((acc, node) => {
    if (!acc[node.category]) {
      acc[node.category] = [];
    }
    acc[node.category].push(node);
    return acc;
  }, {} as Record<string, typeof filteredNodeTypes>);

  return (
    <div className="flex flex-col bg-card theme-typography">
      <div className="p-4 border-b bg-muted/20">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <div className="w-2 h-2 rounded-full theme-gradient"></div>
          Node Library
        </h2>
        <p className="text-sm text-muted-foreground mt-1 mb-3">
          Drag nodes to the canvas or click to add
        </p>
        <Input
          placeholder="Search nodes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-8 text-sm"
        />
      </div>

      <div className="p-4 space-y-6">
        {Object.entries(groupedNodes).map(([category, nodes]) => (
          <div key={category}>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-medium uppercase tracking-wider text-foreground">
                {category}s
              </h3>
              <Badge
                variant={
                  category === "trigger"
                    ? "default"
                    : category === "action"
                    ? "secondary"
                    : "outline"
                }
                className="text-xs"
                style={{
                  backgroundColor:
                    category === "trigger"
                      ? customTheme.variant.colors.primary
                      : category === "action"
                      ? customTheme.variant.colors.accent
                      : customTheme.variant.colors.secondary,
                }}
              >
                {nodes.length}
              </Badge>
            </div>
            <div className="space-y-2">
              {nodes.map((node) => {
                const Icon = getIcon(node.icon);
                const colorClass =
                  "border-border bg-card/50 hover:bg-card hover:border-primary/50";

                const iconColor =
                  category === "trigger"
                    ? customTheme.variant.colors.primary
                    : category === "action"
                    ? customTheme.variant.colors.accent
                    : customTheme.variant.colors.secondary;

                return (
                  <Card
                    key={node.type}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 group ${colorClass}`}
                    draggable
                    onDragStart={(e) => onDragStart(e, node.type)}
                    onClick={() => handleAddNode(node.type)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors">
                          <Icon
                            className="h-4 w-4"
                            style={{ color: iconColor }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground">
                            {node.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {node.description}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-muted/50">
        <div className="text-xs text-muted-foreground">
          <p className="mb-2">
            💡 <strong>Quick Tips:</strong>
          </p>
          <ul className="space-y-1 ml-2">
            <li>• Double-click nodes to configure them</li>
            <li>• Drag from handles to connect nodes</li>
            <li>• Use Delete key to remove nodes</li>
            <li>• Shift+click for multi-select</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Webhook, Clock, Globe, Database, MessageSquare, GitBranch, RotateCw, Settings, X, Play, Loader2 } from 'lucide-react';
import { CustomNodeData } from '@/lib/types';
import { useWorkflowStore } from '@/store/workflowStore';
import { toast } from 'sonner';
import { TestResultModal, TestResult } from '@/components/ui/test-result-modal';

const getNodeIcon = (nodeType: string) => {
  switch (nodeType) {
    case 'webhook':
      return Webhook;
    case 'schedule':
      return Clock;
    case 'api-call':
      return Globe;
    case 'database-update':
      return Database;
    case 'slack-message':
      return MessageSquare;
    case 'if-else':
      return GitBranch;
    case 'loop':
      return RotateCw;
    default:
      return Settings;
  }
};

const getNodeColor = (nodeType: string) => {
  if (['webhook', 'schedule'].includes(nodeType)) {
    return 'bg-card border-border theme-primary';
  }
  if (['api-call', 'database-update', 'slack-message'].includes(nodeType)) {
    return 'bg-card border-border theme-accent';
  }
  if (['if-else', 'loop'].includes(nodeType)) {
    return 'bg-card border-border theme-secondary';
  }
  return 'bg-card border-border text-foreground';
};

export default function CustomNode({ data, selected, id }: NodeProps<CustomNodeData>) {
  const Icon = getNodeIcon((data as CustomNodeData).nodeType);
  const colorClass = getNodeColor((data as CustomNodeData).nodeType);
  const { deleteNode, testNode } = useWorkflowStore();
  const [isHovered, setIsHovered] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showTestResult, setShowTestResult] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const handleTest = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if node is configured
    const nodeData = data as CustomNodeData;
    const hasConfig = nodeData.config && Object.keys(nodeData.config).length > 0;
    
    if (!hasConfig || !nodeData.isValid) {
      toast.error('Node not configured', {
        description: 'Please configure this node before testing',
        duration: 3000,
      });
      return;
    }

    setIsTesting(true);
    try {
      const result = await testNode(id);
      setTestResult(result as TestResult);
      setShowTestResult(true);
      
      toast.success('Node test successful!', {
        description: `${nodeData.label} executed successfully. Click to view results.`,
        duration: 4000,
        action: {
          label: "View Results",
          onClick: () => setShowTestResult(true)
        }
      });
      
      // Still log to console for developers
      console.group(`🎯 Node Test Result: ${nodeData.label}`);
      console.log('Full Result:', result);
      console.groupEnd();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Test failed';
      toast.error('Node test failed', {
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div 
      className={`
        px-4 py-3 shadow-lg rounded-xl border-2 min-w-[220px] relative backdrop-blur-sm theme-typography
        ${colorClass}
        ${selected ? 'ring-2 ring-primary shadow-xl' : ''}
        ${!(data as CustomNodeData).isValid ? 'border-destructive bg-destructive/10' : ''}
        transition-shadow duration-200 hover:shadow-xl
        cursor-grab active:cursor-grabbing
        select-none
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) => {
        // Prevent text selection while dragging
        e.preventDefault();
      }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-4 h-4 bg-background border-2 border-muted shadow-sm hover:border-primary transition-colors"
      />

      {/* Action buttons - only show on hover */}
      {isHovered && (
        <div className="absolute -top-1 -right-1 flex gap-1 z-10">
          {/* Test button */}
          <button
            onClick={handleTest}
            disabled={isTesting}
            className="w-5 h-5 bg-transparent border border-green-500 hover:bg-green-500/10 text-green-600 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110"
            title="Test node"
          >
            {isTesting ? (
              <Loader2 className="h-2.5 w-2.5 animate-spin" />
            ) : (
              <Play className="h-2.5 w-2.5" />
            )}
          </button>
          
          {/* Delete button */}
          <button
            onClick={handleDelete}
            className="w-5 h-5 bg-transparent border border-destructive hover:bg-destructive/10 text-destructive rounded-full flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110"
            title="Delete node"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </div>
      )}

      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-muted/50 shadow-sm">
          <Icon className="h-5 w-5 flex-shrink-0" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate text-foreground">{(data as CustomNodeData).label}</div>
          <div className="text-xs text-muted-foreground capitalize font-medium">
            {(data as CustomNodeData).nodeType.replace('-', ' ')}
          </div>
        </div>
      </div>

      {/* Configuration indicator */}
      {(data as CustomNodeData).config && Object.keys((data as CustomNodeData).config).length > 0 && (
        <div className="mt-2 flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs font-medium text-muted-foreground">
            {Object.keys((data as CustomNodeData).config).length} setting{Object.keys((data as CustomNodeData).config).length !== 1 ? 's' : ''} configured
          </span>
        </div>
      )}

      {/* Validation error */}
      {!(data as CustomNodeData).isValid && (
        <div className="mt-2 flex items-center gap-1">
          <div className="w-2 h-2 bg-destructive rounded-full"></div>
          <span className="text-xs text-destructive font-medium">
            Configuration required
          </span>
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-4 h-4 bg-background border-2 border-muted shadow-sm hover:border-primary transition-colors"
      />

      {/* Test Result Modal */}
      <TestResultModal
        isOpen={showTestResult}
        onClose={() => setShowTestResult(false)}
        result={testResult}
        nodeLabel={(data as CustomNodeData).label}
      />
    </div>
  );
}
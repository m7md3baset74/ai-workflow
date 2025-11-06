'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { ExecutionResult } from '@/lib/types';
import { SimpleJsonViewerCompact } from '@/components/ui/simple-json-viewer';

interface ExecutionResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: ExecutionResult[];
  workflowName?: string;
}

export default function ExecutionResultsModal({ 
  isOpen, 
  onClose, 
  results, 
  workflowName 
}: ExecutionResultsModalProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: 'default',
      error: 'destructive',
      running: 'secondary',
      warning: 'outline'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Execution Results - {workflowName || 'Workflow'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {results.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No execution results available
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {results.length} steps executed
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Status: </span>
                  {getStatusBadge(
                    results.every(r => r.status === 'success') 
                      ? 'success' 
                      : results.some(r => r.status === 'error')
                      ? 'error'
                      : 'warning'
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {results.map((result, index) => (
                  <Card key={result.nodeId} className="border-l-4 border-l-muted">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">
                          Step {index + 1}: {result.type.replace('-', ' ').toUpperCase()}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(result.status)}
                          {getStatusBadge(result.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-2">
                        {result.message}
                      </p>
                      
                      {result.data && (
                        <div className="mt-2">
                          <SimpleJsonViewerCompact 
                            data={result.data}
                            maxLines={8}
                            className="mt-1"
                            showHeader={true}
                            title="Response Data"
                          />
                        </div>
                      )}

                      {result.iterations && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Iterations: {result.iterations}
                        </div>
                      )}

                      {result.result !== undefined && (
                        <div className="mt-2">
                          <SimpleJsonViewerCompact 
                            data={result.result}
                            maxLines={3}
                            className="mt-1"
                            showHeader={true}
                            title="Result"
                          />
                        </div>
                      )}

                      <div className="mt-2 text-xs text-muted-foreground">
                        Node ID: {result.nodeId}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleJsonViewer } from "@/components/ui/simple-json-viewer";

interface TestResultData {
  url?: string;
  method?: string;
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
  responseData?: unknown;
  fullResponse?: {
    ok: boolean;
    status: number;
    statusText: string;
    url: string;
  };
}

export interface TestResult {
  success: boolean;
  message: string;
  data?: TestResultData;
  executionTime: number;
}

interface TestResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: TestResult | null;
  nodeLabel?: string;
}

export function TestResultModal({
  isOpen,
  onClose,
  result,
  nodeLabel = "Node",
}: TestResultModalProps) {
  if (!result) return null;


  const getStatusColor = (status?: number) => {
    if (!status) return "secondary";
    if (status >= 200 && status < 300) return "default";
    if (status >= 400) return "destructive";
    return "secondary";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {result.success ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            Test Result - {nodeLabel}
          </DialogTitle>
          <DialogDescription>
            {result.message} • Executed in {result.executionTime}ms
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto">
          {result.data && (
            <>
              {/* Request Info */}
              {result.data.url && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Request Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{result.data.method}</Badge>
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1">
                        {result.data.url}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(result.data?.url, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Response Status */}
              {result.data.status && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Response Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(result.data.status)}>
                        {result.data.status} {result.data.statusText}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {result.data.fullResponse?.ok ? 'Success' : 'Failed'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Response Data */}
              {result.data.responseData && (
                <SimpleJsonViewer
                  data={result.data.responseData}
                  title="Response Data"
                  maxHeight="max-h-[400px]"
                  showControls={true}
                />
              )}

              {/* Response Headers */}
              {result.data.headers && Object.keys(result.data.headers).length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Response Headers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {Object.entries(result.data.headers).map(([key, value]) => (
                        <div key={key} className="flex text-xs">
                          <span className="font-medium w-32 text-muted-foreground">
                            {key}:
                          </span>
                          <span className="flex-1 font-mono">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
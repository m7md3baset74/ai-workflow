"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, WrapText, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";

interface SimpleJsonViewerProps {
  data: unknown;
  className?: string;
  maxHeight?: string;
  showControls?: boolean;
  title?: string;
}

// Token types
type TokenType = 'string' | 'number' | 'boolean' | 'null' | 'key' | 'punctuation' | 'whitespace' | 'text';

interface Token {
  value: string;
  type: TokenType;
}

// Simple JSON tokenizer
const tokenizeJson = (json: string): Token[] => {
  const tokens: Token[] = [];
  let i = 0;

  while (i < json.length) {
    const char = json[i];

    // Handle whitespace
    if (/\s/.test(char)) {
      let whitespace = '';
      while (i < json.length && /\s/.test(json[i])) {
        whitespace += json[i];
        i++;
      }
      tokens.push({ value: whitespace, type: 'whitespace' });
      continue;
    }

    // Handle strings
    if (char === '"') {
      let string = '"';
      i++;
      while (i < json.length && json[i] !== '"') {
        if (json[i] === '\\') {
          string += json[i] + (json[i + 1] || '');
          i += 2;
        } else {
          string += json[i];
          i++;
        }
      }
      if (i < json.length) {
        string += '"';
        i++;
      }
      
      // Check if this is a key (followed by colon after whitespace)
      let nextNonSpace = i;
      while (nextNonSpace < json.length && /\s/.test(json[nextNonSpace])) {
        nextNonSpace++;
      }
      
      const isKey = nextNonSpace < json.length && json[nextNonSpace] === ':';
      tokens.push({ 
        value: string, 
        type: isKey ? 'key' : 'string' 
      });
      continue;
    }

    // Handle numbers
    if (/[-0-9]/.test(char)) {
      let number = '';
      while (i < json.length && /[-0-9.eE+]/.test(json[i])) {
        number += json[i];
        i++;
      }
      tokens.push({ value: number, type: 'number' });
      continue;
    }

    // Handle booleans and null
    if (char === 't' && json.substring(i, i + 4) === 'true') {
      tokens.push({ value: 'true', type: 'boolean' });
      i += 4;
      continue;
    }
    
    if (char === 'f' && json.substring(i, i + 5) === 'false') {
      tokens.push({ value: 'false', type: 'boolean' });
      i += 5;
      continue;
    }
    
    if (char === 'n' && json.substring(i, i + 4) === 'null') {
      tokens.push({ value: 'null', type: 'null' });
      i += 4;
      continue;
    }

    // Handle punctuation
    if (char === '{' || char === '}' || char === '[' || char === ']' || char === ',' || char === ':') {
      tokens.push({ value: char, type: 'punctuation' });
      i++;
      continue;
    }

    // Handle other characters
    tokens.push({ value: char, type: 'text' });
    i++;
  }

  return tokens;
};

// Token component
const TokenComponent: React.FC<{ token: Token }> = ({ token }) => {
  const getTokenClass = (type: TokenType): string => {
    switch (type) {
      case 'string':
        return 'text-green-600 dark:text-green-400';
      case 'number':
        return 'text-blue-600 dark:text-blue-400';
      case 'boolean':
        return 'text-purple-600 dark:text-purple-400';
      case 'null':
        return 'text-gray-500 dark:text-gray-400';
      case 'key':
        return 'text-red-600 dark:text-red-400 font-medium';
      case 'punctuation':
        return 'text-gray-700 dark:text-gray-300';
      case 'whitespace':
        return '';
      default:
        return 'text-gray-900 dark:text-gray-100';
    }
  };

  return (
    <span className={getTokenClass(token.type)}>
      {token.value}
    </span>
  );
};

// JSON highlighter component
const highlightJson = (json: string): React.ReactElement => {
  const tokens = tokenizeJson(json);
  
  return (
    <div>
      {tokens.map((token, index) => (
        <TokenComponent key={index} token={token} />
      ))}
    </div>
  );
};

export function SimpleJsonViewer({
  data,
  className = "",
  maxHeight = "max-h-96",
  showControls = true,
  title = "JSON Data",
}: SimpleJsonViewerProps) {
  const [isWrapped, setIsWrapped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedJson = React.useMemo(() => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }, [data]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson).then(() => {
      toast.success(`${title} copied to clipboard`);
    });
  };

  const toggleWrap = () => {
    setIsWrapped(!isWrapped);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`border rounded-lg bg-background ${className}`}>
      {showControls && (
        <div className="flex items-center justify-between p-3 border-b bg-muted/30">
          <span className="text-sm font-medium">{title}</span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleWrap}
              className="h-7 px-2 text-xs"
              title={isWrapped ? "Unwrap lines" : "Wrap lines"}
            >
              <WrapText
                className={`h-3 w-3 ${isWrapped ? "text-primary" : ""}`}
              />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleExpanded}
              className="h-7 px-2 text-xs"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <Minimize2 className="h-3 w-3" />
              ) : (
                <Maximize2 className="h-3 w-3" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
              className="h-7 px-2 text-xs"
              title="Copy to clipboard"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      <div
        className={`
          ${isExpanded ? "max-h-screen" : maxHeight} 
          overflow-auto
        `}
      >
        <pre
          className={`
            text-xs p-4 font-mono leading-relaxed
            ${isWrapped ? "whitespace-pre-wrap break-all" : "whitespace-pre"}
            bg-gray-50 dark:bg-gray-900/50
          `}
          style={{ tabSize: 2 }}
        >
          {highlightJson(formattedJson)}
        </pre>
      </div>

      {/* Stats footer */}
      <div className="px-3 py-2 border-t bg-muted/20 text-xs text-muted-foreground flex justify-between">
        <span>
          {formattedJson.split("\n").length} lines • {formattedJson.length}{" "}
          chars
        </span>
        <span>
          {isWrapped ? "Wrapped" : "No wrap"} •{" "}
          {isExpanded ? "Expanded" : "Collapsed"}
        </span>
      </div>
    </div>
  );
}

// Compact version for inline usage
export function SimpleJsonViewerCompact({
  data,
  className = "",
  maxLines = 10,
  showHeader = false,
  title = "Response Data",
}: {
  data: unknown;
  className?: string;
  maxLines?: number;
  showHeader?: boolean;
  title?: string;
}) {
  const [showFull, setShowFull] = useState(false);
  const [isWrapped, setIsWrapped] = useState(false);

  const formattedJson = React.useMemo(() => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }, [data]);

  const lines = formattedJson.split("\n");
  const isLong = lines.length > maxLines;
  const displayJson = showFull
    ? formattedJson
    : lines.slice(0, maxLines).join("\n");

  return (
    <div className={`border rounded-md bg-muted/30 ${className}`}>
      {showHeader && (
        <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/50">
          <span className="text-xs font-medium text-muted-foreground">
            {title}:
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsWrapped(!isWrapped)}
            className="h-6 px-2 text-xs"
            title={isWrapped ? "Unwrap lines" : "Wrap lines"}
          >
            <WrapText className={`h-3 w-3 ${isWrapped ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      )}
      <pre 
        className={`text-xs p-3 font-mono overflow-x-auto ${
          isWrapped ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'
        }`}
      >
        {highlightJson(displayJson)}
        {isLong && !showFull && (
          <div className="mt-2 pt-2 border-t border-border/50">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowFull(true)}
              className="text-xs h-6 px-2"
            >
              Show {lines.length - maxLines} more lines...
            </Button>
          </div>
        )}
      </pre>
    </div>
  );
}

export default SimpleJsonViewer;

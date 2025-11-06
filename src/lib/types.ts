import { Node, Edge } from "@xyflow/react";

// User types
export interface ExtendedUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export type NodeType = "trigger" | "action" | "condition";

export interface CustomNodeData extends Record<string, unknown> {
  label: string;
  nodeType: string;
  config: Record<string, unknown>;
  isValid?: boolean;
}

export type CustomNode = Node<CustomNodeData>;
export type CustomEdge = Edge;

export interface WorkflowData {
  id?: string;
  _id?: string;
  name: string;
  description?: string;
  nodes: CustomNode[];
  edges: CustomEdge[];
  isActive: boolean;
  lastExecuted?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NodeTypeDefinition {
  type: string;
  category: NodeType;
  label: string;
  description: string;
  icon: string;
  defaultConfig: Record<string, unknown>;
}

export interface ExecutionResult {
  nodeId: string;
  type: string;
  status: "success" | "error" | "running" | "warning";
  message: string;
  data?: unknown;
  iterations?: number;
  result?: unknown;
}

export interface WorkflowExecution {
  workflowId: string;
  startTime: Date;
  endTime?: Date;
  status: "running" | "completed" | "failed";
  results: ExecutionResult[];
}

export const NODE_TYPES: NodeTypeDefinition[] = [
  // Triggers
  {
    type: "webhook",
    category: "trigger",
    label: "Webhook",
    description: "Triggered by HTTP webhook calls",
    icon: "Webhook",
    defaultConfig: {
      url: "",
      method: "POST",
      headers: {},
      authentication: "",
    },
  },
  {
    type: "schedule",
    category: "trigger",
    label: "Schedule",
    description: "Triggered on a schedule",
    icon: "Clock",
    defaultConfig: {
      frequency: "daily",
      time: "09:00",
      cron: "0 9 * * *",
      timezone: "UTC",
      scheduleType: "simple",
    },
  },
  {
    type: "form-submit",
    category: "trigger",
    label: "Form Submit",
    description: "Triggered when a form is submitted",
    icon: "FileText",
    defaultConfig: {
      formId: "",
      fields: [],
      validation: true,
    },
  },
  {
    type: "email-received",
    category: "trigger",
    label: "Email Received",
    description: "Triggered when an email is received",
    icon: "Mail",
    defaultConfig: {
      from: "",
      subject: "",
      filters: {},
    },
  },
  {
    type: "file-upload",
    category: "trigger",
    label: "File Upload",
    description: "Triggered when a file is uploaded",
    icon: "Upload",
    defaultConfig: {
      path: "",
      fileTypes: [],
      maxSize: "10MB",
    },
  },
  // Actions
  {
    type: "api-call",
    category: "action",
    label: "API Call",
    description: "Make HTTP API calls",
    icon: "Globe",
    defaultConfig: {
      url: "",
      method: "GET",
      headers: {},
      body: "",
      timeout: 30,
      retries: 0,
    },
  },
  {
    type: "database-update",
    category: "action",
    label: "Database Update",
    description: "Update database records",
    icon: "Database",
    defaultConfig: {
      collection: "",
      operation: "update",
      query: {},
      data: {},
      upsert: false,
    },
  },
  {
    type: "send-email",
    category: "action",
    label: "Send Email",
    description: "Send email notifications",
    icon: "Mail",
    defaultConfig: {
      to: "",
      subject: "",
      body: "",
      template: "",
      provider: "sendgrid",
    },
  },
  {
    type: "slack-message",
    category: "action",
    label: "Slack Message",
    description: "Send message to Slack",
    icon: "MessageSquare",
    defaultConfig: {
      channel: "",
      message: "",
      webhook_url: "",
      username: "",
      emoji: ":robot_face:",
    },
  },
  {
    type: "discord-message",
    category: "action",
    label: "Discord Message",
    description: "Send message to Discord",
    icon: "MessageCircle",
    defaultConfig: {
      webhook_url: "",
      message: "",
      username: "",
      avatar_url: "",
    },
  },
  {
    type: "create-file",
    category: "action",
    label: "Create File",
    description: "Create or update files",
    icon: "FileText",
    defaultConfig: {
      path: "",
      content: "",
      encoding: "utf8",
      overwrite: false,
    },
  },
  {
    type: "run-script",
    category: "action",
    label: "Run Script",
    description: "Execute custom scripts",
    icon: "Code",
    defaultConfig: {
      language: "javascript",
      code: "",
      timeout: 60,
      environment: {},
    },
  },
  {
    type: "transform-data",
    category: "action",
    label: "Transform Data",
    description: "Transform and process data",
    icon: "Shuffle",
    defaultConfig: {
      operation: "map",
      fields: {},
      filters: [],
    },
  },
  // Conditions
  {
    type: "if-else",
    category: "condition",
    label: "If/Else",
    description: "Conditional branching",
    icon: "GitBranch",
    defaultConfig: {
      condition: "",
      operator: "equals",
      value: "",
      trueAction: "",
      falseAction: "",
    },
  },
  {
    type: "switch",
    category: "condition",
    label: "Switch",
    description: "Multiple conditional branches",
    icon: "Layers",
    defaultConfig: {
      expression: "",
      cases: [{ value: "", action: "" }],
      defaultAction: "",
    },
  },
  {
    type: "filter",
    category: "condition",
    label: "Filter",
    description: "Filter data based on conditions",
    icon: "Filter",
    defaultConfig: {
      field: "",
      operator: "equals",
      value: "",
      keepMatching: true,
    },
  },
  {
    type: "loop",
    category: "condition",
    label: "Loop",
    description: "Iterate over data",
    icon: "RotateCw",
    defaultConfig: {
      iterations: 1,
      dataSource: "",
      itemVariable: "item",
      indexVariable: "index",
    },
  },
  {
    type: "delay",
    category: "condition",
    label: "Delay",
    description: "Add delays between actions",
    icon: "Clock",
    defaultConfig: {
      duration: 5,
      unit: "seconds",
    },
  },
  {
    type: "parallel",
    category: "condition",
    label: "Parallel",
    description: "Execute multiple branches in parallel",
    icon: "Workflow",
    defaultConfig: {
      branches: 2,
      waitForAll: true,
      timeout: 300,
    },
  },
];

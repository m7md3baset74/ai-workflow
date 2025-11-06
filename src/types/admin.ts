import { Types } from "mongoose";

// Database document types
export interface UserDocument {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: "admin" | "user";
  phone?: string;
  company?: string;
  jobTitle?: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowDocument {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  owner: UserDocument;
  nodes: Array<{
    id: string;
    type: "trigger" | "action" | "condition";
    position: { x: number; y: number };
    data: Record<string, unknown>;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
  }>;
  isActive: boolean;
  lastExecuted?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageDocument {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType:
    | "sales"
    | "support"
    | "partnership"
    | "media"
    | "careers"
    | "other";
  status: "unread" | "read" | "responded" | "archived";
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API response types
export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: "admin" | "user";
  phone?: string;
  company?: string;
  jobTitle?: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminWorkflow {
  id: string;
  name: string;
  description?: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  nodesCount: number;
  isActive: boolean;
  lastExecuted?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType:
    | "sales"
    | "support"
    | "partnership"
    | "media"
    | "careers"
    | "other";
  status: "unread" | "read" | "responded" | "archived";
  createdAt: string;
  updatedAt: string;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Query types
export interface UsersQuery extends PaginationParams {
  search?: string;
  role?: "admin" | "user" | "all";
}

export interface WorkflowsQuery extends PaginationParams {
  search?: string;
  status?: "active" | "inactive" | "all";
}

export interface MessagesQuery extends PaginationParams {
  search?: string;
  status?: "unread" | "read" | "responded" | "archived" | "all";
  inquiryType?:
    | "sales"
    | "support"
    | "partnership"
    | "media"
    | "careers"
    | "other"
    | "all";
}

// Request body types
export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  phone?: string;
  company?: string;
  jobTitle?: string;
}

export interface UpdateMessageStatusRequest {
  status: "unread" | "read" | "responded" | "archived";
}

// Statistics types
export interface DashboardStats {
  users: {
    total: number;
    active: number;
    new: number;
  };
  workflows: {
    total: number;
    active: number;
    executed: number;
  };
  messages: {
    total: number;
    unread: number;
    recent: number;
  };
}

// MongoDB query types
export interface MongoQuery {
  $or?: Array<Record<string, { $regex: string; $options: string }>>;
  role?: string;
  status?: string;
  inquiryType?: string;
  isActive?: boolean;
  createdAt?: { $gte: Date };
  lastExecuted?: { $gte: Date };
  name?: { $regex: string; $options: string };
  [key: string]: unknown; // Allow additional properties
}

// API response wrappers
export interface AdminUsersResponse {
  users: AdminUser[];
  pagination: PaginationResponse;
}

export interface AdminWorkflowsResponse {
  workflows: AdminWorkflow[];
  pagination: PaginationResponse;
}

export interface AdminMessagesResponse {
  messages: AdminMessage[];
  pagination: PaginationResponse;
}

// Use DashboardStats directly instead of AdminStatsResponse

export interface AdminErrorResponse {
  error: string;
  code?: string;
  details?: string;
}

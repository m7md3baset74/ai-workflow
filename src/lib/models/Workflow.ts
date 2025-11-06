import mongoose, { Document, Schema } from 'mongoose';

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  position: { x: number; y: number };
  data: {
    label: string;
    nodeType: string;
    config: Record<string, unknown>;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface IWorkflow extends Document {
  name: string;
  description?: string;
  owner: mongoose.Types.ObjectId;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  isActive: boolean;
  lastExecuted?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NodeSchema = new Schema({
  id: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['trigger', 'action', 'condition'] 
  },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  data: {
    label: { type: String, required: true },
    nodeType: { type: String, required: true },
    config: { type: Schema.Types.Mixed, default: {} }
  }
});

const EdgeSchema = new Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  sourceHandle: { type: String },
  targetHandle: { type: String }
});

const WorkflowSchema = new Schema<IWorkflow>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nodes: [NodeSchema],
  edges: [EdgeSchema],
  isActive: {
    type: Boolean,
    default: false,
  },
  lastExecuted: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for better query performance
WorkflowSchema.index({ owner: 1, createdAt: -1 });

export default mongoose.models.Workflow || mongoose.model<IWorkflow>('Workflow', WorkflowSchema);
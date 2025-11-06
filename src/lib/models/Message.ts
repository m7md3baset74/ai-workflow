import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
  status: 'unread' | 'read' | 'responded' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const MessageSchema = new mongoose.Schema<IMessage>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  inquiryType: {
    type: String,
    required: [true, 'Inquiry type is required'],
    enum: {
      values: ['sales', 'support', 'partnership', 'media', 'careers', 'other'],
      message: 'Invalid inquiry type'
    }
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'responded', 'archived'],
    default: 'unread'
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for better query performance
MessageSchema.index({ email: 1 });
MessageSchema.index({ status: 1 });
MessageSchema.index({ inquiryType: 1 });
MessageSchema.index({ createdAt: -1 });

// Compound index for admin queries
MessageSchema.index({ status: 1, createdAt: -1 });

const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
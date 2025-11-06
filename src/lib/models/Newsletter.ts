import mongoose, { Document, Schema } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  subscribedAt: Date;
  isActive: boolean;
  source?: string; // Where the subscription came from (footer, popup, etc.)
}

const NewsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: "Please provide a valid email address",
    },
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  source: {
    type: String,
    default: "footer",
  },
});

// Create index for faster queries
NewsletterSchema.index({ email: 1 });
NewsletterSchema.index({ subscribedAt: -1 });

export default mongoose.models.Newsletter ||
  mongoose.model<INewsletter>("Newsletter", NewsletterSchema);

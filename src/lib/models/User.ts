import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  firstName: string;
  lastName: string;
  username: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  image?: string;
  imageUrl?: string;
  role: "admin" | "user";
  provider: string;
  providerId?: string;
  paidUser: boolean;
  subscriptionStatus:
    | "free"
    | "professional"
    | "business"
    | "enterprise"
    | "cancelled"
    | "expired";
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  planType?: "free" | "professional" | "business" | "enterprise";
  cancelledAt?: Date;
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.provider === "credentials";
      },
    },
    name: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: function (this: IUser) {
        return this.provider === "credentials";
      },
    },
    lastName: {
      type: String,
      required: function (this: IUser) {
        return this.provider === "credentials";
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    jobTitle: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    provider: {
      type: String,
      required: true,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    providerId: {
      type: String,
      required: false,
    },
    paidUser: {
      type: Boolean,
      required: true,
      default: false,
    },
    subscriptionStatus: {
      type: String,
      required: true,
      enum: [
        "free",
        "professional",
        "business",
        "enterprise",
        "cancelled",
        "expired",
      ],
      default: "free",
    },
    stripeCustomerId: {
      type: String,
      required: false,
      default: null,
    },
    subscriptionId: {
      type: String,
      required: false,
      default: null,
    },
    subscriptionStartDate: {
      type: Date,
      required: false,
    },
    subscriptionEndDate: {
      type: Date,
      required: false,
    },
    planType: {
      type: String,
      required: false,
      enum: ["free", "professional", "business", "enterprise"],
      default: "free",
    },
    cancelledAt: {
      type: Date,
      required: false,
    },
    cancellationReason: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Helper function to generate unique username
export const generateUsername = async (
  firstName: string,
  lastName: string
): Promise<string> => {
  const baseUsername =
    `${firstName.toLowerCase()}${lastName.toLowerCase()}`.replace(
      /[^a-z0-9]/g,
      ""
    );
  let username = baseUsername;
  let counter = 1;

  // Get the User model
  const UserModel =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

  // Check if username exists and append number if needed
  while (await UserModel.findOne({ username })) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  return username;
};

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);

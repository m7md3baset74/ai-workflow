import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectToDatabase from "./mongodb";
import User, { generateUsername } from "./models/User";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

/**
 * Type-safe configuration for NextAuth v4
 * This type provides better type safety than 'any' while being compatible with getServerSession
 */
export type AuthOptionsType = {
  readonly providers: readonly unknown[];
  readonly callbacks: {
    readonly signIn: (params: {
      user: AuthUser;
      account: AuthAccount | null;
    }) => Promise<boolean>;
    readonly jwt: (params: { token: JWT; user?: AuthUser }) => Promise<JWT>;
    readonly session: (params: {
      session: Session;
      token: JWT;
    }) => Promise<Session>;
  };
  readonly pages: {
    readonly signIn: string;
  };
  readonly session: {
    readonly strategy: "jwt";
  };
  readonly secret: string | undefined;
};

interface AuthUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AuthAccount {
  provider?: string;
  providerAccountId?: string;
}

export const authOptions: AuthOptionsType = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id,
            email: user.email,
            name: user.name,
            username: user?.username,
            image: user?.imageUrl,
            provider: user?.provider,
            role: user?.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn(params: { user: AuthUser; account: AuthAccount | null }) {
      const { user, account } = params;
      if (account?.provider === "google") {
        try {
          await connectToDatabase();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Extract first and last name from full name
            const nameParts = user.name?.split(" ") || ["", ""];
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";

            const newUser = await User.create({
              email: user.email,
              name: user.name,
              firstName: firstName,
              lastName: lastName,
              image: user.image,
              imageUrl: user.image, // Use OAuth image as imageUrl
              provider: "google",
              providerId: account.providerAccountId,
              // Generate username from email if name is not available
              username: await generateUsername(
                firstName || user.email?.split("@")[0] || "user",
                lastName || ""
              ),
            });
            // Update user.id with the MongoDB _id
            user.id = newUser._id.toString();
          } else {
            // Update user.id with existing user's MongoDB _id
            user.id = existingUser._id.toString();
          }
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt(params: { token: JWT; user?: AuthUser }) {
      const { token, user } = params;
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session(params: { session: Session; token: JWT }) {
      const { session, token } = params;
      if (token) {
        session.user.id = token.id as string;

        // Fetch fresh user data to check if profile is complete and subscription status
        try {
          await connectToDatabase();
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            session.user.profileComplete = !!(user.firstName && user.lastName);
            session.user.role = user.role;
            session.user.paidUser = user.paidUser || false;
            session.user.subscriptionStatus = user.subscriptionStatus || "free";
            session.user.planType = user.planType || "free";
            session.user.cancelledAt = user.cancelledAt || null;
            session.user.cancellationReason = user.cancellationReason || null;
          }
        } catch (error) {
          console.error("Session user fetch error:", error);
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
} as const;

/**
 * Type-safe wrapper for getServerSession that eliminates the need for type assertions
 * This provides a clean API for getting the user session across the application
 */
export async function getSession(): Promise<Session | null> {
  const { getServerSession } = await import("next-auth/next");
  return getServerSession(
    authOptions as Record<string, unknown>
  ) as Promise<Session | null>;
}

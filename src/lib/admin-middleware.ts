import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  await connectToDatabase();
  const user = await User.findOne({ email: session.user.email });

  if (!user || user.role !== "admin") {
    throw new Error("Admin access required");
  }

  return { session, user };
}

export async function withAdminAuth(
  handler: (
    request: NextRequest,
    context: {
      session: Awaited<ReturnType<typeof getServerSession>>;
      user: typeof User;
    }
  ) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    try {
      const { session, user } = await requireAdmin();
      return await handler(request, { session, user });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Access denied";
      return NextResponse.json(
        { error: message },
        { status: message === "Unauthorized" ? 401 : 403 }
      );
    }
  };
}

// Client-side admin check hook (to be used in components)
export function useAdminAuth() {
  return {
    requireAdmin,
  };
}

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getUserLimits } from "@/lib/user-limits";

// Disable static generation for this API route
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Using our type-safe getSession utility
    const session = await getSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const limits = await getUserLimits();

    if (!limits) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(limits);
  } catch (error) {
    console.error("Error getting user limits:", error);
    return NextResponse.json(
      { error: "Failed to get user limits" },
      { status: 500 }
    );
  }
}

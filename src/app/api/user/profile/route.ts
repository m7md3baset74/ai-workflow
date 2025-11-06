import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email }).select(
      "-password"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      firstName,
      lastName,
      phone,
      company,
      jobTitle,
      imageUrl,
      currentPassword,
      newPassword,
    } = await request.json();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { message: "First name and last name are required" },
        { status: 400 }
      );
    }

    // If password change is requested, verify current password
    if (currentPassword && newPassword) {
      const user = await User.findOne({ email: session.user.email });

      if (!user || !user.password) {
        return NextResponse.json(
          { message: "Current password verification failed" },
          { status: 400 }
        );
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isCurrentPasswordValid) {
        return NextResponse.json(
          { message: "Current password is incorrect" },
          { status: 400 }
        );
      }

      if (newPassword.length < 6) {
        return NextResponse.json(
          { message: "New password must be at least 6 characters long" },
          { status: 400 }
        );
      }
    }

    await connectToDatabase();

    interface UpdateData {
      firstName: string;
      lastName: string;
      name: string;
      phone?: string;
      company?: string;
      jobTitle?: string;
      imageUrl?: string;
      password?: string;
    }

    const updateData: UpdateData = {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim(),
    };

    if (phone !== undefined) updateData.phone = phone;
    if (company !== undefined) updateData.company = company;
    if (jobTitle !== undefined) updateData.jobTitle = jobTitle;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    // Add password update if provided
    if (currentPassword && newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 12);
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

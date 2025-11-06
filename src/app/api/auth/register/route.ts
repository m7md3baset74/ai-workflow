import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User, { generateUsername } from "@/lib/models/User";

export async function POST(request: Request) {
  try {
    const { 
      name, 
      firstName, 
      lastName, 
      email, 
      phone, 
      company, 
      jobTitle, 
      password,
      imageUrl 
    } = await request.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields: firstName, lastName, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Generate unique username
    const username = await generateUsername(firstName, lastName);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name: name || `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      username,
      email,
      phone: phone || undefined,
      company: company || undefined,
      jobTitle: jobTitle || undefined,
      imageUrl: imageUrl || undefined,
      password: hashedPassword,
      provider: "credentials",
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();
    console.log(_);

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

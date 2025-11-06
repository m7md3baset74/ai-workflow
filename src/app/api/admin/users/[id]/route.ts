import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { requireAdmin } from '@/lib/admin-middleware';
import mongoose from 'mongoose';
import type { 
  AdminUser,
  AdminErrorResponse, 
  UpdateUserRequest,
  UserDocument 
} from '@/types/admin';

interface UpdateUserResponse {
  message: string;
  user: AdminUser;
}

export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
): Promise<NextResponse<UpdateUserResponse | AdminErrorResponse>> {
  try {
    // Check admin authentication
    await requireAdmin();
    
    // Connect to database
    await connectToDatabase();

    const userId = params.id;
    
    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json() as UpdateUserRequest;
    const { firstName, lastName, email, role, phone, company, jobTitle } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['admin', 'user'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is already taken by another user
    if (email !== existingUser.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return NextResponse.json(
          { error: 'Email is already taken' },
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        role,
        phone: phone?.trim() || undefined,
        company: company?.trim() || undefined,
        jobTitle: jobTitle?.trim() || undefined,
        name: `${firstName.trim()} ${lastName.trim()}`, // Update full name
      },
      { new: true, runValidators: true }
    ).select('-password').lean<UserDocument>();

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Failed to update user' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'User updated successfully',
      user: {
        id: updatedUser._id.toString(),
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        username: updatedUser.username,
        role: updatedUser.role,
        phone: updatedUser.phone,
        company: updatedUser.company,
        jobTitle: updatedUser.jobTitle,
        provider: updatedUser.provider,
        createdAt: updatedUser.createdAt.toISOString(),
        updatedAt: updatedUser.updatedAt.toISOString(),
      },
    });

  } catch (error) {
    console.error('Admin user update error:', error);
    const message = error instanceof Error ? error.message : 'Failed to update user';
    const status = message === 'Unauthorized' ? 401 : message === 'Admin access required' ? 403 : 500;
    
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}

interface DeleteUserResponse {
  message: string;
}

export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
): Promise<NextResponse<DeleteUserResponse | AdminErrorResponse>> {
  try {
    // Check admin authentication
    const { user: currentUser } = await requireAdmin();
    
    // Connect to database
    await connectToDatabase();

    const userId = params.id;
    
    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Check if user exists
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent deleting self
    if (userToDelete._id.toString() === currentUser._id.toString()) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    // TODO: Also delete or transfer user's workflows and other associated data
    // For now, we'll just delete the user account

    return NextResponse.json({
      message: 'User deleted successfully',
    });

  } catch (error) {
    console.error('Admin user delete error:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete user';
    const status = message === 'Unauthorized' ? 401 : message === 'Admin access required' ? 403 : 500;
    
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
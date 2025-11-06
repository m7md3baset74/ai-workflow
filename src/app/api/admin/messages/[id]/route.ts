import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Message from '@/lib/models/Message';
import { requireAdmin } from '@/lib/admin-middleware';
import mongoose from 'mongoose';
import type { AdminErrorResponse } from '@/types/admin';

interface DeleteMessageResponse {
  message: string;
}

export async function DELETE(
  request: NextRequest, 
  { params }: { params: { id: string } }
): Promise<NextResponse<DeleteMessageResponse | AdminErrorResponse>> {
  try {
    // Check admin authentication
    await requireAdmin();
    
    // Connect to database
    await connectToDatabase();

    const messageId = params.id;
    
    // Validate messageId format
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return NextResponse.json(
        { error: 'Invalid message ID' },
        { status: 400 }
      );
    }

    // Check if message exists
    const message = await Message.findById(messageId);
    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    // Delete message
    await Message.findByIdAndDelete(messageId);

    return NextResponse.json({
      message: 'Message deleted successfully',
    });

  } catch (error) {
    console.error('Admin message delete error:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete message';
    const status = message === 'Unauthorized' ? 401 : message === 'Admin access required' ? 403 : 500;
    
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
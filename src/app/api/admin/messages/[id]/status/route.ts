import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Message from '@/lib/models/Message';
import { requireAdmin } from '@/lib/admin-middleware';
import mongoose from 'mongoose';
import type { 
  AdminErrorResponse, 
  UpdateMessageStatusRequest 
} from '@/types/admin';

interface UpdateMessageStatusResponse {
  message: string;
  status: string;
}

export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
): Promise<NextResponse<UpdateMessageStatusResponse | AdminErrorResponse>> {
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

    // Parse request body
    const body = await request.json() as UpdateMessageStatusRequest;
    const { status } = body;

    // Validate status
    const validStatuses = ['unread', 'read', 'responded', 'archived'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
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

    // Update message status
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { status },
      { new: true }
    );

    if (!updatedMessage) {
      return NextResponse.json(
        { error: 'Failed to update message status' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Message status updated successfully',
      status: updatedMessage.status,
    });

  } catch (error) {
    console.error('Admin message status update error:', error);
    const message = error instanceof Error ? error.message : 'Failed to update message status';
    const status = message === 'Unauthorized' ? 401 : message === 'Admin access required' ? 403 : 500;
    
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
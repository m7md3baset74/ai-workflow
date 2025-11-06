import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Workflow from '@/lib/models/Workflow';
import { requireAdmin } from '@/lib/admin-middleware';
import mongoose from 'mongoose';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check admin authentication
    await requireAdmin();
    
    // Connect to database
    await connectToDatabase();

    const workflowId = params.id;
    
    // Validate workflowId format
    if (!mongoose.Types.ObjectId.isValid(workflowId)) {
      return NextResponse.json(
        { error: 'Invalid workflow ID' },
        { status: 400 }
      );
    }

    // Check if workflow exists
    const workflow = await Workflow.findById(workflowId);
    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow not found' },
        { status: 404 }
      );
    }

    // Delete workflow
    await Workflow.findByIdAndDelete(workflowId);

    return NextResponse.json({
      message: 'Workflow deleted successfully',
    });

  } catch (error) {
    console.error('Admin workflow delete error:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete workflow';
    const status = message === 'Unauthorized' ? 401 : message === 'Admin access required' ? 403 : 500;
    
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
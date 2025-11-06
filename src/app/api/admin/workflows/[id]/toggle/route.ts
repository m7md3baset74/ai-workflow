import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Workflow from '@/lib/models/Workflow';
import { requireAdmin } from '@/lib/admin-middleware';
import mongoose from 'mongoose';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Toggle active status
    const updatedWorkflow = await Workflow.findByIdAndUpdate(
      workflowId,
      { isActive: !workflow.isActive },
      { new: true }
    ).populate('owner', 'firstName lastName email');

    if (!updatedWorkflow) {
      return NextResponse.json(
        { error: 'Failed to update workflow' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Workflow ${updatedWorkflow.isActive ? 'activated' : 'deactivated'} successfully`,
      workflow: {
        id: updatedWorkflow._id.toString(),
        name: updatedWorkflow.name,
        isActive: updatedWorkflow.isActive,
      },
    });

  } catch (error) {
    console.error('Admin workflow toggle error:', error);
    const message = error instanceof Error ? error.message : 'Failed to update workflow';
    const status = message === 'Unauthorized' ? 401 : message === 'Admin access required' ? 403 : 500;
    
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
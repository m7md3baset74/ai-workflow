import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import Workflow from '@/lib/models/Workflow';

// Types
interface WorkflowNode {
  id: string;
  data: {
    nodeType: string;
    config?: {
      url?: string;
      method?: string;
      headers?: Record<string, string>;
      body?: unknown;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface WorkflowData {
  nodes: WorkflowNode[];
  [key: string]: unknown;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { workflowId } = body;

    if (!workflowId) {
      return NextResponse.json({ error: 'Workflow ID is required' }, { status: 400 });
    }

    console.log('Attempting to connect to database...');
    await connectToDatabase();
    console.log('Database connected successfully');
    
    console.log('Finding workflow with ID:', workflowId, 'for user:', session.user.id);
    const workflow = await Workflow.findOne({
      $or: [
        { _id: workflowId, owner: session.user.id },
        { id: workflowId, owner: session.user.id }
      ]
    });

    if (!workflow) {
      console.log('Workflow not found for ID:', workflowId);
      return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
    }

    console.log('Workflow found:', workflow.name);
    console.log('Workflow nodes:', workflow.nodes?.length || 0);

    // Ensure workflow has nodes
    if (!workflow.nodes || workflow.nodes.length === 0) {
      return NextResponse.json({ 
        error: 'Workflow has no nodes to execute',
        result: [] 
      }, { status: 400 });
    }

    // Simple workflow execution simulation
    const executionResult = await executeWorkflow(workflow);

    // Update last executed timestamp
    workflow.lastExecuted = new Date();
    await workflow.save();

    console.log('Workflow executed successfully with', executionResult.length, 'results');

    return NextResponse.json({ 
      message: 'Workflow executed successfully',
      result: executionResult,
      executedNodes: executionResult.length
    });
  } catch (error) {
    console.error('Error running workflow:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function executeWorkflow(workflow: WorkflowData) {
  // Mock workflow execution
  const results = [];
  
  for (const node of workflow.nodes) {
    const result = await executeNode(node);
    results.push(result);
  }
  
  return results;
}

async function executeNode(node: WorkflowNode) {
  // Mock node execution based on type
  switch (node.data.nodeType) {
    case 'webhook':
      return { nodeId: node.id, type: 'webhook', status: 'success', message: 'Webhook trigger activated' };
    
    case 'schedule':
      return { nodeId: node.id, type: 'schedule', status: 'success', message: 'Schedule trigger activated' };
    
    case 'api-call':
      try {
        // Get URL from node configuration
        const url = node.data.config?.url || 'https://server.babyshop.reactbd.com/api/products';
        const method = node.data.config?.method || 'GET';
        const headers = node.data.config?.headers || {};
        
        console.log(`Making ${method} request to: ${url}`);
        
        const fetchOptions: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          }
        };
        
        if (method !== 'GET' && node.data.config?.body) {
          fetchOptions.body = JSON.stringify(node.data.config.body);
        }
        
        const response = await fetch(url, fetchOptions);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        console.log(`API call successful. Status: ${response.status}`);
        return { 
          nodeId: node.id, 
          type: 'api-call', 
          status: 'success', 
          message: 'API call executed successfully', 
          data 
        };
      } catch (error) {
        console.error('API call failed:', error);
        return { 
          nodeId: node.id, 
          type: 'api-call', 
          status: 'error', 
          message: `API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          data: null
        };
      }
    
    case 'database-update':
      return { nodeId: node.id, type: 'database-update', status: 'success', message: 'Database updated' };
    
    case 'slack-message':
      return { nodeId: node.id, type: 'slack-message', status: 'success', message: 'Slack message sent' };
    
    case 'if-else':
      return { nodeId: node.id, type: 'if-else', status: 'success', message: 'Condition evaluated', result: true };
    
    case 'loop':
      return { nodeId: node.id, type: 'loop', status: 'success', message: 'Loop executed', iterations: 3 };
    
    default:
      return { nodeId: node.id, type: node.data.nodeType, status: 'success', message: 'Node executed' };
  }
}
import { NextRequest, NextResponse } from 'next/server';

interface NodeTestRequest {
  nodeType: string;
  config: Record<string, unknown>;
}

interface NodeTestResult {
  success: boolean;
  message: string;
  data?: unknown;
  executionTime: number;
}

export async function POST(request: NextRequest): Promise<NextResponse<NodeTestResult | { error: string }>> {
  try {
    const body: NodeTestRequest = await request.json();
    const { nodeType, config } = body;

    if (!nodeType) {
      return NextResponse.json({ error: 'Node type is required' }, { status: 400 });
    }

    const startTime = Date.now();
    let result: NodeTestResult;

    switch (nodeType) {
      case 'api-call':
        result = await testApiCall(config);
        break;
      case 'webhook':
        result = await testWebhook(config);
        break;
      case 'slack-message':
        result = await testSlackMessage(config);
        break;
      case 'database-update':
        result = await testDatabaseUpdate(config);
        break;
      case 'schedule':
        result = testSchedule(config);
        break;
      case 'if-else':
        result = testCondition(config);
        break;
      case 'loop':
        result = testLoop(config);
        break;
      default:
        return NextResponse.json({ error: `Node type "${nodeType}" is not supported for testing` }, { status: 400 });
    }

    result.executionTime = Date.now() - startTime;
    return NextResponse.json(result);

  } catch (error) {
    console.error('Node test error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to test node' },
      { status: 500 }
    );
  }
}

async function testApiCall(config: Record<string, unknown>): Promise<NodeTestResult> {
  const { url, method = 'GET', headers = {}, body } = config;

  if (!url || typeof url !== 'string') {
    throw new Error('API URL is required');
  }

  try {
    const requestOptions: RequestInit = {
      method: method as string,
      headers: {
        'Content-Type': 'application/json',
        ...(headers as Record<string, string>),
      },
    };

    if (body && method !== 'GET') {
      requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);
    const data = await response.text();

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(data);
    } catch {
      parsedData = data;
    }

    return {
      success: response.ok,
      message: response.ok ? 
        `API call successful - ${method} ${url}` : 
        `API call failed with status ${response.status} - ${response.statusText}`,
      data: {
        url,
        method,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        responseData: parsedData, // The actual API response data
        fullResponse: {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          url: response.url,
        }
      },
      executionTime: 0,
    };
  } catch (error) {
    throw new Error(`API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function testWebhook(config: Record<string, unknown>): Promise<NodeTestResult> {
  const { url, method = 'POST' } = config;

  if (!url || typeof url !== 'string') {
    throw new Error('Webhook URL is required');
  }

  return {
    success: true,
    message: `Webhook endpoint configured for ${method} requests to ${url}`,
    data: {
      endpoint: url,
      method: method as string,
      status: 'configured',
    },
    executionTime: 0,
  };
}

async function testSlackMessage(config: Record<string, unknown>): Promise<NodeTestResult> {
  const { webhook_url, channel, message } = config;

  if (!webhook_url || typeof webhook_url !== 'string') {
    throw new Error('Slack webhook URL is required');
  }

  if (!message || typeof message !== 'string') {
    throw new Error('Message content is required');
  }

  try {
    const response = await fetch(webhook_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: channel as string,
        text: `[TEST] ${message}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Slack API responded with status ${response.status}`);
    }

    return {
      success: true,
      message: 'Test message sent to Slack successfully',
      data: {
        channel: channel as string,
        message: `[TEST] ${message}`,
      },
      executionTime: 0,
    };
  } catch (error) {
    throw new Error(`Slack message failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function testDatabaseUpdate(config: Record<string, unknown>): Promise<NodeTestResult> {
  const { collection, operation, query, data } = config;

  if (!collection || typeof collection !== 'string') {
    throw new Error('Database collection is required');
  }

  return {
    success: true,
    message: `Database ${operation || 'update'} operation configured for collection "${collection}"`,
    data: {
      collection: collection as string,
      operation: operation as string,
      query: query,
      updateData: data,
      status: 'configured',
    },
    executionTime: 0,
  };
}

function testSchedule(config: Record<string, unknown>): NodeTestResult {
  const { frequency, time, cron } = config;

  if (!frequency && !cron) {
    throw new Error('Schedule frequency or cron expression is required');
  }

  return {
    success: true,
    message: `Schedule configured: ${frequency ? `${frequency}${time ? ` at ${time}` : ''}` : `cron: ${cron}`}`,
    data: {
      frequency: frequency as string,
      time: time as string,
      cron: cron as string,
      nextRun: 'Schedule validation successful',
    },
    executionTime: 0,
  };
}

function testCondition(config: Record<string, unknown>): NodeTestResult {
  const { condition, operator, value } = config;

  if (!condition || !operator || value === undefined) {
    throw new Error('Condition, operator, and value are all required');
  }

  return {
    success: true,
    message: `Condition configured: ${condition} ${operator} ${value}`,
    data: {
      condition: condition as string,
      operator: operator as string,
      value: value,
      status: 'configured',
    },
    executionTime: 0,
  };
}

function testLoop(config: Record<string, unknown>): NodeTestResult {
  const { iterations, dataSource } = config;

  if (!iterations && !dataSource) {
    throw new Error('Either iterations count or data source is required');
  }

  return {
    success: true,
    message: `Loop configured: ${iterations ? `${iterations} iterations` : `iterate over ${dataSource}`}`,
    data: {
      iterations: iterations as number,
      dataSource: dataSource as string,
      status: 'configured',
    },
    executionTime: 0,
  };
}
import { WorkflowData } from './types';

export const sampleWorkflows: Omit<WorkflowData, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: "Daily Slack Notification",
    description: "Send a daily status update to Slack channel",
    isActive: true,
    nodes: [
      {
        id: "schedule-1",
        type: "custom",
        position: { x: 100, y: 100 },
        data: {
          label: "Daily Schedule",
          nodeType: "schedule",
          config: {
            cron: "0 9 * * *",
            timezone: "UTC"
          },
          isValid: true
        }
      },
      {
        id: "api-1",
        type: "custom",
        position: { x: 300, y: 100 },
        data: {
          label: "Fetch Analytics",
          nodeType: "api-call",
          config: {
            url: "https://api.example.com/analytics",
            method: "GET",
            headers: {
              "Authorization": "Bearer token"
            }
          },
          isValid: true
        }
      },
      {
        id: "slack-1",
        type: "custom",
        position: { x: 500, y: 100 },
        data: {
          label: "Send to Slack",
          nodeType: "slack-message",
          config: {
            webhook_url: "https://hooks.slack.com/services/...",
            channel: "#general",
            message: "Daily analytics update: {{analytics.summary}}"
          },
          isValid: true
        }
      }
    ],
    edges: [
      {
        id: "e1-2",
        source: "schedule-1",
        target: "api-1",
        type: "smoothstep",
        animated: true
      },
      {
        id: "e2-3",
        source: "api-1",
        target: "slack-1",
        type: "smoothstep",
        animated: true
      }
    ]
  },
  {
    name: "Webhook Processing Pipeline",
    description: "Process incoming webhooks with conditional logic",
    isActive: false,
    nodes: [
      {
        id: "webhook-1",
        type: "custom",
        position: { x: 100, y: 100 },
        data: {
          label: "Webhook Trigger",
          nodeType: "webhook",
          config: {
            url: "https://your-app.com/webhook",
            method: "POST"
          },
          isValid: true
        }
      },
      {
        id: "condition-1",
        type: "custom",
        position: { x: 300, y: 100 },
        data: {
          label: "Check Event Type",
          nodeType: "if-else",
          config: {
            condition: "event_type",
            operator: "equals",
            value: "user_signup"
          },
          isValid: true
        }
      },
      {
        id: "db-1",
        type: "custom",
        position: { x: 500, y: 50 },
        data: {
          label: "Update User Record",
          nodeType: "database-update",
          config: {
            collection: "users",
            operation: "update",
            query: { "id": "{{user.id}}" },
            data: { "status": "active" }
          },
          isValid: true
        }
      },
      {
        id: "slack-2",
        type: "custom",
        position: { x: 500, y: 150 },
        data: {
          label: "Notify Team",
          nodeType: "slack-message",
          config: {
            webhook_url: "https://hooks.slack.com/services/...",
            channel: "#alerts",
            message: "New user signup: {{user.email}}"
          },
          isValid: true
        }
      }
    ],
    edges: [
      {
        id: "e1-2",
        source: "webhook-1",
        target: "condition-1",
        type: "smoothstep",
        animated: true
      },
      {
        id: "e2-3",
        source: "condition-1",
        target: "db-1",
        type: "smoothstep",
        animated: true,
        sourceHandle: "true"
      },
      {
        id: "e2-4",
        source: "condition-1",
        target: "slack-2",
        type: "smoothstep",
        animated: true,
        sourceHandle: "true"
      }
    ]
  },
  {
    name: "Data Processing Loop",
    description: "Process array data with loop iteration",
    isActive: true,
    nodes: [
      {
        id: "schedule-2",
        type: "custom",
        position: { x: 100, y: 100 },
        data: {
          label: "Hourly Trigger",
          nodeType: "schedule",
          config: {
            cron: "0 * * * *",
            timezone: "UTC"
          },
          isValid: true
        }
      },
      {
        id: "api-2",
        type: "custom",
        position: { x: 300, y: 100 },
        data: {
          label: "Fetch Users",
          nodeType: "api-call",
          config: {
            url: "https://api.example.com/users",
            method: "GET"
          },
          isValid: true
        }
      },
      {
        id: "loop-1",
        type: "custom",
        position: { x: 500, y: 100 },
        data: {
          label: "Process Each User",
          nodeType: "loop",
          config: {
            dataSource: "users",
            iterations: 10
          },
          isValid: true
        }
      },
      {
        id: "api-3",
        type: "custom",
        position: { x: 700, y: 100 },
        data: {
          label: "Update User Data",
          nodeType: "api-call",
          config: {
            url: "https://api.example.com/users/{{user.id}}",
            method: "PUT",
            body: JSON.stringify({ "last_processed": "{{now}}" })
          },
          isValid: true
        }
      }
    ],
    edges: [
      {
        id: "e1-2",
        source: "schedule-2",
        target: "api-2",
        type: "smoothstep",
        animated: true
      },
      {
        id: "e2-3",
        source: "api-2",
        target: "loop-1",
        type: "smoothstep",
        animated: true
      },
      {
        id: "e3-4",
        source: "loop-1",
        target: "api-3",
        type: "smoothstep",
        animated: true
      }
    ]
  }
];

export const createSampleWorkflows = async (userId: string) => {
  try {
    const createdWorkflows = [];
    
    for (const workflow of sampleWorkflows) {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...workflow,
          owner: userId
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        createdWorkflows.push(data.workflow);
      }
    }
    
    return createdWorkflows;
  } catch (error) {
    console.error('Error creating sample workflows:', error);
    return [];
  }
};
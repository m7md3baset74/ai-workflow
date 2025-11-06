import { Metadata } from "next";
import {
  Code,
  Globe,
  Key,
  Shield,
  Zap,
  Book,
  Download,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Webhook,
  Terminal,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "API Reference - Developer Documentation | WebflowApp",
  description:
    "Complete API documentation for WebflowApp. Integrate workflows, manage automations, and build custom solutions with our REST API.",
  keywords:
    "API documentation, REST API, webhook, integration, developer, automation API",
};

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/v1/workflows",
    description: "List all workflows",
    category: "Workflows",
  },
  {
    method: "POST",
    endpoint: "/api/v1/workflows",
    description: "Create a new workflow",
    category: "Workflows",
  },
  {
    method: "GET",
    endpoint: "/api/v1/workflows/{id}",
    description: "Get workflow details",
    category: "Workflows",
  },
  {
    method: "PUT",
    endpoint: "/api/v1/workflows/{id}",
    description: "Update workflow",
    category: "Workflows",
  },
  {
    method: "DELETE",
    endpoint: "/api/v1/workflows/{id}",
    description: "Delete workflow",
    category: "Workflows",
  },
  {
    method: "POST",
    endpoint: "/api/v1/workflows/{id}/execute",
    description: "Execute workflow",
    category: "Execution",
  },
  {
    method: "GET",
    endpoint: "/api/v1/executions",
    description: "List workflow executions",
    category: "Execution",
  },
  {
    method: "GET",
    endpoint: "/api/v1/executions/{id}",
    description: "Get execution details",
    category: "Execution",
  },
];

const codeExamples = {
  curl: `curl -X GET "https://api.webflowapp.com/v1/workflows" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  javascript: `fetch('https://api.webflowapp.com/v1/workflows', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`,
  python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.webflowapp.com/v1/workflows',
    headers=headers
)

data = response.json()
print(data)`,
  node: `const axios = require('axios');

const config = {
  method: 'get',
  url: 'https://api.webflowapp.com/v1/workflows',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
};

axios(config)
  .then(response => console.log(response.data))
  .catch(error => console.log(error));`,
};

const sdks = [
  {
    name: "JavaScript SDK",
    language: "JavaScript",
    description: "Official JavaScript/TypeScript SDK for browser and Node.js",
    install: "npm install @webflowapp/sdk",
    icon: "🟨",
  },
  {
    name: "Python SDK",
    language: "Python",
    description: "Python SDK with async support and type hints",
    install: "pip install webflowapp-python",
    icon: "🐍",
  },
  {
    name: "Go SDK",
    language: "Go",
    description: "Lightweight Go SDK with full API coverage",
    install: "go get github.com/webflowapp/go-sdk",
    icon: "🔵",
  },
  {
    name: "PHP SDK",
    language: "PHP",
    description: "PHP SDK compatible with Laravel and Symfony",
    install: "composer require webflowapp/php-sdk",
    icon: "🐘",
  },
];

const webhookEvents = [
  {
    event: "workflow.created",
    description: "Triggered when a new workflow is created",
  },
  {
    event: "workflow.updated",
    description: "Triggered when a workflow is modified",
  },
  {
    event: "workflow.deleted",
    description: "Triggered when a workflow is deleted",
  },
  {
    event: "execution.started",
    description: "Triggered when a workflow execution begins",
  },
  {
    event: "execution.completed",
    description: "Triggered when a workflow execution finishes successfully",
  },
  {
    event: "execution.failed",
    description: "Triggered when a workflow execution fails",
  },
];

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 theme-gradient opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6">
            <Code className="w-4 h-4 mr-2" />
            Developer API v1.0
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 theme-gradient-text">
            API Reference
            <br />
            <span className="text-foreground">& Documentation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Build powerful integrations with our comprehensive REST API. Create,
            manage, and execute workflows programmatically with full developer
            documentation and SDKs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="theme-gradient text-white px-8 py-6 text-lg"
            >
              <Key className="w-5 h-5 mr-2" />
              Get API Key
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Download className="w-5 h-5 mr-2" />
              Download SDKs
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Start</h2>
            <p className="text-muted-foreground">
              Get up and running with the WebflowApp API in minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Authentication
                </CardTitle>
                <CardDescription>
                  All API requests require authentication using Bearer tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                </div>
                <div className="text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                  API keys are available in your dashboard settings
                </div>
                <div className="text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                  Keys can be scoped to specific permissions
                </div>
                <Button variant="outline" className="w-full">
                  Generate API Key
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Base URL
                </CardTitle>
                <CardDescription>
                  All API endpoints are relative to our base URL
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <code className="text-sm">https://api.webflowapp.com/v1</code>
                </div>
                <div className="text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                  All requests use HTTPS encryption
                </div>
                <div className="text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                  API versioning ensures backward compatibility
                </div>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View OpenAPI Spec
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Code Examples
            </h2>
            <p className="text-muted-foreground">
              See how to make your first API call
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>List Workflows</CardTitle>
              <CardDescription>
                Retrieve all workflows for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="curl" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="curl">cURL</TabsTrigger>
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="python">Python</TabsTrigger>
                  <TabsTrigger value="node">Node.js</TabsTrigger>
                </TabsList>
                {Object.entries(codeExamples).map(([key, code]) => (
                  <TabsContent key={key} value={key}>
                    <div className="relative">
                      <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{code}</code>
                      </pre>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              API Endpoints
            </h2>
            <p className="text-muted-foreground">
              Complete reference of available endpoints
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4">
              {apiEndpoints.map((endpoint, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            endpoint.method === "GET"
                              ? "default"
                              : endpoint.method === "POST"
                              ? "secondary"
                              : endpoint.method === "PUT"
                              ? "outline"
                              : "destructive"
                          }
                          className="min-w-16 justify-center"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {endpoint.description}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {endpoint.category}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Book className="w-4 h-4 mr-2" />
                        Docs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Official SDKs
            </h2>
            <p className="text-muted-foreground">
              Use our official SDKs for faster development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sdks.map((sdk, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{sdk.icon}</div>
                  <CardTitle className="text-lg">{sdk.name}</CardTitle>
                  <CardDescription>{sdk.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-3 rounded-lg mb-4">
                    <code className="text-sm">{sdk.install}</code>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Webhooks */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Webhooks</h2>
            <p className="text-muted-foreground">
              Get real-time notifications about events in your account
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Webhook className="w-5 h-5 mr-2" />
                  Available Events
                </CardTitle>
                <CardDescription>
                  Subscribe to these events to receive webhook notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {webhookEvents.map((webhook, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <code className="text-sm font-medium">
                          {webhook.event}
                        </code>
                        <p className="text-xs text-muted-foreground mt-1">
                          {webhook.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Webhook Configuration
                </CardTitle>
                <CardDescription>
                  Set up webhook endpoints in your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                  Automatic retry mechanism with exponential backoff
                </div>
                <div className="text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                  HMAC signature verification for security
                </div>
                <div className="text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                  Support for multiple endpoints per event
                </div>
                <div className="text-sm text-muted-foreground">
                  <AlertCircle className="w-4 h-4 inline mr-2 text-orange-500" />
                  30-second timeout for webhook responses
                </div>
                <Button className="w-full theme-gradient text-white">
                  Configure Webhooks
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Rate Limits</h2>
          <p className="text-muted-foreground mb-8">
            API rate limits ensure fair usage and optimal performance for all
            users
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Free Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">1,000</div>
                <div className="text-sm text-muted-foreground">
                  requests per hour
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2" />
                  Pro Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">10,000</div>
                <div className="text-sm text-muted-foreground">
                  requests per hour
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Enterprise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">Custom</div>
                <div className="text-sm text-muted-foreground">
                  contact sales
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Building Today
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get your API key and start integrating WebflowApp into your
            applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="theme-gradient text-white px-8 py-6">
              <Key className="w-5 h-5 mr-2" />
              Get API Key
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6">
              <Terminal className="w-5 h-5 mr-2" />
              Try in Console
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Free tier includes 1,000 API calls per hour • No credit card
            required
          </p>
        </div>
      </section>
    </div>
  );
}

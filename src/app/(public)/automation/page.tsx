import { Metadata } from "next";
import {
  Zap,
  Clock,
  TrendingUp,
  Workflow,
  Settings,
  Bot,
  Gauge,
  CheckCircle,
  Play,
  Users,
  Calendar,
  Mail,
  Database,
  Globe,
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

export const metadata: Metadata = {
  title: "Automation Tools - Streamline Your Business Processes | WebflowApp",
  description:
    "Discover powerful automation tools to streamline workflows, reduce manual tasks, and boost productivity. From simple triggers to complex multi-step processes.",
  keywords:
    "automation tools, workflow automation, business process automation, productivity, efficiency",
};

const automationFeatures = [
  {
    icon: Zap,
    title: "Smart Triggers",
    description:
      "Set up intelligent triggers based on time, events, or conditions to start your workflows automatically.",
    features: [
      "Time-based triggers",
      "Event-driven automation",
      "Conditional logic",
      "Multi-trigger support",
    ],
  },
  {
    icon: Bot,
    title: "AI-Powered Actions",
    description:
      "Leverage AI to make decisions, process data, and perform complex tasks within your workflows.",
    features: [
      "Natural language processing",
      "Data analysis",
      "Smart routing",
      "Predictive actions",
    ],
  },
  {
    icon: Settings,
    title: "Custom Integrations",
    description:
      "Connect with any tool or service through our flexible integration framework and API.",
    features: [
      "REST API support",
      "Webhook integrations",
      "Custom connectors",
      "Real-time sync",
    ],
  },
  {
    icon: Gauge,
    title: "Performance Monitoring",
    description:
      "Track automation performance, success rates, and identify bottlenecks in real-time.",
    features: [
      "Real-time analytics",
      "Error tracking",
      "Performance metrics",
      "Success reporting",
    ],
  },
];

const useCases = [
  {
    icon: Mail,
    title: "Email Marketing Automation",
    description:
      "Automate email campaigns, lead nurturing, and customer communications.",
    example:
      "Trigger welcome emails when users sign up, send follow-ups based on engagement.",
    time: "Save 10+ hours/week",
  },
  {
    icon: Users,
    title: "Customer Onboarding",
    description:
      "Create seamless onboarding experiences with automated task sequences.",
    example: "Auto-assign tasks, send training materials, schedule check-ins.",
    time: "Reduce onboarding time by 60%",
  },
  {
    icon: Database,
    title: "Data Processing",
    description:
      "Automatically process, validate, and transform data across systems.",
    example: "Clean incoming data, sync between databases, generate reports.",
    time: "Process data 10x faster",
  },
  {
    icon: Calendar,
    title: "Scheduling & Reminders",
    description:
      "Automate appointment scheduling, meeting coordination, and reminders.",
    example:
      "Auto-schedule meetings, send calendar invites, reminder notifications.",
    time: "Save 5+ hours/week",
  },
  {
    icon: TrendingUp,
    title: "Sales Process Automation",
    description:
      "Streamline lead qualification, follow-ups, and deal progression.",
    example:
      "Score leads automatically, trigger follow-up sequences, update CRM.",
    time: "Increase conversion by 35%",
  },
  {
    icon: Globe,
    title: "Social Media Management",
    description:
      "Automate posting, engagement tracking, and content distribution.",
    example: "Schedule posts, respond to mentions, track engagement metrics.",
    time: "Manage 5x more accounts",
  },
];

const automationStats = [
  { number: "95%", label: "Time Saved on Repetitive Tasks" },
  { number: "300+", label: "Pre-built Automation Templates" },
  { number: "99.9%", label: "Automation Reliability" },
  { number: "24/7", label: "Continuous Operation" },
];

const integrations = [
  "Slack",
  "Gmail",
  "Salesforce",
  "HubSpot",
  "Shopify",
  "Stripe",
  "Zapier",
  "Mailchimp",
  "Trello",
  "Asana",
  "Google Sheets",
  "Microsoft Teams",
  "Dropbox",
  "AWS",
  "Zoom",
  "Discord",
];

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 theme-gradient opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6">
            <Bot className="w-4 h-4 mr-2" />
            Advanced Automation Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 theme-gradient-text">
            Automate Everything,
            <br />
            <span className="text-foreground">Focus on Growth</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your business with intelligent automation tools. Eliminate
            repetitive tasks, reduce errors, and free up your team to focus on
            what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="theme-gradient text-white px-8 py-6 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Automating
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Workflow className="w-5 h-5 mr-2" />
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {automationStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold theme-gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Automation Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build, deploy, and manage sophisticated
              automation workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {automationFeatures.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 theme-gradient rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Automation Use Cases
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how businesses are using automation to save time, reduce
              costs, and improve efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="w-10 h-10 theme-gradient rounded-lg flex items-center justify-center mb-4">
                    <useCase.icon className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground italic">
                    &ldquo;{useCase.example}&rdquo;
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {useCase.time}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Connect with Your Favorite Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seamlessly integrate with 500+ popular apps and services to create
              powerful automation workflows.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-card border rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors"
              >
                {integration}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              <Globe className="w-5 h-5 mr-2" />
              View All Integrations
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Automate Your Workflows?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start with our free plan and scale as you grow. No setup fees, no
            hidden costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="theme-gradient text-white px-8 py-6">
              <Zap className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6">
              <Users className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}

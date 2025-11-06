import { Metadata } from "next";
import {
  Calendar,
  Clock,
  Users,
  Video,
  Play,
  Download,
  Star,
  Globe,
  Mic,
  MessageCircle,
  Zap,
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Bell,
  Share,
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
  title: "Live Webinars - Learn Automation from Experts | WebflowApp",
  description:
    "Join our live webinars and learn workflow automation from industry experts. Interactive sessions, Q&A, and hands-on demonstrations.",
  keywords:
    "webinars, live training, automation training, expert sessions, workflow tutorials, interactive learning",
};

const upcomingWebinars = [
  {
    id: 1,
    title: "Mastering Advanced Workflow Automation",
    description:
      "Deep dive into complex automation patterns and best practices for enterprise workflows.",
    speaker: "Sarah Chen",
    speakerRole: "Head of Product",
    speakerCompany: "WebflowApp",
    date: "2024-01-25",
    time: "2:00 PM EST",
    duration: "60 minutes",
    attendees: 1247,
    level: "Advanced",
    topics: [
      "Advanced Logic",
      "Error Handling",
      "Performance Optimization",
      "Enterprise Patterns",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "AI-Powered Automation: The Future is Here",
    description:
      "Explore how AI is revolutionizing workflow automation and what it means for your business.",
    speaker: "Dr. Michael Rodriguez",
    speakerRole: "AI Research Lead",
    speakerCompany: "TechInnovate",
    date: "2024-01-30",
    time: "1:00 PM EST",
    duration: "45 minutes",
    attendees: 892,
    level: "Intermediate",
    topics: [
      "AI Integration",
      "Machine Learning",
      "Predictive Automation",
      "Smart Workflows",
    ],
  },
  {
    id: 3,
    title: "Getting Started with Workflow Automation",
    description:
      "Perfect for beginners - learn the fundamentals and create your first automated workflow.",
    speaker: "Lisa Thompson",
    speakerRole: "Solutions Engineer",
    speakerCompany: "WebflowApp",
    date: "2024-02-02",
    time: "11:00 AM EST",
    duration: "45 minutes",
    attendees: 2156,
    level: "Beginner",
    topics: [
      "Basic Concepts",
      "First Workflow",
      "Common Use Cases",
      "Best Practices",
    ],
  },
  {
    id: 4,
    title: "Integration Masterclass: Connecting Everything",
    description:
      "Learn how to integrate various tools and services to create powerful automation ecosystems.",
    speaker: "David Kim",
    speakerRole: "Integration Specialist",
    speakerCompany: "AutomateFlow",
    date: "2024-02-08",
    time: "3:00 PM EST",
    duration: "75 minutes",
    attendees: 673,
    level: "Intermediate",
    topics: [
      "API Integration",
      "Webhooks",
      "Data Mapping",
      "Custom Connectors",
    ],
  },
];

const pastWebinars = [
  {
    id: 5,
    title: "Security Best Practices for Automation",
    description:
      "Essential security considerations when building automated workflows.",
    speaker: "Robert Chang",
    date: "2024-01-15",
    duration: "50 minutes",
    views: 3456,
    rating: 4.8,
    recordingAvailable: true,
  },
  {
    id: 6,
    title: "Scaling Automation for Enterprise",
    description:
      "Strategies for implementing automation at scale in large organizations.",
    speaker: "Emma Davis",
    date: "2024-01-10",
    duration: "65 minutes",
    views: 2891,
    rating: 4.9,
    recordingAvailable: true,
  },
  {
    id: 7,
    title: "No-Code Automation for Business Teams",
    description:
      "Empower non-technical teams to build their own automation workflows.",
    speaker: "James Wilson",
    date: "2024-01-05",
    duration: "40 minutes",
    views: 4123,
    rating: 4.7,
    recordingAvailable: true,
  },
  {
    id: 8,
    title: "Data Processing and Transformation Techniques",
    description:
      "Advanced techniques for handling and transforming data in workflows.",
    speaker: "Maria Garcia",
    date: "2024-01-01",
    duration: "55 minutes",
    views: 1987,
    rating: 4.6,
    recordingAvailable: true,
  },
];

const webinarTopics = [
  { name: "Getting Started", count: 12, icon: Play },
  { name: "Advanced Techniques", count: 8, icon: Target },
  { name: "Integrations", count: 15, icon: Globe },
  { name: "AI & Machine Learning", count: 6, icon: Zap },
  { name: "Enterprise Solutions", count: 9, icon: TrendingUp },
  { name: "Security & Compliance", count: 5, icon: CheckCircle },
];

const stats = [
  { number: "50+", label: "Webinars Hosted" },
  { number: "25,000+", label: "Total Attendees" },
  { number: "4.8", label: "Average Rating" },
  { number: "95%", label: "Satisfaction Rate" },
];

export default function WebinarsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 theme-gradient opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6">
            <Video className="w-4 h-4 mr-2" />
            Live Learning Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 theme-gradient-text">
            Expert-Led Webinars
            <br />
            <span className="text-foreground">& Live Training</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Join industry experts in live, interactive webinars. Learn advanced
            automation techniques, ask questions in real-time, and accelerate
            your workflow mastery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="theme-gradient text-white px-8 py-6 text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Browse Upcoming
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Play className="w-5 h-5 mr-2" />
              Watch Recordings
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
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

      {/* Featured Upcoming Webinar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Webinar
            </h2>
          </div>

          {upcomingWebinars
            .filter((w) => w.featured)
            .map((webinar) => (
              <Card
                key={webinar.id}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white relative">
                      <div className="text-center">
                        <Video className="w-16 h-16 mx-auto mb-4" />
                        <div className="text-lg font-semibold">
                          LIVE WEBINAR
                        </div>
                      </div>
                      <Badge className="absolute top-4 left-4 bg-red-500 text-white animate-pulse">
                        FEATURED
                      </Badge>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="default">{webinar.level}</Badge>
                      <Badge variant="outline">
                        <Users className="w-3 h-3 mr-1" />
                        {webinar.attendees} registered
                      </Badge>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                      {webinar.title}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {webinar.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-primary" />
                          <span className="font-medium">
                            {new Date(webinar.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="w-4 h-4 mr-2 text-primary" />
                          <span>
                            {webinar.time} • {webinar.duration}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Mic className="w-4 h-4 mr-2 text-primary" />
                          <span className="font-medium">{webinar.speaker}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {webinar.speakerRole} at {webinar.speakerCompany}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">
                        What You&apos;ll Learn:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {webinar.topics.map((topic, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="theme-gradient text-white flex-1">
                        <Bell className="w-4 h-4 mr-2" />
                        Register Free
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share className="w-4 h-4 mr-2" />
                        Share Webinar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Upcoming Webinars
              </h2>
              <p className="text-muted-foreground">
                Join these upcoming sessions
              </p>
            </div>
            <Button variant="outline">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingWebinars
              .filter((w) => !w.featured)
              .map((webinar) => (
                <Card
                  key={webinar.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <CardHeader className="pb-4">
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform relative">
                      <Video className="w-12 h-12" />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {webinar.duration}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="default">{webinar.level}</Badge>
                      <Badge variant="outline" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {webinar.attendees}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {webinar.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {webinar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        <span>
                          {new Date(webinar.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        <span>{webinar.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mic className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium">{webinar.speaker}</span>
                      </div>
                    </div>
                    <Button className="w-full theme-gradient text-white">
                      Register Free
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse by Topic
            </h2>
            <p className="text-muted-foreground">
              Find webinars that match your interests
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webinarTopics.map((topic, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 theme-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <topic.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {topic.name}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {topic.count} webinars
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Webinars */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Past Webinars
              </h2>
              <p className="text-muted-foreground">
                Catch up on recordings from previous sessions
              </p>
            </div>
            <Button variant="outline">
              View All Recordings
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pastWebinars.map((webinar) => (
              <Card
                key={webinar.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform relative">
                      <Play className="w-6 h-6" />
                      <div className="absolute bottom-0 right-0 bg-black/80 text-white text-xs px-1 rounded-tl">
                        {webinar.duration}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {webinar.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {webinar.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>{webinar.speaker}</span>
                          <span>
                            {new Date(webinar.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Play className="w-3 h-3 mr-1" />
                            {webinar.views}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-500" />
                            {webinar.rating}
                          </span>
                        </div>
                      </div>
                      {webinar.recordingAvailable && (
                        <div className="flex items-center space-x-2 pt-2">
                          <Button
                            size="sm"
                            className="theme-gradient text-white"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Watch Now
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss a Webinar
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Subscribe to get notified about upcoming webinars and exclusive
            content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="theme-gradient text-white px-8 py-6">
              <Bell className="w-5 h-5 mr-2" />
              Subscribe to Updates
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6">
              <MessageCircle className="w-5 h-5 mr-2" />
              Request Topic
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            All webinars are free • Expert instructors • Interactive Q&A
            sessions
          </p>
        </div>
      </section>
    </div>
  );
}

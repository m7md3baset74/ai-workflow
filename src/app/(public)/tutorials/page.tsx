import { Metadata } from "next";
import {
  Play,
  Clock,
  BookOpen,
  Search,
  Filter,
  Star,
  Eye,
  Calendar,
  ArrowRight,
  Zap,
  Workflow,
  Settings,
  Bot,
  Database,
  Globe,
  Video,
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
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Video Tutorials - Learn Workflow Automation | WebflowApp",
  description:
    "Master workflow automation with our comprehensive video tutorials. From basics to advanced techniques, learn at your own pace.",
  keywords:
    "video tutorials, workflow automation, training, guides, learning, webflow",
};

const featuredTutorials = [
  {
    id: 1,
    title: "Getting Started with WebflowApp",
    description:
      "Learn the basics of creating your first automated workflow in under 15 minutes.",
    duration: "14:32",
    level: "Beginner",
    views: "12,450",
    rating: 4.9,
    thumbnail: "🚀",
    category: "Getting Started",
  },
  {
    id: 2,
    title: "Advanced Conditional Logic",
    description:
      "Master complex branching and decision-making in your automation workflows.",
    duration: "22:18",
    level: "Advanced",
    views: "8,320",
    rating: 4.8,
    thumbnail: "🧠",
    category: "Advanced",
  },
  {
    id: 3,
    title: "API Integration Deep Dive",
    description:
      "Connect external services and APIs to supercharge your workflows.",
    duration: "18:45",
    level: "Intermediate",
    views: "9,876",
    rating: 4.7,
    thumbnail: "🔗",
    category: "Integrations",
  },
];

const tutorialCategories = [
  {
    icon: Play,
    title: "Getting Started",
    count: 12,
    description: "Perfect for beginners to learn the fundamentals",
    color: "bg-blue-500",
  },
  {
    icon: Workflow,
    title: "Workflow Building",
    count: 24,
    description: "Master the art of creating powerful workflows",
    color: "bg-green-500",
  },
  {
    icon: Globe,
    title: "Integrations",
    count: 18,
    description: "Connect with external services and APIs",
    color: "bg-purple-500",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    count: 15,
    description: "Leverage AI for smarter automation",
    color: "bg-orange-500",
  },
  {
    icon: Database,
    title: "Data Processing",
    count: 21,
    description: "Transform and manipulate data effectively",
    color: "bg-red-500",
  },
  {
    icon: Settings,
    title: "Advanced Techniques",
    count: 9,
    description: "Pro tips and advanced automation strategies",
    color: "bg-indigo-500",
  },
];

const allTutorials = [
  {
    id: 4,
    title: "Setting Up Your First Trigger",
    description:
      "Learn how to create time-based and event-based triggers for your workflows.",
    duration: "8:15",
    level: "Beginner",
    views: "15,230",
    rating: 4.9,
    category: "Getting Started",
    publishDate: "2024-01-15",
  },
  {
    id: 5,
    title: "Email Automation Workflows",
    description:
      "Build sophisticated email marketing campaigns with automated sequences.",
    duration: "25:42",
    level: "Intermediate",
    views: "11,890",
    rating: 4.8,
    category: "Workflow Building",
    publishDate: "2024-01-10",
  },
  {
    id: 6,
    title: "Slack Integration Tutorial",
    description:
      "Connect your workflows to Slack for team notifications and updates.",
    duration: "12:30",
    level: "Beginner",
    views: "7,654",
    rating: 4.6,
    category: "Integrations",
    publishDate: "2024-01-08",
  },
  {
    id: 7,
    title: "Data Transformation Techniques",
    description:
      "Clean, format, and transform data as it flows through your workflows.",
    duration: "19:28",
    level: "Intermediate",
    views: "6,543",
    rating: 4.7,
    category: "Data Processing",
    publishDate: "2024-01-05",
  },
  {
    id: 8,
    title: "AI-Powered Content Generation",
    description:
      "Use AI to generate content, summaries, and responses in your workflows.",
    duration: "16:45",
    level: "Advanced",
    views: "5,432",
    rating: 4.9,
    category: "AI & Automation",
    publishDate: "2024-01-03",
  },
  {
    id: 9,
    title: "Error Handling Best Practices",
    description:
      "Implement robust error handling and retry mechanisms in your workflows.",
    duration: "21:12",
    level: "Advanced",
    views: "4,321",
    rating: 4.8,
    category: "Advanced Techniques",
    publishDate: "2024-01-01",
  },
];

const learningPaths = [
  {
    title: "Complete Beginner Path",
    description: "Start from zero and become proficient in workflow automation",
    duration: "2-3 hours",
    lessons: 8,
    icon: "🎯",
  },
  {
    title: "Business Process Automation",
    description: "Focus on automating common business processes and workflows",
    duration: "4-5 hours",
    lessons: 12,
    icon: "💼",
  },
  {
    title: "Developer Integration Track",
    description: "Advanced techniques for developers and technical users",
    duration: "6-8 hours",
    lessons: 15,
    icon: "⚡",
  },
];

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 theme-gradient opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6">
            <Video className="w-4 h-4 mr-2" />
            Video Learning Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 theme-gradient-text">
            Learn Automation
            <br />
            <span className="text-foreground">Through Video</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Master workflow automation with our comprehensive video tutorials.
            From beginner basics to advanced techniques, learn at your own pace
            with expert instruction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tutorials..."
                className="pl-10 pr-4 py-3"
              />
            </div>
            <Button className="theme-gradient text-white px-6 py-3">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Tutorials
              </h2>
              <p className="text-muted-foreground">
                Start with these popular tutorials
              </p>
            </div>
            <Button variant="outline">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTutorials.map((tutorial) => (
              <Card
                key={tutorial.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <CardHeader className="pb-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform">
                    {tutorial.thumbnail}
                    <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {tutorial.category}
                    </Badge>
                    <Badge
                      variant={
                        tutorial.level === "Beginner"
                          ? "default"
                          : tutorial.level === "Intermediate"
                          ? "secondary"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {tutorial.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {tutorial.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {tutorial.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {tutorial.duration}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {tutorial.views}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span>{tutorial.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find tutorials organized by topic and skill level
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorialCategories.map((category, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {category.title}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {category.count} tutorials
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Structured Learning Paths
            </h2>
            <p className="text-muted-foreground">
              Follow curated sequences designed for specific goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <CardHeader>
                  <div className="text-6xl mb-4">{path.icon}</div>
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                  <CardDescription className="text-base">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{path.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Lessons:</span>
                      <span className="font-medium">{path.lessons}</span>
                    </div>
                  </div>
                  <Button className="w-full theme-gradient text-white">
                    Start Learning Path
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Tutorials */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                All Tutorials
              </h2>
              <p className="text-muted-foreground">
                Browse our complete tutorial library
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort by Date
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {allTutorials.map((tutorial) => (
              <Card
                key={tutorial.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-full md:w-32 h-20 bg-muted rounded-lg flex items-center justify-center group-hover:bg-muted/80 transition-colors relative">
                      <Play className="w-8 h-8 text-muted-foreground" />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {tutorial.duration}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {tutorial.category}
                        </Badge>
                        <Badge
                          variant={
                            tutorial.level === "Beginner"
                              ? "default"
                              : tutorial.level === "Intermediate"
                              ? "secondary"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {tutorial.level}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {tutorial.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {tutorial.views} views
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {tutorial.rating}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(tutorial.publishDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Tutorials
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Put your new knowledge to work. Create your first workflow today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="theme-gradient text-white px-8 py-6">
              <Zap className="w-5 h-5 mr-2" />
              Create Workflow
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6">
              <BookOpen className="w-5 h-5 mr-2" />
              Browse Templates
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Star,
  Clock,
  CheckCircle,
  BookOpen,
  Target,
  Shield,
  Zap,
  TrendingUp,
  MessageSquare,
  Award,
  ExternalLink,
  ThumbsUp,
  Eye,
  Filter,
} from "lucide-react";

export default function BestPractices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "workflow-design", label: "Workflow Design" },
    { value: "performance", label: "Performance" },
    { value: "security", label: "Security" },
    { value: "team-collaboration", label: "Team Collaboration" },
    { value: "error-handling", label: "Error Handling" },
    { value: "data-management", label: "Data Management" },
    { value: "integration", label: "Integration" },
    { value: "monitoring", label: "Monitoring" },
  ];

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "expert", label: "Expert" },
  ];

  const featuredGuides = [
    {
      title: "The Ultimate Workflow Design Guide",
      description:
        "Learn the principles of designing efficient, maintainable workflows that scale with your business.",
      author: "Sarah Chen, Automation Expert",
      readTime: "15 min read",
      level: "intermediate",
      category: "workflow-design",
      views: "25.3k",
      likes: "1.2k",
      isFeatured: true,
      isNew: false,
      tags: ["Design Patterns", "Best Practices", "Architecture"],
    },
    {
      title: "Security Best Practices for Workflow Automation",
      description:
        "Protect your automated workflows with these essential security practices and guidelines.",
      author: "Mike Rodriguez, Security Architect",
      readTime: "12 min read",
      level: "advanced",
      category: "security",
      views: "18.7k",
      likes: "892",
      isFeatured: true,
      isNew: false,
      tags: ["Security", "Encryption", "Access Control"],
    },
    {
      title: "Performance Optimization Strategies",
      description:
        "Optimize your workflows for speed and efficiency with these proven techniques.",
      author: "Alex Kim, Performance Engineer",
      readTime: "10 min read",
      level: "intermediate",
      category: "performance",
      views: "22.1k",
      likes: "1.1k",
      isFeatured: true,
      isNew: true,
      tags: ["Optimization", "Speed", "Efficiency"],
    },
  ];

  const practiceGuides = [
    {
      title: "Building Resilient Workflows with Error Handling",
      description:
        "Learn how to handle errors gracefully and build workflows that recover from failures.",
      author: "Emma Thompson",
      readTime: "8 min read",
      level: "intermediate",
      category: "error-handling",
      views: "15.2k",
      likes: "743",
      isFeatured: false,
      isNew: false,
      tags: ["Error Handling", "Resilience", "Recovery"],
    },
    {
      title: "Team Collaboration in Workflow Development",
      description:
        "Best practices for teams working together on complex workflow projects.",
      author: "David Park",
      readTime: "6 min read",
      level: "beginner",
      category: "team-collaboration",
      views: "12.8k",
      likes: "567",
      isFeatured: false,
      isNew: true,
      tags: ["Teamwork", "Collaboration", "Project Management"],
    },
    {
      title: "Data Management and Transformation Tips",
      description:
        "Handle data efficiently in your workflows with these data management strategies.",
      author: "Lisa Wang",
      readTime: "11 min read",
      level: "advanced",
      category: "data-management",
      views: "19.4k",
      likes: "821",
      isFeatured: false,
      isNew: false,
      tags: ["Data", "Transformation", "Processing"],
    },
    {
      title: "Integration Patterns for Complex Systems",
      description:
        "Connect multiple systems effectively using proven integration patterns.",
      author: "James Miller",
      readTime: "14 min read",
      level: "expert",
      category: "integration",
      views: "16.9k",
      likes: "678",
      isFeatured: false,
      isNew: false,
      tags: ["Integration", "API", "Systems"],
    },
    {
      title: "Monitoring and Observability for Workflows",
      description:
        "Set up comprehensive monitoring to track your workflow performance and health.",
      author: "Rachel Green",
      readTime: "9 min read",
      level: "intermediate",
      category: "monitoring",
      views: "13.5k",
      likes: "592",
      isFeatured: false,
      isNew: true,
      tags: ["Monitoring", "Observability", "Analytics"],
    },
    {
      title: "Advanced Workflow Design Patterns",
      description:
        "Master complex workflow patterns for enterprise-level automation.",
      author: "Tom Wilson",
      readTime: "18 min read",
      level: "expert",
      category: "workflow-design",
      views: "11.2k",
      likes: "445",
      isFeatured: false,
      isNew: false,
      tags: ["Design Patterns", "Architecture", "Enterprise"],
    },
  ];

  const quickTips = [
    {
      title: "Name Your Workflows Descriptively",
      description:
        "Use clear, descriptive names that explain what the workflow does.",
      icon: Target,
    },
    {
      title: "Keep Workflows Simple and Focused",
      description: "Each workflow should have a single, clear purpose.",
      icon: Zap,
    },
    {
      title: "Test with Real Data",
      description: "Always test your workflows with production-like data.",
      icon: CheckCircle,
    },
    {
      title: "Document Your Workflows",
      description:
        "Add descriptions and comments to help team members understand.",
      icon: BookOpen,
    },
    {
      title: "Monitor Performance Regularly",
      description: "Keep track of execution times and resource usage.",
      icon: TrendingUp,
    },
    {
      title: "Implement Proper Error Handling",
      description: "Plan for failures and implement graceful error recovery.",
      icon: Shield,
    },
  ];

  const allGuides = [...featuredGuides, ...practiceGuides];
  const filteredGuides = allGuides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || guide.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || guide.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "advanced":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "expert":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 px-4 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              Learn from the Experts
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold theme-gradient-text mb-6 theme-typography">
              Best Practices
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Master workflow automation with expert guides, proven strategies,
              and best practices from our community of power users.
            </p>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search guides and best practices..."
                  className="pl-12 h-14 text-lg border-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[200px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-[160px]">
                    <Star className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              Showing {filteredGuides.length} of {allGuides.length} guides
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              Featured Guides
            </h2>
            <p className="text-lg text-muted-foreground">
              Our most comprehensive and popular best practice guides
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredGuides.map((guide, index) => (
              <Card
                key={index}
                className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="theme-gradient text-white">
                      Featured
                    </Badge>
                    {guide.isNew && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        New
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:theme-primary transition-colors">
                    {guide.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {guide.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    <Badge className={`text-xs ${getLevelColor(guide.level)}`}>
                      {guide.level}
                    </Badge>
                    {guide.tags.slice(0, 2).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>By {guide.author}</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {guide.readTime}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {guide.views}
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {guide.likes}
                        </div>
                      </div>
                    </div>
                    <Button className="w-full theme-gradient text-white">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              Quick Tips
            </h2>
            <p className="text-lg text-muted-foreground">
              Essential tips every workflow builder should know
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card
                  key={index}
                  className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-full theme-gradient group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 group-hover:theme-primary transition-colors">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Guides */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              All Best Practice Guides
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive guides for mastering workflow automation
            </p>
          </div>

          {filteredGuides.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No guides found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide, index) => (
                <Card
                  key={index}
                  className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge
                        className={`text-xs ${getLevelColor(guide.level)}`}
                      >
                        {guide.level}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        {guide.isFeatured && (
                          <Badge className="text-xs theme-gradient text-white">
                            Featured
                          </Badge>
                        )}
                        {guide.isNew && (
                          <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:theme-primary transition-colors">
                      {guide.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {guide.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {guide.tags.slice(0, 3).map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-xs text-muted-foreground">
                        By {guide.author}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {guide.readTime}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {guide.views}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {guide.likes}
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        <BookOpen className="h-3 w-3 mr-2" />
                        Read Guide
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
            <Award className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4 theme-typography">
              Share Your Knowledge
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Have workflow automation tips to share? Contribute to our
              community knowledge base and help others succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/community">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Join Community
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Submit Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

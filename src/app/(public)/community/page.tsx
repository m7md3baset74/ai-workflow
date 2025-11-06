import { Metadata } from "next";
import {
  Users,
  MessageCircle,
  Star,
  Search,
  Filter,
  Trophy,
  Clock,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Code,
  Zap,
  Globe,
  Target,
  TrendingUp,
  Eye,
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
  title: "Community Forum - Connect with Automation Experts | WebflowApp",
  description:
    "Join our vibrant community of automation enthusiasts. Share knowledge, get help, and connect with experts in workflow automation.",
  keywords:
    "community forum, automation community, workflow experts, help, discussion, automation tips",
};

const communityStats = [
  { number: "15,000+", label: "Active Members", icon: Users },
  { number: "45,000+", label: "Posts & Replies", icon: MessageCircle },
  { number: "500+", label: "Solutions Shared", icon: Lightbulb },
  { number: "98%", label: "Questions Answered", icon: HelpCircle },
];

const categories = [
  {
    name: "Getting Started",
    description: "New to WebflowApp? Start here!",
    posts: 1234,
    latestActivity: "2 hours ago",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    name: "Workflow Building",
    description: "Tips and tricks for creating workflows",
    posts: 2567,
    latestActivity: "15 minutes ago",
    icon: Zap,
    color: "bg-green-500",
  },
  {
    name: "Integrations",
    description: "Connect with external services",
    posts: 987,
    latestActivity: "1 hour ago",
    icon: Globe,
    color: "bg-purple-500",
  },
  {
    name: "Troubleshooting",
    description: "Get help with technical issues",
    posts: 1876,
    latestActivity: "30 minutes ago",
    icon: HelpCircle,
    color: "bg-orange-500",
  },
  {
    name: "Feature Requests",
    description: "Suggest new features and improvements",
    posts: 543,
    latestActivity: "3 hours ago",
    icon: Target,
    color: "bg-red-500",
  },
  {
    name: "Showcase",
    description: "Share your awesome workflows",
    posts: 789,
    latestActivity: "45 minutes ago",
    icon: Trophy,
    color: "bg-yellow-500",
  },
];

const recentDiscussions = [
  {
    id: 1,
    title: "How to handle large datasets in workflows?",
    author: "Sarah M.",
    authorAvatar: "SM",
    category: "Workflow Building",
    replies: 12,
    views: 234,
    likes: 18,
    lastActivity: "2 hours ago",
    solved: true,
    pinned: false,
  },
  {
    id: 2,
    title: "Best practices for error handling in automation",
    author: "David K.",
    authorAvatar: "DK",
    category: "Getting Started",
    replies: 8,
    views: 156,
    likes: 24,
    lastActivity: "4 hours ago",
    solved: false,
    pinned: true,
  },
  {
    id: 3,
    title: "New Slack integration: Share your workflows!",
    author: "Alex T.",
    authorAvatar: "AT",
    category: "Showcase",
    replies: 15,
    views: 445,
    likes: 67,
    lastActivity: "1 hour ago",
    solved: false,
    pinned: false,
  },
  {
    id: 4,
    title: "API rate limits - need clarification",
    author: "Maria R.",
    authorAvatar: "MR",
    category: "Troubleshooting",
    replies: 6,
    views: 89,
    likes: 12,
    lastActivity: "6 hours ago",
    solved: true,
    pinned: false,
  },
  {
    id: 5,
    title: "Feature idea: Visual workflow debugger",
    author: "James W.",
    authorAvatar: "JW",
    category: "Feature Requests",
    replies: 23,
    views: 567,
    likes: 89,
    lastActivity: "3 hours ago",
    solved: false,
    pinned: false,
  },
];

const topContributors = [
  {
    name: "Emily Chen",
    avatar: "EC",
    role: "Community Expert",
    posts: 1234,
    solutions: 456,
    reputation: 9876,
    badge: "🏆",
  },
  {
    name: "Michael Rodriguez",
    avatar: "MR",
    role: "Automation Specialist",
    posts: 987,
    solutions: 234,
    reputation: 7654,
    badge: "🥈",
  },
  {
    name: "Lisa Thompson",
    avatar: "LT",
    role: "Integration Expert",
    posts: 765,
    solutions: 189,
    reputation: 6543,
    badge: "🥉",
  },
  {
    name: "David Kim",
    avatar: "DK",
    role: "Workflow Guru",
    posts: 654,
    solutions: 156,
    reputation: 5432,
    badge: "⭐",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 theme-gradient opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6">
            <Users className="w-4 h-4 mr-2" />
            Community Forum
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 theme-gradient-text">
            Connect & Learn
            <br />
            <span className="text-foreground">Together</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Join thousands of automation enthusiasts sharing knowledge, solving
            problems, and building amazing workflows together. Get help, share
            ideas, and grow your skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search discussions..."
                className="pl-10 pr-4 py-3"
              />
            </div>
            <Button className="theme-gradient text-white px-6 py-3">
              <MessageSquare className="w-4 h-4 mr-2" />
              Start Discussion
            </Button>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 theme-gradient rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
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

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discussion Categories
            </h2>
            <p className="text-muted-foreground">
              Find the right place for your questions and discussions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
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
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {category.posts} posts
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    Latest: {category.latestActivity}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Discussions */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Recent Discussions</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {recentDiscussions.map((discussion) => (
                  <Card
                    key={discussion.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                          {discussion.authorAvatar}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {discussion.pinned && (
                              <Badge variant="destructive" className="text-xs">
                                📌 Pinned
                              </Badge>
                            )}
                            {discussion.solved && (
                              <Badge
                                variant="default"
                                className="text-xs bg-green-500"
                              >
                                ✅ Solved
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {discussion.category}
                            </Badge>
                          </div>

                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {discussion.title}
                          </h3>

                          <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-3">
                            <span>by {discussion.author}</span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {discussion.replies} replies
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {discussion.views} views
                            </span>
                            <span className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {discussion.likes} likes
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 inline mr-1" />
                              Last activity: {discussion.lastActivity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="group-hover:text-primary"
                            >
                              View Discussion
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Discussions
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Top Contributors */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Top Contributors
                  </CardTitle>
                  <CardDescription>
                    Our most helpful community members
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topContributors.map((contributor, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                            {contributor.avatar}
                          </div>
                          <div className="absolute -top-1 -right-1 text-lg">
                            {contributor.badge}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">
                            {contributor.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {contributor.role}
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                            <span>{contributor.solutions} solutions</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              {contributor.reputation.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Guidelines */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Community Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Be respectful and helpful</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Search before posting</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Use clear, descriptive titles</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="text-green-500">✓</span>
                      <span>Share code examples when relevant</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Read Full Guidelines
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-lg theme-gradient text-white">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="secondary" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start New Discussion
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Ask a Question
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Trophy className="w-4 h-4 mr-2" />
                    Share Your Workflow
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Code className="w-4 h-4 mr-2" />
                    Report a Bug
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with automation experts, share your knowledge, and grow
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="theme-gradient text-white px-8 py-6">
              <Users className="w-5 h-5 mr-2" />
              Join Community
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6">
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Discussion
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Free to join • 15,000+ active members • Expert moderation
          </p>
        </div>
      </section>
    </div>
  );
}

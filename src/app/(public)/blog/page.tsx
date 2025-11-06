import { Metadata } from "next";
import {
  Calendar,
  Clock,
  Tag,
  Search,
  Filter,
  TrendingUp,
  ArrowRight,
  BookOpen,
  MessageCircle,
  Heart,
  Eye,
  Zap,
  Users,
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
  title: "Blog & Updates - Workflow Automation Insights | WebflowApp",
  description:
    "Stay updated with the latest in workflow automation, product updates, best practices, and industry insights from WebflowApp.",
  keywords:
    "workflow automation blog, automation insights, product updates, best practices, WebflowApp news",
};

const featuredPost = {
  id: 1,
  title: "The Future of Workflow Automation: AI-Powered Decision Making",
  excerpt:
    "Discover how artificial intelligence is revolutionizing workflow automation and what it means for businesses in 2024.",
  author: "Sarah Chen",
  authorRole: "Head of Product",
  publishDate: "2024-01-15",
  readTime: "8 min read",
  category: "AI & Automation",
  tags: ["AI", "Future", "Automation", "Innovation"],
  views: "2.4k",
  likes: 156,
  comments: 23,
  featured: true,
};

const blogPosts = [
  {
    id: 2,
    title: "10 Workflow Automation Mistakes to Avoid in 2024",
    excerpt:
      "Learn from common pitfalls and ensure your automation projects deliver maximum value.",
    author: "David Kim",
    authorRole: "Solutions Engineer",
    publishDate: "2024-01-12",
    readTime: "6 min read",
    category: "Best Practices",
    tags: ["Tips", "Common Mistakes", "Optimization"],
    views: "1.8k",
    likes: 89,
    comments: 15,
  },
  {
    id: 3,
    title: "Case Study: How TechCorp Reduced Manual Work by 80%",
    excerpt:
      "A deep dive into how a growing company transformed their operations with workflow automation.",
    author: "Maria Rodriguez",
    authorRole: "Customer Success",
    publishDate: "2024-01-10",
    readTime: "12 min read",
    category: "Case Studies",
    tags: ["Success Story", "ROI", "Enterprise"],
    views: "3.1k",
    likes: 203,
    comments: 45,
  },
  {
    id: 4,
    title: "New Integration: Slack Workflows Now Available",
    excerpt:
      "Seamlessly connect your team communication with automated workflows in Slack.",
    author: "Alex Thompson",
    authorRole: "Product Manager",
    publishDate: "2024-01-08",
    readTime: "4 min read",
    category: "Product Updates",
    tags: ["Integration", "Slack", "New Feature"],
    views: "1.2k",
    likes: 67,
    comments: 12,
  },
  {
    id: 5,
    title: "Building Scalable Automation: Architecture Best Practices",
    excerpt:
      "Design patterns and strategies for creating robust, scalable automation workflows.",
    author: "James Wilson",
    authorRole: "Senior Engineer",
    publishDate: "2024-01-05",
    readTime: "15 min read",
    category: "Technical",
    tags: ["Architecture", "Scalability", "Performance"],
    views: "892",
    likes: 134,
    comments: 28,
  },
  {
    id: 6,
    title: "Customer Spotlight: How Non-Profits Use Automation",
    excerpt:
      "Exploring how charitable organizations leverage automation to maximize impact.",
    author: "Emma Davis",
    authorRole: "Content Lead",
    publishDate: "2024-01-03",
    readTime: "7 min read",
    category: "Customer Stories",
    tags: ["Non-Profit", "Social Impact", "Efficiency"],
    views: "654",
    likes: 45,
    comments: 8,
  },
  {
    id: 7,
    title: "Security in Automation: Protecting Your Workflows",
    excerpt:
      "Essential security practices for keeping your automated processes safe and compliant.",
    author: "Robert Chang",
    authorRole: "Security Lead",
    publishDate: "2024-01-01",
    readTime: "10 min read",
    category: "Security",
    tags: ["Security", "Compliance", "Best Practices"],
    views: "1.1k",
    likes: 78,
    comments: 19,
  },
];

const categories = [
  { name: "All Posts", count: 47, active: true },
  { name: "Product Updates", count: 12 },
  { name: "Best Practices", count: 15 },
  { name: "Case Studies", count: 8 },
  { name: "Technical", count: 7 },
  { name: "AI & Automation", count: 5 },
];

const popularTags = [
  "Automation",
  "AI",
  "Integration",
  "Best Practices",
  "Case Study",
  "Security",
  "Performance",
  "Tips",
  "New Feature",
  "Tutorial",
];

const stats = [
  { number: "50+", label: "Articles Published" },
  { number: "25k+", label: "Monthly Readers" },
  { number: "4.8", label: "Average Rating" },
  { number: "Weekly", label: "Publishing Schedule" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 theme-gradient opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Blog & Updates
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 theme-gradient-text">
            Automation Insights
            <br />
            <span className="text-foreground">& Latest Updates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Stay ahead with the latest trends in workflow automation, product
            updates, best practices, and insights from industry experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
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

      {/* Featured Post */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Article
            </h2>
          </div>

          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl">
                  🤖
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="theme-gradient text-white">Featured</Badge>
                  <Badge variant="outline">{featuredPost.category}</Badge>
                  {featuredPost.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {featuredPost.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {featuredPost.author}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {featuredPost.authorRole}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {new Date(featuredPost.publishDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Button className="theme-gradient text-white">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="flex items-center space-x-6 mt-4 pt-4 border-t">
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {featuredPost.views} views
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {featuredPost.likes} likes
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {featuredPost.comments} comments
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Blog Posts */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <Button variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Most Popular
                </Button>
              </div>

              <div className="space-y-6">
                {blogPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4">
                          <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl">
                            {post.category === "Product Updates"
                              ? "🚀"
                              : post.category === "Best Practices"
                              ? "💡"
                              : post.category === "Case Studies"
                              ? "📊"
                              : post.category === "Technical"
                              ? "⚙️"
                              : post.category === "Customer Stories"
                              ? "👥"
                              : "🔒"}
                          </div>
                        </div>
                        <div className="md:w-3/4 space-y-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{post.category}</Badge>
                            {post.tags.slice(0, 2).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                                  {post.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <span>{post.author}</span>
                              </div>
                              <span>
                                <Calendar className="w-4 h-4 inline mr-1" />
                                {new Date(
                                  post.publishDate
                                ).toLocaleDateString()}
                              </span>
                              <span>
                                <Clock className="w-4 h-4 inline mr-1" />
                                {post.readTime}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {post.views}
                              </span>
                              <span className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                {post.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {/* Categories */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                          category.active
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                        <Badge
                          variant={category.active ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="border-0 shadow-lg theme-gradient text-white">
                <CardHeader>
                  <CardTitle className="text-white">Stay Updated</CardTitle>
                  <CardDescription className="text-white/80">
                    Get the latest articles delivered to your inbox
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                    <Button variant="secondary" className="w-full">
                      Subscribe
                    </Button>
                  </form>
                  <p className="text-xs text-white/60 mt-3">
                    Weekly digest • No spam • Unsubscribe anytime
                  </p>
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
            Ready to Start Automating?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Turn insights into action. Start building your workflows today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="theme-gradient text-white px-8 py-6">
              <Zap className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6">
              <Users className="w-5 h-5 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

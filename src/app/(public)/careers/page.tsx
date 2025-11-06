import { Metadata } from "next";
import {
  Users,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  Heart,
  Coffee,
  Zap,
  Globe,
  Award,
  Target,
  TrendingUp,
  BookOpen,
  Briefcase,
  Home,
  Calendar,
  Laptop,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Careers - Join Our Team | WebflowApp",
  description:
    "Join our mission to revolutionize workflow automation. Explore open positions, learn about our culture, and grow your career with us.",
  keywords:
    "careers, jobs, employment, workflow automation jobs, software engineer, product manager, remote work",
};

const openPositions = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    description:
      "Build scalable automation infrastructure and develop new workflow features.",
    requirements: [
      "5+ years experience",
      "Node.js/React",
      "Distributed systems",
      "API design",
    ],
    posted: "2 days ago",
    urgent: false,
  },
  {
    id: 2,
    title: "Product Manager - Integrations",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140k - $180k",
    description:
      "Drive the strategy and roadmap for our integration platform and partnerships.",
    requirements: [
      "3+ years PM experience",
      "Technical background",
      "B2B SaaS",
      "Integration platforms",
    ],
    posted: "1 week ago",
    urgent: true,
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $120k",
    description:
      "Create intuitive user experiences for complex workflow automation tools.",
    requirements: [
      "4+ years UX design",
      "Figma expert",
      "Design systems",
      "B2B products",
    ],
    posted: "3 days ago",
    urgent: false,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $145k",
    description:
      "Scale our infrastructure to handle millions of workflow executions.",
    requirements: ["Kubernetes", "AWS/GCP", "CI/CD", "Monitoring", "Security"],
    posted: "5 days ago",
    urgent: false,
  },
  {
    id: 5,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "New York, NY",
    type: "Full-time",
    salary: "$80k - $100k",
    description:
      "Help enterprise customers maximize value from workflow automation.",
    requirements: [
      "2+ years CS experience",
      "B2B SaaS",
      "Enterprise clients",
      "Technical aptitude",
    ],
    posted: "1 week ago",
    urgent: false,
  },
  {
    id: 6,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    salary: "$85k - $110k",
    description:
      "Drive growth through content marketing, demand generation, and partnerships.",
    requirements: [
      "3+ years marketing",
      "Content creation",
      "Analytics",
      "B2B tech",
    ],
    posted: "4 days ago",
    urgent: false,
  },
];

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description:
      "Comprehensive health, dental, and vision insurance for you and your family",
  },
  {
    icon: Home,
    title: "Remote-First Culture",
    description:
      "Work from anywhere with flexible hours and home office stipend",
  },
  {
    icon: Calendar,
    title: "Unlimited PTO",
    description:
      "Take the time you need to recharge with our unlimited vacation policy",
  },
  {
    icon: BookOpen,
    title: "Learning & Development",
    description:
      "$2,000 annual budget for conferences, courses, and professional growth",
  },
  {
    icon: Coffee,
    title: "Team Events",
    description:
      "Regular team retreats, virtual coffee chats, and social events",
  },
  {
    icon: Award,
    title: "Equity & Bonuses",
    description: "Competitive equity package and performance-based bonuses",
  },
  {
    icon: Laptop,
    title: "Equipment",
    description:
      "Top-tier MacBook, monitor, and any tools you need to do your best work",
  },
  {
    icon: Target,
    title: "401(k) Matching",
    description: "6% company match on retirement contributions",
  },
];

const values = [
  {
    icon: Users,
    title: "Customer Obsession",
    description:
      "We start with the customer and work backwards to build solutions that truly matter.",
  },
  {
    icon: Zap,
    title: "Move Fast",
    description:
      "We ship early, iterate quickly, and learn from our users to build better products.",
  },
  {
    icon: Globe,
    title: "Think Global",
    description:
      "We build for a diverse, global audience with inclusive and accessible design.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description:
      "We invest in our people and encourage everyone to learn, grow, and take on new challenges.",
  },
];

const stats = [
  { number: "50+", label: "Team Members" },
  { number: "15", label: "Countries" },
  { number: "4.9/5", label: "Glassdoor Rating" },
  { number: "95%", label: "Employee Satisfaction" },
];

const departments = [
  { name: "Engineering", openings: 8, icon: Laptop },
  { name: "Product", openings: 3, icon: Target },
  { name: "Design", openings: 2, icon: Heart },
  { name: "Marketing", openings: 4, icon: TrendingUp },
  { name: "Sales", openings: 5, icon: Briefcase },
  { name: "Customer Success", openings: 3, icon: Users },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 theme-gradient opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6">
            <Users className="w-4 h-4 mr-2" />
            We&apos;re Hiring
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 theme-gradient-text">
            Join Our Mission
            <br />
            <span className="text-foreground">Shape the Future</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Help us revolutionize how the world works by building the next
            generation of workflow automation tools. Join a team of passionate
            builders creating solutions that empower businesses to achieve more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="theme-gradient text-white px-8 py-6 text-lg"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              View Open Positions
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Heart className="w-5 h-5 mr-2" />
              Learn Our Culture
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

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 theme-gradient rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Work With Us
            </h2>
            <p className="text-muted-foreground">
              Comprehensive benefits and perks for our team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 theme-gradient rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Open Positions by Department
            </h2>
            <p className="text-muted-foreground">
              Find opportunities across our organization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 theme-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <dept.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {dept.name}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {dept.openings} open position
                        {dept.openings !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Current Openings
            </h2>
            <p className="text-muted-foreground">
              Ready to make an impact? Apply today!
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position) => (
              <Card
                key={position.id}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {position.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            🔥 Urgent
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {position.department}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {position.type}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold mb-2">
                        {position.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {position.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                            <span>{position.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <DollarSign className="w-4 h-4 mr-2 text-primary" />
                            <span>{position.salary}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-primary" />
                            <span>Posted {position.posted}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Briefcase className="w-4 h-4 mr-2 text-primary" />
                            <span>{position.type}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm">
                          Key Requirements:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {position.requirements.map((req, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-48 flex flex-col gap-2">
                      <Button className="theme-gradient text-white w-full">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don&apos;t see a role that fits? We&apos;re always looking for
              exceptional talent.
            </p>
            <Button variant="outline" size="lg">
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Be part of a team that&apos;s transforming how the world works
            through automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="theme-gradient text-white px-8 py-6">
              <Briefcase className="w-5 h-5 mr-2" />
              View All Positions
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6">
              <Users className="w-5 h-5 mr-2" />
              Meet the Team
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Equal opportunity employer • Remote-first culture • Competitive
            benefits
          </p>
        </div>
      </section>
    </div>
  );
}

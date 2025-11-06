"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Award,
  Globe,
  Heart,
  ArrowRight,
  Linkedin,
  Twitter,
  Mail,
  CheckCircle,
  Shield,
  Zap,
  Building,
} from "lucide-react";

export default function About() {
  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Workflows Created", value: "2M+", icon: Target },
    { label: "Countries", value: "120+", icon: Globe },
    { label: "Uptime", value: "99.9%", icon: Award },
  ];

  const values = [
    {
      title: "Innovation First",
      description:
        "We're constantly pushing the boundaries of what's possible in workflow automation.",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Customer Success",
      description:
        "Your success is our success. We're committed to helping you achieve your automation goals.",
      icon: Target,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Transparency",
      description:
        "We believe in open communication, fair pricing, and honest relationships.",
      icon: Shield,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Quality Excellence",
      description:
        "We maintain the highest standards in everything we build and deliver.",
      icon: Award,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-founder",
      bio: "Former VP of Engineering at TechCorp with 15+ years in automation platforms.",
      image: "/api/placeholder/150/150",
      social: {
        linkedin: "https://linkedin.com/in/sarah-johnson",
        twitter: "https://twitter.com/sarahj_tech",
      },
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-founder",
      bio: "Ex-Google senior engineer, passionate about building scalable automation infrastructure.",
      image: "/api/placeholder/150/150",
      social: {
        linkedin: "https://linkedin.com/in/michael-chen",
        twitter: "https://twitter.com/mchen_dev",
      },
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      bio: "Product leader with a background in UX design and enterprise software.",
      image: "/api/placeholder/150/150",
      social: {
        linkedin: "https://linkedin.com/in/emily-rodriguez",
        twitter: "https://twitter.com/emily_product",
      },
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      bio: "Full-stack engineer with expertise in distributed systems and API design.",
      image: "/api/placeholder/150/150",
      social: {
        linkedin: "https://linkedin.com/in/david-kim",
        twitter: "https://twitter.com/dkim_eng",
      },
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to democratize workflow automation",
    },
    {
      year: "2021",
      title: "First 1,000 Users",
      description:
        "Reached our first milestone with early adopters and beta testers",
    },
    {
      year: "2022",
      title: "Series A Funding",
      description:
        "Raised $10M to accelerate product development and team growth",
    },
    {
      year: "2023",
      title: "Enterprise Launch",
      description: "Launched enterprise features and SOC 2 compliance",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded to serve customers in 120+ countries worldwide",
    },
  ];

  return (
    <div className="min-h-screen gradient-bg-enhanced public-page">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 px-4 py-1 text-sm badge-enhanced">
              Our Story
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold theme-gradient-text mb-6 theme-typography">
              About WebflowApp
            </h1>
            <p className="text-xl sm:text-2xl text-enhanced-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              We&apos;re on a mission to make powerful workflow automation
              accessible to everyone. From small teams to enterprise
              organizations, we&apos;re building the future of work.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto p-4 rounded-full theme-gradient mb-4 w-fit">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold theme-gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-enhanced-subtle">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-enhanced mb-6 theme-typography">
                Our Mission
              </h2>
              <p className="text-lg text-enhanced-muted mb-6 leading-relaxed">
                We believe that everyone deserves access to powerful automation
                tools, not just large enterprises with unlimited budgets. Our
                mission is to democratize workflow automation by making it
                intuitive, affordable, and accessible to teams of all sizes.
              </p>
              <p className="text-lg text-enhanced-muted mb-8 leading-relaxed">
                Since our founding in 2020, we&apos;ve been committed to
                building a platform that empowers people to focus on what
                matters most by automating the repetitive tasks that slow them
                down.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    Empower teams with no-code automation
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    Make enterprise features accessible to all
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-lg">
                    Foster innovation through automation
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  &quot;A world where every team has the power to automate their
                  work, unleashing human creativity and innovation by
                  eliminating manual, repetitive tasks.&quot;
                </p>
                <div className="mt-6 flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full theme-gradient flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Built with passion</div>
                    <div className="text-sm text-muted-foreground">
                      By automation enthusiasts, for automation enthusiasts
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 theme-typography">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`mx-auto p-4 rounded-full bg-gradient-to-r ${value.color} mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 theme-typography">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The people building the future of workflow automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full theme-gradient p-1 mb-4">
                    <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-10 w-10 text-muted-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {member.bio}
                  </p>
                  <div className="flex justify-center space-x-2">
                    <Button size="sm" variant="outline" className="p-2" asChild>
                      <Link href={member.social.linkedin} target="_blank">
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="p-2" asChild>
                      <Link href={member.social.twitter} target="_blank">
                        <Twitter className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 theme-typography">
              Our Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Key milestones in our mission to revolutionize workflow automation
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-accent"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <Card className="border shadow-lg bg-card/50 backdrop-blur">
                      <CardContent className="p-6">
                        <Badge className="mb-3 theme-gradient text-white">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 rounded-full theme-gradient border-4 border-background z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
            <Building className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4 theme-typography">
              Join Our Mission
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Ready to be part of the automation revolution? Start building
              powerful workflows today and join thousands of teams already
              transforming their work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Link href="/auth/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

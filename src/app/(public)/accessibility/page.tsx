"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Ear,
  Hand,
  Brain,
  Monitor,
  Keyboard,
  Settings,
  CheckCircle,
  Star,
  Users,
  Mail,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function Accessibility() {
  const accessibilityFeatures = [
    {
      title: "Visual Accessibility",
      description:
        "Designed for users with visual impairments and varying visual abilities.",
      icon: Eye,
      features: [
        "High contrast mode",
        "Customizable font sizes",
        "Screen reader compatibility",
        "Color-blind friendly design",
        "Focus indicators",
        "Alt text for all images",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Motor Accessibility",
      description:
        "Accessible to users with limited mobility and motor impairments.",
      icon: Hand,
      features: [
        "Full keyboard navigation",
        "Large clickable areas",
        "Drag and drop alternatives",
        "Voice control support",
        "Switch navigation",
        "Customizable shortcuts",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      title: "Cognitive Accessibility",
      description:
        "Simple, clear interfaces that are easy to understand and navigate.",
      icon: Brain,
      features: [
        "Clear, simple language",
        "Consistent navigation",
        "Progress indicators",
        "Error prevention",
        "Timeout extensions",
        "Help documentation",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Auditory Accessibility",
      description: "Accessible to users who are deaf or hard of hearing.",
      icon: Ear,
      features: [
        "Visual notifications",
        "Closed captions",
        "Text alternatives",
        "No audio-only content",
        "Visual alerts",
        "Sign language support",
      ],
      color: "from-orange-500 to-orange-600",
    },
  ];

  const wcagCompliance = [
    {
      level: "WCAG 2.1 Level AA",
      status: "Compliant",
      description:
        "Meets international accessibility standards for web content",
      criteria: [
        "Perceivable content",
        "Operable interface",
        "Understandable information",
        "Robust implementation",
      ],
    },
  ];

  const assistiveTech = [
    {
      name: "Screen Readers",
      support: "Full Support",
      technologies: ["NVDA", "JAWS", "VoiceOver", "TalkBack"],
      icon: Monitor,
    },
    {
      name: "Keyboard Navigation",
      support: "Full Support",
      technologies: ["Tab navigation", "Arrow keys", "Enter/Space", "Escape"],
      icon: Keyboard,
    },
    {
      name: "Voice Control",
      support: "Supported",
      technologies: ["Dragon", "Voice Control", "Voice Access"],
      icon: Ear,
    },
    {
      name: "Switch Navigation",
      support: "Supported",
      technologies: ["Switch Control", "Head tracking", "Eye tracking"],
      icon: Settings,
    },
  ];

  const accessibilitySettings = [
    {
      setting: "High Contrast Mode",
      description: "Increases contrast for better visibility",
      available: true,
    },
    {
      setting: "Large Text Mode",
      description: "Increases font size throughout the application",
      available: true,
    },
    {
      setting: "Reduced Motion",
      description: "Minimizes animations and transitions",
      available: true,
    },
    {
      setting: "Focus Indicators",
      description: "Enhanced visual focus indicators",
      available: true,
    },
    {
      setting: "Color Customization",
      description: "Customize colors for better visibility",
      available: true,
    },
    {
      setting: "Keyboard Shortcuts",
      description: "Customizable keyboard shortcuts",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 font-medium">
              Inclusive Design
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="theme-gradient-text">Accessibility</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              We believe everyone should have equal access to powerful workflow
              automation. Our platform is designed to be accessible to users of
              all abilities.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>WCAG 2.1 AA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-blue-500" />
                <span>Screen Reader Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <Keyboard className="h-4 w-4 text-purple-500" />
                <span>Keyboard Accessible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Accessibility Features
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {accessibilityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-3 text-xl text-card-foreground">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}/10 border border-primary/20`}
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span>{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-card-foreground/90 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-card-foreground/80">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* WCAG Compliance */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Standards Compliance
          </h2>
          {wcagCompliance.map((compliance, index) => (
            <Card
              key={index}
              className="border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-4 rounded-full bg-gradient-to-r from-green-500 to-blue-600">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">
                    {compliance.level}
                  </h3>
                  <Badge className="mb-4 px-3 py-1 bg-green-100 text-green-800 border-green-200">
                    {compliance.status}
                  </Badge>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {compliance.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {compliance.criteria.map((criterion, idx) => (
                    <div key={idx} className="text-center">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 mb-3">
                        <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
                      </div>
                      <span className="text-sm font-medium text-card-foreground">
                        {criterion}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Assistive Technology Support */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Assistive Technology Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assistiveTech.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card
                  key={index}
                  className="border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm text-center"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">
                      {tech.name}
                    </h3>
                    <Badge className="mb-4 px-2 py-1 bg-green-100 text-green-800 border-green-200 text-xs">
                      {tech.support}
                    </Badge>
                    <div className="space-y-1">
                      {tech.technologies.map((technology, idx) => (
                        <div
                          key={idx}
                          className="text-xs text-muted-foreground"
                        >
                          {technology}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accessibility Settings */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Customization Options
          </h2>
          <Card className="border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-card-foreground text-center">
                Personalize Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accessibilitySettings.map((setting, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-card-foreground mb-1">
                        {setting.setting}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Customize Accessibility Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Feedback and Support */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border border-border/50 shadow-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Accessibility Feedback
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We&apos;re continuously improving our accessibility. If you
                  encounter barriers or have suggestions, please let us know.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-card-foreground mb-4">
                    How to Reach Us
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        accessibility@webflowapp.com
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="h-4 w-4 text-primary" />
                      <span className="text-sm">Online feedback form</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm">User testing program</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-4">
                    What We Need
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>• Specific accessibility barriers you encounter</div>
                    <div>• Your assistive technology setup</div>
                    <div>• Suggestions for improvement</div>
                    <div>• Feature requests for better accessibility</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary/20 hover:bg-primary/10"
                  >
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Link href="mailto:accessibility@webflowapp.com">
                      Send Feedback
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

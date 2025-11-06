"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Workflow,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  Code,
  BarChart3,
} from "lucide-react";
import { PageLoader } from "@/components/ui/loader";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    setIsLoading(false);

    if (session) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  if (isLoading) {
    return <PageLoader text="Loading WebflowApp..." />;
  }

  if (session) {
    return <PageLoader text="Redirecting to Dashboard..." />;
  }

  const features = [
    {
      icon: <Workflow className="h-12 w-12 text-blue-600" />,
      title: "Visual Workflow Builder",
      description:
        "Create complex automations with simple drag-and-drop interface",
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      title: "Real-time Execution",
      description: "Execute workflows instantly and see results in real-time",
    },
    {
      icon: <Shield className="h-12 w-12 text-green-600" />,
      title: "Secure & Scalable",
      description: "Enterprise-grade security with unlimited scalability",
    },
  ];

  const benefits = [
    "No coding required - visual interface for everyone",
    "Real-time collaboration with your team",
    "Comprehensive analytics and monitoring",
    "Pre-built templates and custom nodes",
    "Secure cloud hosting with 99.9% uptime",
    "24/7 support and comprehensive documentation",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="max-w-screen-xl mx-auto">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold theme-gradient-text mb-6 theme-typography">
                WebflowApp
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Build powerful automation workflows with our intuitive visual
                interface. No coding required - just drag, drop, and automate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  asChild
                  className="theme-gradient hover:opacity-90 text-white text-lg px-8 py-4 transition-opacity"
                >
                  <Link href="/auth/signup">
                    <Play className="mr-2 h-5 w-5" />
                    Get Started Free
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="text-lg px-8 py-4"
                >
                  <Link href="/docs">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    View Documentation
                  </Link>
                </Button>
              </div>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur"
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 p-4 rounded-full bg-muted/50">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4 theme-typography">
                Why Choose WebflowApp?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join thousands of teams who trust WebflowApp to automate their
                most important workflows
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-lg text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-muted/50 to-muted/80 p-8 rounded-2xl border">
                <div className="text-center">
                  <Code className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to Automate?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start building your first workflow in minutes. Our intuitive
                    interface makes automation accessible to everyone.
                  </p>
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link href="/auth/signup">
                      Start Building Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <Users className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4 theme-typography">
              Join the Automation Revolution
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Thousands of teams are already saving time and reducing errors
              with WebflowApp. Start your automation journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/auth/signup">
                  <Play className="mr-2 h-5 w-5" />
                  Get Started Free
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-background hover:text-foreground"
                asChild
              >
                <Link href="/docs">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

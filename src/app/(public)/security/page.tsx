"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  CheckCircle,
  AlertTriangle,
  FileText,
  Users,
  Clock,
  Mail,
  KeyRound,
  Server,
} from "lucide-react";
import Link from "next/link";

export default function Security() {
  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      description:
        "All data is encrypted both in transit and at rest using industry-standard AES-256 encryption.",
      icon: Lock,
      features: [
        "TLS 1.3 for data in transit",
        "AES-256 encryption at rest",
        "Encrypted database storage",
        "Secure API communications",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Access Controls",
      description:
        "Comprehensive access management with role-based permissions and multi-factor authentication.",
      icon: KeyRound,
      features: [
        "Multi-factor authentication (MFA)",
        "Role-based access control (RBAC)",
        "Single sign-on (SSO) support",
        "Session management",
      ],
      color: "from-green-500 to-green-600",
    },
    {
      title: "Infrastructure Security",
      description:
        "Secure, scalable infrastructure with continuous monitoring and threat detection.",
      icon: Server,
      features: [
        "SOC 2 Type II compliant",
        "24/7 security monitoring",
        "Automated threat detection",
        "Regular security audits",
      ],
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Data Protection",
      description:
        "Comprehensive data protection measures with regular backups and disaster recovery.",
      icon: Database,
      features: [
        "Automated daily backups",
        "Point-in-time recovery",
        "Geographic data replication",
        "Data anonymization tools",
      ],
      color: "from-orange-500 to-orange-600",
    },
  ];

  const certifications = [
    {
      name: "SOC 2 Type II",
      description:
        "Audited controls for security, availability, and confidentiality",
      status: "Certified",
      renewed: "2024",
      icon: Shield,
    },
    {
      name: "GDPR Compliant",
      description: "Full compliance with European data protection regulations",
      status: "Compliant",
      renewed: "Ongoing",
      icon: Globe,
    },
    {
      name: "ISO 27001",
      description: "Information security management system certification",
      status: "In Progress",
      renewed: "2025",
      icon: FileText,
    },
    {
      name: "HIPAA Ready",
      description: "Healthcare data protection compliance available",
      status: "Available",
      renewed: "Enterprise",
      icon: Users,
    },
  ];

  const securityPractices = [
    {
      title: "Secure Development",
      items: [
        "Security code reviews",
        "Automated vulnerability scanning",
        "Dependency security monitoring",
        "Secure coding standards",
      ],
    },
    {
      title: "Incident Response",
      items: [
        "24/7 security operations center",
        "Automated incident detection",
        "Rapid response protocols",
        "Post-incident analysis",
      ],
    },
    {
      title: "Employee Security",
      items: [
        "Background checks",
        "Security awareness training",
        "Principle of least privilege",
        "Regular access reviews",
      ],
    },
    {
      title: "Business Continuity",
      items: [
        "Disaster recovery planning",
        "Business continuity testing",
        "Multiple data centers",
        "Failover procedures",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20 font-medium">
              Security & Compliance
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="theme-gradient-text">Enterprise Security</span>
            </h1>
            <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your security is our top priority. We implement industry-leading
              security measures to protect your data and ensure compliance with
              global standards.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-blue-500" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-purple-500" />
                <span>24/7 Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Security Features
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => {
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

      {/* Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Certifications & Compliance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
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
                      {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {cert.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">
                          {cert.status}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Updated: {cert.renewed}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Security Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityPractices.map((practice, index) => (
              <Card
                key={index}
                className="border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">
                    {practice.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {practice.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-card-foreground/80">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-16 bg-gradient-to-r from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border border-border/50 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-red-500 to-orange-600">
                    <AlertTriangle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Security Incident Reporting
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  If you discover a security vulnerability or have concerns
                  about our security practices, please report it immediately
                  through our secure channels.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-card-foreground mb-4">
                    Report Security Issues
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm">security@webflowapp.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">24/7 response team</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="h-4 w-4 text-primary" />
                      <span className="text-sm">Encrypted communication</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-4">
                    Response Timeline
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>• Initial response: Within 24 hours</div>
                    <div>• Status update: Within 72 hours</div>
                    <div>• Resolution: Based on severity</div>
                    <div>• Post-incident report: Within 30 days</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 text-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                >
                  <Link href="mailto:security@webflowapp.com">
                    Report Security Issue
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border border-border/50 shadow-lg bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Security Questions?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have questions about our security practices or need enterprise
                security documentation? Our security team is here to help.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <p>
                  Security Team:{" "}
                  <span className="text-primary font-medium">
                    security@webflowapp.com
                  </span>
                </p>
                <p>
                  Compliance Officer:{" "}
                  <span className="text-primary font-medium">
                    compliance@webflowapp.com
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10"
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10"
                >
                  <Link href="/privacy">Privacy Policy</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  CheckCircle,
  Users,
  HelpCircle,
  Building,
  Globe,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function Contact() {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "",
  });

  // Auto-fill email for logged-in users
  useEffect(() => {
    if (session?.user?.email && !formData.email) {
      setFormData(prev => ({
        ...prev,
        email: session.user.email || "",
        firstName: session.user.name?.split(' ')[0] || "",
        lastName: session.user.name?.split(' ').slice(1).join(' ') || "",
      }));
    }
  }, [session, formData.email]);

  const contactMethods = [
    {
      title: "Sales Inquiries",
      description: "Ready to get started or need a custom quote?",
      icon: Building,
      contact: "sales@webflowapp.com",
      phone: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9 AM - 6 PM PST",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Technical Support",
      description: "Need help with your workflows or account?",
      icon: HelpCircle,
      contact: "support@webflowapp.com",
      phone: "+1 (555) 123-4568",
      availability: "24/7 Support Available",
      color: "from-green-500 to-green-600",
    },
    {
      title: "General Questions",
      description: "Have questions about our platform?",
      icon: MessageSquare,
      contact: "hello@webflowapp.com",
      phone: "+1 (555) 123-4569",
      availability: "Mon-Fri, 8 AM - 8 PM PST",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const offices = [
    {
      city: "San Francisco",
      address: "123 Market Street, Suite 500",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isHQ: true,
    },
    {
      city: "London",
      address: "45 King's Road, Chelsea",
      country: "United Kingdom",
      phone: "+44 20 7123 4567",
      isHQ: false,
    },
    {
      city: "Singapore",
      address: "1 Raffles Place, #40-01",
      country: "Singapore",
      phone: "+65 6123 4567",
      isHQ: false,
    },
  ];

  const inquiryTypes = [
    { value: "sales", label: "Sales & Pricing" },
    { value: "support", label: "Technical Support" },
    { value: "partnership", label: "Partnership Opportunities" },
    { value: "media", label: "Media & Press" },
    { value: "careers", label: "Careers" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message', 'inquiryType'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields', {
        description: `Missing: ${missingFields.join(', ')}`,
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        toast.success('Message sent successfully!', {
          description: 'Thank you for contacting us. We will get back to you soon!',
          duration: 6000,
        });
        
        // Reset form
        setFormData({
          firstName: session?.user?.name?.split(' ')[0] || "",
          lastName: session?.user?.name?.split(' ').slice(1).join(' ') || "",
          email: session?.user?.email || "",
          company: "",
          phone: "",
          subject: "",
          message: "",
          inquiryType: "",
        });
        
        // Hide success state after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        // Handle specific error codes
        if (data.code === 'RATE_LIMIT_EXCEEDED') {
          toast.error('Too many submissions', {
            description: 'Please wait before sending another message.',
            duration: 5000,
          });
        } else if (data.code === 'VALIDATION_ERROR') {
          toast.error('Invalid data', {
            description: data.error || 'Please check your input and try again.',
            duration: 4000,
          });
        } else {
          toast.error('Failed to send message', {
            description: data.error || 'Please try again later.',
            duration: 4000,
          });
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Network error', {
        description: 'Please check your connection and try again.',
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 px-4 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              Get in Touch
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold theme-gradient-text mb-6 theme-typography">
              Contact Us
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              We&apos;re here to help you succeed with workflow automation.
              Reach out to our team for support, sales inquiries, or just to say
              hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              How Can We Help?
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the best way to reach us based on your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card
                  key={index}
                  className="border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur group"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`mx-auto p-4 rounded-full bg-gradient-to-r ${method.color} mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-primary" />
                        <span>{method.contact}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>{method.phone}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{method.availability}</span>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      Contact Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 theme-typography">
                Send Us a Message
              </h2>
              <Card className="border shadow-lg bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name *
                        </label>
                        <Input
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <Input
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address *
                        {session?.user?.email && (
                          <span className="ml-2 text-xs text-primary font-normal">
                            (Auto-filled from your account)
                          </span>
                        )}
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="john@company.com"
                        className={session?.user?.email ? "border-primary/50" : ""}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Company
                        </label>
                        <Input
                          value={formData.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Inquiry Type *
                      </label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) =>
                          handleInputChange("inquiryType", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || submitted}
                      className="w-full theme-gradient text-white text-lg py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending Message...
                        </>
                      ) : submitted ? (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 theme-typography">
                Get in Touch
              </h2>

              <div className="space-y-8">
                {/* Quick Response */}
                <Card className="border shadow-lg bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-full theme-gradient">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          Quick Response
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          We typically respond to inquiries within 2 hours
                          during business hours.
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Sales inquiries: &lt; 30 minutes
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            Support tickets: &lt; 2 hours
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            General inquiries: &lt; 4 hours
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Offices */}
                <Card className="border shadow-lg bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-primary" />
                      Our Offices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {offices.map((office, index) => (
                      <div
                        key={index}
                        className="pb-4 border-b border-border last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="font-medium flex items-center">
                            {office.city}
                            {office.isHQ && (
                              <Badge className="ml-2 text-xs">HQ</Badge>
                            )}
                          </div>
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div>{office.address}</div>
                          <div>{office.country}</div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {office.phone}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Alternative Contact */}
                <Card className="border shadow-lg bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                      Other Ways to Reach Us
                    </h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Start Live Chat
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule a Call
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Join Community Forum
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4 theme-typography">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions we receive from our users
            </p>
          </div>

          <div className="space-y-6">
            <Card className="border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-lg">
                  How quickly can I get started?
                </h3>
                <p className="text-muted-foreground">
                  You can sign up and start building workflows immediately. Our
                  platform is designed for quick onboarding, and you can have
                  your first workflow running in under 10 minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-lg">
                  Do you offer custom integrations?
                </h3>
                <p className="text-muted-foreground">
                  Yes! We can build custom integrations for Enterprise
                  customers. Contact our sales team to discuss your specific
                  requirements and timeline.
                </p>
              </CardContent>
            </Card>

            <Card className="border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-lg">
                  What kind of support do you provide?
                </h3>
                <p className="text-muted-foreground">
                  We offer multiple support channels including email support,
                  live chat, phone support for Enterprise customers, and a
                  comprehensive knowledge base with documentation and tutorials.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

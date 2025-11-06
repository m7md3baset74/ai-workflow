"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageUpload } from "@/components/ui/image-upload";
import { CheckCircle } from "lucide-react";

export default function CompleteProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    phone?: string;
    general?: string;
  }>({});

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (session?.user) {
      // Pre-fill with existing data
      const nameParts = session.user.name?.split(' ') || ['', ''];
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setImageUrl(session.user.image || null);
    }
  }, [session, status, router]);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (phone && !/^[+]?[(]?[\d\s().-]{10,}$/.test(phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: phone || undefined,
          company: company || undefined,
          jobTitle: jobTitle || undefined,
          imageUrl: imageUrl || undefined,
        }),
      });

      if (response.ok) {
        // Update the session
        await update({
          ...session,
          user: {
            ...session?.user,
            name: `${firstName} ${lastName}`.trim(),
            image: imageUrl || session?.user?.image,
            profileComplete: true,
          },
        });

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message || "Failed to complete profile" });
      }
    } catch (error) {
      console.error("Error completing profile:", error);
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Welcome to WebflowApp!</h1>
          <p className="text-muted-foreground text-center">
            Please complete your profile to get started
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              We need a few more details to set up your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <ImageUpload
              value={imageUrl || undefined}
              onChange={setImageUrl}
              disabled={loading}
              label="Profile Picture (Optional)"
            />

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={loading}
                    className={`h-11 ${errors.firstName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={loading}
                    className={`h-11 ${errors.lastName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  value={session?.user?.email || ''}
                  disabled
                  className="h-11 bg-muted text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  This is your sign-in email and cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  className={`h-11 ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Professional Information (Optional)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">Company</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={loading}
                    className="h-11"
                    placeholder="Acme Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    disabled={loading}
                    className="h-11"
                    placeholder="Product Manager"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">Role</Label>
              <Input
                id="role"
                value="User"
                className="h-11 bg-muted text-muted-foreground"
                disabled
                readOnly
              />
              <p className="text-xs text-muted-foreground">Default role for all new users</p>
            </div>

            {errors.general && (
              <div className="text-destructive text-sm text-center">
                {errors.general}
              </div>
            )}

            <Button
              onClick={handleComplete}
              className="w-full h-11 text-base font-medium"
              disabled={loading}
            >
              {loading ? "Completing Profile..." : "Complete Profile & Continue"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Fields marked with * are required
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
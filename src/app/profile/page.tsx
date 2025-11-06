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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ImageUpload } from "@/components/ui/image-upload";
import { Separator } from "@/components/ui/separator";
import { User, Save, Eye, EyeOff, Edit3, X } from "lucide-react";
import { ProfileSkeleton } from "@/components/ui/profile-skeleton";

interface UserProfile {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  imageUrl?: string;
  role: string;
  provider: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    phone?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
    general?: string;
  }>({});

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Password change fields
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (session?.user) {
      fetchProfile();
    }
  }, [session, status, router]);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/user/profile");
      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);

        // Populate form fields
        setFirstName(profileData.firstName || "");
        setLastName(profileData.lastName || "");
        setPhone(profileData.phone || "");
        setCompany(profileData.company || "");
        setJobTitle(profileData.jobTitle || "");
        setImageUrl(profileData.imageUrl || null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (isEditing) {
      if (!firstName.trim()) newErrors.firstName = "First name is required";
      if (!lastName.trim()) newErrors.lastName = "Last name is required";
      if (phone && !/^[+]?[(]?[\d\s().-]{10,}$/.test(phone)) {
        newErrors.phone = "Invalid phone number";
      }
    }

    // Password validation only if password section is shown and has values
    if (
      showPasswordSection &&
      (currentPassword || newPassword || confirmNewPassword)
    ) {
      if (!currentPassword)
        newErrors.currentPassword = "Current password is required";
      if (!newPassword) newErrors.newPassword = "New password is required";
      else if (newPassword.length < 6)
        newErrors.newPassword = "Password must be at least 6 characters";
      if (!confirmNewPassword)
        newErrors.confirmNewPassword = "Please confirm new password";
      else if (newPassword !== confirmNewPassword)
        newErrors.confirmNewPassword = "Passwords do not match";
      if (currentPassword && newPassword && currentPassword === newPassword) {
        newErrors.newPassword =
          "New password must be different from current password";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const updateData: {
        firstName: string;
        lastName: string;
        phone?: string;
        company?: string;
        jobTitle?: string;
        imageUrl?: string | null;
        currentPassword?: string;
        newPassword?: string;
      } = {
        firstName,
        lastName,
        phone: phone || undefined,
        company: company || undefined,
        jobTitle: jobTitle || undefined,
        imageUrl: imageUrl || undefined,
      };

      // Add password change data if provided
      if (showPasswordSection && currentPassword && newPassword) {
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);

        // Reset password fields on success
        if (showPasswordSection) {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
          setShowPasswordSection(false);
        }

        // Update the session with new name if changed
        if (firstName && lastName) {
          await update({
            ...session,
            user: {
              ...session?.user,
              name: `${firstName} ${lastName}`.trim(),
              image: imageUrl || session?.user?.image,
            },
          });
        }

        // Close the sidebar and reset states
        setIsEditSidebarOpen(false);
        setErrors({});
        setShowPasswordSection(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message || "Failed to update profile" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setPhone(profile.phone || "");
      setCompany(profile.company || "");
      setJobTitle(profile.jobTitle || "");
      setImageUrl(profile.imageUrl || null);
    }
    setIsEditing(false);
    setErrors({});

    // Reset password fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setShowPasswordSection(false);
  };

  if (status === "loading" || !profile) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto py-10 px-4">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          <Button
            onClick={() => setIsEditSidebarOpen(true)}
            className="flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <User className="w-6 h-6 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  {isEditing
                    ? "Update your profile information below"
                    : "View and manage your account details"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture - Read Only */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-white" />
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Personal Information - Read Only */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        First Name
                      </Label>
                      <p className="text-sm font-semibold">
                        {firstName || "Not provided"}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Last Name
                      </Label>
                      <p className="text-sm font-semibold">
                        {lastName || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </Label>
                    <p className="text-sm font-semibold">{profile?.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Email address cannot be changed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </Label>
                    <p className="text-sm font-semibold">
                      {phone || "Not provided"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Company
                    </Label>
                    <p className="text-sm font-semibold">
                      {company || "Not provided"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Job Title
                    </Label>
                    <p className="text-sm font-semibold">
                      {jobTitle || "Not provided"}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Password Change Section - Only for credentials users */}
                {profile.provider === "credentials" && (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Password</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setShowPasswordSection(!showPasswordSection)
                          }
                          disabled={!isEditing}
                        >
                          {showPasswordSection ? "Cancel" : "Change Password"}
                        </Button>
                      </div>

                      {showPasswordSection && (
                        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">
                              Current Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="currentPassword"
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) =>
                                  setCurrentPassword(e.target.value)
                                }
                                disabled={loading}
                                className={
                                  errors.currentPassword
                                    ? "border-destructive pr-10"
                                    : "pr-10"
                                }
                                placeholder="Enter current password"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() =>
                                  setShowCurrentPassword(!showCurrentPassword)
                                }
                                disabled={loading}
                              >
                                {showCurrentPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                            {errors.currentPassword && (
                              <p className="text-sm text-destructive">
                                {errors.currentPassword}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="newPassword">New Password</Label>
                              <div className="relative">
                                <Input
                                  id="newPassword"
                                  type={showNewPassword ? "text" : "password"}
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                  disabled={loading}
                                  className={
                                    errors.newPassword
                                      ? "border-destructive pr-10"
                                      : "pr-10"
                                  }
                                  placeholder="Enter new password"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                  disabled={loading}
                                >
                                  {showNewPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </Button>
                              </div>
                              {errors.newPassword && (
                                <p className="text-sm text-destructive">
                                  {errors.newPassword}
                                </p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="confirmNewPassword">
                                Confirm New Password
                              </Label>
                              <div className="relative">
                                <Input
                                  id="confirmNewPassword"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  value={confirmNewPassword}
                                  onChange={(e) =>
                                    setConfirmNewPassword(e.target.value)
                                  }
                                  disabled={loading}
                                  className={
                                    errors.confirmNewPassword
                                      ? "border-destructive pr-10"
                                      : "pr-10"
                                  }
                                  placeholder="Confirm new password"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  disabled={loading}
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </Button>
                              </div>
                              {errors.confirmNewPassword && (
                                <p className="text-sm text-destructive">
                                  {errors.confirmNewPassword}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />
                  </>
                )}

                {/* Professional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Professional Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        disabled={!isEditing || loading}
                        placeholder="Acme Inc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        disabled={!isEditing || loading}
                        placeholder="Product Manager"
                      />
                    </div>
                  </div>
                </div>

                {errors.general && (
                  <div className="text-destructive text-sm text-center">
                    {errors.general}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Account Info Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Role
                  </Label>
                  <p className="text-sm font-semibold capitalize">
                    {profile.role}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Sign-in Method
                  </Label>
                  <p className="text-sm font-semibold capitalize">
                    {profile.provider}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Member Since
                  </Label>
                  <p className="text-sm font-semibold">
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Profile Sidebar */}
        <Sheet open={isEditSidebarOpen} onOpenChange={setIsEditSidebarOpen}>
          <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold flex items-center">
                <Edit3 className="w-5 h-5 mr-2" />
                Edit Profile
              </SheetTitle>
              <SheetDescription>
                Update your profile information and password settings.
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Profile Picture */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Profile Picture
                </Label>
                <ImageUpload
                  value={imageUrl || undefined}
                  onChange={setImageUrl}
                  disabled={loading}
                />
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-firstName">First Name</Label>
                    <Input
                      id="edit-firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={loading}
                      className={errors.firstName ? "border-destructive" : ""}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-lastName">Last Name</Label>
                    <Input
                      id="edit-lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={loading}
                      className={errors.lastName ? "border-destructive" : ""}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={profile?.email || ""}
                    disabled={true}
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed after registration
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    className={errors.phone ? "border-destructive" : ""}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-company">Company</Label>
                  <Input
                    id="edit-company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={loading}
                    placeholder="Enter your company name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-jobTitle">Job Title</Label>
                  <Input
                    id="edit-jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    disabled={loading}
                    placeholder="Enter your job title"
                  />
                </div>
              </div>

              <Separator />

              {/* Password Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Password</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                    disabled={loading}
                  >
                    {showPasswordSection ? "Cancel" : "Change Password"}
                  </Button>
                </div>

                {showPasswordSection && (
                  <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                    <div className="space-y-2">
                      <Label htmlFor="edit-currentPassword">
                        Current Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="edit-currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          disabled={loading}
                          className={
                            errors.currentPassword
                              ? "border-destructive pr-10"
                              : "pr-10"
                          }
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          disabled={loading}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {errors.currentPassword && (
                        <p className="text-sm text-destructive">
                          {errors.currentPassword}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="edit-newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          disabled={loading}
                          className={
                            errors.newPassword
                              ? "border-destructive pr-10"
                              : "pr-10"
                          }
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          disabled={loading}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {errors.newPassword && (
                        <p className="text-sm text-destructive">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-confirmNewPassword">
                        Confirm New Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="edit-confirmNewPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          disabled={loading}
                          className={
                            errors.confirmNewPassword
                              ? "border-destructive pr-10"
                              : "pr-10"
                          }
                          placeholder="Confirm new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          disabled={loading}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {errors.confirmNewPassword && (
                        <p className="text-sm text-destructive">
                          {errors.confirmNewPassword}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errors.general && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                  {errors.general}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Saving..." : "Save Changes"}
                  <Save className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditSidebarOpen(false);
                    setErrors({});
                    setShowPasswordSection(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

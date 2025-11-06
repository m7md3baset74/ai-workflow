"use client";

import { useState, useCallback } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Upload, X, User, CloudUpload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string | null) => void;
  onFileSelect?: (file: File | null) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  onFileSelect,
  disabled = false,
  label = "Profile Picture",
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUpload = useCallback(
    async (file?: File) => {
      const fileToUpload = file || selectedFile;
      if (!fileToUpload) return;

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("image", fileToUpload);

        const response = await fetch("/api/upload/public", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Upload failed");
        }

        const { imageUrl } = await response.json();
        onChange(imageUrl);
        setSelectedFile(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    [onChange, selectedFile]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }

      setSelectedFile(file);
      onFileSelect?.(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    onFileSelect?.(null);
  };

  const displayImage = value || previewUrl;

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex items-center space-x-4">
        {/* Avatar Preview */}
        <div className="w-24 h-24 rounded-full border-2 border-border overflow-hidden bg-muted flex items-center justify-center">
          {displayImage ? (
            <Image
              src={displayImage}
              alt="Profile"
              className="w-full h-full object-cover"
              width={96}
              height={96}
            />
          ) : (
            <User className="w-8 h-8 text-muted-foreground" />
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2 flex-wrap">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={disabled || uploading}
              className="hidden"
              id="image-upload"
            />
            <Label htmlFor="image-upload">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled || uploading}
                className="cursor-pointer"
                asChild
              >
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Select Image
                </span>
              </Button>
            </Label>

            {selectedFile && !value && (
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() => handleUpload()}
                disabled={disabled || uploading}
              >
                <CloudUpload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Now"}
              </Button>
            )}

            {(value || selectedFile) && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                disabled={disabled}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {selectedFile && !value && (
            <p className="text-xs text-amber-600">
              Image selected. Click &quot;Upload Now&quot; to upload or it will
              be uploaded when you create your account.
            </p>
          )}

          {value && (
            <p className="text-xs text-green-600">
              Image uploaded successfully
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Upload a square image. Max size: 5MB
          </p>
        </div>
      </div>
    </div>
  );
}

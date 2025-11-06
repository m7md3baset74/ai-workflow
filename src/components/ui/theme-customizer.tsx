"use client";

import * as React from "react";
import { Palette, Type, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useThemeCustomizer,
  themeVariants,
  ThemeVariant,
} from "@/components/providers/ThemeCustomizerProvider";

export function ThemeCustomizer() {
  const { customTheme, setThemeVariant, setTypography, resetToDefault } =
    useThemeCustomizer();

  const fontOptions = [
    {
      value: "'Inter', system-ui, -apple-system, sans-serif",
      label: "Inter",
      preview: "Modern & Clean",
    },
    {
      value: "system-ui, -apple-system, sans-serif",
      label: "System UI",
      preview: "Native Feel",
    },
    {
      value: "Georgia, 'Times New Roman', serif",
      label: "Georgia",
      preview: "Classic Serif",
    },
    {
      value: "'Times New Roman', Times, serif",
      label: "Times New Roman",
      preview: "Traditional",
    },
    {
      value: "Arial, Helvetica, sans-serif",
      label: "Arial",
      preview: "Universal Sans",
    },
    {
      value: "Helvetica, Arial, sans-serif",
      label: "Helvetica",
      preview: "Swiss Design",
    },
    {
      value: "'SF Pro Display', -apple-system, sans-serif",
      label: "SF Pro Display",
      preview: "Apple Style",
    },
    {
      value: "'Roboto', system-ui, sans-serif",
      label: "Roboto",
      preview: "Google Material",
    },
    {
      value: "'Open Sans', system-ui, sans-serif",
      label: "Open Sans",
      preview: "Friendly & Open",
    },
    {
      value: "'Lato', system-ui, sans-serif",
      label: "Lato",
      preview: "Humanist Sans",
    },
    {
      value: "'Montserrat', system-ui, sans-serif",
      label: "Montserrat",
      preview: "Geometric Modern",
    },
    {
      value: "'Poppins', system-ui, sans-serif",
      label: "Poppins",
      preview: "Rounded & Friendly",
    },
    {
      value: "'Source Sans Pro', system-ui, sans-serif",
      label: "Source Sans Pro",
      preview: "Adobe Design",
    },
    {
      value: "'Ubuntu', system-ui, sans-serif",
      label: "Ubuntu",
      preview: "Human & Technical",
    },
    {
      value: "'Fira Sans', system-ui, sans-serif",
      label: "Fira Sans",
      preview: "Mozilla Design",
    },
    {
      value: "'JetBrains Mono', 'Courier New', monospace",
      label: "JetBrains Mono",
      preview: "Developer Font",
    },
    {
      value: "'Courier New', Courier, monospace",
      label: "Monospace",
      preview: "Code Style",
    },
    {
      value: "'Playfair Display', Georgia, serif",
      label: "Playfair Display",
      preview: "Elegant Serif",
    },
    {
      value: "'Merriweather', Georgia, serif",
      label: "Merriweather",
      preview: "Reading Serif",
    },
    {
      value: "'Nunito', system-ui, sans-serif",
      label: "Nunito",
      preview: "Rounded Sans",
    },
  ];

  const fontSizeOptions = [
    {
      value: "xs",
      label: "Extra Small",
      size: "12px",
      description: "Compact UI",
    },
    { value: "sm", label: "Small", size: "14px", description: "Dense Layout" },
    { value: "base", label: "Base", size: "16px", description: "Standard" },
    { value: "lg", label: "Large", size: "18px", description: "Comfortable" },
    {
      value: "xl",
      label: "Extra Large",
      size: "20px",
      description: "Accessibility",
    },
  ];

  const fontWeightOptions = [
    {
      value: "light",
      label: "Light",
      weight: "300",
      description: "Thin & Elegant",
    },
    {
      value: "normal",
      label: "Normal",
      weight: "400",
      description: "Regular Text",
    },
    {
      value: "medium",
      label: "Medium",
      weight: "500",
      description: "Balanced",
    },
    {
      value: "semibold",
      label: "Semibold",
      weight: "600",
      description: "Strong Emphasis",
    },
    {
      value: "bold",
      label: "Bold",
      weight: "700",
      description: "Heavy Weight",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 border">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Customize theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[480px] flex flex-col">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Customizer
          </SheetTitle>
          <SheetDescription>
            Customize colors and typography to make WebflowApp uniquely yours.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="colors" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mb-4 flex-shrink-0">
              <TabsTrigger value="colors" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Colors
              </TabsTrigger>
              <TabsTrigger
                value="typography"
                className="flex items-center gap-2"
              >
                <Type className="h-4 w-4" />
                Typography
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              {/* Colors Tab */}
              <TabsContent value="colors" className="h-full flex flex-col mt-0">
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Choose Your Color Theme
                    </Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select from {themeVariants.length} beautiful color schemes
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {themeVariants.map((variant: ThemeVariant) => (
                      <div
                        key={variant.id}
                        className={`relative cursor-pointer rounded-lg border p-3 hover:bg-accent/50 transition-all duration-200 ${
                          customTheme.variant.id === variant.id
                            ? "border-primary bg-accent/30 shadow-sm"
                            : "border-border hover:border-border"
                        }`}
                        onClick={() => setThemeVariant(variant)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-10 w-10 rounded-lg border-2 border-white shadow-md flex-shrink-0"
                              style={{ background: variant.colors.gradient }}
                            />
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate">
                                {variant.name}
                              </p>
                              <div className="flex gap-1 mt-1">
                                <div
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{
                                    backgroundColor: variant.colors.primary,
                                  }}
                                />
                                <div
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{
                                    backgroundColor: variant.colors.secondary,
                                  }}
                                />
                                <div
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{
                                    backgroundColor: variant.colors.accent,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          {customTheme.variant.id === variant.id && (
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Typography Tab */}
              <TabsContent
                value="typography"
                className="h-full flex flex-col mt-0"
              >
                <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Typography Settings
                    </Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Customize fonts, sizes, and weights for the perfect
                      reading experience
                    </p>
                  </div>

                  {/* Font Family */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Font Family</Label>
                    <div className="space-y-2">
                      {fontOptions.map((font) => (
                        <div
                          key={font.value}
                          className={`cursor-pointer rounded-lg border p-3 hover:bg-accent/50 transition-colors ${
                            customTheme.typography.fontFamily === font.value
                              ? "border-primary bg-accent/30"
                              : "border-border"
                          }`}
                          onClick={() =>
                            setTypography({
                              ...customTheme.typography,
                              fontFamily: font.value,
                            })
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p
                                className="font-medium text-sm"
                                style={{ fontFamily: font.value }}
                              >
                                {font.label}
                              </p>
                              <p
                                className="text-xs text-muted-foreground"
                                style={{ fontFamily: font.value }}
                              >
                                {font.preview}
                              </p>
                            </div>
                            {customTheme.typography.fontFamily ===
                              font.value && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Font Size</Label>
                    <div className="space-y-2">
                      {fontSizeOptions.map((size) => (
                        <div
                          key={size.value}
                          className={`cursor-pointer rounded-lg border p-3 hover:bg-accent/50 transition-colors ${
                            customTheme.typography.fontSize === size.value
                              ? "border-primary bg-accent/30"
                              : "border-border"
                          }`}
                          onClick={() =>
                            setTypography({
                              ...customTheme.typography,
                              fontSize: size.value as
                                | "xs"
                                | "sm"
                                | "base"
                                | "lg"
                                | "xl",
                            })
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">
                                {size.label}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {size.size} • {size.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                style={{ fontSize: size.size }}
                                className="text-muted-foreground"
                              >
                                Aa
                              </span>
                              {customTheme.typography.fontSize ===
                                size.value && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Font Weight */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Font Weight</Label>
                    <div className="space-y-2">
                      {fontWeightOptions.map((weight) => (
                        <div
                          key={weight.value}
                          className={`cursor-pointer rounded-lg border p-3 hover:bg-accent/50 transition-colors ${
                            customTheme.typography.fontWeight === weight.value
                              ? "border-primary bg-accent/30"
                              : "border-border"
                          }`}
                          onClick={() =>
                            setTypography({
                              ...customTheme.typography,
                              fontWeight: weight.value as
                                | "light"
                                | "normal"
                                | "medium"
                                | "semibold"
                                | "bold",
                            })
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p
                                className="font-medium text-sm"
                                style={{ fontWeight: weight.weight }}
                              >
                                {weight.label}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {weight.weight} • {weight.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                style={{ fontWeight: weight.weight }}
                                className="text-muted-foreground"
                              >
                                Aa
                              </span>
                              {customTheme.typography.fontWeight ===
                                weight.value && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 pt-4 border-t space-y-4">
          {/* Live Preview */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Live Preview</Label>
            <div
              className="rounded-lg border p-4 space-y-2 bg-card"
              style={{
                fontFamily: customTheme.typography.fontFamily,
                fontSize:
                  customTheme.typography.fontSize === "xs"
                    ? "12px"
                    : customTheme.typography.fontSize === "sm"
                    ? "14px"
                    : customTheme.typography.fontSize === "lg"
                    ? "18px"
                    : customTheme.typography.fontSize === "xl"
                    ? "20px"
                    : "16px",
                fontWeight:
                  customTheme.typography.fontWeight === "light"
                    ? 300
                    : customTheme.typography.fontWeight === "normal"
                    ? 400
                    : customTheme.typography.fontWeight === "medium"
                    ? 500
                    : customTheme.typography.fontWeight === "semibold"
                    ? 600
                    : 700,
              }}
            >
              <h3 className="font-bold text-lg theme-gradient-text">
                WebflowApp
              </h3>
              <p className="text-muted-foreground">
                Your customized theme in action
              </p>
              <div
                className="h-3 rounded"
                style={{ background: customTheme.variant.colors.gradient }}
              />
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={resetToDefault}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Default
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

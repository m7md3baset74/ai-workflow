import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeCustomizerProvider } from "@/components/providers/ThemeCustomizerProvider";
import { SubscriptionStatusUpdater } from "@/components/providers/SubscriptionStatusUpdater";
import { Toaster } from "@/components/ui/toaster";
import AppLayout from "@/components/layout/AppLayout";
import { FloatingPurchaseButton } from "@/components/ui/floating-purchase-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visual Workflow Builder",
  description:
    "Create and manage automation workflows with drag-and-drop interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <SubscriptionStatusUpdater />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeCustomizerProvider>
              <AppLayout>{children}</AppLayout>
              <Toaster />
              <FloatingPurchaseButton />
            </ThemeCustomizerProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

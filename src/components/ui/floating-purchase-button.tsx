"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Crown, ExternalLink } from "lucide-react";
import "./floating-purchase-button.css";

interface FloatingPurchaseButtonProps {
  className?: string;
}

export function FloatingPurchaseButton({
  className,
}: FloatingPurchaseButtonProps) {
  const [purchaseLink, setPurchaseLink] = useState("");

  useEffect(() => {
    // Get purchase link from environment variable
    setPurchaseLink(process.env.NEXT_PUBLIC_PURCHASE_LINK || "");
  }, []);

  const handlePurchase = () => {
    if (purchaseLink) {
      window.open(purchaseLink, "_blank");
    }
  };

  if (!purchaseLink) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 floating-purchase-button ${className}`}
    >
      {/* Outer animated glow rings with rainbow colors */}
      <div
        className="absolute inset-0 rounded-full color-shift-bg blur-md opacity-30"
        style={{
          animation:
            "spin 8s linear infinite, colorShift 4s ease-in-out infinite",
        }}
      ></div>
      <div
        className="absolute inset-2 rounded-full bg-gradient-to-r from-pink-400/20 via-yellow-400/20 to-blue-400/20 blur-sm"
        style={{ animation: "spin 6s linear infinite reverse" }}
      ></div>

      {/* Main button with enhanced theming */}
      <Button
        onClick={handlePurchase}
        className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-primary-foreground shadow-2xl hover:shadow-3xl transition-all duration-500 rounded-full p-4 group border-2 border-primary/30 hover:border-primary/60 backdrop-blur-sm overflow-hidden"
        size="lg"
      >
        <div className="flex items-center gap-2 transform transition-all duration-300 hover:scale-110 group-hover:rotate-3">
          <Crown className="h-6 w-6 transition-all duration-300 group-hover:text-yellow-600 group-hover:rotate-12 group-hover:scale-110" />
          <span className="hidden sm:inline-block font-bold text-sm transition-all duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-800 group-hover:to-pink-900 group-hover:bg-clip-text">
            Upgrade
          </span>
          <ExternalLink className="h-4 w-4 opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        {/* Multiple pulse rings with different colors */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-600/30 animate-ping"
          style={{ animationDelay: "0s", animationDuration: "2s" }}
        ></div>
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/25 to-pink-400/25 animate-ping"
          style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
        ></div>
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/20 to-yellow-400/20 animate-ping"
          style={{ animationDelay: "1s", animationDuration: "3s" }}
        ></div>

        {/* Dynamic glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/40 via-blue-500/20 to-purple-500/40 blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>

        {/* Enhanced shimmer effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Color-shifting background overlay */}
        <div className="absolute inset-0 rounded-full color-shift-bg opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-sm"></div>
      </Button>

      {/* Enhanced animated tooltip with theme colors */}
      <div className="absolute bottom-full right-0 mb-3 px-4 py-3 bg-popover/95 text-popover-foreground text-sm rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap border-2 border-primary/30 backdrop-blur-md transform group-hover:scale-105 group-hover:-translate-y-1">
        <div className="relative z-10">
          <div className="font-bold text-base bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
            ✨ Upgrade to Pro Plan
          </div>
          <div className="text-xs opacity-80 mt-1 font-medium">
            🚀 Unlimited workflows & premium features
          </div>
        </div>

        {/* Animated background gradient */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-blue-500/5 to-purple-500/10 animate-pulse"></div>

        {/* Tooltip arrow */}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover transform transition-transform duration-300 group-hover:scale-110"></div>
      </div>
    </div>
  );
}

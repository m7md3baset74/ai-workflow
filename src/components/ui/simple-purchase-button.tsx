"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Crown, ExternalLink } from "lucide-react";

interface SimplePurchaseButtonProps {
  className?: string;
}

export function SimplePurchaseButton({ className }: SimplePurchaseButtonProps) {
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
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Button
        onClick={handlePurchase}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4 group"
        size="lg"
        title="Upgrade to Pro Plan"
      >
        <div className="flex items-center gap-2 transform transition-transform duration-200 hover:scale-110">
          <Crown className="h-6 w-6" />
          <ExternalLink className="h-4 w-4 opacity-70" />
        </div>
      </Button>
    </div>
  );
}

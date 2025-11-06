"use client";

import { useSession } from "next-auth/react";
import { useEffect, useCallback } from "react";

export function useSubscriptionUpdates() {
  const { data: session, update } = useSession();

  const refreshSession = useCallback(async () => {
    try {
      await update();
      // Dispatch custom event for components that listen to subscription updates
      window.dispatchEvent(new CustomEvent("subscription-updated"));
    } catch (error) {
      console.error("Error refreshing session:", error);
    }
  }, [update]);

  // Listen for subscription updates from payment flows
  useEffect(() => {
    const handleSubscriptionUpdate = () => {
      refreshSession();
    };

    // Listen for custom events from payment completion
    window.addEventListener("payment-success", handleSubscriptionUpdate);
    window.addEventListener("subscription-cancelled", handleSubscriptionUpdate);

    return () => {
      window.removeEventListener("payment-success", handleSubscriptionUpdate);
      window.removeEventListener(
        "subscription-cancelled",
        handleSubscriptionUpdate
      );
    };
  }, [refreshSession]);

  return {
    session,
    refreshSession,
  };
}

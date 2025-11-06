"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

/**
 * This component listens for subscription updates and refreshes the session
 * to ensure user data is always up-to-date across the application
 */
export function SubscriptionStatusUpdater() {
  const { update } = useSession();

  useEffect(() => {
    // Listen for subscription-related events
    const handleSubscriptionUpdate = async () => {
      try {
        // Update the session to fetch fresh user data
        await update();
      } catch (error) {
        console.error("Failed to update session:", error);
      }
    };

    const handlePaymentSuccess = async () => {
      // Small delay to allow webhook processing
      setTimeout(handleSubscriptionUpdate, 2000);
    };

    const handleSubscriptionCancelled = handleSubscriptionUpdate;
    const handleSubscriptionReactivated = handleSubscriptionUpdate;

    // Listen to various subscription events
    window.addEventListener("payment-success", handlePaymentSuccess);
    window.addEventListener("subscription-updated", handleSubscriptionUpdate);
    window.addEventListener(
      "subscription-cancelled",
      handleSubscriptionCancelled
    );
    window.addEventListener(
      "subscription-reactivated",
      handleSubscriptionReactivated
    );

    // Listen for Stripe events (if using Stripe Elements)
    window.addEventListener("stripe-checkout-success", handlePaymentSuccess);

    return () => {
      window.removeEventListener("payment-success", handlePaymentSuccess);
      window.removeEventListener(
        "subscription-updated",
        handleSubscriptionUpdate
      );
      window.removeEventListener(
        "subscription-cancelled",
        handleSubscriptionCancelled
      );
      window.removeEventListener(
        "subscription-reactivated",
        handleSubscriptionReactivated
      );
      window.removeEventListener(
        "stripe-checkout-success",
        handlePaymentSuccess
      );
    };
  }, [update]);

  // This component doesn't render anything, it just handles events
  return null;
}

// Export a hook for manual session refresh
export function useSessionRefresh() {
  const { update } = useSession();

  return {
    refreshSession: update,
  };
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      profileComplete?: boolean;
      role?: string;
      paidUser?: boolean;
      subscriptionStatus?:
        | "free"
        | "professional"
        | "business"
        | "enterprise"
        | "cancelled"
        | "expired";
      planType?: "free" | "professional" | "business" | "enterprise";
      cancelledAt?: Date | null;
      cancellationReason?: string | null;
    };
  }

  interface User {
    id: string;
    profileComplete?: boolean;
    role?: string;
    paidUser?: boolean;
    subscriptionStatus?:
      | "free"
      | "professional"
      | "business"
      | "enterprise"
      | "cancelled"
      | "expired";
    planType?: "free" | "professional" | "business" | "enterprise";
    cancelledAt?: Date | null;
    cancellationReason?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    profileComplete?: boolean;
    role?: string;
    paidUser?: boolean;
    subscriptionStatus?:
      | "free"
      | "professional"
      | "business"
      | "enterprise"
      | "cancelled"
      | "expired";
    planType?: "free" | "professional" | "business" | "enterprise";
    cancelledAt?: Date | null;
    cancellationReason?: string | null;
  }
}

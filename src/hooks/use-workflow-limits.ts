import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface UseWorkflowLimitsResult {
  canCreateWorkflow: boolean;
  isLoading: boolean;
  checkLimit: () => Promise<boolean>;
  showUpgradePrompt: (message?: string) => void;
}

export function useWorkflowLimits(): UseWorkflowLimitsResult {
  const [canCreateWorkflow, setCanCreateWorkflow] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  const checkLimitInternal = useCallback(async (): Promise<boolean> => {
    if (!session?.user) {
      setCanCreateWorkflow(false);
      setIsLoading(false);
      return false;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/workflows/check-limit");
      const data = await response.json();

      const canCreate = response.ok && data.canCreateWorkflow;
      setCanCreateWorkflow(canCreate);
      return canCreate;
    } catch (error) {
      console.error("Error checking workflow limits:", error);
      setCanCreateWorkflow(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      checkLimitInternal();
    }
  }, [session, checkLimitInternal]);

  const checkLimit = checkLimitInternal;

  const showUpgradePrompt = (message?: string) => {
    const defaultMessage =
      "You have reached your workflow limit for your current plan. Please upgrade to create more workflows.";

    if (
      window.confirm(
        message || defaultMessage + " Would you like to view our plans?"
      )
    ) {
      router.push("/pricing");
    }
  };

  return {
    canCreateWorkflow,
    isLoading,
    checkLimit,
    showUpgradePrompt,
  };
}

// Hook for checking limits before performing actions
export function useWorkflowActions() {
  const { checkLimit, showUpgradePrompt } = useWorkflowLimits();

  const createWorkflowWithLimit = async (
    createFn: () => Promise<void> | void
  ) => {
    const canCreate = await checkLimit();

    if (!canCreate) {
      showUpgradePrompt();
      return false;
    }

    try {
      await createFn();
      return true;
    } catch (error) {
      console.error("Error creating workflow:", error);
      return false;
    }
  };

  return {
    createWorkflowWithLimit,
    checkLimit,
    showUpgradePrompt,
  };
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthSupabase } from "@/hooks/use-auth-supabase";

// custom hook for authentication and route protection
export const useOverviewAuth = (): { user: any; isAuthLoading: boolean; shouldRender: boolean } => {
  const router = useRouter();
  const { user, loading: isAuthLoading } = useAuthSupabase();

  // protect route from unauthorized access
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/signin");
    }
  }, [user, isAuthLoading, router]);

  const shouldRender = !isAuthLoading && !!user;

  return { user, isAuthLoading, shouldRender };
};
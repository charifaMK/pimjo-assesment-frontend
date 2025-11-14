"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthSupabase } from "./use-auth-supabase";
import { useMenuData } from "./use-menu-data";
import { toast } from "sonner";

export const useNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading: isLoading } = useAuthSupabase();
  const { items: menuItems, loading: isMenuLoading, error } = useMenuData();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load navigation menu");
    }
  }, [error]);

  return {
    router,
    pathname,
    user,
    isLoading,
    menuItems,
    isMenuLoading,
    error,
  };
};
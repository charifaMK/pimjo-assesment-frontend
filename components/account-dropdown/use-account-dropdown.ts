"use client"

import { useState, useRef, useEffect } from "react"
import { useAuthSupabase } from "@/hooks/use-auth-supabase"
import { toast } from "sonner"
import { Grid, Download, FileText, LogOut } from "lucide-react"

export interface MenuItem {
  label: string
  icon: any
  href: string
  action?: () => void
}

export const useAccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, signOut } = useAuthSupabase()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async (): Promise<void> => {
    
    // show immediate feedback that logout is happening
    toast.loading("Signing out...");
    
    try {
      const success = await signOut();
      if (success) {
        toast.dismiss();
        toast.success("Signed out successfully!");
      } else {
        toast.dismiss();
        toast.error("Failed to sign out. Please try again.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred. Please try again.");
    }
  };

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (): void => {
    setIsOpen(false);
  };

  const handleMenuItemClick = (item: MenuItem): void => {
    closeDropdown();
    if (item.action) {
      item.action();
    }
  };

  const menuItems: MenuItem[] = [
    { 
      label: "Overview", 
      icon: Grid, 
      href: "/overview" 
    },
    { 
      label: "Downloads", 
      icon: Download, 
      href: "/" 
    },
    { 
      label: "Billing", 
      icon: FileText, 
      href: "/" 
    },
    { 
      label: "Log out", 
      icon: LogOut, 
      href: "#",
      action: handleSignOut 
    },
  ]

  return {
    isOpen,
    dropdownRef,
    user,
    menuItems,
    toggleDropdown,
    closeDropdown,
    handleMenuItemClick
  }
};
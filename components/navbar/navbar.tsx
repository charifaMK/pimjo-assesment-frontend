"use client";

import { NavigationMenu } from "./navigation-menu";
import { SearchBar } from "./search-bar";
import { ActionButtons } from "./action-buttons";
import { AuthSection } from "./auth-section";
import { NavbarLogo } from "./navbar-logo";
import { useNavbar } from "@/hooks/use-navbar";

export const Navbar = () => {
  const { user, isLoading, menuItems, isMenuLoading } = useNavbar();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className=" py-4 flex items-center justify-between">

        <div className="flex items-center gap-8">
          <NavbarLogo />
          <NavigationMenu items={menuItems} isLoading={isMenuLoading} />
        </div>

        <div className="flex items-center gap-4">
          <SearchBar />
          <ActionButtons />
          <AuthSection user={user} isLoading={isLoading} />
        </div>
      </div>
    </header>
  );
};
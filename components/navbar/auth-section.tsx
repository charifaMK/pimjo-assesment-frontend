"use client";

import Link from "next/link";
import { AccountDropdown } from "../account-dropdown/account-dropdown";

interface User {
  id: string;
  email?: string;
  name?: string;
}

interface AuthSectionProps {
  user: User | null;
  isLoading: boolean;
};

export const AuthSection = ({ user, isLoading }: AuthSectionProps) => {
  if (isLoading) {
    return (
      <div className="px-4 py-2">
        <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <AccountDropdown />
      </div>
    );
  }

  return (
    <>
      <Link
        href="/signin"
        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition block"
      >
        Sign in
      </Link>
      <Link
        href="/"
        className="px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition block"
      >
        Pricing & FAQ
      </Link>
    </>
  );
};

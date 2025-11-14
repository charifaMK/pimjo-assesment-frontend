"use client";

import Link from "next/link";

interface NavigationMenuItemProps {
  href: string;
  label: string;
};

export const NavigationMenuItem = ({ href, label }: NavigationMenuItemProps) => {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:bg-gray-200 rounded-md py-1.5 px-2 font-medium text-sm"
    >
      {label}
    </Link>
  );
};
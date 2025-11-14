"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo"
export const NavbarLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Logo />
    </Link>
  );
};
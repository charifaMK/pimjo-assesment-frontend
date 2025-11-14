"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  return (
    <div className="relative hidden md:block">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        placeholder="Quick search..."
        className="pl-10 pr-12 py-2 bg-gray-100 border-0 text-sm w-48 focus:bg-white"
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">⌘ K</span>
    </div>
  );
};
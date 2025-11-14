"use client";

import { JSX } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

// search and filter component
export const SearchAndFilter = ({ searchQuery, setSearchQuery }: { 
  searchQuery: string; 
  setSearchQuery: (query: string) => void;
}): JSX.Element => (
  <div className="p-6 border-b border-gray-200">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold text-gray-900">all users</h2>
    </div>

    <div className="flex items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-gray-300"
        />
      </div>
      <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50">
        <Filter className="w-4 h-4" />
        filter
      </button>
    </div>
  </div>
);
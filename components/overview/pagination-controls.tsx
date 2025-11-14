"use client";

import { JSX } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPaginationText } from "@/overviewHelpers";

export const PaginationControls = ({ 
  pagination, 
  pageNumbers, 
  totalUsers 
}: { 
  pagination: any; 
  pageNumbers: any[]; 
  totalUsers: number;
}): JSX.Element => (
  <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
    <p className="text-sm text-gray-600">
      {getPaginationText(pagination.startIndex, pagination.endIndex, totalUsers)}
    </p>
    <div className="flex items-center gap-2">
      <button
        onClick={pagination.goToPreviousPage}
        disabled={!pagination.canGoPrevious}
        className="p-2 hover:bg-gray-100 rounded text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && pagination.goToPage(page)}
          disabled={page === "..."}
          className={`w-8 h-8 rounded font-medium text-sm transition ${
            page === pagination.currentPage
              ? "bg-blue-600 text-white"
              : page === "..."
                ? "text-gray-600 cursor-default"
                : "hover:bg-gray-100 text-gray-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={pagination.goToNextPage}
        disabled={!pagination.canGoNext}
        className="p-2 hover:bg-gray-100 rounded text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);
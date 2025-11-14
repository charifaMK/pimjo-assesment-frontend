"use client";

import Link from "next/link";
import { iconMap } from "./icon-map";

interface MegaMenuColumn {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface MegaMenuDropdownProps {
  columns: MegaMenuColumn[];
};

export const MegaMenuDropdown = ({ columns }: MegaMenuDropdownProps) => {
  return (
    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-[600px]">
        <div className="grid grid-cols-2 gap-6">
          {columns.map((column, index) => {
            const IconComponent = iconMap[column.icon];
            return (
              <Link
                key={index}
                href={column.href}
                className="p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              >
                <div className="flex items-start gap-3 mb-2">
                  {IconComponent && (
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{column.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
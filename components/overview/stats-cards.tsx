"use client";

import { JSX } from "react";
import { Card } from "@/components/ui/card";
import { statsData } from "@/utils/overviewUtils";

export const StatsCards = (): JSX.Element => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {statsData.map((stat, index) => (
      <Card key={index} className="p-6">
        <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
        <div className="flex items-baseline justify-between">
          <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
          <span
            className={`text-sm font-medium ${stat.trend === "positive" ? "text-green-600" : "text-red-600"}`}
          >
            {stat.change}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">vs last month</p>
      </Card>
    ))}
  </div>
);
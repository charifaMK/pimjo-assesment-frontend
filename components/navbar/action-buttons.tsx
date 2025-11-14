"use client";

import { X, Github, MessageCircle } from "lucide-react";

export const ActionButtons = () => {
  return (
    <div className="md:block hidden">
      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
        <X className="w-5 h-5 text-gray-600" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
        <Github className="w-5 h-5 text-gray-600" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition">
        <MessageCircle className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};
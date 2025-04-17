"use client";
import { CreditCard, FolderOpen, Home, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Sidebar = () => {
  const links = [
    {
      icon: <Home className="size-6" />,
      label: "Home",
      active: true,
    },
    {
      icon: <FolderOpen className="size-6" />,
      label: "Projects",
      active: false,
    },
    {
      icon: <CreditCard className="size-6" />,
      label: "Billing",
      active: false,
    },
  ];
  return (
    <aside className="w-[72px] bg-[#f8f8fc] border-r flex flex-col items-center py-4 fixed left-0 top-0 h-full z-20">
      <div className="flex flex-col items-center">
        <button className="size-12 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors">
          <Plus className="w-6 h-6" />
        </button>
        <div className="text-xs font-medium text-center mr-1 text-gray-700">
          Create
        </div>
      </div>

      <nav className="mt-8 flex flex-col items-center space-y-6 w-full">
        {links.map((item, index) => (
          <div key={index} className="flex flex-col items-center w-full ">
            <Link
              href={"#"}
              className="w-full flex flex-col items-center py-2 text-gray-600 hover:bg-gray-100 hover:text-purple-600"
            >
              <div className="relative">{item.icon}</div>
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>
    </aside>
  );
};

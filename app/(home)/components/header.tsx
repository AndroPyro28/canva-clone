"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  const { data } = useSession();
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6 fixed top-0 right-0 left-[72px] z-10">
      <div className="  flex-1 max-w-2xl mx-auto relative border-gray-200">
        <label htmlFor="search" className="cursor-text">
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 size-5 text-gray-400 " />
        </label>
        <Input id="search" className="pl-10 py-6  border-none bg-gray-50 focus-visible:ring-purple-500 text-base" placeholder="Search your projects and Canvas's" />
      </div>

      <div className="flex items-center gap-5 ml-4">
        <div className="flex items-center gap-1 cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 focus:outline-none cursor-pointer hover:bg-gray-200 px-1 py-2 rounded-lg transition-colors duration-400">
                <Avatar>
                  <AvatarFallback>
                    {data?.user?.name?.[0] || "U"}
                  </AvatarFallback>
                  <AvatarImage
                    src={data?.user?.image || "/placeholder-user.jpg"}
                  />
                </Avatar>
                <div className="text-sm font-medium hidden lg:block">
                  {data?.user?.name || "User"}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={async () => await signOut()} className="cursor-pointer">
                <LogOut className="mr-2 size-4" />
                <span className="">
                  Log out
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/hooks/use-editor-store";
import { ChevronDown, Eye, LogOut, Pencil, Save, Star } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

export const Header = () => {

  const {isEditing, setIsEditing, name, setName} = useEditorStore()

  const {data} = useSession()
  return (
    <header className="header header-gradient flex items-center justify-between px-4 h-14">
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="header-button flex items-center text-white">
              <span>{isEditing ? 'Editing' : 'Viewing'}</span>
              <ChevronDown className="ml-1 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 size-4"/>
              <span>Editing</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsEditing(false)}>
              <Eye className="mr-2 size-4"/>
              <span>Viewing</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="">
        <button className="header-button relative" title="save">
          <Save className="size-5" />
        </button>
      </div>

      <div className="flex-1 flex justify-center max-w-md">
        <Input className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> 
      </div>

      <div className="flex items-center space-x-3">
        <Button className="upgrade-button flex items-center bg-white/10 hover:bg-white/20 text-white rounded-md h-9 px-3  transition-colors">
          <Star className="mr-1 size-4 text-yellow-400" />
          <span>Upgrade your plan</span>
        </Button>

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
    </header>
  );
};

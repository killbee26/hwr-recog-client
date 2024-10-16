"use client"; // Ensure client-side rendering

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure client-side only code executes
  }, []);

  const handleLogout = () => {
    if (isClient) {
      // Perform logout actions like clearing localStorage or calling an API
      console.log("User logged out");
      localStorage.removeItem("authToken");
      // Redirect to login page, for example
      window.location.href = "/login";
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Left side: Dashboard logo */}
        <div>
          <Link href="/dashboard" className="text-2xl font-bold hover:text-gray-300">
            Dashboard
          </Link>
        </div>

        {/* Right side: Avatar with dropdown */}
        <div className="relative">
          {isClient && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Use div or span instead of Button to avoid button inside button */}
                <div className="cursor-pointer">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/user-avatar-placeholder.png" alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40 right-0 mt-2 bg-white shadow-lg rounded-lg text-black">
                <DropdownMenuItem className="hover:bg-gray-100 p-2 cursor-pointer">
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100 p-2 cursor-pointer">
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:bg-red-100 text-red-600 p-2 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

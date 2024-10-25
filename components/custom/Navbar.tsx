"use client"; // Ensure client-side rendering

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios for API calls
import apiClient from "@/lib/utilities/apiClient";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/user-avatar-placeholder.png"); // Default placeholder

  useEffect(() => {
    setIsClient(true); // Ensure client-side only code executes

    const fetchAvatar = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token if needed
        const response = await apiClient.get(`/api/users/getUserAvatar`);
        setAvatarUrl(response.data.avatarUrl); // Assuming the API returns an object with avatarUrl
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    };

    fetchAvatar(); // Call the fetch function
  }, []);

  const handleLogout = () => {
    if (isClient) {
      // Perform logout actions like clearing localStorage or calling an API
      console.log("User logged out");
      localStorage.removeItem("token");
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
                    <AvatarImage src={avatarUrl} alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40 right-0 mt-2 bg-white shadow-lg rounded-lg text-black">
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

"use client";
import Navbar from '@/components/custom/Navbar';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSpinner } from 'react-icons/fa';
import { getToken } from '@/lib/utilities/token';
import useTokenCheck from '@/lib/utilities/tokenCheck';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Mock function to get token (replace with your actual get token function)


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

  const router = useRouter();

  const isAuthenticated = useTokenCheck();

  // Loading state with Font Awesome spinner
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className='animate-spin' />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;

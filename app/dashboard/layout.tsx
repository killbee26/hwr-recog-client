// src/components/dashboard/DashboardLayout.tsx
import Navbar from '@/components/custom/Navbar';
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Content area */}
      <main className="flex-1 p-6">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex flex-col transition-colors duration-200">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:px-6 sm:pt-4 sm:pb-6 lg:px-8 lg:pt-5 lg:pb-8">
        <Outlet />
      </main>
    </div>
  );
};

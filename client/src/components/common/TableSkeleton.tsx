import React from 'react';

export const TableSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      {/* Header Skeleton */}
      <div className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface p-4 flex gap-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
      </div>
      
      {/* Body Rows Skeleton */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b border-gray-100 dark:border-dark-border/50 p-4 flex gap-4 items-center">
          <div className="flex flex-col gap-2 w-1/4">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-gray-100 dark:bg-gray-800/50 rounded w-1/2 animate-pulse"></div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-24 animate-pulse"></div>
          <div className="flex gap-2 ml-auto">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

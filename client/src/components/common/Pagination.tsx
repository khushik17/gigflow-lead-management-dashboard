import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-dark-border sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <Button
              variant="secondary"
              className="rounded-l-md rounded-r-none border-r-0"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
              <span className="sr-only">Previous</span>
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                  page === pageNum
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600 dark:bg-primary-500/10 dark:border-primary-500/50 dark:text-primary-400'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-dark-surface dark:border-dark-border dark:text-gray-400 dark:hover:bg-dark-border/40'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <Button
              variant="secondary"
              className="rounded-l-none rounded-r-md border-l-0"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
              <span className="sr-only">Next</span>
            </Button>
          </nav>
        </div>
      </div>
      <div className="flex items-center justify-between w-full sm:hidden">
        <Button
          variant="secondary"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {page} / {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

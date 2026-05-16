import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(
            clsx(
              "w-full px-4 py-2.5 border rounded-xl outline-none transition-all duration-200 bg-white dark:bg-dark-surface dark:text-gray-100",
              error 
                ? "border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900" 
                : "border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-dark-border",
              className
            )
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

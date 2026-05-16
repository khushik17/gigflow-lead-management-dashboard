import React from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className, 
  disabled, 
  ...props 
}) => {
  const baseClasses = "flex items-center select-none justify-center font-medium rounded-lg transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white",
    secondary: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 dark:bg-dark-surface dark:hover:bg-dark-border dark:text-gray-200 dark:border-dark-border",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const finalClasses = twMerge(clsx(baseClasses, variants[variant], 'py-2 px-4', className));

  return (
    <button className={finalClasses} disabled={disabled || isLoading} {...props}>
      {isLoading ? <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> : null}
      {children}
    </button>
  );
};

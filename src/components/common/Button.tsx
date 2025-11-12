'use client';

/**
 * Button Component
 *
 * Reusable button component with multiple variants and sizes
 * Follows Tatra Trails design system
 */

import React from 'react';
import { cn } from '@/lib/utils/formatters';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center',
    'font-heading font-semibold',
    'rounded-lg',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'active:scale-95'
  );

  const variants = {
    primary: cn(
      'bg-primary text-white',
      'hover:bg-primary-dark',
      'focus:ring-primary',
      'shadow-md hover:shadow-lg'
    ),
    secondary: cn(
      'bg-secondary text-white',
      'hover:bg-secondary-dark',
      'focus:ring-secondary',
      'shadow-md hover:shadow-lg'
    ),
    outline: cn(
      'bg-transparent text-primary border-2 border-primary',
      'hover:bg-primary hover:text-white',
      'focus:ring-primary'
    ),
    ghost: cn(
      'bg-transparent text-primary',
      'hover:bg-primary/10',
      'focus:ring-primary'
    ),
    danger: cn(
      'bg-red-600 text-white',
      'hover:bg-red-700',
      'focus:ring-red-500',
      'shadow-md hover:shadow-lg'
    ),
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

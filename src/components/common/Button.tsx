'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98] select-none';

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow focus:ring-blue-500 border border-transparent',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 focus:ring-slate-400 border border-transparent',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500 border border-transparent',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500 border border-transparent',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-700 focus:ring-slate-400',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 dark:hover:bg-slate-800 dark:text-slate-300 focus:ring-slate-400',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
}

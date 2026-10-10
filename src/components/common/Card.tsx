'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl shadow-xs ${
        hoverable ? 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
  icon,
  className = '',
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        {icon && <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0">{icon}</div>}
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-5 py-3.5 sm:px-6 bg-slate-50/60 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 rounded-b-xl flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}

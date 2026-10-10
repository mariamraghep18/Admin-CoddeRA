'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast, isRtl } = useApp();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/90 dark:bg-emerald-950/80',
    warning: 'border-amber-200 dark:border-amber-800 bg-amber-50/90 dark:bg-amber-950/80',
    error: 'border-rose-200 dark:border-rose-800 bg-rose-50/90 dark:bg-rose-950/80',
    info: 'border-blue-200 dark:border-blue-800 bg-blue-50/90 dark:bg-blue-950/80',
  };

  return (
    <div
      className={`fixed bottom-6 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 pointer-events-none ${
        isRtl ? 'left-6 items-start' : 'right-6 items-end'
      }`}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 w-full rounded-xl border shadow-lg backdrop-blur-md transition-all animate-in slide-in-from-bottom-3 duration-200 ${
            borders[toast.type]
          }`}
        >
          <div className="flex items-center gap-2.5">
            {icons[toast.type]}
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

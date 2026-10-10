'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { CommandPalette } from './CommandPalette';
import { ToastContainer } from '@/components/common/ToastContainer';
import { AppScreenRouter } from './AppScreenRouter';
import { LoginScreen } from '@/components/auth/LoginScreen';
import { RegistrationScreen } from '@/components/auth/RegistrationScreen';

export interface AdminShellProps {
  children?: React.ReactNode;
  onSignOut?: () => void;
  isDark?: boolean;
  isRTL?: boolean;
  onToggleTheme?: () => void;
  onToggleLanguage?: () => void;
}

export function AdminShell({
  children,
  onSignOut,
  isDark: propIsDark,
  isRTL: propIsRTL,
  onToggleTheme,
  onToggleLanguage,
}: AdminShellProps) {
  const { isRtl, isDark: ctxIsDark, logout, isAuthenticated, setIsAuthenticated, currentRoute, navigateTo } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const effectiveRtl = propIsRTL !== undefined ? propIsRTL : isRtl;
  const effectiveDark = propIsDark !== undefined ? propIsDark : ctxIsDark;

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    } else {
      logout();
    }
  };

  // If unauthenticated: strictly render the Auth flow (defaulting to LoginScreen)
  if (!isAuthenticated) {
    if (currentRoute === 'registration') {
      return (
        <RegistrationScreen
          onBackToLogin={() => navigateTo('login')}
          onCompleteRegistration={() => {
            setIsAuthenticated(true);
            navigateTo('overview');
          }}
        />
      );
    }
    return (
      <LoginScreen
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          navigateTo('overview');
        }}
        onOpenRegister={() => navigateTo('registration')}
      />
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#FBFBFA] dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-500/20 selection:text-blue-600 ${
        effectiveDark ? 'dark' : ''
      }`}
      dir={effectiveRtl ? 'rtl' : 'ltr'}
    >
      {/* Sidebar Drawer */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onSignOut={handleSignOut}
      />

      {/* Main Content Area */}
      <div
        className={`flex flex-col min-h-screen transition-all ${
          effectiveRtl ? 'lg:mr-64 lg:ml-0' : 'lg:ml-64 lg:mr-0'
        }`}
      >
        {/* Sticky Top Header */}
        <TopHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onSignOut={handleSignOut}
        />

        {/* Dynamic Canvas Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {children || <AppScreenRouter />}
        </main>
      </div>

      {/* Global Modals & Utilities */}
      <CommandPalette />
      <ToastContainer />
    </div>
  );
}

export { AdminShell as DashboardOverview };

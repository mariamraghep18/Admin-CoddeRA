'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AdminShell } from '@/components/shell/AdminShell';
import { RegistrationScreen } from '@/components/auth/RegistrationScreen';
import { LoginScreen } from '@/components/auth/LoginScreen';

export default function RootPage() {
  const { isAuthenticated, setIsAuthenticated, currentRoute, navigateTo } = useApp();
  const [unauthView, setUnauthView] = useState<'login' | 'register'>('login');

  // Synchronize unauthenticated sub-view if currentRoute changes externally
  React.useEffect(() => {
    if (currentRoute === 'registration') {
      setUnauthView('register');
    } else if (currentRoute === 'login') {
      setUnauthView('login');
    }
  }, [currentRoute]);

  // If unauthenticated: strictly render entry flow (defaulting to LoginScreen)
  if (!isAuthenticated) {
    if (currentRoute === 'registration' || unauthView === 'register') {
      return (
        <RegistrationScreen
          onBackToLogin={() => {
            setUnauthView('login');
            navigateTo('login');
          }}
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
        onOpenRegister={() => {
          setUnauthView('register');
          navigateTo('registration');
        }}
      />
    );
  }

  // If authenticated: render full Super Admin Dashboard
  return (
    <AdminShell
      onSignOut={() => {
        setIsAuthenticated(false);
        setUnauthView('login');
        navigateTo('login');
      }}
    />
  );
}

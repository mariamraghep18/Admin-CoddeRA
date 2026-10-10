'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { OverviewScreen } from '@/components/screens/OverviewScreen';
import { StudentsScreen } from '@/components/screens/StudentsScreen';
import { StudentParentManagedScreen } from '@/components/screens/StudentParentManagedScreen';
import { StudentOrgManagedScreen } from '@/components/screens/StudentOrgManagedScreen';
import { ParentsScreen } from '@/components/screens/ParentsScreen';
import { IndividualsScreen } from '@/components/screens/IndividualsScreen';
import { OrganizationsScreen } from '@/components/screens/OrganizationsScreen';
import { OrganizationDetailScreen } from '@/components/screens/OrganizationDetailScreen';
import { MentorsScreen } from '@/components/screens/MentorsScreen';
import { PendingReviewsScreen } from '@/components/screens/PendingReviewsScreen';
import { VideoReviewStudioScreen } from '@/components/screens/VideoReviewStudioScreen';
import { OrgStep1ReviewScreen } from '@/components/screens/OrgStep1ReviewScreen';
import { OrgStep2ReviewScreen } from '@/components/screens/OrgStep2ReviewScreen';
import { AIReportsScreen } from '@/components/screens/AIReportsScreen';
import { ContentHierarchyScreen } from '@/components/screens/ContentHierarchyScreen';
import { VideoStepsScreen } from '@/components/screens/VideoStepsScreen';
import { TaskAuthoringScreen } from '@/components/screens/TaskAuthoringScreen';
import { IndividualContentScreen } from '@/components/screens/IndividualContentScreen';
import { OrdersScreen } from '@/components/screens/OrdersScreen';
import { OrderDetailScreen } from '@/components/screens/OrderDetailScreen';
import { PromotionsScreen } from '@/components/screens/PromotionsScreen';
import { ReferralsScreen } from '@/components/screens/ReferralsScreen';
import { AnalyticsScreen } from '@/components/screens/AnalyticsScreen';
import { AdministrationScreen } from '@/components/screens/AdministrationScreen';
import { UserProfileScreen } from '@/components/screens/UserProfileScreen';
import { AccountSettingsScreen } from '@/components/screens/AccountSettingsScreen';
import { SecuritySettingsScreen } from '@/components/screens/SecuritySettingsScreen';
import { NotificationCenterScreen } from '@/components/screens/NotificationCenterScreen';
import { RegistrationScreen } from '@/components/auth/RegistrationScreen';
import { LoginScreen } from '@/components/auth/LoginScreen';

export function AppScreenRouter() {
  const { currentRoute, navigateTo } = useApp();

  switch (currentRoute) {
    case 'overview':
      return <OverviewScreen />;
    case 'students':
      return <StudentsScreen />;
    case 'student-parent-managed':
      return <StudentParentManagedScreen />;
    case 'student-org-managed':
      return <StudentOrgManagedScreen />;
    case 'parents':
      return <ParentsScreen />;
    case 'individuals':
      return <IndividualsScreen />;
    case 'organizations':
      return <OrganizationsScreen />;
    case 'org-detail':
      return <OrganizationDetailScreen />;
    case 'mentors':
      return <MentorsScreen />;
    case 'pending-reviews':
      return <PendingReviewsScreen />;
    case 'verification-studio':
      return <VideoReviewStudioScreen />;
    case 'org-step-1':
      return <OrgStep1ReviewScreen />;
    case 'org-step-2':
      return <OrgStep2ReviewScreen />;
    case 'ai-reports':
      return <AIReportsScreen />;
    case 'curriculum-hierarchy':
      return <ContentHierarchyScreen />;
    case 'video-authoring':
      return <VideoStepsScreen />;
    case 'tasks-studio':
      return <TaskAuthoringScreen />;
    case 'individual-content':
      return <IndividualContentScreen />;
    case 'payments':
      return <OrdersScreen />;
    case 'order-deep-dive':
      return <OrderDetailScreen />;
    case 'promotions':
      return <PromotionsScreen />;
    case 'referrals':
      return <ReferralsScreen />;
    case 'analytics-certificates':
      return <AnalyticsScreen />;
    case 'administration':
      return <AdministrationScreen />;
    case 'user-profile':
      return <UserProfileScreen />;
    case 'account-settings':
      return <AccountSettingsScreen />;
    case 'security-settings':
      return <SecuritySettingsScreen />;
    case 'notification-center':
      return <NotificationCenterScreen />;
    case 'registration':
      return <RegistrationScreen onBackToLogin={() => navigateTo('login')} onCompleteRegistration={() => navigateTo('overview')} />;
    case 'login':
    case 'forgot-password':
      return <LoginScreen onLoginSuccess={() => navigateTo('overview')} onOpenRegister={() => navigateTo('registration')} />;
    default:
      return <OverviewScreen />;
  }
}

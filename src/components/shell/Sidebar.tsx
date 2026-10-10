'use client';

import React from 'react';
import { useApp, RouteId } from '@/context/AppContext';
import {
  LayoutDashboard,
  Users,
  Building2,
  UserCheck,
  Video,
  FileCheck,
  Sparkles,
  BookOpen,
  CreditCard,
  Percent,
  Share2,
  GraduationCap,
  ShieldAlert,
  Code2,
  Layers,
  ChevronRight,
  HeartHandshake,
  UserCircle,
  FileSpreadsheet,
  User,
  Settings,
  KeyRound,
  Bell,
} from 'lucide-react';
import { Badge } from '@/components/common/Badge';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onSignOut?: () => void;
}

interface NavItemDef {
  label: string;
  route: RouteId;
  icon: React.ReactNode;
  badge?: string;
  badgeVariant?: 'primary' | 'danger' | 'purple' | 'success';
}

interface NavGroupDef {
  title: string;
  items: NavItemDef[];
}

export function Sidebar({ isMobileOpen, onCloseMobile, onSignOut: _onSignOut }: SidebarProps) {
  const {
    language,
    role,
    t,
    isRtl,
    currentRoute,
    navigateTo,
    isRouteAllowedForRole,
  } = useApp();

  const navigationSections: NavGroupDef[] = [
    {
      title: t.navGroup.core,
      items: [
        { label: t.nav.overview, route: 'overview', icon: <LayoutDashboard className="w-4 h-4" /> },
      ],
    },
    {
      title: t.navGroup.people,
      items: [
        { label: t.nav.students, route: 'students', icon: <Users className="w-4 h-4" />, badge: '1,284' },
        { label: t.nav.parents, route: 'parents', icon: <HeartHandshake className="w-4 h-4" /> },
        { label: t.nav.individuals, route: 'individuals', icon: <UserCircle className="w-4 h-4" /> },
        { label: t.nav.organizations, route: 'organizations', icon: <Building2 className="w-4 h-4" />, badge: '318' },
        { label: t.nav.mentors, route: 'mentors', icon: <UserCheck className="w-4 h-4" />, badge: '620' },
      ],
    },
    {
      title: t.navGroup.operations,
      items: [
        {
          label: t.nav.reviews,
          route: 'pending-reviews',
          icon: <FileCheck className="w-4 h-4" />,
          badge: '46',
          badgeVariant: 'danger',
        },
        { label: t.nav.videoReview, route: 'verification-studio', icon: <Video className="w-4 h-4" /> },
        { label: t.nav.orgStep1, route: 'org-step-1', icon: <Building2 className="w-4 h-4" /> },
        { label: t.nav.orgStep2, route: 'org-step-2', icon: <Layers className="w-4 h-4" /> },
        { label: t.nav.aiReports, route: 'ai-reports', icon: <Sparkles className="w-4 h-4" /> },
      ],
    },
    {
      title: t.navGroup.content,
      items: [
        { label: t.nav.curriculum, route: 'curriculum-hierarchy', icon: <BookOpen className="w-4 h-4" /> },
        { label: t.nav.videoAuthoring, route: 'video-authoring', icon: <Video className="w-4 h-4" /> },
        { label: t.nav.taskAuthoring, route: 'tasks-studio', icon: <Code2 className="w-4 h-4" /> },
        { label: t.nav.individualContent, route: 'individual-content', icon: <Layers className="w-4 h-4" /> },
      ],
    },
    {
      title: t.navGroup.financials,
      items: [
        { label: t.nav.orders, route: 'payments', icon: <CreditCard className="w-4 h-4" /> },
        { label: t.nav.orderDetail, route: 'order-deep-dive', icon: <FileSpreadsheet className="w-4 h-4" /> },
        { label: t.nav.promotions, route: 'promotions', icon: <Percent className="w-4 h-4" /> },
        { label: t.nav.referrals, route: 'referrals', icon: <Share2 className="w-4 h-4" /> },
      ],
    },
    {
      title: t.navGroup.governance,
      items: [
        { label: t.nav.analytics, route: 'analytics-certificates', icon: <GraduationCap className="w-4 h-4" /> },
        { label: t.nav.administration, route: 'administration', icon: <ShieldAlert className="w-4 h-4" /> },
      ],
    },
    {
      title: language === 'ar' ? 'الحساب والنظام' : 'ACCOUNT & PREFERENCES',
      items: [
        { label: language === 'ar' ? 'الملف الشخصي' : 'User Profile', route: 'user-profile', icon: <User className="w-4 h-4" /> },
        { label: language === 'ar' ? 'إعدادات الحساب' : 'Account Settings', route: 'account-settings', icon: <Settings className="w-4 h-4" /> },
        { label: language === 'ar' ? 'أمان الجلسة' : 'Security & 2FA', route: 'security-settings', icon: <KeyRound className="w-4 h-4" /> },
        { label: language === 'ar' ? 'مركز الإشعارات' : 'Notification Hub', route: 'notification-center', icon: <Bell className="w-4 h-4" /> },
      ],
    },
  ];

  // Filter sections and items according to current role permissions
  const filteredSections = navigationSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => isRouteAllowedForRole(item.route, role)),
    }))
    .filter((section) => section.items.length > 0);

  const handleItemClick = (route: RouteId) => {
    navigateTo(route);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Brand Header with Exact Prompt Container Specification */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={() => handleItemClick('overview')}
          className="text-left cursor-pointer group transition-opacity hover:opacity-90 w-full"
        >
          <div className="flex items-center gap-3">
            {/* Clean Vector Brand Logo (Transparent background, no grey borders or frames) */}
            <div className="flex items-center justify-center bg-transparent shrink-0">
              <img
                src="/assets/logo.svg"
                alt="CodeRa Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="truncate">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CodeRa</span>
            </div>
          </div>
        </button>
      </div>

      {/* Role Indicator Banner */}
      <div className="px-4 py-2.5 bg-slate-50/70 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
          {language === 'ar' ? 'المنصب النشط:' : 'Current Role:'}
        </span>
        <Badge
          variant={
            role === 'Super Admin (Full Governance)'
              ? 'primary'
              : role.includes('KYC')
              ? 'purple'
              : 'success'
          }
          size="sm"
          dot
          className="truncate max-w-[150px]"
        >
          {role.split(' ')[0]}
        </Badge>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {filteredSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              {section.title}
            </h4>
            {section.items.map((item) => {
              const isActive =
                currentRoute === item.route ||
                (item.route === 'students' &&
                  (currentRoute === 'student-parent-managed' || currentRoute === 'student-org-managed')) ||
                (item.route === 'organizations' && currentRoute === 'org-detail');

              return (
                <button
                  key={item.route}
                  onClick={() => handleItemClick(item.route)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-600/15 dark:text-blue-400 font-bold shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`shrink-0 transition-colors ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] rounded-full font-semibold shrink-0 ${
                        item.badgeVariant === 'danger'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 animate-pulse'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : isActive ? (
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 ${
                        isRtl ? 'rotate-180' : ''
                      }`}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Minimal System Status Footer */}
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            {language === 'ar' ? 'النظام: متصل ومستقر' : 'System: Operational'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">v0.1.0</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Drawer */}
      <aside
        className={`hidden lg:block fixed top-0 bottom-0 z-40 w-64 ${
          isRtl ? 'right-0 border-l border-r-0' : 'left-0 border-r border-l-0'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Overlay Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div
            className={`relative w-72 max-w-[85vw] h-full z-10 animate-in ${
              isRtl ? 'slide-in-from-right mr-auto' : 'slide-in-from-left'
            }`}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { useApp, UserRole, RouteId } from '@/context/AppContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  ShieldCheck,
  CheckCircle,
  Menu,
  LogOut,
  User,
  Settings,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/common/Badge';

interface TopHeaderProps {
  onToggleMobileSidebar: () => void;
  onSignOut?: () => void;
}

export function TopHeader({ onToggleMobileSidebar, onSignOut }: TopHeaderProps) {
  const {
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    role,
    setRole,
    t,
    isRtl,
    setIsCommandPaletteOpen,
    notifications,
    unreadNotificationsCount,
    markNotificationsAsRead,
    currentRoute,
    navigateTo,
    user,
    logout,
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const roles: UserRole[] = [
    'Super Admin',
    'KYC Reviewer',
    'Content & QA',
    'Super Admin (Full Governance)',
    'Sub-Admin (KYC & Student Verification)',
    'Sub-Admin (Content & QA)',
  ];

  // Dynamic Breadcrumb based on currentRoute
  const breadcrumbs = React.useMemo(() => {
    const list: { label: string; route: RouteId }[] = [
      { label: t.brand.name, route: 'overview' },
    ];

    switch (currentRoute) {
      case 'overview':
        list.push({ label: t.nav.overview, route: 'overview' });
        break;
      case 'students':
        list.push({ label: t.nav.students, route: 'students' });
        break;
      case 'student-parent-managed':
        list.push({ label: t.nav.students, route: 'students' });
        list.push({ label: 'Ahmed Hassan (Family)', route: 'student-parent-managed' });
        break;
      case 'student-org-managed':
        list.push({ label: t.nav.students, route: 'students' });
        list.push({ label: 'Youssef Ibrahim (School)', route: 'student-org-managed' });
        break;
      case 'parents':
        list.push({ label: t.nav.parents, route: 'parents' });
        break;
      case 'individuals':
        list.push({ label: t.nav.individuals, route: 'individuals' });
        break;
      case 'organizations':
        list.push({ label: t.nav.organizations, route: 'organizations' });
        break;
      case 'org-detail':
        list.push({ label: t.nav.organizations, route: 'organizations' });
        list.push({ label: 'Hope Academy 360', route: 'org-detail' });
        break;
      case 'mentors':
        list.push({ label: t.nav.mentors, route: 'mentors' });
        break;
      case 'pending-reviews':
        list.push({ label: t.nav.reviews, route: 'pending-reviews' });
        break;
      case 'verification-studio':
        list.push({ label: t.nav.reviews, route: 'pending-reviews' });
        list.push({ label: t.nav.videoReview, route: 'verification-studio' });
        break;
      case 'org-step-1':
        list.push({ label: t.nav.reviews, route: 'pending-reviews' });
        list.push({ label: t.nav.orgStep1, route: 'org-step-1' });
        break;
      case 'org-step-2':
        list.push({ label: t.nav.reviews, route: 'pending-reviews' });
        list.push({ label: t.nav.orgStep2, route: 'org-step-2' });
        break;
      case 'ai-reports':
        list.push({ label: t.nav.reviews, route: 'pending-reviews' });
        list.push({ label: t.nav.aiReports, route: 'ai-reports' });
        break;
      case 'curriculum-hierarchy':
        list.push({ label: t.navGroup.content, route: 'curriculum-hierarchy' });
        list.push({ label: t.nav.curriculum, route: 'curriculum-hierarchy' });
        break;
      case 'video-authoring':
        list.push({ label: t.navGroup.content, route: 'curriculum-hierarchy' });
        list.push({ label: t.nav.videoAuthoring, route: 'video-authoring' });
        break;
      case 'tasks-studio':
        list.push({ label: t.navGroup.content, route: 'curriculum-hierarchy' });
        list.push({ label: t.nav.taskAuthoring, route: 'tasks-studio' });
        break;
      case 'individual-content':
        list.push({ label: t.navGroup.content, route: 'curriculum-hierarchy' });
        list.push({ label: t.nav.individualContent, route: 'individual-content' });
        break;
      case 'payments':
        list.push({ label: t.navGroup.financials, route: 'payments' });
        list.push({ label: t.nav.orders, route: 'payments' });
        break;
      case 'order-deep-dive':
        list.push({ label: t.navGroup.financials, route: 'payments' });
        list.push({ label: t.nav.orderDetail, route: 'order-deep-dive' });
        break;
      case 'promotions':
        list.push({ label: t.navGroup.financials, route: 'payments' });
        list.push({ label: t.nav.promotions, route: 'promotions' });
        break;
      case 'referrals':
        list.push({ label: t.navGroup.financials, route: 'payments' });
        list.push({ label: t.nav.referrals, route: 'referrals' });
        break;
      case 'analytics-certificates':
        list.push({ label: t.nav.analytics, route: 'analytics-certificates' });
        break;
      case 'administration':
        list.push({ label: t.nav.administration, route: 'administration' });
        break;
      default:
        list.push({ label: t.nav.overview, route: 'overview' });
    }

    return list;
  }, [currentRoute, t]);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 overflow-hidden whitespace-nowrap">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.route + idx}>
                {idx > 0 && <span className="text-slate-300 dark:text-slate-600">/</span>}
                <button
                  onClick={() => navigateTo(crumb.route)}
                  className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer ${
                    idx === breadcrumbs.length - 1
                      ? 'font-bold text-slate-900 dark:text-slate-100'
                      : ''
                  }`}
                >
                  {crumb.label}
                </button>
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Center: Command Palette Trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden md:flex items-center justify-between w-64 lg:w-96 px-3.5 py-1.5 text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl transition-all cursor-pointer shadow-2xs group"
        >
          <span className="flex items-center gap-2 group-hover:text-slate-600 dark:group-hover:text-slate-300">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            <span>{t.topbar.searchPlaceholder}</span>
          </span>
          <kbd className="px-1.5 py-0.5 font-mono text-[10px] text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Right: Role Switcher, Language, Theme, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Functional Role Switcher Dropdown Pill per Section 1.3 */}
          <div className="relative">
            <button
              onClick={() => {
                setIsRoleDropdownOpen(!isRoleDropdownOpen);
                setIsNotifOpen(false);
                setIsProfileOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="max-w-[130px] sm:max-w-none truncate">
                {role.split(' ')[0]} ▾
              </span>
            </button>

            {isRoleDropdownOpen && (
              <div
                className={`absolute ${
                  isRtl ? 'left-0' : 'right-0'
                } mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in`}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  {t.topbar.roleSimulator}
                </div>
                <div className="py-1 space-y-1">
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl text-left transition-colors cursor-pointer ${
                        role === r
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{r}</span>
                      {role === r && <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher Button */}
          <button
            id="header-btn-lang"
            onClick={toggleLanguage}
            title={t.topbar.switchLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{language === 'en' ? 'العربية (RTL)' : 'English (LTR)'}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? t.topbar.lightMode : t.topbar.darkMode}
            className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsRoleDropdownOpen(false);
                setIsProfileOpen(false);
                if (unreadNotificationsCount > 0) markNotificationsAsRead();
              }}
              className="relative p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {isNotifOpen && (
              <div
                className={`absolute ${
                  isRtl ? 'left-0' : 'right-0'
                } mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in`}
              >
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {t.topbar.notifications}
                  </span>
                  <Badge variant="primary" size="sm">
                    {notifications.length} Total
                  </Badge>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        setIsNotifOpen(false);
                        if (n.route) navigateTo(n.route);
                      }}
                      className="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer block"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {language === 'ar' ? n.titleAr : n.title}
                        </p>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1" />}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                    </button>
                  ))}
                </div>

                <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsNotifOpen(false);
                      navigateTo('notification-center');
                    }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <span>{language === 'ar' ? 'عرض جميع الإشعارات في المركز' : 'Open Notification Center'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsRoleDropdownOpen(false);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200 dark:border-slate-800 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'KZ'}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {user?.name || t.topbar.adminProfile}
                </p>
                <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[130px]">
                  {role.split(' ')[0]}
                </p>
              </div>
            </button>

            {isProfileOpen && (
              <div
                className={`absolute ${
                  isRtl ? 'left-0' : 'right-0'
                } mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in space-y-2`}
              >
                <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      {user?.name || t.topbar.adminProfile}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle className="w-2.5 h-2.5" />
                      {language === 'ar' ? 'معتمد' : 'Verified'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">
                    {user?.email || 'admin@codera.academy'}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                      {role}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {language === 'ar' ? 'حالة التوثيق: نشط' : 'KYC: Approved'}
                    </span>
                  </div>
                </div>

                {/* Profile Menu Links */}
                <div className="space-y-1 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigateTo('user-profile');
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-blue-500" />
                      <span>{language === 'ar' ? 'عرض وتعديل الملف الشخصي' : 'View / Edit Profile'}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigateTo('account-settings');
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="w-3.5 h-3.5 text-slate-500" />
                      <span>{language === 'ar' ? 'إعدادات الحساب' : 'Account Settings'}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigateTo('security-settings');
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-3.5 h-3.5 text-purple-500" />
                      <span>{language === 'ar' ? 'إعدادات الأمان والمصادقة' : 'Security Settings'}</span>
                    </div>
                  </button>

                  {/* Language Preference Control */}
                  <button
                    type="button"
                    onClick={() => {
                      toggleLanguage();
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{language === 'ar' ? 'تفضيل اللغة' : 'Language Preference'}</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                      {language === 'ar' ? 'العربية' : 'English'}
                    </span>
                  </button>

                  {/* Theme Preference Control */}
                  <button
                    type="button"
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-medium"
                  >
                    <div className="flex items-center gap-2">
                      {theme === 'dark' ? (
                        <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      ) : (
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                      )}
                      <span>{language === 'ar' ? 'تفضيل المظهر' : 'Theme Preference'}</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 capitalize">
                      {theme}
                    </span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    id="topheader-sign-out"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsProfileOpen(false);
                      if (onSignOut) {
                        onSignOut();
                      } else {
                        logout();
                      }
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{language === 'ar' ? 'تسجيل الخروج من الجلسة' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

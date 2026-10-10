'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useApp, RouteId } from '@/context/AppContext';
import {
  Search,
  Users,
  Building2,
  Video,
  FileCheck,
  CreditCard,
  GraduationCap,
  Sparkles,
  BookOpen,
  ShieldAlert,
  ArrowRight,
  UserCheck,
  Globe,
  Moon,
  Sun,
  X,
  User,
  Settings,
  KeyRound,
  Bell,
} from 'lucide-react';

interface PaletteItem {
  id: string;
  label: string;
  labelAr: string;
  category: string;
  icon: React.ReactNode;
  route: RouteId;
  params?: Record<string, any>;
}

export function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    students,
    organizations,
    orders,
    language,
    toggleLanguage,
    toggleTheme,
    theme,
    navigateTo,
    isRtl,
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  // Keyboard shortcut Cmd/Ctrl + K & ESC handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  const items = useMemo<PaletteItem[]>(() => {
    const list: PaletteItem[] = [
      // Navigation
      { id: 'p-1', label: 'Overview Dashboard', labelAr: 'لوحة التحكم العامة', category: 'Navigation', icon: <GraduationCap className="w-4 h-4 text-blue-500" />, route: 'overview' },
      { id: 'p-2', label: 'Students Master Directory', labelAr: 'دليل الطلاب الرئيسي', category: 'Navigation', icon: <Users className="w-4 h-4 text-blue-500" />, route: 'students' },
      { id: 'p-3', label: 'Ahmed Hassan (Parent-Managed Profile)', labelAr: 'أحمد حسن (ملف طالب مدار عائلياً)', category: 'Students', icon: <Users className="w-4 h-4 text-emerald-500" />, route: 'student-parent-managed', params: { id: 'STU-8821' } },
      { id: 'p-4', label: 'Youssef Ibrahim (Org-Managed Profile)', labelAr: 'يوسف إبراهيم (ملف طالب مدرسي)', category: 'Students', icon: <Users className="w-4 h-4 text-purple-500" />, route: 'student-org-managed', params: { id: 'STU-8822' } },
      { id: 'p-5', label: 'Organizations & Schools Hub', labelAr: 'دليل المدارس والمؤسسات', category: 'Navigation', icon: <Building2 className="w-4 h-4 text-blue-500" />, route: 'organizations' },
      { id: 'p-6', label: 'Hope Academy 360 Workspace', labelAr: 'مساحة عمل أكاديمية الأمل 360', category: 'Organizations', icon: <Building2 className="w-4 h-4 text-amber-500" />, route: 'org-detail', params: { id: 'ORG-HOPE-01' } },
      { id: 'p-7', label: 'Mentors Directory & Workload', labelAr: 'دليل الموجهين ومصفوفة الأعباء', category: 'Navigation', icon: <UserCheck className="w-4 h-4 text-blue-500" />, route: 'mentors' },
      { id: 'p-8', label: 'Pending Reviews Hub (QA Command)', labelAr: 'مركز المراجعات المعلقة', category: 'Reviews', icon: <FileCheck className="w-4 h-4 text-rose-500" />, route: 'pending-reviews' },
      { id: 'p-9', label: 'Student Video QA Studio (Ahmed Hassan)', labelAr: 'استوديو فحص فيديو الطالب (أحمد حسن)', category: 'Reviews', icon: <Video className="w-4 h-4 text-rose-500" />, route: 'verification-studio', params: { id: 'STU-8821' } },
      { id: 'p-10', label: 'Noor School Step 1 KYC Review', labelAr: 'مراجعة توثيق مدرسة النور (الخطوة 1)', category: 'Reviews', icon: <FileCheck className="w-4 h-4 text-amber-500" />, route: 'org-step-1', params: { id: 'ORG-NOOR-01' } },
      { id: 'p-11', label: 'Bright Centre Step 2 Lab Review', labelAr: 'مراجعة معامل مركز برايت (الخطوة 2)', category: 'Reviews', icon: <FileCheck className="w-4 h-4 text-emerald-500" />, route: 'org-step-2', params: { id: 'ORG-BRIGHT-02' } },
      { id: 'p-12', label: 'AI Proctoring & Plagiarism Reports', labelAr: 'تقارير المراقبة والذكاء الاصطناعي', category: 'Reviews', icon: <Sparkles className="w-4 h-4 text-indigo-500" />, route: 'ai-reports' },
      { id: 'p-13', label: 'Learner Hierarchy Curriculum Tree', labelAr: 'شجرة هيكل المنهج التعليمي', category: 'Curriculum', icon: <BookOpen className="w-4 h-4 text-teal-500" />, route: 'curriculum-hierarchy' },
      { id: 'p-14', label: 'Video Steps Authoring Studio', labelAr: 'إعداد خطوات الدروس المرئية', category: 'Curriculum', icon: <Video className="w-4 h-4 text-teal-500" />, route: 'video-authoring' },
      { id: 'p-15', label: 'Shared Tasks & Challenge Studio', labelAr: 'استوديو تأليف المهام المشتركة', category: 'Curriculum', icon: <BookOpen className="w-4 h-4 text-teal-500" />, route: 'tasks-studio' },
      { id: 'p-16', label: 'Payments & Order Ledger', labelAr: 'سجل المدفوعات والطلبات', category: 'Financials', icon: <CreditCard className="w-4 h-4 text-blue-500" />, route: 'payments' },
      { id: 'p-17', label: 'Order Deep-Dive (ORD-1048 Breakdown)', labelAr: 'تفاصيل العملية المالية ORD-1048', category: 'Financials', icon: <CreditCard className="w-4 h-4 text-emerald-500" />, route: 'order-deep-dive', params: { id: 'ORD-1048' } },
      { id: 'p-18', label: 'Promotions Engine & Coupons', labelAr: 'محرك الكوبونات والعروض', category: 'Financials', icon: <Sparkles className="w-4 h-4 text-amber-500" />, route: 'promotions' },
      { id: 'p-19', label: 'Analytics & Live Certificate Inspector', labelAr: 'التحليلات ومدقق الشهادات المباشر', category: 'Governance', icon: <GraduationCap className="w-4 h-4 text-purple-500" />, route: 'analytics-certificates' },
      { id: 'p-20', label: 'Administration Governance & RBAC', labelAr: 'حوكمة الصلاحيات والمشرفين', category: 'Governance', icon: <ShieldAlert className="w-4 h-4 text-slate-500" />, route: 'administration' },
      { id: 'p-21', label: 'User Profile & Identity Details', labelAr: 'الملف الشخصي للمسؤول', category: 'Account', icon: <User className="w-4 h-4 text-blue-500" />, route: 'user-profile' },
      { id: 'p-22', label: 'Account & Workspace Settings', labelAr: 'إعدادات الحساب وبيئة العمل', category: 'Account', icon: <Settings className="w-4 h-4 text-slate-500" />, route: 'account-settings' },
      { id: 'p-23', label: 'Security & Two-Factor Authentication', labelAr: 'أمان الجلسة والمصادقة الثنائية', category: 'Account', icon: <KeyRound className="w-4 h-4 text-purple-500" />, route: 'security-settings' },
      { id: 'p-24', label: 'Administrative Notification Center', labelAr: 'مركز الإشعارات والتنبيهات', category: 'Account', icon: <Bell className="w-4 h-4 text-indigo-500" />, route: 'notification-center' },
    ];

    // Append students dynamically
    students.forEach((s) => {
      list.push({
        id: `stu-${s.id}`,
        label: `${s.name} (${s.level}) - ${s.type}`,
        labelAr: `${s.nameAr} (${s.level})`,
        category: 'Learners',
        icon: <Users className="w-4 h-4 text-blue-400" />,
        route: s.type === 'org-managed' ? 'student-org-managed' : 'student-parent-managed',
        params: { id: s.id },
      });
    });

    // Append organizations dynamically
    organizations.forEach((org) => {
      list.push({
        id: `org-${org.id}`,
        label: `${org.name} - ${org.tier} (${org.contractStatus})`,
        labelAr: `${org.nameAr}`,
        category: 'Organizations',
        icon: <Building2 className="w-4 h-4 text-amber-500" />,
        route: 'org-detail',
        params: { id: org.id },
      });
    });

    return list;
  }, [students, organizations]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items.slice(0, 10);
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.labelAr && item.labelAr.includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  const handleSelect = (item: PaletteItem) => {
    setIsCommandPaletteOpen(false);
    navigateTo(item.route, item.params);
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCommandPaletteOpen(false)}
      />

      {/* Palette Panel */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              language === 'ar'
                ? 'ابحث عن طالب، مدرسة، موجه، رقم طلب، أو انتقل لشاشة محددة...'
                : 'Search any student, school, mentor, order number, or jump to screen...'
            }
            autoFocus
            className="w-full px-3 py-4 text-base bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Quick Actions Ribbon */}
        <div className="px-4 py-2 bg-slate-50/70 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">
            {language === 'ar' ? 'إجراءات سريعة فورية:' : 'Quick System Actions:'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleLanguage()}
              className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>{language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}</span>
            </button>
            <button
              onClick={() => toggleTheme()}
              className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-50 cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
              )}
              <span>{theme === 'dark' ? 'Light Canvas' : 'Dark Obsidian'}</span>
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
              {language === 'ar' ? 'لا توجد نتائج مطابقة لبحثك' : 'No matching results found for this query.'}
            </div>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-blue-50/70 dark:hover:bg-slate-800/70 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {language === 'ar' && item.labelAr ? item.labelAr : item.label}
                    </p>
                    <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>
                <ArrowRight
                  className={`w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform ${
                    isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

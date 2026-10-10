'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Settings,
  Globe,
  Moon,
  Sun,
  Bell,
  Clock,
  Save,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Shield,
  Laptop,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function AccountSettingsScreen() {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    t,
    isRtl,
    showToast,
    addAuditLog,
  } = useApp();

  const [timezone, setTimezone] = useState('Africa/Cairo (UTC+2)');
  const [notifyOnKyc, setNotifyOnKyc] = useState(true);
  const [notifyOnRefund, setNotifyOnRefund] = useState(true);
  const [notifyDailyDigest, setNotifyDailyDigest] = useState(false);
  const [autoLockMinutes, setAutoLockMinutes] = useState('30');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addAuditLog('Updated account workspace preferences', 'تحديث تفضيلات الحساب ونظام الإشعارات');
    showToast(isRtl ? 'تم حفظ التفضيلات بنجاح' : 'Account preferences saved successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === 'ar' ? 'إعدادات الحساب وبيئة العمل' : 'Account & Workspace Settings'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'ar'
              ? 'تخصيص اللغة والمظهر والمنطقة الزمنية وتفضيلات الإشعارات الإدارية'
              : 'Customize language, display mode, regional timezone, and notification channels'}
          </p>
        </div>
        <Badge variant="primary" size="md">
          {language === 'ar' ? 'إعدادات نشطة' : 'Active Preferences'}
        </Badge>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: Regional & Display Settings */}
        <Card>
          <CardHeader
            title={language === 'ar' ? 'اللغة والمظهر والمنطقة الزمنية' : 'Localization & Appearance'}
            subtitle={language === 'ar' ? 'خيارات الواجهة والتوقيت الإداري' : 'System interface language and time presentation'}
          />
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Language Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>{language === 'ar' ? 'لغة الواجهة' : 'Platform Language'}</span>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="en">English (LTR)</option>
                  <option value="ar">العربية (RTL)</option>
                </select>
              </div>

              {/* Theme Mode */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  {theme === 'dark' ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  <span>{language === 'ar' ? 'وضع العرض' : 'Display Theme'}</span>
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="light">{language === 'ar' ? 'الوضع النهاري (Light)' : 'Light Canvas (#FBFBFA)'}</option>
                  <option value="dark">{language === 'ar' ? 'الوضع الليلي (Dark)' : 'Dark Canvas (#0B0F19)'}</option>
                </select>
              </div>

              {/* Timezone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>{language === 'ar' ? 'المنطقة الزمنية' : 'System Timezone'}</span>
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="Africa/Cairo (UTC+2)">Africa/Cairo (UTC+2)</option>
                  <option value="Asia/Riyadh (UTC+3)">Asia/Riyadh (UTC+3)</option>
                  <option value="Asia/Dubai (UTC+4)">Asia/Dubai (UTC+4)</option>
                  <option value="Europe/London (UTC+0)">Europe/London (UTC+0)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Notification Channels */}
        <Card>
          <CardHeader
            title={language === 'ar' ? 'تفضيلات الإشعارات والتنبيهات' : 'Administrative Notification Triggers'}
            subtitle={language === 'ar' ? 'تحديد الأحداث التي تتطلب إرسال تنبيه فوري' : 'Configure realtime audit events and operational dispatches'}
          />
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'تنبيهات مراجعات الطلاب والمؤسسات (KYC)' : 'Student Video & School KYC Submissions'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {language === 'ar' ? 'إشعار فوري عند رفع فيديو جديد أو مستندات الخطوة 1 و 2' : 'Real-time alert when new verification submissions arrive in queue'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifyOnKyc}
                onChange={(e) => setNotifyOnKyc(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'طلبات الاسترداد المالي والمطالبات الكبرى' : 'High-Value Financial Reversals & Refunds'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {language === 'ar' ? 'إرسال إشعار أمني عند تنفيذ استرداد يفوق 1,000 ج.م' : 'Dispatches security warning for financial orders above threshold'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifyOnRefund}
                onChange={(e) => setNotifyOnRefund(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'التقرير اليومي الموجز للعمليات' : 'Daily Executive Operations Digest'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {language === 'ar' ? 'ملخص صباحي بجميع الإحصائيات ونسب الحضور والاشتراكات' : 'Daily summary of student enrollments and platform uptime metrics'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifyDailyDigest}
                onChange={(e) => setNotifyDailyDigest(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Session Timeout & Auto-Lock */}
        <Card>
          <CardHeader
            title={language === 'ar' ? 'أمان الجلسة والإغلاق التلقائي' : 'Session Timeout & Workstation Guard'}
            subtitle={language === 'ar' ? 'حماية شاشة الحوكمة في حال عدم النشاط' : 'Inactive screen lock policies for administrative terminals'}
          />
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'مهلة قفل الجلسة عند عدم النشاط' : 'Inactivity Screen Lock Timeout'}
                </p>
                <p className="text-[11px] text-slate-500">
                  {language === 'ar' ? 'تأمين الجلسة وطلب إعادة إدخال بيانات المرور' : 'Requires authentication pin after idle interval'}
                </p>
              </div>
              <select
                value={autoLockMinutes}
                onChange={(e) => setAutoLockMinutes(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <option value="15">15 {language === 'ar' ? 'دقيقة' : 'Minutes'}</option>
                <option value="30">30 {language === 'ar' ? 'دقيقة' : 'Minutes'}</option>
                <option value="60">60 {language === 'ar' ? 'دقيقة' : 'Minutes'}</option>
                <option value="never">{language === 'ar' ? 'عدم الإغلاق (وضع العرض)' : 'Never (Demo Mode)'}</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Save Action */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" size="sm" type="button" onClick={() => showToast('Preferences reset to default', 'info')}>
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            {language === 'ar' ? 'استعادة الافتراضي' : 'Reset Defaults'}
          </Button>
          <Button variant="primary" size="sm" type="submit">
            <Save className="w-3.5 h-3.5 mr-1" />
            {language === 'ar' ? 'حفظ إعدادات الحساب' : 'Save Account Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}

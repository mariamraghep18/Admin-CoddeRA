'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Bell,
  CheckCircle2,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Video,
  CreditCard,
  Building2,
  Filter,
  Check,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function NotificationCenterScreen() {
  const {
    notifications,
    markNotificationsAsRead,
    unreadNotificationsCount,
    language,
    isRtl,
    navigateTo,
    showToast,
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'unread' | 'kyc' | 'video'>('all');

  const filtered = notifications.filter((n) => {
    if (filterType === 'unread') return n.unread;
    if (filterType === 'kyc') return n.type === 'kyc';
    if (filterType === 'video') return n.type === 'video';
    return true;
  });

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-blue-500" />;
      case 'kyc':
        return <Building2 className="w-4 h-4 text-indigo-500" />;
      case 'order':
        return <CreditCard className="w-4 h-4 text-emerald-500" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Mark All Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {language === 'ar' ? 'مركز الإشعارات والتنبيهات' : 'Administrative Notification Center'}
            </h1>
            {unreadNotificationsCount > 0 && (
              <Badge variant="danger" size="sm">
                {unreadNotificationsCount} {language === 'ar' ? 'جديد' : 'Unread'}
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'ar'
              ? 'متابعة تدفق طلبات التوثيق وفيديوهات الطلاب والعمليات الإدارية الفورية'
              : 'Realtime administrative dispatches, student review queues, and security alerts'}
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              markNotificationsAsRead();
              showToast(language === 'ar' ? 'تم تعيين جميع الإشعارات كمقروءة' : 'All notifications marked as read', 'info');
            }}
          >
            <Check className="w-3.5 h-3.5 mr-1" />
            {language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark All as Read'}
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
          }`}
        >
          {language === 'ar' ? 'جميع الإشعارات' : 'All Notifications'} ({notifications.length})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('unread')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'unread'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
          }`}
        >
          {language === 'ar' ? 'غير المقروءة' : 'Unread Only'} ({unreadNotificationsCount})
        </button>

        <button
          type="button"
          onClick={() => setFilterType('kyc')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'kyc'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
          }`}
        >
          {language === 'ar' ? 'توثيق المؤسسات (KYC)' : 'School KYC'}
        </button>

        <button
          type="button"
          onClick={() => setFilterType('video')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'video'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
          }`}
        >
          {language === 'ar' ? 'فيديوهات الطلاب' : 'Student Videos'}
        </button>
      </div>

      {/* Notifications List Card */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          {filtered.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Bell className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'لا توجد إشعارات حالياً' : 'No notifications in this filter'}
              </p>
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'جميع طوابير المراجعة والإجراءات الإدارية محدثة' : 'All review queues are caught up and clear.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border transition-all gap-3 ${
                    item.unread
                      ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 shadow-2xs'
                      : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 shrink-0 shadow-2xs mt-0.5">
                      {getCategoryIcon(item.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">
                          {language === 'ar' ? item.titleAr : item.title}
                        </p>
                        {item.unread && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {item.timestamp} • Dispatch ID #{item.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {item.route && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigateTo(item.route!)}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {language === 'ar' ? 'فتح الطابور' : 'Open Review'}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

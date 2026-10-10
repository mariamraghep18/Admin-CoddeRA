'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Users,
  Building2,
  UserCheck,
  ShieldAlert,
  FileCheck,
  Video,
  Download,
  Layers,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  Server,
  Cpu,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function OverviewScreen() {
  const { t, language, isRtl, showToast, auditLogs, role, navigateTo } = useApp();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'ytd'>('30d');
  const [activeSegment, setActiveSegment] = useState<'all' | 'parent' | 'org' | 'indiv'>('all');

  // Dynamic metrics depending on time range
  const metrics = useMemo(() => {
    switch (timeRange) {
      case '7d':
        return {
          totalStudents: '1,284',
          studentsGrowth: '+4.2%',
          activeMentors: '620',
          mentorSla: '96%',
          partnerOrgs: '318',
          pendingReviews: '56 / 94',
          cairoSessionHours: '1,420 hrs',
        };
      case '30d':
        return {
          totalStudents: '1,284',
          studentsGrowth: '+12.8%',
          activeMentors: '620',
          mentorSla: '94%',
          partnerOrgs: '318',
          pendingReviews: '56 / 94',
          cairoSessionHours: '5,840 hrs',
        };
      case 'ytd':
        return {
          totalStudents: '1,284',
          studentsGrowth: '+84.5%',
          activeMentors: '620',
          mentorSla: '98%',
          partnerOrgs: '318',
          pendingReviews: '56 / 94',
          cairoSessionHours: '42,910 hrs',
        };
    }
  }, [timeRange]);

  // Dynamic activity chart bars
  const weeklyData = useMemo(() => {
    const multiplier = timeRange === '7d' ? 1 : timeRange === '30d' ? 1.3 : 1.8;
    return [
      { day: 'Mon', dayAr: 'الإثنين', parent: Math.round(320 * multiplier), org: Math.round(510 * multiplier), indiv: Math.round(140 * multiplier), total: Math.round(970 * multiplier) },
      { day: 'Tue', dayAr: 'الثلاثاء', parent: Math.round(340 * multiplier), org: Math.round(580 * multiplier), indiv: Math.round(160 * multiplier), total: Math.round(1080 * multiplier) },
      { day: 'Wed', dayAr: 'الأربعاء', parent: Math.round(410 * multiplier), org: Math.round(620 * multiplier), indiv: Math.round(190 * multiplier), total: Math.round(1220 * multiplier) },
      { day: 'Thu', dayAr: 'الخميس', parent: Math.round(390 * multiplier), org: Math.round(690 * multiplier), indiv: Math.round(180 * multiplier), total: Math.round(1260 * multiplier) },
      { day: 'Fri', dayAr: 'الجمعة', parent: Math.round(460 * multiplier), org: Math.round(520 * multiplier), indiv: Math.round(230 * multiplier), total: Math.round(1210 * multiplier) },
      { day: 'Sat', dayAr: 'السبت', parent: Math.round(510 * multiplier), org: Math.round(480 * multiplier), indiv: Math.round(260 * multiplier), total: Math.round(1250 * multiplier) },
      { day: 'Sun', dayAr: 'الأحد', parent: Math.round(480 * multiplier), org: Math.round(590 * multiplier), indiv: Math.round(214 * multiplier), total: Math.round(1284 * multiplier) },
    ];
  }, [timeRange]);

  // Real client-side CSV Report Generation and Download via Secure W3C Blob API
  const handleExport = () => {
    const csvRows = [
      ['Metric', 'Value', 'Timeframe', 'Tenant Scope', 'Operational SLA'],
      ['Total Active Students', metrics.totalStudents, timeRange.toUpperCase(), 'All Tenants', 'Active Normal'],
      ['School-Managed Students', '760', timeRange.toUpperCase(), 'Schools / Orgs', 'Accredited'],
      ['Parent-Managed Students', '432', timeRange.toUpperCase(), 'B2C Family', 'Active SLA'],
      ['Individual Learners', '92', timeRange.toUpperCase(), 'Self-Paced Teens', 'Active Normal'],
      ['Active Vetted Mentors', metrics.activeMentors, timeRange.toUpperCase(), 'Mentors Pool', `${metrics.mentorSla} Availability`],
      ['Partner Institutions', metrics.partnerOrgs, timeRange.toUpperCase(), '14 Governorates', 'Tier 1 Certified'],
      ['Pending QA Verifications', metrics.pendingReviews, timeRange.toUpperCase(), 'Reviews Queue', 'Action Required'],
      ['Video Submissions Queued', '32', timeRange.toUpperCase(), 'Student QA Studio', 'Reviewing'],
      ['School KYC Intake (Step 1)', '8', timeRange.toUpperCase(), 'Legal Review', 'Pending'],
      ['Lab & Tech Readiness (Step 2)', '6', timeRange.toUpperCase(), 'Hardware Review', 'Pending'],
      ['Platform Uptime', '99.98%', timeRange.toUpperCase(), 'AWS Cairo Node', 'Operational'],
    ];

    const csvContent = csvRows.map((e) => e.map((val) => `"${val}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `CodeRa_Platform_Report_${new Date().toISOString().split('T')[0]}_${timeRange.toUpperCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      language === 'ar'
        ? `تم تجهيز تقرير العمليات وتصديره بصيغة CSV بنجاح (${timeRange.toUpperCase()})`
        : `Platform Operational Report (${timeRange.toUpperCase()}) exported and downloaded as CSV`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t.nav.overview}
            </h1>
            <Badge variant="primary" size="sm">
              Live Production
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.topbar.welcomeMessage}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Date Filter Range */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 text-xs shadow-2xs">
            <button
              onClick={() => {
                setTimeRange('7d');
                showToast(language === 'ar' ? 'تم تحديث النطاق الزمني: آخر 7 أيام' : 'Filtered to: 7 Days', 'info');
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                timeRange === '7d'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => {
                setTimeRange('30d');
                showToast(language === 'ar' ? 'تم تحديث النطاق الزمني: آخر 30 يوماً' : 'Filtered to: 30 Days', 'info');
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                timeRange === '30d'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => {
                setTimeRange('ytd');
                showToast(language === 'ar' ? 'تم تحديث النطاق الزمني: منذ بداية العام (YTD)' : 'Filtered to: YTD', 'info');
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                timeRange === 'ytd'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              YTD
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={handleExport}
          >
            {t.topbar.exportData}
          </Button>
        </div>
      </div>

      {/* Primary 4-Column KPI Cards Grid (Clickable into Screens) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <Card
          hoverable
          onClick={() => navigateTo('students')}
          className="border-l-4 border-l-blue-600 dark:border-l-blue-500 cursor-pointer"
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.overview.totalStudents}
              </span>
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {metrics.totalStudents}
              </span>
              <Badge variant="success" size="sm" className="font-bold">
                {metrics.studentsGrowth} {t.overview.vsLastMonth}
              </Badge>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
              <span>760 Schools • 524 B2C</span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-0.5">
                View Hub →
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Active Mentors */}
        <Card
          hoverable
          onClick={() => navigateTo('mentors')}
          className="border-l-4 border-l-emerald-600 dark:border-l-emerald-500 cursor-pointer"
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.overview.activeMentors}
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {metrics.activeMentors}
              </span>
              <Badge variant="success" size="sm" className="font-bold">
                {metrics.mentorSla} {t.overview.availabilityScore}
              </Badge>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
              <span>SLA Avg 3.2 hrs • 98% Rating</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                Workload →
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Partner Organizations */}
        <Card
          hoverable
          onClick={() => navigateTo('organizations')}
          className="border-l-4 border-l-amber-600 dark:border-l-amber-500 cursor-pointer"
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">
                {t.overview.partnerOrgs}
              </span>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {metrics.partnerOrgs}
              </span>
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                {t.overview.acrossRegions}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Cairo, Alex, Giza & Delta</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-0.5">
                Partners →
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Pending Verifications */}
        <Card
          hoverable
          onClick={() => navigateTo('pending-reviews')}
          className="border-l-4 border-l-rose-600 dark:border-l-rose-500 bg-rose-50/20 dark:bg-rose-950/10 cursor-pointer"
        >
          <CardContent className="p-5">
            <div className="flex items-center justify-between text-rose-700 dark:text-rose-400">
              <span className="text-xs font-bold uppercase tracking-wider">
                {t.overview.pendingVerifications}
              </span>
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-4 h-4 animate-bounce" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
                {metrics.pendingReviews}
              </span>
              <Badge variant="danger" size="sm" dot>
                {t.overview.requiresAction}
              </Badge>
            </div>
            <div className="mt-2 text-[11px] text-rose-600/80 font-medium flex items-center justify-between">
              <span>32 Videos • 8 Step 1 • 6 Step 2</span>
              <span className="font-bold flex items-center gap-0.5">Queue →</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Alert Action Cards (Direct Jumps to Review Queues as Specified in Section 3.2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Student Verification Queue -> verification-studio */}
        <button
          onClick={() => navigateTo('verification-studio')}
          className="group text-left cursor-pointer w-full"
        >
          <Card hoverable className="p-4 border border-rose-200 dark:border-rose-900/50 bg-linear-to-br from-white to-rose-50/30 dark:from-slate-900 dark:to-rose-950/20 h-full">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t.overview.alertStudentVideos}
                  </h4>
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                    32 {t.overview.pendingCount}
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              Automated facial match confidence scores prepared for reviewer verification.
            </p>
          </Card>
        </button>

        {/* Org Step 1 Queue -> org-step-1 */}
        <button
          onClick={() => navigateTo('org-step-1')}
          className="group text-left cursor-pointer w-full"
        >
          <Card hoverable className="p-4 border border-amber-200 dark:border-amber-900/50 bg-linear-to-br from-white to-amber-50/30 dark:from-slate-900 dark:to-amber-950/20 h-full">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t.overview.alertOrgStep1}
                  </h4>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                    8 {t.overview.pendingCount}
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              Noor School, Al-Farabi Modern Academy and 6 other schools waiting legal review.
            </p>
          </Card>
        </button>

        {/* Org Step 2 Queue -> org-step-2 */}
        <button
          onClick={() => navigateTo('org-step-2')}
          className="group text-left cursor-pointer w-full"
        >
          <Card hoverable className="p-4 border border-blue-200 dark:border-blue-900/50 bg-linear-to-br from-white to-blue-50/30 dark:from-slate-900 dark:to-blue-950/20 h-full">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {t.overview.alertOrgStep2}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">
                    6 {t.overview.pendingCount}
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              Bright Centre and 5 other certified labs waiting final operational sign-off.
            </p>
          </Card>
        </button>
      </div>

      {/* Main Grid: Interactive Activity Chart & Operational Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Learner Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader
            title={t.overview.activityChartTitle}
            subtitle={t.overview.activityChartSubtitle}
            action={
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
                <button
                  onClick={() => setActiveSegment('all')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    activeSegment === 'all'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t.common.all}
                </button>
                <button
                  onClick={() => setActiveSegment('parent')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    activeSegment === 'parent'
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t.overview.parentManaged}
                </button>
                <button
                  onClick={() => setActiveSegment('org')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    activeSegment === 'org'
                      ? 'bg-indigo-600 text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t.overview.orgManaged}
                </button>
                <button
                  onClick={() => setActiveSegment('indiv')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    activeSegment === 'indiv'
                      ? 'bg-purple-600 text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t.overview.individualLearners}
                </button>
              </div>
            }
          />
          <CardContent className="space-y-6">
            {/* Custom Interactive SVG/Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2">
              {weeklyData.map((d, idx) => {
                const heightPercent = Math.min(100, Math.round((d.total / 1400) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[10px] font-mono text-slate-400 group-hover:text-blue-600 group-hover:font-bold transition-colors">
                      {d.total}
                    </div>
                    <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800 rounded-t-lg h-48 flex flex-col justify-end overflow-hidden p-1">
                      {activeSegment === 'all' ? (
                        <div className="w-full space-y-0.5 rounded-t">
                          <div
                            style={{ height: `${(d.org / d.total) * heightPercent * 1.6}px` }}
                            className="w-full bg-blue-600 rounded-xs transition-all group-hover:brightness-110"
                            title={`School: ${d.org} hrs`}
                          />
                          <div
                            style={{ height: `${(d.parent / d.total) * heightPercent * 1.6}px` }}
                            className="w-full bg-indigo-500 rounded-xs transition-all group-hover:brightness-110"
                            title={`Parent: ${d.parent} hrs`}
                          />
                          <div
                            style={{ height: `${(d.indiv / d.total) * heightPercent * 1.6}px` }}
                            className="w-full bg-purple-400 rounded-xs transition-all group-hover:brightness-110"
                            title={`Individual: ${d.indiv} hrs`}
                          />
                        </div>
                      ) : activeSegment === 'org' ? (
                        <div
                          style={{ height: `${(d.org / 700) * 150}px` }}
                          className="w-full bg-blue-600 rounded-t transition-all group-hover:brightness-110"
                          title={`School: ${d.org} hrs`}
                        />
                      ) : activeSegment === 'parent' ? (
                        <div
                          style={{ height: `${(d.parent / 700) * 150}px` }}
                          className="w-full bg-indigo-500 rounded-t transition-all group-hover:brightness-110"
                          title={`Parent: ${d.parent} hrs`}
                        />
                      ) : (
                        <div
                          style={{ height: `${(d.indiv / 400) * 150}px` }}
                          className="w-full bg-purple-500 rounded-t transition-all group-hover:brightness-110"
                          title={`Individual: ${d.indiv} hrs`}
                        />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {language === 'ar' ? d.dayAr : d.day}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-blue-600" />
                <span className="text-slate-600 dark:text-slate-400">{t.overview.orgManaged}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-indigo-500" />
                <span className="text-slate-600 dark:text-slate-400">{t.overview.parentManaged}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-purple-400" />
                <span className="text-slate-600 dark:text-slate-400">{t.overview.individualLearners}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right 1 Col: Operational Systems Health Status */}
        <Card>
          <CardHeader
            title={t.overview.systemHealth}
            subtitle="Real-time multi-tenant health metrics"
            icon={<Activity className="w-4 h-4 text-emerald-500" />}
          />
          <CardContent className="space-y-4">
            {/* Service 1 */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-blue-500" />
                  {t.overview.databaseStatus}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {t.overview.healthy}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Latency: 14ms (Cairo Node)</span>
                <span>Active Conns: 412/1000</span>
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-indigo-500" />
                  {t.overview.videoTranscoderStatus}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {t.overview.active}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Transcoding queue: 3 jobs</span>
                <span>Bitrate: 1080p60 H.264</span>
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-500" />
                  {t.overview.aiVerifierStatus}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Nominal
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Avg Infer: 120ms</span>
                <span>Confidence Threshold: 92%</span>
              </div>
            </div>

            {/* Quick Action Button to Admin Governance */}
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-semibold"
              icon={<ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
              onClick={() => navigateTo('administration')}
            >
              {language === 'ar' ? 'فحص حوكمة الخوادم والصلاحيات' : 'Inspect Governance & Node RBAC'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Operational Audit Log Feed */}
      <Card>
        <CardHeader
          title={t.overview.realtimeAuditFeed}
          subtitle="Cryptographically signed activity trail"
          icon={<Clock className="w-4 h-4 text-blue-500" />}
          action={
            <Badge variant="primary" size="sm">
              Live Feed
            </Badge>
          }
        />
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
            {auditLogs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="p-3.5 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {language === 'ar' && log.actionAr ? log.actionAr : log.action}
                  </p>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="font-mono">{log.timestamp}</span>
                    <span>•</span>
                    <span>Admin: {log.adminName}</span>
                    <span>•</span>
                    <span className="font-mono text-[10px]">{log.ipAddress}</span>
                  </div>
                </div>

                <Badge
                  variant={
                    log.status === 'Success'
                      ? 'success'
                      : log.status === 'Warning'
                      ? 'warning'
                      : 'danger'
                  }
                  size="sm"
                >
                  {log.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

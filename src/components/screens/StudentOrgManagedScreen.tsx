'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  GraduationCap,
  Award,
  Video,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  QrCode,
  Download,
  Users,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function StudentOrgManagedScreen({ studentId = 'STU-8822' }: { studentId?: string }) {
  const { students, organizations, t, language, isRtl, navigateTo } = useApp();

  const student = students.find((s) => s.id === studentId) || students[1];
  const org = organizations.find((o) => o.id === student.organizationId) || organizations[0];

  return (
    <div className="space-y-6">
      {/* Top Notice Banner */}
      <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600 text-white rounded-lg">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-purple-900 dark:text-purple-200">
              {t.studentDetail.orgBanner}
            </h2>
            <p className="text-xs text-purple-700 dark:text-purple-400 mt-0.5">
              Institution: {student.organizationName} • Class: {student.organizationClass} • Proctor: Ms. Rana Magdy
            </p>
          </div>
        </div>
        <button
          onClick={() => navigateTo('org-detail', { id: org.id })}
          className="text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 rounded-lg hover:bg-purple-50 transition-colors shrink-0 cursor-pointer"
        >
          View Hope Academy 360 Workspace
        </button>
      </div>

      {/* Student Identity Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-purple-50 dark:ring-slate-800 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-black text-slate-900 dark:text-white">
                  {language === 'ar' ? student.nameAr : student.name}
                </h1>
                <Badge variant="purple" size="sm">
                  {student.organizationClass}
                </Badge>
                <Badge variant="success" size="sm" dot>
                  {t.common.verified}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                ID: {student.id} • Track: <span className="font-semibold text-slate-700 dark:text-slate-200">{student.track}</span> • School Ref: {org.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={<Award className="w-4 h-4" />}
              onClick={() => navigateTo('analytics-certificates')}
            >
              Inspect Certificate (CERT-CR-9921)
            </Button>
          </div>
        </div>
      </Card>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Organization Affiliation & Progress */}
        <div className="space-y-6">
          {/* Org & Assigned Level */}
          <Card>
            <CardHeader
              title="Enterprise School Affiliation"
              icon={<Building2 className="w-4 h-4" />}
            />
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Institution:</span>
                <span className="font-bold text-slate-900 dark:text-white">{org.name}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Assigned Cohort / Class:</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">{student.organizationClass}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Lead Teacher / Proctor:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Ms. Rana Magdy (Certified)</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Assigned CodeRa Mentor:</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">Ahmad Al-Farsi</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Billing Control:</span>
                <span className="flex items-center gap-1 text-slate-500 italic">
                  <Lock className="w-3.5 h-3.5" />
                  Read-Only (Managed via School Contract)
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Curriculum Milestones */}
          <Card>
            <CardHeader
              title="School Curriculum Milestones & In-Class Assessments"
              icon={<Award className="w-4 h-4" />}
            />
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                  <span>Classroom Curriculum Milestone 3/3</span>
                  <span className="text-purple-600 font-bold">{student.progress}% Completed</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${student.progress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Lab Tasks</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {student.completedExercises} / {student.totalExercises}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Class Quiz</span>
                  <span className="text-base font-black text-emerald-600">{student.quizScore}%</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Homework Rate</span>
                  <span className="text-base font-black text-blue-600">96.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Dual Verification Oversight & Certificate */}
        <div className="space-y-6">
          {/* Dual Verification Oversight */}
          <Card>
            <CardHeader
              title={t.studentDetail.dualVerificationOversight}
              icon={<FileCheck className="w-4 h-4" />}
            />
            <CardContent className="space-y-3.5 text-xs">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                      {t.studentDetail.schoolProctorSigned}
                    </span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                      Classroom lab proctoring session verified on Oct 05, 2026
                    </span>
                  </div>
                </div>
                <Badge variant="success" size="sm">SIGNED</Badge>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold text-blue-900 dark:text-blue-200 block">
                      {t.studentDetail.codeRaAdminSigned}
                    </span>
                    <span className="text-[11px] text-blue-700 dark:text-blue-400">
                      Super Admin QA sign-off granted on Oct 06, 2026
                    </span>
                  </div>
                </div>
                <Badge variant="primary" size="sm">SIGNED</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Issued Certificate Box */}
          <Card>
            <CardHeader
              title={t.studentDetail.certificateIssued}
              icon={<Award className="w-4 h-4 text-amber-500" />}
              action={
                <Badge variant="purple" size="sm">
                  CERT-CR-9921
                </Badge>
              }
            />
            <CardContent className="space-y-4">
              <div className="p-4 bg-linear-to-r from-amber-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:to-slate-800 border border-amber-200/80 dark:border-slate-700 rounded-xl">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block tracking-wider">
                      Official Certification of Mastery
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Level 1 Scratch & Python Foundations
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      Issued to: <span className="font-semibold text-slate-800 dark:text-slate-200">{student.name}</span> • Hope Academy
                    </p>
                    <p className="font-mono text-[10px] text-slate-400 pt-1">
                      Hash: 0x7F92...B91C4A (Immutable SHA-256)
                    </p>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0">
                    <QrCode className="w-12 h-12 text-slate-800 dark:text-slate-200" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Link href="/analytics">
                  <Button variant="primary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                    {t.studentDetail.inspectCertificate}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => alert('Certificate PDF downloaded!')}
                >
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

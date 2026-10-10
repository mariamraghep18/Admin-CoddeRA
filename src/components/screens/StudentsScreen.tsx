'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Filter,
  Users,
  GraduationCap,
  Building2,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function StudentsScreen() {
  const { students, t, language, isRtl, navigateTo } = useApp();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nameAr.includes(searchTerm) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.sponsorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.sponsorEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === 'all' || s.type === filterType;
      const matchesLevel = filterLevel === 'all' || s.levelNumber.toString() === filterLevel;
      const matchesStatus = filterStatus === 'all' || s.verificationStatus === filterStatus;

      return matchesSearch && matchesType && matchesLevel && matchesStatus;
    });
  }, [students, searchTerm, filterType, filterLevel, filterStatus]);

  const handleRowClick = (student: typeof students[0]) => {
    if (student.type === 'org-managed') {
      router.push(`/students/${student.id}/org-managed`);
    } else {
      router.push(`/students/${student.id}/parent-managed`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & KPI Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.students.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.students.subtitle}
          </p>
        </div>

        {/* KPI Summary Ribbon */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs shadow-2xs">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total</span>
            <span className="font-extrabold text-slate-900 dark:text-white">1,284</span>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-blue-500 block">School Enrolled</span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400">760</span>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-500 block">Parent & Indiv</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">524</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute top-3 left-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.students.searchPrompt}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Type */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="parent-managed">Parent-Managed</option>
              <option value="org-managed">Organization-Managed</option>
              <option value="individual">Individual Learner</option>
            </select>

            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Levels</option>
              <option value="1">Level 1 (Foundation)</option>
              <option value="2">Level 2 (Intermediate)</option>
              <option value="3">Level 3 (Advanced/AI)</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending QA</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Students Data Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">{t.students.colStudent}</th>
                <th className="py-3 px-4">{t.students.colSponsor}</th>
                <th className="py-3 px-4">{t.students.colLevel}</th>
                <th className="py-3 px-4">Assignments</th>
                <th className="py-3 px-4">{t.students.colQuiz}</th>
                <th className="py-3 px-4">{t.students.colStatus}</th>
                <th className="py-3 px-4 text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => handleRowClick(student)}
                  className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  {/* Student Identity */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {language === 'ar' ? student.nameAr : student.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span>{student.id}</span>
                          <span>•</span>
                          <span className="text-slate-500 font-medium">{student.track}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Sponsor / Relationship */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      {language === 'ar' ? student.sponsorNameAr : student.sponsorName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {student.type === 'org-managed' ? (
                        <span className="text-purple-600 dark:text-purple-400 font-medium">
                          {student.organizationClass}
                        </span>
                      ) : student.type === 'parent-managed' ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          Parent: {student.sponsorName}
                        </span>
                      ) : (
                        <span className="text-blue-600 dark:text-blue-400 font-medium">
                          Independent
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Level & Progress */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <span>{student.level}</span>
                      <span>{student.progress}%</span>
                    </div>
                    <div className="w-28 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </td>

                  {/* Exercises */}
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {student.completedExercises} / {student.totalExercises}
                  </td>

                  {/* Avg Quiz */}
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {student.quizScore}%
                  </td>

                  {/* Verification Status */}
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        student.verificationStatus === 'verified'
                          ? 'success'
                          : student.verificationStatus === 'pending'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                      dot
                    >
                      {student.verificationStatus.toUpperCase()}
                    </Badge>
                  </td>

                  {/* Action Link */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() =>
                        navigateTo(
                          student.type === 'org-managed'
                            ? 'student-org-managed'
                            : 'student-parent-managed',
                          { id: student.id }
                        )
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>{t.common.viewDossier}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

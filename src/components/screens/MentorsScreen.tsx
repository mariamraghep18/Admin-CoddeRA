'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  UserCheck,
  Star,
  Clock,
  Building2,
  Users,
  CreditCard,
  FileCheck,
  ExternalLink,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { initialMentors } from '@/data/mockData';

export function MentorsScreen() {
  const { t, language, isRtl, showToast, navigateTo } = useApp();
  const [mentors, setMentors] = useState(initialMentors);
  const [selectedMentorId, setSelectedMentorId] = useState<string>('MEN-101');

  const selectedMentor = mentors.find((m) => m.id === selectedMentorId) || mentors[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.nav.mentors}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Workload scoping, pedagogical response SLAs, student grading queues, and monthly compensation ledgers
        </p>
      </div>

      {/* Directory & Dossier Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Mentor Directory Table (7 Cols) */}
        <div className="xl:col-span-7">
          <Card className="overflow-hidden">
            <CardHeader
              title="Vetted Mentors Directory"
              subtitle="620 Active Mentors across CodeRa"
              icon={<UserCheck className="w-4 h-4" />}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Mentor Name</th>
                    <th className="py-3 px-4">Track Specialty</th>
                    <th className="py-3 px-4">Students</th>
                    <th className="py-3 px-4">Pending QA</th>
                    <th className="py-3 px-4">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {mentors.map((m) => {
                    const isSelected = m.id === selectedMentorId;
                    return (
                      <tr
                        key={m.id}
                        onClick={() => setSelectedMentorId(m.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 dark:bg-blue-950/40 font-medium'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={m.avatar}
                              alt={m.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">
                                {language === 'ar' ? m.nameAr : m.name}
                              </p>
                              <span className="text-[11px] text-slate-400">{m.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                          {m.specialtyTrack}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-blue-600">
                          {m.assignedStudentsCount}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant="warning" size="sm">
                            {m.activeReviewsPending} Queued
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{m.rating}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right: Selected Mentor Dossier Workspace (5 Cols) */}
        <div className="xl:col-span-5 space-y-4">
          <Card className="border-2 border-blue-500/20 dark:border-blue-500/30">
            <CardHeader
              title={`Mentor Dossier: ${selectedMentor.name}`}
              subtitle={`Member since ${selectedMentor.joinedDate}`}
              icon={<ShieldCheck className="w-4 h-4 text-blue-600" />}
            />
            <CardContent className="space-y-4 text-xs">
              {/* Top Metrics Ribbon */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Response SLA
                  </span>
                  <span className="text-base font-black text-emerald-600">
                    {selectedMentor.responseSLAHours} hrs avg
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Student Rating
                  </span>
                  <span className="text-base font-black text-amber-500">
                    ★ {selectedMentor.rating} / 5.0
                  </span>
                </div>
              </div>

              {/* Organization Linkage */}
              <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Assigned Partner Institutions
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedMentor.assignedOrganizations.map((orgName, idx) => (
                    <Badge key={idx} variant="primary" size="sm">
                      {orgName}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Pending Reviews Drawer */}
              <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-amber-600" />
                    Submissions Awaiting Grading
                  </span>
                  <Badge variant="warning" size="sm">
                    {selectedMentor.activeReviewsPending} Pending
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-500">
                  Ahmed Hassan (Turtle Loops), Mariam Zaid (Calculator), and 3 others assigned for weekly evaluation.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-1"
                  onClick={() => navigateTo('verification-studio', { id: 'STU-8821' })}
                >
                  Jump to Grading Queue
                </Button>
              </div>

              {/* Financial & Compensation Ledger */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Monthly Compensation Statement:</span>
                  <span className="font-black text-slate-900 dark:text-white text-sm">
                    ${selectedMentor.monthlyCompensation}.00 USD
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Calculated based on 42 active assigned students ($30/student base + SLA punctuality bonus).
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => showToast(`Dispatched SLA check notice to ${selectedMentor.name}`, 'success')}
                >
                  Adjust Mentor Workload Capacity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

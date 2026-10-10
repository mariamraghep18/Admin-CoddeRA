'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  UserCircle,
  GraduationCap,
  Award,
  Sparkles,
  Share2,
  Percent,
  CheckCircle2,
  Clock,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { initialIndividuals } from '@/data/mockData';

export function IndividualsScreen() {
  const { t, language, isRtl, showToast } = useApp();
  const [individuals, setIndividuals] = useState(initialIndividuals);
  const [selectedIndivId, setSelectedIndivId] = useState<string>('IND-901');

  const selectedIndiv = individuals.find((i) => i.id === selectedIndivId) || individuals[0];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.nav.individuals}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Independent self-paced teens & accelerated students navigating specialized coding modules
        </p>
      </div>

      {/* KPI Metric Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Self-Enrolled Learners
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">340</span>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
              <UserCircle className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Average Completion Rate
              </span>
              <span className="text-2xl font-black text-emerald-600">68.4%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <GraduationCap className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Coupon Conversion
              </span>
              <span className="text-2xl font-black text-blue-600">24.2%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <Percent className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Directory & Dossier Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Directory Table (7 Cols) */}
        <div className="xl:col-span-7">
          <Card className="overflow-hidden">
            <CardHeader
              title="Self-Paced Learners Roster"
              subtitle="Showing high-engagement independent learners"
              icon={<UserCircle className="w-4 h-4" />}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Learner</th>
                    <th className="py-3 px-4">Track</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4">Capstone</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {individuals.map((indiv) => {
                    const isSelected = indiv.id === selectedIndivId;
                    return (
                      <tr
                        key={indiv.id}
                        onClick={() => setSelectedIndivId(indiv.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 dark:bg-blue-950/40 font-medium'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {language === 'ar' ? indiv.nameAr : indiv.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Age {indiv.age} • {indiv.location}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                          {indiv.track}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-blue-600">{indiv.progress}%</span>
                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600"
                                style={{ width: `${indiv.progress}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          {indiv.capstoneSubmitted ? (
                            <Badge variant="success" size="sm">
                              Submitted
                            </Badge>
                          ) : (
                            <Badge variant="neutral" size="sm">
                              In Progress
                            </Badge>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant={indiv.completionStatus === 'Completed' ? 'success' : 'primary'}
                            size="sm"
                          >
                            {indiv.completionStatus}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right: Selected Dossier Workspace (5 Cols) */}
        <div className="xl:col-span-5 space-y-4">
          <Card className="border-2 border-purple-500/20 dark:border-purple-500/30">
            <CardHeader
              title={`Independent Dossier: ${selectedIndiv.name}`}
              subtitle={`${selectedIndiv.age} years old • Joined ${selectedIndiv.joinedDate}`}
              icon={<Sparkles className="w-4 h-4 text-purple-600" />}
            />
            <CardContent className="space-y-4 text-xs">
              {/* Personal Details */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                    {selectedIndiv.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                    {selectedIndiv.phone}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {selectedIndiv.location}
                  </span>
                </div>
              </div>

              {/* Curriculum Progress */}
              <div className="p-4 bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/60 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-purple-900 dark:text-purple-200">
                    {selectedIndiv.track}
                  </span>
                  <span className="text-purple-600">{selectedIndiv.progress}%</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Capstone Project: "Exploratory Data Analysis & Weather Prediction on Egyptian Meteorological Dataset"
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-slate-500">Capstone Status:</span>
                  <Badge variant="success" size="sm">
                    Verified Artifact
                  </Badge>
                </div>
              </div>

              {/* Promo & Referral Relations */}
              <div className="p-3.5 bg-blue-50/40 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Applied Coupon Code:</span>
                  <Badge variant="purple" size="sm">
                    {selectedIndiv.promoCodeUsed} (20% Off)
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Attribution Source:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {selectedIndiv.referrerName}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Link href="/content/individual" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Assign Advanced Module
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => showToast(`Dispatched feedback note to ${selectedIndiv.name}`, 'success')}
                >
                  Send Encouragement
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Layers,
  Sparkles,
  Zap,
  PlusCircle,
  Users,
  Clock,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function IndividualContentScreen() {
  const { t, language, isRtl, showToast } = useApp();

  const [modules, setModules] = useState([
    {
      id: 'MOD-IND-01',
      title: 'Python for Teen Data Scientists (Accelerated)',
      titleAr: 'بايثون لعلماء البيانات اليافعين (مسار مكثف)',
      level: 'Advanced',
      duration: '8 Weeks',
      enrolledCount: 142,
      status: 'Active',
      description: 'Pandas, Seaborn, Matplotlib, and real Kaggle datasets curated for teenagers.',
    },
    {
      id: 'MOD-IND-02',
      title: 'Competitive Algorithmic Thinking & USACO Prep',
      titleAr: 'التفكير الخوارزمي التنافسي والإعداد لأولمبياد المعلوماتية',
      level: 'Expert',
      duration: '12 Weeks',
      enrolledCount: 78,
      status: 'Active',
      description: 'Binary search, graph traversal, and dynamic programming heuristics.',
    },
    {
      id: 'MOD-IND-03',
      title: 'Building AI Chatbot Agents with OpenAI & LangChain',
      titleAr: 'بناء وكلاء الذكاء الاصطناعي والمحادثة',
      level: 'Intermediate',
      duration: '6 Weeks',
      enrolledCount: 120,
      status: 'Active',
      description: 'Prompt engineering, embeddings, and webhooks for young developers.',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.nav.individualContent}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Accelerated specialized tracks, competitive workshops, and open-enrollment modules for independent self-paced students
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<PlusCircle className="w-3.5 h-3.5" />}
          onClick={() => showToast('New accelerated module drafted', 'info')}
        >
          Create Standalone Module
        </Button>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <Card key={mod.id} hoverable className="flex flex-col justify-between">
            <CardHeader
              title={language === 'ar' ? mod.titleAr : mod.title}
              subtitle={mod.id}
              icon={<Zap className="w-4 h-4 text-amber-500" />}
              action={
                <Badge variant="purple" size="sm">
                  {mod.level}
                </Badge>
              }
            />
            <CardContent className="space-y-4 text-xs">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {mod.description}
              </p>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{mod.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Active Learners:</span>
                  <span className="font-bold text-blue-600">{mod.enrolledCount} Students</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Link href="/individuals" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    View Enrolled Roster
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => showToast(`Module ${mod.id} published to student catalog`, 'success')}
                >
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

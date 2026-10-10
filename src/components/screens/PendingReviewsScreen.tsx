'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  FileCheck,
  Video,
  Building2,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  ExternalLink,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function PendingReviewsScreen() {
  const { students, organizations, t, language, isRtl, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'video' | 'step1' | 'step2'>('video');

  // Video queue
  const videoQueue = [
    {
      id: 'STU-8821',
      name: 'Ahmed Hassan',
      nameAr: 'أحمد حسن',
      title: 'Python Turtle Recursion Demo & Star Fractal',
      duration: '02:45',
      date: '2026-10-08 14:22',
      aiScore: 98.2,
      risk: 'Low Risk',
    },
    {
      id: 'STU-8826',
      name: 'Mariam Zaid',
      nameAr: 'مريم زيد',
      title: 'Interactive Web Calculator with Theme Switcher',
      duration: '03:12',
      date: '2026-10-09 11:05',
      aiScore: 94.6,
      risk: 'Attention: Background Audio',
    },
    {
      id: 'STU-8825',
      name: 'Omar Tariq',
      nameAr: 'عمر طارق',
      title: 'Math Quiz Maze Runner in Scratch',
      duration: '02:05',
      date: '2026-09-30 09:40',
      aiScore: 95.0,
      risk: 'Low Risk',
    },
  ];

  // Org Step 1 Queue
  const step1Queue = [
    {
      id: 'ORG-NOOR-01',
      name: 'Noor School for Languages',
      nameAr: 'مدرسة النور الخاصة للغات',
      regNo: 'CR-881230',
      rep: 'Eng. Hisham Kamal',
      date: '2026-10-07',
      location: 'Sheikh Zayed, Giza',
    },
    {
      id: 'ORG-FARABI-02',
      name: 'Al-Farabi Modern Academy',
      nameAr: 'أكاديمية الفارابي الحديثة',
      regNo: 'CR-554109',
      rep: 'Dr. Sameh Ezzat',
      date: '2026-10-08',
      location: 'New Cairo, Egypt',
    },
  ];

  // Org Step 2 Queue
  const step2Queue = [
    {
      id: 'ORG-BRIGHT-02',
      name: 'Bright Centre for Tech & Innovation',
      nameAr: 'مركز برايت للتقنية والابتكار',
      hardware: '30 Workstations (Core i5 13th Gen, Gigabit Fiber)',
      teachers: '3 CS Faculty Certified',
      date: '2026-10-06',
      location: 'Smouha, Alexandria',
    },
    {
      id: 'ORG-STEM-03',
      name: 'STEM Hub Mansoura',
      nameAr: 'مركز ستيم المنصورة',
      hardware: '24 Workstations (Core i7, 200 Mbps)',
      teachers: '2 Robotics Instructors',
      date: '2026-10-08',
      location: 'Mansoura, Dakahlia',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.nav.reviews}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Quality Control Command Center: Human-in-the-loop triaging for student submissions, school KYC, and lab readiness
        </p>
      </div>

      {/* 3 Top Counter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Student Videos */}
        <Card
          hoverable
          onClick={() => setActiveTab('video')}
          className={`cursor-pointer transition-all ${
            activeTab === 'video'
              ? 'ring-2 ring-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
              : ''
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {t.overview.alertStudentVideos}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-rose-600 dark:text-rose-400">32</span>
                <span className="text-xs text-slate-400">queued</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600">
              <Video className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Org Step 1 */}
        <Card
          hoverable
          onClick={() => setActiveTab('step1')}
          className={`cursor-pointer transition-all ${
            activeTab === 'step1'
              ? 'ring-2 ring-amber-500 bg-amber-50/20 dark:bg-amber-950/20'
              : ''
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {t.overview.alertOrgStep1}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400">8</span>
                <span className="text-xs text-slate-400">schools</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600">
              <Building2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Org Step 2 */}
        <Card
          hoverable
          onClick={() => setActiveTab('step2')}
          className={`cursor-pointer transition-all ${
            activeTab === 'step2'
              ? 'ring-2 ring-blue-500 bg-blue-50/20 dark:bg-blue-950/20'
              : ''
          }`}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                {t.overview.alertOrgStep2}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">6</span>
                <span className="text-xs text-slate-400">centers</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600">
              <Layers className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Queue Display */}
      {activeTab === 'video' && (
        <Card>
          <CardHeader
            title="Section A: Parent-Managed Student Video Verification Queue"
            subtitle="Requires reviewer auditory and visual confirmation of authentic code demonstration"
            icon={<Video className="w-4 h-4 text-rose-600" />}
          />
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {videoQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {language === 'ar' ? item.nameAr : item.name}
                      </span>
                      <span className="text-xs font-mono text-slate-400">({item.id})</span>
                      <Badge variant="success" size="sm">
                        {item.aiScore}% AI Match
                      </Badge>
                      {item.risk.includes('Attention') && (
                        <Badge variant="warning" size="sm">
                          {item.risk}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      Project: "{item.title}"
                    </p>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3">
                      <span>Length: {item.duration}</span>
                      <span>•</span>
                      <span>Submitted: {item.date}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Play className="w-3.5 h-3.5" />}
                    onClick={() => navigateTo('verification-studio', { id: item.id })}
                  >
                    Launch Reviewer Studio
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'step1' && (
        <Card>
          <CardHeader
            title="Section B: Organization Step 1 Intake Queue (Identity & Entity KYC)"
            subtitle="Commercial registration certificates, tax IDs, and Ministry of Education accreditations"
            icon={<Building2 className="w-4 h-4 text-amber-600" />}
          />
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {step1Queue.map((school) => (
                <div
                  key={school.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {language === 'ar' ? school.nameAr : school.name}
                      </span>
                      <Badge variant="warning" size="sm">
                        Step 1 Pending
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Commercial Reg: <span className="font-mono font-semibold">{school.regNo}</span> • Representative: {school.rep}
                    </p>
                    <div className="text-[11px] text-slate-400">
                      Location: {school.location} • Submitted: {school.date}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={<FileCheck className="w-3.5 h-3.5" />}
                    onClick={() => navigateTo('org-step-1', { id: school.id })}
                  >
                    Audit Step 1 Documentation
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'step2' && (
        <Card>
          <CardHeader
            title="Section C: Organization Step 2 Curriculum Readiness Queue"
            subtitle="Computer lab hardware specifications, dedicated network lines, and CS teacher certifications"
            icon={<Layers className="w-4 h-4 text-blue-600" />}
          />
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {step2Queue.map((center) => (
                <div
                  key={center.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {language === 'ar' ? center.nameAr : center.name}
                      </span>
                      <Badge variant="primary" size="sm">
                        Step 2 Readiness
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Hardware: {center.hardware}
                    </p>
                    <div className="text-[11px] text-slate-400">
                      Faculty: {center.teachers} • Location: {center.location}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Layers className="w-3.5 h-3.5" />}
                    onClick={() => navigateTo('org-step-2', { id: center.id })}
                  >
                    Audit Lab & Hardware Specs
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

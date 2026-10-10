'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Users,
  HeartHandshake,
  ShieldCheck,
  Video,
  FileCode,
  Clock,
  Award,
  CreditCard,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Lock,
  Phone,
  Mail,
  MapPin,
  Bot,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function StudentParentManagedScreen({ studentId = 'STU-8821' }: { studentId?: string }) {
  const { students, updateStudentVerification, showToast, t, language, isRtl, navigateTo } = useApp();

  const student = students.find((s) => s.id === studentId) || students[0];

  const [safeSearchActive, setSafeSearchActive] = useState(student.safeSearchEnforced);
  const [kidSafeChatActive, setKidSafeChatActive] = useState(student.isAiChatbotKidSafe);
  const [isPlayingSandbox, setIsPlayingSandbox] = useState(false);
  const [sandboxOutput, setSandboxOutput] = useState<string | null>(null);

  const runCodeSimulation = () => {
    setIsPlayingSandbox(true);
    setTimeout(() => {
      setIsPlayingSandbox(false);
      setSandboxOutput(`>>> import turtle\n>>> t = turtle.Turtle()\n>>> draw_fractal_star(order=4, size=150)\n[OK] 4 Recursion layers rendered successfully in 0.42s!\n>>> Unit Test Assertions: 5/5 PASSED ✅`);
      showToast('Sandbox code execution completed with 5/5 tests passing!', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 text-white rounded-lg">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
              {t.studentDetail.parentBanner}
            </h2>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Sponsor: {student.sponsorName} ({student.sponsorPhone}) • Account Status: Active & Enrolled
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('parents')}
            className="text-xs font-semibold px-3 py-1.5 bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
          >
            View Parent Dossier (Fatima Hassan)
          </button>
        </div>
      </div>

      {/* Student Identity Header Card */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-50 dark:ring-slate-800 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-black text-slate-900 dark:text-white">
                  {language === 'ar' ? student.nameAr : student.name}
                </h1>
                <Badge variant="primary" size="sm">
                  {student.level}
                </Badge>
                <Badge
                  variant={student.verificationStatus === 'verified' ? 'success' : 'warning'}
                  size="sm"
                  dot
                >
                  {student.verificationStatus.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                ID: {student.id} • Track: <span className="font-semibold text-slate-700 dark:text-slate-200">{student.track}</span> • Enrolled: {student.registeredDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={<Video className="w-4 h-4" />}
              onClick={() => navigateTo('verification-studio', { id: student.id })}
            >
              Launch Video QA Studio
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<CreditCard className="w-4 h-4" />}
              onClick={() => navigateTo('order-deep-dive', { id: 'ORD-1048' })}
            >
              Order Receipts
            </Button>
          </div>
        </div>
      </Card>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Relationship, Learning Velocity, Mentor Log */}
        <div className="space-y-6">
          {/* Card 1: Relationship Overview */}
          <Card>
            <CardHeader
              title={t.studentDetail.contactInfo}
              icon={<Users className="w-4 h-4" />}
            />
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Parent / Guardian:</span>
                <span className="font-bold text-slate-900 dark:text-white">{student.sponsorName}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Verified Phone:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  {student.sponsorPhone}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Billing Email:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  {student.sponsorEmail}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-500 shrink-0">Home Address:</span>
                <span className="text-right text-slate-800 dark:text-slate-200 max-w-[280px]">
                  {student.sponsorAddress}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Learning Progress & Velocity */}
          <Card>
            <CardHeader
              title={t.studentDetail.progressMetrics}
              icon={<Award className="w-4 h-4" />}
            />
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {t.studentDetail.currentChapter}: Loops & Recursion
                  </span>
                  <span className="font-bold text-blue-600">{student.progress}% Complete</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Exercises
                  </span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {student.completedExercises} / {student.totalExercises}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Quiz Avg
                  </span>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    {student.quizScore}%
                  </span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Platform Time
                  </span>
                  <span className="text-base font-black text-purple-600 dark:text-purple-400">
                    {student.timeSpentHours}h
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Mentor Feedback Log */}
          <Card>
            <CardHeader
              title={t.studentDetail.mentorReviewLog}
              subtitle="Mentor: Ahmad Al-Farsi (Web & Python Senior)"
              icon={<HeartHandshake className="w-4 h-4" />}
            />
            <CardContent className="space-y-3">
              <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-blue-900 dark:text-blue-300">
                    {student.mentorName}
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
                    2 days ago
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{student.mentorFeedback}"
                </p>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">Student Feedback Rating:</span>
                <Badge variant="success" size="sm">
                  ★ 4.95 / 5.0 (Very High Engagement)
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Safety Settings, Video Demo & Sandbox, Orders */}
        <div className="space-y-6">
          {/* Card 1: AI Safety & Permissions */}
          <Card>
            <CardHeader
              title={t.studentDetail.aiSafetySettings}
              icon={<Bot className="w-4 h-4" />}
            />
            <CardContent className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {t.studentDetail.kidSafePrompt}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Strict child-protection filters & age-appropriate algorithmic hints
                  </p>
                </div>
                <button
                  onClick={() => {
                    setKidSafeChatActive(!kidSafeChatActive);
                    showToast('Updated AI kid-safe filter policy', 'info');
                  }}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    kidSafeChatActive ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      kidSafeChatActive ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {t.studentDetail.safeSearch}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Block external unvetted URLs in Code IDE web preview
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSafeSearchActive(!safeSearchActive);
                    showToast('Updated Safe-Search enforcement', 'info');
                  }}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    safeSearchActive ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      safeSearchActive ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Video Portfolio & Code Execution Output */}
          <Card>
            <CardHeader
              title={t.studentDetail.videoSubmission}
              subtitle={student.videoTitle}
              icon={<Video className="w-4 h-4" />}
              action={
                <Badge variant="success" size="sm">
                  {student.aiFacialMatch}% AI Match
                </Badge>
              }
            />
            <CardContent className="space-y-4">
              {/* Video Player Preview Box */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border border-slate-800 group">
                <video
                  src={student.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Interactive Code Sandbox Execution Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-blue-500" />
                    Student Python Artifact Sandbox
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={runCodeSimulation}
                    isLoading={isPlayingSandbox}
                    icon={<Play className="w-3.5 h-3.5 text-emerald-500" />}
                  >
                    Run Code Tests
                  </Button>
                </div>

                <div className="bg-slate-950 text-slate-200 font-mono text-[11px] p-3.5 rounded-xl border border-slate-800 overflow-x-auto min-h-[90px]">
                  {sandboxOutput ? (
                    <pre className="whitespace-pre-wrap text-emerald-400">{sandboxOutput}</pre>
                  ) : (
                    <div className="text-slate-500 italic">
                      Click "Run Code Tests" to simulate sandboxed headless execution against automated test suites.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Payments & Order Records */}
          <Card>
            <CardHeader
              title={t.studentDetail.orderHistory}
              icon={<CreditCard className="w-4 h-4" />}
            />
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t.studentDetail.activePlan}:</span>
                <span className="font-bold text-slate-900 dark:text-white">Family 2-Child Explorer Bundle</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t.studentDetail.renewalDate}:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">2027-01-15</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500">Related Order:</span>
                <Link
                  href="/financials/orders/ORD-1048"
                  className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>{t.studentDetail.viewInvoice}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

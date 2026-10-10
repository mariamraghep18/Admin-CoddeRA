'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Video,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw as ReRecordIcon,
  ShieldCheck,
  Send,
  MessageSquare,
  ChevronRight,
  FileCheck,
  User,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

export function VideoReviewStudioScreen({ studentId = 'STU-8821' }: { studentId?: string }) {
  const { students, updateStudentVerification, showToast, t, language, isRtl, navigateTo } = useApp();

  const student = students.find((s) => s.id === studentId) || students[0];

  // Video Player Controls State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(165); // 02:45
  const [playbackRate, setPlaybackRate] = useState(1);

  // Review Decision Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'accept' | 'rerecord' | 'reject'>('accept');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [presetReason, setPresetReason] = useState('Clear explanation of recursive loop');

  // Interactive Transcript
  const transcriptSegments = [
    { start: 0, end: 18, text: 'Hello, my name is Ahmed Hassan and this is my capstone for Python Turtle.' },
    { start: 19, end: 45, text: 'Here I defined a recursive function called draw_star that takes branches and length.' },
    { start: 46, end: 85, text: 'In each step, if the length is greater than 10, the turtle turns 144 degrees and calls itself.' },
    { start: 86, end: 130, text: 'When I run it with depth 4, it creates this fractal star pattern on the canvas.' },
    { start: 131, end: 165, text: 'I also added colors that change with each recursive branch level. Thank you!' },
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleScrub = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSpeedChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const openActionModal = (type: 'accept' | 'rerecord' | 'reject') => {
    setActionType(type);
    if (type === 'accept') {
      setPresetReason('Clear verbal explanation of code logic and authentic capstone execution.');
      setFeedbackNotes('Great job on mastering the recursion base case and visual parameters!');
    } else if (type === 'rerecord') {
      setPresetReason('Face not clearly visible during speech or background audio interference.');
      setFeedbackNotes('Please re-record in a well-lit room showing your face while explaining the draw_star function.');
    } else {
      setPresetReason('Plagiarism detected or third-party code demonstration without comprehension.');
      setFeedbackNotes('Submission did not demonstrate student comprehension of the algorithmic steps.');
    }
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (actionType === 'accept') {
      updateStudentVerification(student.id, 'verified', `${presetReason} - ${feedbackNotes}`);
      showToast(
        language === 'ar'
          ? `تم اعتماد فيديو الطالب ${student.name} بنجاح وإرسال إشعار لولي الأمر`
          : `Student ${student.name} submission ACCEPTED & verified successfully!`,
        'success'
      );
    } else if (actionType === 'rerecord') {
      updateStudentVerification(student.id, 'pending', `Re-record requested: ${presetReason} - ${feedbackNotes}`);
      showToast(
        language === 'ar'
          ? `تم طلب إعادة تسجيل الفيديو مع إرسال الملاحظات الإرشادية لولي الأمر`
          : `Re-record requested for ${student.name} with constructive parent feedback`,
        'warning'
      );
    } else {
      updateStudentVerification(student.id, 'flagged', `Rejected & Flagged: ${presetReason} - ${feedbackNotes}`);
      showToast(
        language === 'ar'
          ? `تم رفض الفيديو ووضع علامة تدقيق أمني على الحساب`
          : `Submission REJECTED and flagged for security review`,
        'error'
      );
    }
    setIsModalOpen(false);
  };

  const activeTranscriptIndex = transcriptSegments.findIndex(
    (seg) => currentTime >= seg.start && currentTime <= seg.end
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t.videoStudio.title}
            </h1>
            <Badge
              variant={
                student.verificationStatus === 'verified'
                  ? 'success'
                  : student.verificationStatus === 'flagged'
                  ? 'danger'
                  : 'warning'
              }
              size="sm"
              dot
            >
              {student.verificationStatus.toUpperCase()}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.videoStudio.subtitle}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigateTo('pending-reviews')}
        >
          Back to Queue
        </Button>
      </div>

      {/* Main Studio Grid: Left Media & Transcript (7 Cols) + Right Identity & Verdict (5 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Video Player & Synchronized Transcript (7 Cols) */}
        <div className="xl:col-span-7 space-y-4">
          {/* Custom Video Box */}
          <Card className="overflow-hidden border-slate-800 bg-slate-950">
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                src={student.videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              />

              {/* Center Play Overlay on pause */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute p-4 rounded-full bg-blue-600/90 text-white shadow-xl hover:bg-blue-600 hover:scale-110 transition-all cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </button>
              )}
            </div>

            {/* Controls Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-white">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={() => handleScrub(-5)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  title="Rewind 5s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleScrub(5)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
                  title="Forward 5s"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <span className="font-mono text-slate-400 text-[11px] ml-2">
                  {Math.floor(currentTime / 60)}:
                  {String(Math.floor(currentTime % 60)).padStart(2, '0')} / {student.videoDuration}
                </span>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
                {[1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handleSpeedChange(rate)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                      playbackRate === rate ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              {/* Audio Toggle */}
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </Card>

          {/* AI Transcribed Audio Segmenter */}
          <Card>
            <CardHeader
              title={t.videoStudio.transcriptTitle}
              subtitle="Synchronized speech-to-text with timestamp navigation"
              icon={<Sparkles className="w-4 h-4 text-purple-600" />}
            />
            <CardContent className="space-y-2 max-h-56 overflow-y-auto">
              {transcriptSegments.map((seg, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = seg.start;
                    }
                  }}
                  className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-start gap-3 ${
                    activeTranscriptIndex === idx
                      ? 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                    {Math.floor(seg.start / 60)}:{String(seg.start % 60).padStart(2, '0')}
                  </span>
                  <p className="text-slate-800 dark:text-slate-200">{seg.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Biometric Match, Metadata & Verdict Actions (5 Cols) */}
        <div className="xl:col-span-5 space-y-4">
          {/* Biometric Analysis Card */}
          <Card>
            <CardHeader
              title={t.videoStudio.aiEvaluationTitle}
              subtitle="Facial landmark vector comparison vs registered guardian profile"
              icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
            />
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                    Facial Liveness Match
                  </span>
                  <span className="text-2xl font-black text-emerald-950 dark:text-emerald-100">
                    {student.aiFacialMatch}%
                  </span>
                </div>
                <Badge variant="success" size="md">
                  High Confidence
                </Badge>
              </div>

              {/* Student Metadata Table */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Student Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {language === 'ar' ? student.nameAr : student.name}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Curriculum Track:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{student.track}</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Guardian / Sponsor:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{student.sponsorName}</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Assigned Mentor:</span>
                  <span className="font-medium text-blue-600">{student.mentorName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Submission Date:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    {student.videoSubmittedDate}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Verdict Buttons per Section 5 */}
          <Card>
            <CardHeader
              title={t.videoStudio.verdictTitle}
              subtitle="Human-in-the-loop QA sign-off triggers official badge update"
              icon={<CheckCircle2 className="w-4 h-4 text-blue-600" />}
            />
            <CardContent className="space-y-3">
              <Button
                variant="success"
                size="md"
                className="w-full"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={() => openActionModal('accept')}
              >
                Accept & Verify Student
              </Button>

              <Button
                variant="outline"
                size="md"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950/30"
                icon={<ReRecordIcon className="w-4 h-4" />}
                onClick={() => openActionModal('rerecord')}
              >
                Request Re-record
              </Button>

              <Button
                variant="danger"
                size="md"
                className="w-full"
                icon={<XCircle className="w-4 h-4" />}
                onClick={() => openActionModal('reject')}
              >
                Reject / Flag Fraud
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Review Confirmation Modal Dialog per Section 5 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          actionType === 'accept'
            ? 'Confirm Verification Approval'
            : actionType === 'rerecord'
            ? 'Request Video Re-record'
            : 'Reject & Flag Student Submission'
        }
        subtitle={`Review action for ${student.name} (${student.id})`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={
                actionType === 'accept'
                  ? 'success'
                  : actionType === 'rerecord'
                  ? 'primary'
                  : 'danger'
              }
              size="sm"
              onClick={handleConfirmAction}
              icon={<Send className="w-3.5 h-3.5" />}
            >
              Confirm Verdict
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 block">
              Standard Justification:
            </label>
            <input
              type="text"
              value={presetReason}
              onChange={(e) => setPresetReason(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 font-medium"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 block">
              Parent Guidance & Auditor Notes:
            </label>
            <textarea
              rows={3}
              value={feedbackNotes}
              onChange={(e) => setFeedbackNotes(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
            />
          </div>

          <div
            className={`p-3 rounded-xl border text-[11px] ${
              actionType === 'accept'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
                : actionType === 'rerecord'
                ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300'
                : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300'
            }`}
          >
            {actionType === 'accept'
              ? 'Status badge will immediately transition to VERIFIED, unlocking course certificates.'
              : actionType === 'rerecord'
              ? 'Status badge will remain PENDING, sending a constructive video checklist to the parent.'
              : 'Status badge will immediately transition to FLAGGED, alerting platform compliance.'}
          </div>
        </div>
      </Modal>
    </div>
  );
}

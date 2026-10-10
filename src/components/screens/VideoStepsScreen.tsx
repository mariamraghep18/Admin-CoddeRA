'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Video,
  Upload,
  PlusCircle,
  FileText,
  Clock,
  Code2,
  Trash2,
  ExternalLink,
  Sparkles,
  Play,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

export function VideoStepsScreen() {
  const { t, language, isRtl, showToast, navigateTo } = useApp();

  // Video Form
  const [videoTitle, setVideoTitle] = useState('Lesson 4.2: Mastering Recursion with Turtle Stars');
  const [videoSlug, setVideoSlug] = useState('lesson-4-2-mastering-recursion-turtle-stars');
  const [duration, setDuration] = useState('04:15');
  const [provider, setProvider] = useState<'Mux' | 'AWS S3' | 'Cloudflare Stream'>('Mux');
  const [videoUrl, setVideoUrl] = useState('https://stream.mux.com/7A892kLq881.m3u8');
  const [subtitlesFilename, setSubtitlesFilename] = useState('turtle_recursion_ar_en.vtt');

  // Attached Tasks
  const [attachedTasks, setAttachedTasks] = useState([
    {
      id: 'TSK-101',
      timestamp: '01:30',
      title: 'Identify Recursive Base Case',
      type: 'Multiple Choice',
      difficulty: 'Easy',
    },
    {
      id: 'TSK-102',
      timestamp: '03:15',
      title: 'Fill-In {{order}} Parameter Check',
      type: 'Fill In The Blank',
      difficulty: 'Medium',
    },
    {
      id: 'TSK-103',
      timestamp: '04:10',
      title: 'Star Fractal Sandbox Assertion',
      type: 'Code Sandbox Execution',
      difficulty: 'Hard',
    },
  ]);

  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTimestamp, setNewTaskTimestamp] = useState('02:00');
  const [newTaskType, setNewTaskType] = useState('Multiple Choice');

  const handleAttachTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: `TSK-${Date.now().toString().slice(-3)}`,
      timestamp: newTaskTimestamp,
      title: newTaskTitle,
      type: newTaskType,
      difficulty: 'Medium',
    };
    setAttachedTasks([...attachedTasks, newTask]);
    setIsAttachModalOpen(false);
    setNewTaskTitle('');
    showToast('Task challenge attached to video timestamp!', 'success');
  };

  const handleDeleteTask = (id: string) => {
    setAttachedTasks(attachedTasks.filter((t) => t.id !== id));
    showToast('Detached task challenge', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.nav.videoAuthoring}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Publish interactive video lessons with synchronized multi-lingual subtitles and timestamp-anchored tasks
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => showToast('Lesson metadata and attachments saved to production!', 'success')}
          >
            Publish Video Step
          </Button>
        </div>
      </div>

      {/* Grid: Video Authoring Form (6 Cols) + Attached Tasks at Timestamps (6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Video Metadata & Subtitles */}
        <Card>
          <CardHeader
            title="Video Step Metadata"
            subtitle="Configure streaming endpoints and captions"
            icon={<Video className="w-4 h-4 text-blue-600" />}
          />
          <CardContent className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Lesson Title:
              </label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Video Hosting Provider:
                </label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                >
                  <option value="Mux">Mux Video Stream</option>
                  <option value="Cloudflare Stream">Cloudflare Stream</option>
                  <option value="AWS S3">AWS S3 Signed HLS</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Estimated Duration:
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Stream HLS Endpoint URL:
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full p-2.5 font-mono text-[11px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Subtitle File */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  Attached Subtitle Track (.vtt / .srt)
                </span>
                <Badge variant="success" size="sm">
                  Active VTT
                </Badge>
              </div>
              <p className="font-mono text-[11px] text-slate-500">{subtitlesFilename}</p>
              <Button
                variant="outline"
                size="sm"
                icon={<Upload className="w-3.5 h-3.5" />}
                onClick={() => showToast('Simulated subtitles upload', 'info')}
              >
                Upload New Subtitle Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: Attached Tasks at Timestamps */}
        <Card>
          <CardHeader
            title="Attached Timestamp Tasks & Quizzes"
            subtitle="Challenges that pause video playback for student problem solving"
            icon={<Code2 className="w-4 h-4 text-purple-600" />}
            action={
              <Button
                variant="primary"
                size="sm"
                icon={<PlusCircle className="w-3.5 h-3.5" />}
                onClick={() => setIsAttachModalOpen(true)}
              >
                Attach Task
              </Button>
            }
          />
          <CardContent className="space-y-3">
            {attachedTasks.map((task) => (
              <div
                key={task.id}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between text-xs hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="px-2 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-bold rounded-lg text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{task.timestamp}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{task.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-400">{task.type}</span>
                      <span>•</span>
                      <Badge variant="neutral" size="sm">
                        {task.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateTo('tasks-studio')}
                  >
                    Edit
                  </Button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Attach Task Modal */}
      <Modal
        isOpen={isAttachModalOpen}
        onClose={() => setIsAttachModalOpen(false)}
        title="Attach Shared Challenge Definition"
        subtitle="Tie challenge to a specific playback timestamp"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAttachModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAttachTask}>
              Attach to Video
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Task Prompt / Title:
            </label>
            <input
              type="text"
              placeholder="e.g. Check recursion depth condition"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Pause Timestamp (MM:SS):
              </label>
              <input
                type="text"
                value={newTaskTimestamp}
                onChange={(e) => setNewTaskTimestamp(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Task Type:
              </label>
              <select
                value={newTaskType}
                onChange={(e) => setNewTaskType(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              >
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="Fill In The Blank">Fill in the Blank</option>
                <option value="Code Sandbox Execution">Code Sandbox Execution</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

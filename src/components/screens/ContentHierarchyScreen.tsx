'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  BookOpen,
  Layers,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  Edit3,
  Video,
  Code2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { curriculumTracks } from '@/data/mockData';

export function ContentHierarchyScreen() {
  const { t, language, isRtl, showToast } = useApp();
  const [tracks, setTracks] = useState(curriculumTracks);
  const [expandedTracks, setExpandedTracks] = useState<Record<string, boolean>>({
    'TRK-PYTHON': true,
  });
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    'TRK-PYTHON-1': true,
    'TRK-PYTHON-2': true,
  });

  // Edit Modal State
  const [editingTrack, setEditingTrack] = useState<any>(null);

  const toggleTrack = (id: string) => {
    setExpandedTracks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLevel = (key: string) => {
    setExpandedLevels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMoveChapter = (trackId: string, levelNum: number, chapterIdx: number, direction: 'up' | 'down') => {
    setTracks((prev) =>
      prev.map((trk) => {
        if (trk.id !== trackId) return trk;
        const newLevels = trk.levels.map((lvl) => {
          if (lvl.levelNumber !== levelNum) return lvl;
          const chapters = [...lvl.chapters];
          const targetIdx = direction === 'up' ? chapterIdx - 1 : chapterIdx + 1;
          if (targetIdx < 0 || targetIdx >= chapters.length) return lvl;
          const temp = chapters[chapterIdx];
          chapters[chapterIdx] = chapters[targetIdx];
          chapters[targetIdx] = temp;
          return { ...lvl, chapters };
        });
        return { ...trk, levels: newLevels };
      })
    );
    showToast(`Re-sequenced chapter order (${direction.toUpperCase()})`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.nav.curriculum}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Visual multi-tier curriculum tree: Tracks → Levels → Chapters → Interactive Lessons with live re-sequencing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/content/video-steps">
            <Button variant="outline" size="sm" icon={<Video className="w-3.5 h-3.5" />}>
              Author Video Steps
            </Button>
          </Link>
          <Link href="/content/task-authoring">
            <Button variant="primary" size="sm" icon={<Code2 className="w-3.5 h-3.5" />}>
              Shared Task Studio
            </Button>
          </Link>
        </div>
      </div>

      {/* Curriculum Hierarchy Tree */}
      <div className="space-y-4">
        {tracks.map((track) => {
          const isTrackExpanded = !!expandedTracks[track.id];
          return (
            <Card key={track.id} className="overflow-hidden border-2 border-slate-200/80 dark:border-slate-800">
              {/* Track Node Header */}
              <div
                onClick={() => toggleTrack(track.id)}
                className="p-4 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 text-slate-400">
                    {isTrackExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                  <div className="p-2 rounded-lg bg-blue-600 text-white shadow-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-slate-900 dark:text-white">
                        {language === 'ar' ? track.titleAr : track.title}
                      </h3>
                      <Badge variant="primary" size="sm">
                        {track.targetAge}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {language === 'ar' ? track.descriptionAr : track.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Edit3 className="w-3.5 h-3.5" />}
                    onClick={() => setEditingTrack(track)}
                  >
                    Edit Track
                  </Button>
                </div>
              </div>

              {/* Levels & Chapters Sub-Tree */}
              {isTrackExpanded && (
                <div className="p-4 sm:p-6 space-y-4 bg-white dark:bg-slate-900">
                  {track.levels.map((lvl) => {
                    const levelKey = `${track.id}-${lvl.levelNumber}`;
                    const isLvlExpanded = !!expandedLevels[levelKey];

                    return (
                      <div
                        key={lvl.levelNumber}
                        className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden"
                      >
                        {/* Level Header */}
                        <div
                          onClick={() => toggleLevel(levelKey)}
                          className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-between cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-blue-600 dark:text-blue-400">
                              {isLvlExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </span>
                            <span className="font-bold text-xs text-slate-900 dark:text-white">
                              {language === 'ar' ? lvl.titleAr : lvl.title}
                            </span>
                            <Badge variant="purple" size="sm">
                              {lvl.chapters.length} Chapters • {lvl.exercisesCount} Challenges
                            </Badge>
                          </div>

                          <span className="text-[11px] text-slate-400 font-semibold">
                            Milestone Requirement: ≥85% Quiz
                          </span>
                        </div>

                        {/* Chapters Listing */}
                        {isLvlExpanded && (
                          <div className="p-3 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                            {lvl.chapters.map((chapterTitle, chapIdx) => (
                              <div
                                key={chapIdx}
                                className="py-2.5 px-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg group transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-slate-400 text-[11px] w-6">
                                    #{chapIdx + 1}
                                  </span>
                                  <span className="font-medium text-slate-800 dark:text-slate-200">
                                    {chapterTitle}
                                  </span>
                                </div>

                                {/* Reordering Up/Down Controls */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    disabled={chapIdx === 0}
                                    onClick={() => handleMoveChapter(track.id, lvl.levelNumber, chapIdx, 'up')}
                                    className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer"
                                    title="Move Up"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    disabled={chapIdx === lvl.chapters.length - 1}
                                    onClick={() => handleMoveChapter(track.id, lvl.levelNumber, chapIdx, 'down')}
                                    className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer"
                                    title="Move Down"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                  <Link href="/content/video-steps">
                                    <Button variant="ghost" size="sm" className="h-6 text-[11px] px-2">
                                      Attach Tasks
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Inline Track Edit Modal */}
      {editingTrack && (
        <Modal
          isOpen={!!editingTrack}
          onClose={() => setEditingTrack(null)}
          title="Edit Curriculum Track Parameters"
          subtitle={editingTrack.title}
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingTrack(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  showToast('Track parameters updated successfully', 'success');
                  setEditingTrack(null);
                }}
              >
                Save Track Configuration
              </Button>
            </>
          }
        >
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Track Title (English):
              </label>
              <input
                type="text"
                defaultValue={editingTrack.title}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Track Description:
              </label>
              <textarea
                rows={3}
                defaultValue={editingTrack.description}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

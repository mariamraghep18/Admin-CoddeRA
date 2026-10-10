'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Layers,
  Cpu,
  Wifi,
  UserCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  ShieldCheck,
  Code2,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

export function OrgStep2ReviewScreen({ orgId = 'ORG-BRIGHT-02' }: { orgId?: string }) {
  const { organizations, approveOrgStep2, rejectOrgStep2, showToast, t, language, isRtl, navigateTo } = useApp();

  const org = organizations.find((o) => o.id === orgId) || organizations[2];

  // Track checkboxes
  const [trackScratch, setTrackScratch] = useState(true);
  const [trackWeb, setTrackWeb] = useState(true);
  const [trackPython, setTrackPython] = useState(true);

  // Modals
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('Workstation RAM does not meet 16GB minimum benchmark for Game AI track.');
  const [approvalNotes, setApprovalNotes] = useState('All 30 workstations inspected and certified for optical fiber low latency.');

  const handleConfirmGrantAccreditation = () => {
    const activeTracks: string[] = [];
    if (trackScratch) activeTracks.push('Scratch & Creative Coding');
    if (trackWeb) activeTracks.push('Modern Web Foundations');
    if (trackPython) activeTracks.push('Python & Game AI');

    approveOrgStep2(org.id, activeTracks);
    setIsApproveModalOpen(false);
  };

  const handleConfirmReject = () => {
    rejectOrgStep2(org.id, rejectReason);
    setIsRejectModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {org.name} · Step 2 Technical & Pedagogical Audit
            </h1>
            <Badge
              variant={org.step2.status === 'ACCEPTED' ? 'success' : org.step2.status === 'REJECTED' ? 'danger' : 'primary'}
              size="sm"
              dot
            >
              {org.step2.status}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Physical lab hardware verification, dedicated optical line telemetry, and computer science faculty credentials
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

      {/* Grid: Hardware & Teachers (7 Cols) + Track Allocation & Final Approval (5 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Hardware & Teachers Inspection (7 Cols) */}
        <div className="xl:col-span-7 space-y-4">
          <Card>
            <CardHeader
              title="Workstation & Bandwidth Specs"
              subtitle={`Submitted on ${org.step2.submittedDate}`}
              icon={<Cpu className="w-4 h-4 text-blue-600" />}
            />
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/40">
                  <span className="text-[10px] uppercase font-bold text-blue-500 block">
                    Computer Labs
                  </span>
                  <span className="text-xl font-black text-blue-900 dark:text-blue-100">
                    {org.step2.computerLabsCount} Labs
                  </span>
                </div>
                <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/40">
                  <span className="text-[10px] uppercase font-bold text-blue-500 block">
                    Total PCs
                  </span>
                  <span className="text-xl font-black text-blue-900 dark:text-blue-100">
                    {org.step2.totalPCs} Workstations
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Hardware Specifications:
                </span>
                <p className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                  {org.step2.pcSpecs}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Telemetry Bandwidth:
                  </span>
                  <span className="text-slate-500 text-[11px] font-mono">
                    {org.step2.bandwidth} Dedicated Fiber Line
                  </span>
                </div>
                <Badge variant="success" size="sm">
                  Telemetry Verified
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Certified Instructors */}
          <Card>
            <CardHeader
              title="Assigned CS Faculty & Lab Instructors"
              subtitle={`${org.step2.teachers?.length || org.step2.teachersCount} Certified Instructors On-Site`}
              icon={<UserCheck className="w-4 h-4 text-emerald-600" />}
            />
            <CardContent className="space-y-3">
              {org.step2.teachers?.map((tch, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 dark:text-white">{tch.name}</p>
                    <p className="text-[11px] text-slate-500">Role: {tch.role}</p>
                  </div>
                  <Badge variant={tch.certified ? "success" : "warning"} size="sm">
                    {tch.certified ? "Accredited" : "Pending"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Track Allocation & Final Approval (5 Cols) */}
        <div className="xl:col-span-5 space-y-4">
          <Card>
            <CardHeader
              title="Track Allocation & Sign-Off"
              subtitle="Select curriculum tracks approved for this facility"
              icon={<Code2 className="w-4 h-4 text-purple-600" />}
            />
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={trackScratch}
                    onChange={(e) => setTrackScratch(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Scratch & Creative Coding
                    </span>
                    <span className="text-[11px] text-slate-400">Grades 3-5 (Ages 8-10)</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={trackWeb}
                    onChange={(e) => setTrackWeb(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Modern Web Foundations
                    </span>
                    <span className="text-[11px] text-slate-400">Grades 6-8 (Ages 11-14)</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={trackPython}
                    onChange={(e) => setTrackPython(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Python & Game AI Explorer
                    </span>
                    <span className="text-[11px] text-slate-400">Grades 9-12 (Ages 14-18)</span>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <Button
                  variant="success"
                  size="md"
                  className="w-full"
                  onClick={() => setIsApproveModalOpen(true)}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Grant Full Operational Accreditation
                </Button>

                <Button
                  variant="danger"
                  size="md"
                  className="w-full"
                  onClick={() => setIsRejectModalOpen(true)}
                  icon={<XCircle className="w-4 h-4" />}
                >
                  Reject Lab Setup & Request Upgrades
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Grant Approval Modal */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Confirm Operational Accreditation (Step 2)"
        subtitle={`Certify lab infrastructure for ${org.name}`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsApproveModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="success" size="sm" onClick={handleConfirmGrantAccreditation}>
              Grant & Activate School
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">
            Auditor Endorsement Notes:
          </label>
          <textarea
            rows={3}
            value={approvalNotes}
            onChange={(e) => setApprovalNotes(e.target.value)}
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 font-medium"
          />
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300">
            Granting operational accreditation switches organization contract status to <strong>Active</strong> and activates allocated seats.
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Reject Lab Setup / Demand Upgrades"
        subtitle={`Notify ${org.name} IT coordinator`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmReject}>
              Issue Upgrade Demand
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">
            Technical Audit Discrepancies:
          </label>
          <textarea
            rows={4}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
          />
        </div>
      </Modal>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  ShieldCheck,
  FileCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

export function OrgStep1ReviewScreen({ orgId = 'ORG-NOOR-01' }: { orgId?: string }) {
  const { organizations, approveOrgStep1, rejectOrgStep1, showToast, t, language, isRtl, navigateTo } = useApp();

  const org = organizations.find((o) => o.id === orgId) || organizations[0];

  // Checklist states
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(true);
  const [check3, setCheck3] = useState(true);

  // Modals
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [approvalNotes, setApprovalNotes] = useState('All commercial registration seals verified against Ministry database.');
  const [rejectReason, setRejectReason] = useState('Missing official Ministry of Education stamp on Page 2 of accreditation decree.');

  const handleConfirmApprove = () => {
    approveOrgStep1(org.id);
    setIsApproveModalOpen(false);
  };

  const handleConfirmReject = () => {
    rejectOrgStep1(org.id, rejectReason);
    setIsRejectModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {org.name} · Step 1 Verification (Identity & Entity KYC)
            </h1>
            <Badge
              variant={org.step1.status === 'ACCEPTED' ? 'success' : org.step1.status === 'REJECTED' ? 'danger' : 'warning'}
              size="sm"
              dot
            >
              {org.step1.status}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review legal commercial records, tax registrations, and Ministry authorization before unlocking Step 2 lab setup
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

      {/* Grid: Legal Submissions (7 Cols) + Verification Checklist & Decision Engine (5 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Dossier & PDF Document Viewers (7 Cols) */}
        <div className="xl:col-span-7 space-y-4">
          <Card>
            <CardHeader
              title="Institution Legal Metadata"
              subtitle={`Submitted on ${org.step1.submittedDate}`}
              icon={<Building2 className="w-4 h-4 text-blue-600" />}
            />
            <CardContent className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Official Title:</span>
                <span className="font-bold text-slate-900 dark:text-white">{org.name}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Commercial Registration (CR):</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {org.step1.commercialRegNo}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Ministry Authorization Code:</span>
                <span className="font-mono font-bold text-blue-600">
                  {org.step1.ministryLicense}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Principal / Signatory:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {org.step1.authorizedRep} ({org.step1.repPhone})
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-500 shrink-0">Official Campus Address:</span>
                <span className="text-right text-slate-800 dark:text-slate-200 max-w-[280px]">
                  {org.step1.physicalAddress}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Official Registration Certificates"
              icon={<FileText className="w-4 h-4 text-emerald-600" />}
            />
            <CardContent className="space-y-3">
              {org.step1.docs.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{doc.name}</p>
                      <span className="text-[11px] text-slate-400">{doc.size} • PDF Document</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Download className="w-3.5 h-3.5" />}
                    onClick={() => showToast(`Opening ${doc.name} preview in new tab`, 'info')}
                  >
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Verification Checklist & Decision Engine (5 Cols) */}
        <div className="xl:col-span-5 space-y-4">
          <Card>
            <CardHeader
              title="Legal Compliance Checklist"
              subtitle="All 3 compliance checks required before acceptance"
              icon={<ShieldCheck className="w-4 h-4 text-amber-600" />}
            />
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-2.5">
                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={check1}
                    onChange={(e) => setCheck1(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Commercial Registry active & matches tax card name
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={check2}
                    onChange={(e) => setCheck2(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Ministry Authorization decree verified on national registry
                  </span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={check3}
                    onChange={(e) => setCheck3(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    School institutional domain (@noorschools.edu.eg) verified via DNS
                  </span>
                </label>
              </div>

              {/* Decision Action Buttons */}
              <div className="pt-4 space-y-2.5">
                <Button
                  variant="success"
                  size="md"
                  className="w-full"
                  disabled={!check1 || !check2 || !check3}
                  onClick={() => setIsApproveModalOpen(true)}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Accept Step 1 & Unlock Step 2 for School
                </Button>

                <Button
                  variant="danger"
                  size="md"
                  className="w-full"
                  onClick={() => setIsRejectModalOpen(true)}
                  icon={<XCircle className="w-4 h-4" />}
                >
                  Reject / Request Amendments
                </Button>

                {org.step1.status === 'ACCEPTED' && (
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300"
                    onClick={() => navigateTo('org-step-2')}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Proceed to Step 2 Lab Review →
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Approve Confirmation Modal */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title="Approve Step 1 Legal Verification"
        subtitle={`Grant KYC acceptance for ${org.name}`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsApproveModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="success" size="sm" onClick={handleConfirmApprove}>
              Confirm Step 1 Approval
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">
            Auditor Verification Notes:
          </label>
          <textarea
            rows={3}
            value={approvalNotes}
            onChange={(e) => setApprovalNotes(e.target.value)}
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 font-medium"
          />
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300">
            Accepting Step 1 immediately changes contract status to <strong>Pending Step 2</strong> and invites school lab administrators to complete hardware accreditation.
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Request Legal Documentation Amendments"
        subtitle={`Return Step 1 to ${org.name} coordinator`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsRejectModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmReject}>
              Send Rejection Notice
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">
            Specify Missing or Discrepant Documentation:
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

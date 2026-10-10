'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  FileCheck,
  Cpu,
  CreditCard,
  Lock,
  UserCheck,
  Users,
  Download,
  PlusCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Send,
  Wifi,
  Monitor,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

export function OrganizationDetailScreen({ orgId = 'ORG-HOPE-01' }: { orgId?: string }) {
  const {
    organizations,
    students,
    upgradeOrgSeats,
    addOrgInternalNote,
    showToast,
    role,
    t,
    language,
    isRtl,
    navigateTo,
  } = useApp();

  const org = organizations.find((o) => o.id === orgId) || organizations[0];
  const [activeTab, setActiveTab] = useState<'step1' | 'step2' | 'package' | 'notes' | 'mentors' | 'students'>('step1');

  // New Internal Note State
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteSeverity, setNewNoteSeverity] = useState<'confidential' | 'warning' | 'info'>('confidential');

  // Upgrade Modal State
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Institution's Students
  const institutionStudents = students.filter(
    (s) => s.organizationId === org.id || s.sponsorName.includes('Hope')
  );

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    addOrgInternalNote(org.id, newNoteText, newNoteSeverity);
    setNewNoteText('');
  };

  const handleConfirmUpgrade = () => {
    upgradeOrgSeats(org.id, 50);
    setIsUpgradeModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title & Institutional KPI Counters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {language === 'ar' ? org.nameAr : org.name}
            </h1>
            <Badge variant="purple" size="sm">
              {org.tier}
            </Badge>
            <Badge variant="success" size="sm" dot>
              {org.contractStatus}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enterprise ID: {org.id} • Authorized Rep: {org.step1.authorizedRep} • {org.step1.physicalAddress}
          </p>
        </div>

        {/* 3 KPI Counters */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs shadow-2xs">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {t.orgDetail.allocatedSeats}
            </span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400">
              {org.seatsAllocated} / {org.seatsTotal}
            </span>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {t.orgDetail.completionRate}
            </span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
              {org.avgCompletion}%
            </span>
          </div>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {t.orgDetail.contractValue}
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              ${org.contractValue}
            </span>
          </div>
        </div>
      </div>

      {/* 6-Tab Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('step1')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'step1'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>{t.orgDetail.tabStep1}</span>
        </button>

        <button
          onClick={() => setActiveTab('step2')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'step2'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>{t.orgDetail.tabStep2}</span>
        </button>

        <button
          onClick={() => setActiveTab('package')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'package'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>{t.orgDetail.tabPackage}</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'notes'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{t.orgDetail.tabNotes}</span>
          <Badge variant="purple" size="sm">
            {org.internalNotes.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab('mentors')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'mentors'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>{t.orgDetail.tabMentors}</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'students'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{t.orgDetail.tabStudents}</span>
          <Badge variant="primary" size="sm">
            {institutionStudents.length}
          </Badge>
        </button>
      </div>

      {/* Tab 1: KYC Legal Docs */}
      {activeTab === 'step1' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Official Legal Identifiers"
              icon={<FileCheck className="w-4 h-4" />}
              action={
                <Badge variant="success" size="sm">
                  {org.step1.status}
                </Badge>
              }
            />
            <CardContent className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t.orgDetail.commercialRegNo}:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {org.step1.commercialRegNo}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t.orgDetail.ministryLic}:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {org.step1.ministryLicense}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t.orgDetail.authorizedRep}:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {org.step1.authorizedRep}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Contact Email & Phone:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  {org.step1.repEmail} • {org.step1.repPhone}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-500 shrink-0">{t.orgDetail.physicalAddress}:</span>
                <span className="text-right text-slate-800 dark:text-slate-200 max-w-[280px]">
                  {org.step1.physicalAddress}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Uploaded Legal Documentation Dossier"
              subtitle={`Submitted on ${org.step1.submittedDate}`}
              icon={<Download className="w-4 h-4" />}
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
                      <span className="text-[11px] text-slate-400">{doc.size}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Download className="w-3 h-3" />}
                    onClick={() => showToast(`Downloaded ${doc.name}`, 'info')}
                  >
                    View
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 2: Technical & Lab Setup */}
      {activeTab === 'step2' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Hardware & Network Specifications"
              icon={<Cpu className="w-4 h-4" />}
            />
            <CardContent className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-blue-500 block">
                    {t.orgDetail.labsCount}
                  </span>
                  <span className="text-xl font-black text-blue-900 dark:text-blue-200">
                    {org.step2.computerLabsCount} Labs
                  </span>
                </div>
                <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-blue-500 block">
                    {t.orgDetail.workstationsCount}
                  </span>
                  <span className="text-xl font-black text-blue-900 dark:text-blue-200">
                    {org.step2.totalPCs} PCs
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <Monitor className="w-4 h-4 text-blue-600" />
                  <span>Workstation Specs:</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {org.step2.pcSpecs}
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <Wifi className="w-4 h-4 text-emerald-600" />
                  <span>Network Bandwidth:</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  {org.step2.bandwidth}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title={t.orgDetail.teachersRoster}
              subtitle="Certified Computer Science Faculty"
              icon={<UserCheck className="w-4 h-4" />}
            />
            <CardContent className="space-y-3">
              {org.step2.teachers.map((teacher, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{teacher.name}</p>
                    <span className="text-[11px] text-slate-400">{teacher.role}</span>
                  </div>
                  <Badge variant="success" size="sm">
                    CodeRa Certified
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 3: Package, Invoicing & Upgrade */}
      {activeTab === 'package' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Enterprise Contract & Payment Terms"
              icon={<CreditCard className="w-4 h-4" />}
            />
            <CardContent className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Tier:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{org.tier}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Contract Value:</span>
                <span className="font-black text-slate-900 dark:text-white">${org.contractValue} USD</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Payment Terms:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{org.paymentTerms}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Seats Utilization:</span>
                <span className="font-bold text-blue-600">
                  {org.seatsAllocated} Used / {org.seatsTotal} Total Capacity
                </span>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={<PlusCircle className="w-4 h-4" />}
                  onClick={() => setIsUpgradeModalOpen(true)}
                >
                  {t.orgDetail.upgradeSeatsBtn}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Dispatched Invoices & Billing Ledger"
              icon={<CreditCard className="w-4 h-4" />}
            />
            <CardContent className="space-y-3 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Invoice ORD-1048</p>
                  <span className="text-[11px] text-slate-400">Oct 02, 2026 • $2,850.00 USD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="sm">SETTLED</Badge>
                  <Link
                    href="/financials/orders/ORD-1048"
                    className="p-1 text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 4: Internal Super-Admin Secret Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <Card className="border border-purple-200 dark:border-purple-900/50">
            <CardHeader
              title="Confidential Internal Audit Log & Executive Notes"
              subtitle={t.orgDetail.secretNotePrompt}
              icon={<Lock className="w-4 h-4 text-purple-600" />}
            />
            <CardContent className="space-y-4">
              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="space-y-3">
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Type sensitive administrative notes regarding school renewals, proctoring inspections, or special SLA waivers..."
                  rows={3}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Severity:</span>
                    <select
                      value={newNoteSeverity}
                      onChange={(e) => setNewNoteSeverity(e.target.value as any)}
                      className="px-2.5 py-1 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300"
                    >
                      <option value="confidential">Confidential (Super Admin Only)</option>
                      <option value="warning">High Attention Warning</option>
                      <option value="info">General Internal Info</option>
                    </select>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    Log Internal Note
                  </Button>
                </div>
              </form>

              {/* Existing Notes Feed */}
              <div className="space-y-3 pt-2">
                {org.internalNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {note.author}
                        </span>
                        <Badge
                          variant={note.severity === 'warning' ? 'warning' : 'purple'}
                          size="sm"
                        >
                          {note.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{note.date}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {note.text}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 5: Mentor Allocations */}
      {activeTab === 'mentors' && (
        <Card>
          <CardHeader
            title="Grade & Cohort Mentor Mapping Matrix"
            subtitle="Assignment of vetted CodeRa mentors across Hope Academy classes"
            icon={<UserCheck className="w-4 h-4" />}
          />
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Grade / Cohort</th>
                    <th className="py-3 px-4">Assigned Mentor</th>
                    <th className="py-3 px-4">Student Load</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {org.mentorAllocations.map((alloc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {alloc.gradeClass}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-blue-600 dark:text-blue-400">
                        {alloc.mentorName}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                        {alloc.studentsCount} Students
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link href="/mentors">
                          <Button variant="outline" size="sm">
                            Inspect Mentor
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 6: Students Registry (Read-Only) */}
      {activeTab === 'students' && (
        <Card>
          <CardHeader
            title="Institutional Student Verification Registry (Read-Only)"
            subtitle="All learners enrolled under Hope Academy license agreement"
            icon={<Users className="w-4 h-4" />}
          />
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Level</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {institutionStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {st.name}
                      </td>
                      <td className="py-3.5 px-4 text-purple-600 font-medium">
                        {st.organizationClass || 'Class 5B'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                        {st.level}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-blue-600">{st.progress}%</td>
                      <td className="py-3.5 px-4">
                        <Badge variant="success" size="sm" dot>
                          VERIFIED
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateTo('student-org-managed', { id: st.id })}
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seat Upgrade Modal */}
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        title="Request Enterprise Seat Upgrade"
        subtitle={`Add +50 Student Seats to ${org.name}`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsUpgradeModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleConfirmUpgrade}>
              Confirm +50 Seats Allocation
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            This action will provision 50 additional student seat tokens to Hope Academy tenant ({org.id}). Current capacity: {org.seatsTotal} seats. New capacity: {org.seatsTotal + 50} seats.
          </p>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl">
            <span className="font-bold text-blue-900 dark:text-blue-200 block">
              Pro-forma Invoicing Note:
            </span>
            <span className="text-[11px] text-blue-700 dark:text-blue-400">
              An addendum invoice for $2,500.00 USD will be automatically queued in Financials under Net 30 terms.
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  HeartHandshake,
  Users,
  CreditCard,
  FileCheck,
  Search,
  ExternalLink,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Eye,
  PlusCircle,
  FileText,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { initialParents } from '@/data/mockData';

export function ParentsScreen() {
  const { students, t, language, isRtl, showToast, navigateTo } = useApp();
  const [parents, setParents] = useState(initialParents);
  const [selectedParentId, setSelectedParentId] = useState<string>('PAR-401');
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);

  const selectedParent = parents.find((p) => p.id === selectedParentId) || parents[0];

  // Linked children
  const linkedChildren = students.filter(
    (s) => s.sponsorEmail === selectedParent.email || selectedParent.childrenIds.includes(s.id)
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t.nav.parents}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Direct management of family rosters, guardian identity verification, and multi-child plan licenses
        </p>
      </div>

      {/* Main Grid: Directory Table on Left + Selected Parent Workspace on Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Master Directory Table (7 Cols) */}
        <div className="xl:col-span-7 space-y-4">
          <Card className="overflow-hidden">
            <CardHeader
              title="Family Accounts Master Directory"
              subtitle="Showing verified guardian accounts"
              icon={<HeartHandshake className="w-4 h-4" />}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Guardian Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Linked Kids</th>
                    <th className="py-3 px-4">Total Paid</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {parents.map((parent) => {
                    const isSelected = parent.id === selectedParentId;
                    return (
                      <tr
                        key={parent.id}
                        onClick={() => setSelectedParentId(parent.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 dark:bg-blue-950/40 font-medium'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {language === 'ar' ? parent.nameAr : parent.name}
                          </div>
                          <div className="text-[11px] text-slate-400">{parent.location}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                          <div>{parent.email}</div>
                          <div className="text-slate-400">{parent.phone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant="primary" size="sm">
                            {parent.childrenCount} Children
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                          ${parent.totalSpend} USD
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant="success" size="sm" dot>
                            {parent.verificationStatus.toUpperCase()}
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

        {/* Right: Selected Parent Workspace Card (5 Cols) */}
        <div className="xl:col-span-5 space-y-4">
          <Card className="border-2 border-blue-500/20 dark:border-blue-500/30">
            <CardHeader
              title={`Guardian Workspace: ${selectedParent.name}`}
              subtitle={`Member since ${selectedParent.joinedDate}`}
              icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsIdModalOpen(true)}
                  icon={<Eye className="w-3.5 h-3.5" />}
                >
                  Verify ID
                </Button>
              }
            />
            <CardContent className="space-y-5">
              {/* Family Roster Mini-Table */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Linked Children ({linkedChildren.length})</span>
                  <span className="text-[11px] text-blue-600 font-semibold cursor-pointer">
                    + Add Child Credit
                  </span>
                </h4>
                <div className="space-y-2">
                  {linkedChildren.map((kid) => (
                    <div
                      key={kid.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={kid.avatar}
                          alt={kid.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{kid.name}</p>
                          <span className="text-[11px] text-slate-400">{kid.level}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => navigateTo('student-parent-managed', { id: kid.id })}
                        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Dossier</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Cards & Seat Credits */}
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 rounded-xl space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Saved Payment Card:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    {selectedParent.cardBrand} (•••• {selectedParent.cardMask})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Available Seat Credits:</span>
                  <Badge variant="primary" size="sm">
                    {selectedParent.availableSeatCredits} Extra Seat Unused
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Family Plan Renewal:</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200">
                    {selectedParent.renewalDate}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigateTo('order-deep-dive', { id: 'ORD-1048' })}
                >
                  View Invoices
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => showToast('Dispatched verification check email to parent', 'success')}
                >
                  Contact Guardian
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* National ID Preview Modal */}
      <Modal
        isOpen={isIdModalOpen}
        onClose={() => setIsIdModalOpen(false)}
        title="Guardian Identity Verification Document"
        subtitle={`National ID Document for ${selectedParent.name}`}
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-slate-950 rounded-xl text-center">
            <div className="w-full h-48 bg-slate-900 rounded-lg border border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-400 gap-2">
              <FileCheck className="w-10 h-10 text-emerald-500" />
              <p className="font-mono text-slate-200">EGYPT_NATIONAL_ID_294010188921.PDF</p>
              <Badge variant="success" size="sm">
                OCR Liveness Verified • Match 99.4%
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
            <div>
              <span className="text-slate-400 block text-[10px]">Issued Authority:</span>
              <span className="font-bold text-slate-900 dark:text-white">Ministry of Interior, Egypt</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Expiry Date:</span>
              <span className="font-bold text-slate-900 dark:text-white">2031-08-14</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

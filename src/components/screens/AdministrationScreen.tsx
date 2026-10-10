'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  Users,
  Lock,
  KeyRound,
  Clock,
  Power,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

export function AdministrationScreen() {
  const {
    subAdmins,
    toggleSubAdminStatus,
    updateSubAdminPermission,
    auditLogs,
    role,
    showToast,
    t,
    language,
    isRtl,
  } = useApp();

  const [selectedAdminForKillswitch, setSelectedAdminForKillswitch] = useState<string | null>(null);

  const handleKillswitch = () => {
    if (!selectedAdminForKillswitch) return;
    toggleSubAdminStatus(selectedAdminForKillswitch);
    setSelectedAdminForKillswitch(null);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.nav.administration}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Super-Admin authorization console, role-based access control (RBAC) capability matrix, and system security kill-switch
          </p>
        </div>
      </div>

      {/* Sub-Admin Accounts Table */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Sub-Admin Team Accounts & Departments"
          subtitle="Managed administrative roles across CodeRa operations"
          icon={<Users className="w-4 h-4 text-blue-600" />}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Admin Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">2FA Status</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Security Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {subAdmins.map((adm) => (
                <tr key={adm.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{adm.name}</div>
                    <div className="text-[11px] text-slate-400">{adm.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={adm.department === 'Super Admin' ? 'primary' : 'purple'} size="sm">
                      {adm.department}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <Badge variant={adm.twoFactorEnabled ? 'success' : 'warning'} size="sm" dot>
                      {adm.twoFactorEnabled ? '2FA ENFORCED' : 'DISABLED'}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {adm.lastActive}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={adm.status === 'Active' ? 'success' : 'danger'} size="sm" dot>
                      {adm.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {adm.department !== 'Super Admin' && (
                      <Button
                        variant={adm.status === 'Active' ? 'danger' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedAdminForKillswitch(adm.id)}
                        icon={<Power className="w-3.5 h-3.5" />}
                      >
                        {adm.status === 'Active' ? 'Kill-Switch' : 'Reactivate'}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Role & Capability Matrix (RBAC) */}
      <Card>
        <CardHeader
          title="Granular RBAC Capability & Permission Matrix"
          subtitle="Click checkboxes to dynamically update capability privileges"
          icon={<Lock className="w-4 h-4 text-purple-600" />}
        />
        <CardContent>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Administrator</th>
                  <th className="py-3 px-4 text-center">Edit Content</th>
                  <th className="py-3 px-4 text-center">Issue Refunds</th>
                  <th className="py-3 px-4 text-center">Approve KYC 1</th>
                  <th className="py-3 px-4 text-center">Approve KYC 2</th>
                  <th className="py-3 px-4 text-center">Delete Accounts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {subAdmins.map((adm) => (
                  <tr key={adm.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {adm.name} ({adm.department})
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={adm.permissions.canEditContent}
                        disabled={adm.department === 'Super Admin'}
                        onChange={(e) => updateSubAdminPermission(adm.id, 'canEditContent', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={adm.permissions.canIssueRefunds}
                        disabled={adm.department === 'Super Admin'}
                        onChange={(e) => updateSubAdminPermission(adm.id, 'canIssueRefunds', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={adm.permissions.canApproveKYCStep1}
                        disabled={adm.department === 'Super Admin'}
                        onChange={(e) => updateSubAdminPermission(adm.id, 'canApproveKYCStep1', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={adm.permissions.canApproveKYCStep2}
                        disabled={adm.department === 'Super Admin'}
                        onChange={(e) => updateSubAdminPermission(adm.id, 'canApproveKYCStep2', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={adm.permissions.canDeleteUsers}
                        disabled={adm.department === 'Super Admin'}
                        onChange={(e) => updateSubAdminPermission(adm.id, 'canDeleteUsers', e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Security Kill-Switch Confirmation Modal */}
      <Modal
        isOpen={!!selectedAdminForKillswitch}
        onClose={() => setSelectedAdminForKillswitch(null)}
        title="Emergency Security Kill-Switch Trigger"
        subtitle="Instantly revoke all access tokens for this administrator"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setSelectedAdminForKillswitch(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleKillswitch}>
              Execute Emergency Suspension
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-800 dark:text-rose-200">
            <span className="font-bold block mb-1">Warning:</span>
            Executing this kill-switch will immediately invalidate all active JWT session tokens and lock the account until cleared by Dr. Kareem Zaki.
          </div>
        </div>
      </Modal>
    </div>
  );
}

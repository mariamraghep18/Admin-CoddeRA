'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Share2,
  DollarSign,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  TrendingUp,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function ReferralsScreen() {
  const { referrals, approveReferralPayout, showToast, t, language, isRtl } = useApp();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.nav.referrals}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Affiliate partner payouts, invite conversion funnels, and algorithmic duplicate IP fraud detection
          </p>
        </div>
      </div>

      {/* Referrals Ledger Table */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Affiliate & Referrer Master Ledger"
          icon={<Share2 className="w-4 h-4 text-blue-600" />}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Referrer Name</th>
                <th className="py-3 px-4">Affiliate Code</th>
                <th className="py-3 px-4">Invites Sent</th>
                <th className="py-3 px-4">Converted</th>
                <th className="py-3 px-4">Commission</th>
                <th className="py-3 px-4">Anti-Fraud Status</th>
                <th className="py-3 px-4">Payout Status</th>
                <th className="py-3 px-4 text-right">Approval Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {referrals.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{r.referrerName}</div>
                    <div className="text-[11px] text-slate-400">{r.referrerEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                    {r.code}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                    {r.invitesSent}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">
                    {r.convertedSignups} ({Math.round((r.convertedSignups / r.invitesSent) * 100)}%)
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">
                    ${r.commissionEarned}.00 USD
                  </td>
                  <td className="py-3.5 px-4">
                    {r.suspiciousDuplicatesCount > 0 ? (
                      <Badge variant="warning" size="sm" dot>
                        {r.suspiciousDuplicatesCount} Duplicate IP Flag
                      </Badge>
                    ) : (
                      <Badge variant="success" size="sm" dot>
                        Clean Traffic
                      </Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={r.payoutStatus === 'Paid' ? 'success' : 'warning'} size="sm">
                      {r.payoutStatus}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {r.payoutStatus !== 'Paid' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => approveReferralPayout(r.id)}
                      >
                        Approve Payout
                      </Button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">
                        Dispatched {r.lastPayoutDate}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

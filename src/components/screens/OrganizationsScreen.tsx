'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  Users,
  Search,
  ExternalLink,
  ShieldCheck,
  FileCheck,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function OrganizationsScreen() {
  const { organizations, t, language, isRtl, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = organizations.filter(
    (o) =>
      o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.nameAr.includes(searchTerm) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.nav.organizations}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enterprise partner institutions, accreditation statuses, and multi-campus lab networks
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/reviews">
            <Button variant="outline" size="sm" icon={<FileCheck className="w-4 h-4 text-rose-500" />}>
              Review Intake Queues
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute top-3 left-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search partner school by name, registration ID, or representative..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Organizations Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((org) => (
          <Card key={org.id} hoverable className="flex flex-col justify-between">
            <CardHeader
              title={language === 'ar' ? org.nameAr : org.name}
              subtitle={org.id}
              icon={<Building2 className="w-4 h-4 text-blue-600" />}
              action={
                <Badge
                  variant={
                    org.contractStatus === 'Active'
                      ? 'success'
                      : org.contractStatus.includes('Step 1')
                      ? 'warning'
                      : 'info'
                  }
                  size="sm"
                  dot
                >
                  {org.contractStatus}
                </Badge>
              }
            />
            <CardContent className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tier:</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400">{org.tier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Seats Capacity:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {org.seatsAllocated} / {org.seatsTotal}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Avg Completion:</span>
                  <span className="font-bold text-emerald-600">{org.avgCompletion}%</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 block font-medium">
                  Representative: {org.step1.authorizedRep}
                </span>
                <span className="text-[11px] text-slate-400 block truncate">
                  Address: {org.step1.physicalAddress}
                </span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigateTo('org-detail', { id: org.id })}
                >
                  360 Workspace
                </Button>

                {org.contractStatus === 'Pending Step 1' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateTo('org-step-1', { id: org.id })}
                  >
                    Review Step 1
                  </Button>
                )}

                {org.contractStatus === 'Pending Step 2' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateTo('org-step-2', { id: org.id })}
                  >
                    Review Step 2
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

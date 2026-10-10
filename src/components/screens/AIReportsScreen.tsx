'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Search,
  Download,
  Printer,
  FileCode,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Eye,
  FileText,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { initialAIReports, AIReport } from '@/data/mockData';

export function AIReportsScreen() {
  const { t, language, isRtl, showToast } = useApp();
  const [reports, setReports] = useState<AIReport[]>(initialAIReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<AIReport | null>(null);

  const filtered = reports.filter(
    (r) =>
      r.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.organizationName && r.organizationName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExportJSON = (report: AIReport) => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.setAttribute('download', `${report.sessionId}_telemetry.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(url);
    showToast('Exported raw session telemetry JSON', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t.nav.aiReports}
            </h1>
            <Badge variant="info" size="sm" dot>
              Automated Sentinel
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Central ledger of all automated biometric liveness verifications, code plagiarism scans, and proctoring telemetry
          </p>
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
              placeholder="Search session ID (e.g. AI-PROC-9912), student, or school..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Session ID</th>
                <th className="py-3 px-4">Student & Tenant</th>
                <th className="py-3 px-4">Biometric Liveness</th>
                <th className="py-3 px-4">Voice Match</th>
                <th className="py-3 px-4">Plagiarism Risk</th>
                <th className="py-3 px-4">Verdict</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((r) => (
                <tr
                  key={r.sessionId}
                  onClick={() => setSelectedReport(r)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {r.sessionId}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white">{r.studentName}</div>
                    <div className="text-[11px] text-slate-400">{r.organizationName}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600">
                    {r.livenessConfidence}%
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600">
                    {r.voiceMatchConfidence}%
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <Badge variant={r.codePlagiarismScore > 5 ? 'warning' : 'success'} size="sm">
                      {r.codePlagiarismScore}% Similar
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={r.verdict.includes('Pass') ? 'success' : 'warning'} size="sm" dot>
                      {r.verdict}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Eye className="w-3.5 h-3.5" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReport(r);
                      }}
                    >
                      Audit Report
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Selected PDF / Telemetry Inspector Modal */}
      {selectedReport && (
        <Modal
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          title={`Proctoring Report: ${selectedReport.sessionId}`}
          subtitle={`Automated QA session for ${selectedReport.studentName}`}
          maxWidth="2xl"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                icon={<Printer className="w-3.5 h-3.5" />}
                onClick={() => window.print()}
              >
                Print Report
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<FileCode className="w-3.5 h-3.5" />}
                onClick={() => handleExportJSON(selectedReport)}
              >
                Export JSON Telemetry
              </Button>
              <Button variant="primary" size="sm" onClick={() => setSelectedReport(null)}>
                Dismiss
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            {/* Visual Header */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="font-mono text-blue-400 font-bold">{selectedReport.sessionId}</span>
                <Badge variant="success" size="sm" dot>
                  {selectedReport.verdict}
                </Badge>
              </div>
              <p className="text-sm font-bold">{selectedReport.studentName} • {selectedReport.organizationName}</p>
              <p className="text-slate-400 text-[11px] font-mono">Timestamp: {selectedReport.timestamp}</p>
            </div>

            {/* Scores Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block">
                  Liveness Match
                </span>
                <span className="text-lg font-black text-emerald-900 dark:text-emerald-200">
                  {selectedReport.livenessConfidence}%
                </span>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-400 block">
                  Voice Print Match
                </span>
                <span className="text-lg font-black text-blue-900 dark:text-blue-200">
                  {selectedReport.voiceMatchConfidence}%
                </span>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800">
                <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 block">
                  Plagiarism Index
                </span>
                <span className="text-lg font-black text-purple-900 dark:text-purple-200">
                  {selectedReport.codePlagiarismScore}%
                </span>
              </div>
            </div>

            {/* Detailed AI findings */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white block">
                Automated Sentinel Inspection Details:
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedReport.details}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

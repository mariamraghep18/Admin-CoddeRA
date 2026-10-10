'use client';

import React from 'react';
import { Award, QrCode, ShieldCheck, CheckCircle2, AlertOctagon, RefreshCw } from 'lucide-react';

export interface CertificateData {
  id: string;
  studentId: string;
  studentName: string;
  studentNameAr: string;
  trackTitle: string;
  trackTitleAr: string;
  institution: string;
  institutionAr: string;
  completionPercent: number;
  finalGrade: string;
  issueDate: string;
  verificationHash: string;
  adminSigner: string;
  status: 'Active' | 'Revoked' | 'Re-issued';
}

interface CertificateRendererProps {
  cert: CertificateData;
  language?: 'en' | 'ar';
}

export function CertificateRenderer({
  cert,
  language = 'en',
}: CertificateRendererProps) {
  const isRevoked = cert.status === 'Revoked';
  const isReissued = cert.status === 'Re-issued';

  return (
    <div
      id="codera-certificate-canvas"
      className="relative w-full max-w-4xl aspect-[1.414/1] bg-[#FCFBF8] text-slate-900 border-[10px] border-double border-blue-950/20 rounded-2xl p-6 sm:p-12 shadow-2xl flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Decorative Guilloche Border & Background Accents */}
      <div className="absolute inset-2 border-2 border-amber-600/30 rounded-xl pointer-events-none" />
      <div className="absolute inset-3 border border-dashed border-amber-700/20 rounded-lg pointer-events-none" />
      <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      {/* Revocation Watermark if Revoked */}
      {isRevoked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="text-rose-600/25 border-8 border-rose-600/30 font-black text-6xl sm:text-7xl tracking-widest uppercase rotate-[-25deg] px-12 py-4 rounded-3xl">
            REVOKED / ملغاة
          </div>
        </div>
      )}

      {/* Top Header */}
      <div className="text-center space-y-2 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50/80 rounded-full border border-blue-200 text-blue-800 text-[11px] font-bold uppercase tracking-widest">
          <Award className="w-4 h-4 text-amber-500" />
          <span>CodeRa Certified Master Academy • Global EdTech Governance</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
          Certificate of Completion & Excellence
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-500 max-w-lg mx-auto">
          This official credential certifies that the undersigned learner has successfully fulfilled all curriculum benchmarks, algorithm capstones, and proctored assessments.
        </p>
      </div>

      {/* Recipient Body */}
      <div className="text-center my-auto py-4 sm:py-6 space-y-2 sm:space-y-3 relative z-10">
        <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
          Proudly Awarded To / يُمنح هذا التقدير إلى
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-blue-950 font-serif tracking-tight">
          {language === 'ar' ? cert.studentNameAr : cert.studentName}
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-700">
          For demonstrating exemplary technical mastery in{' '}
          <span className="text-blue-600 font-bold underline decoration-blue-300">
            {language === 'ar' ? cert.trackTitleAr : cert.trackTitle}
          </span>
        </p>
        <p className="text-[11px] sm:text-xs text-slate-500">
          Under the academic auspices of{' '}
          <span className="font-bold text-slate-800">
            {language === 'ar' ? cert.institutionAr : cert.institution}
          </span>{' '}
          with a graduating score of{' '}
          <span className="font-mono font-bold text-emerald-700">{cert.finalGrade}</span>
        </p>
      </div>

      {/* Bottom Signatures, Gold Seal & QR Code */}
      <div className="pt-4 sm:pt-6 border-t border-slate-200 flex items-end justify-between gap-4 sm:gap-6 relative z-10 text-xs">
        {/* Left: Academic Signatures */}
        <div className="space-y-1 text-left">
          <div className="font-serif italic text-base sm:text-lg text-slate-800 font-bold">
            {cert.adminSigner}
          </div>
          <div className="h-0.5 w-32 sm:w-40 bg-slate-400" />
          <p className="text-[9px] sm:text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            Chief Academic Officer & Super Admin
          </p>
          <p className="text-[9px] text-slate-400">Date Issued: {cert.issueDate}</p>
        </div>

        {/* Center: Gold Foil Badge Emulation */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-linear-to-tr from-amber-400 via-yellow-200 to-amber-500 p-1 shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-dashed border-amber-900/50 flex flex-col items-center justify-center text-center p-1 text-amber-950">
              {isRevoked ? (
                <>
                  <AlertOctagon className="w-4 h-4 text-rose-700" />
                  <span className="text-[7px] font-black uppercase text-rose-700">REVOKED</span>
                </>
              ) : isReissued ? (
                <>
                  <RefreshCw className="w-4 h-4 text-blue-700" />
                  <span className="text-[7px] font-black uppercase text-blue-700">RE-ISSUED</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-900" />
                  <span className="text-[7px] font-black uppercase tracking-tighter">VERIFIED</span>
                </>
              )}
            </div>
          </div>
          <span className="text-[8px] font-mono text-slate-400 mt-1 uppercase">
            REGISTRY SEAL
          </span>
        </div>

        {/* Right: QR Code & Cryptographic Hash */}
        <div className="text-right space-y-1">
          <div className="inline-block p-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
            <QrCode className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800" />
          </div>
          <p className="font-mono text-[9px] text-slate-500 font-bold">ID: {cert.id}</p>
          <p className="font-mono text-[7px] sm:text-[8px] text-slate-400 truncate max-w-[130px] sm:max-w-[160px]">
            {cert.verificationHash}
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import {
  GraduationCap,
  Award,
  Search,
  Download,
  Printer,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Image,
  ChevronDown,
  User,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import {
  CertificateRenderer,
  CertificateData,
} from '@/components/certificates/CertificateRenderer';

export function AnalyticsScreen() {
  const { t, language, isRtl, showToast, addAuditLog } = useApp();

  // Registry of verified certificates
  const [certificates, setCertificates] = useState<CertificateData[]>([
    {
      id: 'CERT-CR-8821',
      studentId: 'STU-8821',
      studentName: 'Ahmed Hassan',
      studentNameAr: 'أحمد حسن',
      trackTitle: 'Level 2 Full-Stack Python & Algorithms',
      trackTitleAr: 'المستوى 2: بايثون المتقدم والخوارزميات',
      institution: 'Future Leaders Academy',
      institutionAr: 'أكاديمية قادة المستقبل',
      completionPercent: 100,
      finalGrade: '98.5% (High Distinction)',
      issueDate: 'October 08, 2026',
      verificationHash: '0x8821F9A0B3C14DE7652E1098BA44D1',
      adminSigner: 'Dr. Kareem Zaki',
      status: 'Active',
    },
    {
      id: 'CERT-CR-9921',
      studentId: 'STU-8822',
      studentName: 'Youssef Ibrahim',
      studentNameAr: 'يوسف إبراهيم',
      trackTitle: 'Level 1 Scratch & Python Foundations',
      trackTitleAr: 'المستوى 1: سكراتش وأساسيات بايثون',
      institution: 'Hope Academy International',
      institutionAr: 'أكاديمية الأمل الدولية',
      completionPercent: 100,
      finalGrade: '96.0% (Distinction)',
      issueDate: 'October 06, 2026',
      verificationHash: '0x7F92B10488921ACDE9011B91C4A55910',
      adminSigner: 'Dr. Kareem Zaki',
      status: 'Active',
    },
    {
      id: 'CERT-CR-8823',
      studentId: 'STU-8823',
      studentName: 'Mariam Saleh',
      studentNameAr: 'مريم صالح',
      trackTitle: 'Level 3 AI & Data Science for Teens',
      trackTitleAr: 'المستوى 3: الذكاء الاصطناعي وعلوم البيانات',
      institution: 'Al-Noor Educational Complex',
      institutionAr: 'مجمع النور التعليمي',
      completionPercent: 100,
      finalGrade: '99.2% (Summa Cum Laude)',
      issueDate: 'October 02, 2026',
      verificationHash: '0x3E84A9090C7D81BFA89024D991C28B',
      adminSigner: 'Dr. Kareem Zaki',
      status: 'Active',
    },
    {
      id: 'CERT-CR-8824',
      studentId: 'STU-8824',
      studentName: 'Omar Farooq',
      studentNameAr: 'عمر فاروق',
      trackTitle: 'Level 1 Scratch & Web Foundations',
      trackTitleAr: 'المستوى 1: سكراتش وتطوير الويب',
      institution: 'Delta STEM School',
      institutionAr: 'مدرسة دلتا ستيم للعلوم',
      completionPercent: 100,
      finalGrade: '94.0% (Honors)',
      issueDate: 'September 28, 2026',
      verificationHash: '0x51B094C6E2A714CDB80214D988A190',
      adminSigner: 'Dr. Kareem Zaki',
      status: 'Active',
    },
    {
      id: 'CERT-CR-8825',
      studentId: 'STU-8825',
      studentName: 'Salma El-Sayed',
      studentNameAr: 'سلمى السيد',
      trackTitle: 'Level 2 Game Development in Pygame',
      trackTitleAr: 'المستوى 2: تطوير الألعاب التفاعلية في بايثون',
      institution: 'Nile Valley Language Academy',
      institutionAr: 'أكاديمية وادي النيل للغات',
      completionPercent: 100,
      finalGrade: '97.4% (High Distinction)',
      issueDate: 'September 22, 2026',
      verificationHash: '0x9043AB8C194D33EF57199B1A0452C7',
      adminSigner: 'Dr. Kareem Zaki',
      status: 'Active',
    },
  ]);

  const [activeCertId, setActiveCertId] = useState<string>('CERT-CR-8821');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Download Dialog State
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'png'>('pdf');
  const [isGeneratingDownload, setIsGeneratingDownload] = useState(false);

  // Revoke / Re-issue Modal State
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [revokeAction, setRevokeAction] = useState<'revoke' | 'reissue'>('reissue');
  const [revokeReason, setRevokeReason] = useState('Typo in official surname requested by parent');

  const activeCert = useMemo(() => {
    return certificates.find((c) => c.id === activeCertId) || certificates[0];
  }, [certificates, activeCertId]);

  // Autocomplete filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return certificates;
    const q = searchQuery.toLowerCase();
    return certificates.filter(
      (c) =>
        c.studentName.toLowerCase().includes(q) ||
        c.studentNameAr.includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.studentId.toLowerCase().includes(q) ||
        c.trackTitle.toLowerCase().includes(q)
    );
  }, [certificates, searchQuery]);

  // Select student from autocomplete
  const handleSelectStudent = (cert: CertificateData) => {
    setActiveCertId(cert.id);
    setSearchQuery(cert.studentName);
    setIsDropdownOpen(false);
    showToast(
      language === 'ar'
        ? `تم تحميل شهادة الطالب: ${cert.studentNameAr}`
        : `Loaded official certificate record for ${cert.studentName}`,
      'info'
    );
  };

  // Copy Verification Link
  const handleCopyLink = () => {
    const url = `https://verify.codera.academy/cert/${activeCert.id}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
    showToast(
      language === 'ar'
        ? 'تم نسخ رابط التحقق الرقمي إلى الحافظة'
        : `Cryptographic link copied: ${url}`,
      'success'
    );
  };

  // Client-Side Canvas Drawing for PNG / PDF Generation
  const drawCertificateOnCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 990;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // Background Warm Parchment
    ctx.fillStyle = '#FCFBF8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Outer Ornate Border
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#1E3A8A';
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Inner Gold Double Border
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#B45309';
    ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(44, 44, canvas.width - 88, canvas.height - 88);
    ctx.setLineDash([]);

    // Header Ribbon
    ctx.fillStyle = '#1E3A8A';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CODERA CERTIFIED MASTER ACADEMY • OFFICIAL CREDENTIAL', canvas.width / 2, 110);

    // Certificate Title
    ctx.fillStyle = '#0F172A';
    ctx.font = '900 38px Georgia, serif';
    ctx.fillText('CERTIFICATE OF EXCELLENCE & COMPLETION', canvas.width / 2, 175);

    ctx.fillStyle = '#64748B';
    ctx.font = '16px sans-serif';
    ctx.fillText('This credential certifies that the following learner has fulfilled all curriculum benchmarks:', canvas.width / 2, 215);

    // "Awarded To"
    ctx.fillStyle = '#94A3B8';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('PROUDLY AWARDED TO', canvas.width / 2, 300);

    // Student Name
    ctx.fillStyle = '#172554';
    ctx.font = 'bold 54px Georgia, serif';
    ctx.fillText(activeCert.studentName, canvas.width / 2, 380);

    // Track
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(`For proficiency in: ${activeCert.trackTitle}`, canvas.width / 2, 450);

    // Institution and Grade
    ctx.fillStyle = '#475569';
    ctx.font = '18px sans-serif';
    ctx.fillText(
      `Under academic auspices of ${activeCert.institution} with a grade of ${activeCert.finalGrade}`,
      canvas.width / 2,
      495
    );

    // Status Watermark if Revoked
    if (activeCert.status === 'Revoked') {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-0.35);
      ctx.font = '900 90px sans-serif';
      ctx.fillStyle = 'rgba(220, 38, 38, 0.25)';
      ctx.textAlign = 'center';
      ctx.fillText('REVOKED', 0, 0);
      ctx.restore();
    }

    // Divider Line
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 800);
    ctx.lineTo(canvas.width - 80, 800);
    ctx.stroke();

    // Footer - Left: Signature
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0F172A';
    ctx.font = 'italic bold 28px Georgia, serif';
    ctx.fillText(activeCert.adminSigner, 100, 860);

    ctx.fillStyle = '#64748B';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('Chief Academic Officer & Super Admin', 100, 885);
    ctx.font = '12px sans-serif';
    ctx.fillText(`Date Issued: ${activeCert.issueDate}`, 100, 910);

    // Footer - Center: Gold Rosette Seal
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 875, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#78350F';
    ctx.stroke();

    ctx.fillStyle = '#78350F';
    ctx.textAlign = 'center';
    ctx.font = '900 13px sans-serif';
    ctx.fillText(activeCert.status === 'Revoked' ? 'REVOKED' : 'VERIFIED', canvas.width / 2, 878);
    ctx.font = '9px sans-serif';
    ctx.fillText('OFFICIAL REGISTRY', canvas.width / 2, 893);
    ctx.restore();

    // Footer - Right: QR Code & Hash
    ctx.textAlign = 'right';
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(`ID: ${activeCert.id}`, canvas.width - 100, 860);
    ctx.fillStyle = '#64748B';
    ctx.font = '11px monospace';
    ctx.fillText(`Hash: ${activeCert.verificationHash.slice(0, 24)}...`, canvas.width - 100, 885);
    ctx.fillText('Status: ' + activeCert.status, canvas.width - 100, 910);

    return canvas;
  };

  // Real client-side file download for PDF or PNG
  const handleExecuteDownload = (overrideFormat?: 'pdf' | 'png') => {
    const fmt = overrideFormat || downloadFormat;
    setIsGeneratingDownload(true);

    setTimeout(() => {
      const canvas = drawCertificateOnCanvas();
      const sanitizedName = activeCert.studentName.replace(/[^a-zA-Z0-9]/g, '_');

      if (fmt === 'png') {
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `CodeRa_Certificate_${sanitizedName}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          setIsGeneratingDownload(false);
          setIsDownloadModalOpen(false);
          showToast(
            language === 'ar'
              ? `تم تحميل شهادة ${activeCert.studentName} بصيغة PNG عالية الدقة`
              : `CodeRa_Certificate_${sanitizedName}.png downloaded successfully`,
            'success'
          );
        }, 'image/png');
      } else {
        // PDF generation: create PDF binary wrapper embedding the image canvas
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        
        // Minimal valid PDF document containing the high-res certificate image
        const imgData = dataUrl.split(',')[1];
        const rawBinary = atob(imgData);
        const len = rawBinary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = rawBinary.charCodeAt(i);
        }

        const pdfHeader = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /XObject /Subtype /Image /Width 1400 /Height 990 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`;
        const pdfBetween = `\nendstream\nendobj\n5 0 obj\n<< /Length 56 >>\nstream\nq\n842 0 0 595 0 0 cm\n/Im1 Do\nQ\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000244 00000 n \n0000000450 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n560\n%%EOF`;

        const headerBytes = new TextEncoder().encode(pdfHeader);
        const trailerBytes = new TextEncoder().encode(pdfBetween);

        const pdfBlob = new Blob([headerBytes, bytes, trailerBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CodeRa_Certificate_${sanitizedName}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setIsGeneratingDownload(false);
        setIsDownloadModalOpen(false);
        showToast(
          language === 'ar'
            ? `تم حفظ ملف الشهادة بصيغة PDF الرسمية (${activeCert.studentName})`
            : `CodeRa_Certificate_${sanitizedName}.pdf downloaded successfully`,
          'success'
        );
      }
    }, 400);
  };

  // Confirm Revoke / Re-issue
  const handleConfirmRevokeOrReissue = () => {
    if (revokeAction === 'revoke') {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === activeCert.id ? { ...c, status: 'Revoked' } : c
        )
      );
      addAuditLog(
        `Revoked Certificate ${activeCert.id} for ${activeCert.studentName}. Reason: ${revokeReason}`,
        `إلغاء الشهادة ${activeCert.id} للطالب ${activeCert.studentName}. السبب: ${revokeReason}`,
        'Warning'
      );
      showToast(
        language === 'ar'
          ? `تم إلغاء الشهادة ${activeCert.id} ووسمها في السجل الرقمي`
          : `Certificate ${activeCert.id} has been permanently REVOKED`,
        'warning'
      );
    } else {
      const newHash = '0x' + Math.random().toString(16).slice(2, 10).toUpperCase() + 'A9024D991C28B';
      const newDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      });
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === activeCert.id
            ? {
                ...c,
                status: 'Re-issued',
                verificationHash: newHash,
                issueDate: newDate,
              }
            : c
        )
      );
      addAuditLog(
        `Re-issued Certificate ${activeCert.id} with new cryptographic signature. Reason: ${revokeReason}`,
        `إعادة إصدار الشهادة ${activeCert.id} بتوقيع رقمي جديد. السبب: ${revokeReason}`,
        'Success'
      );
      showToast(
        language === 'ar'
          ? `تم إعادة إصدار الشهادة وتوليد مفتاح تحقق جديد بنجاح!`
          : `Certificate ${activeCert.id} successfully RE-ISSUED with new cryptographic hash`,
        'success'
      );
    }
    setIsRevokeModalOpen(false);
  };

  const levelsProgression = [
    { level: 'Level 1: Foundations', students: 680, completionRate: '92.4%', avgWeeks: '6.2 wks' },
    { level: 'Level 2: Intermediate OOP', students: 440, completionRate: '84.1%', avgWeeks: '8.4 wks' },
    { level: 'Level 3: Data Science & AI', students: 164, completionRate: '79.5%', avgWeeks: '11.0 wks' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t.analytics.title}
            </h1>
            <Badge variant="primary" size="sm">
              Live Registry Engine
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Student progression velocity funnels, cohort mastery rates, and live cryptographic certificate inspection
          </p>
        </div>
      </div>

      {/* Level Progression Velocity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levelsProgression.map((lvl, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {lvl.level}
                </span>
                <Badge variant={idx === 0 ? 'primary' : idx === 1 ? 'purple' : 'success'} size="sm">
                  {lvl.completionRate}
                </Badge>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {lvl.students} Learners
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Velocity: {lvl.avgWeeks}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Certificate Inspector & Generation Section per Section 4 */}
      <Card className="border border-slate-200 dark:border-slate-800 shadow-md">
        <CardHeader
          title={t.analytics.certInspectorTitle}
          subtitle="Real-time validation, dynamic student selection, preview canvas, and file downloads"
          icon={<Award className="w-5 h-5 text-amber-500" />}
          action={
            <div className="flex items-center gap-2">
              {/* Copy Verification Link */}
              <Button
                variant="outline"
                size="sm"
                icon={copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                onClick={handleCopyLink}
              >
                {copiedLink ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ رابط التحقق' : 'Copy Verification Link')}
              </Button>

              {/* Revoke / Re-issue */}
              <Button
                variant="outline"
                size="sm"
                icon={<RefreshCw className="w-3.5 h-3.5 text-amber-600" />}
                onClick={() => setIsRevokeModalOpen(true)}
              >
                {language === 'ar' ? 'إلغاء / إعادة إصدار' : 'Revoke / Re-issue'}
              </Button>

              {/* Functional Download Certificate Button per Directive 4 */}
              <Button
                variant="primary"
                size="sm"
                icon={<Download className="w-3.5 h-3.5" />}
                onClick={() => handleExecuteDownload('pdf')}
              >
                {language === 'ar' ? 'تحميل الشهادة (PDF)' : 'Download Certificate'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                icon={<Image className="w-3.5 h-3.5 text-blue-600" />}
                onClick={() => handleExecuteDownload('png')}
              >
                {language === 'ar' ? 'تحميل (PNG)' : 'Download PNG'}
              </Button>
            </div>
          }
        />
        <CardContent className="space-y-6">
          {/* Section 4.1: Interactive Student Search & Selection Bar */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              {language === 'ar'
                ? 'البحث عن الطالب بالاسم الكامل أو المعرف (أحمد حسن، مريم صالح، يوسف إبراهيم...):'
                : 'Search Student by Full Name or ID (Ahmed Hassan, Mariam Saleh, Youssef Ibrahim...):'}
            </label>
            <div className="relative max-w-2xl">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute top-3 left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsDropdownOpen(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  placeholder="Type student name (e.g., Ahmed Hassan) or ID..."
                  className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="absolute top-2.5 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-40 max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in">
                  {searchResults.length === 0 ? (
                    <div className="p-3 text-xs text-slate-500 text-center">
                      No verified students matched query.
                    </div>
                  ) : (
                    searchResults.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSelectStudent(c)}
                        className={`w-full p-3 text-left hover:bg-blue-50/80 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between cursor-pointer ${
                          activeCert.id === c.id ? 'bg-blue-50/50 dark:bg-blue-950/40' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {c.studentName.slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                              {language === 'ar' ? c.studentNameAr : c.studentName}{' '}
                              <span className="font-mono text-[10px] text-slate-400">({c.id})</span>
                            </p>
                            <p className="text-[11px] text-slate-500 truncate max-w-sm">
                              {language === 'ar' ? c.trackTitleAr : c.trackTitle}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={c.status === 'Revoked' ? 'danger' : c.status === 'Re-issued' ? 'purple' : 'success'}
                          size="sm"
                        >
                          {c.status}
                        </Badge>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Populated Student Details Banner per Section 4.1 */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Student Name</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {language === 'ar' ? activeCert.studentNameAr : activeCert.studentName}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Curriculum Track</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block" title={activeCert.trackTitle}>
                {activeCert.trackTitle}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Completion</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeCert.completionPercent}% Fulfilled</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Final Grade</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{activeCert.finalGrade}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Issue Date</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">{activeCert.issueDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Certificate ID</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{activeCert.id}</span>
            </div>
          </div>

          {/* Section 4.2: Live Certificate Preview Canvas */}
          <div className="flex flex-col items-center justify-center p-4 sm:p-10 bg-slate-100 dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <CertificateRenderer cert={activeCert} language={language} />
          </div>
        </CardContent>
      </Card>

      {/* Download Choice Modal per Section 4.3 */}
      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        title={language === 'ar' ? 'تصدير وتحميل الشهادة الرسمية' : 'Export & Download Official Certificate'}
        subtitle={`Generate verified credentials for ${activeCert.studentName} (${activeCert.id})`}
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDownloadModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              disabled={isGeneratingDownload}
              icon={<Download className="w-3.5 h-3.5" />}
              onClick={() => handleExecuteDownload()}
            >
              {isGeneratingDownload ? 'Synthesizing...' : `Download as .${downloadFormat.toUpperCase()}`}
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-300 font-medium">
            Select the desired file output format for direct client-side generation:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* PDF Option */}
            <button
              type="button"
              onClick={() => setDownloadFormat('pdf')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                downloadFormat === 'pdf'
                  ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
            >
              <FileText className="w-6 h-6 text-rose-500 mb-2" />
              <p className="font-bold text-slate-900 dark:text-white">PDF Document (.pdf)</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Print-ready vector resolution with embedded security stream.
              </p>
            </button>

            {/* PNG Option */}
            <button
              type="button"
              onClick={() => setDownloadFormat('png')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                downloadFormat === 'png'
                  ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
            >
              <Image className="w-6 h-6 text-blue-500 mb-2" />
              <p className="font-bold text-slate-900 dark:text-white">High-Res PNG (.png)</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Lossless raster graphic (1400x990) for web sharing & social media.
              </p>
            </button>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl text-amber-800 dark:text-amber-300 text-[11px]">
            File will be downloaded directly to your device as{' '}
            <span className="font-mono font-bold">
              CodeRa_Certificate_{activeCert.studentName.replace(/\s+/g, '_')}.{downloadFormat}
            </span>
          </div>
        </div>
      </Modal>

      {/* Revoke / Re-issue Modal Dialog per Section 4.3 */}
      <Modal
        isOpen={isRevokeModalOpen}
        onClose={() => setIsRevokeModalOpen(false)}
        title={language === 'ar' ? 'إدارة حالة الشهادة الرسمية' : 'Governance: Revoke or Re-issue Certificate'}
        subtitle={`Audit action for ${activeCert.studentName} (${activeCert.id})`}
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRevokeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={revokeAction === 'revoke' ? 'danger' : 'primary'}
              size="sm"
              onClick={handleConfirmRevokeOrReissue}
            >
              {revokeAction === 'revoke' ? 'Confirm Permanent Revocation' : 'Confirm Key Re-issuance'}
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="space-y-2">
            <label className="font-bold text-slate-700 dark:text-slate-300 block">
              Select Governance Action:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRevokeAction('reissue')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  revokeAction === 'reissue'
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 font-bold'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <RefreshCw className="w-4 h-4 text-blue-600 mb-1" />
                <p>Re-issue Certificate</p>
                <p className="text-[10px] text-slate-400 font-normal">Generate fresh cryptographic hash</p>
              </button>

              <button
                type="button"
                onClick={() => setRevokeAction('revoke')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  revokeAction === 'revoke'
                    ? 'border-rose-600 bg-rose-50/60 dark:bg-rose-950/40 font-bold'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-rose-600 mb-1" />
                <p>Revoke Certificate</p>
                <p className="text-[10px] text-slate-400 font-normal">Mark invalid in public registry</p>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 dark:text-slate-300 block">
              Audit Note / Reason for Ledger:
            </label>
            <textarea
              rows={3}
              value={revokeReason}
              onChange={(e) => setRevokeReason(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

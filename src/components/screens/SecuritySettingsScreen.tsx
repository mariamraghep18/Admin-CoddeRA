'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShieldAlert,
  KeyRound,
  Smartphone,
  Laptop,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  RotateCcw,
  Save,
  QrCode,
  Copy,
  Trash2,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

export function SecuritySettingsScreen() {
  const { language, isRtl, showToast, addAuditLog } = useApp();

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // 2FA state
  const [is2faModalOpen, setIs2faModalOpen] = useState(false);
  const [totpInput, setTotpInput] = useState('');

  // Active Sessions
  const [sessions, setSessions] = useState([
    {
      id: 'SESS-01',
      device: 'Windows Workstation • Chrome 134',
      location: 'Cairo, Egypt (197.34.88.12)',
      activeTime: 'Active Now (Current Session)',
      isCurrent: true,
    },
    {
      id: 'SESS-02',
      device: 'MacBook Pro • Safari 18.2',
      location: 'Giza, Egypt (156.210.45.9)',
      activeTime: '2 hours ago',
      isCurrent: false,
    },
    {
      id: 'SESS-03',
      device: 'iPad Pro • CodeRa Governance App',
      location: 'Alexandria, Egypt (197.62.110.4)',
      activeTime: 'Yesterday at 16:30',
      isCurrent: false,
    },
  ]);

  // Calculate password strength
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(newPassword);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showToast(isRtl ? 'يرجى إدخال كلمة المرور الحالية' : 'Current password is required', 'warning');
      return;
    }
    if (newPassword.length < 8) {
      showToast(isRtl ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' : 'Password must be at least 8 characters', 'warning');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast(isRtl ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match', 'warning');
      return;
    }

    addAuditLog('Updated administrator password credentials', 'تغيير كلمة مرور حساب المسؤول وتحديث المفتاح السري');
    showToast(isRtl ? 'تم تحديث كلمة المرور بنجاح' : 'Password changed successfully', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    addAuditLog(`Revoked active administrative session ${sessionId}`, `إنهاء الجلسة الإدارية النشطة ${sessionId}`);
    showToast(isRtl ? 'تم إنهاء الجلسة بنجاح' : 'Session terminated successfully', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === 'ar' ? 'إعدادات الأمان وحماية الجلسة' : 'Security & Session Protection'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'ar'
              ? 'إدارة كلمات المرور، المصادقة الثنائية (2FA)، والجلسات الإدارية النشطة'
              : 'Credentials management, hardware two-factor authentication, and active terminal sessions'}
          </p>
        </div>
        <Badge variant="success" size="md" dot>
          {language === 'ar' ? 'المستوى الأمني: مشدد' : 'Security Posture: Hardened'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Password Update */}
        <Card>
          <CardHeader
            title={language === 'ar' ? 'تحديث كلمة المرور' : 'Update Administrator Password'}
            subtitle={language === 'ar' ? 'تغيير كلمة المرور الدورية لضمان أمان النظام' : 'Enforce high-entropy credential standards'}
          />
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'ar' ? 'كلمة المرور الجديدة' : 'New Strong Password'}
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {newPassword && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{language === 'ar' ? 'قوة كلمة المرور:' : 'Password Strength:'}</span>
                      <span className="font-bold">
                        {strength <= 1 ? (language === 'ar' ? 'ضعيفة' : 'Weak') : strength <= 3 ? (language === 'ar' ? 'متوسطة' : 'Good') : (language === 'ar' ? 'قوية جداً ✓' : 'Very Strong ✓')}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex gap-1">
                      <div className={`h-full flex-1 ${strength >= 1 ? (strength === 1 ? 'bg-rose-500' : 'bg-emerald-500') : 'bg-slate-300'}`} />
                      <div className={`h-full flex-1 ${strength >= 2 ? (strength <= 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-slate-300'}`} />
                      <div className={`h-full flex-1 ${strength >= 3 ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      <div className={`h-full flex-1 ${strength >= 4 ? 'bg-emerald-600' : 'bg-slate-300'}`} />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm New Password'}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button variant="primary" size="sm" type="submit" className="w-full mt-2">
                <Save className="w-3.5 h-3.5 mr-1" />
                {language === 'ar' ? 'تحديث كلمة المرور وحفظ الأمان' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Card 2: Two-Factor Authentication (2FA) */}
        <Card>
          <CardHeader
            title={language === 'ar' ? 'المصادقة الثنائية (2FA)' : 'Two-Factor Authentication (2FA)'}
            subtitle={language === 'ar' ? 'حماية الحساب الإداري بواسطة رموز التحقق أو مفاتيح الأمان' : 'Hardware token or authenticator app integration'}
          />
          <CardContent className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <p className="font-bold text-emerald-900 dark:text-emerald-200">
                  {language === 'ar' ? 'المصادقة الثنائية مفعلة ونشطة' : '2FA Protection Active (FIDO2 Hardware Key)'}
                </p>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
                  {language === 'ar'
                    ? 'يتم التحقق من الرمز السداسي أو مفتاح الأمان عند تسجيل الدخول من أي جهاز جديد.'
                    : 'Your session requires cryptographic token authentication upon each new workstation login.'}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">Google / Microsoft Authenticator</p>
                    <p className="text-[10px] text-slate-400">TOTP (Time-based One-Time Password)</p>
                  </div>
                </div>
                <Badge variant="primary" size="sm">Configured</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs">
                <div className="flex items-center gap-2.5">
                  <KeyRound className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">FIDO2 / WebAuthn Hardware Token</p>
                    <p className="text-[10px] text-slate-400">Yubikey 5C NFC Primary Token</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">Primary</Badge>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => setIs2faModalOpen(true)}
            >
              <QrCode className="w-3.5 h-3.5 mr-1" />
              {language === 'ar' ? 'عرض رمز الاستعادة والـ QR Code' : 'View 2FA QR Code & Backup Codes'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Card 3: Active Administrative Sessions */}
      <Card>
        <CardHeader
          title={language === 'ar' ? 'الجلسات الإدارية النشطة' : 'Active Administrative Sessions'}
          subtitle={language === 'ar' ? 'الأجهزة المتصلة حالياً بحساب السوبر أدمن' : 'Authenticated endpoints currently authorized for platform access'}
        />
        <CardContent>
          <div className="space-y-3">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-blue-600 rounded-lg shrink-0">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900 dark:text-white">{sess.device}</p>
                      {sess.isCurrent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400">
                          {language === 'ar' ? 'الجهاز الحالي' : 'Current Terminal'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {sess.location} • <span className="text-slate-400">{sess.activeTime}</span>
                    </p>
                  </div>
                </div>

                {!sess.isCurrent && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRevokeSession(sess.id)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    {language === 'ar' ? 'إنهاء الجلسة' : 'Revoke Session'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 2FA Modal */}
      <Modal
        isOpen={is2faModalOpen}
        onClose={() => setIs2faModalOpen(false)}
        title={language === 'ar' ? 'رمز المصادقة الثنائية (محاكاة)' : 'Two-Factor Authentication Setup'}
      >
        <div className="space-y-4 text-center">
          <div className="w-40 h-40 bg-white p-3 rounded-2xl border border-slate-200 mx-auto flex items-center justify-center shadow-xs">
            <QrCode className="w-32 h-32 text-slate-800" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {language === 'ar' ? 'المفتاح السري الاحتياطي:' : 'Manual Security Token:'}
            </p>
            <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-blue-600 dark:text-blue-400">
              CDRA-2026-AUTH-FIDO-9982
            </code>
          </div>
          <p className="text-[11px] text-slate-500">
            {language === 'ar'
              ? 'امسح الرمز عبر تطبيق Google Authenticator لتوليد الرموز السداسية المتغيرة كل 30 ثانية.'
              : 'Scan with Google/Microsoft Authenticator to generate time-based verification codes.'}
          </p>
          <Button variant="primary" size="sm" className="w-full" onClick={() => setIs2faModalOpen(false)}>
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

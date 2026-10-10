'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Globe,
  Moon,
  Sun,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/Button';

export interface LoginScreenProps {
  onLoginSuccess: () => void;
  onOpenRegister: () => void;
  isDark?: boolean;
  isRTL?: boolean;
  onToggleTheme?: () => void;
  onToggleLanguage?: () => void;
}

export function LoginScreen({
  onLoginSuccess,
  onOpenRegister,
  isDark: propIsDark,
  isRTL: propIsRTL,
  onToggleTheme,
  onToggleLanguage,
}: LoginScreenProps) {
  const {
    login,
    setIsAuthenticated,
    isDark: ctxIsDark,
    isRtl: ctxIsRtl,
    toggleTheme,
    toggleLanguage,
    showToast,
  } = useApp();

  const isDark = propIsDark !== undefined ? propIsDark : ctxIsDark;
  const isRTL = propIsRTL !== undefined ? propIsRTL : ctxIsRtl;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotPhase, setForgotPhase] = useState<'request' | 'verify'>('request');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState(['', '', '', '', '', '']);
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotPass, setShowForgotPass] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    login(email || 'admin@codera.academy', password || 'SuperAdmin2026!', 'Super Admin', rememberMe);
    setIsAuthenticated(true);
    onLoginSuccess();
  };

  const handleSendForgotCode = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPhase('verify');
    showToast(
      isRTL ? 'تم إرسال رمز التحقق إلى بريدك الإلكتروني' : 'Verification code dispatched to your email',
      'info'
    );
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotNewPassword || forgotNewPassword.length < 8) {
      showToast(isRTL ? 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' : 'Password must be at least 8 characters', 'warning');
      return;
    }
    if (forgotNewPassword !== forgotConfirmPassword) {
      showToast(isRTL ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match', 'warning');
      return;
    }
    setIsForgotModalOpen(false);
    showToast(isRTL ? 'تم إعادة تعيين كلمة المرور بنجاح!' : 'Password reset successful! Please sign in.', 'success');
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
        isDark ? 'dark bg-[#0B0F19] text-slate-100' : 'bg-[#FBFBFA] text-slate-900'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Top Header Controls */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.svg" alt="CodeRa Logo" className="w-9 h-9 object-contain" />
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">CodeRa</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLanguage || toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xs text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{isRTL ? 'English (LTR)' : 'العربية (RTL)'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme || toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 my-auto">
        <div className="w-full max-w-md bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 mx-auto">
              <img src="/assets/logo.svg" alt="CodeRa Logo" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">CodeRa</h1>
            <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
              {isRTL ? 'بوابة الحوكمة الإدارية' : 'OFFICIAL GOVERNANCE PORTAL'}
            </div>
            <h2 className="text-lg font-bold pt-1 text-slate-900 dark:text-white">
              {isRTL ? 'تسجيل الدخول الإداري' : 'Admin Sign In'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isRTL ? 'أدخل بياناتك للوصول إلى لوحة التحكم' : 'Enter your credentials to access the governance workspace'}
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5 text-start">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'right-3.5' : 'left-3.5'} pointer-events-none z-10`} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@codera.academy"
                  className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-start">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRTL ? 'كلمة المرور' : 'Password'}
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </button>
              </div>
              <div className="relative">
                <Lock className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'right-3.5' : 'left-3.5'} pointer-events-none z-10`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full ${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'} py-2.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors`}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassword((prev) => !prev);
                  }}
                  className={`absolute top-2.5 ${isRTL ? 'left-3' : 'right-3'} cursor-pointer z-10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 text-blue-600" /> : <Eye className="w-4 h-4 text-slate-500" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1 text-start">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                {isRTL ? 'تذكرني على هذا الجهاز' : 'Remember me on this workstation'}
              </label>
            </div>

            {/* Submit Sign In Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{isRTL ? 'تسجيل الدخول إلى لوحة التحكم' : 'Sign In to Dashboard'}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            {/* Registration Link */}
            <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenRegister();
                }}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {isRTL ? 'ليس لديك حساب؟ إنشاء حساب جديد (Registration Now)' : "Don't have an account? Register Now"}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title={isRTL ? 'استعادة كلمة المرور' : 'Reset Administrator Password'}
      >
        <div className="space-y-4">
          {forgotPhase === 'request' ? (
            <form onSubmit={handleSendForgotCode} className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isRTL
                  ? 'أدخل بريدك الإلكتروني المسجل وسنقوم بإرسال رمز التحقق السداسي لإعادة التعيين.'
                  : 'Enter your registered work email to receive a 6-digit recovery code.'}
              </p>
              <div className="space-y-1 text-start">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRTL ? 'البريد الإلكتروني المسجل' : 'Registered Work Email'}
                </label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="admin@codera.academy"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
              <Button variant="primary" size="sm" type="submit" className="w-full">
                {isRTL ? 'إرسال رمز التحقق' : 'Send Verification Code'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-1 text-start">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRTL ? 'رمز التحقق (6 أرقام)' : '6-Digit Recovery OTP'}
                </label>
                <div className="grid grid-cols-6 gap-2" dir="ltr">
                  {forgotOtp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`f-otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value;
                        const next = [...forgotOtp];
                        next[idx] = val;
                        setForgotOtp(next);
                        if (val && idx < 5) {
                          document.getElementById(`f-otp-${idx + 1}`)?.focus();
                        }
                      }}
                      className="w-full h-10 text-center font-bold text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1 text-start">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRTL ? 'كلمة المرور الجديدة' : 'New Strong Password'}
                </label>
                <input
                  type={showForgotPass ? 'text' : 'password'}
                  required
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="space-y-1 text-start">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isRTL ? 'تأكيد كلمة المرور' : 'Confirm New Password'}
                </label>
                <input
                  type="password"
                  required
                  value={forgotConfirmPassword}
                  onChange={(e) => setForgotConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <Button variant="success" size="sm" type="submit" className="w-full">
                {isRTL ? 'حفظ وتأكيد التغيير' : 'Reset Password & Proceed'}
              </Button>
            </form>
          )}
        </div>
      </Modal>

      {/* Clean Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 text-center text-[11px] text-slate-400">
        © 2026 CodeRa EdTech Platform • Developed by Mariam Raghep • All Rights Reserved.
      </footer>
    </div>
  );
}

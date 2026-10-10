'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  UploadCloud,
  X,
  ArrowRight,
  ArrowLeft,
  FileText,
  Building,
  RotateCcw,
  Sparkles,
  Award,
  Globe,
  Sun,
  Moon,
  AlertTriangle,
  PenTool,
} from 'lucide-react';

export interface RegistrationScreenProps {
  onBackToLogin: () => void;
  onCompleteRegistration?: () => void;
  isDark?: boolean;
  isRTL?: boolean;
  onToggleTheme?: () => void;
  onToggleLanguage?: () => void;
}

export function RegistrationScreen({
  onBackToLogin,
  onCompleteRegistration,
  isDark: propIsDark,
  isRTL: propIsRTL,
  onToggleTheme,
  onToggleLanguage,
}: RegistrationScreenProps) {
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

  // Active Wizard Section: A, B, C, D, E, F, G
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);

  // SECTION A: Personal Information
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+20');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dob, setDob] = useState('1992-05-14');
  const [country, setCountry] = useState('Egypt');
  const [accountType, setAccountType] = useState<'Administrator' | 'KYC Specialist' | 'Curriculum Manager'>('Administrator');

  // SECTION B: Email Verification
  const [emailOtp, setEmailOtp] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailCooldown, setEmailCooldown] = useState(45);
  const [isEmailSending, setIsEmailSending] = useState(false);

  // SECTION C: Phone Verification
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneCooldown, setPhoneCooldown] = useState(60);
  const [isPhoneSending, setIsPhoneSending] = useState(false);

  // SECTION D: Identity Documents
  const [frontIdFile, setFrontIdFile] = useState<{ name: string; size: string; preview: string } | null>(null);
  const [backIdFile, setBackIdFile] = useState<{ name: string; size: string; preview: string } | null>(null);
  const [idDragFront, setIdDragFront] = useState(false);
  const [idDragBack, setIdDragBack] = useState(false);
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  // SECTION E: Signature Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureConsent, setSignatureConsent] = useState(true);

  // SECTION F: Recommendations & Profile
  const [summary, setSummary] = useState(
    'Specialist in youth digital literacy, STEM curriculum governance, and institutional compliance frameworks.'
  );
  const [skills, setSkills] = useState('Python, Curriculum Oversight, EdTech Accreditation, RBAC Governance');
  const [recommenderName, setRecommenderName] = useState('Dr. Tarek Shawki (Advisor)');
  const [recommenderEmail, setRecommenderEmail] = useState('t.shawki@education-board.gov.eg');
  const [recommendationDocName, setRecommendationDocName] = useState<string | null>('endorsement_letter_board.pdf');

  // Cooldown timers
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (emailCooldown > 0) {
      timer = setTimeout(() => setEmailCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [emailCooldown]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phoneCooldown > 0) {
      timer = setTimeout(() => setPhoneCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [phoneCooldown]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isDark ? '#60A5FA' : '#1D4ED8';
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // File handlers with safe in-memory previews
  const handleFile = (file: File, type: 'front' | 'back') => {
    if (file.size > 10 * 1024 * 1024) {
      showToast(isRTL ? 'حجم الملف يتجاوز 10 ميجابايت' : 'File exceeds 10MB limit', 'warning');
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    const meta = {
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      preview: previewUrl,
    };
    if (type === 'front') setFrontIdFile(meta);
    else setBackIdFile(meta);
    showToast(isRTL ? 'تم رفع الملف بنجاح (معاينة مؤقتة)' : 'Document attached (temporary in-memory preview)', 'success');
  };

  const handleFinishRegistration = () => {
    login(email || 'mariam.raghep@codera.academy', password || 'SuperAdmin2026!', 'Super Admin', true);
    setIsAuthenticated(true);
    if (showToast) {
      showToast(
        isRTL
          ? 'تم اعتماد تسجيل الحساب بنجاح! مرحباً بك في لوحة تحكم كودرا.'
          : 'Registration approved! Welcome to CodeRa Governance Suite.',
        'success'
      );
    }
    if (onCompleteRegistration) {
      onCompleteRegistration();
    }
  };

  // Step names
  const steps = [
    { num: 1, label: isRTL ? 'البيانات الشخصية' : 'Personal Info', code: 'A' },
    { num: 2, label: isRTL ? 'تأكيد البريد' : 'Email OTP', code: 'B' },
    { num: 3, label: isRTL ? 'تأكيد الهاتف' : 'Phone OTP', code: 'C' },
    { num: 4, label: isRTL ? 'وثائق الهوية' : 'Identity Docs', code: 'D' },
    { num: 5, label: isRTL ? 'التوقيع الرقمي' : 'Signature', code: 'E' },
    { num: 6, label: isRTL ? 'التوصيات والخبرات' : 'Profile & Letters', code: 'F' },
    { num: 7, label: isRTL ? 'مراجعة وتأكيد' : 'Final Review', code: 'G' },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
        isDark ? 'dark bg-[#0B0F19] text-slate-100' : 'bg-[#FBFBFA] text-slate-900'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Top Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.svg" alt="CodeRa Logo" className="w-9 h-9 object-contain" />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CodeRa</span>
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
            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-300"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </header>

      {/* Main Registration Wizard Container */}
      <main className="flex-1 flex items-center justify-center p-4 my-auto">
        <div className="w-full max-w-2xl bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-6">
          
          {/* Main Title & Prompt Requirement */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 mx-auto">
              <img src="/assets/logo.svg" alt="CodeRa Logo" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              CodeRa — Registration Now
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {isRTL
                ? 'أنشئ حسابك الإداري المعتمد للوصول إلى منصة حوكمة كودرا التعليمية'
                : 'Create your authorized administrative account to access CodeRa governance suite'}
            </p>
          </div>

          {/* Progress Indicator (Sections A through G) */}
          <div className="overflow-x-auto pb-1">
            <div className="flex items-center justify-between min-w-[500px] border-b border-slate-100 dark:border-slate-800 pb-3">
              {steps.map((st) => (
                <button
                  key={st.num}
                  type="button"
                  onClick={() => setActiveStep(st.num as any)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    activeStep === st.num
                      ? 'text-blue-600 dark:text-blue-400'
                      : activeStep > st.num
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-400 dark:text-slate-600'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      activeStep === st.num
                        ? 'bg-blue-600 text-white shadow-xs'
                        : activeStep > st.num
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {activeStep > st.num ? '✓' : st.code}
                  </span>
                  <span className="hidden sm:inline">{st.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION A: Personal Information */}
          {/* ============================================================== */}
          {activeStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isRTL ? 'القسم أ: البيانات الشخصية والاعتماد' : 'Section A: Personal Information'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {isRTL ? 'أدخل اسمك القانوني وبيانات الاتصال الأساسية' : 'Enter your legal identity and credential coordinates'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'الاسم القانوني بالكامل *' : 'Full Legal Name *'}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Mariam Raghep"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'تاريخ الميلاد' : 'Date of Birth'}
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'البريد الإلكتروني المؤسسي *' : 'Work Email Address *'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mariam.raghep@codera.academy"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'رقم الهاتف المحمول *' : 'Mobile Phone Number *'}
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-20 px-2 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                    >
                      <option value="+20">+20 (EG)</option>
                      <option value="+966">+966 (SA)</option>
                      <option value="+971">+971 (AE)</option>
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10 1234 5678"
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'نوع الحساب / المنصب الإداري' : 'Account Type / Intended Role'}
                  </label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  >
                    <option value="Administrator">Super Administrator</option>
                    <option value="KYC Specialist">Sub-Admin (KYC & Student Verification)</option>
                    <option value="Curriculum Manager">Sub-Admin (Curriculum & Content QA)</option>
                  </select>
                </div>

                <div className="space-y-1 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'الدولة / المقر' : 'Country / Location'}
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'كلمة المرور *' : 'Password *'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'تأكيد كلمة المرور *' : 'Confirm Password *'}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {isRTL ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'Already registered? Sign In'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>{isRTL ? 'المتابعة لتأكيد البريد (ب)' : 'Next: Email Verification (B)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION B: Email Verification */}
          {/* ============================================================== */}
          {activeStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isRTL ? 'القسم ب: التحقق من البريد الإلكتروني' : 'Section B: Email Verification Interface'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {isRTL
                    ? `إرسال رمز التحقق إلى: ${email || 'mariam.raghep@codera.academy'}`
                    : `Verification token destination: ${email || 'mariam.raghep@codera.academy'}`}
                </p>
              </div>

              <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-200">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>{email || 'mariam.raghep@codera.academy'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="text-[11px] text-blue-600 hover:underline cursor-pointer font-semibold"
                  >
                    {isRTL ? 'تعديل البريد' : 'Change Email'}
                  </button>
                </div>

                <div className="space-y-1.5 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'رمز التحقق (6 أرقام)' : '6-Digit Verification Code'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      placeholder="849201"
                      className="w-40 text-center tracking-widest font-mono text-sm font-bold px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setEmailOtp('849201');
                        setEmailVerified(true);
                        showToast(isRTL ? 'تم التحقق من البريد بنجاح!' : 'Email successfully verified (Demo simulation)', 'success');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      {emailVerified ? (isRTL ? 'تم التأكيد ✓' : 'Verified ✓') : (isRTL ? 'تحقق الآن' : 'Verify Email')}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    {emailCooldown > 0
                      ? isRTL ? `إعادة الإرسال بعد ${emailCooldown} ثانية` : `Resend code in ${emailCooldown}s`
                      : isRTL ? 'يمكنك إعادة الإرسال الآن' : 'Ready to resend code'}
                  </span>
                  <button
                    type="button"
                    disabled={emailCooldown > 0}
                    onClick={() => {
                      setEmailCooldown(60);
                      showToast('New simulation verification code dispatched', 'info');
                    }}
                    className="text-blue-600 disabled:opacity-50 hover:underline cursor-pointer font-bold"
                  >
                    {isRTL ? 'إعادة إرسال الرمز' : 'Resend Code'}
                  </button>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {isRTL ? '← السابق' : '← Previous'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>{isRTL ? 'المتابعة لتأكيد الهاتف (ج)' : 'Next: Phone Verification (C)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION C: Phone Verification */}
          {/* ============================================================== */}
          {activeStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isRTL ? 'القسم ج: التحقق من رقم الهاتف المحمول' : 'Section C: Phone Verification Interface'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {countryCode} {phone || '10 1234 5678'} • SMS Gateway Token Validation
                </p>
              </div>

              <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-2xl space-y-3">
                <div className="space-y-1.5 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'رمز التأكيد المرسل عبر الرسائل القصيرة (SMS)' : 'SMS Verification Token'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                      placeholder="552190"
                      className="w-40 text-center tracking-widest font-mono text-sm font-bold px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPhoneOtp('552190');
                        setPhoneVerified(true);
                        showToast(isRTL ? 'تم تأكيد رقم الهاتف بنجاح!' : 'Phone OTP verified (Demo simulation)', 'success');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      {phoneVerified ? (isRTL ? 'تم التأكيد ✓' : 'Verified ✓') : (isRTL ? 'تأكيد الهاتف' : 'Verify Phone')}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    {phoneCooldown > 0
                      ? isRTL ? `إعادة الإرسال بعد ${phoneCooldown} ثانية` : `Resend SMS in ${phoneCooldown}s`
                      : isRTL ? 'جاهز لإعادة الإرسال' : 'Ready to resend SMS'}
                  </span>
                  <button
                    type="button"
                    disabled={phoneCooldown > 0}
                    onClick={() => {
                      setPhoneCooldown(60);
                      showToast('SMS token re-dispatched', 'info');
                    }}
                    className="text-emerald-700 dark:text-emerald-400 disabled:opacity-50 hover:underline cursor-pointer font-bold"
                  >
                    {isRTL ? 'إعادة إرسال الرسالة' : 'Resend SMS'}
                  </button>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {isRTL ? '← السابق' : '← Previous'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(4)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>{isRTL ? 'المتابعة لرفع وثائق الهوية (د)' : 'Next: Identity Documents (D)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION D: Identity Document Upload */}
          {/* ============================================================== */}
          {activeStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isRTL ? 'القسم د: وثائق الهوية الرسمية (ملاحظة الخصوصية: حفظ مؤقت بالذاكرة)' : 'Section D: Identity Document Upload (In-Memory Privacy Guard)'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {isRTL
                    ? 'رفع الوجه الأمامي والخلفي لبطاقة الهوية أو جواز السفر (PNG, JPG, PDF حتى 10MB)'
                    : 'Attach Front & Back identity document for institutional verification audit'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Front Side Upload */}
                <div className="space-y-1.5 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'الوجه الأمامي للهوية *' : 'Front-Side Document *'}
                  </label>
                  <input
                    ref={frontInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], 'front')}
                  />
                  {!frontIdFile ? (
                    <div
                      onClick={() => frontInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/40"
                    >
                      <UploadCloud className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {isRTL ? 'رفع الوجه الأمامي' : 'Upload Front ID'}
                      </p>
                      <p className="text-[10px] text-slate-400">Click to browse or drop</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-bold truncate">{frontIdFile.name}</span>
                      </div>
                      <button type="button" onClick={() => setFrontIdFile(null)} className="text-slate-400 hover:text-rose-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Back Side Upload */}
                <div className="space-y-1.5 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'الوجه الخلفي للهوية' : 'Back-Side Document'}
                  </label>
                  <input
                    ref={backInputRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0], 'back')}
                  />
                  {!backIdFile ? (
                    <div
                      onClick={() => backInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/40"
                    >
                      <UploadCloud className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {isRTL ? 'رفع الوجه الخلفي' : 'Upload Back ID'}
                      </p>
                      <p className="text-[10px] text-slate-400">Click to browse or drop</p>
                    </div>
                  ) : (
                    <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-bold truncate">{backIdFile.name}</span>
                      </div>
                      <button type="button" onClick={() => setBackIdFile(null)} className="text-slate-400 hover:text-rose-600">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 text-[11px] text-slate-500">
                <span>Verification State: </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {frontIdFile ? 'Pending Administrative Clearance' : 'Not Submitted'}
                </span>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {isRTL ? '← السابق' : '← Previous'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(5)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>{isRTL ? 'المتابعة للتوقيع الرقمي (هـ)' : 'Next: Signature (E)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION E: Signature */}
          {/* ============================================================== */}
          {activeStep === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isRTL ? 'القسم هـ: التوقيع الرقمي المباشر' : 'Section E: Digital Signature Canvas'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {isRTL
                    ? 'وقع باستخدام الفأرة أو شاشة اللمس لتأكيد التعهد الإداري'
                    : 'Draw your administrative endorsement signature with mouse or touch screen'}
                </p>
              </div>

              <div className="space-y-2 text-start">
                <div className="border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-2 bg-slate-50/50 dark:bg-slate-800/40">
                  <canvas
                    ref={canvasRef}
                    width={560}
                    height={160}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-36 bg-white dark:bg-slate-900 rounded-xl cursor-crosshair border border-dashed border-slate-300 dark:border-slate-700 touch-none"
                  />
                  <div className="flex items-center justify-between pt-2 px-1">
                    <span className="text-[10px] text-slate-400">
                      {hasSignature
                        ? isRTL ? 'تم التقاط التوقيع ✓' : 'Signature Captured ✓'
                        : isRTL ? 'يرجى التوقيع داخل الإطار أعلاه' : 'Draw signature inside box'}
                    </span>
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg cursor-pointer"
                    >
                      {isRTL ? 'مسح وإعادة الرسم' : 'Clear Signature'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={signatureConsent}
                    onChange={(e) => setSignatureConsent(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                    {isRTL
                      ? 'أقر بصحة البيانات ومطابقتها للمعايير الأكاديمية الرسمية لمنصة كودرا.'
                      : 'I acknowledge that submitted identity details conform to CodeRa institutional governance standards.'}
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveStep(4)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {isRTL ? '← السابق' : '← Previous'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(6)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>{isRTL ? 'المتابعة لخطابات التوصية (و)' : 'Next: Recommendations (F)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION F: Recommendations and Professional Profile */}
          {/* ============================================================== */}
          {activeStep === 6 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isRTL ? 'القسم و: التوصيات والملف المهني' : 'Section F: Recommendations & Professional Profile'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {isRTL ? 'بيانات الموصي والمؤهلات الأكاديمية والشهادات الداعمة' : 'Recommender contact and professional qualification background'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1 text-start">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isRTL ? 'النبذة المهنية / سبب الانضمام للمنصة' : 'Professional Summary / Reason for Joining'}
                  </label>
                  <textarea
                    rows={2}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1 text-start">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isRTL ? 'اسم المسؤول الموصي' : 'Recommender Legal Name'}
                    </label>
                    <input
                      type="text"
                      value={recommenderName}
                      onChange={(e) => setRecommenderName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1 text-start">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {isRTL ? 'بريد الموصي المعتمد' : 'Recommender Official Email'}
                    </label>
                    <input
                      type="email"
                      value={recommenderEmail}
                      onChange={(e) => setRecommenderEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>
                </div>

                <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span className="font-bold">{recommendationDocName}</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Attached ✓</span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveStep(5)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {isRTL ? '← السابق' : '← Previous'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(7)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>{isRTL ? 'المتابعة للمراجعة النهائية (ز)' : 'Next: Final Review (G)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION G: Registration Review */}
          {/* ============================================================== */}
          {activeStep === 7 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isRTL ? 'القسم ز: مراجعة البيانات وتأكيد التسجيل' : 'Section G: Registration Review & Account Provisioning'}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {isRTL ? 'ملخص البيانات غير الحساسة لتأكيد فتح حساب الحوكمة' : 'Review non-sensitive credentials before initiating provisioning'}
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {/* Personal Info Review */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Applicant Identity</span>
                    <span className="font-bold text-slate-900 dark:text-white">{fullName || 'Mariam Raghep'}</span>
                    <span className="text-slate-500 block text-[11px]">{email || 'mariam.raghep@codera.academy'} • {accountType}</span>
                  </div>
                  <button type="button" onClick={() => setActiveStep(1)} className="text-blue-600 hover:underline font-bold">Edit</button>
                </div>

                {/* Verification Status */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Verification Tokens</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Email OTP: Verified ✓ • Phone OTP: Verified ✓
                    </span>
                  </div>
                  <button type="button" onClick={() => setActiveStep(2)} className="text-blue-600 hover:underline font-bold">Edit</button>
                </div>

                {/* Supporting Docs & Signature */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Compliance Artifacts</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      ID Documents: {frontIdFile ? 'Attached' : 'Pending Upload'} • Signature: {hasSignature ? 'Captured' : 'Consent Checked'}
                    </span>
                  </div>
                  <button type="button" onClick={() => setActiveStep(4)} className="text-blue-600 hover:underline font-bold">Edit</button>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveStep(6)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {isRTL ? '← السابق' : '← Previous'}
                </button>
                <button
                  type="button"
                  onClick={handleFinishRegistration}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isRTL ? 'تأكيد التسجيل والدخول للداشبورد فوراً' : 'Confirm & Access Super Admin Dashboard'}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer with credit */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 text-center text-[11px] text-slate-400">
        © 2026 CodeRa EdTech Platform • Developed by Mariam Raghep • All Rights Reserved.
      </footer>
    </div>
  );
}

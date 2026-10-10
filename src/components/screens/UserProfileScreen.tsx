'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Building,
  Calendar,
  Save,
  RotateCcw,
  CheckCircle2,
  Lock,
  Globe,
  Camera,
  Award,
  Key,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function UserProfileScreen() {
  const { user, role, t, language, isRtl, showToast, addAuditLog } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Dr. Kareem Zaki');
  const [email, setEmail] = useState(user?.email || 'admin@codera.academy');
  const [phone, setPhone] = useState('+20 10 1234 5678');
  const [department, setDepartment] = useState('Academic Governance & Curriculum Oversight');
  const [bio, setBio] = useState(
    'Leading digital curriculum standards, multi-tenant school onboarding, and AI verification ethics for CodeRa EdTech platform across Egypt and the MENA region.'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast(isRtl ? 'يرجى إكمال الحقول الإلزامية' : 'Please fill all required fields', 'warning');
      return;
    }
    setIsEditing(false);
    addAuditLog(`Updated personal profile details for ${name}`, `تحديث البيانات الشخصية للمستخدم ${name}`);
    showToast(isRtl ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === 'ar' ? 'الملف الشخصي للمسؤول' : 'Administrator Profile'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {language === 'ar'
              ? 'إدارة بيانات الحساب والصلاحيات والاعتمادات الإدارية في منصة كودرا'
              : 'Manage administrative identity, credentials, and verification status'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="purple" size="md">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            {role}
          </Badge>
          <Badge variant="success" size="md" dot>
            {language === 'ar' ? 'معتمد رسمياً' : 'Verified Staff'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Summary Card */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="relative inline-block mx-auto">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md mx-auto"
                />
                <button
                  type="button"
                  onClick={() => showToast(isRtl ? 'تحديث الصورة متاح عبر خادم الملفات' : 'Avatar upload connected to asset manager', 'info')}
                  className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition cursor-pointer"
                  title="Change Avatar"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{name}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{email}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                  {role}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-left space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{language === 'ar' ? 'تاريخ الانضمام: سبتمبر 2024' : 'Joined: September 2024'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{language === 'ar' ? 'المصادقة الثنائية: مفعلة (Hardware Token)' : '2FA: Enabled (FIDO2 / Hardware Token)'}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant={isEditing ? 'outline' : 'primary'}
                  className="w-full text-xs"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (language === 'ar' ? 'إلغاء التعديل' : 'Cancel Edit') : (language === 'ar' ? 'تعديل البيانات' : 'Edit Profile')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Security Notice */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-2xl p-4 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>{language === 'ar' ? 'ضوابط الأمان والصلاحيات' : 'RBAC Privilege Enforcement'}</span>
            </div>
            <p className="text-[11px] text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
              {language === 'ar'
                ? 'لا يمكن ترقية أو خفض منصب السوبر أدمن عبر الملف الشخصي العادي، ويتم ضبط الأدوار المركزية عبر سجل الصلاحيات فقط.'
                : 'Super Admin privilege elevation is restricted to central governance ledger and cannot be altered via self-service profile edits.'}
            </p>
          </div>
        </div>

        {/* Right Column: Editable Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader
              title={language === 'ar' ? 'البيانات الشخصية والمهنية' : 'Personal & Professional Details'}
              subtitle={language === 'ar' ? 'معلومات الاتصال والمسؤولية الإدارية' : 'Contact coordinates and institutional responsibilities'}
            />
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {language === 'ar' ? 'الاسم بالكامل' : 'Full Legal Name'}
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {language === 'ar' ? 'البريد الإلكتروني المؤسسي' : 'Official Email Address'}
                    </label>
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {language === 'ar' ? 'رقم الهاتف المعتمد' : 'Verified Phone Number'}
                    </label>
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Department */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {language === 'ar' ? 'القسم أو الإدارة' : 'Department'}
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {language === 'ar' ? 'نبذة عن المسؤول' : 'Professional Biography'}
                  </label>
                  <textarea
                    rows={3}
                    disabled={!isEditing}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {isEditing && (
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </Button>
                    <Button variant="primary" size="sm" type="submit">
                      <Save className="w-3.5 h-3.5 mr-1" />
                      {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Verification & Compliance Ledger */}
          <Card>
            <CardHeader
              title={language === 'ar' ? 'سجل الاعتماد والحوكمة' : 'Compliance & Governance Ledger'}
              subtitle={language === 'ar' ? 'حالة التوثيق الرقمي والشهادات المهنية' : 'Staff accreditation tokens and security status'}
            />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {language === 'ar' ? 'فحص الهوية الوطنية المعتمد' : 'National ID Document Verified'}
                      </p>
                      <p className="text-[11px] text-slate-500">Certificate #EGY-GOV-2026-992 • Status: Approved</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {language === 'ar' ? 'تفويض الوزارة / مجلس الإدارة' : 'Institutional Ministerial Endorsement'}
                      </p>
                      <p className="text-[11px] text-slate-500">Accredited by EdTech Governance Board</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

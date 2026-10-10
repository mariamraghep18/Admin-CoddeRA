'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  Parent,
  IndividualLearner,
  Organization,
  Mentor,
  Order,
  PromoCode,
  Referral,
  AIReport,
  SubAdmin,
  AuditLogItem,
  initialStudents,
  initialParents,
  initialIndividuals,
  initialOrganizations,
  initialMentors,
  initialOrders,
  initialPromos,
  initialReferrals,
  initialAIReports,
  initialSubAdmins,
  initialAuditLogs,
} from '@/data/mockData';
import { Language, Theme, translations } from './Translations';

export type UserRole =
  | 'Super Admin'
  | 'KYC Reviewer'
  | 'Content & QA'
  | 'Super Admin (Full Governance)'
  | 'Sub-Admin (KYC & Student Verification)'
  | 'Sub-Admin (Content & QA)';

export type RouteId =
  | 'overview'
  | 'students'
  | 'student-parent-managed'
  | 'student-org-managed'
  | 'parents'
  | 'individuals'
  | 'organizations'
  | 'org-detail'
  | 'mentors'
  | 'pending-reviews'
  | 'verification-studio'
  | 'org-step-1'
  | 'org-step-2'
  | 'ai-reports'
  | 'curriculum-hierarchy'
  | 'video-authoring'
  | 'tasks-studio'
  | 'individual-content'
  | 'payments'
  | 'order-deep-dive'
  | 'promotions'
  | 'referrals'
  | 'analytics-certificates'
  | 'administration'
  | 'user-profile'
  | 'account-settings'
  | 'security-settings'
  | 'notification-center'
  | 'registration'
  | 'login'
  | 'forgot-password';

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleAr: string;
  timestamp: string;
  unread: boolean;
  type: 'kyc' | 'video' | 'order' | 'security';
  link: string;
  route?: RouteId;
}

const rolePermissions: Record<UserRole, RouteId[]> = {
  'Super Admin': [
    'overview',
    'students',
    'student-parent-managed',
    'student-org-managed',
    'parents',
    'individuals',
    'organizations',
    'org-detail',
    'mentors',
    'pending-reviews',
    'verification-studio',
    'org-step-1',
    'org-step-2',
    'ai-reports',
    'curriculum-hierarchy',
    'video-authoring',
    'tasks-studio',
    'individual-content',
    'payments',
    'order-deep-dive',
    'promotions',
    'referrals',
    'analytics-certificates',
    'administration',
    'user-profile',
    'account-settings',
    'security-settings',
    'notification-center',
    'registration',
    'login',
    'forgot-password',
  ],
  'Super Admin (Full Governance)': [
    'overview',
    'students',
    'student-parent-managed',
    'student-org-managed',
    'parents',
    'individuals',
    'organizations',
    'org-detail',
    'mentors',
    'pending-reviews',
    'verification-studio',
    'org-step-1',
    'org-step-2',
    'ai-reports',
    'curriculum-hierarchy',
    'video-authoring',
    'tasks-studio',
    'individual-content',
    'payments',
    'order-deep-dive',
    'promotions',
    'referrals',
    'analytics-certificates',
    'administration',
    'user-profile',
    'account-settings',
    'security-settings',
    'notification-center',
    'registration',
    'login',
    'forgot-password',
  ],
  'KYC Reviewer': [
    'overview',
    'students',
    'student-parent-managed',
    'student-org-managed',
    'organizations',
    'org-detail',
    'mentors',
    'pending-reviews',
    'verification-studio',
    'org-step-1',
    'org-step-2',
    'ai-reports',
    'analytics-certificates',
    'user-profile',
    'account-settings',
    'security-settings',
    'notification-center',
  ],
  'Sub-Admin (KYC & Student Verification)': [
    'overview',
    'students',
    'student-parent-managed',
    'student-org-managed',
    'organizations',
    'org-detail',
    'mentors',
    'pending-reviews',
    'verification-studio',
    'org-step-1',
    'org-step-2',
    'ai-reports',
    'analytics-certificates',
    'user-profile',
    'account-settings',
    'security-settings',
    'notification-center',
  ],
  'Content & QA': [
    'overview',
    'pending-reviews',
    'verification-studio',
    'ai-reports',
    'curriculum-hierarchy',
    'video-authoring',
    'tasks-studio',
    'individual-content',
    'analytics-certificates',
    'user-profile',
    'account-settings',
    'security-settings',
    'notification-center',
  ],
  'Sub-Admin (Content & QA)': [
    'overview',
    'pending-reviews',
    'verification-studio',
    'ai-reports',
    'curriculum-hierarchy',
    'video-authoring',
    'tasks-studio',
    'individual-content',
    'analytics-certificates',
    'user-profile',
    'account-settings',
    'security-settings',
    'notification-center',
  ],
};

export function getRouteUrl(route: RouteId, params?: Record<string, any>): string {
  switch (route) {
    case 'overview':
      return '/';
    case 'user-profile':
      return '/profile';
    case 'account-settings':
      return '/settings/account';
    case 'security-settings':
      return '/settings/security';
    case 'notification-center':
      return '/notifications';
    case 'registration':
      return '/register';
    case 'login':
      return '/login';
    case 'forgot-password':
      return '/forgot-password';
    case 'students':
      return '/students';
    case 'student-parent-managed':
      return `/students/${params?.id || 'STU-8821'}/parent-managed`;
    case 'student-org-managed':
      return `/students/${params?.id || 'STU-8822'}/org-managed`;
    case 'parents':
      return '/parents';
    case 'individuals':
      return '/individuals';
    case 'organizations':
      return '/organizations';
    case 'org-detail':
      return `/organizations/${params?.id || 'ORG-HOPE-01'}`;
    case 'mentors':
      return '/mentors';
    case 'pending-reviews':
      return '/reviews';
    case 'verification-studio':
      return `/reviews/video/${params?.id || 'STU-8821'}`;
    case 'org-step-1':
      return `/reviews/org-step1/${params?.id || 'ORG-NOOR-01'}`;
    case 'org-step-2':
      return `/reviews/org-step2/${params?.id || 'ORG-BRIGHT-02'}`;
    case 'ai-reports':
      return '/reviews/ai-reports';
    case 'curriculum-hierarchy':
      return '/content/hierarchy';
    case 'video-authoring':
      return '/content/video-steps';
    case 'tasks-studio':
      return '/content/task-authoring';
    case 'individual-content':
      return '/content/individual';
    case 'payments':
      return '/financials/orders';
    case 'order-deep-dive':
      return `/financials/orders/${params?.id || 'ORD-1048'}`;
    case 'promotions':
      return '/financials/promotions';
    case 'referrals':
      return '/financials/referrals';
    case 'analytics-certificates':
      return '/analytics';
    case 'administration':
      return '/administration';
    default:
      return '/';
  }
}

export function pathnameToRoute(pathname: string): { route: RouteId; params: Record<string, any> } {
  if (!pathname || pathname === '/' || pathname === '/overview') return { route: 'overview', params: {} };
  if (pathname.includes('/students') && pathname.includes('parent-managed')) return { route: 'student-parent-managed', params: {} };
  if (pathname.includes('/students') && pathname.includes('org-managed')) return { route: 'student-org-managed', params: {} };
  if (pathname.startsWith('/students')) return { route: 'students', params: {} };
  if (pathname.startsWith('/parents')) return { route: 'parents', params: {} };
  if (pathname.startsWith('/individuals')) return { route: 'individuals', params: {} };
  if (pathname.startsWith('/organizations/')) return { route: 'org-detail', params: {} };
  if (pathname.startsWith('/organizations')) return { route: 'organizations', params: {} };
  if (pathname.startsWith('/mentors')) return { route: 'mentors', params: {} };
  if (pathname.startsWith('/reviews/video')) return { route: 'verification-studio', params: {} };
  if (pathname.startsWith('/reviews/org-step1')) return { route: 'org-step-1', params: {} };
  if (pathname.startsWith('/reviews/org-step2')) return { route: 'org-step-2', params: {} };
  if (pathname.startsWith('/reviews/ai-reports')) return { route: 'ai-reports', params: {} };
  if (pathname.startsWith('/reviews')) return { route: 'pending-reviews', params: {} };
  if (pathname.startsWith('/content/hierarchy')) return { route: 'curriculum-hierarchy', params: {} };
  if (pathname.startsWith('/content/video-steps')) return { route: 'video-authoring', params: {} };
  if (pathname.startsWith('/content/task-authoring')) return { route: 'tasks-studio', params: {} };
  if (pathname.startsWith('/content/individual')) return { route: 'individual-content', params: {} };
  if (pathname.match(/\/financials\/orders\/[A-Za-z0-9_-]+/)) return { route: 'order-deep-dive', params: {} };
  if (pathname.startsWith('/financials/orders')) return { route: 'payments', params: {} };
  if (pathname.startsWith('/financials/promotions')) return { route: 'promotions', params: {} };
  if (pathname.startsWith('/financials/referrals')) return { route: 'referrals', params: {} };
  if (pathname.startsWith('/analytics')) return { route: 'analytics-certificates', params: {} };
  if (pathname.startsWith('/administration')) return { route: 'administration', params: {} };
  if (pathname.startsWith('/profile')) return { route: 'user-profile', params: {} };
  if (pathname.startsWith('/settings/security')) return { route: 'security-settings', params: {} };
  if (pathname.startsWith('/settings/account') || pathname.startsWith('/settings')) return { route: 'account-settings', params: {} };
  if (pathname.startsWith('/notifications')) return { route: 'notification-center', params: {} };
  if (pathname.startsWith('/register')) return { route: 'registration', params: {} };
  if (pathname.startsWith('/login')) return { route: 'login', params: {} };
  if (pathname.startsWith('/forgot-password')) return { route: 'forgot-password', params: {} };
  return { route: 'overview', params: {} };
}

interface AppContextType {
  // Localization & Theme
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  t: typeof translations.en;
  isRtl: boolean;
  isRTL: boolean;
  setIsRTL: (rtl: boolean) => void;

  // Authentication & RBAC
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  user: AuthUser | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  login: (email: string, password: string, role?: UserRole, rememberMe?: boolean) => boolean;
  logout: () => void;
  canEditContent: boolean;
  canIssueRefunds: boolean;
  canApproveKYC: boolean;
  canManageUsers: boolean;

  // SPA Navigation Router
  currentRoute: RouteId;
  routeParams: Record<string, any>;
  navigateTo: (route: RouteId, params?: Record<string, any>) => void;
  isRouteAllowedForRole: (route: RouteId, role: UserRole) => boolean;

  // UI Utilities
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationsAsRead: () => void;

  // Store Entities & Mutations
  students: Student[];
  updateStudentVerification: (studentId: string, status: 'verified' | 'pending' | 'flagged', reasonNotes?: string) => void;

  organizations: Organization[];
  approveOrgStep1: (orgId: string) => void;
  rejectOrgStep1: (orgId: string, reason: string) => void;
  approveOrgStep2: (orgId: string, activeTracks: string[]) => void;
  rejectOrgStep2: (orgId: string, reason: string) => void;
  addOrgInternalNote: (orgId: string, text: string, severity?: 'confidential' | 'warning' | 'info') => void;
  upgradeOrgSeats: (orgId: string, additionalSeats: number) => void;

  orders: Order[];
  processPartialRefund: (orderId: string, refundAmount: number) => boolean;
  processFullReversal: (orderId: string, passwordConfirm: string) => boolean;
  resendTaxInvoice: (orderId: string) => void;

  promotions: PromoCode[];
  togglePromoStatus: (promoId: string) => void;
  addPromoCode: (promo: Omit<PromoCode, 'id' | 'redemptionsCount'>) => void;

  referrals: Referral[];
  approveReferralPayout: (referralId: string) => void;

  subAdmins: SubAdmin[];
  toggleSubAdminStatus: (adminId: string) => void;
  updateSubAdminPermission: (adminId: string, permissionKey: keyof SubAdmin['permissions'], value: boolean) => void;

  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, actionAr: string, status?: AuditLogItem['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('light');
  const [role, setRoleState] = useState<UserRole>('Super Admin (Full Governance)');

  // Auth State: Strictly unauthenticated by default to show Login screen first
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  // SPA Navigation Route State: Defaults strictly to 'login'
  const [currentRoute, setCurrentRoute] = useState<RouteId>('login');
  const [routeParams, setRouteParams] = useState<Record<string, any>>({});

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Seed Data State
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [promotions, setPromotions] = useState<PromoCode[]>(initialPromos);
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>(initialSubAdmins);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'NOTIF-1',
      title: 'New Student Video Submission: Ahmed Hassan',
      titleAr: 'فيديو تحقق جديد من الطالب: أحمد حسن',
      timestamp: '12m ago',
      unread: true,
      type: 'video',
      link: '/reviews/video/STU-8821',
      route: 'verification-studio',
    },
    {
      id: 'NOTIF-2',
      title: 'Noor School submitted Step 1 KYC legal documentation',
      titleAr: 'مدرسة النور قدمت مستندات الخطوة 1 للتوثيق',
      timestamp: '45m ago',
      unread: true,
      type: 'kyc',
      link: '/reviews/org-step1/ORG-NOOR-01',
      route: 'org-step-1',
    },
    {
      id: 'NOTIF-3',
      title: 'Bright Centre requested Step 2 Lab Accreditation audit',
      titleAr: 'مركز برايت طلب تدقيق الخطوة 2 لاعتماد المعامل',
      timestamp: '2h ago',
      unread: false,
      type: 'kyc',
      link: '/reviews/org-step2/ORG-BRIGHT-02',
      route: 'org-step-2',
    },
  ]);

  // Synchronize HTML dir & lang attributes whenever language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  // Synchronize Dark mode class on root documentElement
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  // Check saved session on mount & handle browser popstate
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let isSessionActive = false;
      try {
        const savedAuth = localStorage.getItem('codera_auth_session');
        if (savedAuth) {
          const parsed = JSON.parse(savedAuth);
          if (parsed && parsed.email) {
            setIsAuthenticated(true);
            setUser(parsed);
            if (parsed.role) {
              setRoleState(parsed.role);
            }
            isSessionActive = true;
          }
        }
      } catch (e) {
        // Ignore JSON error
      }

      // Read initial path
      const { route, params } = pathnameToRoute(window.location.pathname);

      if (!isSessionActive) {
        // Unauthenticated visitor: strictly stay on login or registration
        if (route === 'registration') {
          setCurrentRoute('registration');
        } else {
          setCurrentRoute('login');
        }
      } else {
        // Authenticated user: if at root or auth pages, redirect to overview
        if (route === 'login' || route === 'registration' || window.location.pathname === '/') {
          setCurrentRoute('overview');
        } else {
          setCurrentRoute(route);
        }
      }
      setRouteParams(params);

      // Handle browser back/forward buttons
      const handlePopState = () => {
        const current = pathnameToRoute(window.location.pathname);
        const hasSession = !!localStorage.getItem('codera_auth_session');
        if (!hasSession && current.route !== 'registration') {
          setCurrentRoute('login');
        } else {
          setCurrentRoute(current.route);
          setRouteParams(current.params);
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  const isRouteAllowedForRole = (route: RouteId, r: UserRole): boolean => {
    const allowed = rolePermissions[r] || [];
    return allowed.includes(route);
  };

  const navigateTo = (route: RouteId, params: Record<string, any> = {}) => {
    // Check permission
    if (!isRouteAllowedForRole(route, role)) {
      showToast(
        language === 'ar'
          ? `عفواً، لا يملك دور "${role}" صلاحية الوصول لهذا القسم`
          : `Access restricted for role: ${role}`,
        'warning'
      );
      return;
    }

    setCurrentRoute(route);
    setRouteParams(params);

    if (typeof window !== 'undefined') {
      const url = getRouteUrl(route, params);
      window.history.pushState({ route, params }, '', url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      if (typeof window !== 'undefined' && localStorage.getItem('codera_auth_session')) {
        localStorage.setItem('codera_auth_session', JSON.stringify(updatedUser));
      }
    }

    addAuditLog(
      `Governance role switched to: ${newRole}`,
      `تم تبديل منصب الحوكمة إلى: ${newRole}`,
      'Success'
    );

    showToast(
      language === 'ar'
        ? `تم تحديث المنصب النشط: ${newRole}. تم تصفية القوائم وفق الصلاحيات.`
        : `Role switched to: ${newRole}. Sidebar and permissions updated immediately.`,
      'info'
    );

    // If current route is not allowed in new role, redirect to overview
    if (!isRouteAllowedForRole(currentRoute, newRole)) {
      navigateTo('overview');
    }
  };

  const login = (
    email?: string,
    password?: string,
    selectedRole: UserRole = 'Super Admin',
    rememberMe = true
  ): boolean => {
    const effectiveEmail = email?.trim() || 'admin@codera.academy';

    // Determine user name
    let name = 'Dr. Kareem Zaki';
    if (selectedRole === 'Sub-Admin (KYC & Student Verification)' || selectedRole === 'KYC Reviewer') {
      name = 'Laila Mansour (Reviewer)';
    } else if (selectedRole === 'Sub-Admin (Content & QA)' || selectedRole === 'Content & QA') {
      name = 'Tariq Nour (Curriculum Lead)';
    }

    const authUser: AuthUser = {
      name,
      email: effectiveEmail,
      role: selectedRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    };

    setIsAuthenticated(true);
    setUser(authUser);
    setRoleState(selectedRole);

    if (rememberMe && typeof window !== 'undefined') {
      localStorage.setItem('codera_auth_session', JSON.stringify(authUser));
    }

    addAuditLog(
      `Authenticated session opened for ${email} as ${selectedRole}`,
      `تم تسجيل دخول ناجح للمستخدم ${email} بصلاحية ${selectedRole}`,
      'Success'
    );

    showToast(
      language === 'ar'
        ? `مرحباً بك ${name}! تم تسجيل الدخول بنجاح إلى منصة كودرا.`
        : `Welcome back, ${name}! Signed in successfully to CodeRa Governance Suite.`,
      'success'
    );

    setCurrentRoute('overview');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('codera_auth_session');
    }
    setCurrentRoute('login');
    showToast(
      language === 'ar'
        ? 'تم تسجيل الخروج بنجاح والعودة لشاشة تسجيل الدخول'
        : 'Signed out successfully — Session cleared',
      'info'
    );
  };

  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const addAuditLog = (action: string, actionAr: string, status: AuditLogItem['status'] = 'Success') => {
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      adminName: user?.name || (role === 'Super Admin (Full Governance)' ? 'Dr. Kareem Zaki' : role),
      department: role === 'Super Admin (Full Governance)' ? 'Super Admin' : 'Reviewer',
      action,
      actionAr,
      ipAddress: '197.38.12.89',
      status,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Student Verification Actions
  const updateStudentVerification = (
    studentId: string,
    status: 'verified' | 'pending' | 'flagged',
    reasonNotes?: string
  ) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, verificationStatus: status } : s))
    );
    const targetStudent = students.find((s) => s.id === studentId);
    const studentName = targetStudent ? targetStudent.name : studentId;
    addAuditLog(
      `Updated student ${studentName} verification to ${status.toUpperCase()} ${
        reasonNotes ? `[Note: ${reasonNotes}]` : ''
      }`,
      `تحديث حالة تحقق الطالب ${studentName} إلى ${status} ${
        reasonNotes ? `[ملاحظة: ${reasonNotes}]` : ''
      }`
    );
    showToast(
      language === 'ar'
        ? `تم تحديث حالة تحقق الطالب ${studentName} إلى ${status}`
        : `Student ${studentName} verification marked as ${status.toUpperCase()}`,
      status === 'flagged' ? 'warning' : 'success'
    );
  };

  // Organization KYC Step 1 & 2 Actions
  const approveOrgStep1 = (orgId: string) => {
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId) {
          return {
            ...org,
            contractStatus: 'Pending Step 2',
            step1: { ...org.step1, status: 'ACCEPTED' },
          };
        }
        return org;
      })
    );
    addAuditLog(
      `Approved Organization ${orgId} Step 1 KYC legal documentation`,
      `الموافقة على مستندات الخطوة 1 القانونية للمؤسسة ${orgId}`
    );
    showToast(
      language === 'ar'
        ? 'تم قبول مستندات الخطوة 1 بنجاح وفتح مرحلة تدقيق المعامل'
        : 'Step 1 KYC Accepted! Unlocked Step 2 technical readiness capability.',
      'success'
    );
  };

  const rejectOrgStep1 = (orgId: string, reason: string) => {
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId) {
          return {
            ...org,
            step1: { ...org.step1, status: 'REJECTED' },
          };
        }
        return org;
      })
    );
    addAuditLog(
      `Rejected Organization ${orgId} Step 1: ${reason}`,
      `رفض مستندات الخطوة 1 للمؤسسة ${orgId}: ${reason}`,
      'Warning'
    );
    showToast(`Step 1 Rejected: ${reason}`, 'warning');
  };

  const approveOrgStep2 = (orgId: string, activeTracks: string[]) => {
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId) {
          return {
            ...org,
            contractStatus: 'Active',
            step2: { ...org.step2, status: 'ACCEPTED', activeTracks },
          };
        }
        return org;
      })
    );
    addAuditLog(
      `Granted Full Operational Accreditation (Step 2) for Organization ${orgId}`,
      `منح الاعتماد التشغيلي الكامل للمؤسسة ${orgId}`
    );
    showToast(
      language === 'ar'
        ? 'تم منح الاعتماد التشغيلي الكامل وتفعيل المسارات البرمجية بنجاح!'
        : 'Granted Full Operational Accreditation! School is now fully active.',
      'success'
    );
  };

  const rejectOrgStep2 = (orgId: string, reason: string) => {
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId) {
          return {
            ...org,
            step2: { ...org.step2, status: 'REJECTED' },
          };
        }
        return org;
      })
    );
    addAuditLog(
      `Rejected Step 2 Lab audit for Org ${orgId}: ${reason}`,
      `رفض تدقيق معامل الخطوة 2 للمؤسسة ${orgId}: ${reason}`,
      'Warning'
    );
    showToast(`Step 2 Audit Rejected: ${reason}`, 'warning');
  };

  const addOrgInternalNote = (
    orgId: string,
    text: string,
    severity: 'confidential' | 'warning' | 'info' = 'confidential'
  ) => {
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId) {
          const newNote = {
            id: `NOT-${Date.now().toString().slice(-4)}`,
            author: user?.name || 'Super Admin',
            date: new Date().toISOString().slice(0, 10),
            text,
            severity,
          };
          return {
            ...org,
            internalNotes: [newNote, ...org.internalNotes],
          };
        }
        return org;
      })
    );
    addAuditLog(`Logged internal note for Org ${orgId}`, `إضافة ملاحظة إدارية للمؤسسة ${orgId}`);
    showToast('Internal confidential note appended to school record', 'info');
  };

  const upgradeOrgSeats = (orgId: string, additionalSeats: number) => {
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId) {
          return {
            ...org,
            seatsTotal: org.seatsTotal + additionalSeats,
          };
        }
        return org;
      })
    );
    addAuditLog(
      `Allocated +${additionalSeats} seats to ${orgId}`,
      `زيادة المقاعد بـ +${additionalSeats} للمؤسسة ${orgId}`
    );
    showToast(`Contract capacity augmented by ${additionalSeats} active seats`, 'success');
  };

  // Orders & Financials
  const processPartialRefund = (orderId: string, refundAmount: number): boolean => {
    let success = false;
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          success = true;
          return {
            ...ord,
            status: 'Partially Refunded',
            refundAmount: (ord.refundAmount || 0) + refundAmount,
          };
        }
        return ord;
      })
    );
    if (success) {
      addAuditLog(
        `Issued partial refund of $${refundAmount} for ${orderId}`,
        `استرجاع جزئي بمبلغ $${refundAmount} للطلب ${orderId}`
      );
      showToast(
        language === 'ar'
          ? `تم استرجاع مبلغ $${refundAmount} بنجاح إلى بطاقة العميل`
          : `Partial refund of $${refundAmount} successfully credited via Stripe`,
        'success'
      );
    }
    return success;
  };

  const processFullReversal = (orderId: string, passwordConfirm: string): boolean => {
    if (!passwordConfirm) {
      showToast('Master password confirmation required for full reversal', 'error');
      return false;
    }
    let success = false;
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          success = true;
          return {
            ...ord,
            status: 'Reversed',
            refundAmount: ord.amount,
          };
        }
        return ord;
      })
    );
    if (success) {
      addAuditLog(
        `Critical: Fully reversed order ${orderId} & revoked all enrolled student credentials`,
        `تحذير: استرجاع كامل للطلب ${orderId} وإلغاء تراخيص المقاعد`,
        'Warning'
      );
      showToast('Order fully reversed and student credentials deactivated', 'warning');
    }
    return success;
  };

  const resendTaxInvoice = (orderId: string) => {
    addAuditLog(`Dispatched PDF tax invoice for ${orderId}`, `إعادة إرسال الفاتورة الضريبية للطلب ${orderId}`);
    showToast(
      language === 'ar'
        ? `تم إرسال الفاتورة الضريبية المعتمدة للطلب ${orderId} إلى البريد المسجل`
        : `Official VAT Tax Invoice for ${orderId} dispatched to primary contact email`,
      'info'
    );
  };

  const togglePromoStatus = (promoId: string) => {
    setPromotions((prev) =>
      prev.map((p) =>
        p.id === promoId
          ? { ...p, status: p.status === 'Active' ? 'Paused' : 'Active' }
          : p
      )
    );
    addAuditLog(`Toggled promo code status ${promoId}`, `تعديل حالة كود الخصم ${promoId}`);
    showToast('Coupon campaign status updated', 'info');
  };

  const addPromoCode = (promo: Omit<PromoCode, 'id' | 'redemptionsCount'>) => {
    const newPromo: PromoCode = {
      ...promo,
      id: `PR-${Date.now().toString().slice(-4)}`,
      redemptionsCount: 0,
    };
    setPromotions((prev) => [newPromo, ...prev]);
    addAuditLog(`Created new promo code: ${promo.code}`, `إنشاء كود خصم جديد: ${promo.code}`);
    showToast(`Coupon "${promo.code}" activated and published to billing gateways`, 'success');
  };

  // Referrals
  const approveReferralPayout = (referralId: string) => {
    setReferrals((prev) =>
      prev.map((r) => (r.id === referralId ? { ...r, status: 'Paid' } : r))
    );
    addAuditLog(`Approved referral payout for ${referralId}`, `صرف عمولة الإحالة للمعاملة ${referralId}`);
    showToast(
      language === 'ar'
        ? 'تم تحويل عمولة الشريك بنجاح وإغلاق المطالبة'
        : 'Affiliate commission payout approved and queued for bank wire',
      'success'
    );
  };

  // Sub-Admins
  const toggleSubAdminStatus = (adminId: string) => {
    setSubAdmins((prev) =>
      prev.map((adm) =>
        adm.id === adminId
          ? { ...adm, status: adm.status === 'Active' ? 'Suspended' : 'Active' }
          : adm
      )
    );
    showToast('Sub-Admin account status updated', 'warning');
  };

  const updateSubAdminPermission = (adminId: string, key: keyof SubAdmin['permissions'], val: boolean) => {
    setSubAdmins((prev) =>
      prev.map((adm) => {
        if (adm.id === adminId) {
          return {
            ...adm,
            permissions: { ...adm.permissions, [key]: val },
          };
        }
        return adm;
      })
    );
    showToast('RBAC capability updated', 'info');
  };

  // Granular capability flags based on currently simulated role
  const isSuperAdmin = role === 'Super Admin' || role === 'Super Admin (Full Governance)';
  const isKYCAdmin = role === 'KYC Reviewer' || role === 'Sub-Admin (KYC & Student Verification)';
  const isContentAdmin = role === 'Content & QA' || role === 'Sub-Admin (Content & QA)';

  const canEditContent = isSuperAdmin || isContentAdmin;
  const canIssueRefunds = isSuperAdmin;
  const canApproveKYC = isSuperAdmin || isKYCAdmin;
  const canManageUsers = isSuperAdmin;

  const isRtl = language === 'ar';
  const isRTL = isRtl;
  const isDark = theme === 'dark';
  const setIsDark = (dark: boolean) => setThemeState(dark ? 'dark' : 'light');
  const setIsRTL = (rtl: boolean) => setLanguageState(rtl ? 'ar' : 'en');
  const currentRole = role;
  const setCurrentRole = setRole;
  const t = translations[language];
  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        isDark,
        setIsDark,
        t,
        isRtl,
        isRTL,
        setIsRTL,
        isAuthenticated,
        setIsAuthenticated,
        user,
        role,
        setRole,
        currentRole,
        setCurrentRole,
        login,
        logout,
        canEditContent,
        canIssueRefunds,
        canApproveKYC,
        canManageUsers,
        currentRoute,
        routeParams,
        navigateTo,
        isRouteAllowedForRole,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        toasts,
        showToast,
        removeToast,
        notifications,
        unreadNotificationsCount,
        markNotificationsAsRead,
        students,
        updateStudentVerification,
        organizations,
        approveOrgStep1,
        rejectOrgStep1,
        approveOrgStep2,
        rejectOrgStep2,
        addOrgInternalNote,
        upgradeOrgSeats,
        orders,
        processPartialRefund,
        processFullReversal,
        resendTaxInvoice,
        promotions,
        togglePromoStatus,
        addPromoCode,
        referrals,
        approveReferralPayout,
        subAdmins,
        toggleSubAdminStatus,
        updateSubAdminPermission,
        auditLogs,
        addAuditLog,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Convenience modular context hooks for granular consumption
export function useLanguage() {
  const { language, setLanguage, toggleLanguage, isRtl, t } = useApp();
  return { language, setLanguage, toggleLanguage, isRtl, t };
}

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useApp();
  return { theme, setTheme, toggleTheme };
}

export function useAuth() {
  const { isAuthenticated, user, role, setRole, login, logout, canEditContent, canIssueRefunds, canApproveKYC, canManageUsers } = useApp();
  return { isAuthenticated, user, role, setRole, login, logout, canEditContent, canIssueRefunds, canApproveKYC, canManageUsers };
}

export function useNavigation() {
  const { currentRoute, routeParams, navigateTo, isRouteAllowedForRole } = useApp();
  return { currentRoute, routeParams, navigateTo, isRouteAllowedForRole };
}

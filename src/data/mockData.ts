export interface Student {
  id: string;
  name: string;
  nameAr: string;
  avatar: string;
  type: 'parent-managed' | 'org-managed' | 'individual';
  level: string;
  levelNumber: number;
  track: string;
  trackAr: string;
  sponsorName: string;
  sponsorNameAr: string;
  sponsorEmail: string;
  sponsorPhone: string;
  sponsorAddress: string;
  organizationId?: string;
  organizationName?: string;
  organizationClass?: string;
  progress: number;
  completedExercises: number;
  totalExercises: number;
  quizScore: number;
  timeSpentHours: number;
  mentorName: string;
  mentorFeedback: string;
  verificationStatus: 'pending' | 'verified' | 'flagged';
  aiFacialMatch: number;
  videoSubmittedDate: string;
  videoTitle: string;
  videoDuration: string;
  videoUrl: string;
  registeredDate: string;
  activeOrderRef?: string;
  certificateId?: string;
  isAiChatbotKidSafe: boolean;
  safeSearchEnforced: boolean;
}

export interface Parent {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  location: string;
  locationAr: string;
  joinedDate: string;
  childrenCount: number;
  childrenIds: string[];
  totalSpend: number;
  currency: string;
  verificationStatus: 'verified' | 'pending';
  cardMask: string;
  cardBrand: string;
  availableSeatCredits: number;
  activeFamilyPlan: boolean;
  renewalDate: string;
}

export interface IndividualLearner {
  id: string;
  name: string;
  nameAr: string;
  age: number;
  location: string;
  locationAr: string;
  email: string;
  phone: string;
  track: string;
  trackAr: string;
  progress: number;
  capstoneSubmitted: boolean;
  promoCodeUsed: string;
  referrerName: string;
  joinedDate: string;
  completionStatus: 'In Progress' | 'Completed' | 'Reviewing';
}

export interface Organization {
  id: string;
  name: string;
  nameAr: string;
  tier: 'Gold Enterprise' | 'Silver Academy' | 'Bronze Pilot';
  seatsAllocated: number;
  seatsTotal: number;
  avgCompletion: number;
  contractStatus: 'Active' | 'Pending Step 1' | 'Pending Step 2' | 'Expiring Soon';
  contractValue: number;
  paymentTerms: string;
  step1: {
    status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
    commercialRegNo: string;
    ministryLicense: string;
    authorizedRep: string;
    authorizedRepAr: string;
    repPhone: string;
    repEmail: string;
    physicalAddress: string;
    physicalAddressAr: string;
    submittedDate: string;
    docs: { name: string; size: string; type: string }[];
  };
  step2: {
    status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
    computerLabsCount: number;
    totalPCs: number;
    pcSpecs: string;
    bandwidth: string;
    activeTracks: string[];
    teachersCount: number;
    teachers: { name: string; role: string; certified: boolean }[];
    submittedDate: string;
  };
  internalNotes: {
    id: string;
    author: string;
    date: string;
    text: string;
    severity: 'confidential' | 'warning' | 'info';
  }[];
  mentorAllocations: {
    gradeClass: string;
    mentorId: string;
    mentorName: string;
    studentsCount: number;
  }[];
}

export interface Mentor {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  phone: string;
  specialtyTrack: string;
  specialtyTrackAr: string;
  assignedStudentsCount: number;
  activeReviewsPending: number;
  rating: number;
  responseSLAHours: number;
  assignedOrganizations: string[];
  monthlyCompensation: number;
  joinedDate: string;
  avatar: string;
}

export interface Order {
  id: string;
  buyerName: string;
  buyerType: 'Organization' | 'Parent' | 'Individual';
  buyerEmail: string;
  date: string;
  amount: number;
  currency: string;
  gateway: 'Stripe' | 'Paymob' | 'Bank Wire';
  gatewayRef: string;
  status: 'Settled' | 'Pending' | 'Partially Refunded' | 'Reversed';
  refundAmount?: number;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  seatsCount: number;
  seatsUsed: number;
  tax: number;
  eventTimeline: {
    timestamp: string;
    event: string;
    details: string;
  }[];
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercentage: number;
  applicableTracks: string[];
  redemptionsCount: number;
  maxRedemptions: number;
  expiryDate: string;
  status: 'Active' | 'Paused' | 'Expired';
  targetAudience: 'All' | 'Parents Only' | 'Organizations Only' | 'Individuals Only';
}

export interface Referral {
  id: string;
  referrerName: string;
  referrerEmail: string;
  code: string;
  invitesSent: number;
  convertedSignups: number;
  commissionEarned: number;
  payoutStatus: 'Paid' | 'Pending Audit' | 'Flagged';
  suspiciousDuplicatesCount: number;
  lastPayoutDate: string;
}

export interface AIReport {
  sessionId: string;
  studentName: string;
  organizationName?: string;
  timestamp: string;
  livenessConfidence: number;
  voiceMatchConfidence: number;
  codePlagiarismScore: number;
  riskRating: 'Clean' | 'Moderate Risk' | 'Flagged';
  verdict: 'Automated Pass' | 'Manual QA Required' | 'Rejected';
  details: string;
}

export interface SubAdmin {
  id: string;
  name: string;
  email: string;
  department: 'Super Admin' | 'Pedagogy' | 'Finance' | 'KYC Verification';
  twoFactorEnabled: boolean;
  lastActive: string;
  status: 'Active' | 'Suspended';
  permissions: {
    canEditContent: boolean;
    canIssueRefunds: boolean;
    canApproveKYCStep1: boolean;
    canApproveKYCStep2: boolean;
    canDeleteUsers: boolean;
  };
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  adminName: string;
  department: string;
  action: string;
  actionAr: string;
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Security Alert';
}

// -------------------------------------------------------------
// SEED MOCK DATA
// -------------------------------------------------------------

export const initialStudents: Student[] = [
  {
    id: 'STU-8821',
    name: 'Ahmed Hassan',
    nameAr: 'أحمد حسن',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    type: 'parent-managed',
    level: 'Level 2 Explorer',
    levelNumber: 2,
    track: 'Python & Game AI',
    trackAr: 'بايثون والذكاء الاصطناعي للألعاب',
    sponsorName: 'Fatima Hassan',
    sponsorNameAr: 'فاطمة حسن',
    sponsorEmail: 'fatima.hassan@example.com',
    sponsorPhone: '+20 102 334 8912',
    sponsorAddress: 'Building 14, Degla Palms, 6th of October, Cairo, Egypt',
    progress: 84,
    completedExercises: 42,
    totalExercises: 50,
    quizScore: 91.4,
    timeSpentHours: 38.5,
    mentorName: 'Ahmad Al-Farsi',
    mentorFeedback: 'Ahmed shows tremendous intuition with recursion and turtle graphics. His logic flow in loops is very clean.',
    verificationStatus: 'pending',
    aiFacialMatch: 98.2,
    videoSubmittedDate: '2026-10-08 14:22',
    videoTitle: 'Python Turtle Recursion Demo & Star Fractal',
    videoDuration: '02:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    registeredDate: '2026-02-14',
    activeOrderRef: 'ORD-1048',
    isAiChatbotKidSafe: true,
    safeSearchEnforced: true,
  },
  {
    id: 'STU-8822',
    name: 'Youssef Ibrahim',
    nameAr: 'يوسف إبراهيم',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    type: 'org-managed',
    level: 'Level 1 Scratch & Python Basics',
    levelNumber: 1,
    track: 'Scratch & Creative Coding',
    trackAr: 'سكراتش والبرمجة الإبداعية',
    sponsorName: 'Hope Academy',
    sponsorNameAr: 'أكاديمية الأمل الدولية',
    sponsorEmail: 'admin@hopeacademy.edu.eg',
    sponsorPhone: '+20 2 2617 8800',
    sponsorAddress: 'Road 90 North, Fifth Settlement, New Cairo',
    organizationId: 'ORG-HOPE-01',
    organizationName: 'Hope Academy',
    organizationClass: 'Class 5B',
    progress: 94,
    completedExercises: 47,
    totalExercises: 50,
    quizScore: 95.2,
    timeSpentHours: 42.0,
    mentorName: 'Ms. Rana & Ahmad Al-Farsi',
    mentorFeedback: 'Outstanding collaboration in class 5B group projects. Ready for Level 2 milestone evaluation.',
    verificationStatus: 'verified',
    aiFacialMatch: 97.8,
    videoSubmittedDate: '2026-10-05 11:15',
    videoTitle: 'Hope Academy Group Project: Space Dodger Simulator',
    videoDuration: '01:55',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    registeredDate: '2026-01-20',
    certificateId: 'CERT-CR-9921',
    isAiChatbotKidSafe: true,
    safeSearchEnforced: true,
  },
  {
    id: 'STU-8823',
    name: 'Laila Mahmoud',
    nameAr: 'ليلى محمود',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    type: 'individual',
    level: 'Level 3 Advanced Data Science',
    levelNumber: 3,
    track: 'Python Data Science Specialization',
    trackAr: 'تخصص علوم البيانات ببايثون',
    sponsorName: 'Self-Enrolled (Laila Mahmoud)',
    sponsorNameAr: 'تسجيل ذاتي (ليلى محمود)',
    sponsorEmail: 'laila.mahmoud2010@gmail.com',
    sponsorPhone: '+20 115 990 4123',
    sponsorAddress: 'Heliopolis, Cairo, Egypt',
    progress: 84,
    completedExercises: 38,
    totalExercises: 45,
    quizScore: 89.8,
    timeSpentHours: 54.2,
    mentorName: 'Tamer El-Ghandour',
    mentorFeedback: 'Impressive exploratory analysis on the Cairo weather dataset. Capstone ready for evaluation.',
    verificationStatus: 'verified',
    aiFacialMatch: 99.1,
    videoSubmittedDate: '2026-10-04 18:30',
    videoTitle: 'Pandas & Matplotlib Capstone Presentation',
    videoDuration: '03:10',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    registeredDate: '2026-03-01',
    activeOrderRef: 'ORD-1043',
    isAiChatbotKidSafe: true,
    safeSearchEnforced: false,
  },
  {
    id: 'STU-8824',
    name: 'Salma Hassan',
    nameAr: 'سلمى حسن',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&auto=format&fit=crop&q=80',
    type: 'parent-managed',
    level: 'Level 1 Scratch Starter',
    levelNumber: 1,
    track: 'Scratch & Creative Coding',
    trackAr: 'سكراتش والبرمجة الإبداعية',
    sponsorName: 'Fatima Hassan',
    sponsorNameAr: 'فاطمة حسن',
    sponsorEmail: 'fatima.hassan@example.com',
    sponsorPhone: '+20 102 334 8912',
    sponsorAddress: 'Building 14, Degla Palms, 6th of October, Cairo, Egypt',
    progress: 68,
    completedExercises: 24,
    totalExercises: 35,
    quizScore: 88.0,
    timeSpentHours: 18.0,
    mentorName: 'Sarah Nour',
    mentorFeedback: 'Very curious and imaginative. Loves creating sound effects for her animations.',
    verificationStatus: 'verified',
    aiFacialMatch: 96.5,
    videoSubmittedDate: '2026-09-28 10:14',
    videoTitle: 'Animated Story of the Magic Forest',
    videoDuration: '01:40',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    registeredDate: '2026-03-15',
    isAiChatbotKidSafe: true,
    safeSearchEnforced: true,
  },
  {
    id: 'STU-8825',
    name: 'Omar Tariq',
    nameAr: 'عمر طارق',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    type: 'org-managed',
    level: 'Level 1 Scratch & Python Basics',
    levelNumber: 1,
    track: 'Scratch & Creative Coding',
    trackAr: 'سكراتش والبرمجة الإبداعية',
    sponsorName: 'Hope Academy',
    sponsorNameAr: 'أكاديمية الأمل الدولية',
    sponsorEmail: 'admin@hopeacademy.edu.eg',
    sponsorPhone: '+20 2 2617 8800',
    sponsorAddress: 'Road 90 North, Fifth Settlement, New Cairo',
    organizationId: 'ORG-HOPE-01',
    organizationName: 'Hope Academy',
    organizationClass: 'Class 5A',
    progress: 76,
    completedExercises: 32,
    totalExercises: 42,
    quizScore: 84.5,
    timeSpentHours: 26.0,
    mentorName: 'Ahmad Al-Farsi',
    mentorFeedback: 'Consistently completes weekly lab tasks on time.',
    verificationStatus: 'verified',
    aiFacialMatch: 95.0,
    videoSubmittedDate: '2026-09-30 09:40',
    videoTitle: 'Math Quiz Maze Runner in Scratch',
    videoDuration: '02:05',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    registeredDate: '2026-01-22',
    isAiChatbotKidSafe: true,
    safeSearchEnforced: true,
  },
  {
    id: 'STU-8826',
    name: 'Mariam Zaid',
    nameAr: 'مريم زيد',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    type: 'parent-managed',
    level: 'Level 3 Web Apps Creator',
    levelNumber: 3,
    track: 'Modern Web Foundations',
    trackAr: 'أساسيات الويب الحديث وتطبيقاته',
    sponsorName: 'Zaid Al-Najjar',
    sponsorNameAr: 'زيد النجار',
    sponsorEmail: 'zaid.najjar@domain.com',
    sponsorPhone: '+20 120 445 1009',
    sponsorAddress: 'Zamalek, Cairo, Egypt',
    progress: 91,
    completedExercises: 45,
    totalExercises: 50,
    quizScore: 94.0,
    timeSpentHours: 49.0,
    mentorName: 'Ahmad Al-Farsi',
    mentorFeedback: 'Superb responsive design work in CSS Flexbox and Javascript DOM.',
    verificationStatus: 'pending',
    aiFacialMatch: 94.6,
    videoSubmittedDate: '2026-10-09 11:05',
    videoTitle: 'Interactive Web Calculator with Theme Switcher',
    videoDuration: '03:12',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    registeredDate: '2026-02-05',
    isAiChatbotKidSafe: true,
    safeSearchEnforced: true,
  }
];

export const initialParents: Parent[] = [
  {
    id: 'PAR-401',
    name: 'Fatima Hassan',
    nameAr: 'فاطمة حسن',
    email: 'fatima.hassan@example.com',
    phone: '+20 102 334 8912',
    location: 'Cairo, Egypt (6th of October)',
    locationAr: 'القاهرة، مصر (السادس من أكتوبر)',
    joinedDate: 'Jan 15, 2026',
    childrenCount: 2,
    childrenIds: ['STU-8821', 'STU-8824'],
    totalSpend: 1850,
    currency: 'USD',
    verificationStatus: 'verified',
    cardMask: '4242',
    cardBrand: 'Visa Signature',
    availableSeatCredits: 1,
    activeFamilyPlan: true,
    renewalDate: '2027-01-15',
  },
  {
    id: 'PAR-402',
    name: 'Tariq Al-Mansoor',
    nameAr: 'طارق المنصور',
    email: 'tariq.mansoor@domain.com',
    phone: '+20 100 882 1928',
    location: 'Alexandria, Egypt',
    locationAr: 'الإسكندرية، مصر',
    joinedDate: 'Feb 03, 2026',
    childrenCount: 1,
    childrenIds: ['STU-8825'],
    totalSpend: 650,
    currency: 'USD',
    verificationStatus: 'verified',
    cardMask: '8819',
    cardBrand: 'Mastercard World',
    availableSeatCredits: 0,
    activeFamilyPlan: false,
    renewalDate: '2026-11-20',
  },
  {
    id: 'PAR-403',
    name: 'Dina Radwan',
    nameAr: 'دينا رضوان',
    email: 'dina.radwan@me.com',
    phone: '+20 111 234 9901',
    location: 'Giza, Egypt (Dokki)',
    locationAr: 'الجيزة، مصر (الدقي)',
    joinedDate: 'Dec 12, 2025',
    childrenCount: 3,
    childrenIds: [],
    totalSpend: 2900,
    currency: 'USD',
    verificationStatus: 'verified',
    cardMask: '1109',
    cardBrand: 'Visa Platinum',
    availableSeatCredits: 2,
    activeFamilyPlan: true,
    renewalDate: '2026-12-12',
  }
];

export const initialIndividuals: IndividualLearner[] = [
  {
    id: 'IND-901',
    name: 'Laila Mahmoud',
    nameAr: 'ليلى محمود',
    age: 16,
    location: 'Heliopolis, Cairo',
    locationAr: 'مصر الجديدة، القاهرة',
    email: 'laila.mahmoud2010@gmail.com',
    phone: '+20 115 990 4123',
    track: 'Python Data Science Specialization',
    trackAr: 'تخصص علوم البيانات ببايثون',
    progress: 84,
    capstoneSubmitted: true,
    promoCodeUsed: 'CODEX20',
    referrerName: 'Uncle / Friend Recommendation',
    joinedDate: '2026-03-01',
    completionStatus: 'In Progress',
  },
  {
    id: 'IND-902',
    name: 'Tarek Nabil',
    nameAr: 'طارق نبيل',
    age: 17,
    location: 'Sidi Gaber, Alexandria',
    locationAr: 'سيدي جابر، الإسكندرية',
    email: 'tarek.nabil@alexcode.org',
    phone: '+20 106 771 9023',
    track: 'Modern Web Foundations',
    trackAr: 'أساسيات الويب الحديث وتطبيقاته',
    progress: 62,
    capstoneSubmitted: false,
    promoCodeUsed: 'SUMMER2026',
    referrerName: 'Social Ad - Instagram',
    joinedDate: '2026-06-10',
    completionStatus: 'In Progress',
  },
  {
    id: 'IND-903',
    name: 'Reem Al-Saleh',
    nameAr: 'ريم الصالح',
    age: 15,
    location: 'Maadi, Cairo',
    locationAr: 'المعادي، القاهرة',
    email: 'reem.saleh@outlook.com',
    phone: '+20 122 884 1022',
    track: 'Python & Game AI',
    trackAr: 'بايثون والذكاء الاصطناعي للألعاب',
    progress: 95,
    capstoneSubmitted: true,
    promoCodeUsed: 'CODEX20',
    referrerName: 'FATIMA-SHARE',
    joinedDate: '2026-02-18',
    completionStatus: 'Completed',
  }
];

export const initialOrganizations: Organization[] = [
  {
    id: 'ORG-HOPE-01',
    name: 'Hope Academy',
    nameAr: 'أكاديمية الأمل الدولية',
    tier: 'Gold Enterprise',
    seatsAllocated: 42,
    seatsTotal: 108,
    avgCompletion: 81.1,
    contractStatus: 'Active',
    contractValue: 2850,
    paymentTerms: 'Net 30 via Invoice Wire',
    step1: {
      status: 'ACCEPTED',
      commercialRegNo: 'CR-948201',
      ministryLicense: 'MOE-EG-2024-88',
      authorizedRep: 'Dr. Mona El-Shazly',
      authorizedRepAr: 'د. منى الشاذلي',
      repPhone: '+20 2 2617 8800',
      repEmail: 'director@hopeacademy.edu.eg',
      physicalAddress: 'Road 90 North, Fifth Settlement, New Cairo Campus',
      physicalAddressAr: 'شارع التسعين الشمالي، التجمع الخامس، حرم القاهرة الجديدة',
      submittedDate: '2026-01-10',
      docs: [
        { name: 'Commercial_Registration_CR948201.pdf', size: '2.4 MB', type: 'application/pdf' },
        { name: 'Ministry_of_Education_License_2024.pdf', size: '3.8 MB', type: 'application/pdf' },
        { name: 'Authorized_Signatory_PowerOfAttorney.pdf', size: '1.1 MB', type: 'application/pdf' },
      ],
    },
    step2: {
      status: 'ACCEPTED',
      computerLabsCount: 2,
      totalPCs: 30,
      pcSpecs: '30 Dell OptiPlex workstations, Core i5 12th Gen, 16GB RAM, Dual Monitors',
      bandwidth: '500 Mbps Dedicated Fiber Line',
      activeTracks: ['Scratch & Creative Coding', 'Python & Game AI'],
      teachersCount: 3,
      teachers: [
        { name: 'Ms. Rana Magdy', role: 'Lead Computer Teacher (Grades 4-6)', certified: true },
        { name: 'Eng. Karim Sallam', role: 'Lab Technical Director', certified: true },
        { name: 'Ms. Nourhan Samir', role: 'Assistant STEM Instructor', certified: true },
      ],
      submittedDate: '2026-01-20',
    },
    internalNotes: [
      {
        id: 'NOT-1',
        author: 'Sarah Al-Najjar (Super Admin)',
        date: '2026-01-22',
        text: 'School completed initial orientation lab onboarding. Outstanding enthusiasm from faculty.',
        severity: 'info',
      },
      {
        id: 'NOT-2',
        author: 'Dr. Kareem Zaki',
        date: '2026-03-01',
        text: 'High-priority institutional partner. Considering +50 seat expansion for Spring semester.',
        severity: 'confidential',
      },
    ],
    mentorAllocations: [
      { gradeClass: 'Class 5A (Scratch)', mentorId: 'MEN-101', mentorName: 'Ahmad Al-Farsi', studentsCount: 14 },
      { gradeClass: 'Class 5B (Python Intro)', mentorId: 'MEN-101', mentorName: 'Ahmad Al-Farsi', studentsCount: 15 },
      { gradeClass: 'Class 6A (Game AI)', mentorId: 'MEN-102', mentorName: 'Sarah Nour', studentsCount: 13 },
    ],
  },
  {
    id: 'ORG-NOOR-01',
    name: 'Noor School',
    nameAr: 'مدرسة النور الخاصة للغات',
    tier: 'Silver Academy',
    seatsAllocated: 0,
    seatsTotal: 65,
    avgCompletion: 0.0,
    contractStatus: 'Pending Step 1',
    contractValue: 1950,
    paymentTerms: 'Credit Card / 50% Upfront',
    step1: {
      status: 'PENDING',
      commercialRegNo: 'CR-881230',
      ministryLicense: 'MOE-EG-2025-14',
      authorizedRep: 'Eng. Hisham Kamal',
      authorizedRepAr: 'م. هشام كمال',
      repPhone: '+20 100 442 8110',
      repEmail: 'hisham.kamal@noorschools.edu.eg',
      physicalAddress: 'Block 8, District 7, Sheikh Zayed City, Giza',
      physicalAddressAr: 'الحي السابع، المجاورة الثامنة، مدينة الشيخ زايد، الجيزة',
      submittedDate: '2026-10-07',
      docs: [
        { name: 'Noor_School_Tax_Card_881230.pdf', size: '1.9 MB', type: 'application/pdf' },
        { name: 'Ministry_Accreditation_Certificate_Giza.pdf', size: '4.2 MB', type: 'application/pdf' },
        { name: 'Principal_Appointment_Decree.pdf', size: '890 KB', type: 'application/pdf' },
      ],
    },
    step2: {
      status: 'PENDING',
      computerLabsCount: 1,
      totalPCs: 25,
      pcSpecs: 'HP ProDesk, Core i5, 8GB RAM',
      bandwidth: '150 Mbps VDSL',
      activeTracks: ['Scratch & Creative Coding'],
      teachersCount: 2,
      teachers: [
        { name: 'Mr. Mahmoud Refaat', role: 'IT Teacher', certified: false },
        { name: 'Ms. Samar Ezzat', role: 'Math & Coding Teacher', certified: false },
      ],
      submittedDate: '2026-10-08',
    },
    internalNotes: [
      {
        id: 'NOT-3',
        author: 'Omar Mostafa (KYC Admin)',
        date: '2026-10-07',
        text: 'Awaiting clarity on principal signature legitimacy in Ministry Decree page 2.',
        severity: 'warning',
      },
    ],
    mentorAllocations: [],
  },
  {
    id: 'ORG-BRIGHT-02',
    name: 'Bright Centre for Tech & Innovation',
    nameAr: 'مركز برايت للتقنية والابتكار',
    tier: 'Gold Enterprise',
    seatsAllocated: 0,
    seatsTotal: 50,
    avgCompletion: 0.0,
    contractStatus: 'Pending Step 2',
    contractValue: 2400,
    paymentTerms: 'Bank Transfer / Annual',
    step1: {
      status: 'ACCEPTED',
      commercialRegNo: 'CR-772910',
      ministryLicense: 'TECH-HUB-ALEX-2025-09',
      authorizedRep: 'Eng. Amr Mostafa',
      authorizedRepAr: 'م. عمرو مصطفى',
      repPhone: '+20 122 344 9911',
      repEmail: 'amr.mostafa@brightcentre.org',
      physicalAddress: 'Smouha Plaza Building, Floor 4, Alexandria',
      physicalAddressAr: 'مبنى سموحة بلازا، الدور الرابع، الإسكندرية',
      submittedDate: '2026-09-20',
      docs: [
        { name: 'Bright_Centre_Commercial_License.pdf', size: '3.1 MB', type: 'application/pdf' },
        { name: 'Alex_Governorate_Accreditation.pdf', size: '2.8 MB', type: 'application/pdf' },
      ],
    },
    step2: {
      status: 'PENDING',
      computerLabsCount: 2,
      totalPCs: 30,
      pcSpecs: 'Custom Assembled Workstations, Intel Core i5 13th Gen, 16GB DDR5, Gigabit LAN',
      bandwidth: '300 Mbps Fiber Optical Line',
      activeTracks: ['Scratch & Creative Coding', 'Modern Web Foundations', 'Python & Game AI'],
      teachersCount: 3,
      teachers: [
        { name: 'Eng. Amr Mostafa', role: 'Head of Curriculum & Systems', certified: true },
        { name: 'Dr. Hoda Basyoni', role: 'Senior AI Researcher & Trainer', certified: true },
        { name: 'Eng. Nader Shaker', role: 'Junior Web Instructor', certified: true },
      ],
      submittedDate: '2026-10-06',
    },
    internalNotes: [
      {
        id: 'NOT-4',
        author: 'Omar Mostafa (KYC Admin)',
        date: '2026-10-06',
        text: 'Step 1 successfully cleared. Lab hardware audit and bandwidth testing look top tier. Ready for Step 2 final accreditation.',
        severity: 'info',
      },
    ],
    mentorAllocations: [],
  }
];

export const initialMentors: Mentor[] = [
  {
    id: 'MEN-101',
    name: 'Ahmad Al-Farsi',
    nameAr: 'أحمد الفارسي',
    email: 'ahmad.alfarsi@codera.app',
    phone: '+20 101 229 9001',
    specialtyTrack: 'Python & Game AI / Web',
    specialtyTrackAr: 'بايثون وذكاء الألعاب / الويب',
    assignedStudentsCount: 42,
    activeReviewsPending: 5,
    rating: 4.9,
    responseSLAHours: 3.2,
    assignedOrganizations: ['Hope Academy', 'Bright Centre'],
    monthlyCompensation: 1420,
    joinedDate: '2025-08-10',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'MEN-102',
    name: 'Sarah Nour',
    nameAr: 'سارة نور',
    email: 'sarah.nour@codera.app',
    phone: '+20 109 881 2234',
    specialtyTrack: 'Scratch & Creative Coding',
    specialtyTrackAr: 'سكراتش والبرمجة الإبداعية للأطفال',
    assignedStudentsCount: 38,
    activeReviewsPending: 2,
    rating: 4.85,
    responseSLAHours: 2.8,
    assignedOrganizations: ['Hope Academy'],
    monthlyCompensation: 1250,
    joinedDate: '2025-10-01',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'MEN-103',
    name: 'Tamer El-Ghandour',
    nameAr: 'تامر الغندور',
    email: 'tamer.ghandour@codera.app',
    phone: '+20 114 550 8891',
    specialtyTrack: 'Full-Stack Web & Data Science',
    specialtyTrackAr: 'تطوير الويب الكامل وعلوم البيانات',
    assignedStudentsCount: 29,
    activeReviewsPending: 4,
    rating: 4.95,
    responseSLAHours: 2.1,
    assignedOrganizations: ['Bright Centre'],
    monthlyCompensation: 1600,
    joinedDate: '2025-06-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-1048',
    buyerName: 'Hope Academy Admin (Dr. Mona El-Shazly)',
    buyerType: 'Organization',
    buyerEmail: 'director@hopeacademy.edu.eg',
    date: '2026-10-02 16:45',
    amount: 2850.0,
    currency: 'USD',
    gateway: 'Stripe',
    gatewayRef: 'ch_3M4o928dk29188x',
    status: 'Settled',
    seatsCount: 50,
    seatsUsed: 10,
    tax: 350.0,
    items: [
      {
        description: '50 Student Seats - Gold Tier Enterprise License (Academic Year 2026/2027)',
        quantity: 50,
        unitPrice: 50.0,
        total: 2500.0,
      },
      {
        description: 'Accreditation & Lab Setup Assessment Fee',
        quantity: 1,
        unitPrice: 0.0,
        total: 0.0,
      },
    ],
    eventTimeline: [
      { timestamp: '2026-10-02 16:40:12', event: 'checkout.session.completed', details: 'Stripe session created for $2,850.00 USD' },
      { timestamp: '2026-10-02 16:45:01', event: 'charge.succeeded', details: 'Authorized charge ref ch_3M4o928dk29188x via Visa **** 4242' },
      { timestamp: '2026-10-02 16:45:03', event: 'seats.provisioned', details: '50 license tokens injected to Hope Academy tenant ORG-HOPE-01' },
      { timestamp: '2026-10-02 16:46:10', event: 'invoice.delivered', details: 'Tax invoice PDF emailed to director@hopeacademy.edu.eg' },
    ],
  },
  {
    id: 'ORD-1047',
    buyerName: 'Fatima Hassan',
    buyerType: 'Parent',
    buyerEmail: 'fatima.hassan@example.com',
    date: '2026-09-28 11:20',
    amount: 450.0,
    currency: 'USD',
    gateway: 'Stripe',
    gatewayRef: 'ch_3M2z819k1819xx',
    status: 'Settled',
    seatsCount: 2,
    seatsUsed: 2,
    tax: 45.0,
    items: [
      {
        description: 'Family 2-Child Explorer Bundle (Annual)',
        quantity: 1,
        unitPrice: 405.0,
        total: 405.0,
      },
    ],
    eventTimeline: [
      { timestamp: '2026-09-28 11:20:00', event: 'charge.succeeded', details: 'Settled $450.00' },
    ],
  },
  {
    id: 'ORD-1046',
    buyerName: 'Tariq Al-Mansoor',
    buyerType: 'Parent',
    buyerEmail: 'tariq.mansoor@domain.com',
    date: '2026-09-15 08:30',
    amount: 320.0,
    currency: 'USD',
    gateway: 'Paymob',
    gatewayRef: 'paymob_txn_881920',
    status: 'Settled',
    seatsCount: 1,
    seatsUsed: 1,
    tax: 30.0,
    items: [
      {
        description: 'Python Starter Track (Annual Seat)',
        quantity: 1,
        unitPrice: 290.0,
        total: 290.0,
      },
    ],
    eventTimeline: [
      { timestamp: '2026-09-15 08:30:15', event: 'paymob.callback.success', details: 'Card accepted' },
    ],
  },
  {
    id: 'ORD-1045',
    buyerName: 'STEM Hub Alexandria',
    buyerType: 'Organization',
    buyerEmail: 'info@stemhubalex.org',
    date: '2026-09-02 14:10',
    amount: 1100.0,
    currency: 'USD',
    gateway: 'Bank Wire',
    gatewayRef: 'wire_cbe_9018274',
    status: 'Settled',
    seatsCount: 20,
    seatsUsed: 20,
    tax: 100.0,
    items: [
      {
        description: '20 Additional Enterprise Seats',
        quantity: 20,
        unitPrice: 50.0,
        total: 1000.0,
      },
    ],
    eventTimeline: [
      { timestamp: '2026-09-02 14:10:00', event: 'wire.reconciled', details: 'Confirmed by Finance Hany Farid' },
    ],
  },
  {
    id: 'ORD-1043',
    buyerName: 'Laila Mahmoud',
    buyerType: 'Individual',
    buyerEmail: 'laila.mahmoud2010@gmail.com',
    date: '2026-08-20 19:40',
    amount: 190.0,
    currency: 'USD',
    gateway: 'Stripe',
    gatewayRef: 'ch_3L99281aab28',
    status: 'Settled',
    seatsCount: 1,
    seatsUsed: 1,
    tax: 15.0,
    items: [
      {
        description: 'Self-Paced Data Science Specialization (Promo CODEX20 applied)',
        quantity: 1,
        unitPrice: 175.0,
        total: 175.0,
      },
    ],
    eventTimeline: [
      { timestamp: '2026-08-20 19:40:02', event: 'charge.succeeded', details: 'Settled $190.00' },
    ],
  }
];

export const initialPromos: PromoCode[] = [
  {
    id: 'PRO-1',
    code: 'SUMMER2026',
    discountPercentage: 25,
    applicableTracks: ['All Tracks'],
    redemptionsCount: 142,
    maxRedemptions: 500,
    expiryDate: '2026-08-31',
    status: 'Active',
    targetAudience: 'All',
  },
  {
    id: 'PRO-2',
    code: 'BACK2SCHOOL',
    discountPercentage: 20,
    applicableTracks: ['Python & Game AI', 'Scratch & Creative Coding'],
    redemptionsCount: 89,
    maxRedemptions: 300,
    expiryDate: '2026-10-31',
    status: 'Active',
    targetAudience: 'Parents Only',
  },
  {
    id: 'PRO-3',
    code: 'CODEX20',
    discountPercentage: 20,
    applicableTracks: ['Python Data Science Specialization', 'Modern Web Foundations'],
    redemptionsCount: 240,
    maxRedemptions: 1000,
    expiryDate: '2026-12-31',
    status: 'Active',
    targetAudience: 'Individuals Only',
  },
  {
    id: 'PRO-4',
    code: 'HOPEPARTNER30',
    discountPercentage: 30,
    applicableTracks: ['Enterprise Gold'],
    redemptionsCount: 1,
    maxRedemptions: 10,
    expiryDate: '2026-12-31',
    status: 'Active',
    targetAudience: 'Organizations Only',
  }
];

export const initialReferrals: Referral[] = [
  {
    id: 'REF-1',
    referrerName: 'Fatima Hassan',
    referrerEmail: 'fatima.hassan@example.com',
    code: 'FATIMA-SHARE',
    invitesSent: 18,
    convertedSignups: 12,
    commissionEarned: 240,
    payoutStatus: 'Paid',
    suspiciousDuplicatesCount: 0,
    lastPayoutDate: '2026-09-30',
  },
  {
    id: 'REF-2',
    referrerName: 'Alex STEM Club (Eng. Amr)',
    referrerEmail: 'amr.mostafa@brightcentre.org',
    code: 'ALEX-STEM-REF',
    invitesSent: 34,
    convertedSignups: 26,
    commissionEarned: 520,
    payoutStatus: 'Pending Audit',
    suspiciousDuplicatesCount: 1,
    lastPayoutDate: '2026-08-31',
  },
  {
    id: 'REF-3',
    referrerName: 'Tamer El-Ghandour',
    referrerEmail: 'tamer.ghandour@codera.app',
    code: 'TAMER-CODE',
    invitesSent: 9,
    convertedSignups: 7,
    commissionEarned: 140,
    payoutStatus: 'Paid',
    suspiciousDuplicatesCount: 0,
    lastPayoutDate: '2026-09-15',
  }
];

export const initialAIReports: AIReport[] = [
  {
    sessionId: 'AI-PROC-9912',
    studentName: 'Ahmed Hassan',
    organizationName: 'Parent Managed (Fatima Hassan)',
    timestamp: '2026-10-08 14:23:10',
    livenessConfidence: 98.4,
    voiceMatchConfidence: 97.2,
    codePlagiarismScore: 1.2,
    riskRating: 'Clean',
    verdict: 'Automated Pass',
    details: 'Biometric liveness confirmed. Real-time screen capture matches IDE keystroke log. 0 third-party audio detected.',
  },
  {
    sessionId: 'AI-PROC-9913',
    studentName: 'Youssef Ibrahim',
    organizationName: 'Hope Academy',
    timestamp: '2026-10-05 11:17:02',
    livenessConfidence: 97.8,
    voiceMatchConfidence: 98.0,
    codePlagiarismScore: 3.4,
    riskRating: 'Clean',
    verdict: 'Automated Pass',
    details: 'Hope Academy classroom IP authenticated. Scratch project blocks verified with curriculum assertions.',
  },
  {
    sessionId: 'AI-PROC-9914',
    studentName: 'Mariam Zaid',
    organizationName: 'Parent Managed (Zaid Al-Najjar)',
    timestamp: '2026-10-09 11:06:45',
    livenessConfidence: 94.6,
    voiceMatchConfidence: 93.1,
    codePlagiarismScore: 8.5,
    riskRating: 'Moderate Risk',
    verdict: 'Manual QA Required',
    details: 'Slight background audio detected at 01:14 mark. Recommend reviewer audit for student verbal explanation.',
  }
];

export const initialSubAdmins: SubAdmin[] = [
  {
    id: 'ADM-01',
    name: 'Dr. Kareem Zaki',
    email: 'kareem.zaki@codera.app',
    department: 'Super Admin',
    twoFactorEnabled: true,
    lastActive: 'Just now',
    status: 'Active',
    permissions: {
      canEditContent: true,
      canIssueRefunds: true,
      canApproveKYCStep1: true,
      canApproveKYCStep2: true,
      canDeleteUsers: true,
    },
  },
  {
    id: 'ADM-02',
    name: 'Sarah Al-Najjar',
    email: 'sarah.najjar@codera.app',
    department: 'Pedagogy',
    twoFactorEnabled: true,
    lastActive: '12 mins ago',
    status: 'Active',
    permissions: {
      canEditContent: true,
      canIssueRefunds: false,
      canApproveKYCStep1: true,
      canApproveKYCStep2: true,
      canDeleteUsers: false,
    },
  },
  {
    id: 'ADM-03',
    name: 'Hany Farid',
    email: 'hany.farid@codera.app',
    department: 'Finance',
    twoFactorEnabled: true,
    lastActive: '45 mins ago',
    status: 'Active',
    permissions: {
      canEditContent: false,
      canIssueRefunds: true,
      canApproveKYCStep1: false,
      canApproveKYCStep2: false,
      canDeleteUsers: false,
    },
  },
  {
    id: 'ADM-04',
    name: 'Omar Mostafa',
    email: 'omar.mostafa@codera.app',
    department: 'KYC Verification',
    twoFactorEnabled: true,
    lastActive: '1 hour ago',
    status: 'Active',
    permissions: {
      canEditContent: false,
      canIssueRefunds: false,
      canApproveKYCStep1: true,
      canApproveKYCStep2: true,
      canDeleteUsers: false,
    },
  }
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: 'LOG-901',
    timestamp: '2026-10-09 15:10:44',
    adminName: 'Dr. Kareem Zaki',
    department: 'Super Admin',
    action: 'Simulated Role switch to Sub-Admin (KYC)',
    actionAr: 'محاكاة تبديل الدور إلى مسؤول فرعي (التحقق KYC)',
    ipAddress: '197.38.12.89',
    status: 'Success',
  },
  {
    id: 'LOG-902',
    timestamp: '2026-10-09 14:02:11',
    adminName: 'Omar Mostafa',
    department: 'KYC Verification',
    action: 'Approved Bright Centre Step 1 Documentation (CR-772910)',
    actionAr: 'الموافقة على مستندات الخطوة 1 لمركز برايت (CR-772910)',
    ipAddress: '156.204.91.12',
    status: 'Success',
  },
  {
    id: 'LOG-903',
    timestamp: '2026-10-08 18:45:00',
    adminName: 'Hany Farid',
    department: 'Finance',
    action: 'Dispatched Tax Invoice PDF for Order ORD-1048',
    actionAr: 'إرسال فاتورة ضريبية PDF للطلب ORD-1048',
    ipAddress: '197.35.210.4',
    status: 'Success',
  },
  {
    id: 'LOG-904',
    timestamp: '2026-10-08 11:30:22',
    adminName: 'Sarah Al-Najjar',
    department: 'Pedagogy',
    action: 'Updated Level 2 Curriculum: Added Turtle Star Fractal Challenge',
    actionAr: 'تحديث منهج المستوى 2: إضافة تحدي كسيرية النجمة لسلحفاة بايثون',
    ipAddress: '41.233.18.55',
    status: 'Success',
  },
  {
    id: 'LOG-905',
    timestamp: '2026-10-07 09:12:05',
    adminName: 'Security Automated Sentinel',
    department: 'System Guard',
    action: 'Detected duplicate IP signup for Referral ALEX-STEM-REF',
    actionAr: 'اكتشاف تسجيل مكرر لنفس عنوان IP لكود الإحالة ALEX-STEM-REF',
    ipAddress: '156.198.44.11',
    status: 'Warning',
  }
];

export const curriculumTracks = [
  {
    id: 'TRK-PYTHON',
    title: 'Python Programming & AI Explorer',
    titleAr: 'برمجة بايثون ومستكشف الذكاء الاصطناعي',
    description: 'From turtle graphics to deep learning fundamentals with fun hands-on projects for kids & teens.',
    descriptionAr: 'من رسوم السلحفاة حتى أساسيات التعلم العميق مع مشاريع عملية وتفاعلية للأطفال واليافعين.',
    targetAge: 'Ages 11-18',
    levels: [
      {
        levelNumber: 1,
        title: 'Level 1: Variables, Conditionals & Loops',
        titleAr: 'المستوى 1: المتغيرات والشروط وحلقات التكرار',
        chaptersCount: 6,
        exercisesCount: 30,
        chapters: [
          'Welcome to Python World & Output Syntax',
          'Data Types, Variables & Arithmetic Magic',
          'Conditional Logic & Decision Trees',
          'While and For Loops with Turtle Graphics',
          'Lists, Sequences and Indexing Fun',
          'Mini-Game Capstone: Guess the Secret Code',
        ],
      },
      {
        levelNumber: 2,
        title: 'Level 2: Functions, Data Structures & OOP',
        titleAr: 'المستوى 2: الدوال، هياكل البيانات والبرمجة كائنية التوجه',
        chaptersCount: 8,
        exercisesCount: 50,
        chapters: [
          'Function Parameters, Scope & Returns',
          'Dictionaries, Tuples and Nested JSON',
          'Object-Oriented Programming (Classes & Objects)',
          'Turtle Graphics Fractals & Recursion',
          'File Handling & Saving Player Scores',
          'Building the Space Invader Arcade Game',
        ],
      },
      {
        levelNumber: 3,
        title: 'Level 3: Data Science, NumPy & AI Models',
        titleAr: 'المستوى 3: علوم البيانات، مكتبة نامباي ونماذج الذكاء الاصطناعي',
        chaptersCount: 10,
        exercisesCount: 60,
        chapters: [
          'NumPy Arrays and Matrix Manipulations',
          'Pandas DataFrames with Real-world Datasets',
          'Data Visualization with Matplotlib & Seaborn',
          'Introduction to Machine Learning Classifiers',
          'Building a Kid-Friendly Chatbot Agent',
          'Graduation Capstone: AI Image Classifier',
        ],
      },
    ],
  },
  {
    id: 'TRK-SCRATCH',
    title: 'Scratch & Creative Block Coding',
    titleAr: 'سكراتش والبرمجة الإبداعية بالكتل البرمجية',
    description: 'Visual programming environment teaching computational thinking, animation, and game mechanics.',
    descriptionAr: 'بيئة بصرية لتعليم التفكير الحاسوبي والرسوم المتحركة وميكانيكا الألعاب.',
    targetAge: 'Ages 7-12',
    levels: [
      {
        levelNumber: 1,
        title: 'Level 1: Sprites, Motion & Sounds',
        titleAr: 'المستوى 1: الكائنات والحركة والمؤثرات الصوتية',
        chaptersCount: 5,
        exercisesCount: 25,
        chapters: [
          'Meet the Cat: Stage, Backdrop & Coordinates',
          'Motion Blocks: Gliding, Bouncing & Steps',
          'Sound Studio: Recording & Pitch Modulation',
          'Events & Broadcasting Messages',
          'Project: Interactive Musical Orchestra',
        ],
      },
      {
        levelNumber: 2,
        title: 'Level 2: Game Logic, Variables & Clones',
        titleAr: 'المستوى 2: منطق الألعاب، المتغيرات واستنساخ الكائنات',
        chaptersCount: 6,
        exercisesCount: 35,
        chapters: [
          'Scoreboards & Countdown Timers',
          'Collision Detection & Health Bars',
          'Sprite Cloning for Meteor Showers',
          'Custom My-Blocks with Arguments',
          'Boss Battle: Multi-Stage Space Dodger',
        ],
      },
    ],
  },
  {
    id: 'TRK-WEB',
    title: 'Modern Web Foundations & React',
    titleAr: 'أساسيات الويب الحديث ومكتبة ريأكت',
    description: 'Build real-world websites and web applications from HTML/CSS to JavaScript DOM and React.',
    descriptionAr: 'بناء مواقع ويب وتطبيقات حقيقية من HTML/CSS حتى جافاسكريبت وريأكت.',
    targetAge: 'Ages 12-18',
    levels: [
      {
        levelNumber: 1,
        title: 'Level 1: Semantic HTML & Modern CSS',
        titleAr: 'المستوى 1: هيكل HTML وتنسيقات CSS الحديثة',
        chaptersCount: 6,
        exercisesCount: 30,
        chapters: [
          'Tags, Typography and Semantic Document Outlines',
          'CSS Box Model, Colors and Glassmorphism',
          'Flexbox & Grid Layout Architecture',
          'Responsive Design & Media Queries',
          'Project: Portfolio Showcase for Young Makers',
        ],
      },
      {
        levelNumber: 2,
        title: 'Level 2: JavaScript DOM & Event Driven Web',
        titleAr: 'المستوى 2: جافاسكريبت والتفاعل البرمجي مع المتصفح',
        chaptersCount: 7,
        exercisesCount: 40,
        chapters: [
          'Variables, Arrow Functions & Event Listeners',
          'QuerySelector, DOM Manipulation & Animations',
          'LocalStorage & Persistent Todo App',
          'Fetch API & Async Weather Widget',
          'Capstone: Interactive Calculator with Sound Effects',
        ],
      },
    ],
  },
];

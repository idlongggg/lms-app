/**
 * Mock Classes Data
 * Based on database.md schema: Classes, Enrollments, Parent-Child relationships
 */

import { mockUsers } from './users';

export interface Class {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  grade: number; // 1-12
  subject: string;
  teacherId: string;
  academicYear: string;
  semester: 1 | 2;
  studentCount: number;
  maxStudents: number;
  status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT';
  schedule: string; // e.g., "Thứ 2, 4, 6 - 14:00"
  room: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ClassEnrollment {
  id: string;
  classId: string;
  studentId: string;
  enrolledAt: string;
  status: 'ACTIVE' | 'DROPPED' | 'COMPLETED';
}

export interface ParentChildLink {
  id: string;
  parentId: string;
  childId: string;
  relationship: 'FATHER' | 'MOTHER' | 'GUARDIAN';
  isPrimary: boolean;
  createdAt: string;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  avatarUrl: string | null;
  completedLessons: number;
  totalLessons: number;
  averageScore: number;
  lastActive: string;
  streak: number;
}

export interface ClassProgress {
  classId: string;
  className: string;
  averageProgress: number;
  averageScore: number;
  activeStudents: number;
  totalStudents: number;
  topPerformers: StudentProgress[];
  needsAttention: StudentProgress[];
}

// Mock Classes
export const mockClasses: Class[] = [
  {
    id: 'class-001',
    tenantId: 'tenant-school-001',
    name: 'Toán 6A1',
    code: 'TOAN-6A1-2024',
    grade: 6,
    subject: 'Toán học',
    teacherId: 'user-teacher-001',
    academicYear: '2024-2025',
    semester: 1,
    studentCount: 35,
    maxStudents: 40,
    status: 'ACTIVE',
    schedule: 'Thứ 2, 4, 6 - 08:00',
    room: 'Phòng 201',
    description: 'Lớp Toán nâng cao khối 6',
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-15T00:00:00Z',
  },
  {
    id: 'class-002',
    tenantId: 'tenant-school-001',
    name: 'Toán 7B2',
    code: 'TOAN-7B2-2024',
    grade: 7,
    subject: 'Toán học',
    teacherId: 'user-teacher-001',
    academicYear: '2024-2025',
    semester: 1,
    studentCount: 32,
    maxStudents: 40,
    status: 'ACTIVE',
    schedule: 'Thứ 3, 5 - 10:00',
    room: 'Phòng 305',
    description: 'Lớp Toán cơ bản khối 7',
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-15T00:00:00Z',
  },
  {
    id: 'class-003',
    tenantId: 'tenant-school-001',
    name: 'Toán 8A1',
    code: 'TOAN-8A1-2024',
    grade: 8,
    subject: 'Toán học',
    teacherId: 'user-teacher-001',
    academicYear: '2024-2025',
    semester: 1,
    studentCount: 28,
    maxStudents: 35,
    status: 'ACTIVE',
    schedule: 'Thứ 2, 4 - 14:00',
    room: 'Phòng 102',
    description: null,
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-08-15T00:00:00Z',
  },
];

// Mock Class Enrollments
export const mockEnrollments: ClassEnrollment[] = [
  // Student 001 enrolled in class-001
  {
    id: 'enroll-001',
    classId: 'class-001',
    studentId: 'user-student-001',
    enrolledAt: '2024-08-01T00:00:00Z',
    status: 'ACTIVE',
  },
  // More students in class-001
  {
    id: 'enroll-002',
    classId: 'class-001',
    studentId: 'user-student-002',
    enrolledAt: '2024-08-01T00:00:00Z',
    status: 'ACTIVE',
  },
  {
    id: 'enroll-003',
    classId: 'class-001',
    studentId: 'user-student-003',
    enrolledAt: '2024-08-01T00:00:00Z',
    status: 'ACTIVE',
  },
];

// Mock Parent-Child Links
export const mockParentChildLinks: ParentChildLink[] = [
  {
    id: 'link-001',
    parentId: 'user-parent-001',
    childId: 'user-student-001',
    relationship: 'FATHER',
    isPrimary: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'link-002',
    parentId: 'user-parent-001',
    childId: 'user-student-002',
    relationship: 'FATHER',
    isPrimary: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Helper functions
export function getClassesByTeacher(teacherId: string): Class[] {
  return mockClasses.filter((c) => c.teacherId === teacherId);
}

export function getStudentsByClass(classId: string): string[] {
  return mockEnrollments
    .filter((e) => e.classId === classId && e.status === 'ACTIVE')
    .map((e) => e.studentId);
}

export function getChildrenByParent(parentId: string): string[] {
  return mockParentChildLinks.filter((l) => l.parentId === parentId).map((l) => l.childId);
}

export function getClassesByStudent(studentId: string): Class[] {
  const classIds = mockEnrollments
    .filter((e) => e.studentId === studentId && e.status === 'ACTIVE')
    .map((e) => e.classId);
  return mockClasses.filter((c) => classIds.includes(c.id));
}

// Mock student progress data
export const mockStudentProgress: StudentProgress[] = [
  {
    studentId: 'user-student-001',
    studentName: 'Nguyễn Văn An',
    avatarUrl: null,
    completedLessons: 24,
    totalLessons: 30,
    averageScore: 85,
    lastActive: '2024-01-20T10:30:00Z',
    streak: 7,
  },
  {
    studentId: 'user-student-002',
    studentName: 'Trần Thị Bình',
    avatarUrl: null,
    completedLessons: 28,
    totalLessons: 30,
    averageScore: 92,
    lastActive: '2024-01-20T14:00:00Z',
    streak: 12,
  },
  {
    studentId: 'user-student-003',
    studentName: 'Lê Hoàng Cường',
    avatarUrl: null,
    completedLessons: 15,
    totalLessons: 30,
    averageScore: 68,
    lastActive: '2024-01-18T09:00:00Z',
    streak: 2,
  },
];

// Mock class progress data
export const mockClassProgress: ClassProgress[] = [
  {
    classId: 'class-001',
    className: 'Toán 6A1',
    averageProgress: 78,
    averageScore: 82,
    activeStudents: 32,
    totalStudents: 35,
    topPerformers: [mockStudentProgress[1], mockStudentProgress[0]],
    needsAttention: [mockStudentProgress[2]],
  },
  {
    classId: 'class-002',
    className: 'Toán 7B2',
    averageProgress: 72,
    averageScore: 75,
    activeStudents: 30,
    totalStudents: 32,
    topPerformers: [],
    needsAttention: [],
  },
  {
    classId: 'class-003',
    className: 'Toán 8A1',
    averageProgress: 85,
    averageScore: 88,
    activeStudents: 28,
    totalStudents: 28,
    topPerformers: [],
    needsAttention: [],
  },
];

// Child progress for parents
export interface ChildProgress {
  childId: string;
  childName: string;
  avatarUrl: string | null;
  grade: number;
  classes: {
    className: string;
    subject: string;
    progress: number;
    score: number;
    teacherName: string;
  }[];
  overallProgress: number;
  overallScore: number;
  streak: number;
  lastActive: string;
  recentActivities: {
    type: 'lesson' | 'quiz' | 'tournament';
    title: string;
    score?: number;
    completedAt: string;
  }[];
  tournaments: {
    name: string;
    rank: number;
    totalParticipants: number;
    score: number;
    date: string;
  }[];
}

export const mockChildrenProgress: ChildProgress[] = [
  {
    childId: 'user-student-001',
    childName: 'Nguyễn Văn An',
    avatarUrl: null,
    grade: 6,
    classes: [
      {
        className: 'Toán 6A1',
        subject: 'Toán học',
        progress: 80,
        score: 85,
        teacherName: 'Thầy Giáo A',
      },
    ],
    overallProgress: 80,
    overallScore: 85,
    streak: 7,
    lastActive: '2024-01-20T10:30:00Z',
    recentActivities: [
      {
        type: 'lesson',
        title: 'Phép cộng phân số',
        completedAt: '2024-01-20T10:30:00Z',
      },
      {
        type: 'quiz',
        title: 'Kiểm tra chương 3',
        score: 90,
        completedAt: '2024-01-19T14:00:00Z',
      },
      {
        type: 'tournament',
        title: 'Đấu trường Toán học',
        score: 850,
        completedAt: '2024-01-18T16:00:00Z',
      },
    ],
    tournaments: [
      {
        name: 'Đấu trường Toán học tuần 3',
        rank: 5,
        totalParticipants: 120,
        score: 850,
        date: '2024-01-18T16:00:00Z',
      },
      {
        name: 'Đấu trường Toán học tuần 2',
        rank: 12,
        totalParticipants: 115,
        score: 720,
        date: '2024-01-11T16:00:00Z',
      },
    ],
  },
  {
    childId: 'user-student-002',
    childName: 'Nguyễn Thị Bảo',
    avatarUrl: null,
    grade: 4,
    classes: [
      {
        className: 'Toán 4A2',
        subject: 'Toán học',
        progress: 92,
        score: 94,
        teacherName: 'Cô Giáo B',
      },
    ],
    overallProgress: 92,
    overallScore: 94,
    streak: 14,
    lastActive: '2024-01-20T15:00:00Z',
    recentActivities: [
      {
        type: 'lesson',
        title: 'Phép nhân hai chữ số',
        completedAt: '2024-01-20T15:00:00Z',
      },
      {
        type: 'quiz',
        title: 'Ôn tập cuối chương',
        score: 95,
        completedAt: '2024-01-20T11:00:00Z',
      },
    ],
    tournaments: [
      {
        name: 'Đấu trường Toán học tuần 3',
        rank: 2,
        totalParticipants: 80,
        score: 920,
        date: '2024-01-18T16:00:00Z',
      },
    ],
  },
];

export function getChildrenProgressByParent(parentId: string): ChildProgress[] {
  const childIds = getChildrenByParent(parentId);
  return mockChildrenProgress.filter((c) => childIds.includes(c.childId));
}

// Teacher question bank
export interface Question {
  id: string;
  tenantId: string;
  teacherId: string;
  subject: string;
  grade: number;
  topic: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'FILL_BLANK' | 'SHORT_ANSWER';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  content: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export const mockQuestions: Question[] = [
  {
    id: 'q-001',
    tenantId: 'tenant-school-001',
    teacherId: 'user-teacher-001',
    subject: 'Toán học',
    grade: 6,
    topic: 'Phân số',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'EASY',
    content: '1/2 + 1/4 = ?',
    options: ['1/6', '2/6', '3/4', '1/4'],
    correctAnswer: '3/4',
    explanation: '1/2 = 2/4, nên 2/4 + 1/4 = 3/4',
    usageCount: 45,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'q-002',
    tenantId: 'tenant-school-001',
    teacherId: 'user-teacher-001',
    subject: 'Toán học',
    grade: 6,
    topic: 'Phân số',
    type: 'MULTIPLE_CHOICE',
    difficulty: 'MEDIUM',
    content: 'Rút gọn phân số 12/18',
    options: ['2/3', '4/6', '6/9', '3/4'],
    correctAnswer: '2/3',
    explanation: 'ƯCLN(12, 18) = 6, nên 12/18 = 2/3',
    usageCount: 32,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
  },
  {
    id: 'q-003',
    tenantId: 'tenant-school-001',
    teacherId: 'user-teacher-001',
    subject: 'Toán học',
    grade: 7,
    topic: 'Số hữu tỉ',
    type: 'TRUE_FALSE',
    difficulty: 'EASY',
    content: '-2/3 là số hữu tỉ âm',
    correctAnswer: 'true',
    explanation: 'Số hữu tỉ âm là số hữu tỉ nhỏ hơn 0',
    usageCount: 28,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z',
  },
  {
    id: 'q-004',
    tenantId: 'tenant-school-001',
    teacherId: 'user-teacher-001',
    subject: 'Toán học',
    grade: 8,
    topic: 'Phương trình bậc nhất',
    type: 'FILL_BLANK',
    difficulty: 'HARD',
    content: 'Giải phương trình 2x + 5 = 11, x = ___',
    correctAnswer: '3',
    explanation: '2x = 11 - 5 = 6, x = 3',
    usageCount: 50,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z',
  },
];

export function getQuestionsByTeacher(teacherId: string): Question[] {
  return mockQuestions.filter((q) => q.teacherId === teacherId);
}

export function getQuestionStats(teacherId: string) {
  const questions = getQuestionsByTeacher(teacherId);
  return {
    total: questions.length,
    byDifficulty: {
      easy: questions.filter((q) => q.difficulty === 'EASY').length,
      medium: questions.filter((q) => q.difficulty === 'MEDIUM').length,
      hard: questions.filter((q) => q.difficulty === 'HARD').length,
    },
    byType: {
      multipleChoice: questions.filter((q) => q.type === 'MULTIPLE_CHOICE').length,
      trueFalse: questions.filter((q) => q.type === 'TRUE_FALSE').length,
      fillBlank: questions.filter((q) => q.type === 'FILL_BLANK').length,
      shortAnswer: questions.filter((q) => q.type === 'SHORT_ANSWER').length,
    },
    byGrade: questions.reduce(
      (acc, q) => {
        acc[q.grade] = (acc[q.grade] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>
    ),
    totalUsage: questions.reduce((sum, q) => sum + q.usageCount, 0),
  };
}

// Teacher tournament management
export interface TeacherTournament {
  id: string;
  tenantId: string;
  createdBy: string;
  name: string;
  description: string;
  subject: string;
  grade: number;
  type: 'PRACTICE' | 'RANKED' | 'CLASS_ONLY';
  status: 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  startTime: string;
  endTime: string;
  duration: number; // minutes
  questionCount: number;
  maxParticipants: number;
  currentParticipants: number;
  classRestriction?: string[]; // class IDs that can join
  createdAt: string;
  updatedAt: string;
}

export const mockTeacherTournaments: TeacherTournament[] = [
  {
    id: 'tt-001',
    tenantId: 'tenant-school-001',
    createdBy: 'user-teacher-001',
    name: 'Ôn tập Toán chương 3',
    description: 'Đấu trường ôn tập cuối chương cho lớp 6A1',
    subject: 'Toán học',
    grade: 6,
    type: 'CLASS_ONLY',
    status: 'COMPLETED',
    startTime: '2024-01-15T14:00:00Z',
    endTime: '2024-01-15T15:00:00Z',
    duration: 45,
    questionCount: 20,
    maxParticipants: 40,
    currentParticipants: 32,
    classRestriction: ['class-001'],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T15:00:00Z',
  },
  {
    id: 'tt-002',
    tenantId: 'tenant-school-001',
    createdBy: 'user-teacher-001',
    name: 'Đấu trường Toán học tuần 4',
    description: 'Giải đấu hàng tuần dành cho tất cả học sinh',
    subject: 'Toán học',
    grade: 6,
    type: 'RANKED',
    status: 'SCHEDULED',
    startTime: '2024-01-25T14:00:00Z',
    endTime: '2024-01-25T15:30:00Z',
    duration: 60,
    questionCount: 30,
    maxParticipants: 200,
    currentParticipants: 85,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
  {
    id: 'tt-003',
    tenantId: 'tenant-school-001',
    createdBy: 'user-teacher-001',
    name: 'Luyện tập phân số',
    description: 'Bài tập thực hành về phân số',
    subject: 'Toán học',
    grade: 6,
    type: 'PRACTICE',
    status: 'ACTIVE',
    startTime: '2024-01-01T00:00:00Z',
    endTime: '2024-12-31T23:59:59Z',
    duration: 30,
    questionCount: 15,
    maxParticipants: 999,
    currentParticipants: 156,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
  },
];

export function getTournamentsByTeacher(teacherId: string): TeacherTournament[] {
  return mockTeacherTournaments.filter((t) => t.createdBy === teacherId);
}

// Available tournaments for students to join
export interface JoinableTournament {
  id: string;
  name: string;
  description: string;
  subject: string;
  grade: number;
  type: 'PRACTICE' | 'RANKED' | 'CLASS_ONLY';
  status: 'SCHEDULED' | 'ACTIVE';
  startTime: string;
  endTime: string;
  duration: number;
  questionCount: number;
  currentParticipants: number;
  maxParticipants: number;
  isJoined: boolean;
  createdByName: string;
}

export const mockJoinableTournaments: JoinableTournament[] = [
  {
    id: 'jt-001',
    name: 'Đấu trường Toán học tuần 4',
    description: 'Giải đấu hàng tuần dành cho tất cả học sinh',
    subject: 'Toán học',
    grade: 6,
    type: 'RANKED',
    status: 'SCHEDULED',
    startTime: '2024-01-25T14:00:00Z',
    endTime: '2024-01-25T15:30:00Z',
    duration: 60,
    questionCount: 30,
    currentParticipants: 85,
    maxParticipants: 200,
    isJoined: false,
    createdByName: 'Thầy Giáo A',
  },
  {
    id: 'jt-002',
    name: 'Luyện tập phân số',
    description: 'Bài tập thực hành về phân số - không tính điểm',
    subject: 'Toán học',
    grade: 6,
    type: 'PRACTICE',
    status: 'ACTIVE',
    startTime: '2024-01-01T00:00:00Z',
    endTime: '2024-12-31T23:59:59Z',
    duration: 30,
    questionCount: 15,
    currentParticipants: 156,
    maxParticipants: 999,
    isJoined: true,
    createdByName: 'Thầy Giáo A',
  },
  {
    id: 'jt-003',
    name: 'Thử thách Tiếng Việt',
    description: 'Kiểm tra kiến thức ngữ văn',
    subject: 'Ngữ văn',
    grade: 6,
    type: 'RANKED',
    status: 'ACTIVE',
    startTime: '2024-01-20T08:00:00Z',
    endTime: '2024-01-20T20:00:00Z',
    duration: 45,
    questionCount: 25,
    currentParticipants: 42,
    maxParticipants: 100,
    isJoined: false,
    createdByName: 'Cô Giáo C',
  },
];

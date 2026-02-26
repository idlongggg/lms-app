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
  status: "ACTIVE" | "ARCHIVED" | "DRAFT";
  schedule: string; // E.g., "Thứ 2, 4, 6 - 14:00"
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
  status: "ACTIVE" | "DROPPED" | "COMPLETED";
}

export interface ParentChildLink {
  id: string;
  parentId: string;
  childId: string;
  relationship: "FATHER" | "MOTHER" | "GUARDIAN";
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
    type: "lesson" | "quiz" | "tournament";
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

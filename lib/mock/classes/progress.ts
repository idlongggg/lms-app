import {
  ChildProgress,
  ClassProgress,
  StudentProgress,
} from "@/lib/types/classes";

import { getChildrenByParent } from "./data";

// Mock student progress data
export const mockStudentProgress: StudentProgress[] = [
  {
    studentId: "user-student-001",
    studentName: "Nguyễn Văn An",
    avatarUrl: null,
    completedLessons: 24,
    totalLessons: 30,
    averageScore: 85,
    lastActive: "2024-01-20T10:30:00Z",
    streak: 7,
  },
  {
    studentId: "user-student-002",
    studentName: "Trần Thị Bình",
    avatarUrl: null,
    completedLessons: 28,
    totalLessons: 30,
    averageScore: 92,
    lastActive: "2024-01-20T14:00:00Z",
    streak: 12,
  },
  {
    studentId: "user-student-003",
    studentName: "Lê Hoàng Cường",
    avatarUrl: null,
    completedLessons: 15,
    totalLessons: 30,
    averageScore: 68,
    lastActive: "2024-01-18T09:00:00Z",
    streak: 2,
  },
];

// Mock class progress data
export const mockClassProgress: ClassProgress[] = [
  {
    classId: "class-001",
    className: "Toán 6A1",
    averageProgress: 78,
    averageScore: 82,
    activeStudents: 32,
    totalStudents: 35,
    topPerformers: [mockStudentProgress[1], mockStudentProgress[0]],
    needsAttention: [mockStudentProgress[2]],
  },
  {
    classId: "class-002",
    className: "Toán 7B2",
    averageProgress: 72,
    averageScore: 75,
    activeStudents: 30,
    totalStudents: 32,
    topPerformers: [],
    needsAttention: [],
  },
  {
    classId: "class-003",
    className: "Toán 8A1",
    averageProgress: 85,
    averageScore: 88,
    activeStudents: 28,
    totalStudents: 28,
    topPerformers: [],
    needsAttention: [],
  },
];

export const mockChildrenProgress: ChildProgress[] = [
  {
    childId: "user-student-001",
    childName: "Nguyễn Văn An",
    avatarUrl: null,
    grade: 6,
    classes: [
      {
        className: "Toán 6A1",
        subject: "Toán học",
        progress: 80,
        score: 85,
        teacherName: "Thầy Giáo A",
      },
    ],
    overallProgress: 80,
    overallScore: 85,
    streak: 7,
    lastActive: "2024-01-20T10:30:00Z",
    recentActivities: [
      {
        type: "lesson",
        title: "Phép cộng phân số",
        completedAt: "2024-01-20T10:30:00Z",
      },
      {
        type: "quiz",
        title: "Kiểm tra chương 3",
        score: 90,
        completedAt: "2024-01-19T14:00:00Z",
      },
      {
        type: "tournament",
        title: "Đấu trường Toán học",
        score: 850,
        completedAt: "2024-01-18T16:00:00Z",
      },
    ],
    tournaments: [
      {
        name: "Đấu trường Toán học tuần 3",
        rank: 5,
        totalParticipants: 120,
        score: 850,
        date: "2024-01-18T16:00:00Z",
      },
      {
        name: "Đấu trường Toán học tuần 2",
        rank: 12,
        totalParticipants: 115,
        score: 720,
        date: "2024-01-11T16:00:00Z",
      },
    ],
  },
  {
    childId: "user-student-002",
    childName: "Nguyễn Thị Bảo",
    avatarUrl: null,
    grade: 4,
    classes: [
      {
        className: "Toán 4A2",
        subject: "Toán học",
        progress: 92,
        score: 94,
        teacherName: "Cô Giáo B",
      },
    ],
    overallProgress: 92,
    overallScore: 94,
    streak: 14,
    lastActive: "2024-01-20T15:00:00Z",
    recentActivities: [
      {
        type: "lesson",
        title: "Phép nhân hai chữ số",
        completedAt: "2024-01-20T15:00:00Z",
      },
      {
        type: "quiz",
        title: "Ôn tập cuối chương",
        score: 95,
        completedAt: "2024-01-20T11:00:00Z",
      },
    ],
    tournaments: [
      {
        name: "Đấu trường Toán học tuần 3",
        rank: 2,
        totalParticipants: 80,
        score: 920,
        date: "2024-01-18T16:00:00Z",
      },
    ],
  },
];

export function getChildrenProgressByParent(parentId: string): ChildProgress[] {
  const childIds = getChildrenByParent(parentId);
  return mockChildrenProgress.filter((c) => childIds.includes(c.childId));
}

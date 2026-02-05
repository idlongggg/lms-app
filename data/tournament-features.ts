// Teacher tournament management
export interface TeacherTournament {
  id: string;
  tenantId: string;
  createdBy: string;
  name: string;
  description: string;
  subject: string;
  grade: number;
  type: "PRACTICE" | "RANKED" | "CLASS_ONLY";
  status: "DRAFT" | "SCHEDULED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  startTime: string;
  endTime: string;
  duration: number; // Minutes
  questionCount: number;
  maxParticipants: number;
  currentParticipants: number;
  classRestriction?: string[]; // Class IDs that can join
  createdAt: string;
  updatedAt: string;
}

export const mockTeacherTournaments: TeacherTournament[] = [
  {
    id: "tt-001",
    tenantId: "tenant-school-001",
    createdBy: "user-teacher-001",
    name: "Ôn tập Toán chương 3",
    description: "Đấu trường ôn tập cuối chương cho lớp 6A1",
    subject: "Toán học",
    grade: 6,
    type: "CLASS_ONLY",
    status: "COMPLETED",
    startTime: "2024-01-15T14:00:00Z",
    endTime: "2024-01-15T15:00:00Z",
    duration: 45,
    questionCount: 20,
    maxParticipants: 40,
    currentParticipants: 32,
    classRestriction: ["class-001"],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T15:00:00Z",
  },
  {
    id: "tt-002",
    tenantId: "tenant-school-001",
    createdBy: "user-teacher-001",
    name: "Đấu trường Toán học tuần 4",
    description: "Giải đấu hàng tuần dành cho tất cả học sinh",
    subject: "Toán học",
    grade: 6,
    type: "RANKED",
    status: "SCHEDULED",
    startTime: "2024-01-25T14:00:00Z",
    endTime: "2024-01-25T15:30:00Z",
    duration: 60,
    questionCount: 30,
    maxParticipants: 200,
    currentParticipants: 85,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "tt-003",
    tenantId: "tenant-school-001",
    createdBy: "user-teacher-001",
    name: "Luyện tập phân số",
    description: "Bài tập thực hành về phân số",
    subject: "Toán học",
    grade: 6,
    type: "PRACTICE",
    status: "ACTIVE",
    startTime: "2024-01-01T00:00:00Z",
    endTime: "2024-12-31T23:59:59Z",
    duration: 30,
    questionCount: 15,
    maxParticipants: 999,
    currentParticipants: 156,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
];

export function getTournamentsByTeacher(
  teacherId: string,
): TeacherTournament[] {
  return mockTeacherTournaments.filter((t) => t.createdBy === teacherId);
}

// Available tournaments for students to join
export interface JoinableTournament {
  id: string;
  name: string;
  description: string;
  subject: string;
  grade: number;
  type: "PRACTICE" | "RANKED" | "CLASS_ONLY";
  status: "SCHEDULED" | "ACTIVE";
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
    id: "jt-001",
    name: "Đấu trường Toán học tuần 4",
    description: "Giải đấu hàng tuần dành cho tất cả học sinh",
    subject: "Toán học",
    grade: 6,
    type: "RANKED",
    status: "SCHEDULED",
    startTime: "2024-01-25T14:00:00Z",
    endTime: "2024-01-25T15:30:00Z",
    duration: 60,
    questionCount: 30,
    currentParticipants: 85,
    maxParticipants: 200,
    isJoined: false,
    createdByName: "Thầy Giáo A",
  },
  {
    id: "jt-002",
    name: "Luyện tập phân số",
    description: "Bài tập thực hành về phân số - không tính điểm",
    subject: "Toán học",
    grade: 6,
    type: "PRACTICE",
    status: "ACTIVE",
    startTime: "2024-01-01T00:00:00Z",
    endTime: "2024-12-31T23:59:59Z",
    duration: 30,
    questionCount: 15,
    currentParticipants: 156,
    maxParticipants: 999,
    isJoined: true,
    createdByName: "Thầy Giáo A",
  },
  {
    id: "jt-003",
    name: "Thử thách Tiếng Việt",
    description: "Kiểm tra kiến thức ngữ văn",
    subject: "Ngữ văn",
    grade: 6,
    type: "RANKED",
    status: "ACTIVE",
    startTime: "2024-01-20T08:00:00Z",
    endTime: "2024-01-20T20:00:00Z",
    duration: 45,
    questionCount: 25,
    currentParticipants: 42,
    maxParticipants: 100,
    isJoined: false,
    createdByName: "Cô Giáo C",
  },
];

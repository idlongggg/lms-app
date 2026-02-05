export interface Question {
  id: string;
  tenantId: string;
  teacherId: string;
  subject: string;
  grade: number;
  topic: string;
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_BLANK" | "SHORT_ANSWER";
  difficulty: "EASY" | "MEDIUM" | "HARD";
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
    id: "q-001",
    tenantId: "tenant-school-001",
    teacherId: "user-teacher-001",
    subject: "Toán học",
    grade: 6,
    topic: "Phân số",
    type: "MULTIPLE_CHOICE",
    difficulty: "EASY",
    content: "1/2 + 1/4 = ?",
    options: ["1/6", "2/6", "3/4", "1/4"],
    correctAnswer: "3/4",
    explanation: "1/2 = 2/4, nên 2/4 + 1/4 = 3/4",
    usageCount: 45,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "q-002",
    tenantId: "tenant-school-001",
    teacherId: "user-teacher-001",
    subject: "Toán học",
    grade: 6,
    topic: "Phân số",
    type: "MULTIPLE_CHOICE",
    difficulty: "MEDIUM",
    content: "Rút gọn phân số 12/18",
    options: ["2/3", "4/6", "6/9", "3/4"],
    correctAnswer: "2/3",
    explanation: "ƯCLN(12, 18) = 6, nên 12/18 = 2/3",
    usageCount: 32,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z",
  },
  {
    id: "q-003",
    tenantId: "tenant-school-001",
    teacherId: "user-teacher-001",
    subject: "Toán học",
    grade: 7,
    topic: "Số hữu tỉ",
    type: "TRUE_FALSE",
    difficulty: "EASY",
    content: "-2/3 là số hữu tỉ âm",
    correctAnswer: "true",
    explanation: "Số hữu tỉ âm là số hữu tỉ nhỏ hơn 0",
    usageCount: 28,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-17T00:00:00Z",
  },
  {
    id: "q-004",
    tenantId: "tenant-school-001",
    teacherId: "user-teacher-001",
    subject: "Toán học",
    grade: 8,
    topic: "Phương trình bậc nhất",
    type: "FILL_BLANK",
    difficulty: "HARD",
    content: "Giải phương trình 2x + 5 = 11, x = ___",
    correctAnswer: "3",
    explanation: "2x = 11 - 5 = 6, x = 3",
    usageCount: 50,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
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
      easy: questions.filter((q) => q.difficulty === "EASY").length,
      medium: questions.filter((q) => q.difficulty === "MEDIUM").length,
      hard: questions.filter((q) => q.difficulty === "HARD").length,
    },
    byType: {
      multipleChoice: questions.filter((q) => q.type === "MULTIPLE_CHOICE")
        .length,
      trueFalse: questions.filter((q) => q.type === "TRUE_FALSE").length,
      fillBlank: questions.filter((q) => q.type === "FILL_BLANK").length,
      shortAnswer: questions.filter((q) => q.type === "SHORT_ANSWER").length,
    },
    byGrade: questions.reduce(
      (acc, q) => {
        acc[q.grade] = (acc[q.grade] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    ),
    totalUsage: questions.reduce((sum, q) => sum + q.usageCount, 0),
  };
}

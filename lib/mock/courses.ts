/**
 * Mock Courses Data
 * Based on database.md schema: Subject, Semester, Topic, Lesson, Question
 * LessonProgress, ExerciseSession, LearningPath
 */

import { tenants } from './users';

export type LessonStatus = 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED' | 'ARCHIVED';
export type ProgressStatus = 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'REVIEW';
export type QuestionType =
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'TRUE_FALSE'
  | 'FILL_BLANK'
  | 'ESSAY';

export interface Subject {
  id: string;
  tenantId: string;
  name: string;
  iconUrl: string | null;
  grade: number;
  order: number;
  createdAt: string;
}

export interface Semester {
  id: string;
  tenantId: string;
  name: string;
  createdAt: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  order: number;
  createdAt: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  semesterId: string;
  createdBy: string;
  publishedBy: string | null;
  title: string;
  content: string;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  videoDuration: number | null;
  passingScore: number;
  estimatedMinutes: number;
  status: LessonStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  lessonId: string;
  content: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string | string[];
  explanation: string | null;
  order: number;
  createdAt: string;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  status: ProgressStatus;
  bestScore: number | null;
  attempts: number;
  completedAt: string | null;
  updatedAt: string;
}

// Semesters
export const semesters: Semester[] = [
  {
    id: 'semester-1',
    tenantId: tenants.school.id,
    name: 'Học kỳ 1',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'semester-2',
    tenantId: tenants.school.id,
    name: 'Học kỳ 2',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Subjects
export const subjects: Subject[] = [
  {
    id: 'subject-math',
    tenantId: tenants.school.id,
    name: 'Toán học',
    iconUrl: null,
    grade: 6,
    order: 1,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'subject-vietnamese',
    tenantId: tenants.school.id,
    name: 'Tiếng Việt',
    iconUrl: null,
    grade: 6,
    order: 2,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'subject-english',
    tenantId: tenants.school.id,
    name: 'Tiếng Anh',
    iconUrl: null,
    grade: 6,
    order: 3,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'subject-science',
    tenantId: tenants.school.id,
    name: 'Khoa học',
    iconUrl: null,
    grade: 6,
    order: 4,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'subject-history',
    tenantId: tenants.school.id,
    name: 'Lịch sử',
    iconUrl: null,
    grade: 6,
    order: 5,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'subject-geography',
    tenantId: tenants.school.id,
    name: 'Địa lý',
    iconUrl: null,
    grade: 6,
    order: 6,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Topics
export const topics: Topic[] = [
  // Math topics
  {
    id: 'topic-math-1',
    subjectId: 'subject-math',
    name: 'Số học cơ bản',
    order: 1,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'topic-math-2',
    subjectId: 'subject-math',
    name: 'Phân số',
    order: 2,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'topic-math-3',
    subjectId: 'subject-math',
    name: 'Hình học',
    order: 3,
    createdAt: '2024-01-01T00:00:00Z',
  },
  // Vietnamese topics
  {
    id: 'topic-vn-1',
    subjectId: 'subject-vietnamese',
    name: 'Văn bản nghị luận',
    order: 1,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'topic-vn-2',
    subjectId: 'subject-vietnamese',
    name: 'Thơ ca',
    order: 2,
    createdAt: '2024-01-01T00:00:00Z',
  },
  // English topics
  {
    id: 'topic-en-1',
    subjectId: 'subject-english',
    name: 'Grammar Basics',
    order: 1,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'topic-en-2',
    subjectId: 'subject-english',
    name: 'Vocabulary',
    order: 2,
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// Lessons
export const lessons: Lesson[] = [
  // Math lessons
  {
    id: 'lesson-math-1',
    topicId: 'topic-math-1',
    semesterId: 'semester-1',
    createdBy: 'user-teacher',
    publishedBy: 'user-tenant-admin',
    title: 'Số nguyên tố và hợp số',
    content: 'Bài học về số nguyên tố, hợp số và cách phân biệt chúng...',
    thumbnailUrl: 'https://placehold.co/400x300/3498db/white?text=Math+1',
    videoUrl: null,
    videoDuration: null,
    passingScore: 70,
    estimatedMinutes: 30,
    status: 'PUBLISHED',
    publishedAt: '2024-02-01T00:00:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'lesson-math-2',
    topicId: 'topic-math-1',
    semesterId: 'semester-1',
    createdBy: 'user-teacher',
    publishedBy: 'user-tenant-admin',
    title: 'Ước và bội số',
    content: 'Tìm hiểu về ước số, bội số và các phép tính liên quan...',
    thumbnailUrl: 'https://placehold.co/400x300/3498db/white?text=Math+2',
    videoUrl: null,
    videoDuration: null,
    passingScore: 70,
    estimatedMinutes: 25,
    status: 'PUBLISHED',
    publishedAt: '2024-02-05T00:00:00Z',
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z',
  },
  {
    id: 'lesson-math-3',
    topicId: 'topic-math-2',
    semesterId: 'semester-1',
    createdBy: 'user-teacher',
    publishedBy: 'user-tenant-admin',
    title: 'Phân số cơ bản',
    content: 'Giới thiệu về phân số, cách đọc và viết phân số...',
    thumbnailUrl: 'https://placehold.co/400x300/3498db/white?text=Math+3',
    videoUrl: null,
    videoDuration: null,
    passingScore: 70,
    estimatedMinutes: 35,
    status: 'PUBLISHED',
    publishedAt: '2024-02-10T00:00:00Z',
    createdAt: '2024-01-25T00:00:00Z',
    updatedAt: '2024-02-10T00:00:00Z',
  },
  // Vietnamese lessons
  {
    id: 'lesson-vn-1',
    topicId: 'topic-vn-1',
    semesterId: 'semester-1',
    createdBy: 'user-teacher',
    publishedBy: 'user-tenant-admin',
    title: 'Cấu trúc văn bản nghị luận',
    content: 'Học cách viết văn bản nghị luận với cấu trúc rõ ràng...',
    thumbnailUrl: 'https://placehold.co/400x300/e74c3c/white?text=Viet+1',
    videoUrl: null,
    videoDuration: null,
    passingScore: 70,
    estimatedMinutes: 40,
    status: 'PUBLISHED',
    publishedAt: '2024-02-01T00:00:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  // English lessons
  {
    id: 'lesson-en-1',
    topicId: 'topic-en-1',
    semesterId: 'semester-1',
    createdBy: 'user-teacher',
    publishedBy: 'user-tenant-admin',
    title: 'Present Simple Tense',
    content: 'Learn about present simple tense and when to use it...',
    thumbnailUrl: 'https://placehold.co/400x300/2ecc71/white?text=Eng+1',
    videoUrl: null,
    videoDuration: null,
    passingScore: 70,
    estimatedMinutes: 30,
    status: 'PUBLISHED',
    publishedAt: '2024-02-01T00:00:00Z',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'lesson-en-2',
    topicId: 'topic-en-1',
    semesterId: 'semester-1',
    createdBy: 'user-teacher',
    publishedBy: null,
    title: 'Past Simple Tense',
    content: 'Learn about past simple tense...',
    thumbnailUrl: 'https://placehold.co/400x300/2ecc71/white?text=Eng+2',
    videoUrl: null,
    videoDuration: null,
    passingScore: 70,
    estimatedMinutes: 30,
    status: 'DRAFT',
    publishedAt: null,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
  },
];

// Questions for lessons
export const questions: Question[] = [
  // Questions for lesson-math-1
  {
    id: 'question-1',
    lessonId: 'lesson-math-1',
    content: 'Số nào sau đây là số nguyên tố?',
    type: 'SINGLE_CHOICE',
    options: ['4', '6', '7', '9'],
    correctAnswer: '7',
    explanation: '7 chỉ chia hết cho 1 và chính nó nên là số nguyên tố.',
    order: 1,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'question-2',
    lessonId: 'lesson-math-1',
    content: '11 là số nguyên tố.',
    type: 'TRUE_FALSE',
    options: ['Đúng', 'Sai'],
    correctAnswer: 'Đúng',
    explanation: '11 chỉ chia hết cho 1 và 11.',
    order: 2,
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'question-3',
    lessonId: 'lesson-math-1',
    content: 'Trong các số từ 1 đến 10, có bao nhiêu số nguyên tố?',
    type: 'SINGLE_CHOICE',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4',
    explanation: 'Các số nguyên tố từ 1-10: 2, 3, 5, 7 = 4 số.',
    order: 3,
    createdAt: '2024-01-15T00:00:00Z',
  },
];

// Student lesson progress (for user-student)
export const lessonProgress: LessonProgress[] = [
  {
    id: 'progress-1',
    userId: 'user-student',
    lessonId: 'lesson-math-1',
    status: 'COMPLETED',
    bestScore: 90,
    attempts: 2,
    completedAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
  },
  {
    id: 'progress-2',
    userId: 'user-student',
    lessonId: 'lesson-math-2',
    status: 'IN_PROGRESS',
    bestScore: 60,
    attempts: 1,
    completedAt: null,
    updatedAt: '2024-02-20T00:00:00Z',
  },
  {
    id: 'progress-3',
    userId: 'user-student',
    lessonId: 'lesson-math-3',
    status: 'AVAILABLE',
    bestScore: null,
    attempts: 0,
    completedAt: null,
    updatedAt: '2024-02-20T00:00:00Z',
  },
  {
    id: 'progress-4',
    userId: 'user-student',
    lessonId: 'lesson-vn-1',
    status: 'COMPLETED',
    bestScore: 85,
    attempts: 1,
    completedAt: '2024-02-18T00:00:00Z',
    updatedAt: '2024-02-18T00:00:00Z',
  },
  {
    id: 'progress-5',
    userId: 'user-student',
    lessonId: 'lesson-en-1',
    status: 'IN_PROGRESS',
    bestScore: 70,
    attempts: 1,
    completedAt: null,
    updatedAt: '2024-02-22T00:00:00Z',
  },
];

// Subject with progress info for display
export interface SubjectWithProgress extends Subject {
  totalLessons: number;
  completedLessons: number;
  progress: number;
  lastActivity: string | null;
}

// Helper functions
export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function getTopicsBySubject(subjectId: string): Topic[] {
  return topics.filter((t) => t.subjectId === subjectId).sort((a, b) => a.order - b.order);
}

export function getLessonsByTopic(topicId: string): Lesson[] {
  return lessons.filter((l) => l.topicId === topicId && l.status === 'PUBLISHED');
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getQuestionsForLesson(lessonId: string): Question[] {
  return questions.filter((q) => q.lessonId === lessonId).sort((a, b) => a.order - b.order);
}

export function getUserLessonProgress(
  userId: string,
  lessonId: string,
): LessonProgress | undefined {
  return lessonProgress.find((p) => p.userId === userId && p.lessonId === lessonId);
}

export function getUserProgressBySubject(userId: string, subjectId: string): LessonProgress[] {
  const topicIds = topics.filter((t) => t.subjectId === subjectId).map((t) => t.id);
  const lessonIds = lessons.filter((l) => topicIds.includes(l.topicId)).map((l) => l.id);
  return lessonProgress.filter((p) => p.userId === userId && lessonIds.includes(p.lessonId));
}

export function getSubjectsWithProgress(userId: string): SubjectWithProgress[] {
  return subjects.map((subject) => {
    const topicIds = topics.filter((t) => t.subjectId === subject.id).map((t) => t.id);
    const subjectLessons = lessons.filter(
      (l) => topicIds.includes(l.topicId) && l.status === 'PUBLISHED',
    );
    const userProgress = lessonProgress.filter(
      (p) => p.userId === userId && subjectLessons.some((l) => l.id === p.lessonId),
    );
    const completedLessons = userProgress.filter((p) => p.status === 'COMPLETED').length;
    const totalLessons = subjectLessons.length;

    // Find last activity
    const lastActivityProgress = userProgress
      .filter((p) => p.updatedAt)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];

    return {
      ...subject,
      totalLessons,
      completedLessons,
      progress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      lastActivity: lastActivityProgress?.updatedAt || null,
    };
  });
}

export function getInProgressCourses(userId: string): SubjectWithProgress[] {
  return getSubjectsWithProgress(userId).filter((s) => s.progress > 0 && s.progress < 100);
}

export function getCompletedCourses(userId: string): SubjectWithProgress[] {
  return getSubjectsWithProgress(userId).filter((s) => s.progress === 100);
}

export function getRecommendedCourses(userId: string): SubjectWithProgress[] {
  return getSubjectsWithProgress(userId).filter((s) => s.progress === 0);
}

// Content stats for admin
export function getContentStats() {
  return {
    totalSubjects: subjects.length,
    totalTopics: topics.length,
    totalLessons: lessons.length,
    publishedLessons: lessons.filter((l) => l.status === 'PUBLISHED').length,
    draftLessons: lessons.filter((l) => l.status === 'DRAFT').length,
    totalQuestions: questions.length,
  };
}

// Format for display cards
export interface CourseCard {
  id: string;
  title: string;
  subject: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
  lastActivity: string | null;
  status: 'not-started' | 'in-progress' | 'completed';
}

export function getCourseCards(userId: string): CourseCard[] {
  return getSubjectsWithProgress(userId).map((s) => ({
    id: s.id,
    title: s.name,
    subject: s.name,
    thumbnail: `https://placehold.co/400x300/3498db/white?text=${encodeURIComponent(s.name)}`,
    progress: s.progress,
    totalLessons: s.totalLessons,
    completedLessons: s.completedLessons,
    estimatedTime: `${s.totalLessons * 30} phút`,
    lastActivity: s.lastActivity,
    status: s.progress === 0 ? 'not-started' : s.progress === 100 ? 'completed' : 'in-progress',
  }));
}

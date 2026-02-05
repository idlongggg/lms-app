import { Class, ClassEnrollment, ParentChildLink } from "@/types/classes";

// Mock Classes
export const mockClasses: Class[] = [
  {
    id: "class-001",
    tenantId: "tenant-school-001",
    name: "Toán 6A1",
    code: "TOAN-6A1-2024",
    grade: 6,
    subject: "Toán học",
    teacherId: "user-teacher-001",
    academicYear: "2024-2025",
    semester: 1,
    studentCount: 35,
    maxStudents: 40,
    status: "ACTIVE",
    schedule: "Thứ 2, 4, 6 - 08:00",
    room: "Phòng 201",
    description: "Lớp Toán nâng cao khối 6",
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-15T00:00:00Z",
  },
  {
    id: "class-002",
    tenantId: "tenant-school-001",
    name: "Toán 7B2",
    code: "TOAN-7B2-2024",
    grade: 7,
    subject: "Toán học",
    teacherId: "user-teacher-001",
    academicYear: "2024-2025",
    semester: 1,
    studentCount: 32,
    maxStudents: 40,
    status: "ACTIVE",
    schedule: "Thứ 3, 5 - 10:00",
    room: "Phòng 305",
    description: "Lớp Toán cơ bản khối 7",
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-15T00:00:00Z",
  },
  {
    id: "class-003",
    tenantId: "tenant-school-001",
    name: "Toán 8A1",
    code: "TOAN-8A1-2024",
    grade: 8,
    subject: "Toán học",
    teacherId: "user-teacher-001",
    academicYear: "2024-2025",
    semester: 1,
    studentCount: 28,
    maxStudents: 35,
    status: "ACTIVE",
    schedule: "Thứ 2, 4 - 14:00",
    room: "Phòng 102",
    description: null,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-15T00:00:00Z",
  },
];

// Mock Class Enrollments
export const mockEnrollments: ClassEnrollment[] = [
  // Student 001 enrolled in class-001
  {
    id: "enroll-001",
    classId: "class-001",
    studentId: "user-student-001",
    enrolledAt: "2024-08-01T00:00:00Z",
    status: "ACTIVE",
  },
  // More students in class-001
  {
    id: "enroll-002",
    classId: "class-001",
    studentId: "user-student-002",
    enrolledAt: "2024-08-01T00:00:00Z",
    status: "ACTIVE",
  },
  {
    id: "enroll-003",
    classId: "class-001",
    studentId: "user-student-003",
    enrolledAt: "2024-08-01T00:00:00Z",
    status: "ACTIVE",
  },
];

// Mock Parent-Child Links
export const mockParentChildLinks: ParentChildLink[] = [
  {
    id: "link-001",
    parentId: "user-parent-001",
    childId: "user-student-001",
    relationship: "FATHER",
    isPrimary: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "link-002",
    parentId: "user-parent-001",
    childId: "user-student-002",
    relationship: "FATHER",
    isPrimary: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

// Helper functions
export function getClassesByTeacher(teacherId: string): Class[] {
  return mockClasses.filter((c) => c.teacherId === teacherId);
}

export function getStudentsByClass(classId: string): string[] {
  return mockEnrollments
    .filter((e) => e.classId === classId && e.status === "ACTIVE")
    .map((e) => e.studentId);
}

export function getChildrenByParent(parentId: string): string[] {
  return mockParentChildLinks
    .filter((l) => l.parentId === parentId)
    .map((l) => l.childId);
}

export function getClassesByStudent(studentId: string): Class[] {
  const classIds = mockEnrollments
    .filter((e) => e.studentId === studentId && e.status === "ACTIVE")
    .map((e) => e.classId);
  return mockClasses.filter((c) => classIds.includes(c.id));
}

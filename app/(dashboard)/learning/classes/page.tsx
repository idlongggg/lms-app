'use client';

import { Users, BookOpen, BarChart3, TrendingUp, Clock, Star, AlertCircle, Eye } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { mockClasses, mockClassProgress, mockStudentProgress } from "@/lib/mock/classes";
import Link from "next/link";

export default function TeacherLearningClassesPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'teacher') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  const classes = mockClasses;
  const classProgress = mockClassProgress;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-bold text-3xl">Quản lý lớp học</h1>
        <p className="text-muted-foreground">
          Theo dõi tiến độ và quản lý nội dung học tập theo lớp
        </p>
      </div>

      {/* Class Cards with Detailed Progress */}
      <div className="space-y-6">
        {classes.map((cls) => {
          const progress = classProgress.find(p => p.classId === cls.id);
          
          return (
            <div key={cls.id} className="border-2 border-border bg-card shadow-sm">
              {/* Class Header */}
              <div className="border-b-2 border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center border-2 border-border bg-primary text-xl font-bold">
                      {cls.grade}
                    </div>
                    <div>
                      <h2 className="font-bold text-xl">{cls.name}</h2>
                      <p className="text-muted-foreground">{cls.subject} • {cls.schedule}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`border border-border px-3 py-1 text-sm font-medium ${
                      cls.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {cls.status === 'ACTIVE' ? 'Đang hoạt động' : 'Lưu trữ'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 border-b-2 border-border">
                <div className="border-r-2 border-border p-4 text-center">
                  <p className="text-2xl font-bold">{cls.studentCount}</p>
                  <p className="text-xs text-muted-foreground">Học sinh</p>
                </div>
                <div className="border-r-2 border-border p-4 text-center">
                  <p className="text-2xl font-bold text-green-500">{progress?.averageProgress || 0}%</p>
                  <p className="text-xs text-muted-foreground">Tiến độ TB</p>
                </div>
                <div className="border-r-2 border-border p-4 text-center">
                  <p className="text-2xl font-bold text-blue-500">{progress?.averageScore || 0}</p>
                  <p className="text-xs text-muted-foreground">Điểm TB</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-orange-500">{progress?.activeStudents || 0}</p>
                  <p className="text-xs text-muted-foreground">Đang hoạt động</p>
                </div>
              </div>

              {/* Content */}
              <div className="grid gap-4 p-4 lg:grid-cols-2">
                {/* Top Performers */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-bold">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Học sinh xuất sắc
                  </h3>
                  {progress?.topPerformers && progress.topPerformers.length > 0 ? (
                    <div className="space-y-2">
                      {progress.topPerformers.slice(0, 3).map((student, index) => (
                        <div key={student.studentId} className="flex items-center gap-3 rounded bg-green-50 p-2 dark:bg-green-950">
                          <div className="flex h-8 w-8 items-center justify-center border-2 border-green-500 bg-green-100 text-sm font-bold text-green-700">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{student.studentName}</p>
                            <p className="text-xs text-muted-foreground">
                              Hoàn thành: {student.completedLessons}/{student.totalLessons} • Điểm: {student.averageScore}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-orange-500">
                            🔥 {student.streak}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Chưa có dữ liệu</p>
                  )}
                </div>

                {/* Needs Attention */}
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-bold">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    Cần hỗ trợ
                  </h3>
                  {progress?.needsAttention && progress.needsAttention.length > 0 ? (
                    <div className="space-y-2">
                      {progress.needsAttention.slice(0, 3).map((student) => (
                        <div key={student.studentId} className="flex items-center gap-3 rounded bg-red-50 p-2 dark:bg-red-950">
                          <div className="flex h-8 w-8 items-center justify-center border-2 border-red-500 bg-red-100">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{student.studentName}</p>
                            <p className="text-xs text-muted-foreground">
                              Hoàn thành: {student.completedLessons}/{student.totalLessons} • Điểm: {student.averageScore}
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round((new Date().getTime() - new Date(student.lastActive).getTime()) / (1000 * 60 * 60 * 24))} ngày trước
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded bg-green-50 p-4 text-center dark:bg-green-950">
                      <p className="text-sm text-green-600">✓ Tất cả học sinh đang tiến bộ tốt!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 border-t-2 border-border p-4">
                <Link
                  href={`/learning/class-progress?classId=${cls.id}`}
                  className="flex-1 border-2 border-border bg-primary px-4 py-2 text-center font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Eye className="mr-2 inline h-4 w-4" />
                  Xem chi tiết tiến độ
                </Link>
                <button className="border-2 border-border bg-muted px-4 py-2 font-medium transition-all hover:bg-muted/80">
                  <BarChart3 className="mr-2 inline h-4 w-4" />
                  Báo cáo
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { Users, BookOpen, BarChart3, Clock, Plus, Eye, Settings, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { mockClasses, mockClassProgress } from "@/lib/mock/classes";
import Link from "next/link";

export default function TeacherClassesPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'teacher') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  // Get classes for this teacher (using mock data)
  const classes = mockClasses;
  const classProgress = mockClassProgress;

  const totalStudents = classes.reduce((sum, c) => sum + c.studentCount, 0);
  const activeClasses = classes.filter(c => c.status === 'ACTIVE').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl">Lớp học của tôi</h1>
          <p className="text-muted-foreground">
            Quản lý các lớp học và theo dõi tiến độ học sinh
          </p>
        </div>
        <button className="inline-flex items-center gap-2 border-2 border-border bg-primary px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
          <Plus className="h-4 w-4" />
          Tạo lớp mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng lớp học</p>
              <p className="font-bold text-2xl">{classes.length}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-purple-500">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Đang hoạt động</p>
              <p className="font-bold text-2xl">{activeClasses}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-green-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tổng học sinh</p>
              <p className="font-bold text-2xl">{totalStudents}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-blue-500">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tiến độ TB</p>
              <p className="font-bold text-2xl">
                {Math.round(classProgress.reduce((sum, c) => sum + c.averageProgress, 0) / classProgress.length)}%
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-orange-500">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => {
          const progress = classProgress.find(p => p.classId === cls.id);
          
          return (
            <div key={cls.id} className="border-2 border-border bg-card shadow-sm">
              <div className="border-b-2 border-border p-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border-2 border-border bg-primary text-lg font-bold">
                    {cls.grade}
                  </div>
                  <span className={`border border-border px-2 py-0.5 text-xs font-medium ${
                    cls.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                    cls.status === 'DRAFT' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {cls.status === 'ACTIVE' ? 'Đang hoạt động' :
                     cls.status === 'DRAFT' ? 'Nháp' : 'Lưu trữ'}
                  </span>
                </div>
                <h3 className="mt-3 font-bold text-lg">{cls.name}</h3>
                <p className="text-sm text-muted-foreground">{cls.subject}</p>
              </div>

              <div className="p-4">
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Học sinh
                    </span>
                    <span className="font-medium">{cls.studentCount}/{cls.maxStudents}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Lịch học
                    </span>
                    <span className="font-medium text-xs">{cls.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      Phòng
                    </span>
                    <span className="font-medium">{cls.room}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {progress && (
                  <div className="mb-4">
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tiến độ lớp</span>
                      <span className="font-medium">{progress.averageProgress}%</span>
                    </div>
                    <div className="h-2 bg-muted border border-border">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${progress.averageProgress}%` }}
                      />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Điểm TB: {progress.averageScore}</span>
                      <span>{progress.activeStudents}/{progress.totalStudents} hoạt động</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link
                    href={`/learning/class-progress?classId=${cls.id}`}
                    className="flex-1 border-2 border-border bg-muted px-3 py-1.5 text-center text-sm font-medium transition-all hover:bg-muted/80"
                  >
                    <Eye className="mr-1 inline h-4 w-4" />
                    Xem chi tiết
                  </Link>
                  <button className="border-2 border-border p-1.5 transition-all hover:bg-muted">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

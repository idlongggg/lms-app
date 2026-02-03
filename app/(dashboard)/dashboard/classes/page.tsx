'use client';

import { BarChart3, BookOpen, Clock, Eye, Plus, Settings, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/lib/auth';
import { mockClasses, mockClassProgress } from '@/lib/mock/classes';

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
  const activeClasses = classes.filter((c) => c.status === 'ACTIVE').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lớp học của tôi</h1>
          <p className="text-muted-foreground">Quản lý các lớp học và theo dõi tiến độ học sinh</p>
        </div>
        <button className="border-border bg-primary inline-flex items-center gap-2 border-2 px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
          <Plus className="h-4 w-4" />
          Tạo lớp mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Tổng lớp học</p>
              <p className="text-2xl font-bold">{classes.length}</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-purple-500">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Đang hoạt động</p>
              <p className="text-2xl font-bold">{activeClasses}</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Tổng học sinh</p>
              <p className="text-2xl font-bold">{totalStudents}</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Tiến độ TB</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  classProgress.reduce((sum, c) => sum + c.averageProgress, 0) /
                    classProgress.length,
                )}
                %
              </p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-500">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => {
          const progress = classProgress.find((p) => p.classId === cls.id);

          return (
            <div key={cls.id} className="border-border bg-card border-2 shadow-sm">
              <div className="border-border border-b-2 p-4">
                <div className="flex items-start justify-between">
                  <div className="border-border bg-primary flex h-12 w-12 items-center justify-center border-2 text-lg font-bold">
                    {cls.grade}
                  </div>
                  <span
                    className={`border-border border px-2 py-0.5 text-xs font-medium ${
                      cls.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-700'
                        : cls.status === 'DRAFT'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {cls.status === 'ACTIVE'
                      ? 'Đang hoạt động'
                      : cls.status === 'DRAFT'
                        ? 'Nháp'
                        : 'Lưu trữ'}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold">{cls.name}</h3>
                <p className="text-muted-foreground text-sm">{cls.subject}</p>
              </div>

              <div className="p-4">
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Học sinh
                    </span>
                    <span className="font-medium">
                      {cls.studentCount}/{cls.maxStudents}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Lịch học
                    </span>
                    <span className="text-xs font-medium">{cls.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-2">
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
                    <div className="bg-muted border-border h-2 border">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${progress.averageProgress}%` }}
                      />
                    </div>
                    <div className="text-muted-foreground mt-1 flex items-center justify-between text-xs">
                      <span>Điểm TB: {progress.averageScore}</span>
                      <span>
                        {progress.activeStudents}/{progress.totalStudents} hoạt động
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link
                    href={`/learning/class-progress?classId=${cls.id}`}
                    className="border-border bg-muted hover:bg-muted/80 flex-1 border-2 px-3 py-1.5 text-center text-sm font-medium transition-all"
                  >
                    <Eye className="mr-1 inline h-4 w-4" />
                    Xem chi tiết
                  </Link>
                  <button className="border-border hover:bg-muted border-2 p-1.5 transition-all">
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

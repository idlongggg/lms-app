'use client';

import { BookOpen, CheckCircle, Clock, Play, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useAuth } from '@/lib/auth';
import { getSubjectsWithProgress } from '@/lib/mock/courses';

type FilterType = 'all' | 'in-progress' | 'completed' | 'not-started';

export default function MyLearningPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterType>('all');

  if (!user) return null;

  const subjectsWithProgress = getSubjectsWithProgress(user.id);

  const filteredSubjects = subjectsWithProgress.filter((subject) => {
    const progress = subject.completedLessons / subject.totalLessons;
    switch (filter) {
      case 'in-progress':
        return progress > 0 && progress < 1;
      case 'completed':
        return progress === 1;
      case 'not-started':
        return progress === 0;
      default:
        return true;
    }
  });

  const filters: { label: string; value: FilterType }[] = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Đang học', value: 'in-progress' },
    { label: 'Hoàn thành', value: 'completed' },
    { label: 'Chưa bắt đầu', value: 'not-started' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Bài học của tôi</h1>
        <p className="text-muted-foreground">Tiếp tục hành trình học tập của bạn</p>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="border-border bg-card border-2 p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary h-5 w-5" />
            <span className="text-muted-foreground text-sm">Tổng môn học</span>
          </div>
          <p className="mt-1 text-2xl font-bold">{subjectsWithProgress.length}</p>
        </div>
        <div className="border-border bg-card border-2 p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            <span className="text-muted-foreground text-sm">Đang học</span>
          </div>
          <p className="mt-1 text-2xl font-bold">
            {
              subjectsWithProgress.filter(
                (s) => s.completedLessons > 0 && s.completedLessons < s.totalLessons,
              ).length
            }
          </p>
        </div>
        <div className="border-border bg-card border-2 p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-muted-foreground text-sm">Hoàn thành</span>
          </div>
          <p className="mt-1 text-2xl font-bold">
            {subjectsWithProgress.filter((s) => s.completedLessons === s.totalLessons).length}
          </p>
        </div>
        <div className="border-border bg-card border-2 p-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-muted-foreground text-sm">Tổng bài học</span>
          </div>
          <p className="mt-1 text-2xl font-bold">
            {subjectsWithProgress.reduce((sum, s) => sum + s.completedLessons, 0)}/
            {subjectsWithProgress.reduce((sum, s) => sum + s.totalLessons, 0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`border-border border-2 px-4 py-2 text-sm font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm ${
              filter === f.value ? 'bg-primary' : 'bg-background'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Subject List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSubjects.map((subject) => {
          const progress = Math.round((subject.completedLessons / subject.totalLessons) * 100);
          const isCompleted = progress === 100;
          const isNotStarted = progress === 0;

          return (
            <div
              key={subject.id}
              className="border-border bg-card border-2 shadow-sm transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`border-border border-b-2 p-4 ${
                  isCompleted ? 'bg-green-500' : isNotStarted ? 'bg-muted' : 'bg-primary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{subject.name}</h3>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <BookOpen className="h-5 w-5" />
                  )}
                </div>
                <p className="mt-1 text-sm opacity-80">Lớp {subject.grade}</p>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground text-sm">
                  {subject.completedLessons}/{subject.totalLessons} bài học ({progress}%)
                </p>
                <div className="border-border bg-muted mt-2 h-3 border-2">
                  <div
                    className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/learning/courses/${subject.id}`}
                    className="border-border bg-secondary text-secondary-foreground flex flex-1 items-center justify-center gap-2 border-2 px-3 py-2 text-sm font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <Play className="h-4 w-4" />
                    {isNotStarted ? 'Bắt đầu' : isCompleted ? 'Ôn tập' : 'Tiếp tục'}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="border-border text-muted-foreground border-2 border-dashed p-8 text-center">
          <BookOpen className="mx-auto mb-4 h-12 w-12 opacity-50" />
          <p>Không có môn học nào trong danh mục này</p>
        </div>
      )}
    </div>
  );
}

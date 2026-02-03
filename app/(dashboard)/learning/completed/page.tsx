import { CheckCircle, Star, Clock, Award, RotateCcw } from 'lucide-react';

const completedCourses = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    completedDate: '2026-01-15',
    totalLessons: 32,
    timeSpent: '18h 30m',
    score: 95,
    certificate: true,
    thumbnail: '📒',
  },
  {
    id: 2,
    title: 'HTML & CSS cơ bản',
    completedDate: '2025-12-20',
    totalLessons: 20,
    timeSpent: '10h 15m',
    score: 88,
    certificate: true,
    thumbnail: '🌐',
  },
  {
    id: 3,
    title: 'Git & GitHub',
    completedDate: '2025-11-10',
    totalLessons: 15,
    timeSpent: '6h 45m',
    score: 92,
    certificate: true,
    thumbnail: '🔀',
  },
  {
    id: 4,
    title: 'Thuật toán cơ bản',
    completedDate: '2025-10-05',
    totalLessons: 25,
    timeSpent: '15h 20m',
    score: 78,
    certificate: false,
    thumbnail: '🧮',
  },
];

export default function CompletedPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Đã hoàn thành</h1>
          <p className="text-muted-foreground">Các khóa học bạn đã hoàn thành</p>
        </div>
        <div className="border-border bg-primary flex items-center gap-2 border-2 px-4 py-2 shadow-sm">
          <Award className="h-5 w-5" />
          <span className="font-bold">{completedCourses.length} khóa học</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border-border bg-background border-2 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Tổng bài học</p>
              <p className="text-xl font-bold">
                {completedCourses.reduce((acc, c) => acc + c.totalLessons, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="border-border bg-background border-2 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-100">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Tổng thời gian</p>
              <p className="text-xl font-bold">50h 50m</p>
            </div>
          </div>
        </div>
        <div className="border-border bg-background border-2 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-yellow-100">
              <Star className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Điểm trung bình</p>
              <p className="text-xl font-bold">88%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {completedCourses.map((course) => (
          <div
            key={course.id}
            className="border-border bg-background border-2 p-4 shadow-sm sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Thumbnail */}
              <div className="border-border bg-muted flex h-16 w-16 shrink-0 items-center justify-center border-2 text-3xl sm:h-20 sm:w-20">
                {course.thumbnail}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  {course.certificate && (
                    <span className="border-border border bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Có chứng chỉ
                    </span>
                  )}
                </div>

                <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {course.totalLessons} bài học
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.timeSpent}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    Điểm: {course.score}%
                  </span>
                </div>

                <p className="text-muted-foreground mt-2 text-sm">
                  Hoàn thành: {new Date(course.completedDate).toLocaleDateString('vi-VN')}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="border-border bg-background flex items-center gap-2 border-2 px-4 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                  <RotateCcw className="h-4 w-4" />
                  Học lại
                </button>
                {course.certificate && (
                  <button className="border-border bg-primary flex items-center gap-2 border-2 px-4 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                    <Award className="h-4 w-4" />
                    Chứng chỉ
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Clock, BookOpen, PlayCircle } from 'lucide-react';

const inProgressCourses = [
  {
    id: 1,
    title: 'React Hooks nâng cao',
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    lastAccessed: '2 giờ trước',
    thumbnail: '⚛️',
    nextLesson: 'useReducer và Context API',
  },
  {
    id: 2,
    title: 'TypeScript cho Developer',
    progress: 40,
    totalLessons: 30,
    completedLessons: 12,
    lastAccessed: '1 ngày trước',
    thumbnail: '📘',
    nextLesson: 'Generics cơ bản',
  },
  {
    id: 3,
    title: 'Node.js Backend',
    progress: 25,
    totalLessons: 28,
    completedLessons: 7,
    lastAccessed: '3 ngày trước',
    thumbnail: '🟢',
    nextLesson: 'Express Middleware',
  },
  {
    id: 4,
    title: 'CSS Grid & Flexbox',
    progress: 80,
    totalLessons: 15,
    completedLessons: 12,
    lastAccessed: '5 ngày trước',
    thumbnail: '🎨',
    nextLesson: 'Grid Areas nâng cao',
  },
];

export default function InProgressPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Đang học</h1>
          <p className="text-muted-foreground">Tiếp tục các khóa học của bạn</p>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4" />
          <span>{inProgressCourses.length} khóa học đang học</span>
        </div>
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        {inProgressCourses.map((course) => (
          <div
            key={course.id}
            className="border-border bg-background border-2 p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Thumbnail */}
              <div className="border-border bg-muted flex h-16 w-16 shrink-0 items-center justify-center border-2 text-3xl sm:h-20 sm:w-20">
                {course.thumbnail}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    Bài tiếp theo: {course.nextLesson}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {course.completedLessons}/{course.totalLessons} bài học
                    </span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="border-border bg-muted h-3 w-full border-2">
                    <div
                      className="bg-primary h-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.lastAccessed}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.totalLessons} bài học
                  </span>
                </div>
              </div>

              {/* Action */}
              <button className="border-border bg-primary flex items-center gap-2 border-2 px-6 py-3 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                <PlayCircle className="h-5 w-5" />
                Tiếp tục
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state hint */}
      {inProgressCourses.length === 0 && (
        <div className="border-border bg-muted/50 border-2 border-dashed p-12 text-center">
          <BookOpen className="text-muted-foreground mx-auto h-12 w-12" />
          <h3 className="mt-4 font-bold">Chưa có khóa học nào</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Khám phá các khóa học và bắt đầu hành trình học tập của bạn
          </p>
          <button className="border-border bg-primary mt-4 border-2 px-6 py-2 font-medium shadow-xs">
            Khám phá khóa học
          </button>
        </div>
      )}
    </div>
  );
}

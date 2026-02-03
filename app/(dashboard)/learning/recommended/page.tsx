import { Sparkles, Clock, Users, Star, TrendingUp } from 'lucide-react';

const recommendedCourses = [
  {
    id: 1,
    title: 'TypeScript Design Patterns',
    description: 'Học các design patterns phổ biến trong TypeScript',
    thumbnail: '📘',
    lessons: 28,
    duration: '14h',
    students: 420,
    rating: 4.9,
    matchScore: 95,
    reason: 'Dựa trên khóa học JavaScript bạn đã hoàn thành',
  },
  {
    id: 2,
    title: 'React Testing với Jest & RTL',
    description: 'Viết unit test và integration test cho React apps',
    thumbnail: '🧪',
    lessons: 22,
    duration: '10h',
    students: 310,
    rating: 4.7,
    matchScore: 90,
    reason: 'Bạn đang học React Hooks nâng cao',
  },
  {
    id: 3,
    title: 'Next.js API Routes & Server Actions',
    description: 'Xây dựng backend trong Next.js với App Router',
    thumbnail: '▲',
    lessons: 18,
    duration: '8h',
    students: 280,
    rating: 4.8,
    matchScore: 85,
    reason: 'Phù hợp với stack bạn đang học',
  },
  {
    id: 4,
    title: 'PostgreSQL cho Developer',
    description: 'Làm chủ PostgreSQL từ cơ bản đến nâng cao',
    thumbnail: '🐘',
    lessons: 30,
    duration: '16h',
    students: 450,
    rating: 4.6,
    matchScore: 80,
    reason: 'Kỹ năng cần thiết cho backend development',
  },
];

export default function RecommendedPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="border-border bg-accent flex h-12 w-12 items-center justify-center border-2">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Đề xuất cho bạn</h1>
          <p className="text-muted-foreground">
            Các khóa học được gợi ý dựa trên tiến trình học tập của bạn
          </p>
        </div>
      </div>

      {/* AI Insight Box */}
      <div className="border-border from-primary/20 to-secondary/20 border-2 bg-gradient-to-r p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="border-border bg-background flex h-10 w-10 shrink-0 items-center justify-center border-2">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold">Phân tích tiến trình của bạn</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Bạn đang tiến bộ tốt trong lĩnh vực Frontend Development. Để hoàn thiện kỹ năng
              full-stack, chúng tôi đề xuất bạn học thêm về TypeScript, Testing, và Backend APIs.
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="space-y-4">
        {recommendedCourses.map((course, index) => (
          <div
            key={course.id}
            className="border-border bg-background border-2 p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Rank */}
              <div className="border-border bg-primary flex h-12 w-12 shrink-0 items-center justify-center border-2 text-xl font-bold">
                #{index + 1}
              </div>

              {/* Thumbnail */}
              <div className="border-border bg-muted flex h-16 w-16 shrink-0 items-center justify-center border-2 text-3xl sm:h-20 sm:w-20">
                {course.thumbnail}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p className="text-muted-foreground text-sm">{course.description}</p>
                  </div>
                  <div className="border-border shrink-0 border-2 bg-green-100 px-3 py-1 text-sm font-bold text-green-700">
                    {course.matchScore}% phù hợp
                  </div>
                </div>

                {/* Reason */}
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Sparkles className="text-accent h-4 w-4" />
                  <span className="text-muted-foreground">{course.reason}</span>
                </div>

                {/* Meta */}
                <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students} học viên
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </span>
                </div>
              </div>

              {/* Action */}
              <button className="border-border bg-primary self-center border-2 px-6 py-3 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                Bắt đầu học
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* More suggestions */}
      <div className="border-border bg-muted/50 border-2 border-dashed p-8 text-center">
        <p className="text-muted-foreground">
          Hoàn thành thêm các khóa học để nhận được gợi ý chính xác hơn
        </p>
        <button className="border-border bg-background mt-4 border-2 px-6 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
          Xem tất cả khóa học
        </button>
      </div>
    </div>
  );
}

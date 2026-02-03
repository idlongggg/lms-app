import { BookOpen, Play, CheckCircle } from "lucide-react";

export default function MyLearningPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-bold text-3xl font-bold">Bài học của tôi</h1>
        <p className="text-muted-foreground">
          Tiếp tục hành trình học tập của bạn
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["Tất cả", "Đang học", "Hoàn thành", "Chưa bắt đầu"].map((filter) => (
          <button
            key={filter}
            className="border-2 border-border bg-background px-4 py-2 text-sm font-medium shadow-xs transition-all first:bg-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Subject List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="border-2 border-border bg-card shadow-sm transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="border-b-2 border-border bg-primary p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg font-bold">{subject.name}</h3>
                <BookOpen className="h-5 w-5" />
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">
                {subject.completedLessons}/{subject.totalLessons} bài học
              </p>
              <div className="mt-2 h-3 border-2 border-border bg-muted">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(subject.completedLessons / subject.totalLessons) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-2 border-2 border-border bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                  <Play className="h-4 w-4" />
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const subjects = [
  { name: "Toán học", completedLessons: 12, totalLessons: 20 },
  { name: "Tiếng Anh", completedLessons: 8, totalLessons: 15 },
  { name: "Vật lý", completedLessons: 5, totalLessons: 18 },
  { name: "Hóa học", completedLessons: 3, totalLessons: 16 },
  { name: "Lịch sử", completedLessons: 10, totalLessons: 12 },
  { name: "Địa lý", completedLessons: 0, totalLessons: 10 },
];

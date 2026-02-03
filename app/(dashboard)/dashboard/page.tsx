import { BookOpen, Flame, Trophy, Target } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-bold text-3xl font-bold">Xin chào, User! 👋</h1>
        <p className="text-muted-foreground">
          Chào mừng trở lại! Hôm nay bạn muốn học gì?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border-2 border-border bg-card p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="font-bold text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Continue Learning */}
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="border-b-2 border-border p-4">
            <h2 className="font-bold text-xl font-bold">Tiếp tục học</h2>
          </div>
          <div className="divide-y-2 divide-border">
            {recentLessons.map((lesson, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-accent">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {lesson.subject}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{lesson.progress}%</p>
                  <div className="mt-1 h-2 w-20 border border-border bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tournaments */}
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="border-b-2 border-border p-4">
            <h2 className="font-bold text-xl font-bold">Giải đấu sắp tới</h2>
          </div>
          <div className="divide-y-2 divide-border">
            {upcomingTournaments.map((tournament, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{tournament.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {tournament.participants} người tham gia
                    </p>
                  </div>
                </div>
                <div className="border-2 border-border bg-accent px-2 py-1 text-sm font-medium">
                  {tournament.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  { label: "Streak", value: "7 ngày", icon: Flame },
  { label: "Bài học hoàn thành", value: "24", icon: BookOpen },
  { label: "Giải đấu thắng", value: "5", icon: Trophy },
  { label: "Điểm tích lũy", value: "1,250", icon: Target },
];

const recentLessons = [
  { title: "Đại số cơ bản", subject: "Toán học", progress: 75 },
  { title: "Ngữ pháp tiếng Anh", subject: "Tiếng Anh", progress: 45 },
  { title: "Lịch sử Việt Nam", subject: "Lịch sử", progress: 30 },
];

const upcomingTournaments = [
  { name: "Toán Vui Cuối Tuần", participants: 128, time: "2 giờ nữa" },
  { name: "English Challenge", participants: 64, time: "Ngày mai" },
  { name: "Quiz Tổng Hợp", participants: 256, time: "3 ngày nữa" },
];

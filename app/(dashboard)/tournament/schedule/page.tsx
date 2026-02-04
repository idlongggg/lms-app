import { Calendar, Clock, Filter, Trophy, Users } from "lucide-react";

const upcomingMatches = [
  {
    id: 1,
    title: "JavaScript Championship",
    date: "2026-02-10",
    time: "19:00",
    participants: 32,
    maxParticipants: 64,
    prize: "500 xu",
    status: "registration",
    difficulty: "Trung bình",
  },
  {
    id: 2,
    title: "React Masters Cup",
    date: "2026-02-14",
    time: "20:00",
    participants: 48,
    maxParticipants: 64,
    prize: "1000 xu",
    status: "registration",
    difficulty: "Nâng cao",
  },
  {
    id: 3,
    title: "TypeScript Challenge",
    date: "2026-02-17",
    time: "18:30",
    participants: 16,
    maxParticipants: 32,
    prize: "300 xu",
    status: "registration",
    difficulty: "Cơ bản",
  },
  {
    id: 4,
    title: "CSS Battle Weekly",
    date: "2026-02-08",
    time: "21:00",
    participants: 28,
    maxParticipants: 32,
    prize: "200 xu",
    status: "starting_soon",
    difficulty: "Cơ bản",
  },
];

const myRegistered = [
  {
    id: 5,
    title: "Algorithm Arena",
    date: "2026-02-12",
    time: "19:30",
    status: "registered",
  },
];

export default function SchedulePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Lịch đấu</h1>
        <p className="text-muted-foreground">
          Xem các giải đấu sắp diễn ra và đăng ký tham gia
        </p>
      </div>

      {/* My Registered */}
      {myRegistered.length > 0 && (
        <div className="border-primary bg-primary/10 border-2 p-4 shadow-sm">
          <h2 className="mb-3 font-bold">Đã đăng ký</h2>
          <div className="space-y-2">
            {myRegistered.map((match) => (
              <div
                key={match.id}
                className="border-border bg-background flex items-center justify-between border-2 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="border-border bg-primary flex h-10 w-10 items-center justify-center border-2">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{match.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(match.date).toLocaleDateString("vi-VN")} •{" "}
                      {match.time}
                    </p>
                  </div>
                </div>
                <span className="border-border border bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Đã đăng ký
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <span className="text-sm font-medium">Lọc:</span>
        </div>
        <select className="border-border bg-background border-2 px-3 py-1.5 text-sm">
          <option>Tất cả độ khó</option>
          <option>Cơ bản</option>
          <option>Trung bình</option>
          <option>Nâng cao</option>
        </select>
        <select className="border-border bg-background border-2 px-3 py-1.5 text-sm">
          <option>Tuần này</option>
          <option>Tháng này</option>
          <option>Tất cả</option>
        </select>
      </div>

      {/* Calendar View */}
      <div className="grid gap-4 lg:grid-cols-2">
        {upcomingMatches.map((match) => (
          <div
            key={match.id}
            className="border-border bg-background border-2 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Header */}
            <div className="border-border bg-muted flex items-center justify-between border-b-2 px-4 py-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">
                  {new Date(match.date).toLocaleDateString("vi-VN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              {match.status === "starting_soon" && (
                <span className="border-border animate-pulse border bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                  Sắp bắt đầu
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">{match.title}</h3>
                  <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {match.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {match.participants}/{match.maxParticipants}
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      {match.prize}
                    </span>
                  </div>
                </div>
                <span
                  className={`border-border shrink-0 border px-2 py-1 text-xs font-medium ${
                    match.difficulty === "Cơ bản"
                      ? "bg-green-100 text-green-700"
                      : match.difficulty === "Trung bình"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {match.difficulty}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Số người đăng ký
                  </span>
                  <span className="font-medium">
                    {Math.round(
                      (match.participants / match.maxParticipants) * 100,
                    )}
                    %
                  </span>
                </div>
                <div className="border-border bg-muted h-2 w-full border">
                  <div
                    className="bg-secondary h-full transition-all"
                    style={{
                      width: `${(match.participants / match.maxParticipants) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Action */}
              <button className="border-border bg-primary mt-4 w-full border-2 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                Đăng ký tham gia
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

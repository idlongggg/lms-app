import { Trophy, Users, Clock, Swords } from "lucide-react";

export default function TournamentPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-bold text-3xl font-bold">Giải đấu</h1>
        <p className="text-muted-foreground">
          Thử thách bản thân và giành chiến thắng
        </p>
      </div>

      {/* Live Tournaments */}
      <div>
        <h2 className="mb-4 font-bold text-xl font-bold flex items-center gap-2">
          <span className="h-3 w-3 animate-pulse rounded-full bg-destructive" />
          Đang diễn ra
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {liveTournaments.map((tournament, index) => (
            <div
              key={index}
              className="border-2 border-destructive bg-card shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="border-b-2 border-destructive bg-destructive p-4 text-destructive-foreground">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg font-bold">
                    {tournament.name}
                  </h3>
                  <Swords className="h-5 w-5" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {tournament.participants}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {tournament.timeLeft}
                  </span>
                </div>
                <button className="mt-4 w-full border-2 border-border bg-primary px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
                  Tham gia ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Tournaments */}
      <div>
        <h2 className="mb-4 font-bold text-xl font-bold">Sắp diễn ra</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingTournaments.map((tournament, index) => (
            <div
              key={index}
              className="border-2 border-border bg-card shadow-sm transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="border-b-2 border-border bg-primary p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg font-bold">
                    {tournament.name}
                  </h3>
                  <Trophy className="h-5 w-5" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  {tournament.subject}
                </p>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {tournament.registered}/{tournament.maxParticipants}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {tournament.startTime}
                  </span>
                </div>
                <button className="mt-4 w-full border-2 border-border bg-secondary px-4 py-2 font-medium text-secondary-foreground shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                  Đăng ký
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const liveTournaments = [
  { name: "Toán Siêu Tốc", participants: 45, timeLeft: "15 phút" },
  { name: "English Battle", participants: 32, timeLeft: "8 phút" },
];

const upcomingTournaments = [
  {
    name: "Quiz Tổng Hợp",
    subject: "Đa môn",
    registered: 89,
    maxParticipants: 128,
    startTime: "2 giờ nữa",
  },
  {
    name: "Vật Lý Challenge",
    subject: "Vật lý",
    registered: 45,
    maxParticipants: 64,
    startTime: "Ngày mai",
  },
  {
    name: "Lịch Sử Việt Nam",
    subject: "Lịch sử",
    registered: 120,
    maxParticipants: 256,
    startTime: "3 ngày nữa",
  },
];

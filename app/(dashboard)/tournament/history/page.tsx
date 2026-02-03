"use client";

import { LineChart } from "@/components/retroui/charts/LineChart";
import { History, Trophy, Calendar, TrendingUp, TrendingDown } from "lucide-react";

const matchHistory = [
  {
    id: 1,
    opponent: "nguyenb",
    opponentAvatar: "🧑",
    result: "win",
    score: "8-5",
    topic: "JavaScript",
    date: "2026-02-03",
    duration: "12 phút",
    xpGained: 50,
  },
  {
    id: 2,
    opponent: "tranc",
    opponentAvatar: "👩",
    result: "loss",
    score: "4-7",
    topic: "React",
    date: "2026-02-02",
    duration: "15 phút",
    xpGained: 10,
  },
  {
    id: 3,
    opponent: "levan",
    opponentAvatar: "👨",
    result: "win",
    score: "10-3",
    topic: "TypeScript",
    date: "2026-02-01",
    duration: "8 phút",
    xpGained: 50,
  },
  {
    id: 4,
    opponent: "phamthi",
    opponentAvatar: "👧",
    result: "win",
    score: "7-6",
    topic: "CSS",
    date: "2026-01-31",
    duration: "18 phút",
    xpGained: 50,
  },
  {
    id: 5,
    opponent: "hoangm",
    opponentAvatar: "🧔",
    result: "loss",
    score: "5-8",
    topic: "Node.js",
    date: "2026-01-30",
    duration: "14 phút",
    xpGained: 10,
  },
  {
    id: 6,
    opponent: "vuthi",
    opponentAvatar: "👱‍♀️",
    result: "win",
    score: "9-4",
    topic: "JavaScript",
    date: "2026-01-29",
    duration: "10 phút",
    xpGained: 50,
  },
];

const performanceData = [
  { week: "T1", wins: 3, losses: 2 },
  { week: "T2", wins: 5, losses: 1 },
  { week: "T3", wins: 4, losses: 3 },
  { week: "T4", wins: 6, losses: 2 },
];

const stats = {
  totalMatches: 56,
  wins: 41,
  losses: 15,
  winRate: 73,
  currentStreak: 3,
  bestStreak: 8,
};

export default function TournamentHistoryPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Lịch sử đấu</h1>
        <p className="text-muted-foreground">
          Xem lại các trận đấu và theo dõi hiệu suất
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-2 border-border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng trận</p>
              <p className="text-xl font-bold">{stats.totalMatches}</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-green-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Thắng/Thua</p>
              <p className="text-xl font-bold">
                {stats.wins}/{stats.losses}
              </p>
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-secondary text-white">
              {stats.winRate}%
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tỷ lệ thắng</p>
              <p className="text-xl font-bold">{stats.winRate}%</p>
            </div>
          </div>
        </div>
        <div className="border-2 border-border bg-background p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-orange-400">
              🔥
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Streak</p>
              <p className="text-xl font-bold">
                {stats.currentStreak} (Best: {stats.bestStreak})
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Match History */}
        <div className="border-2 border-border bg-background shadow-sm lg:col-span-2">
          <div className="border-b-2 border-border bg-muted px-6 py-4">
            <h2 className="font-bold">Trận đấu gần đây</h2>
          </div>
          <div className="divide-y-2 divide-border">
            {matchHistory.map((match) => (
              <div
                key={match.id}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
              >
                {/* Result indicator */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center border-2 border-border ${
                    match.result === "win" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {match.result === "win" ? (
                    <TrendingUp className="h-5 w-5 text-white" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Opponent */}
                <div className="flex items-center gap-2">
                  <span className="text-xl">{match.opponentAvatar}</span>
                  <span className="font-medium">@{match.opponent}</span>
                </div>

                {/* Score */}
                <div
                  className={`border-2 border-border px-3 py-1 font-bold ${
                    match.result === "win" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {match.score}
                </div>

                {/* Topic */}
                <span className="hidden border border-border bg-muted px-2 py-0.5 text-sm sm:inline">
                  {match.topic}
                </span>

                {/* Meta */}
                <div className="ml-auto text-right text-sm text-muted-foreground">
                  <p>{new Date(match.date).toLocaleDateString("vi-VN")}</p>
                  <p>{match.duration}</p>
                </div>

                {/* XP */}
                <span
                  className={`shrink-0 border border-border px-2 py-0.5 text-sm font-medium ${
                    match.result === "win"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100"
                  }`}
                >
                  +{match.xpGained} xu
                </span>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-border p-4">
            <button className="w-full text-center text-sm font-medium text-muted-foreground hover:text-foreground">
              Xem thêm lịch sử
            </button>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="border-2 border-border bg-background shadow-sm">
          <div className="border-b-2 border-border bg-muted px-6 py-4">
            <h2 className="font-bold">Hiệu suất theo tuần</h2>
          </div>
          <div className="p-4">
            <LineChart
              data={performanceData}
              index="week"
              categories={["wins", "losses"]}
              strokeColors={["var(--primary)", "var(--destructive)"]}
              className="h-48"
            />
          </div>
          <div className="border-t border-border p-4">
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-primary" />
                <span>Thắng</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-destructive" />
                <span>Thua</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

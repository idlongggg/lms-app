"use client";

import { Calendar, Trophy, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  getTournamentCards,
  TournamentCard,
  TournamentStatus,
} from "@/data/tournaments";

export function JoinTournamentSection() {
  const tournaments = getTournamentCards();

  const getSubjectIcon = (name: string) => {
    if (name.toLowerCase().includes("toán")) return "📐";
    if (name.toLowerCase().includes("tiếng anh")) return "🇬🇧";
    if (name.toLowerCase().includes("khoa học")) return "🧪";
    return "⚡";
  };

  const statusColors = {
    DRAFT: "text-gray-500",
    REGISTRATION: "text-blue-500",
    IN_PROGRESS: "text-green-500",
    COMPLETED: "text-gray-500",
    CANCELLED: "text-red-500",
  };

  const statusText = {
    DRAFT: "Nháp",
    REGISTRATION: "Đang mở đăng ký",
    IN_PROGRESS: "Đang diễn ra",
    COMPLETED: "Đã kết thúc",
    CANCELLED: "Đã hủy",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tham gia giải đấu</h2>
          <p className="text-muted-foreground">
            Các giải đấu đang và sắp diễn ra
          </p>
        </div>
      </div>

      {/* Featured Tournament */}
      <div className="border-border bg-card relative overflow-hidden border-2 p-6 shadow-sm sm:p-10">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-yellow-100 opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-100 opacity-20 blur-3xl" />

        <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <div className="mb-4 inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
              🔥 Sự kiện hot nhất tháng
            </div>
            <h3 className="mb-2 text-3xl font-bold">
              Đấu trường Toán học: Mùa 1
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Tham gia tranh tài cùng hàng ngàn học sinh khác để giành giải
              thưởng hấp dẫn và huy hiệu độc quyền!
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-6 md:justify-start">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <span className="font-medium">20/10/2023 - 09:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                <span className="font-medium">1,234 người đã tham gia</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Tổng giải thưởng 10M VNĐ</span>
              </div>
            </div>
            <Button size="lg" className="animate-pulse">
              Đăng ký tham gia ngay
            </Button>
          </div>
          <div className="flex-shrink-0">
            <Trophy className="h-40 w-40 text-yellow-400 drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {["Tất cả", "Toán học", "Vật lý", "Tiếng Anh", "Lập trình"].map(
          (cat, i) => (
            <button
              key={i}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                i === 0
                  ? "bg-primary text-primary-foreground pointer-events-none"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ),
        )}
      </div>

      {/* Tournament List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.slice(1).map((tournament) => (
          <Card key={tournament.id} className="flex flex-col">
            <Card.Content className="flex-1 p-6">
              <div className="mb-4 aspect-video w-full overflow-hidden rounded bg-gray-100 object-cover">
                {/* Placeholder for tournament banner */}
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 text-4xl">
                  {getSubjectIcon(tournament.name)}
                </div>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`text-xs font-bold uppercase ${
                    statusColors[tournament.status] || "text-gray-500"
                  }`}
                >
                  {statusText[tournament.status] || tournament.status}
                </span>
                <span className="text-muted-foreground text-xs font-medium">
                  {tournament.participants} tham gia
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold">{tournament.name}</h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {tournament.description}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span>
                    {new Date(tournament.startsAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="text-muted-foreground h-4 w-4" />
                  <span>Thưởng: Xem chi tiết</span>
                </div>
              </div>
            </Card.Content>
            <div className="border-border border-t-2 p-4">
              <Button className="w-full">Xem chi tiết</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

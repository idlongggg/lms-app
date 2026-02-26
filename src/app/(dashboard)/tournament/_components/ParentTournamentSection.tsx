"use client";

import { Calendar, ChevronRight, Medal, Trophy, Users } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function ParentTournamentSection() {
  // Mock data tailored for parent view
  const childTournaments = [
    {
      id: "1",
      childName: "Minh Anh",
      tournamentName: "Đấu trường Toán học",
      date: "2023-10-20T09:00:00",
      status: "UPCOMING",
      rank: null,
    },
    {
      id: "2",
      childName: "Minh Anh",
      tournamentName: "Thử thách Tiếng Anh",
      date: "2023-10-15T14:00:00",
      status: "COMPLETED",
      rank: 5,
      totalParticipants: 150,
      score: 85,
    },
    {
      id: "3",
      childName: "Hoàng Nam",
      tournamentName: "Thử thách Tiếng Anh",
      date: "2023-10-15T14:00:00",
      status: "COMPLETED",
      rank: 12,
      totalParticipants: 150,
      score: 72,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Hoạt động giải đấu</h2>
          <p className="text-muted-foreground">
            Theo dõi các giải đấu con bạn đã và sẽ tham gia
          </p>
        </div>
        <Button>Tìm kiếm giải đấu</Button>
      </div>

      {/* Upcoming Tournaments */}
      <section>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <Calendar className="h-5 w-5 text-blue-500" />
          Sắp diễn ra
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {childTournaments
            .filter((t) => t.status === "UPCOMING")
            .map((t) => (
              <Card key={t.id} className="border-l-4 border-l-blue-500">
                <Card.Content className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                      Sắp tới
                    </span>
                    <span className="text-sm font-medium">{t.childName}</span>
                  </div>
                  <h4 className="mb-1 font-bold">{t.tournamentName}</h4>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {new Date(t.date).toLocaleString("vi-VN")}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link href={`/tournament/${t.id}`}>Xem chi tiết</Link>
                  </Button>
                </Card.Content>
              </Card>
            ))}
          {childTournaments.filter((t) => t.status === "UPCOMING").length ===
            0 && (
            <p className="text-muted-foreground col-SPAN-full text-sm italic">
              Không có giải đấu sắp tới.
            </p>
          )}
        </div>
      </section>

      {/* Recent Results */}
      <section>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Kết quả gần đây
        </h3>
        <div className="space-y-4">
          {childTournaments
            .filter((t) => t.status === "COMPLETED")
            .map((t) => (
              <div
                key={t.id}
                className="border-border bg-card flex flex-col gap-4 border-2 p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">
                      {t.childName}
                    </span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(t.date).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold">{t.tournamentName}</h4>
                </div>

                <div className="flex items-center justify-between gap-8 sm:justify-end">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Điểm số</p>
                    <p className="text-xl font-bold text-blue-600">{t.score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Xếp hạng</p>
                    <div className="flex items-center gap-1">
                      <Medal
                        className={`h-4 w-4 ${
                          t.rank && t.rank <= 3
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      />
                      <span className="text-xl font-bold">
                        #{t.rank}/{t.totalParticipants}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/tournament/${t.id}/result`}>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Stats Summary */}
      <section>
        <h3 className="mb-4 text-lg font-bold">Tổng quan thành tích</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <Card.Content className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Tổng giải đấu</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Medal className="h-6 w-6" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Top 10</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Tỉ lệ thắng</p>
                <p className="text-2xl font-bold">42%</p>
              </div>
            </Card.Content>
          </Card>
        </div>
      </section>
    </div>
  );
}

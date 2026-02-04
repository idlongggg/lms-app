"use client";

import { Award, Crown, Medal, TrendingUp, Trophy } from "lucide-react";

import { mockChildrenProgress } from "@/lib/mock/classes";

export function ParentTournamentSection() {
  const children = mockChildrenProgress;

  // Aggregate tournament stats
  const totalTournaments = children.reduce(
    (sum, c) => sum + c.tournaments.length,
    0,
  );
  const bestRank = Math.min(
    ...children.flatMap((c) => c.tournaments.map((t) => t.rank)),
  );
  const avgRank = Math.round(
    children
      .flatMap((c) => c.tournaments.map((t) => t.rank))
      .reduce((a, b) => a + b, 0) / totalTournaments,
  );

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold">Thành tích giải đấu của con</h2>
        <p className="text-muted-foreground">
          Theo dõi thành tích thi đấu của con
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Tổng giải đấu</p>
              <p className="text-2xl font-bold">{totalTournaments}</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-purple-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Hạng cao nhất</p>
              <p className="text-2xl font-bold text-yellow-500">#{bestRank}</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-yellow-500">
              <Crown className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Hạng trung bình</p>
              <p className="text-2xl font-bold">#{avgRank}</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="border-border bg-card border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Top 3</p>
              <p className="text-2xl font-bold">
                {
                  children
                    .flatMap((c) => c.tournaments)
                    .filter((t) => t.rank <= 3).length
                }{" "}
                lần
              </p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
              <Medal className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Per Child Tournament History */}
      {children.map((child) => (
        <div
          key={child.childId}
          className="border-border bg-card border-2 shadow-sm"
        >
          {/* Child Header */}
          <div className="border-border border-b-2 p-4">
            <div className="flex items-center gap-4">
              <div className="border-border bg-primary flex h-12 w-12 items-center justify-center border-2 text-xl font-bold">
                {child.childName.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold">{child.childName}</h3>
                <p className="text-muted-foreground">
                  {child.tournaments.length} giải đấu • Tốt nhất: #
                  {Math.min(...child.tournaments.map((t) => t.rank))}
                </p>
              </div>
            </div>
          </div>

          {/* Tournament List */}
          <div className="p-4">
            {child.tournaments.length > 0 ? (
              <div className="space-y-3">
                {child.tournaments.map((tournament, index) => (
                  <div
                    key={index}
                    className="border-border hover:bg-muted/50 flex items-center gap-4 rounded border-2 p-4 transition-all"
                  >
                    {/* Rank Badge */}
                    <div
                      className={`border-border flex h-14 w-14 flex-col items-center justify-center border-2 ${
                        tournament.rank === 1
                          ? "bg-yellow-500"
                          : tournament.rank === 2
                            ? "bg-gray-400"
                            : tournament.rank === 3
                              ? "bg-orange-600"
                              : "bg-muted"
                      }`}
                    >
                      <span className="text-lg font-bold">
                        #{tournament.rank}
                      </span>
                    </div>

                    {/* Tournament Info */}
                    <div className="flex-1">
                      <h4 className="font-bold">{tournament.name}</h4>
                      <p className="text-muted-foreground text-sm">
                        {new Date(tournament.date).toLocaleDateString("vi-VN")}{" "}
                        • {tournament.totalParticipants} người tham gia
                      </p>
                    </div>

                    {/* Medal if top 3 */}
                    {tournament.rank <= 3 && (
                      <div className="flex items-center gap-1">
                        {tournament.rank === 1 && (
                          <Award className="h-8 w-8 text-yellow-500" />
                        )}
                        {tournament.rank === 2 && (
                          <Award className="h-8 w-8 text-gray-400" />
                        )}
                        {tournament.rank === 3 && (
                          <Award className="h-8 w-8 text-orange-600" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center">
                Chưa tham gia giải đấu nào
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

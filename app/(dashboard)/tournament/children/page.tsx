'use client';

import { Trophy, Medal, TrendingUp, Calendar, Users, Star, Award, Crown } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { mockChildrenProgress } from '@/lib/mock/classes';

export default function ParentTournamentChildrenPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'parent') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  const children = mockChildrenProgress;

  // Aggregate tournament stats
  const totalTournaments = children.reduce((sum, c) => sum + c.tournaments.length, 0);
  const bestRank = Math.min(...children.flatMap((c) => c.tournaments.map((t) => t.rank)));
  const avgRank = Math.round(
    children.flatMap((c) => c.tournaments.map((t) => t.rank)).reduce((a, b) => a + b, 0) /
      totalTournaments,
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Thành tích giải đấu</h1>
        <p className="text-muted-foreground">Theo dõi thành tích thi đấu của con</p>
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
                {children.flatMap((c) => c.tournaments).filter((t) => t.rank <= 3).length} lần
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
        <div key={child.childId} className="border-border bg-card border-2 shadow-sm">
          {/* Child Header */}
          <div className="border-border border-b-2 p-4">
            <div className="flex items-center gap-4">
              <div className="border-border bg-primary flex h-12 w-12 items-center justify-center border-2 text-xl font-bold">
                {child.childName.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{child.childName}</h2>
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
                          ? 'bg-yellow-500'
                          : tournament.rank === 2
                            ? 'bg-gray-400'
                            : tournament.rank === 3
                              ? 'bg-orange-600'
                              : 'bg-muted'
                      }`}
                    >
                      {tournament.rank <= 3 ? (
                        <>
                          <Medal className="h-5 w-5 text-white" />
                          <span className="text-xs font-bold text-white">#{tournament.rank}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold">#{tournament.rank}</span>
                      )}
                    </div>

                    {/* Tournament Info */}
                    <div className="flex-1">
                      <h3 className="font-bold">{tournament.name}</h3>
                      <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(tournament.date).toLocaleDateString('vi-VN')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {tournament.totalParticipants} người tham gia
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <p className="text-2xl font-bold">{tournament.score}</p>
                      <p className="text-muted-foreground text-sm">điểm</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Trophy className="text-muted-foreground mx-auto h-12 w-12" />
                <p className="text-muted-foreground mt-2">Chưa tham gia giải đấu nào</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Achievements Section */}
      <div className="border-border bg-card border-2 p-4 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Huy chương đạt được</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Crown,
              label: 'Vô địch',
              count: children.flatMap((c) => c.tournaments).filter((t) => t.rank === 1).length,
              color: 'bg-yellow-500',
            },
            {
              icon: Medal,
              label: 'Á quân',
              count: children.flatMap((c) => c.tournaments).filter((t) => t.rank === 2).length,
              color: 'bg-gray-400',
            },
            {
              icon: Award,
              label: 'Hạng 3',
              count: children.flatMap((c) => c.tournaments).filter((t) => t.rank === 3).length,
              color: 'bg-orange-600',
            },
            {
              icon: Star,
              label: 'Top 10',
              count: children.flatMap((c) => c.tournaments).filter((t) => t.rank <= 10).length,
              color: 'bg-blue-500',
            },
          ].map((medal, index) => (
            <div key={index} className="border-border flex items-center gap-3 rounded border-2 p-3">
              <div
                className={`border-border flex h-10 w-10 items-center justify-center border-2 ${medal.color}`}
              >
                <medal.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold">{medal.count}</p>
                <p className="text-muted-foreground text-sm">{medal.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

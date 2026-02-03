'use client';

import { Trophy, Users, Clock, Swords, Medal, Target } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { 
  getLiveTournaments, 
  getUpcomingTournaments, 
  getUserTournamentHistory,
  getUserMedals 
} from "@/lib/mock/tournaments";
import Link from "next/link";

export default function TournamentPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  const liveTournaments = getLiveTournaments();
  const upcomingTournaments = getUpcomingTournaments();
  const userHistory = getUserTournamentHistory(user.id);
  const userMedals = getUserMedals(user.id);

  // Format time helper
  const formatTimeUntil = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} ngày nữa`;
    if (diffHours > 0) return `${diffHours} giờ nữa`;
    return 'Sắp bắt đầu';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-3xl">Giải đấu</h1>
          <p className="text-muted-foreground">
            Thử thách bản thân và giành chiến thắng
          </p>
        </div>
        <Link 
          href="/tournament/history" 
          className="border-2 border-border bg-card px-4 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
        >
          Lịch sử thi đấu →
        </Link>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="border-2 border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Tổng giải</span>
          </div>
          <p className="mt-1 text-2xl font-bold">{userHistory.length}</p>
        </div>
        <div className="border-2 border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-muted-foreground">Huy chương Vàng</span>
          </div>
          <p className="mt-1 text-2xl font-bold">
            {userMedals.filter(m => m.medal.tier === 'GOLD').length}
          </p>
        </div>
        <div className="border-2 border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-muted-foreground">Huy chương Bạc</span>
          </div>
          <p className="mt-1 text-2xl font-bold">
            {userMedals.filter(m => m.medal.tier === 'SILVER').length}
          </p>
        </div>
        <div className="border-2 border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Thắng</span>
          </div>
          <p className="mt-1 text-2xl font-bold">
            {userHistory.filter(h => h.rank && h.rank <= 3).length}
          </p>
        </div>
      </div>

      {/* Live Tournaments */}
      {liveTournaments.length > 0 && (
        <div>
          <h2 className="mb-4 font-bold text-xl flex items-center gap-2">
            <span className="h-3 w-3 animate-pulse rounded-full bg-destructive" />
            Đang diễn ra
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {liveTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="border-2 border-destructive bg-card shadow-md transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="border-b-2 border-destructive bg-destructive p-4 text-destructive-foreground">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">
                      {tournament.name}
                    </h3>
                    <Swords className="h-5 w-5" />
                  </div>
                  <p className="text-sm opacity-80 mt-1">{tournament.description}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {tournament.maxParticipants} người
                    </span>
                  </div>
                  <Link
                    href={`/tournament/live/${tournament.id}`}
                    className="mt-4 w-full border-2 border-border bg-primary px-4 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center"
                  >
                    Tham gia ngay
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Tournaments */}
      <div>
        <h2 className="mb-4 font-bold text-xl">Sắp diễn ra</h2>
        {upcomingTournaments.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="border-2 border-border bg-card shadow-sm transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="border-b-2 border-border bg-primary p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">
                      {tournament.name}
                    </h3>
                    <Trophy className="h-5 w-5" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    {tournament.description}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      0/{tournament.maxParticipants}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formatTimeUntil(tournament.startsAt)}
                    </span>
                  </div>
                  <button className="mt-4 w-full border-2 border-border bg-secondary px-4 py-2 font-medium text-secondary-foreground shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
                    Đăng ký
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-border p-8 text-center text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Không có giải đấu nào sắp diễn ra</p>
          </div>
        )}
      </div>
    </div>
  );
}

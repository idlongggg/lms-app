'use client';

import { BookOpen, Flame, Trophy, Target, Coins, Star } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { getInProgressCourses, lessons, lessonProgress } from "@/lib/mock/courses";
import { getUpcomingTournaments, getLiveTournaments } from "@/lib/mock/tournaments";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  
  if (!user) return null;

  // Get user-specific data
  const inProgressCourses = getInProgressCourses(user.id);
  const upcomingTournaments = getUpcomingTournaments();
  const liveTournaments = getLiveTournaments();

  // Get recent lessons with progress
  const recentLessons = lessonProgress
    .filter(p => p.userId === user.id && p.status !== 'COMPLETED')
    .slice(0, 3)
    .map(p => {
      const lesson = lessons.find(l => l.id === p.lessonId);
      return {
        id: p.lessonId,
        title: lesson?.title || 'Unknown',
        subject: 'Toán học', // Would come from subject lookup
        progress: p.bestScore || Math.floor(Math.random() * 60) + 20,
      };
    });

  const stats = [
    { label: "Streak", value: `${user.streak} ngày`, icon: Flame, color: "bg-orange-500" },
    { label: "Level", value: `Lv.${user.level}`, icon: Star, color: "bg-purple-500" },
    { label: "XP", value: user.exp.toLocaleString(), icon: Target, color: "bg-blue-500" },
    { label: "Xu", value: user.coins.toLocaleString(), icon: Coins, color: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-bold text-3xl">Xin chào, {user.name.split(' ').slice(-1)[0]}! 👋</h1>
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
                <p className="font-bold text-2xl">{stat.value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center border-2 border-border ${stat.color}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Continue Learning */}
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="border-b-2 border-border p-4 flex items-center justify-between">
            <h2 className="font-bold text-xl">Tiếp tục học</h2>
            <Link href="/learning/in-progress" className="text-sm text-primary hover:underline">
              Xem tất cả →
            </Link>
          </div>
          <div className="divide-y-2 divide-border">
            {recentLessons.length > 0 ? recentLessons.map((lesson, index) => (
              <Link
                key={index}
                href={`/learning/${lesson.id}`}
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
              </Link>
            )) : (
              <div className="p-8 text-center text-muted-foreground">
                <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Chưa có bài học nào đang học</p>
                <Link href="/learning/courses" className="text-primary hover:underline text-sm">
                  Khám phá khóa học →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Tournaments */}
        <div className="border-2 border-border bg-card shadow-sm">
          <div className="border-b-2 border-border p-4 flex items-center justify-between">
            <h2 className="font-bold text-xl">Giải đấu</h2>
            <Link href="/tournament" className="text-sm text-primary hover:underline">
              Xem tất cả →
            </Link>
          </div>
          <div className="divide-y-2 divide-border">
            {/* Live tournaments first */}
            {liveTournaments.map((tournament, index) => (
              <Link
                key={`live-${index}`}
                href={`/tournament/live/${tournament.id}`}
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-red-500">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{tournament.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {tournament.maxParticipants} người tham gia
                    </p>
                  </div>
                </div>
                <div className="border-2 border-red-500 bg-red-500/10 px-2 py-1 text-sm font-medium text-red-500 animate-pulse">
                  🔴 LIVE
                </div>
              </Link>
            ))}
            {/* Upcoming tournaments */}
            {upcomingTournaments.slice(0, 3 - liveTournaments.length).map((tournament, index) => {
              const startsAt = new Date(tournament.startsAt);
              const now = new Date();
              const diffMs = startsAt.getTime() - now.getTime();
              const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
              const diffDays = Math.floor(diffHours / 24);
              const timeLabel = diffDays > 0 ? `${diffDays} ngày nữa` : `${diffHours} giờ nữa`;
              
              return (
                <Link
                  key={index}
                  href={`/tournament`}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-primary">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{tournament.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {tournament.maxParticipants} người tham gia
                      </p>
                    </div>
                  </div>
                  <div className="border-2 border-border bg-accent px-2 py-1 text-sm font-medium">
                    {timeLabel}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

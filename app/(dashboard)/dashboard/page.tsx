'use client';

import { BookOpen, Coins, Flame, Star, Target, Trophy } from 'lucide-react';
import Link from 'next/link';

import { PageLayout } from '@/components/shared';
import { useAuth } from '@/lib/auth';
import { getInProgressCourses, lessonProgress, lessons } from '@/lib/mock/courses';
import { getLiveTournaments, getUpcomingTournaments } from '@/lib/mock/tournaments';
import { useTranslation } from '@/lib/providers';

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) return null;

  // Get user-specific data
  const _inProgressCourses = getInProgressCourses(user.id);
  const upcomingTournaments = getUpcomingTournaments();
  const liveTournaments = getLiveTournaments();

  // Get recent lessons with progress
  const recentLessons = lessonProgress
    .filter((p) => p.userId === user.id && p.status !== 'COMPLETED')
    .slice(0, 3)
    .map((p, index) => {
      const lesson = lessons.find((l) => l.id === p.lessonId);
      // Use deterministic progress based on index instead of Math.random
      const fallbackProgress = [35, 55, 75][index % 3];
      return {
        id: p.lessonId,
        title: lesson?.title || 'Unknown',
        subject: 'Toán học', // Would come from subject lookup
        progress: p.bestScore || fallbackProgress,
      };
    });

  const stats = [
    {
      label: t('dashboard.streak'),
      value: t('dashboard.streakDays', { count: user.streak }),
      icon: Flame,
      color: 'bg-orange-500',
    },
    {
      label: t('dashboard.level'),
      value: `Lv.${user.level}`,
      icon: Star,
      color: 'bg-purple-500',
    },
    {
      label: t('dashboard.xp'),
      value: user.exp.toLocaleString(),
      icon: Target,
      color: 'bg-blue-500',
    },
    {
      label: t('dashboard.coins'),
      value: user.coins.toLocaleString(),
      icon: Coins,
      color: 'bg-yellow-500',
    },
  ];

  const firstName = user.name.split(' ').slice(-1)[0];

  return (
    <PageLayout
      title={`${t('dashboard.welcome')}, ${firstName}! 👋`}
      description={t('dashboard.welcomeBack')}
    >
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-border bg-card border-2 p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={`border-border flex h-10 w-10 items-center justify-center border-2 ${stat.color}`}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Continue Learning */}
          <div className="border-border bg-card border-2 shadow-sm">
            <div className="border-border flex items-center justify-between border-b-2 p-4">
              <h2 className="text-xl font-bold">{t('dashboard.continueLearning')}</h2>
              <Link href="/learning/in-progress" className="text-primary text-sm hover:underline">
                {t('dashboard.viewAllLessons')}
              </Link>
            </div>
            <div className="divide-border divide-y-2">
              {recentLessons.length > 0 ? (
                recentLessons.map((lesson, index) => (
                  <Link
                    key={index}
                    href={`/learning/${lesson.id}`}
                    className="hover:bg-muted flex items-center justify-between p-4 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="border-border bg-accent flex h-10 w-10 items-center justify-center border-2">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-muted-foreground text-sm">{lesson.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{lesson.progress}%</p>
                      <div className="border-border bg-muted mt-1 h-2 w-20 border">
                        <div
                          className="bg-primary h-full"
                          style={{ width: `${lesson.progress}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-muted-foreground p-8 text-center">
                  <BookOpen className="mx-auto mb-2 h-8 w-8 opacity-50" />
                  <p>{t('dashboard.noLessonsInProgress')}</p>
                  <Link href="/learning/courses" className="text-primary text-sm hover:underline">
                    {t('dashboard.exploreCourses')}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Tournaments */}
          <div className="border-border bg-card border-2 shadow-sm">
            <div className="border-border flex items-center justify-between border-b-2 p-4">
              <h2 className="text-xl font-bold">{t('dashboard.tournaments')}</h2>
              <Link href="/tournament" className="text-primary text-sm hover:underline">
                {t('dashboard.viewAllLessons')}
              </Link>
            </div>
            <div className="divide-border divide-y-2">
              {/* Live tournaments first */}
              {liveTournaments.map((tournament, index) => (
                <Link
                  key={`live-${index}`}
                  href={`/tournament/live/${tournament.id}`}
                  className="hover:bg-muted flex items-center justify-between p-4 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-red-500">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{tournament.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {tournament.maxParticipants} {t('dashboard.participants')}
                      </p>
                    </div>
                  </div>
                  <div className="animate-pulse border-2 border-red-500 bg-red-500/10 px-2 py-1 text-sm font-medium text-red-500">
                    🔴 {t('dashboard.live')}
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
                const timeLabel =
                  diffDays > 0
                    ? `${diffDays} ${t('dashboard.daysLeft')}`
                    : `${diffHours} ${t('dashboard.hoursLeft')}`;

                return (
                  <Link
                    key={index}
                    href={`/tournament`}
                    className="hover:bg-muted flex items-center justify-between p-4 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="border-border bg-primary flex h-10 w-10 items-center justify-center border-2">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{tournament.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {tournament.maxParticipants} {t('dashboard.participants')}
                        </p>
                      </div>
                    </div>
                    <div className="border-border bg-accent border-2 px-2 py-1 text-sm font-medium">
                      {timeLabel}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

'use client';

import { Clock, Medal, Swords, Target, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

import { Button, Card } from '@/components/retroui';
import { PageLayout } from '@/components/shared';
import { useAuth } from '@/lib/auth';
import {
  getLiveTournaments,
  getUpcomingTournaments,
  getUserMedals,
  getUserTournamentHistory,
} from '@/lib/mock/tournaments';
import { useTranslation } from '@/lib/providers';

export default function TournamentPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

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

    if (diffDays > 0) return `${diffDays} ${t('dashboard.daysLeft')}`;
    if (diffHours > 0) return `${diffHours} ${t('dashboard.hoursLeft')}`;
    return t('tournament.active');
  };

  return (
    <PageLayout
      title={t('tournament.title')}
      description={t('tournament.description')}
      actions={
        <Button asChild variant="outline">
          <Link href="/tournament/history">{t('tournament.history')} →</Link>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* User Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-muted-foreground text-sm">{t('tournament.total')}</span>
            </div>
            <p className="mt-1 text-2xl font-bold">{userHistory.length}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-yellow-400" />
              <span className="text-muted-foreground text-sm">{t('tournament.goldMedals')}</span>
            </div>
            <p className="mt-1 text-2xl font-bold">
              {userMedals.filter((m) => m.medal.tier === 'GOLD').length}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-gray-400" />
              <span className="text-muted-foreground text-sm">{t('tournament.silverMedals')}</span>
            </div>
            <p className="mt-1 text-2xl font-bold">
              {userMedals.filter((m) => m.medal.tier === 'SILVER').length}
            </p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Target className="text-primary h-5 w-5" />
              <span className="text-muted-foreground text-sm">{t('tournament.wins')}</span>
            </div>
            <p className="mt-1 text-2xl font-bold">
              {userHistory.filter((h) => h.rank && h.rank <= 3).length}
            </p>
          </Card>
        </div>

        {/* Live Tournaments */}
        {liveTournaments.length > 0 && (
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <span className="bg-destructive h-3 w-3 animate-pulse rounded-full" />
              {t('tournament.live')}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {liveTournaments.map((tournament) => (
                <Card
                  key={tournament.id}
                  className="border-destructive overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1"
                >
                  <div className="border-destructive bg-destructive text-destructive-foreground border-b-2 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{tournament.name}</h3>
                      <Swords className="h-5 w-5" />
                    </div>
                    <p className="mt-1 text-sm opacity-80">{tournament.description}</p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {tournament.maxParticipants} {t('dashboard.participants')}
                      </span>
                    </div>
                    <Button asChild className="mt-4 w-full">
                      <Link href={`/tournament/live/${tournament.id}`}>
                        {t('tournament.joinNow')}
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Tournaments */}
        <div>
          <h2 className="mb-4 text-xl font-bold">{t('tournament.upcoming')}</h2>
          {upcomingTournaments.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingTournaments.map((tournament) => (
                <Card
                  key={tournament.id}
                  className="overflow-hidden transition-all hover:-translate-x-1 hover:-translate-y-1"
                >
                  <div className="border-border bg-primary border-b-2 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{tournament.name}</h3>
                      <Trophy className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-muted-foreground text-sm">{tournament.description}</p>
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
                    <Button variant="secondary" className="mt-4 w-full">
                      {t('tournament.register')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border-border text-muted-foreground border-2 border-dashed p-8 text-center">
              <Trophy className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>{t('tournament.noTournaments')}</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

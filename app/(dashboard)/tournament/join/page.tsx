'use client';

import {
  Calendar,
  CheckCircle,
  Clock,
  Play,
  Search,
  Star,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { Badge, Button, Card, Input, Progress } from '@/components/retroui';
import { PageLayout } from '@/components/shared';
import { useAuth } from '@/lib/auth';
import { mockJoinableTournaments } from '@/lib/mock/classes';
import { useTranslation } from '@/lib/providers';

type FilterType = 'all' | 'available' | 'joined';

export default function StudentTournamentJoinPage() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user || user.role !== 'student') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">{t('errors.noAccess')}</p>
      </div>
    );
  }

  const tournaments = mockJoinableTournaments;

  const filteredTournaments = tournaments.filter((t) => {
    if (filter === 'available' && t.isJoined) return false;
    if (filter === 'joined' && !t.isJoined) return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    available: tournaments.filter((t) => !t.isJoined).length,
    joined: tournaments.filter((t) => t.isJoined).length,
    active: tournaments.filter((t) => t.status === 'ACTIVE').length,
  };

  const filters: { label: string; value: FilterType }[] = [
    { label: t('tournament.filters.all'), value: 'all' },
    { label: t('tournament.filters.available'), value: 'available' },
    { label: t('tournament.filters.joined'), value: 'joined' },
  ];

  return (
    <PageLayout title={t('tournament.join.title')} description={t('tournament.join.description')}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{t('tournament.available')}</p>
                <p className="text-2xl font-bold text-blue-500">{stats.available}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
                <Trophy className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{t('tournament.joined')}</p>
                <p className="text-2xl font-bold text-green-500">{stats.joined}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{t('tournament.active')}</p>
                <p className="text-2xl font-bold text-orange-500">{stats.active}</p>
              </div>
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-500">
                <Play className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-1 items-center gap-2">
            <Search className="text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder={t('tournament.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? 'default' : 'outline'}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Tournament Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.map((tournament) => (
            <Card
              key={tournament.id}
              className={`transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                tournament.isJoined ? 'border-green-500' : ''
              }`}
            >
              <div className="p-4">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div
                    className={`border-border flex h-12 w-12 items-center justify-center border-2 ${
                      tournament.type === 'RANKED'
                        ? 'bg-purple-500'
                        : tournament.type === 'PRACTICE'
                          ? 'bg-green-500'
                          : 'bg-blue-500'
                    }`}
                  >
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      variant={
                        tournament.type === 'RANKED'
                          ? 'surface'
                          : tournament.type === 'PRACTICE'
                            ? 'solid'
                            : 'outline'
                      }
                    >
                      {tournament.type === 'RANKED'
                        ? t('tournament.type.ranked')
                        : tournament.type === 'PRACTICE'
                          ? t('tournament.type.practice')
                          : t('tournament.type.class')}
                    </Badge>
                    {tournament.isJoined && (
                      <span className="flex items-center gap-1 text-xs text-green-500">
                        <CheckCircle className="h-3 w-3" />
                        {t('tournament.joined')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-1 text-lg font-bold">{tournament.name}</h3>
                <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                  {tournament.description}
                </p>

                {/* Info */}
                <div className="mb-4 space-y-2 text-sm">
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {tournament.status === 'ACTIVE'
                        ? t('tournament.active')
                        : new Date(tournament.startTime).toLocaleString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                    </span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {t('tournament.duration', { minutes: tournament.duration })} •{' '}
                      {t('tournament.questions', { count: tournament.questionCount })}
                    </span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {tournament.currentParticipants}/{tournament.maxParticipants}{' '}
                      {t('tournament.participants')}
                    </span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>{t('tournament.createdBy', { name: tournament.createdByName })}</span>
                  </div>
                </div>

                {/* Progress bar for participants */}
                <div className="mb-4">
                  <Progress
                    value={(tournament.currentParticipants / tournament.maxParticipants) * 100}
                    className={
                      tournament.currentParticipants / tournament.maxParticipants > 0.8
                        ? '[&>div]:bg-red-500'
                        : '[&>div]:bg-green-500'
                    }
                  />
                  <p className="text-muted-foreground mt-1 text-right text-xs">
                    {t('tournament.spotsLeft', {
                      count: tournament.maxParticipants - tournament.currentParticipants,
                    })}
                  </p>
                </div>

                {/* Actions */}
                {tournament.isJoined ? (
                  <div className="flex gap-2">
                    {tournament.status === 'ACTIVE' ? (
                      <Button className="flex-1 bg-green-500 hover:bg-green-600">
                        <Swords className="mr-2 h-4 w-4" />
                        {t('tournament.enterBattle')}
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1">
                        {t('tournament.viewDetails')}
                      </Button>
                    )}
                    <Button variant="outline" className="bg-red-100 text-red-600 hover:bg-red-200">
                      {t('tournament.cancelRegistration')}
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    disabled={tournament.currentParticipants >= tournament.maxParticipants}
                  >
                    {tournament.currentParticipants >= tournament.maxParticipants ? (
                      t('tournament.full')
                    ) : (
                      <>
                        <Trophy className="mr-2 h-4 w-4" />
                        {t('tournament.registerNow')}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTournaments.length === 0 && (
          <div className="border-border bg-muted/50 border-2 border-dashed p-12 text-center">
            <Trophy className="text-muted-foreground mx-auto h-12 w-12" />
            <h3 className="mt-4 text-lg font-bold">{t('tournament.notFound')}</h3>
            <p className="text-muted-foreground mt-2">
              {filter === 'joined' ? t('tournament.notJoined') : t('tournament.noMatchingFilter')}
            </p>
          </div>
        )}

        {/* Tips Section */}
        <Card className="bg-blue-50 p-4 dark:bg-blue-950">
          <h3 className="mb-3 font-bold">{t('tournament.tips.title')}</h3>
          <ul className="text-muted-foreground space-y-2 text-sm">
            <li>
              • <strong>{t('tournament.tips.ranked')}</strong> {t('tournament.tips.rankedDesc')}
            </li>
            <li>
              • <strong>{t('tournament.tips.practice')}</strong> {t('tournament.tips.practiceDesc')}
            </li>
            <li>• {t('tournament.tips.early')}</li>
            <li>• {t('tournament.tips.checkTime')}</li>
          </ul>
        </Card>
      </div>
    </PageLayout>
  );
}

/**
 * Mock Tournaments Data
 * Based on database.md schema: Tournament, CompetitionRound, Participant, Medal, UserMedal
 */

import { tenants } from './users';

export type TournamentStatus = 'DRAFT' | 'REGISTRATION' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type MedalTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';

export interface Tournament {
  id: string;
  tenantId: string;
  createdBy: string;
  name: string;
  description: string | null;
  rules: string | null;
  bannerUrl: string | null;
  maxParticipants: number;
  entryFee: number;
  minLevel: number;
  status: TournamentStatus;
  startsAt: string;
  endsAt: string;
  createdAt: string;
}

export interface CompetitionRound {
  id: string;
  tournamentId: string;
  roundNumber: number;
  questions: string[]; // Question IDs
  startsAt: string;
  endsAt: string;
}

export interface Participant {
  id: string;
  roundId: string;
  tournamentId: string;
  userId: string;
  userName: string;
  userAvatar: string | null;
  score: number | null;
  rank: number | null;
  joinedAt: string;
  finishedAt: string | null;
}

export interface Medal {
  id: string;
  tournamentId: string;
  name: string;
  tier: MedalTier;
  iconUrl: string;
  criteria: Record<string, unknown>;
}

export interface UserMedal {
  id: string;
  userId: string;
  medalId: string;
  tournamentId: string;
  rank: number;
  awardedAt: string;
}

// Tournaments
export const tournaments: Tournament[] = [
  {
    id: 'tournament-001',
    tenantId: tenants.school.id,
    createdBy: 'user-tenant-admin',
    name: 'Toán Học Tuần 5',
    description: 'Giải đấu Toán học hàng tuần - Tuần 5',
    rules: 'Trả lời 10 câu hỏi trong 5 phút. Mỗi câu đúng +10 điểm, sai -2 điểm.',
    bannerUrl: 'https://placehold.co/800x400/3498db/white?text=Math+Week+5',
    maxParticipants: 100,
    entryFee: 0,
    minLevel: 1,
    status: 'IN_PROGRESS',
    startsAt: '2026-02-03T14:00:00Z',
    endsAt: '2026-02-03T15:00:00Z',
    createdAt: '2026-01-28T00:00:00Z',
  },
  {
    id: 'tournament-002',
    tenantId: tenants.school.id,
    createdBy: 'user-tenant-admin',
    name: 'Tiếng Anh Challenge',
    description: 'Thử thách tiếng Anh cuối tuần',
    rules: 'Hoàn thành bài test trong 15 phút.',
    bannerUrl: 'https://placehold.co/800x400/2ecc71/white?text=English+Challenge',
    maxParticipants: 50,
    entryFee: 100,
    minLevel: 5,
    status: 'REGISTRATION',
    startsAt: '2026-02-08T09:00:00Z',
    endsAt: '2026-02-08T10:00:00Z',
    createdAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'tournament-003',
    tenantId: tenants.school.id,
    createdBy: 'user-tenant-admin',
    name: 'Vô địch Toán tháng 2',
    description: 'Giải vô địch Toán học tháng 2/2026',
    rules: 'Vượt qua 3 vòng loại để vào chung kết.',
    bannerUrl: 'https://placehold.co/800x400/e74c3c/white?text=Math+Championship',
    maxParticipants: 200,
    entryFee: 500,
    minLevel: 10,
    status: 'REGISTRATION',
    startsAt: '2026-02-15T14:00:00Z',
    endsAt: '2026-02-15T17:00:00Z',
    createdAt: '2026-02-01T00:00:00Z',
  },
  {
    id: 'tournament-004',
    tenantId: tenants.school.id,
    createdBy: 'user-tenant-admin',
    name: 'Toán Học Tuần 4',
    description: 'Giải đấu Toán học hàng tuần - Tuần 4',
    rules: 'Trả lời 10 câu hỏi trong 5 phút.',
    bannerUrl: 'https://placehold.co/800x400/3498db/white?text=Math+Week+4',
    maxParticipants: 100,
    entryFee: 0,
    minLevel: 1,
    status: 'COMPLETED',
    startsAt: '2026-01-27T14:00:00Z',
    endsAt: '2026-01-27T15:00:00Z',
    createdAt: '2026-01-20T00:00:00Z',
  },
  {
    id: 'tournament-005',
    tenantId: tenants.school.id,
    createdBy: 'user-tenant-admin',
    name: 'Quiz Khoa Học',
    description: 'Thi đấu kiến thức khoa học tự nhiên',
    rules: '20 câu hỏi, 10 phút.',
    bannerUrl: 'https://placehold.co/800x400/9b59b6/white?text=Science+Quiz',
    maxParticipants: 80,
    entryFee: 50,
    minLevel: 3,
    status: 'COMPLETED',
    startsAt: '2026-01-20T14:00:00Z',
    endsAt: '2026-01-20T15:00:00Z',
    createdAt: '2026-01-15T00:00:00Z',
  },
];

// Competition rounds
export const competitionRounds: CompetitionRound[] = [
  {
    id: 'round-001-1',
    tournamentId: 'tournament-001',
    roundNumber: 1,
    questions: ['question-1', 'question-2', 'question-3'],
    startsAt: '2026-02-03T14:00:00Z',
    endsAt: '2026-02-03T14:30:00Z',
  },
  {
    id: 'round-004-1',
    tournamentId: 'tournament-004',
    roundNumber: 1,
    questions: ['question-1', 'question-2', 'question-3'],
    startsAt: '2026-01-27T14:00:00Z',
    endsAt: '2026-01-27T14:30:00Z',
  },
];

// Participants
export const participants: Participant[] = [
  // Tournament 004 (completed) - Top players
  {
    id: 'participant-004-1',
    roundId: 'round-004-1',
    tournamentId: 'tournament-004',
    userId: 'user-student',
    userName: 'Lê Văn Học Sinh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
    score: 95,
    rank: 3,
    joinedAt: '2026-01-27T14:00:00Z',
    finishedAt: '2026-01-27T14:25:00Z',
  },
  {
    id: 'participant-004-2',
    roundId: 'round-004-1',
    tournamentId: 'tournament-004',
    userId: 'user-other-1',
    userName: 'Nguyễn Minh Tuấn',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tuan',
    score: 100,
    rank: 1,
    joinedAt: '2026-01-27T14:00:00Z',
    finishedAt: '2026-01-27T14:20:00Z',
  },
  {
    id: 'participant-004-3',
    roundId: 'round-004-1',
    tournamentId: 'tournament-004',
    userId: 'user-other-2',
    userName: 'Trần Thị Mai',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mai',
    score: 98,
    rank: 2,
    joinedAt: '2026-01-27T14:00:00Z',
    finishedAt: '2026-01-27T14:22:00Z',
  },
  // Tournament 001 (in-progress)
  {
    id: 'participant-001-1',
    roundId: 'round-001-1',
    tournamentId: 'tournament-001',
    userId: 'user-student',
    userName: 'Lê Văn Học Sinh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
    score: 45,
    rank: null,
    joinedAt: '2026-02-03T14:00:00Z',
    finishedAt: null,
  },
];

// Medals
export const medals: Medal[] = [
  {
    id: 'medal-gold',
    tournamentId: 'tournament-004',
    name: 'Huy chương Vàng',
    tier: 'GOLD',
    iconUrl: '🥇',
    criteria: { rank: 1 },
  },
  {
    id: 'medal-silver',
    tournamentId: 'tournament-004',
    name: 'Huy chương Bạc',
    tier: 'SILVER',
    iconUrl: '🥈',
    criteria: { rank: 2 },
  },
  {
    id: 'medal-bronze',
    tournamentId: 'tournament-004',
    name: 'Huy chương Đồng',
    tier: 'BRONZE',
    iconUrl: '🥉',
    criteria: { rank: 3 },
  },
];

// User medals
export const userMedals: UserMedal[] = [
  {
    id: 'user-medal-001',
    userId: 'user-student',
    medalId: 'medal-bronze',
    tournamentId: 'tournament-004',
    rank: 3,
    awardedAt: '2026-01-27T15:00:00Z',
  },
];

// Leaderboard entry
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userAvatar: string | null;
  score: number;
  level: number;
  badges: number;
  isCurrentUser?: boolean;
}

// Match history entry
export interface MatchHistoryEntry {
  id: string;
  tournamentId: string;
  tournamentName: string;
  date: string;
  score: number;
  rank: number;
  totalParticipants: number;
  result: 'win' | 'loss' | 'draw';
  medal: MedalTier | null;
}

// Helper functions
export function getTournamentById(id: string): Tournament | undefined {
  return tournaments.find((t) => t.id === id);
}

export function getTournamentsByStatus(status: TournamentStatus): Tournament[] {
  return tournaments.filter((t) => t.status === status);
}

export function getLiveTournaments(): Tournament[] {
  return tournaments.filter((t) => t.status === 'IN_PROGRESS');
}

export function getUpcomingTournaments(): Tournament[] {
  return tournaments.filter((t) => t.status === 'REGISTRATION');
}

export function getCompletedTournaments(): Tournament[] {
  return tournaments.filter((t) => t.status === 'COMPLETED');
}

export function getTournamentParticipants(tournamentId: string): Participant[] {
  return participants
    .filter((p) => p.tournamentId === tournamentId)
    .sort((a, b) => (a.rank || 999) - (b.rank || 999));
}

export function getUserTournamentHistory(userId: string): MatchHistoryEntry[] {
  const userParticipations = participants.filter((p) => p.userId === userId && p.score !== null);

  return userParticipations.map((p) => {
    const tournament = getTournamentById(p.tournamentId);
    const tournamentParticipants = getTournamentParticipants(p.tournamentId);
    const userMedal = userMedals.find(
      (m) => m.userId === userId && m.tournamentId === p.tournamentId,
    );
    const medal = userMedal ? medals.find((m) => m.id === userMedal.medalId) : null;

    return {
      id: p.id,
      tournamentId: p.tournamentId,
      tournamentName: tournament?.name || 'Unknown',
      date: p.finishedAt || p.joinedAt,
      score: p.score || 0,
      rank: p.rank || 0,
      totalParticipants: tournamentParticipants.length,
      result: (p.rank || 0) <= 3 ? 'win' : (p.rank || 0) <= 10 ? 'draw' : 'loss',
      medal: medal?.tier || null,
    };
  });
}

export function getUserMedals(
  userId: string,
): (UserMedal & { medal: Medal; tournament: Tournament })[] {
  return userMedals
    .filter((um) => um.userId === userId)
    .map((um) => ({
      ...um,
      medal: medals.find((m) => m.id === um.medalId)!,
      tournament: getTournamentById(um.tournamentId)!,
    }))
    .filter((um) => um.medal && um.tournament);
}

export function getLeaderboard(tournamentId?: string): LeaderboardEntry[] {
  // Mock global leaderboard
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      userId: 'user-other-1',
      userName: 'Nguyễn Minh Tuấn',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tuan',
      score: 15420,
      level: 25,
      badges: 12,
    },
    {
      rank: 2,
      userId: 'user-other-2',
      userName: 'Trần Thị Mai',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mai',
      score: 14850,
      level: 23,
      badges: 10,
    },
    {
      rank: 3,
      userId: 'user-other-3',
      userName: 'Lê Hoàng Nam',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nam',
      score: 13200,
      level: 21,
      badges: 9,
    },
    {
      rank: 4,
      userId: 'user-other-4',
      userName: 'Phạm Quốc Anh',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=anh',
      score: 12100,
      level: 19,
      badges: 8,
    },
    {
      rank: 5,
      userId: 'user-student',
      userName: 'Lê Văn Học Sinh',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
      score: 11500,
      level: 8,
      badges: 5,
      isCurrentUser: true,
    },
    {
      rank: 6,
      userId: 'user-other-5',
      userName: 'Võ Thị Hương',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=huong',
      score: 10800,
      level: 17,
      badges: 7,
    },
    {
      rank: 7,
      userId: 'user-other-6',
      userName: 'Đặng Văn Khoa',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=khoa',
      score: 9500,
      level: 15,
      badges: 6,
    },
    {
      rank: 8,
      userId: 'user-other-7',
      userName: 'Bùi Minh Châu',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chau',
      score: 8900,
      level: 14,
      badges: 5,
    },
    {
      rank: 9,
      userId: 'user-other-8',
      userName: 'Hoàng Đức Thịnh',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thinh',
      score: 8200,
      level: 13,
      badges: 4,
    },
    {
      rank: 10,
      userId: 'user-other-9',
      userName: 'Ngô Thanh Tâm',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tam',
      score: 7500,
      level: 12,
      badges: 4,
    },
  ];

  return leaderboardData;
}

// Tournament stats for admin
export function getTournamentStats() {
  return {
    total: tournaments.length,
    live: tournaments.filter((t) => t.status === 'IN_PROGRESS').length,
    upcoming: tournaments.filter((t) => t.status === 'REGISTRATION').length,
    completed: tournaments.filter((t) => t.status === 'COMPLETED').length,
    totalParticipants: participants.length,
  };
}

// Format tournament for display cards
export interface TournamentCard {
  id: string;
  name: string;
  description: string;
  banner: string;
  status: TournamentStatus;
  statusLabel: string;
  participants: number;
  maxParticipants: number;
  entryFee: number;
  minLevel: number;
  startsAt: string;
  endsAt: string;
  isLive: boolean;
  isRegistrationOpen: boolean;
}

export function getTournamentCards(): TournamentCard[] {
  return tournaments.map((t) => {
    const tournamentParticipants = participants.filter((p) => p.tournamentId === t.id);
    const statusLabels: Record<TournamentStatus, string> = {
      DRAFT: 'Nháp',
      REGISTRATION: 'Đang mở đăng ký',
      IN_PROGRESS: 'Đang diễn ra',
      COMPLETED: 'Đã kết thúc',
      CANCELLED: 'Đã hủy',
    };

    return {
      id: t.id,
      name: t.name,
      description: t.description || '',
      banner: t.bannerUrl || 'https://placehold.co/800x400/333/white?text=Tournament',
      status: t.status,
      statusLabel: statusLabels[t.status],
      participants: tournamentParticipants.length,
      maxParticipants: t.maxParticipants,
      entryFee: t.entryFee,
      minLevel: t.minLevel,
      startsAt: t.startsAt,
      endsAt: t.endsAt,
      isLive: t.status === 'IN_PROGRESS',
      isRegistrationOpen: t.status === 'REGISTRATION',
    };
  });
}

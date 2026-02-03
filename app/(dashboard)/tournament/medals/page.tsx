import { Award, Lock, Medal, Star, Trophy } from 'lucide-react';

const medals = [
  {
    id: 1,
    name: 'Chiến binh JavaScript',
    description: 'Thắng 10 trận trong chủ đề JavaScript',
    icon: '🏆',
    rarity: 'Gold',
    earned: true,
    earnedDate: '2026-01-15',
    progress: 10,
    total: 10,
  },
  {
    id: 2,
    name: 'React Master',
    description: 'Hoàn thành tất cả khóa học React',
    icon: '⚛️',
    rarity: 'Platinum',
    earned: true,
    earnedDate: '2025-12-20',
    progress: 5,
    total: 5,
  },
  {
    id: 3,
    name: 'Streak Legend',
    description: 'Duy trì streak 30 ngày liên tục',
    icon: '🔥',
    rarity: 'Diamond',
    earned: false,
    progress: 12,
    total: 30,
  },
  {
    id: 4,
    name: 'Speed Demon',
    description: 'Hoàn thành quiz trong dưới 60 giây',
    icon: '⚡',
    rarity: 'Silver',
    earned: true,
    earnedDate: '2026-01-28',
    progress: 1,
    total: 1,
  },
  {
    id: 5,
    name: 'Perfect Score',
    description: 'Đạt 100% trong 5 bài quiz liên tiếp',
    icon: '💯',
    rarity: 'Gold',
    earned: false,
    progress: 3,
    total: 5,
  },
  {
    id: 6,
    name: 'Social Butterfly',
    description: 'Mời 10 bạn bè tham gia',
    icon: '🦋',
    rarity: 'Silver',
    earned: false,
    progress: 4,
    total: 10,
  },
  {
    id: 7,
    name: 'Night Owl',
    description: 'Hoàn thành bài học sau 23:00',
    icon: '🦉',
    rarity: 'Bronze',
    earned: true,
    earnedDate: '2026-01-10',
    progress: 1,
    total: 1,
  },
  {
    id: 8,
    name: 'Tournament Champion',
    description: 'Vô địch một giải đấu',
    icon: '👑',
    rarity: 'Diamond',
    earned: false,
    progress: 0,
    total: 1,
  },
];

const rarityColors: Record<string, string> = {
  Bronze: 'bg-amber-700',
  Silver: 'bg-gray-400',
  Gold: 'bg-yellow-500',
  Platinum: 'bg-cyan-400',
  Diamond: 'bg-purple-500',
};

const rarityBorders: Record<string, string> = {
  Bronze: 'border-amber-700',
  Silver: 'border-gray-400',
  Gold: 'border-yellow-500',
  Platinum: 'border-cyan-400',
  Diamond: 'border-purple-500',
};

export default function MedalsPage() {
  const earnedCount = medals.filter((m) => m.earned).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Huy chương</h1>
          <p className="text-muted-foreground">Bộ sưu tập thành tích của bạn</p>
        </div>
        <div className="border-border bg-primary flex items-center gap-2 border-2 px-4 py-2 shadow-sm">
          <Medal className="h-5 w-5" />
          <span className="font-bold">
            {earnedCount}/{medals.length} đã đạt
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-5">
        {['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'].map((rarity) => {
          const count = medals.filter((m) => m.rarity === rarity && m.earned).length;
          const total = medals.filter((m) => m.rarity === rarity).length;
          return (
            <div
              key={rarity}
              className="border-border bg-background flex items-center gap-3 border-2 p-3 shadow-sm"
            >
              <div
                className={`border-border flex h-10 w-10 items-center justify-center border-2 ${rarityColors[rarity]}`}
              >
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">{rarity}</p>
                <p className="text-muted-foreground text-xs">
                  {count}/{total}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Medals Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {medals.map((medal) => (
          <div
            key={medal.id}
            className={`bg-background relative border-2 p-4 shadow-sm transition-all ${
              medal.earned
                ? `${rarityBorders[medal.rarity]} hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md`
                : 'border-border opacity-60'
            }`}
          >
            {/* Rarity Badge */}
            <span
              className={`absolute top-2 right-2 px-2 py-0.5 text-xs font-medium text-white ${rarityColors[medal.rarity]}`}
            >
              {medal.rarity}
            </span>

            {/* Icon */}
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center border-2 text-3xl ${
                medal.earned ? `${rarityBorders[medal.rarity]} bg-muted` : 'border-border bg-muted'
              }`}
            >
              {medal.earned ? medal.icon : <Lock className="text-muted-foreground h-8 w-8" />}
            </div>

            {/* Info */}
            <div className="mt-3 text-center">
              <h3 className="font-bold">{medal.name}</h3>
              <p className="text-muted-foreground mt-1 text-xs">{medal.description}</p>
            </div>

            {/* Progress or Date */}
            {medal.earned ? (
              <p className="text-muted-foreground mt-3 text-center text-xs">
                Đạt được: {new Date(medal.earnedDate!).toLocaleDateString('vi-VN')}
              </p>
            ) : (
              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Tiến độ</span>
                  <span className="font-medium">
                    {medal.progress}/{medal.total}
                  </span>
                </div>
                <div className="border-border bg-muted h-2 w-full border">
                  <div
                    className={`h-full ${rarityColors[medal.rarity]} transition-all`}
                    style={{
                      width: `${(medal.progress / medal.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

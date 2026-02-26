"use client";

import { Award, Crown, Medal, Star } from "lucide-react";

import { Button, Card, Select } from "@/components/ui";
import { BarChart } from "@/components/ui/charts/BarChart";
import { useTranslation } from "@/lib/providers";

const leaderboardData = [
  { rank: 1, name: "ProCoder99", score: 12500, wins: 85, avatar: "👨‍💻" },
  { rank: 2, name: "ReactMaster", score: 11200, wins: 78, avatar: "⚛️" },
  { rank: 3, name: "JSNinja", score: 10800, wins: 72, avatar: "🥷" },
  { rank: 4, name: "TypeHero", score: 9500, wins: 65, avatar: "📘" },
  { rank: 5, name: "CodeWarrior", score: 9200, wins: 63, avatar: "⚔️" },
  { rank: 6, name: "DevQueen", score: 8900, wins: 60, avatar: "👑" },
  { rank: 7, name: "ByteKing", score: 8600, wins: 58, avatar: "🤴" },
  { rank: 8, name: "AlgoAce", score: 8300, wins: 55, avatar: "🎯" },
  { rank: 9, name: "WebWizard", score: 8000, wins: 52, avatar: "🧙" },
  { rank: 10, name: "StackStar", score: 7800, wins: 50, avatar: "⭐" },
];

const weeklyTopData = [
  { name: "ProCoder99", points: 450 },
  { name: "ReactMaster", points: 380 },
  { name: "JSNinja", points: 350 },
  { name: "TypeHero", points: 320 },
  { name: "CodeWarrior", points: 280 },
];

const myStats = {
  rank: 42,
  score: 3200,
  wins: 28,
  percentile: "Top 15%",
};

export default function LeaderboardPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* My Rank Card */}
      <Card className="border-primary bg-primary/10 shadow-sm">
        <Card.Content className="p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="border-border bg-primary flex h-20 w-20 items-center justify-center border-2 text-4xl font-bold">
              #{myStats.rank}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold">Thứ hạng của bạn</h2>
              <div className="mt-2 flex flex-wrap justify-center gap-4 sm:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold">{myStats.score}</p>
                  <p className="text-muted-foreground text-sm">Điểm</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{myStats.wins}</p>
                  <p className="text-muted-foreground text-sm">Thắng</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{myStats.percentile}</p>
                  <p className="text-muted-foreground text-sm">Percentile</p>
                </div>
              </div>
            </div>
            <Button size="lg">Thách đấu ngay</Button>
          </div>
        </Card.Content>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Leaderboard Table */}
        <Card className="shadow-sm lg:col-span-2">
          <Card.Content className="p-0">
            <div className="border-border bg-muted border-b-2 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Top 10 toàn thời gian</h2>
                <div className="w-40">
                  <Select defaultValue="all">
                    <Select.Trigger className="h-8">
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item value="all">Toàn thời gian</Select.Item>
                      <Select.Item value="month">Tháng này</Select.Item>
                      <Select.Item value="week">Tuần này</Select.Item>
                    </Select.Content>
                  </Select>
                </div>
              </div>
            </div>
            <div className="divide-border divide-y-2">
              {leaderboardData.map((player) => (
                <div
                  key={player.rank}
                  className={`hover:bg-muted/50 flex items-center gap-4 p-4 transition-colors ${
                    player.rank <= 3 ? "bg-primary/5" : ""
                  }`}
                >
                  {/* Rank */}
                  <div className="border-border flex h-10 w-10 shrink-0 items-center justify-center border-2 font-bold">
                    {player.rank === 1 ? (
                      <Crown className="h-5 w-5 text-yellow-500" />
                    ) : player.rank === 2 ? (
                      <Medal className="h-5 w-5 text-gray-400" />
                    ) : player.rank === 3 ? (
                      <Medal className="h-5 w-5 text-amber-600" />
                    ) : (
                      player.rank
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="border-border bg-muted flex h-10 w-10 items-center justify-center border-2 text-xl">
                    {player.avatar}
                  </div>

                  {/* Name */}
                  <div className="flex-1">
                    <p className="font-medium">{player.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {player.wins} thắng
                    </p>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p className="font-bold">{player.score.toLocaleString()}</p>
                    <p className="text-muted-foreground text-sm">điểm</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-border border-t-2 p-4">
              <Button variant="ghost" className="w-full">
                Xem thêm
              </Button>
            </div>
          </Card.Content>
        </Card>

        {/* Weekly Top Chart */}
        <Card className="shadow-sm">
          <Card.Content className="p-0">
            <div className="border-border bg-muted border-b-2 px-6 py-4">
              <h2 className="font-bold">Top tuần này</h2>
            </div>
            <div className="p-4">
              <BarChart
                data={weeklyTopData}
                index="name"
                categories={["points"]}
                alignment="horizontal"
                fillColors={["var(--primary)"]}
                className="h-64"
                valueFormatter={(value) => `${value} pts`}
              />
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Rewards Info */}
      <Card className="bg-muted/50">
        <Card.Content className="p-6">
          <h3 className="mb-4 flex items-center gap-2 font-bold">
            <Award className="h-5 w-5" />
            Phần thưởng xếp hạng
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="border-border bg-background flex items-center gap-3 border-2 p-3">
              <Crown className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-medium">Top 1</p>
                <p className="text-muted-foreground text-sm">5,000 xu/tháng</p>
              </div>
            </div>
            <div className="border-border bg-background flex items-center gap-3 border-2 p-3">
              <Medal className="h-8 w-8 text-gray-400" />
              <div>
                <p className="font-medium">Top 2-3</p>
                <p className="text-muted-foreground text-sm">2,500 xu/tháng</p>
              </div>
            </div>
            <div className="border-border bg-background flex items-center gap-3 border-2 p-3">
              <Star className="h-8 w-8 text-amber-500" />
              <div>
                <p className="font-medium">Top 10</p>
                <p className="text-muted-foreground text-sm">1,000 xu/tháng</p>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

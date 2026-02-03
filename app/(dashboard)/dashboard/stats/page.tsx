'use client';

import { Clock, Target, TrendingUp } from 'lucide-react';

import { AreaChart } from '@/components/retroui/charts/AreaChart';
import { BarChart } from '@/components/retroui/charts/BarChart';
import { LineChart } from '@/components/retroui/charts/LineChart';
import { PieChart } from '@/components/retroui/charts/PieChart';

const learningProgressData = [
  { month: 'T1', completed: 12, inProgress: 5 },
  { month: 'T2', completed: 18, inProgress: 8 },
  { month: 'T3', completed: 25, inProgress: 6 },
  { month: 'T4', completed: 32, inProgress: 10 },
  { month: 'T5', completed: 28, inProgress: 7 },
  { month: 'T6', completed: 35, inProgress: 12 },
];

const weeklyActivityData = [
  { day: 'T2', hours: 2.5 },
  { day: 'T3', hours: 1.8 },
  { day: 'T4', hours: 3.2 },
  { day: 'T5', hours: 2.1 },
  { day: 'T6', hours: 4.0 },
  { day: 'T7', hours: 5.5 },
  { day: 'CN', hours: 3.8 },
];

const tournamentData = [
  { month: 'T1', wins: 5, losses: 3 },
  { month: 'T2', wins: 8, losses: 2 },
  { month: 'T3', wins: 6, losses: 4 },
  { month: 'T4', wins: 12, losses: 3 },
  { month: 'T5', wins: 10, losses: 5 },
  { month: 'T6', wins: 15, losses: 2 },
];

const subjectDistribution = [
  { name: 'JavaScript', value: 35 },
  { name: 'React', value: 25 },
  { name: 'TypeScript', value: 20 },
  { name: 'Node.js', value: 15 },
  { name: 'Khác', value: 5 },
];

export default function StatsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Thống kê</h1>
        <p className="text-muted-foreground">Theo dõi tiến trình học tập và thành tích của bạn</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border-border bg-background border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Tổng giờ học</p>
              <p className="text-2xl font-bold">127.5h</p>
            </div>
            <div className="border-border bg-primary flex h-10 w-10 items-center justify-center border-2">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span>+12% so với tháng trước</span>
          </div>
        </div>

        <div className="border-border bg-background border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Bài học hoàn thành</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <div className="border-border bg-secondary flex h-10 w-10 items-center justify-center border-2 text-white">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span>+8 bài tuần này</span>
          </div>
        </div>

        <div className="border-border bg-background border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Tỷ lệ thắng</p>
              <p className="text-2xl font-bold">73%</p>
            </div>
            <div className="border-border bg-accent flex h-10 w-10 items-center justify-center border-2">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span>+5% so với tháng trước</span>
          </div>
        </div>

        <div className="border-border bg-background border-2 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Streak hiện tại</p>
              <p className="text-2xl font-bold">12 ngày</p>
            </div>
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-400">
              🔥
            </div>
          </div>
          <div className="text-muted-foreground mt-2 flex items-center gap-1 text-sm">
            <span>Kỷ lục: 28 ngày</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Learning Progress */}
        <div className="border-border bg-background border-2 shadow-sm">
          <div className="border-border bg-muted border-b-2 px-6 py-4">
            <h2 className="font-bold">Tiến độ học tập</h2>
            <p className="text-muted-foreground text-sm">Số bài học hoàn thành theo tháng</p>
          </div>
          <div className="p-6">
            <AreaChart
              data={learningProgressData}
              index="month"
              categories={['completed', 'inProgress']}
              fillColors={['var(--primary)', 'var(--secondary)']}
              strokeColors={['var(--foreground)', 'var(--foreground)']}
              className="h-64"
            />
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="border-border bg-background border-2 shadow-sm">
          <div className="border-border bg-muted border-b-2 px-6 py-4">
            <h2 className="font-bold">Hoạt động tuần này</h2>
            <p className="text-muted-foreground text-sm">Số giờ học mỗi ngày</p>
          </div>
          <div className="p-6">
            <BarChart
              data={weeklyActivityData}
              index="day"
              categories={['hours']}
              fillColors={['var(--primary)']}
              className="h-64"
              valueFormatter={(value) => `${value}h`}
            />
          </div>
        </div>

        {/* Tournament Performance */}
        <div className="border-border bg-background border-2 shadow-sm">
          <div className="border-border bg-muted border-b-2 px-6 py-4">
            <h2 className="font-bold">Thành tích thách đấu</h2>
            <p className="text-muted-foreground text-sm">Thắng/Thua theo tháng</p>
          </div>
          <div className="p-6">
            <LineChart
              data={tournamentData}
              index="month"
              categories={['wins', 'losses']}
              strokeColors={['var(--primary)', 'var(--destructive)']}
              className="h-64"
            />
          </div>
        </div>

        {/* Subject Distribution */}
        <div className="border-border bg-background border-2 shadow-sm">
          <div className="border-border bg-muted border-b-2 px-6 py-4">
            <h2 className="font-bold">Phân bố chủ đề</h2>
            <p className="text-muted-foreground text-sm">Thời gian học theo chủ đề</p>
          </div>
          <div className="flex items-center justify-center p-6">
            <PieChart
              data={subjectDistribution}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={100}
              className="h-64"
              valueFormatter={(value) => `${value}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

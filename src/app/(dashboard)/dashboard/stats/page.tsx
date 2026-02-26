"use client";

import { Clock, Target, TrendingUp } from "lucide-react";

import { Card } from "@/components/ui";
import { AreaChart } from "@/components/ui/charts/AreaChart";
import { BarChart } from "@/components/ui/charts/BarChart";
import { LineChart } from "@/components/ui/charts/LineChart";
import { PieChart } from "@/components/ui/charts/PieChart";
import { useTranslation } from "@/lib/providers";

const learningProgressData = [
  { month: "T1", completed: 12, inProgress: 5 },
  { month: "T2", completed: 18, inProgress: 8 },
  { month: "T3", completed: 25, inProgress: 6 },
  { month: "T4", completed: 32, inProgress: 10 },
  { month: "T5", completed: 28, inProgress: 7 },
  { month: "T6", completed: 35, inProgress: 12 },
];

const weeklyActivityData = [
  { day: "T2", hours: 2.5 },
  { day: "T3", hours: 1.8 },
  { day: "T4", hours: 3.2 },
  { day: "T5", hours: 2.1 },
  { day: "T6", hours: 4.0 },
  { day: "T7", hours: 5.5 },
  { day: "CN", hours: 3.8 },
];

const tournamentData = [
  { month: "T1", wins: 5, losses: 3 },
  { month: "T2", wins: 8, losses: 2 },
  { month: "T3", wins: 6, losses: 4 },
  { month: "T4", wins: 12, losses: 3 },
  { month: "T5", wins: 10, losses: 5 },
  { month: "T6", wins: 15, losses: 2 },
];

const subjectDistribution = [
  { name: "JavaScript", value: 35 },
  { name: "React", value: 25 },
  { name: "TypeScript", value: 20 },
  { name: "Node.js", value: 15 },
  { name: "Khác", value: 5 },
];

export default function StatsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-8">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm">
            <Card.Content className="p-4">
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
            </Card.Content>
          </Card>

          <Card className="shadow-sm">
            <Card.Content className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">
                    Bài học hoàn thành
                  </p>
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
            </Card.Content>
          </Card>

          <Card className="shadow-sm">
            <Card.Content className="p-4">
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
            </Card.Content>
          </Card>

          <Card className="shadow-sm">
            <Card.Content className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">
                    Streak hiện tại
                  </p>
                  <p className="text-2xl font-bold">12 ngày</p>
                </div>
                <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-orange-400">
                  🔥
                </div>
              </div>
              <div className="text-muted-foreground mt-2 flex items-center gap-1 text-sm">
                <span>Kỷ lục: 28 ngày</span>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Learning Progress */}
          <Card className="shadow-sm">
            <Card.Content className="p-0">
              <div className="border-border bg-muted border-b-2 px-6 py-4">
                <h2 className="font-bold">Tiến độ học tập</h2>
                <p className="text-muted-foreground text-sm">
                  Số bài học hoàn thành theo tháng
                </p>
              </div>
              <div className="p-6">
                <AreaChart
                  data={learningProgressData}
                  index="month"
                  categories={["completed", "inProgress"]}
                  fillColors={["var(--primary)", "var(--secondary)"]}
                  strokeColors={["var(--foreground)", "var(--foreground)"]}
                  className="h-64"
                />
              </div>
            </Card.Content>
          </Card>

          {/* Weekly Activity */}
          <Card className="shadow-sm">
            <Card.Content className="p-0">
              <div className="border-border bg-muted border-b-2 px-6 py-4">
                <h2 className="font-bold">Hoạt động tuần này</h2>
                <p className="text-muted-foreground text-sm">
                  Số giờ học mỗi ngày
                </p>
              </div>
              <div className="p-6">
                <BarChart
                  data={weeklyActivityData}
                  index="day"
                  categories={["hours"]}
                  fillColors={["var(--primary)"]}
                  className="h-64"
                  valueFormatter={(value) => `${value}h`}
                />
              </div>
            </Card.Content>
          </Card>

          {/* Tournament Performance */}
          <Card className="shadow-sm">
            <Card.Content className="p-0">
              <div className="border-border bg-muted border-b-2 px-6 py-4">
                <h2 className="font-bold">Thành tích thách đấu</h2>
                <p className="text-muted-foreground text-sm">
                  Thắng/Thua theo tháng
                </p>
              </div>
              <div className="p-6">
                <LineChart
                  data={tournamentData}
                  index="month"
                  categories={["wins", "losses"]}
                  strokeColors={["var(--primary)", "var(--destructive)"]}
                  className="h-64"
                />
              </div>
            </Card.Content>
          </Card>

          {/* Subject Distribution */}
          <Card className="shadow-sm">
            <Card.Content className="p-0">
              <div className="border-border bg-muted border-b-2 px-6 py-4">
                <h2 className="font-bold">Phân bố chủ đề</h2>
                <p className="text-muted-foreground text-sm">
                  Thời gian học theo chủ đề
                </p>
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
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}

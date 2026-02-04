"use client";

import { ArrowDownRight, ArrowUpRight, Coins, TrendingUp } from "lucide-react";

import { AreaChart } from "@/components/retroui/charts/AreaChart";
import { PieChart } from "@/components/retroui/charts/PieChart";
import { useTranslation } from "@/lib/providers";

import { PageLayout } from "../../_components/page-layout";

const coinHistory = [
  { date: "T1", balance: 1500, earned: 200, spent: 50 },
  { date: "T2", balance: 1800, earned: 400, spent: 100 },
  { date: "T3", balance: 2200, earned: 500, spent: 100 },
  { date: "T4", balance: 2600, earned: 450, spent: 50 },
];

const sourceData = [
  { name: "Thách đấu", value: 1500, color: "#AAFC3D" },
  { name: "Hoàn thành khóa", value: 800, color: "#5252FF" },
  { name: "Streak bonus", value: 400, color: "#FF00FF" },
  { name: "Sự kiện", value: 300, color: "#FFC107" },
];

const transactions = [
  {
    id: 1,
    type: "earn",
    description: "Thắng thách đấu JavaScript",
    amount: 50,
    date: "2026-02-03T14:30:00",
  },
  {
    id: 2,
    type: "spend",
    description: "Đổi khóa học Premium",
    amount: -500,
    date: "2026-02-02T10:15:00",
  },
  {
    id: 3,
    type: "earn",
    description: "Hoàn thành bài quiz",
    amount: 20,
    date: "2026-02-01T19:45:00",
  },
  {
    id: 4,
    type: "earn",
    description: "Streak 7 ngày bonus",
    amount: 100,
    date: "2026-01-31T00:00:00",
  },
  {
    id: 5,
    type: "spend",
    description: "Đổi avatar mới",
    amount: -150,
    date: "2026-01-30T16:20:00",
  },
  {
    id: 6,
    type: "earn",
    description: "Top 10 bảng xếp hạng",
    amount: 200,
    date: "2026-01-29T12:00:00",
  },
];

const stats = {
  balance: 2650,
  earnedThisMonth: 850,
  spentThisMonth: 650,
  pendingRewards: 100,
};

export default function CoinsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("rewards.coins.title")}
      description={t("rewards.coins.description")}
    >
      <div className="space-y-8">
        {/* Balance Card */}
        <div className="border-primary bg-primary/20 border-2 p-6 shadow-sm">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="border-border bg-primary flex h-20 w-20 items-center justify-center border-2 text-4xl">
              <Coins className="h-10 w-10" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-muted-foreground text-sm font-medium">
                Số dư hiện tại
              </p>
              <p className="text-4xl font-bold">
                {stats.balance.toLocaleString()} xu
              </p>
              {stats.pendingRewards > 0 && (
                <p className="text-muted-foreground mt-1 text-sm">
                  +{stats.pendingRewards} xu đang chờ xử lý
                </p>
              )}
            </div>
            <button className="border-border bg-background border-2 px-6 py-3 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
              Đổi quà ngay
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border-border bg-background border-2 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  Kiếm được tháng này
                </p>
                <p className="text-xl font-bold text-green-600">
                  +{stats.earnedThisMonth.toLocaleString()} xu
                </p>
              </div>
            </div>
          </div>
          <div className="border-border bg-background border-2 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-red-500">
                <ArrowDownRight className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  Đã chi tháng này
                </p>
                <p className="text-xl font-bold text-red-600">
                  -{stats.spentThisMonth.toLocaleString()} xu
                </p>
              </div>
            </div>
          </div>
          <div className="border-border bg-background border-2 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="border-border bg-secondary flex h-10 w-10 items-center justify-center border-2">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Tháng này</p>
                <p className="text-xl font-bold">
                  {stats.earnedThisMonth - stats.spentThisMonth > 0 ? "+" : ""}
                  {(
                    stats.earnedThisMonth - stats.spentThisMonth
                  ).toLocaleString()}{" "}
                  xu
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Balance Chart */}
          <div className="border-border bg-background border-2 shadow-sm lg:col-span-2">
            <div className="border-border bg-muted border-b-2 px-6 py-4">
              <h2 className="font-bold">Biến động số dư</h2>
            </div>
            <div className="p-4">
              <AreaChart
                data={coinHistory}
                index="date"
                categories={["balance"]}
                fillColors={["var(--primary)"]}
                strokeColors={["var(--secondary)"]}
                className="h-64"
                valueFormatter={(value) => `${value} xu`}
              />
            </div>
          </div>

          {/* Source Breakdown */}
          <div className="border-border bg-background border-2 shadow-sm">
            <div className="border-border bg-muted border-b-2 px-6 py-4">
              <h2 className="font-bold">Nguồn thu</h2>
            </div>
            <div className="p-4">
              <PieChart
                data={sourceData}
                dataKey="value"
                nameKey="name"
                colors={sourceData.map((s) => s.color)}
                className="h-48"
              />
              <div className="mt-4 space-y-2">
                {sourceData.map((source) => (
                  <div
                    key={source.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3"
                        style={{ backgroundColor: source.color }}
                      />
                      <span>{source.name}</span>
                    </div>
                    <span className="font-medium">{source.value} xu</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="border-border bg-background border-2 shadow-sm">
          <div className="border-border bg-muted border-b-2 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Lịch sử giao dịch</h2>
              <select className="border-border bg-background border px-2 py-1 text-sm">
                <option>Tất cả</option>
                <option>Nhận xu</option>
                <option>Chi xu</option>
              </select>
            </div>
          </div>
          <div className="divide-border divide-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="hover:bg-muted/50 flex items-center gap-4 p-4 transition-colors"
              >
                <div
                  className={`border-border flex h-10 w-10 shrink-0 items-center justify-center border-2 ${
                    tx.type === "earn" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {tx.type === "earn" ? (
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-muted-foreground text-sm">
                    {new Date(tx.date).toLocaleDateString("vi-VN", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span
                  className={`text-lg font-bold ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {tx.amount > 0 ? "+" : ""}
                  {tx.amount} xu
                </span>
              </div>
            ))}
          </div>
          <div className="border-border border-t-2 p-4">
            <button className="text-muted-foreground hover:text-foreground w-full text-center text-sm font-medium">
              Xem tất cả giao dịch
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

"use client";

import { Coins, Gift, Star } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/lib/auth";
import {
  getCoinStats,
  getRedeemedItems,
  getRewardCards,
} from "@/lib/mock/rewards";
import { useTranslation } from "@/lib/providers";

import { PageLayout } from "../_components/page-layout";

export default function RewardsPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) return null;

  const rewardCards = getRewardCards(user.id);
  const coinStats = getCoinStats(user.id);
  const redeemedItems = getRedeemedItems(user.id);
  const featuredRewards = rewardCards
    .filter((r) => (r.stock ?? 0) > 0)
    .slice(0, 4);

  return (
    <PageLayout
      title={t("rewards.title")}
      description={t("rewards.description")}
      actions={
        <div className="border-border bg-primary flex items-center gap-2 border-2 px-4 py-2 shadow-sm">
          <Coins className="h-5 w-5" />
          <span className="font-bold">{user.coins.toLocaleString()} xu</span>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border-border bg-background border-2 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="border-border bg-primary flex h-10 w-10 items-center justify-center border-2">
                <Coins className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Xu hiện có</p>
                <p className="text-xl font-bold">
                  {user.coins.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="border-border bg-background border-2 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="border-border bg-secondary flex h-10 w-10 items-center justify-center border-2">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Đã đổi</p>
                <p className="text-xl font-bold">{redeemedItems.length} quà</p>
              </div>
            </div>
          </div>
          <div className="border-border bg-background border-2 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="border-border bg-accent flex h-10 w-10 items-center justify-center border-2">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Tổng xu đã tiêu</p>
                <p className="text-xl font-bold">
                  {coinStats.totalSpent.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* My Redeemed Items */}
        {redeemedItems.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Quà đã đổi</h2>
              <Link
                href="/rewards/history"
                className="text-primary text-sm hover:underline"
              >
                Xem tất cả →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {redeemedItems.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="border-border bg-muted/50 border-2 p-4 shadow-sm"
                >
                  <div className="border-border bg-background mb-3 flex h-16 items-center justify-center border-2 text-3xl">
                    {item.image || "🎁"}
                  </div>
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Đổi ngày{" "}
                    {new Date(item.acquiredAt).toLocaleDateString("vi-VN")}
                  </p>
                  <div
                    className={`mt-2 inline-block border px-2 py-0.5 text-xs font-medium ${
                      item.status === "ACTIVE"
                        ? "border-green-500 bg-green-500/10 text-green-500"
                        : item.status === "APPLIED"
                          ? "border-blue-500 bg-blue-500/10 text-blue-500"
                          : "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {item.statusLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Rewards */}
        <div>
          <h2 className="mb-4 text-xl font-bold">Quà nổi bật</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredRewards.map((reward) => {
              const canAfford = user.coins >= reward.cost;
              const isInStock = reward.inStock;
              return (
                <div
                  key={reward.id}
                  className="border-border bg-background border-2 p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="border-border bg-muted mb-3 flex h-24 items-center justify-center border-2 text-4xl">
                    {reward.image || "🎁"}
                  </div>
                  <h3 className="font-bold">{reward.name}</h3>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                    {reward.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <div
                      className={`flex items-center gap-1 text-sm ${!canAfford ? "text-muted-foreground" : ""}`}
                    >
                      <Coins className="h-4 w-4" />
                      <span className="font-medium">
                        {reward.cost.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {reward.stock !== null
                        ? `Còn ${reward.stock}`
                        : "Không giới hạn"}
                    </span>
                  </div>
                  <button
                    disabled={!canAfford || !isInStock || reward.owned}
                    className={`border-border mt-3 w-full border-2 py-2 font-medium shadow-xs transition-all ${
                      canAfford && isInStock && !reward.owned
                        ? "bg-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {reward.owned
                      ? "Đã sở hữu"
                      : !isInStock
                        ? "Hết hàng"
                        : !canAfford
                          ? "Không đủ xu"
                          : "Đổi ngay"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* All Rewards */}
        <div>
          <h2 className="mb-4 text-xl font-bold">Tất cả phần quà</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rewardCards.slice(4).map((reward) => {
              const canAfford = user.coins >= reward.cost;
              const isInStock = reward.inStock;
              return (
                <div
                  key={reward.id}
                  className="border-border bg-background border-2 p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="border-border bg-muted mb-3 flex h-24 items-center justify-center border-2 text-4xl">
                    {reward.image || "🎁"}
                  </div>
                  <h3 className="font-bold">{reward.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <div
                      className={`flex items-center gap-1 text-sm ${!canAfford ? "text-muted-foreground" : ""}`}
                    >
                      <Coins className="h-4 w-4" />
                      <span className="font-medium">
                        {reward.cost.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {reward.stock !== null
                        ? `Còn ${reward.stock}`
                        : "Không giới hạn"}
                    </span>
                  </div>
                  <button
                    disabled={!canAfford || !isInStock || reward.owned}
                    className={`border-border mt-3 w-full border-2 py-2 font-medium shadow-xs transition-all ${
                      canAfford && isInStock && !reward.owned
                        ? "bg-primary hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {reward.owned
                      ? "Đã sở hữu"
                      : !isInStock
                        ? "Hết hàng"
                        : !canAfford
                          ? "Không đủ xu"
                          : "Đổi ngay"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to earn */}
        <div className="border-border bg-muted/50 border-2 p-6">
          <h2 className="mb-4 text-xl font-bold">Cách kiếm xu</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <div className="border-border bg-primary flex h-8 w-8 shrink-0 items-center justify-center border-2 font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Hoàn thành bài học</p>
                <p className="text-muted-foreground text-sm">+10 xu/bài</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="border-border bg-primary flex h-8 w-8 shrink-0 items-center justify-center border-2 font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Thắng thách đấu</p>
                <p className="text-muted-foreground text-sm">+50 xu/trận</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="border-border bg-primary flex h-8 w-8 shrink-0 items-center justify-center border-2 font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Streak hàng ngày</p>
                <p className="text-muted-foreground text-sm">+20 xu/ngày</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="border-border bg-primary flex h-8 w-8 shrink-0 items-center justify-center border-2 font-bold">
                4
              </div>
              <div>
                <p className="font-medium">Mời bạn bè</p>
                <p className="text-muted-foreground text-sm">+100 xu/người</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

"use client";

import { Coins, Gift, Star } from "lucide-react";
import Link from "next/link";

import { Badge, Button, Card } from "@/components/ui";
import { getCoinStats, getRedeemedItems, getRewardCards } from "@/data/rewards";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "@/lib/providers";

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
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="border-border bg-primary flex items-center gap-2 border-2 px-4 py-2 shadow-sm">
          <Coins className="h-5 w-5" />
          <span className="font-bold">
            {user.coins.toLocaleString()} {t("dashboard.coins")}
          </span>
        </div>
      </div>
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="shadow-sm">
            <Card.Content className="flex items-center gap-3 p-4">
              <div className="border-border bg-primary flex h-10 w-10 items-center justify-center border-2">
                <Coins className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("rewards.redeemed.currentCoins")}
                </p>
                <p className="text-xl font-bold">
                  {user.coins.toLocaleString()}
                </p>
              </div>
            </Card.Content>
          </Card>
          <Card className="shadow-sm">
            <Card.Content className="flex items-center gap-3 p-4">
              <div className="border-border bg-secondary flex h-10 w-10 items-center justify-center border-2">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("rewards.redeemed.redeemedCount")}
                </p>
                <p className="text-xl font-bold">{redeemedItems.length}</p>
              </div>
            </Card.Content>
          </Card>
          <Card className="shadow-sm">
            <Card.Content className="flex items-center gap-3 p-4">
              <div className="border-border bg-accent flex h-10 w-10 items-center justify-center border-2">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">
                  {t("rewards.redeemed.totalSpent")}
                </p>
                <p className="text-xl font-bold">
                  {coinStats.totalSpent.toLocaleString()}
                </p>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* My Redeemed Items */}
        {redeemedItems.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {t("rewards.redeemed.redeemedTitle")}
              </h2>
              <Link
                href="/rewards/history"
                className="text-primary text-sm hover:underline"
              >
                {t("common.viewAll")} →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {redeemedItems.slice(0, 4).map((item) => (
                <Card key={item.id} className="bg-muted/50 shadow-sm">
                  <Card.Content className="p-4">
                    <div className="border-border bg-background mb-3 flex h-16 items-center justify-center border-2 text-3xl">
                      {item.image || "🎁"}
                    </div>
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {t("rewards.redeemed.redeemedOn")}{" "}
                      {new Date(item.acquiredAt).toLocaleDateString("vi-VN")}
                    </p>
                    <Badge
                      variant={
                        item.status === "ACTIVE"
                          ? "default"
                          : item.status === "APPLIED"
                            ? "surface"
                            : "outline"
                      }
                      className={`mt-2 ${
                        item.status === "ACTIVE"
                          ? "border-green-500 bg-green-500/10 text-green-500"
                          : item.status === "APPLIED"
                            ? "border-blue-500 bg-blue-500/10 text-blue-500"
                            : "border-yellow-500 bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {t(`rewards.redeemed.status.${item.status}`)}
                    </Badge>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Featured Rewards */}
        <div>
          <h2 className="mb-4 text-xl font-bold">
            {t("rewards.redeemed.featuredTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredRewards.map((reward) => {
              const canAfford = user.coins >= reward.cost;
              const isInStock = reward.inStock;
              return (
                <Card
                  key={reward.id}
                  className="shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Card.Content className="p-4">
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
                          ? t("rewards.redeemed.stock.left", {
                              count: reward.stock,
                            })
                          : t("rewards.redeemed.stock.unlimited")}
                      </span>
                    </div>
                    <Button
                      disabled={!canAfford || !isInStock || reward.owned}
                      variant={
                        canAfford && isInStock && !reward.owned
                          ? "default"
                          : "secondary"
                      }
                      className="mt-3 w-full"
                    >
                      {reward.owned
                        ? t("rewards.redeemed.actions.owned")
                        : !isInStock
                          ? t("rewards.redeemed.actions.outOfStock")
                          : !canAfford
                            ? t("rewards.redeemed.actions.insufficientCoins")
                            : t("rewards.redeemed.actions.redeem")}
                    </Button>
                  </Card.Content>
                </Card>
              );
            })}
          </div>
        </div>

        {/* All Rewards */}
        <div>
          <h2 className="mb-4 text-xl font-bold">
            {t("rewards.redeemed.allRewardsTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rewardCards.slice(4).map((reward) => {
              const canAfford = user.coins >= reward.cost;
              const isInStock = reward.inStock;
              return (
                <Card
                  key={reward.id}
                  className="shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Card.Content className="p-4">
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
                          ? t("rewards.redeemed.stock.left", {
                              count: reward.stock,
                            })
                          : t("rewards.redeemed.stock.unlimited")}
                      </span>
                    </div>
                    <Button
                      disabled={!canAfford || !isInStock || reward.owned}
                      variant={
                        canAfford && isInStock && !reward.owned
                          ? "default"
                          : "secondary"
                      }
                      className="mt-3 w-full"
                    >
                      {reward.owned
                        ? t("rewards.redeemed.actions.owned")
                        : !isInStock
                          ? t("rewards.redeemed.actions.outOfStock")
                          : !canAfford
                            ? t("rewards.redeemed.actions.insufficientCoins")
                            : t("rewards.redeemed.actions.redeem")}
                    </Button>
                  </Card.Content>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How to earn */}
        <Card className="bg-muted/50 border-2">
          <Card.Content className="p-6">
            <h2 className="mb-4 text-xl font-bold">
              {t("rewards.redeemed.howToEarn")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3">
                <div className="border-border bg-primary flex h-8 w-8 shrink-0 items-center justify-center border-2 font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">
                    {t("rewards.redeemed.earnMethods.lesson")}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t("rewards.redeemed.earnMethods.lessonDesc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="border-border bg-primary flex h-8 w-8 shrink-0 items-center justify-center border-2 font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">
                    {t("rewards.redeemed.earnMethods.tournament")}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t("rewards.redeemed.earnMethods.tournamentDesc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="border-border bg-primary flex h-8 w-8 shrink-0 items-center justify-center border-2 font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">
                    {t("rewards.redeemed.earnMethods.streak")}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t("rewards.redeemed.earnMethods.streakDesc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="border-border bg-primary flex h-8 w-8 shrink-0 items-center justify-center border-2 font-bold">
                  4
                </div>
                <div>
                  <p className="font-medium">
                    {t("rewards.redeemed.earnMethods.invite")}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t("rewards.redeemed.earnMethods.inviteDesc")}
                  </p>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

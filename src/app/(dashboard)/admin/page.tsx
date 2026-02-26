"use client";

import {
  AlertCircle,
  BookOpen,
  Building2,
  CheckCircle,
  FileText,
  GraduationCap,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { Avatar, Badge, Card } from "@/components/ui";
import {
  getAdminDashboardCards,
  getAdminUserList,
  getRecentActivity,
  getSystemStats,
  getTenantStats,
} from "@/data/admin-stats";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "@/lib/providers";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) return null;

  const isRootAdmin = user.role.code === "root-admin";
  const systemStats = isRootAdmin ? getSystemStats() : null;
  const tenantStats = getTenantStats(user.tenantId);
  const dashboardCards = getAdminDashboardCards(
    user.role.code as "root-admin" | "tenant-admin",
    user.tenantId,
  );
  const recentUsers = getAdminUserList(
    isRootAdmin ? undefined : user.tenantId,
  ).slice(0, 4);
  const recentActivity = getRecentActivity(user.tenantId).slice(0, 5);

  const StatIcon = ({
    icon: Icon,
    color,
  }: {
    icon: React.ElementType;
    color: string;
  }) => (
    <div
      className={`border-border flex h-10 w-10 items-center justify-center border-2 ${color}`}
    >
      <Icon className="h-5 w-5 text-white" />
    </div>
  );

  // Stats for display
  const stats =
    isRootAdmin && systemStats
      ? [
          {
            label: t("admin.dashboard.stats.totalTenants"),
            value: systemStats.totalTenants.toLocaleString(),
            change: "+2",
            icon: Building2,
            color: "bg-purple-500",
          },
          {
            label: t("admin.dashboard.stats.totalUsers"),
            value: systemStats.totalUsers.toLocaleString(),
            change: `+${systemStats.newUsersToday}`,
            icon: Users,
            color: "bg-blue-500",
          },
          {
            label: t("admin.dashboard.stats.activeUsers"),
            value: systemStats.activeUsers.toLocaleString(),
            change: "+18%",
            icon: TrendingUp,
            color: "bg-green-500",
          },
          {
            label: t("admin.dashboard.stats.content"),
            value: systemStats.totalLessons?.toLocaleString() || "0",
            change: "+5",
            icon: FileText,
            color: "bg-orange-500",
          },
        ]
      : tenantStats
        ? [
            {
              label: t("admin.dashboard.stats.students"),
              value: tenantStats.students.toLocaleString(),
              change: "+8",
              icon: GraduationCap,
              color: "bg-blue-500",
            },
            {
              label: t("admin.dashboard.stats.teachers"),
              value: tenantStats.teachers.toLocaleString(),
              change: "+1",
              icon: Users,
              color: "bg-purple-500",
            },
            {
              label: t("admin.dashboard.stats.lessons"),
              value: tenantStats.totalLessons.toLocaleString(),
              change: "+12",
              icon: BookOpen,
              color: "bg-green-500",
            },
            {
              label: t("admin.dashboard.stats.tournaments"),
              value: tenantStats.activeTournaments.toLocaleString(),
              change: "+2",
              icon: Trophy,
              color: "bg-orange-500",
            },
          ]
        : [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {isRootAdmin
            ? t("admin.dashboard.systemTitle")
            : t("admin.dashboard.title")}
        </h1>
        <p className="text-muted-foreground">
          {isRootAdmin
            ? t("admin.dashboard.systemDescription")
            : t("admin.dashboard.description", {
                name: tenantStats?.tenantName || "tenant",
              })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-sm">
            <Card.Content className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p
                    className={`text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                  >
                    {stat.change} {t("admin.dashboard.stats.change")}
                  </p>
                </div>
                <StatIcon icon={stat.icon} color={stat.color} />
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card, index) => {
          const CardWrapper = card.href ? Link : "div";
          const Icon = card.icon;
          return (
            <CardWrapper
              key={index}
              href={card.href || "#"}
              className={card.href ? "" : ""}
            >
              <Card className="h-full shadow-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-md">
                <Card.Content className="flex items-center gap-3 p-4">
                  <div
                    className={`border-border flex h-10 w-10 items-center justify-center border-2 ${card.color || "bg-primary"}`}
                  >
                    <span className="text-lg">{Icon}</span>
                  </div>
                  <div>
                    <p className="font-medium">{t(card.title)}</p>
                    <p className="text-muted-foreground text-sm">
                      {typeof card.value === "number"
                        ? card.value.toLocaleString()
                        : card.value}
                    </p>
                    {card.change && card.changeLabel && (
                      <p className="text-xs text-green-500">
                        +{card.change} {t(card.changeLabel)}
                      </p>
                    )}
                  </div>
                </Card.Content>
              </Card>
            </CardWrapper>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <Card className="shadow-sm">
          <Card.Content className="p-0">
            <div className="border-border flex items-center justify-between border-b-2 p-4">
              <h2 className="text-xl font-bold">
                {t("admin.dashboard.stats.newUsers")}
              </h2>
              <Link
                href="/admin/users"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                {t("admin.dashboard.stats.viewAll")} →
              </Link>
            </div>
            <div className="divide-border divide-y-2">
              {recentUsers.map((userItem) => (
                <div
                  key={userItem.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {userItem.avatar ? (
                        <Avatar.Image
                          src={userItem.avatar}
                          alt={userItem.name}
                        />
                      ) : null}
                      <Avatar.Fallback>
                        <Users className="h-4 w-4" />
                      </Avatar.Fallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{userItem.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {userItem.email}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      userItem.role === "teacher"
                        ? "surface"
                        : userItem.role === "student"
                          ? "surface"
                          : userItem.role === "parent"
                            ? "surface"
                            : "default"
                    }
                    className={` ${
                      userItem.role === "teacher"
                        ? "border-purple-500 bg-purple-500/10 text-purple-500"
                        : userItem.role === "student"
                          ? "border-blue-500 bg-blue-500/10 text-blue-500"
                          : userItem.role === "parent"
                            ? "border-green-500 bg-green-500/10 text-green-500"
                            : ""
                    } `}
                  >
                    {t(`admin.roles.${userItem.role}`)}
                  </Badge>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-sm">
          <Card.Content className="p-0">
            <div className="border-border flex items-center justify-between border-b-2 p-4">
              <h2 className="text-xl font-bold">
                {t("admin.dashboard.stats.recentActivity")}
              </h2>
            </div>
            <div className="divide-border divide-y-2">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-4">
                  <div
                    className={`border-border flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                      activity.type === "error"
                        ? "bg-destructive text-destructive-foreground"
                        : activity.type === "warning"
                          ? "bg-yellow-500 text-white"
                          : activity.type === "success"
                            ? "bg-green-500 text-white"
                            : "bg-accent"
                    }`}
                  >
                    {activity.type === "error" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : activity.type === "success" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : activity.type === "warning" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-muted-foreground text-sm">
                      {activity.description}
                    </p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

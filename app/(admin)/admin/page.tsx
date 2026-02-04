"use client";

import {
  AlertCircle,
  BookOpen,
  Building2,
  FileText,
  GraduationCap,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/lib/auth";
import {
  getAdminDashboardCards,
  getAdminUserList,
  getRecentActivity,
  getSystemStats,
  getTenantStats,
} from "@/lib/mock/admin-stats";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const isRootAdmin = user.role === "root-admin";
  const systemStats = isRootAdmin ? getSystemStats() : null;
  const tenantStats = getTenantStats(user.tenantId);
  const dashboardCards = getAdminDashboardCards(
    user.role as "root-admin" | "tenant-admin",
    user.tenantId,
  );
  const recentUsers = getAdminUserList(
    isRootAdmin ? undefined : user.tenantId,
  ).slice(0, 4);
  const recentActivity = getRecentActivity(user.tenantId).slice(0, 5);

  // Stats for display
  const stats =
    isRootAdmin && systemStats
      ? [
          {
            label: "Tổng Tenant",
            value: systemStats.totalTenants.toLocaleString(),
            change: "+2",
            icon: Building2,
            color: "bg-purple-500",
          },
          {
            label: "Tổng người dùng",
            value: systemStats.totalUsers.toLocaleString(),
            change: `+${systemStats.newUsersToday}`,
            icon: Users,
            color: "bg-blue-500",
          },
          {
            label: "Hoạt động hôm nay",
            value: systemStats.activeUsers.toLocaleString(),
            change: "+18%",
            icon: TrendingUp,
            color: "bg-green-500",
          },
          {
            label: "Nội dung",
            value: systemStats.totalLessons?.toLocaleString() || "0",
            change: "+5",
            icon: FileText,
            color: "bg-orange-500",
          },
        ]
      : tenantStats
        ? [
            {
              label: "Học sinh",
              value: tenantStats.students.toLocaleString(),
              change: "+8",
              icon: GraduationCap,
              color: "bg-blue-500",
            },
            {
              label: "Giáo viên",
              value: tenantStats.teachers.toLocaleString(),
              change: "+1",
              icon: Users,
              color: "bg-purple-500",
            },
            {
              label: "Bài học",
              value: tenantStats.totalLessons.toLocaleString(),
              change: "+12",
              icon: BookOpen,
              color: "bg-green-500",
            },
            {
              label: "Giải đấu",
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
          {isRootAdmin ? "System Dashboard" : "Admin Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {isRootAdmin
            ? "Tổng quan hệ thống toàn bộ các tenant"
            : `Quản lý ${tenantStats?.tenantName || "tenant"}`}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border-border bg-card border-2 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p
                  className={`text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                >
                  {stat.change} so với tuần trước
                </p>
              </div>
              <div
                className={`border-border flex h-10 w-10 items-center justify-center border-2 ${stat.color}`}
              >
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card, index) => {
          const CardWrapper = card.href ? Link : "div";
          return (
            <CardWrapper
              key={index}
              href={card.href || "#"}
              className="border-border bg-card border-2 p-4 shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`border-border flex h-10 w-10 items-center justify-center border-2 ${card.color || "bg-primary"}`}
                >
                  <span className="text-lg">{card.icon}</span>
                </div>
                <div>
                  <p className="font-medium">{card.title}</p>
                  <p className="text-muted-foreground text-sm">{card.value}</p>
                </div>
              </div>
            </CardWrapper>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="border-border bg-card border-2 shadow-sm">
          <div className="border-border flex items-center justify-between border-b-2 p-4">
            <h2 className="text-xl font-bold">Người dùng mới</h2>
            <Link
              href="/admin/users"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="divide-border divide-y-2">
            {recentUsers.map((userItem) => (
              <div
                key={userItem.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="border-border bg-muted flex h-8 w-8 items-center justify-center overflow-hidden border-2">
                    {userItem.avatar ? (
                      <span className="text-lg">{userItem.avatar}</span>
                    ) : (
                      <Users className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{userItem.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {userItem.email}
                    </p>
                  </div>
                </div>
                <span
                  className={`border px-2 py-0.5 text-xs ${
                    userItem.role === "teacher"
                      ? "border-purple-500 bg-purple-500/10 text-purple-500"
                      : userItem.role === "student"
                        ? "border-blue-500 bg-blue-500/10 text-blue-500"
                        : userItem.role === "parent"
                          ? "border-green-500 bg-green-500/10 text-green-500"
                          : "border-border bg-muted"
                  }`}
                >
                  {userItem.roleLabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="border-border bg-card border-2 shadow-sm">
          <div className="border-border flex items-center justify-between border-b-2 p-4">
            <h2 className="text-xl font-bold">Hoạt động gần đây</h2>
          </div>
          <div className="divide-border divide-y-2">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-4">
                <div
                  className={`border-border flex h-8 w-8 shrink-0 items-center justify-center border-2 ${
                    activity.type === "error"
                      ? "bg-destructive text-destructive-foreground"
                      : activity.type === "warning"
                        ? "bg-yellow-500"
                        : activity.type === "success"
                          ? "bg-green-500"
                          : "bg-accent"
                  }`}
                >
                  {activity.type === "error" ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : activity.type === "success" ? (
                    "✓"
                  ) : activity.type === "warning" ? (
                    "!"
                  ) : (
                    "ℹ"
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
        </div>
      </div>
    </div>
  );
}

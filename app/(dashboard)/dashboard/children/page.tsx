'use client';

import { Baby, BookOpen, Trophy, TrendingUp, Clock, Star, Activity, Calendar } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { getChildrenProgressByParent, mockChildrenProgress } from "@/lib/mock/classes";
import Link from "next/link";

export default function ParentChildrenPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'parent') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Bạn không có quyền truy cập trang này.</p>
      </div>
    );
  }

  // Use mock data directly for demo
  const children = mockChildrenProgress;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-bold text-3xl">Con của tôi</h1>
        <p className="text-muted-foreground">
          Theo dõi tiến độ học tập và hoạt động của con
        </p>
      </div>

      {/* Children Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {children.map((child) => (
          <div key={child.childId} className="border-2 border-border bg-card shadow-sm">
            {/* Child Header */}
            <div className="border-b-2 border-border p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center border-2 border-border bg-primary text-2xl font-bold">
                  {child.childName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-xl">{child.childName}</h2>
                  <p className="text-muted-foreground">Lớp {child.grade}</p>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1 text-orange-500">
                      🔥 {child.streak} ngày streak
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      Hoạt động {new Date(child.lastActive).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-3 border-b-2 border-border">
              <div className="border-r-2 border-border p-4 text-center">
                <p className="text-2xl font-bold text-green-500">{child.overallProgress}%</p>
                <p className="text-xs text-muted-foreground">Tiến độ</p>
              </div>
              <div className="border-r-2 border-border p-4 text-center">
                <p className="text-2xl font-bold text-blue-500">{child.overallScore}</p>
                <p className="text-xs text-muted-foreground">Điểm TB</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-2xl font-bold text-purple-500">{child.classes.length}</p>
                <p className="text-xs text-muted-foreground">Lớp học</p>
              </div>
            </div>

            {/* Classes */}
            <div className="border-b-2 border-border p-4">
              <h3 className="mb-3 font-bold">Lớp học</h3>
              <div className="space-y-2">
                {child.classes.map((cls, index) => (
                  <div key={index} className="flex items-center justify-between rounded bg-muted/50 p-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{cls.className}</p>
                        <p className="text-xs text-muted-foreground">{cls.teacherName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-500">{cls.progress}%</p>
                      <p className="text-xs text-muted-foreground">Điểm: {cls.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="border-b-2 border-border p-4">
              <h3 className="mb-3 font-bold">Hoạt động gần đây</h3>
              <div className="space-y-2">
                {child.recentActivities.slice(0, 3).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {activity.type === 'lesson' ? (
                        <BookOpen className="h-4 w-4 text-blue-500" />
                      ) : activity.type === 'quiz' ? (
                        <Star className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <Trophy className="h-4 w-4 text-purple-500" />
                      )}
                      <span>{activity.title}</span>
                    </div>
                    <div className="text-right">
                      {activity.score && (
                        <span className="font-medium text-green-500">{activity.score} điểm</span>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.completedAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tournament Results */}
            <div className="p-4">
              <h3 className="mb-3 font-bold">Giải đấu gần đây</h3>
              {child.tournaments.length > 0 ? (
                <div className="space-y-2">
                  {child.tournaments.slice(0, 2).map((tournament, index) => (
                    <div key={index} className="flex items-center justify-between rounded bg-muted/50 p-2">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">{tournament.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(tournament.date).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${
                          tournament.rank <= 3 ? 'text-yellow-500' : 'text-foreground'
                        }`}>
                          #{tournament.rank}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          /{tournament.totalParticipants} người
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Chưa tham gia giải đấu nào</p>
              )}
              <Link
                href="/tournament/children"
                className="mt-3 block text-center text-sm text-primary hover:underline"
              >
                Xem chi tiết thành tích →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="border-2 border-border bg-card p-4 shadow-sm">
        <h2 className="mb-4 font-bold text-xl">Tổng quan tuần này</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded bg-muted/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-green-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bài học hoàn thành</p>
              <p className="font-bold text-lg">12 bài</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded bg-muted/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-blue-500">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Thời gian học</p>
              <p className="font-bold text-lg">8.5 giờ</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded bg-muted/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-yellow-500">
              <Star className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Điểm trung bình</p>
              <p className="font-bold text-lg">89.5</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded bg-muted/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-border bg-purple-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Giải đấu tham gia</p>
              <p className="font-bold text-lg">3 giải</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { BookOpen, Clock, Star, TrendingUp, Trophy } from "lucide-react";

import { mockChildrenProgress } from "@/data/classes";

export function ParentChildrenSection() {
  const children = mockChildrenProgress;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold">Con của tôi</h2>
        <p className="text-muted-foreground">
          Theo dõi tiến độ học tập và hoạt động của con
        </p>
      </div>

      {/* Children Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {children.map((child) => (
          <div
            key={child.childId}
            className="border-border bg-card border-2 shadow-sm"
          >
            {/* Child Header */}
            <div className="border-border border-b-2 p-4">
              <div className="flex items-center gap-4">
                <div className="border-border bg-primary flex h-16 w-16 items-center justify-center border-2 text-2xl font-bold">
                  {child.childName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{child.childName}</h2>
                  <p className="text-muted-foreground">Lớp {child.grade}</p>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span className="flex items-center gap-1 text-orange-500">
                      🔥 {child.streak} ngày streak
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      Hoạt động{" "}
                      {new Date(child.lastActive).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Stats */}
            <div className="border-border grid grid-cols-3 border-b-2">
              <div className="border-border border-r-2 p-4 text-center">
                <p className="text-2xl font-bold text-green-500">
                  {child.overallProgress}%
                </p>
                <p className="text-muted-foreground text-xs">Tiến độ</p>
              </div>
              <div className="border-border border-r-2 p-4 text-center">
                <p className="text-2xl font-bold text-blue-500">
                  {child.overallScore}
                </p>
                <p className="text-muted-foreground text-xs">Điểm TB</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-2xl font-bold text-purple-500">
                  {child.classes.length}
                </p>
                <p className="text-muted-foreground text-xs">Lớp học</p>
              </div>
            </div>

            {/* Classes */}
            <div className="border-border border-b-2 p-4">
              <h3 className="mb-3 font-bold">Lớp học</h3>
              <div className="space-y-2">
                {child.classes.map((cls, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 flex items-center justify-between rounded p-2"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-muted-foreground h-4 w-4" />
                      <div>
                        <p className="text-sm font-medium">{cls.className}</p>
                        <p className="text-muted-foreground text-xs">
                          {cls.teacherName}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-500">
                        {cls.progress}%
                      </p>
                      <p className="text-muted-foreground text-xs">
                        Điểm: {cls.score}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="border-border border-b-2 p-4">
              <h3 className="mb-3 font-bold">Hoạt động gần đây</h3>
              <div className="space-y-2">
                {child.recentActivities.slice(0, 3).map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {activity.type === "lesson" ? (
                        <BookOpen className="h-4 w-4 text-blue-500" />
                      ) : activity.type === "quiz" ? (
                        <Star className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <Trophy className="h-4 w-4 text-purple-500" />
                      )}
                      <span>{activity.title}</span>
                    </div>
                    <div className="text-right">
                      {activity.score && (
                        <span className="font-medium text-green-500">
                          {activity.score} điểm
                        </span>
                      )}
                      <p className="text-muted-foreground text-xs">
                        {new Date(activity.completedAt).toLocaleDateString(
                          "vi-VN",
                        )}
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
                    <div
                      key={index}
                      className="bg-muted/50 flex items-center justify-between rounded p-2"
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">
                            {tournament.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {new Date(tournament.date).toLocaleDateString(
                              "vi-VN",
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-bold ${
                            tournament.rank <= 3
                              ? "text-yellow-500"
                              : "text-foreground"
                          }`}
                        >
                          #{tournament.rank}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          /{tournament.totalParticipants} người
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Chưa tham gia giải đấu nào
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="border-border bg-card border-2 p-4 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Tổng quan tuần này</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-muted/50 flex items-center gap-3 rounded p-3">
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-green-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">
                Bài học hoàn thành
              </p>
              <p className="text-lg font-bold">12 bài</p>
            </div>
          </div>
          <div className="bg-muted/50 flex items-center gap-3 rounded p-3">
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-blue-500">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Thời gian học</p>
              <p className="text-lg font-bold">8.5 giờ</p>
            </div>
          </div>
          <div className="bg-muted/50 flex items-center gap-3 rounded p-3">
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-yellow-500">
              <Star className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Điểm trung bình</p>
              <p className="text-lg font-bold">89.5</p>
            </div>
          </div>
          <div className="bg-muted/50 flex items-center gap-3 rounded p-3">
            <div className="border-border flex h-10 w-10 items-center justify-center border-2 bg-purple-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Giải đấu tham gia</p>
              <p className="text-lg font-bold">3 giải</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

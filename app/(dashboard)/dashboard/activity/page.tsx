"use client";

import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Gift,
  Star,
  Swords,
  Trophy,
} from "lucide-react";

import { useTranslation } from "@/lib/providers";

import { PageLayout } from "../../_components/page-layout";

const activities = [
  {
    id: 1,
    type: "lesson_complete",
    title: "Hoàn thành bài học",
    description: "React Hooks: useEffect cơ bản",
    time: "10 phút trước",
    icon: CheckCircle,
    color: "bg-green-500",
    reward: "+10 xu",
  },
  {
    id: 2,
    type: "tournament_win",
    title: "Thắng thách đấu",
    description: "Đánh bại @nguyenb với tỷ số 8-5",
    time: "1 giờ trước",
    icon: Trophy,
    color: "bg-yellow-500",
    reward: "+50 xu",
  },
  {
    id: 3,
    type: "streak",
    title: "Streak 7 ngày",
    description: "Học tập liên tục 7 ngày",
    time: "2 giờ trước",
    icon: Star,
    color: "bg-orange-500",
    reward: "+100 xu",
  },
  {
    id: 4,
    type: "lesson_start",
    title: "Bắt đầu khóa học mới",
    description: "TypeScript cho người mới bắt đầu",
    time: "3 giờ trước",
    icon: BookOpen,
    color: "bg-blue-500",
    reward: null,
  },
  {
    id: 5,
    type: "reward_redeem",
    title: "Đổi quà thành công",
    description: "Voucher Grab 50K",
    time: "1 ngày trước",
    icon: Gift,
    color: "bg-purple-500",
    reward: "-300 xu",
  },
  {
    id: 6,
    type: "tournament_loss",
    title: "Thua thách đấu",
    description: "Thua @tranc với tỷ số 4-7",
    time: "1 ngày trước",
    icon: Swords,
    color: "bg-red-500",
    reward: "+10 xu",
  },
  {
    id: 7,
    type: "achievement",
    title: "Mở khóa thành tựu",
    description: "Người học siêng năng - 50 bài học",
    time: "2 ngày trước",
    icon: Award,
    color: "bg-primary",
    reward: "+200 xu",
  },
  {
    id: 8,
    type: "lesson_complete",
    title: "Hoàn thành bài học",
    description: "JavaScript Promises và Async/Await",
    time: "2 ngày trước",
    icon: CheckCircle,
    color: "bg-green-500",
    reward: "+10 xu",
  },
];

const todayStats = {
  lessonsCompleted: 3,
  timeSpent: "2h 15m",
  coinsEarned: 80,
  streakDays: 12,
};

export default function ActivityPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("dashboard.activity.title")}
      description={t("dashboard.activity.description")}
    >
      <div className="space-y-8">
        {/* Today Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-border bg-background flex items-center gap-4 border-2 p-4 shadow-sm">
            <div className="border-border flex h-12 w-12 items-center justify-center border-2 bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Bài học hôm nay</p>
              <p className="text-xl font-bold">{todayStats.lessonsCompleted}</p>
            </div>
          </div>

          <div className="border-border bg-background flex items-center gap-4 border-2 p-4 shadow-sm">
            <div className="border-border flex h-12 w-12 items-center justify-center border-2 bg-blue-100">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Thời gian học</p>
              <p className="text-xl font-bold">{todayStats.timeSpent}</p>
            </div>
          </div>

          <div className="border-border bg-background flex items-center gap-4 border-2 p-4 shadow-sm">
            <div className="border-border flex h-12 w-12 items-center justify-center border-2 bg-yellow-100">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Xu kiếm được</p>
              <p className="text-xl font-bold">+{todayStats.coinsEarned}</p>
            </div>
          </div>

          <div className="border-border bg-background flex items-center gap-4 border-2 p-4 shadow-sm">
            <div className="border-border flex h-12 w-12 items-center justify-center border-2 bg-orange-100">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Streak</p>
              <p className="text-xl font-bold">{todayStats.streakDays} ngày</p>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="border-border bg-background border-2 shadow-sm">
          <div className="border-border bg-muted border-b-2 px-6 py-4">
            <h2 className="font-bold">Lịch sử hoạt động</h2>
          </div>
          <div className="divide-border divide-y-2">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="hover:bg-muted/50 flex items-start gap-4 p-4 transition-colors"
                >
                  <div
                    className={`border-border flex h-10 w-10 shrink-0 items-center justify-center border-2 ${activity.color}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-muted-foreground text-sm">
                          {activity.description}
                        </p>
                      </div>
                      {activity.reward && (
                        <span
                          className={`border-border shrink-0 border px-2 py-0.5 text-sm font-medium ${
                            activity.reward.startsWith("+")
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {activity.reward}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-border border-t-2 p-4">
            <button className="border-border bg-background w-full border-2 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
              Xem thêm hoạt động
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

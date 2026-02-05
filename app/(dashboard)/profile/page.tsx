"use client";

import { BookOpen, Flame, Mail, Settings, Trophy, User } from "lucide-react";

import { useTranslation } from "@/lib/providers";
import { Button, Card, Badge } from "@/components/retroui";

const profileStats = [
  { label: "Streak", value: "7", icon: Flame },
  { label: "Giải đấu", value: "12", icon: Trophy },
  { label: "Bài học", value: "48", icon: BookOpen },
];

const achievements = [
  { name: "First Win", icon: Trophy, unlocked: true },
  { name: "7 Day Streak", icon: Flame, unlocked: true },
  { name: "Quick Learner", icon: BookOpen, unlocked: true },
  { name: "Champion", icon: Trophy, unlocked: false },
];

const recentActivity = [
  {
    title: "Hoàn thành bài học Đại số",
    time: "2 giờ trước",
    icon: BookOpen,
    points: 50,
  },
  {
    title: "Thắng giải đấu Toán Vui",
    time: "Hôm qua",
    icon: Trophy,
    points: 200,
  },
  {
    title: "Đạt streak 7 ngày",
    time: "2 ngày trước",
    icon: Flame,
    points: 100,
  },
];

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="shadow-sm">
          <Card.Content className="p-0">
            <div className="border-border bg-primary border-b-2 p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="border-border bg-background flex h-24 w-24 items-center justify-center border-4 shadow-md">
                  <User className="h-12 w-12" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold">Nguyễn Văn A</h1>
                  <p className="text-muted-foreground flex items-center justify-center gap-2 sm:justify-start">
                    <Mail className="h-4 w-4" />
                    user@example.com
                  </p>
                  <Badge variant="surface" className="mt-2 bg-accent">
                    Level 15 - Pro Learner
                  </Badge>
                </div>
                <Button variant="secondary" size="icon" className="ml-auto hidden sm:flex">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="divide-border grid grid-cols-3 divide-x-2">
              {profileStats.map((stat, index) => (
                <div key={index} className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <stat.icon className="text-muted-foreground h-4 w-4" />
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Achievements */}
          <Card className="shadow-sm">
            <Card.Content className="p-0">
              <div className="border-border border-b-2 p-4">
                <h2 className="text-xl font-bold">Thành tích</h2>
              </div>
              <div className="grid grid-cols-4 gap-4 p-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 text-center"
                    title={achievement.name}
                  >
                    <div
                      className={`border-border flex h-12 w-12 items-center justify-center border-2 ${
                        achievement.unlocked
                          ? "bg-primary"
                          : "bg-muted opacity-50"
                      }`}
                    >
                      <achievement.icon className="h-6 w-6" />
                    </div>
                    <p className="text-xs">{achievement.name}</p>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-sm">
            <Card.Content className="p-0">
              <div className="border-border border-b-2 p-4">
                <h2 className="text-xl font-bold">Hoạt động gần đây</h2>
              </div>
              <div className="divide-border divide-y-2">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-4">
                    <div className="border-border bg-accent flex h-8 w-8 items-center justify-center border-2">
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-muted-foreground text-sm">
                        {activity.time}
                      </p>
                    </div>
                    {activity.points && (
                      <Badge variant="outline" className="bg-primary/10 border-primary">
                        +{activity.points}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}

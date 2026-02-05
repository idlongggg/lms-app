"use client";

import {
  ArrowUpRight,
  Award,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";

import { Button, Card } from "@/components/ui";
import { useTranslation } from "@/lib/providers";

// Mock data for stats
const STATS = [
  {
    label: "Total Study Time",
    value: "124h",
    change: "+12%",
    icon: Clock,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Lessons Completed",
    value: "45",
    change: "+5",
    icon: BookOpen,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Achievements",
    value: "12",
    change: "+2",
    icon: Award,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Average Score",
    value: "92%",
    change: "+4%",
    icon: Target,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const RECENT_ACTIVITY = [
  { title: "Completed Math Quiz: Algebra", score: "95%", time: "2 hours ago" },
  { title: "Started Physics Module: Forces", score: null, time: "Yesterday" },
  { title: "Earned Badge: Fast Learner", score: null, time: "Yesterday" },
  { title: "Completed History Essay", score: "88%", time: "2 days ago" },
];

export default function AllProgressPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {t("navigation.sidebar.allProgress")}
        </h1>
        <p className="text-muted-foreground mt-1">
          Track learning journey and performance analytics
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Card key={i}>
            <Card.Content className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.bg} ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-sm text-green-600 dark:bg-green-900/20">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 text-sm">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Card.Content className="p-6">
            <h3 className="mb-6 text-lg font-bold">Weekly Activity</h3>
            <div className="flex h-[300px] items-end justify-between gap-2">
              {[65, 40, 85, 35, 60, 90, 50].map((h, i) => (
                <div
                  key={i}
                  className="bg-secondary/30 group relative w-full rounded-t-lg"
                >
                  <div
                    className="bg-primary/80 hover:bg-primary absolute right-0 bottom-0 left-0 rounded-t-lg transition-all"
                    style={{ height: `${h}%` }}
                  >
                    <div className="bg-popover text-popover-foreground absolute -top-10 left-1/2 -translate-x-1/2 rounded px-2 py-1 text-xs opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      {h}m
                    </div>
                  </div>
                  <div className="text-muted-foreground absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <h3 className="mb-4 text-lg font-bold">Recent Activity</h3>
            <div className="space-y-6">
              {RECENT_ACTIVITY.map((item, i) => (
                <div
                  key={i}
                  className="border-border flex items-start gap-4 border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="bg-primary mt-2 h-2 w-2 flex-shrink-0 rounded-full" />
                  <div>
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        {item.time}
                      </span>
                      {item.score && (
                        <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {item.score}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="text-primary hover:text-primary hover:bg-primary/5 mt-6 w-full gap-1"
            >
              View History
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

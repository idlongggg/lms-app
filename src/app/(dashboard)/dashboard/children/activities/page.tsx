"use client";

import {
  ArrowLeft,
  Calendar,
  Clock as ClockIcon,
  FileCheck,
  PlayCircle,
  Trophy,
} from "lucide-react";
import Link from "next/link";

import { Badge, Button, Card } from "@/components/ui";
import { useTranslation } from "@/lib/providers";

// Mock data
const ACTIVITIES = [
  {
    id: 1,
    type: "lesson",
    title: "Finished Lesson: Ancient Egypt",
    subject: "History",
    time: "10:30 AM",
    date: "Today",
    score: "90%",
  },
  {
    id: 2,
    type: "quiz",
    title: "Completed Quiz: Multiplication Tables",
    subject: "Mathematics",
    time: "09:15 AM",
    date: "Today",
    score: "100%",
  },
  {
    id: 3,
    type: "achievement",
    title: "Badge Earned: Early Bird",
    subject: "General",
    time: "08:00 AM",
    date: "Today",
    score: null,
  },
  {
    id: 4,
    type: "lesson",
    title: "Started Lesson: Solar System",
    subject: "Science",
    time: "04:45 PM",
    date: "Yesterday",
    score: null,
  },
  {
    id: 5,
    type: "quiz",
    title: "Completed Quiz: Grammar Basics",
    subject: "English",
    time: "02:30 PM",
    date: "Yesterday",
    score: "85%",
  },
  {
    id: 6,
    type: "lesson",
    title: "Finished Lesson: Basic Shapes",
    subject: "Art",
    time: "11:20 AM",
    date: "Yesterday",
    score: "95%",
  },
];

export default function ChildActivitiesPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/children">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">
            {t("navigation.sidebar.childActivities")}
          </h1>
          <p className="text-muted-foreground">
            Recent learning activities and milestones
          </p>
        </div>
      </div>

      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
        {["All", "Lessons", "Quizzes", "Achievements"].map((filter, i) => (
          <Button
            key={filter}
            variant={i === 0 ? "default" : "outline"}
            className="rounded-full whitespace-nowrap"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {ACTIVITIES.map((activity) => (
          <Card key={activity.id} className="shadow-sm">
            <Card.Content className="flex items-start gap-4 p-4">
              <div
                className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  activity.type === "lesson"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30"
                    : activity.type === "quiz"
                      ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30"
                      : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                }`}
              >
                {activity.type === "lesson" && (
                  <PlayCircle className="h-5 w-5" />
                )}
                {activity.type === "quiz" && <FileCheck className="h-5 w-5" />}
                {activity.type === "achievement" && (
                  <Trophy className="h-5 w-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="truncate font-semibold">{activity.title}</h4>
                    <p className="text-muted-foreground text-sm">
                      {activity.subject}
                    </p>
                  </div>
                  {activity.score && (
                    <Badge
                      variant="surface"
                      className="border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    >
                      {activity.score}
                    </Badge>
                  )}
                </div>
                <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {activity.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="h-3 w-3" />
                    {activity.time}
                  </span>
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}

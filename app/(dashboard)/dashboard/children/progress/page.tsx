"use client";

import { ArrowLeft, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

import { Button, Card } from "@/components/ui";
import { useTranslation } from "@/lib/providers";

// Mock data
const SUBJECTS = [
  {
    name: "Mathematics",
    progress: 85,
    color: "bg-blue-500",
    totalLessons: 40,
    completed: 34,
  },
  {
    name: "Science",
    progress: 72,
    color: "bg-green-500",
    totalLessons: 35,
    completed: 25,
  },
  {
    name: "English",
    progress: 90,
    color: "bg-purple-500",
    totalLessons: 50,
    completed: 45,
  },
  {
    name: "History",
    progress: 60,
    color: "bg-orange-500",
    totalLessons: 30,
    completed: 18,
  },
  {
    name: "Art",
    progress: 95,
    color: "bg-pink-500",
    totalLessons: 20,
    completed: 19,
  },
];

export default function ChildProgressPage() {
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
            {t("navigation.sidebar.childProgress")}
          </h1>
          <p className="text-muted-foreground">
            Detailed breakdown of academic performance
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Overall Progress Card */}
        <Card className="border-2 shadow-sm md:col-span-2 lg:col-span-1">
          <Card.Content className="p-6">
            <h3 className="mb-6 text-lg font-bold">Overall Progress</h3>
            <div className="flex items-center justify-center py-4">
              <div className="border-secondary relative flex h-48 w-48 items-center justify-center rounded-full border-[12px]">
                <div className="border-primary absolute inset-0 rotate-45 rounded-full border-[12px] border-r-transparent" />
                <div className="text-center">
                  <div className="text-4xl font-bold">82%</div>
                  <div className="text-muted-foreground mt-1 text-xs tracking-widest uppercase">
                    Completion
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">142</div>
                <div className="text-muted-foreground text-xs">
                  Lessons Done
                </div>
              </div>
              <div className="bg-secondary/30 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">124h</div>
                <div className="text-muted-foreground text-xs">Study Time</div>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Subjects Grid */}
        <Card className="border-2 shadow-sm md:col-span-2">
          <Card.Content className="p-6">
            <h3 className="mb-6 text-lg font-bold">Subject Performance</h3>
            <div className="space-y-6">
              {SUBJECTS.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 ${subject.color} bg-opacity-10 flex items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm`}
                      >
                        {subject.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-muted-foreground text-xs">
                          {subject.completed}/{subject.totalLessons} Lessons
                        </div>
                      </div>
                    </div>
                    <div className="font-bold">{subject.progress}%</div>
                  </div>
                  <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
                    <div
                      className={`h-full ${subject.color} transition-all duration-500`}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <Card.Content className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                <Clock className="h-4 w-4" />
              </div>
              <h3 className="font-bold">Next Recommended</h3>
            </div>
            <div className="space-y-3">
              <div className="border-border hover:bg-muted/50 group cursor-pointer rounded-lg border p-3 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="group-hover:text-primary font-medium transition-colors">
                      Algebra: Linear Equations
                    </h4>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Mathematics • 15 mins
                    </p>
                  </div>
                  <Button size="sm" className="h-7 text-xs">
                    Start
                  </Button>
                </div>
              </div>
              <div className="border-border hover:bg-muted/50 group cursor-pointer rounded-lg border p-3 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="group-hover:text-primary font-medium transition-colors">
                      Biology: Photosynthesis
                    </h4>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Science • 20 mins
                    </p>
                  </div>
                  <Button size="sm" className="h-7 text-xs">
                    Start
                  </Button>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card className="shadow-sm">
          <Card.Content className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
              </div>
              <h3 className="font-bold">Recent Achievements</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-lg font-bold text-white shadow-sm">
                  🏆
                </div>
                <div>
                  <h4 className="font-medium">Math Whiz</h4>
                  <p className="text-muted-foreground text-sm">
                    Scored 100% in 5 math quizzes consecutively
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    2 days ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white shadow-sm">
                  📚
                </div>
                <div>
                  <h4 className="font-medium">Bookworm</h4>
                  <p className="text-muted-foreground text-sm">
                    Completed 50 reading lessons
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    1 week ago
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

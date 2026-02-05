"use client";

import { Plus, Users } from "lucide-react";

import { Badge, Button, Card } from "@/components/ui";
import { useTranslation } from "@/lib/providers";

const DISCUSSIONS = [
  {
    id: 1,
    title: "Study Tips & Tricks",
    description: "Share your best methods for effective studying",
    members: 1250,
    active: "5m ago",
    icon: "📚",
  },
  {
    id: 2,
    title: "Exam Preparation",
    description: "Support group for upcoming finals",
    members: 890,
    active: "12m ago",
    icon: "📝",
  },
  {
    id: 3,
    title: "Science Club",
    description: "Discussing latest scientific discoveries",
    members: 560,
    active: "1h ago",
    icon: "🔬",
  },
  {
    id: 4,
    title: "Art & Creativity",
    description: "Showcase your work and get feedback",
    members: 430,
    active: "2h ago",
    icon: "🎨",
  },
  {
    id: 5,
    title: "Coding Corner",
    description: "Help with programming assignments",
    members: 1100,
    active: "Now",
    icon: "💻",
  },
  {
    id: 6,
    title: "Language Exchange",
    description: "Practice foreign languages together",
    members: 750,
    active: "4h ago",
    icon: "🗣️",
  },
];

export default function DiscussionsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {t("community.discussions.title")}
          </h1>
          <p className="text-muted-foreground mt-1">
            Join topic-based groups and chat with peers
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>New Group</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DISCUSSIONS.map((d) => (
          <Card
            key={d.id}
            className="cursor-pointer shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <Card.Content className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-sm">
                  {d.icon}
                </div>
                <Badge
                  variant="surface"
                  className="flex items-center gap-1 border-transparent bg-green-100 pl-1.5 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                >
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600" />
                  {d.active}
                </Badge>
              </div>

              <h3 className="mb-2 text-xl font-bold">{d.title}</h3>
              <p className="text-muted-foreground mb-6 line-clamp-2 text-sm">
                {d.description}
              </p>

              <div className="border-border flex items-center justify-between border-t pt-4 text-sm">
                <div className="text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {d.members.toLocaleString()}
                </div>
                <Button variant="link" className="h-auto p-0">
                  Join Group
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}

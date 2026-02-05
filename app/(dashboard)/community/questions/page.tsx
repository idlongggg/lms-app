"use client";

import { Eye, PenLine, Search, ThumbsUp } from "lucide-react";

import { Badge, Button, Card, Input, Select } from "@/components/ui";
import { useTranslation } from "@/lib/providers";

const QUESTIONS = [
  {
    id: 1,
    title: "How do I solve quadratic equations?",
    author: "Student123",
    replies: 12,
    likes: 45,
    views: 124,
    tags: ["Math", "Algebra"],
    time: "2h ago",
  },
  {
    id: 2,
    title: "Best way to memorize periodic table?",
    author: "ScienceWhiz",
    replies: 8,
    likes: 32,
    views: 98,
    tags: ["Science", "Chemistry"],
    time: "5h ago",
  },
  {
    id: 3,
    title: "Explanation for Newton's Third Law",
    author: "PhysicsFan",
    replies: 15,
    likes: 56,
    views: 245,
    tags: ["Physics"],
    time: "1d ago",
  },
  {
    id: 4,
    title: "Grammar help: Who vs Whom",
    author: "Wordsmith",
    replies: 24,
    likes: 89,
    views: 512,
    tags: ["English", "Grammar"],
    time: "2d ago",
  },
];

export default function QuestionsPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {t("community.questions.title")}
          </h1>
          <p className="text-muted-foreground mt-1">
            Ask questions and get answers from the community
          </p>
        </div>
        <Button className="gap-2">
          <PenLine className="h-4 w-4" />
          <span>Ask Question</span>
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Input placeholder="Search questions..." className="pl-9" />
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        </div>
        <Select defaultValue="newest">
          <Select.Trigger className="w-[180px]">
            <Select.Value placeholder="Sort by" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="newest">Newest</Select.Item>
            <Select.Item value="most-liked">Most Liked</Select.Item>
            <Select.Item value="unanswered">Unanswered</Select.Item>
          </Select.Content>
        </Select>
      </div>

      <div className="space-y-4">
        {QUESTIONS.map((q) => (
          <Card
            key={q.id}
            className="hover:border-primary/50 group cursor-pointer shadow-sm transition-colors"
          >
            <Card.Content className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="group-hover:text-primary mb-2 text-lg font-bold transition-colors">
                    {q.title}
                  </h3>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {q.tags.map((tag) => (
                      <Badge key={tag} variant="default" size="sm">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Asked by{" "}
                    <span className="text-foreground font-medium">
                      {q.author}
                    </span>{" "}
                    • {q.time}
                  </div>
                </div>
                <div className="flex min-w-[60px] flex-col items-center gap-1 text-center">
                  <div className="text-xl font-bold">{q.replies}</div>
                  <div className="text-muted-foreground text-xs">Answers</div>
                </div>
              </div>

              <div className="border-border text-muted-foreground mt-4 flex items-center gap-6 border-t pt-4 text-sm">
                <span className="hover:text-foreground flex items-center gap-1.5">
                  <ThumbsUp className="h-4 w-4" /> {q.likes} Likes
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" /> {q.views} Views
                </span>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}

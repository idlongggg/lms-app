"use client";

import { FocusHeader } from "@/components/layout/focus-header";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function LearningDetailPage() {
  return (
    <>
      <FocusHeader backHref="/learning">
        {/* Progress bar */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">3/10</span>
          <div className="h-2 flex-1 border border-border bg-muted">
            <div className="h-full w-[30%] bg-primary" />
          </div>
          <span className="flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4" />
            15:00
          </span>
        </div>
      </FocusHeader>

      <main className="flex flex-1 flex-col">
        {/* Question Area */}
        <div className="flex-1 p-6">
          <div className="mx-auto max-w-3xl">
            <div className="border-2 border-border bg-card p-8 shadow-md">
              <div className="mb-4 inline-flex border-2 border-border bg-accent px-3 py-1 text-sm font-medium">
                Câu hỏi 3
              </div>
              <h2 className="font-bold text-2xl font-bold">
                Giải phương trình: 2x + 5 = 15
              </h2>
              <p className="mt-2 text-muted-foreground">
                Chọn đáp án đúng nhất
              </p>
            </div>

            {/* Answer Options */}
            <div className="mt-6 space-y-3">
              {["x = 5", "x = 10", "x = 7.5", "x = 4"].map((answer, index) => (
                <button
                  key={index}
                  className="w-full border-2 border-border bg-background p-4 text-left font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm hover:bg-accent"
                >
                  <span className="mr-3 inline-flex h-6 w-6 items-center justify-center border border-border bg-muted text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t-2 border-border bg-background p-4">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <button className="flex items-center gap-2 border-2 border-border bg-background px-4 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
              <ChevronLeft className="h-4 w-4" />
              Câu trước
            </button>
            <button className="flex items-center gap-2 border-2 border-border bg-primary px-6 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
              Câu tiếp
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

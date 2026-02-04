"use client";

import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

import { FocusHeader } from "@/components/shared";

export default function LearningDetailPage() {
  return (
    <>
      <FocusHeader backHref="/learning">
        {/* Progress bar */}
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground text-sm">3/10</span>
          <div className="border-border bg-muted h-2 flex-1 border">
            <div className="bg-primary h-full w-[30%]" />
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
            <div className="border-border bg-card border-2 p-8 shadow-md">
              <div className="border-border bg-accent mb-4 inline-flex border-2 px-3 py-1 text-sm font-medium">
                Câu hỏi 3
              </div>
              <h2 className="text-2xl font-bold">
                Giải phương trình: 2x + 5 = 15
              </h2>
              <p className="text-muted-foreground mt-2">
                Chọn đáp án đúng nhất
              </p>
            </div>

            {/* Answer Options */}
            <div className="mt-6 space-y-3">
              {["x = 5", "x = 10", "x = 7.5", "x = 4"].map((answer, index) => (
                <button
                  key={index}
                  className="border-border bg-background hover:bg-accent w-full border-2 p-4 text-left font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <span className="border-border bg-muted mr-3 inline-flex h-6 w-6 items-center justify-center border text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-border bg-background border-t-2 p-4">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <button className="border-border bg-background flex items-center gap-2 border-2 px-4 py-2 font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm">
              <ChevronLeft className="h-4 w-4" />
              Câu trước
            </button>
            <button className="border-border bg-primary flex items-center gap-2 border-2 px-6 py-2 font-medium shadow-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md">
              Câu tiếp
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

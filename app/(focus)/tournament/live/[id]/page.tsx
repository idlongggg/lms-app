'use client';

import { Clock, User, Zap } from 'lucide-react';

import { FocusHeader } from '@/components/shared';

export default function LiveMatchPage() {
  return (
    <>
      <FocusHeader backHref="/tournament">
        {/* Match info */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-destructive h-2 w-2 animate-pulse rounded-full" />
            <span className="font-medium">LIVE</span>
          </div>
          <span className="border-border bg-accent flex items-center gap-1 border-2 px-2 py-0.5 text-sm font-medium">
            <Clock className="h-3 w-3" />
            02:45
          </span>
        </div>
      </FocusHeader>

      <main className="flex flex-1 flex-col">
        {/* Scoreboard */}
        <div className="border-border bg-primary border-b-2 p-4">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="border-border bg-background flex h-12 w-12 items-center justify-center border-2 shadow-sm">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Bạn</p>
                <p className="text-2xl font-bold">350</p>
              </div>
            </div>
            <div className="text-2xl font-bold">VS</div>
            <div className="flex items-center gap-3 text-right">
              <div>
                <p className="font-medium">Đối thủ</p>
                <p className="text-2xl font-bold">280</p>
              </div>
              <div className="border-border bg-background flex h-12 w-12 items-center justify-center border-2 shadow-sm">
                <User className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 p-6">
          <div className="mx-auto max-w-3xl">
            <div className="border-border bg-card border-2 p-8 shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <span className="border-border bg-accent inline-flex border-2 px-3 py-1 text-sm font-medium">
                  Câu 5/10
                </span>
                <span className="text-muted-foreground flex items-center gap-1 text-sm">
                  <Zap className="text-primary h-4 w-4" />
                  +50 điểm
                </span>
              </div>
              <h2 className="text-2xl font-bold">Thủ đô của Việt Nam là gì?</h2>
            </div>

            {/* Answer Options */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Huế'].map((answer, index) => (
                <button
                  key={index}
                  className="border-border bg-background hover:bg-accent border-2 p-4 text-center font-medium shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timer bar */}
        <div className="border-border bg-background border-t-2 p-4">
          <div className="mx-auto max-w-3xl">
            <div className="border-border bg-muted h-3 border-2">
              <div className="bg-destructive h-full transition-all" style={{ width: '60%' }} />
            </div>
            <p className="text-muted-foreground mt-2 text-center text-sm">Còn 12 giây để trả lời</p>
          </div>
        </div>
      </main>
    </>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export function Header({ left, center, right, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "border-border bg-background sticky top-0 z-50 h-14 w-full border-b-2 shadow-sm",
        className,
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">{left}</div>

        {/* Center section */}
        {center && (
          <div className="hidden flex-1 items-center justify-center md:flex">
            {center}
          </div>
        )}

        {/* Right section */}
        <div className="flex items-center gap-2">{right}</div>
      </div>
    </header>
  );
}

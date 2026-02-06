"use client";

interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function Header({ left, center, right }: HeaderProps) {
  return (
    <header className="sticky h-14 border-b-2 shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2 px-2">
        {left}

        <div className="hidden gap-2 md:flex">
          {/* center */}
          {center}
        </div>

        {right}
      </div>
    </header>
  );
}

"use client";

interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function Header({ left, center, right }: HeaderProps) {
  return (
    <header className="h-14 border-b-2 shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-2">
        <div className="flex gap-2">
          {/* left */}
          {left}
        </div>

        <div className="hidden gap-2 md:flex">
          {/* center */}
          {center}
        </div>

        <div className="flex gap-2">
          {/* right */}
          {right}
        </div>
      </div>
    </header>
  );
}

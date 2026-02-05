"use client";

interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function Header({ left, center, right }: HeaderProps) {
  return (
    <header className="border-border bg-background h-14 border-b-2 shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl justify-between px-2">
        <div className="flex items-center gap-2">{left}</div>
        <div className="hidden justify-center md:flex">{center}</div>
        <div className="flex items-center gap-2">{right}</div>
      </div>
    </header>
  );
}

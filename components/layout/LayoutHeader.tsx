import React from "react";

interface LayoutHeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export function LayoutHeader({
  left,
  center,
  right,
  className = "",
}: LayoutHeaderProps) {
  return (
    <header
      className={`bg-background sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b px-4 shadow-sm ${className}`}
    >
      <div className="flex items-center gap-2">{left}</div>
      <div className="flex flex-1 justify-center">{center}</div>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}

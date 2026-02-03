'use client';

import { ArrowLeft, Settings, X } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface FocusHeaderProps {
  backHref: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export function FocusHeader({ backHref, title, children, className }: FocusHeaderProps) {
  return (
    <header
      className={cn(
        'border-border bg-background sticky top-0 z-50 flex h-12 items-center justify-between border-b-2 px-4',
        className,
      )}
    >
      {/* Left - Back button */}
      <Link
        href={backHref}
        className="border-border bg-background flex h-8 w-8 items-center justify-center border-2 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>

      {/* Center - Title or custom content */}
      <div className="flex-1 px-4">
        {title ? <h1 className="truncate text-center font-medium">{title}</h1> : children}
      </div>

      {/* Right - Settings/Close */}
      <Link
        href={backHref}
        className="border-border bg-background flex h-8 w-8 items-center justify-center border-2 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
      >
        <X className="h-4 w-4" />
      </Link>
    </header>
  );
}

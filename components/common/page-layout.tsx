'use client';

/**
 * PageLayout Component
 * Provides consistent page structure with sticky header and scrollable content
 */

import { cn } from '@/lib/utils';

interface PageLayoutProps {
  /** Page title */
  title: string;
  /** Optional page description */
  description?: string;
  /** Optional action buttons (right side of header) */
  actions?: React.ReactNode;
  /** Page content (scrollable) */
  children: React.ReactNode;
  /** Additional className for the container */
  className?: string;
}

export function PageLayout({ title, description, actions, children, className }: PageLayoutProps) {
  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Sticky Page Header */}
      <header className="bg-background border-border sticky top-0 z-10 shrink-0 border-b-2 px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-bold">{title}</h1>
            {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </div>
  );
}

export default PageLayout;

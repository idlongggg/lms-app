'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { useSidebar } from '@/hooks/use-sidebar';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import type { NavGroup } from '@/lib/navigation';

interface SidebarProps {
  navigation: NavGroup[];
  variant?: 'collapsible' | 'expanded';
  className?: string;
}

export function Sidebar({ navigation, variant = 'collapsible', className }: SidebarProps) {
  const { isCollapsed, isMobileOpen, toggle, closeMobile } = useSidebar();
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useScrollPosition(navRef, 'sidebar');

  const isExpanded = variant === 'expanded';
  const showCollapsed = !isExpanded && isCollapsed;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeMobile} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'border-border bg-sidebar fixed top-0 left-0 z-50 flex h-full flex-col border-r-2 transition-all duration-300 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:shrink-0',
          showCollapsed ? 'w-16' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className,
        )}
      >
        {/* Mobile header */}
        <div className="border-border flex h-16 items-center justify-between border-b-2 px-4 md:hidden">
          <Logo />
          <button
            onClick={closeMobile}
            className="border-border bg-background flex h-8 w-8 items-center justify-center border-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Toggle button (desktop only, collapsible variant) */}
        {!isExpanded && (
          <button
            onClick={toggle}
            className="border-border bg-background hover:bg-muted absolute top-6 -right-3 z-10 hidden h-6 w-6 items-center justify-center border-2 shadow-xs transition-all md:flex"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft
              className={cn('h-3 w-3 transition-transform', isCollapsed && 'rotate-180')}
            />
          </button>
        )}

        {/* Navigation */}
        <nav ref={navRef} className="flex-1 overflow-y-auto p-2">
          {navigation.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-4">
              {group.title && !showCollapsed && (
                <h3 className="text-muted-foreground mb-2 px-3 text-xs font-semibold tracking-wider uppercase">
                  {group.title}
                </h3>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2 font-medium transition-all',
                          showCollapsed && 'justify-center px-2',
                          isActive
                            ? 'border-border bg-primary border-2 shadow-xs'
                            : 'hover:bg-sidebar-accent',
                        )}
                        title={showCollapsed ? item.title : undefined}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        {!showCollapsed && <span>{item.title}</span>}
                        {!showCollapsed && item.badge && (
                          <span className="border-border bg-accent ml-auto border px-1.5 py-0.5 text-xs">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

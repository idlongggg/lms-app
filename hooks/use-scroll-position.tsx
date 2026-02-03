'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

// In-memory storage for scroll positions
// Format: "${pathname}:${key}" -> scrollTop
const scrollPositions = new Map<string, number>();

// Breakpoint for desktop (md: 768px)
const DESKTOP_BREAKPOINT = 768;

function isDesktop(): boolean {
  return typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT;
}

/**
 * Hook to persist scroll position for a scrollable element
 * Only persists on desktop (md: breakpoint and above)
 *
 * @param scrollRef - Ref to the scrollable element
 * @param key - Unique key to identify the scrollable area (e.g., "content", "sidebar")
 */
export function useScrollPosition(scrollRef: React.RefObject<HTMLElement | null>, key: string) {
  const pathname = usePathname();
  const isRestoring = useRef(false);
  const storageKey = `${pathname}:${key}`;

  // Save scroll position on scroll (only on desktop)
  const saveScrollPosition = useCallback(() => {
    if (!isRestoring.current && scrollRef.current && isDesktop()) {
      scrollPositions.set(storageKey, scrollRef.current.scrollTop);
    }
  }, [storageKey, scrollRef]);

  // Restore scroll position on route change (only on desktop)
  useEffect(() => {
    const element = scrollRef.current;
    if (!element || !isDesktop()) return;

    const savedPosition = scrollPositions.get(storageKey) ?? 0;
    isRestoring.current = true;

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      element.scrollTop = savedPosition;
      // Small delay before allowing saves again
      requestAnimationFrame(() => {
        isRestoring.current = false;
      });
    });
  }, [storageKey, scrollRef]);

  // Attach scroll listener
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener('scroll', saveScrollPosition, { passive: true });
    return () => element.removeEventListener('scroll', saveScrollPosition);
  }, [scrollRef, saveScrollPosition]);

  return { saveScrollPosition };
}

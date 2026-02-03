'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

let themeState: 'light' | 'dark' = 'light';
let mounted = false;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return themeState;
}

function getServerSnapshot() {
  return 'light' as const;
}

function getMounted() {
  return mounted;
}

function getServerMounted() {
  return false;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isMounted = useSyncExternalStore(subscribe, getMounted, getServerMounted);

  useEffect(() => {
    if (mounted) return;
    mounted = true;
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = stored || (systemPrefersDark ? 'dark' : 'light');
    themeState = initialTheme;
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    listeners.forEach((fn) => fn());
  }, []);

  const setTheme = useCallback((newTheme: 'light' | 'dark') => {
    themeState = newTheme;
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    listeners.forEach((fn) => fn());
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(themeState === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  return { theme, setTheme, toggleTheme, mounted: isMounted };
}

"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { THEME, type ThemeKey } from "@/lib/constants/colors";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setThemeColor: (color: ThemeKey) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";
const PRESET_STORAGE_KEY = "theme-preset";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [currentPreset, setCurrentPreset] = useState<ThemeKey>("preset00");
  const [mounted, setMounted] = useState(false);

  const applyThemeColors = useCallback(
    (themeKey: ThemeKey, currentMode: Theme) => {
      const themeConfig = THEME[themeKey];
      if (!themeConfig) return;

      const colors = themeConfig[currentMode];
      const root = document.documentElement;

      Object.entries(colors).forEach(([key, value]) => {
        const cssVar = `--${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;
        root.style.setProperty(cssVar, value);
      });
    },
    [],
  );

  // Initialize theme and preset from localStorage on mount
  useEffect(() => {
    queueMicrotask(() => {
      const storedTheme =
        (localStorage.getItem(STORAGE_KEY) as Theme) || "light";
      const storedPreset =
        (localStorage.getItem(PRESET_STORAGE_KEY) as ThemeKey) || "preset00";

      const validPreset = THEME[storedPreset] ? storedPreset : "preset00";

      setThemeState(storedTheme);
      setCurrentPreset(validPreset);
      setMounted(true);

      document.documentElement.classList.toggle("dark", storedTheme === "dark");
      applyThemeColors(validPreset, storedTheme);
    });
  }, [applyThemeColors]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      applyThemeColors(currentPreset, newTheme);
    },
    [currentPreset, applyThemeColors],
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const setThemeColor = useCallback(
    (color: ThemeKey) => {
      setCurrentPreset(color);
      localStorage.setItem(PRESET_STORAGE_KEY, color);
      applyThemeColors(color, theme);
    },
    [theme, applyThemeColors],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      setThemeColor,
      mounted,
    }),
    [theme, setTheme, toggleTheme, setThemeColor, mounted],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

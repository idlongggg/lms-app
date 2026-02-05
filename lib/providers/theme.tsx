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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    queueMicrotask(() => {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      const initialTheme = stored || "light";

      setThemeState(initialTheme);
      document.documentElement.classList.toggle(
        "dark",
        initialTheme === "dark",
      );
      setMounted(true);
    });
  }, []);

  /*
   * Helper to apply a set of colors to the root element.
   * This is now more complex because we need to handle light/dark switching dynamically.
   * However, since this provider manages 'theme' (light/dark), we can re-apply colors when theme changes.
   */
  const applyThemeColors = useCallback(
    (themeKey: ThemeKey, currentMode: Theme) => {
      const themeConfig = THEME[themeKey];
      if (!themeConfig) return;

      const colors = themeConfig[currentMode];
      const root = document.documentElement;

      root.style.setProperty("--background", colors.background);
      root.style.setProperty("--foreground", colors.foreground);
      root.style.setProperty("--card", colors.card);
      root.style.setProperty("--card-foreground", colors.cardForeground);
      root.style.setProperty("--primary", colors.primary);
      root.style.setProperty("--primary-hover", colors.primaryHover);
      root.style.setProperty("--primary-foreground", colors.primaryForeground);
      root.style.setProperty("--secondary", colors.secondary);
      root.style.setProperty(
        "--secondary-foreground",
        colors.secondaryForeground,
      );
      root.style.setProperty("--muted", colors.muted);
      root.style.setProperty("--muted-foreground", colors.mutedForeground);
      root.style.setProperty("--accent", colors.accent);
      root.style.setProperty("--accent-foreground", colors.accentForeground);
      root.style.setProperty("--destructive", colors.destructive);
      root.style.setProperty(
        "--destructive-foreground",
        colors.destructiveForeground,
      );
      root.style.setProperty("--border", colors.border);
    },
    [],
  );

  // We need to keep track of the selected 'color preset' as well, to re-apply it when toggling light/dark
  const [currentPreset, setCurrentPreset] = useState<ThemeKey>("preset00");

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");

      // Re-apply colors for the new mode using the current preset
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

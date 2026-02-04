export type ThemeKey =
  | "default"
  | "overview"
  | "learning"
  | "tournament"
  | "community"
  | "news";

export const THEME_COLORS: Record<
  ThemeKey,
  { primary: string; hover: string; ring: string }
> = {
  default: {
    primary: "#10b981",
    hover: "#059669",
    ring: "#10b981",
  },
  overview: {
    primary: "#10b981",
    hover: "#059669",
    ring: "#10b981",
  },
  learning: {
    primary: "#3b82f6",
    hover: "#2563eb",
    ring: "#3b82f6",
  },
  tournament: {
    primary: "#ef4444",
    hover: "#dc2626",
    ring: "#ef4444",
  },
  community: {
    primary: "#f97316",
    hover: "#ea580c",
    ring: "#f97316",
  },
  news: {
    primary: "#f59e0b",
    hover: "#d97706",
    ring: "#f59e0b",
  },
};

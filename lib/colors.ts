export type ThemeKey =
  | "preset00"
  | "preset01"
  | "preset02"
  | "preset03"
  | "preset04"
  | "preset05"
  | "preset06";

export const THEME: Record<
  ThemeKey,
  { primary: string; hover: string; ring: string }
> = {
  preset00: {
    primary: "#10b981",
    hover: "#059669",
    ring: "#10b981",
  },
  preset01: {
    primary: "#10b981",
    hover: "#059669",
    ring: "#10b981",
  },
  preset02: {
    primary: "#3b82f6",
    hover: "#2563eb",
    ring: "#3b82f6",
  },
  preset03: {
    primary: "#ef4444",
    hover: "#dc2626",
    ring: "#ef4444",
  },
  preset04: {
    primary: "#f97316",
    hover: "#ea580c",
    ring: "#f97316",
  },
  preset05: {
    primary: "#f59e0b",
    hover: "#d97706",
    ring: "#f59e0b",
  },
  preset06: {
    primary: "#64748b",
    hover: "#475569",
    ring: "#64748b",
  },
};

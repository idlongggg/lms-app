export type ThemeKey =
  | "preset00"
  | "preset01"
  | "preset02"
  | "preset03"
  | "preset04"
  | "preset05";

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryHover: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
}

const BASE_LIGHT: Omit<ThemeColors, "primary" | "primaryHover"> = {
  background: "#fff",
  foreground: "#000",
  card: "#fff",
  cardForeground: "#000",
  primaryForeground: "#000",
  secondary: "#000",
  secondaryForeground: "#fff",
  muted: "#cccccc",
  mutedForeground: "#5a5a5a",
  accent: "#fae583",
  accentForeground: "#000",
  destructive: "#e63946",
  destructiveForeground: "#fff",
  border: "#000",
};

const BASE_DARK: Omit<ThemeColors, "primary" | "primaryHover"> = {
  background: "#1a1a1a",
  foreground: "#f5f5f5",
  card: "#242424",
  cardForeground: "#f5f5f5",
  primaryForeground: "#000",
  secondary: "#3a3a3a",
  secondaryForeground: "#f5f5f5",
  muted: "#3f3f46",
  mutedForeground: "#a0a0a0",
  accent: "#fae583",
  accentForeground: "#000",
  destructive: "#e63946",
  destructiveForeground: "#fff",
  border: "#5c5c5c",
};

export const THEME: Record<
  ThemeKey,
  { light: ThemeColors; dark: ThemeColors }
> = {
  preset00: {
    light: {
      ...BASE_LIGHT,
      primary: "#ffdb33",
      primaryHover: "#ffcc00",
    },
    dark: {
      ...BASE_DARK,
      primary: "#ffdb33",
      primaryHover: "#ffcc00",
    },
  },
  preset01: {
    light: {
      ...BASE_LIGHT,
      primary: "#10b981",
      primaryHover: "#059669",
    },
    dark: {
      ...BASE_DARK,
      primary: "#10b981",
      primaryHover: "#059669",
    },
  },
  preset02: {
    light: {
      ...BASE_LIGHT,
      primary: "#f97316",
      primaryHover: "#ea580c",
    },
    dark: {
      ...BASE_DARK,
      primary: "#f97316",
      primaryHover: "#ea580c",
    },
  },
  preset03: {
    light: {
      ...BASE_LIGHT,
      primary: "#3b82f6",
      primaryHover: "#2563eb",
    },
    dark: {
      ...BASE_DARK,
      primary: "#3b82f6",
      primaryHover: "#2563eb",
    },
  },
  preset04: {
    light: {
      ...BASE_LIGHT,
      primary: "#a855f7",
      primaryHover: "#9333ea",
    },
    dark: {
      ...BASE_DARK,
      primary: "#a855f7",
      primaryHover: "#9333ea",
    },
  },
  preset05: {
    light: {
      ...BASE_LIGHT,
      primary: "#ef4444",
      primaryHover: "#dc2626",
    },
    dark: {
      ...BASE_DARK,
      primary: "#ef4444",
      primaryHover: "#dc2626",
    },
  },
};

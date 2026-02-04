import { DarkModeIcon, LightModeIcon } from "@/lib/icons";

interface ThemeToggleProps {
  theme: string | undefined;
  toggleTheme: () => void;
  mounted: boolean;
}

export function ThemeToggle({ theme, toggleTheme, mounted }: ThemeToggleProps) {
  if (!mounted) {
    return (
      <button
        className="border-border bg-background hover:bg-muted flex h-9 w-9 items-center justify-center border-2 transition-all"
        disabled
      >
        <LightModeIcon className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="border-border bg-background flex h-9 w-9 items-center justify-center border-2 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm active:translate-x-0 active:translate-y-0 active:shadow-xs"
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      {theme === "light" ? (
        <DarkModeIcon className="h-4 w-4" />
      ) : (
        <LightModeIcon className="h-4 w-4" />
      )}
    </button>
  );
}

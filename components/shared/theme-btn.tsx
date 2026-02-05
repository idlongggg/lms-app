import { Button } from "@/components/retroui";
import { DarkModeIcon, LightModeIcon } from "@/lib/constants/icons";

interface ThemeToggleProps {
  theme: string | undefined;
  toggleTheme: () => void;
  mounted: boolean;
}

export function ThemeToggle({ theme, toggleTheme, mounted }: ThemeToggleProps) {
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="h-9 w-9" disabled>
        <LightModeIcon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9"
      onClick={toggleTheme}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
    >
      {theme === "light" ? (
        <DarkModeIcon className="h-4 w-4" />
      ) : (
        <LightModeIcon className="h-4 w-4" />
      )}
    </Button>
  );
}

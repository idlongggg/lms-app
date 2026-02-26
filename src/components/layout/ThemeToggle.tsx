import { Button, Tooltip } from "@/components/ui";
import { DarkModeIcon, LightModeIcon } from "@/lib/constants/icons";

interface ThemeToggleProps {
  theme: string | undefined;
  toggleTheme: () => void;
  mounted: boolean;
  t: (key: string) => string;
}

export function ThemeToggle({
  theme,
  toggleTheme,
  mounted,
  t,
}: ThemeToggleProps) {
  const isDark = theme === "dark";
  const label = isDark ? t("settings.lightMode") : t("settings.darkMode");
  const Icon = isDark ? LightModeIcon : DarkModeIcon;

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <LightModeIcon className="size-4" />
      </Button>
    );
  }

  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={label}
          >
            <Icon className="size-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{label}</Tooltip.Content>
      </Tooltip>
    </Tooltip.Provider>
  );
}

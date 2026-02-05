import { Button, Tooltip } from "@/components/ui";
import { MenuIcon } from "@/lib/constants/icons";

interface MobileMenuButtonProps {
  onClick: () => void;
  t: (key: string) => string;
}

export function MobileMenuButton({ onClick, t }: MobileMenuButtonProps) {
  const label = t("common.open") + " " + t("navigation.sidebar.dashboard");

  return (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button
            className="md:hidden"
            onClick={onClick}
            variant="outline"
            size="icon"
            aria-label={label}
          >
            <MenuIcon className="size-4" />
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>{label}</Tooltip.Content>
      </Tooltip>
    </Tooltip.Provider>
  );
}

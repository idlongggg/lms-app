import { Button } from "@/components/ui";
import { MenuIcon } from "@/lib/constants/icons";

interface MobileMenuButtonProps {
  onClick: () => void;
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <Button
      className="md:hidden"
      onClick={onClick}
      variant="outline"
      size="icon"
    >
      <MenuIcon className="h-4 w-4" />
    </Button>
  );
}

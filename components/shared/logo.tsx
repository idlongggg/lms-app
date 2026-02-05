import Link from "next/link";

import { Button, Text } from "@/components/retroui";
import { LogoIcon } from "@/lib/constants/icons";

interface LogoProps {
  title?: string;
}

export function Logo({ title = "LMS" }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Button
        variant="default"
        size="icon"
        className="h-9 w-9 cursor-default hover:translate-y-0 active:translate-x-0 active:translate-y-0"
        asChild
      >
        <span>
          <LogoIcon className="h-5 w-5" />
        </span>
      </Button>
      {title && (
        <Text as="h3" className="font-bold">
          {title}
        </Text>
      )}
    </Link>
  );
}

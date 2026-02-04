import Link from "next/link";

import { Text } from "@/components/retroui";
import { LogoIcon } from "@/lib/icons";

interface LogoProps {
  title?: string;
}

export function Logo({ title = "LMS" }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="border-border bg-primary flex h-9 w-9 items-center justify-center border-2 shadow-sm">
        <LogoIcon className="h-5 w-5" />
      </div>
      {title && (
        <Text as="h3" className="font-bold">
          {title}
        </Text>
      )}
    </Link>
  );
}

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-bold text-xl font-bold transition-all",
        className
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center border-2 border-border bg-primary shadow-sm">
        <GraduationCap className="h-5 w-5" />
      </div>
      {!collapsed && <span>LMS</span>}
    </Link>
  );
}

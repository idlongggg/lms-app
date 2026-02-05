"use client";

import { Search as SearchIcon } from "lucide-react";

export function Search() {
  return (
    <button
      className="border-border bg-background hidden h-9 items-center gap-2 border-2 px-3 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm sm:flex"
      aria-label="Search"
    >
      <SearchIcon className="h-4 w-4" />
      <span className="text-muted-foreground text-sm">Tìm kiếm...</span>
      <kbd className="border-border bg-muted ml-2 rounded border px-1.5 py-0.5 text-xs">
        ⌘K
      </kbd>
    </button>
  );
}

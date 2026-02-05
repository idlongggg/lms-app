"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Button, Command, Text } from "@/components/ui";

interface SearchProps {
  t: (key: string) => string;
}

export function Search({ t }: SearchProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="hidden h-9 w-40 justify-start gap-2 sm:flex"
        aria-label={t("search")}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-5" />
        <Text>{t("search.placeholder")}</Text>
      </Button>

      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input placeholder={t("search.placeholder")} />
        <Command.List>
          <Command.Empty>{t("search.noResults")}</Command.Empty>
        </Command.List>
      </Command.Dialog>
    </>
  );
}

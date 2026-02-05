"use client";

import { useState } from "react";

import { Button, Command, Text } from "@/components/ui";
import { SearchIcon } from "@/lib/constants/icons";

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
        aria-label={t("common.search")}
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-5" />
        <Text>{t("common.searchPlaceholder")}</Text>
      </Button>

      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input placeholder={t("common.searchPlaceholder")} />
        <Command.List>
          <Command.Empty>{t("common.noResults")}</Command.Empty>
        </Command.List>
      </Command.Dialog>
    </>
  );
}

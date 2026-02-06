"use client";

import { useRef } from "react";

import { useScrollPosition } from "@/hooks";

import { PageHeader } from "./PageHeader";

export function Main({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);

  useScrollPosition(mainRef, "content");

  return (
    <main ref={mainRef} className="flex flex-1 flex-col overflow-hidden">
      <PageHeader />
      <div className="flex-1 overflow-auto p-6">{children}</div>
    </main>
  );
}

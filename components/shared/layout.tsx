"use client";

import { useRef } from "react";

import { Button } from "@/components/retroui";
import { Header, Logo, Sidebar } from "@/components/shared";
import { useScrollPosition } from "@/lib/hooks";
import { MenuIcon } from "@/lib/icons";
import { type NavGroup } from "@/lib/nav";
import { useSidebar } from "@/lib/providers";

interface LayoutProps {
  children: React.ReactNode;
  nav: NavGroup[];
  center?: React.ReactNode;
  right?: React.ReactNode;
  variant?: "collapsible" | "expanded";

  header?: React.ReactNode;
}

export function Layout({
  children,
  nav,
  center,
  right,
  variant = "collapsible",

  header,
}: LayoutProps) {
  const mainRef = useRef<HTMLElement>(null);
  const { openMobile } = useSidebar();

  useScrollPosition(mainRef, "content");

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <Header
        left={
          <>
            <Button
              className="md:hidden"
              onClick={openMobile}
              variant="outline"
              size="icon"
            >
              <MenuIcon className="h-4 w-4" />
            </Button>
            <Logo />
          </>
        }
        center={center}
        right={right}
      />
      <div className="mx-auto w-full max-w-7xl flex-1 overflow-hidden">
        <div className="flex h-full">
          <Sidebar navigation={nav} variant={variant} />
          <main ref={mainRef} className="flex flex-1 flex-col overflow-hidden">
            {header && (
              <div className="border-border shrink-0 border-b px-6 py-3">
                {header}
              </div>
            )}
            <div className="flex-1 overflow-auto p-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

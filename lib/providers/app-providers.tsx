"use client";

import React from "react";

import { AuthProvider } from "@/lib/auth";

import { LanguageProvider } from "./language-provider";
import { SidebarProvider } from "./sidebar-provider";
import { ThemeProvider } from "./theme-provider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

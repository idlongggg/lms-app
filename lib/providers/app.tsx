"use client";

import React from "react";

import { AuthProvider } from "@/lib/auth";

import { LanguageProvider } from "./lang";
import { SidebarProvider } from "./sidebar";
import { ThemeProvider } from "./theme";

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

"use client";

import { ApolloProvider } from "@apollo/client/react";
import React from "react";

import { AuthProvider } from "@/lib/auth";
import { client } from "@/lib/graphql-client";

import { LanguageProvider } from "./lang";
import { SidebarProvider } from "./sidebar";
import { ThemeProvider } from "./theme";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

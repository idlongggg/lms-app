'use client';

/**
 * App Providers
 * Combined providers wrapper for the application
 */

import React from 'react';

import { LanguageProvider } from './language-provider';
import { ThemeProvider } from './theme-provider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}

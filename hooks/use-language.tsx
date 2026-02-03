'use client';

/**
 * useLanguage Hook
 * Re-export from providers for backward compatibility
 */

export type { Language, LanguageOption } from '@/lib/i18n';
export { languages } from '@/lib/i18n';
export { useLanguage, useTranslation } from '@/lib/providers';

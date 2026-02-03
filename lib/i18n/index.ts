/**
 * i18n Module
 * Internationalization utilities for the LMS app
 */

import en from './locales/en.json';
import vi from './locales/vi.json';

export type Language = 'vi' | 'en';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  color: string;
}

export const languages: LanguageOption[] = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', color: 'text-red-500' },
  { code: 'en', label: 'English', flag: '🇺🇸', color: 'text-blue-500' },
];

export const translations = {
  vi,
  en,
} as const;

export type Translations = typeof vi;

/**
 * Get nested value from object using dot notation
 * e.g., getNestedValue(obj, 'common.loading')
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * Interpolate variables in translation string
 * e.g., interpolate('Min {{min}} chars', { min: 5 }) => 'Min 5 chars'
 */
function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;

  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return vars[key] !== undefined ? String(vars[key]) : match;
  });
}

/**
 * Get translation for a key
 */
export function getTranslation(
  language: Language,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const translation = getNestedValue(translations[language] as Record<string, unknown>, key);

  if (!translation) {
    // Fallback to key if translation not found
    console.warn(`Translation not found for key: ${key}`);
    return key;
  }

  return interpolate(translation, vars);
}

export const defaultLanguage: Language = 'vi';

import en from "./locales/en.yaml";
import vi from "./locales/vi.yaml";

export const translations = { en, vi } as const;
export type Language = keyof typeof translations;

export const languages = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳", color: "text-red-500" },
  { code: "en", label: "English", flag: "🇺🇸", color: "text-blue-500" },
] as const satisfies {
  code: Language;
  label: string;
  flag: string;
  color: string;
}[];

export type LanguageOption = (typeof languages)[number];
export const defaultLanguage: Language = "vi";

// Helper to infer all valid dot-notation keys that point to a string
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends string
        ? `${K}`
        : `${K}.${NestedKeyOf<T[K]>}`;
    }[keyof T & (string | number)]
  : never;

export type TxKey = NestedKeyOf<typeof en>;

export function getTranslation(
  lang: Language,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const data = translations[lang];
  const text = key
    .split(".")
    .reduce<unknown>((obj, k) => (obj as Record<string, unknown>)?.[k], data);

  if (typeof text !== "string") {
    console.warn(`Missing translation: ${key} (${lang})`);
    return key;
  }

  return vars
    ? text.replace(/\{\{(\w+)\}\}/g, (_: string, k: string) =>
        String(vars[k] ?? `{{${k}}}`),
      )
    : text;
}

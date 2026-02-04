import { Popover } from "@/components/retroui";
import { type Language, type LanguageOption } from "@/lib/i18n";
import { LanguageIcon } from "@/lib/icons";

interface LanguageSwitcherProps {
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  setLanguage: (code: Language) => void;
  mounted: boolean;
}

export function LanguageSwitcher({
  currentLanguage,
  languages,
  setLanguage,
  mounted,
}: LanguageSwitcherProps) {
  if (!mounted) {
    return (
      <button
        className="border-border bg-background hover:bg-muted flex h-9 w-9 items-center justify-center border-2 transition-all"
        disabled
      >
        <LanguageIcon className="h-4 w-4" />
      </button>
    );
  }

  return (
    <Popover>
      <Popover.Trigger asChild>
        <button
          className="border-border bg-background flex h-9 w-9 items-center justify-center border-2 shadow-xs transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm active:translate-x-0 active:translate-y-0 active:shadow-xs"
          aria-label="Change language"
        >
          <span className={`text-base font-bold ${currentLanguage.color}`}>
            {currentLanguage.code.toUpperCase()}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Content align="end" className="w-48 p-2">
        <div className="space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm transition-colors ${
                lang.code === currentLanguage.code
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <span
                className={`text-base font-bold ${
                  lang.code === currentLanguage.code ? "" : lang.color
                }`}
              >
                {lang.code.toUpperCase()}
              </span>
              <span className="font-medium">{lang.label}</span>
            </button>
          ))}
        </div>
      </Popover.Content>
    </Popover>
  );
}

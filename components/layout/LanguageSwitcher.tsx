import { Button, Menu, Text } from "@/components/ui";
import { type Language, type LanguageOption } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLanguage: LanguageOption;
  languages: LanguageOption[];
  setLanguage: (code: Language) => void;
  mounted: boolean;
  t: (key: string) => string;
}

export function LanguageSwitcher({
  currentLanguage,
  languages,
  setLanguage,
  mounted,
  t,
}: LanguageSwitcherProps) {
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Text className="font-bold">--</Text>
      </Button>
    );
  }

  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          className="size-9"
          size="icon"
          aria-label={t("settings.language")}
        >
          <Text className={`font-bold ${currentLanguage.color}`}>
            {currentLanguage.code.toUpperCase()}
          </Text>
        </Button>
      </Menu.Trigger>
      <Menu.Content align="end" className="w-48 p-1">
        {languages.map((lang) => (
          <Menu.Item key={lang.code} onSelect={() => setLanguage(lang.code)}>
            <Text
              className={`font-bold ${
                lang.code === currentLanguage.code ? "" : lang.color
              }`}
            >
              {lang.code.toUpperCase()}
            </Text>
            <Text className="ml-2">{lang.label}</Text>
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu>
  );
}

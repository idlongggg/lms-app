import { Button, Menu, Text } from "@/components/ui";
import { LanguageIcon } from "@/lib/constants/icons";
import { type Language, type LanguageOption } from "@/lib/i18n";

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
      <Button variant="outline" size="icon" className="h-9 w-9" disabled>
        <LanguageIcon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Menu>
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          aria-label="Change language"
        >
          <Text as="h6" className={`font-bold ${currentLanguage.color}`}>
            {currentLanguage.code.toUpperCase()}
          </Text>
        </Button>
      </Menu.Trigger>
      <Menu.Content align="end" className="w-48 p-1">
        {languages.map((lang) => (
          <Menu.Item key={lang.code} onSelect={() => setLanguage(lang.code)}>
            <Text
              as="h6"
              className={`font-bold ${
                lang.code === currentLanguage.code ? "" : lang.color
              }`}
            >
              {lang.code.toUpperCase()}
            </Text>
            <Text as="p" className="ml-2 text-sm font-medium">
              {lang.label}
            </Text>
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu>
  );
}

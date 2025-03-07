import type { Language, TranslatePair } from "@sj-element/locale";

export interface ConfigProviderProps {
  locale?: Language;
  extendsI18nMsg?: TranslatePair;
}

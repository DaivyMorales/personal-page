import { hasLocale, locales, type Locale } from "./config";
import { en, type Dictionary } from "./en";
import { es } from "./es";

const dictionaries: Record<Locale, Dictionary> = { en, es };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export { defaultLocale, localeCookie } from "./config";
export { hasLocale, locales };
export type { Dictionary, Locale };

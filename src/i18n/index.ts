import de from "./de.json";
import en from "./en.json";

const translations = { de, en } as const;

export type Lang = keyof typeof translations;
export const defaultLang: Lang = "de";
export const languages: Record<Lang, string> = {
  de: "Deutsch",
  en: "English",
};

export function t(lang: Lang): typeof de {
  return translations[lang] ?? translations[defaultLang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  const cleanPath = path.replace(/^\/(de|en)/, "").replace(/^\/+/, "/") || "/";
  if (lang === defaultLang) return cleanPath;
  return `/${lang}${cleanPath === "/" ? "" : cleanPath}`;
}

/** Map of DE paths to EN paths for the language switcher */
const pathMap: Record<string, string> = {
  "/": "/",
  "/buero": "/office",
  "/projekte": "/projects",
  "/kontakt": "/contact",
  "/impressum": "/legal-notice",
  "/datenschutz": "/privacy-policy",
};

const reversePathMap: Record<string, string> = Object.fromEntries(
  Object.entries(pathMap).map(([k, v]) => [v, k])
);

export function getTranslatedPath(path: string, targetLang: Lang): string {
  // Strip existing lang prefix
  const stripped = path.replace(/^\/(de|en)/, "") || "/";

  if (targetLang === "en") {
    // Convert DE path to EN path
    const enPath = pathMap[stripped] ?? stripped;
    return `/en${enPath === "/" ? "" : enPath}`;
  } else {
    // Convert EN path to DE path
    const dePath = reversePathMap[stripped] ?? stripped;
    return dePath;
  }
}

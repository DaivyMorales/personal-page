import type { MetadataRoute } from "next";
import { locales } from "@/content/i18n/config";
import { site } from "@/content/site";

// Each page once per language, with links to its other-language versions.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", changeFrequency: "monthly" as const, priority: 1 },
    { path: "/philosophy", changeFrequency: "yearly" as const, priority: 0.3 },
  ];
  return pages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${path}`,
      changeFrequency,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) },
    })),
  );
}

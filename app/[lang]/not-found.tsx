import Link from "next/link";
import { lang } from "next/root-params";
import { defaultLocale, getDictionary, hasLocale } from "@/content/i18n";

export default async function NotFound() {
  // Not-found pages don't receive params; the root param still tells us the language.
  const current = await lang();
  const locale = hasLocale(current) ? current : defaultLocale;
  const t = getDictionary(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-[1.7em] text-center">
      <h1 className="m-0 font-serif text-[min(28vw,30vh)] font-normal leading-none tracking-[-0.02em]">404</h1>
      <p className="m-0">
        {t.notFound.text} <Link href={`/${locale}`}>{t.notFound.back}</Link>.
      </p>
    </main>
  );
}

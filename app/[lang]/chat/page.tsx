import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Chat } from "@/components/chat";
import { LangSwitch } from "@/components/lang-switch";
import { getDictionary, hasLocale } from "@/content/i18n";
import { site } from "@/content/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/chat">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  // A demo with sample answers: keep it out of search results.
  return { title: t.chat.pageTitle, description: t.chat.intro, robots: { index: false } };
}

export default async function ChatPage({ params }: PageProps<"/[lang]/chat">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <LangSwitch lang={lang} label={t.langSwitch} right />
      {/* The chat reads ?q= from the URL, which needs a Suspense boundary on a static page. */}
      <Suspense fallback={null}>
        <Chat t={t.chat} lang={lang} email={site.email} />
      </Suspense>
    </>
  );
}

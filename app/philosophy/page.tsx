import type { Metadata } from "next";
import Link from "next/link";
import { AskBar } from "@/components/ask-bar";
import { Reveal, ScrubText, Stagger, StaggerItem } from "@/components/motion/reveal";
import { askExamples, philosophy, site } from "@/content/site";

export const metadata: Metadata = {
  title: "How I work",
  description: `${site.name}'s working philosophy: a few principles for building products with care.`,
  alternates: { canonical: "/philosophy" },
};

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function PhilosophyPage() {
  return (
    <div className="solo">
      <Link href="/" className="solo-back">
        <span aria-hidden="true">← </span>
        {site.name}
      </Link>

      <main className="content solo-main">
        <p className="solo-kicker">Philosophy</p>
        <h1 className="solo-title">How I work</h1>
        <Reveal>
          <p>{philosophy.intro}</p>
        </Reveal>

        <blockquote className="verse">
          <p className="verse-text">
            <ScrubText text={philosophy.statement} />
          </p>
        </blockquote>

        <Stagger as="ol" className="creed">
          {philosophy.principles.map((p, i) => (
            <StaggerItem key={p.title} className="creed-item">
              <span className="creed-num" aria-hidden="true">
                {numerals[i]}
              </span>
              <div>
                <h2 className="creed-title">{p.title}</h2>
                <p className="creed-text">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="solo-end">
            If this sounds like how you like to work too, <a href={`mailto:${site.email}`}>write to me</a>.
          </p>
        </Reveal>
      </main>

      <AskBar email={site.email} name={site.name} examples={askExamples} />
    </div>
  );
}

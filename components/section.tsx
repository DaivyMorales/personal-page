import { WipeIn } from "@/components/motion/reveal";
import { site } from "@/content/site";

/** A section whose heading sticks to the top while you read it, prefixed "Daivy:". */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} data-prefix={site.name}>
        <WipeIn>{title}</WipeIn>
      </h2>
      {children}
    </section>
  );
}

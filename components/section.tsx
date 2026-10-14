import { WipeIn } from "@/components/motion/reveal";

/** A section whose heading sticks to the top while you read it, marked with a dot. */
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
      <h2 id={`${id}-title`}>
        <WipeIn>{title}</WipeIn>
      </h2>
      {children}
    </section>
  );
}

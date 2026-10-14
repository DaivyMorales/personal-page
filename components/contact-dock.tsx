import Image from "next/image";
import portrait from "@/assets/daivy.jpg";
import { MailIcon } from "@/components/icons";
import { site } from "@/content/site";

/** Floating pill at the bottom of the screen: your photo and an email button. */
export function ContactDock() {
  return (
    <div className="fixed inset-x-0 bottom-5 z-20 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 rounded-[14px] bg-card p-1 shadow-[var(--card-shadow)]">
        <Image
          src={portrait}
          alt={`Portrait of ${site.name}`}
          width={36}
          height={36}
          sizes="36px"
          placeholder="blur"
          preload
          className="size-9 rounded-[10px] object-cover"
        />
        <a
          href={`mailto:${site.email}`}
          className="flex h-9 items-center gap-2 rounded-[10px] bg-ink px-3.5 text-[13px] font-medium text-ground no-underline transition-opacity hover:opacity-85"
        >
          <MailIcon />
          Reach out via email
        </a>
      </div>
    </div>
  );
}

import Link from "next/link";
import { nav } from "@/content/site";

export function SiteNav({ current, className = "" }: { current: string; className?: string }) {
  return (
    <nav aria-label="Site" className={className}>
      <ul className="m-0 flex list-none flex-wrap gap-x-[18px] gap-y-1 p-0 min-[1120px]:grid min-[1120px]:gap-1.5">
        {nav.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="nav-link"
              aria-current={href === current ? "page" : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

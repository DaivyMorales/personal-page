"use client";

import Link from "next/link";
import { useState } from "react";
import portrait from "@/assets/daivy.jpg";
import { DotText, type DotPainter } from "@/components/motion/dot-text";
import type { Locale } from "@/content/i18n/config";
import type { Dictionary } from "@/content/i18n/en";

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** "Daivy ◉ Morales": the name in serif with a round portrait between the words, like si.gov's "SI 🦅 GOV". */
const paintMark: DotPainter = async (o, w, h, family, inkLight) => {
  const img = await loadImage(portrait.src).catch(() => null);
  const left = "Daivy";
  const right = "Morales";

  let size = h;
  o.font = `400 ${size}px ${family}`;
  const cap = () => o.measureText("M").actualBoundingBoxAscent;
  const layout = () => {
    const a = o.measureText(left);
    const b = o.measureText(right);
    const d = cap() * 1.02; // portrait diameter matches the capital height
    const gap = size * 0.1;
    const total = a.width + gap + d + gap + b.width;
    const tall = a.actualBoundingBoxAscent + Math.max(a.actualBoundingBoxDescent, b.actualBoundingBoxDescent);
    return { a, b, d, gap, total, tall };
  };
  let L = layout();
  const scale = Math.min((w * 0.98) / L.total, (h * 0.96) / L.tall);
  size *= scale;
  o.font = `400 ${size}px ${family}`;
  L = layout();

  const x0 = (w - L.total) / 2;
  const baseline = (h - L.tall) / 2 + L.a.actualBoundingBoxAscent;
  o.fillStyle = inkLight ? "#fff" : "#000";
  o.textBaseline = "alphabetic";
  o.fillText(left, x0, baseline);
  o.fillText(right, x0 + L.a.width + L.gap + L.d + L.gap, baseline);

  if (img) {
    const cx = x0 + L.a.width + L.gap + L.d / 2;
    const cy = baseline - cap() / 2;
    const r = L.d / 2;
    o.save();
    o.beginPath();
    o.arc(cx, cy, r, 0, Math.PI * 2);
    o.clip();
    o.filter = "grayscale(1) contrast(1.35) brightness(1.05)";
    // Crop the square photo to the face.
    const crop = Math.min(img.naturalWidth, img.naturalHeight) * 0.78;
    const sx = (img.naturalWidth - crop) / 2;
    const sy = img.naturalHeight * 0.06;
    o.drawImage(img, sx, sy, crop, crop, cx - r, cy - r, r * 2, r * 2);
    o.restore();
  }
};

/** The site footer, after si.gov's: tagline, sign-up line, link columns, a giant dotted mark. */
export function SiteFooter({
  fullName,
  email,
  lang,
  t,
  sections,
  sdg,
}: {
  fullName: string;
  email: string;
  lang: Locale;
  t: Dictionary["footer"];
  sections: Dictionary["sections"];
  sdg: Dictionary["sdg"];
}) {
  const [address, setAddress] = useState("");
  const home = `/${lang}`;
  const columns = [
    {
      title: t.explore,
      links: [
        { label: sections.about.label, href: `${home}#about` },
        { label: sections.experience.label, href: `${home}#experience` },
        { label: sections.projects.label, href: `${home}#projects` },
      ],
    },
    {
      title: t.more,
      links: [
        { label: sections.education.label, href: `${home}#education` },
        { label: sections.toolkit.label, href: `${home}#toolkit` },
        { label: t.howIWork, href: `${home}/philosophy` },
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="sf-inner">
        <div className="sf-grid">
          <div className="sf-sign">
            <p className="sf-tagline">
              {t.tagline[0]}
              <br />
              {t.tagline[1]}
            </p>
            <form
              className="sf-form"
              onSubmit={(e) => {
                e.preventDefault();
                const body = `${t.mailBody} ${address}.`;
                window.location.href = `mailto:${email}?subject=${encodeURIComponent(t.mailSubject)}&body=${encodeURIComponent(body)}`;
              }}
            >
              <p className="sf-sub">{t.sub}</p>
              <div className="sf-row">
                <label htmlFor="sf-email" className="sr-only">
                  {t.emailLabel}
                </label>
                <input
                  id="sf-email"
                  type="email"
                  required
                  placeholder={t.placeholder}
                  autoComplete="email"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button type="submit">{t.button}</button>
              </div>
            </form>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="sf-head">{col.title}</h4>
              <ul className="sf-list">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h4 className="sf-head">{t.contact}</h4>
            <ul className="sf-list">
              <li>
                <a href={`mailto:${email}`}>{t.emailMe}</a>
              </li>
              <li>
                <Link href={`${home}#contact`}>{sections.contact.label}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="sf-mark" role="img" aria-label={fullName}>
          <DotText text={fullName} paint={paintMark} fontClassName="font-serif" step={6} halftone assembleOnView shimmer className="sf-dots" />
        </div>

        <div className="sf-legal">
          <span>© {fullName}</span>
          <span className="sf-legal-right">
            <Link href={`${home}/philosophy`}>{t.howIWork}</Link>
            <span aria-hidden="true">·</span>
            {/* Bach signed his scores "S.D.G.": Soli Deo Gloria. */}
            <span className="sdg" tabIndex={0} aria-label={sdg.aria}>
              <span aria-hidden="true">S.D.G.</span>
              <span className="sdg-reveal" aria-hidden="true">
                Soli Deo Gloria · <em>{sdg.trust}</em>
              </span>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

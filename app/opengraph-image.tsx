import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { en } from "@/content/i18n/en";
import { site } from "@/content/site";

// The share image is shared by both languages, so it uses the English copy.
const tagline = "Product AI Engineer";

export const alt = `${site.name} · ${tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const portrait = await readFile(join(process.cwd(), "assets/daivy.jpg"));
const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 96,
          background: "#ffffff",
          color: "#000000",
          fontSize: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={portraitSrc} width={88} height={88} alt="" style={{ borderRadius: 999, marginRight: 12 }} />
          <span style={{ fontWeight: 600 }}>{site.name}</span>
          <span style={{ color: "#8f8f8f" }}>· {tagline}</span>
        </div>
        <div style={{ display: "flex", fontSize: 64, lineHeight: 1.15, maxWidth: 900 }}>
          {en.about.quote.text}
        </div>
        <div style={{ display: "flex", height: 1, background: "#ebebeb" }} />
      </div>
    ),
    size,
  );
}

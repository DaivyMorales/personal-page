import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} · ${site.tagline}`;
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
          background: "#efebd9",
          color: "#2b2a2d",
          fontSize: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={portraitSrc} width={88} height={88} alt="" style={{ borderRadius: 999, marginRight: 12 }} />
          <span style={{ fontWeight: 600, color: "#2e5339" }}>{site.name}</span>
          <span style={{ color: "#5d5c55" }}>· {site.tagline}</span>
        </div>
        <div style={{ display: "flex", fontSize: 64, lineHeight: 1.15, maxWidth: 900 }}>
          {site.headline}
        </div>
        <div style={{ display: "flex", height: 1, background: "#9aab7c" }} />
      </div>
    ),
    size,
  );
}

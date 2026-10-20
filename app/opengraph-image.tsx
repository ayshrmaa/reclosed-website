import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Reclosed. Your next booked call is already in your CRM.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const mark = await readFile(join(process.cwd(), "public/logo-mark.png"));

  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 72px", background: "#061055", color: "#ffffff" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34 }}>
        {/* ImageResponse embeds the local brand mark directly in the social card. */}
        <img src={`data:image/png;base64,${mark.toString("base64")}`} width={38} height={44} alt="" />
        <span>Reclosed</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", maxWidth: 990, fontSize: 74, lineHeight: 1.1, letterSpacing: -3 }}>Your next booked call is already in your CRM.</div>
        <div style={{ display: "flex", fontSize: 25, color: "#bac8f0" }}>Reach out. Qualify. Book.</div>
      </div>
      <div style={{ display: "flex", fontSize: 20, color: "#bac8f0" }}>Context-aware AI lead reactivation</div>
    </div>,
    size,
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#050816",
          padding: "60px",
          fontFamily: "sans-serif",
          color: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(0, 229, 255, 0.15) 0%, transparent 40%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid rgba(0, 229, 255, 0.3)",
            backgroundColor: "rgba(0, 229, 255, 0.05)",
            padding: "8px 16px",
            borderRadius: "9999px",
            color: "#00E5FF",
            fontSize: "14px",
            letterSpacing: "0.2em",
          }}
        >
          <span>●</span> NEXUS AI OS // CLEARANCE: ALPHA
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#00E5FF",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            SAM EBENEZER P
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#A5B4C3",
              fontWeight: 400,
            }}
          >
            Full Stack Software Engineer • Java Specialist • AI Architect
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(0, 229, 255, 0.15)",
            paddingTop: "24px",
            color: "#00FF88",
            fontSize: "16px",
            letterSpacing: "0.1em",
          }}
        >
          <div>Karunya University B.Tech CSE (2023–2027)</div>
          <div style={{ color: "#00E5FF" }}>samebenezer.dev</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

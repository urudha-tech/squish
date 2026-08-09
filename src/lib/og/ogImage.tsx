import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

interface OgImageProps {
  title: string
  subtitle?: string
  category?: string
  tools?: string[]
}

export function buildOgImage({ title, subtitle, category, tools }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif',
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background texture — subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "white",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "white",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "900",
              color: "#0A0A0A",
              lineHeight: 1,
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#888",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Squish
          </span>
          {category && (
            <>
              <span style={{ color: "#333", fontSize: "22px" }}>·</span>
              <span
                style={{
                  fontSize: "16px",
                  color: "#555",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                {category}
              </span>
            </>
          )}
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: title.length > 28 ? "60px" : "72px",
            fontWeight: "900",
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
            marginTop: "48px",
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              fontSize: "26px",
              color: "#777",
              marginTop: "20px",
              fontWeight: "400",
              lineHeight: 1.4,
              maxWidth: "800px",
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Tool pills */}
        {tools && tools.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "36px",
              flexWrap: "wrap",
            }}
          >
            {tools.map((tool) => (
              <div
                key={tool}
                style={{
                  background: "#1A1A1A",
                  border: "1px solid #2A2A2A",
                  borderRadius: "100px",
                  padding: "8px 20px",
                  fontSize: "16px",
                  color: "#999",
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontWeight: "500",
                }}
              >
                {tool}
              </div>
            ))}
          </div>
        )}

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: "15px",
              color: "#444",
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
            }}
          >
            <span>Nothing uploaded</span>
            <span>·</span>
            <span>No sign-up</span>
            <span>·</span>
            <span>Free forever</span>
          </div>
          <div
            style={{
              fontSize: "15px",
              color: "#444",
              fontFamily: '"Courier New", Courier, monospace',
              letterSpacing: "0.05em",
            }}
          >
            squish.urudha.com
          </div>
        </div>
      </div>
    ),
    { ...ogSize }
  )
}

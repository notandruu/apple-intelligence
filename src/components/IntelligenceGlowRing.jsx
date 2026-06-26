import { useState, useEffect, useRef } from "react";

// Exact colors from IntelligenceGlow/Sources/IntelligenceGlow/Colors.swift
const COLORS = [
  "rgb(188,130,243)", // purple
  "rgb(245,185,234)", // pink
  "rgb(141,159,255)", // blue
  "rgb(255,103,120)", // red
  "rgb(255,186,113)", // orange
  "rgb(198,134,255)", // purple2
];

// Scaled from lineWidths:[6,9,11,15] blurs:[0,4,12,15] for a 40px circle button
const LAYERS = [
  { lineWidth: 2,   blur: 0,   duration: 500  },
  { lineWidth: 3.5, blur: 2,   duration: 600  },
  { lineWidth: 5,   blur: 6,   duration: 800  },
  { lineWidth: 7,   blur: 9,   duration: 1000 },
];

const BASE_INTERVAL_MS = 400;
const MIN_INTERVAL_MS  = 80; // fastest when voice is loudest

function generateStops() {
  return [...COLORS]
    .map((c) => ({ c, pos: Math.random() }))
    .sort((a, b) => a.pos - b.pos)
    .map(({ c, pos }) => `${c} ${(pos * 100).toFixed(1)}%`)
    .join(", ");
}

/**
 * Wraps any element with an Apple Intelligence–style animated glow ring.
 * Faithfully ports IntelligenceGlow's layered strokeBorder + blur approach,
 * with mic-reactive animation speed and opacity.
 *
 * @param {number}  size        Diameter of the button in px (default 40)
 * @param {number}  opacity     Base ring opacity (0–1)
 * @param {boolean} active      Whether to animate gradient cycling
 * @param {number}  audioLevel  Normalized mic level 0–1; drives speed + intensity
 */
export function IntelligenceGlowRing({
  children,
  size = 40,
  opacity = 1,
  active = true,
  audioLevel = 0,
}) {
  const [stops, setStops] = useState(() => generateStops());
  const intervalRef = useRef(null);
  const radius = size / 2;

  // Recompute update interval whenever audioLevel changes
  useEffect(() => {
    if (!active) {
      clearInterval(intervalRef.current);
      return;
    }

    const interval = Math.round(
      BASE_INTERVAL_MS - audioLevel * (BASE_INTERVAL_MS - MIN_INTERVAL_MS)
    );

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setStops(generateStops()), interval);

    return () => clearInterval(intervalRef.current);
  }, [active, audioLevel]);

  // Mic-reactive scale: outer ring expands slightly with voice
  const scaleBoost = 1 + audioLevel * 0.18;
  // Mic-reactive opacity: breathes with voice
  const effectiveOpacity = opacity + audioLevel * (1 - opacity) * 0.5;

  const gradient = `conic-gradient(${stops}, ${stops.split(",")[0].trim()})`;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {children}

      {LAYERS.map(({ lineWidth, blur, duration }, i) => {
        const ringDiameter = (size + lineWidth * 2) * (i === LAYERS.length - 1 ? scaleBoost : 1);
        return (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width:  ringDiameter,
              height: ringDiameter,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: gradient,
              WebkitMaskImage: `radial-gradient(circle, transparent ${radius - 0.5}px, black ${radius + 0.5}px)`,
              maskImage: `radial-gradient(circle, transparent ${radius - 0.5}px, black ${radius + 0.5}px)`,
              filter: blur > 0 ? `blur(${blur + audioLevel * 4}px)` : undefined,
              opacity: effectiveOpacity,
              transition: `background ${duration}ms ease-in-out, opacity 80ms ease-out, width 120ms ease-out, height 120ms ease-out`,
              pointerEvents: "none",
              zIndex: -1,
            }}
          />
        );
      })}
    </div>
  );
}

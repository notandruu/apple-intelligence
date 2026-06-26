import { useState, useEffect, useRef } from "react";

const COLORS = [
  "rgb(188,130,243)",
  "rgb(245,185,234)",
  "rgb(141,159,255)",
  "rgb(255,103,120)",
  "rgb(255,186,113)",
  "rgb(198,134,255)",
];

const LAYERS = [
  { lineWidth: 3,   blur: 0,   duration: 500  },
  { lineWidth: 5,   blur: 3,   duration: 600  },
  { lineWidth: 8,   blur: 8,   duration: 800  },
  { lineWidth: 14,  blur: 16,  duration: 1000 },
];

const BASE_INTERVAL_MS = 400;
const MIN_INTERVAL_MS  = 60;

// Inject keyframes once
if (typeof document !== "undefined" && !document.getElementById("iglow-kf")) {
  const s = document.createElement("style");
  s.id = "iglow-kf";
  s.textContent = `
    @keyframes iglow-enter {
      0%   { transform: scale(0.05); opacity: 0; }
      55%  { transform: scale(1.4);  opacity: 1; }
      72%  { transform: scale(0.88); opacity: 1; }
      84%  { transform: scale(1.10); opacity: 1; }
      93%  { transform: scale(0.97); opacity: 1; }
      100% { transform: scale(1);    opacity: 1; }
    }
    @keyframes iglow-exit {
      0%   { transform: scale(1);    opacity: 1; }
      100% { transform: scale(0.05); opacity: 0; }
    }
  `;
  document.head.appendChild(s);
}

function generateStops() {
  return [...COLORS]
    .map((c) => ({ c, pos: Math.random() }))
    .sort((a, b) => a.pos - b.pos)
    .map(({ c, pos }) => `${c} ${(pos * 100).toFixed(1)}%`)
    .join(", ");
}

export function IntelligenceGlowRing({
  children,
  size = 40,
  opacity = 1,
  active = true,
  audioLevel = 0,
}) {
  const [stops, setStops] = useState(() => generateStops());
  const [animState, setAnimState] = useState("idle"); // idle | entering | active | exiting
  const intervalRef = useRef(null);
  const prevActive = useRef(false);
  const radius = size / 2;

  // Entry / exit when active flips
  useEffect(() => {
    const was = prevActive.current;
    prevActive.current = active;

    if (active && !was) {
      setAnimState("entering");
      const t = setTimeout(() => setAnimState("active"), 750);
      return () => clearTimeout(t);
    }
    if (!active && was) {
      setAnimState("exiting");
      const t = setTimeout(() => setAnimState("idle"), 300);
      return () => clearTimeout(t);
    }
  }, [active]);

  // Color cycling speed driven by audio level
  useEffect(() => {
    const shouldCycle = animState === "active" || animState === "entering";
    if (!shouldCycle) { clearInterval(intervalRef.current); return; }
    const ms = Math.round(BASE_INTERVAL_MS - audioLevel * (BASE_INTERVAL_MS - MIN_INTERVAL_MS));
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setStops(generateStops()), ms);
    return () => clearInterval(intervalRef.current);
  }, [animState, audioLevel]);

  const blurBoost        = audioLevel * 12;
  const effectiveOpacity = Math.min(1, opacity + audioLevel * 0.7);
  const gradient         = `conic-gradient(${stops}, ${stops.split(",")[0].trim()})`;

  // Wrapper big enough for max ring + blur overshoot
  const wrapperSize = 180;

  const wrapperAnim =
    animState === "entering" ? "iglow-enter 750ms cubic-bezier(0.22,1,0.36,1) forwards" :
    animState === "exiting"  ? "iglow-exit  300ms ease-in forwards" :
    "none";

  // Idle: always show a very dim ring so the user knows it's there
  const idleLayerOpacity = 0.2;

  return (
    <div style={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: wrapperSize,
      height: wrapperSize,
      animation: wrapperAnim,
    }}>
      {LAYERS.map(({ lineWidth, blur, duration }, i) => {
        const isIdle = animState === "idle";
        const layerScale = isIdle ? 1 : 1 + audioLevel * 0.5 * ((i + 1) / LAYERS.length);
        const ringDiameter = (size + lineWidth * 2) * layerScale;
        const layerOpacity = isIdle ? idleLayerOpacity : effectiveOpacity;
        const layerBlur    = isIdle ? blur : blur + blurBoost * ((i + 1) / LAYERS.length);

        return (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              width:  ringDiameter,
              height: ringDiameter,
              borderRadius: "50%",
              background: gradient,
              WebkitMaskImage: `radial-gradient(circle, transparent ${radius - 0.5}px, black ${radius + 0.5}px)`,
              maskImage: `radial-gradient(circle, transparent ${radius - 0.5}px, black ${radius + 0.5}px)`,
              filter: layerBlur > 0 ? `blur(${layerBlur}px)` : undefined,
              opacity: layerOpacity,
              transition: `background ${duration}ms ease-in-out, opacity 100ms ease-out, width 80ms ease-out, height 80ms ease-out`,
              pointerEvents: "none",
            }}
          />
        );
      })}

      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

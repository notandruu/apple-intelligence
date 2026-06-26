import { useState } from "react";

/**
 * Returns a normalized audio level (0–1) sourced directly from audioManager's
 * existing _silenceAnalyser — no second getUserMedia call, no sandbox issues.
 * The level is updated every ~100 ms while recording.
 */
export function useAudioLevel() {
  const [level, setLevel] = useState(0);
  return { level, setLevel };
}

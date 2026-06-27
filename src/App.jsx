import React, { useEffect } from "react";
import "./index.css";
import { useAudioRecording } from "./hooks/useAudioRecording";
import { useSettingsStore } from "./stores/settingsStore";
import { IntelligenceGlowRing } from "./components/IntelligenceGlowRing";

export default function App() {
  const panelStartPosition = useSettingsStore((s) => s.panelStartPosition);
  const { isRecording, isProcessing, audioLevel } = useAudioRecording(null, {});

  // The dictation panel is a passive visual only — triggered entirely by the
  // Globe/Fn hotkey. Force the window permanently click-through so it never
  // captures clicks or blocks whatever is beneath it in the screen corner.
  useEffect(() => {
    window.electronAPI?.setMainWindowInteractivity?.(false);
  }, []);

  return (
    <div className="dictation-window">
      <div
        className={`fixed bottom-1 z-50 pointer-events-none ${
          panelStartPosition === "bottom-left"
            ? "left-1"
            : panelStartPosition === "center"
              ? "left-1/2 -translate-x-1/2"
              : "right-1"
        }`}
      >
        <IntelligenceGlowRing
          size={40}
          opacity={isRecording ? 0.7 : isProcessing ? 0.5 : 0.3}
          active={isRecording || isProcessing}
          audioLevel={isRecording ? audioLevel : 0}
        />
      </div>
    </div>
  );
}

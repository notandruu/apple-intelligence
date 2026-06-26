import React, { useState, useLayoutEffect, useRef } from "react";
import "./index.css";
import { useWindowDrag } from "./hooks/useWindowDrag";
import { useAudioRecording } from "./hooks/useAudioRecording";
import { useSettingsStore } from "./stores/settingsStore";
import { IntelligenceGlowRing } from "./components/IntelligenceGlowRing";

export default function App() {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const { isDragging, handleMouseDown, handleMouseUp } = useWindowDrag();

  const [dragStartPos, setDragStartPos] = useState(null);
  const [hasDragged, setHasDragged] = useState(false);

  const panelStartPosition = useSettingsStore((s) => s.panelStartPosition);

  const setWindowInteractivity = React.useCallback((shouldCapture) => {
    window.electronAPI?.setMainWindowInteractivity?.(shouldCapture);
  }, []);

  const { isRecording, isProcessing, audioLevel, toggleListening, cancelRecording } =
    useAudioRecording(null, {});

  const isRecordingRef = useRef(isRecording);
  useLayoutEffect(() => { isRecordingRef.current = isRecording; }, [isRecording]);

  return (
    <div className="dictation-window">
      <div
        className={`fixed bottom-1 z-50 ${
          panelStartPosition === "bottom-left"
            ? "left-1"
            : panelStartPosition === "center"
              ? "left-1/2 -translate-x-1/2"
              : "right-1"
        }`}
        onMouseEnter={() => { setIsHovered(true);  setWindowInteractivity(true);  }}
        onMouseLeave={() => { setIsHovered(false); setWindowInteractivity(false); }}
      >
        <IntelligenceGlowRing
          size={40}
          opacity={isRecording ? 0.7 : isProcessing ? 0.5 : isHovered ? 0.65 : 0.3}
          active={isRecording || isHovered || isProcessing}
          audioLevel={isRecording ? audioLevel : 0}
        >
          <button
            ref={buttonRef}
            onMouseDown={(e) => {
              setDragStartPos({ x: e.clientX, y: e.clientY });
              setHasDragged(false);
              handleMouseDown(e);
            }}
            onMouseMove={(e) => {
              if (dragStartPos && !hasDragged) {
                const dx = e.clientX - dragStartPos.x;
                const dy = e.clientY - dragStartPos.y;
                if (Math.sqrt(dx * dx + dy * dy) > 5) setHasDragged(true);
              }
            }}
            onMouseUp={(e) => {
              handleMouseUp(e);
              setDragStartPos(null);
            }}
            onClick={(e) => {
              if (!hasDragged) toggleListening();
              e.preventDefault();
            }}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            className="rounded-full w-10 h-10 bg-transparent border-none outline-none"
            style={{ cursor: isDragging ? "grabbing" : "pointer" }}
          />
        </IntelligenceGlowRing>
      </div>
    </div>
  );
}

import logger from "./logger";
import { getSettings } from "../stores/settingsStore";
import startSound from "../assets/siri-start.mp3";

let audioContext = null;
let startBuffer = null;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!audioContext || audioContext.state === "closed") audioContext = new Ctor();
  return audioContext;
};

export const resumeContextIfNeeded = async () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return null;
    if (ctx.state === "suspended") await ctx.resume();
    return ctx.state === "running" ? ctx : null;
  } catch (error) {
    logger.debug("Failed to initialize dictation cue audio context", { error: String(error) }, "audio");
    return null;
  }
};

const loadStartBuffer = async (ctx) => {
  if (startBuffer) return startBuffer;
  try {
    const response = await fetch(startSound);
    const arrayBuffer = await response.arrayBuffer();
    startBuffer = await ctx.decodeAudioData(arrayBuffer);
  } catch (error) {
    logger.debug("Failed to load start cue audio", { error: String(error) }, "audio");
  }
  return startBuffer;
};

export const playStartCue = async () => {
  try {
    if (!getSettings().audioCuesEnabled) return;
    const ctx = await resumeContextIfNeeded();
    if (!ctx) return;
    const buffer = await loadStartBuffer(ctx);
    if (!buffer) return;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  } catch (error) {
    logger.debug("Failed to play start cue", { error: String(error) }, "audio");
  }
};

// Stop cue removed — screen glow is the only feedback needed.
export const playStopCue = () => {};

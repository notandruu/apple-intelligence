# Apple Intelligence

Personal voice dictation for macOS, built around on-device Whisper transcription with an Apple Intelligence–style UI. Press a hotkey anywhere, speak, and your words appear in whatever app you're using.

## What it does

- **Voice dictation** — global hotkey (Globe/Fn by default) triggers recording from any app
- **Local transcription** — runs OpenAI Whisper models fully on-device; nothing leaves your machine
- **Siri screen glow** — Metal-rendered animated gradient border wraps your entire display while speaking, faithful recreation of the iOS 18 Siri animation
- **Intelligence glow ring** — Apple Intelligence–style layered angular gradient ring on the dictation button, mic-reactive in real time
- **Siri activation sound** — authentic Siri single-tone cue on recording start
- **Transcription history** — SQLite-backed log of everything dictated, searchable
- **Notes & meeting transcription** — long-form recording with AI formatting
- **Cloud providers** — optional fallback to OpenAI, Groq, Mistral, AssemblyAI, Deepgram
- **Custom dictionary** — teach it names and technical terms

## Requirements

- macOS 15 (Sequoia) or later
- Node.js 24
- Xcode 26 (for the Metal screen glow helper)

## Setup

```bash
git clone https://github.com/notandruu/apple-intelligence
cd apple-intelligence
npm install
npm run compile:native   # compiles Swift helpers (Globe key, mic listener, etc.)
npm run dev              # starts Vite + Electron
```

On first launch go through the brief setup to pick a transcription model. **Large v3** (~3 GB) gives the best accuracy and downloads automatically when selected.

## Models

| Model | Size | Speed | Quality |
|---|---|---|---|
| Tiny | 75 MB | Fastest | Basic |
| Base | 142 MB | Fast | Good |
| Small | 466 MB | Medium | Better |
| Large v3 | 3 GB | Slower | Best |
| Turbo | 1.6 GB | Fast | Good |

Large v3 is recommended. On an M3 Max the inference is near-instant for conversational speech.

## Screen glow

The full-screen Siri animation is a standalone macOS helper (`resources/mac/SiriGlowHelper.app`) spawned when recording starts, controlled over stdin. It uses a Metal shader ported from [metasidd/Prototype-Siri-Screen-Animation](https://github.com/metasidd/Prototype-Siri-Screen-Animation) and renders at screen-saver window level, appearing above all apps including the menu bar.

## Intelligence ring

The dictation button uses the layered stroke + blur technique from [Livsy90/IntelligenceGlow](https://github.com/Livsy90/IntelligenceGlow), ported to React. Four concentric rings with an animated angular gradient cycling through the six Apple Intelligence colors every 400 ms, pulsing with your voice in real time via the existing audio analyser.

## Hotkey

Default: **Globe / Fn**. Change in Settings → Hotkeys.

## Credits

Built on top of [OpenWhispr](https://github.com/notandruu/openwhispr) — the open-source Electron dictation app that provides the core audio pipeline, transcription engine, IPC architecture, and settings system this project is built on.

Additional credits:
- [metasidd/Prototype-Siri-Screen-Animation](https://github.com/metasidd/Prototype-Siri-Screen-Animation) — Metal screen glow shader
- [Livsy90/IntelligenceGlow](https://github.com/Livsy90/IntelligenceGlow) — Intelligence ring effect

## License

MIT

<p align="center">
  <img src="src/assets/logo.svg" alt="Apple Intelligence" width="120" />
</p>

<h1 align="center">Apple Intelligence</h1>

<p align="center">
  <a href="https://github.com/Apple Intelligence/apple-intelligence/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Apple Intelligence/apple-intelligence?style=flat" alt="License" /></a>
  <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey?style=flat" alt="Platform" />
  <a href="https://github.com/Apple Intelligence/apple-intelligence/releases/latest"><img src="https://img.shields.io/github/v/release/Apple Intelligence/apple-intelligence?style=flat&sort=semver" alt="GitHub release" /></a>
  <a href="https://github.com/Apple Intelligence/apple-intelligence/releases"><img src="https://img.shields.io/github/downloads/Apple Intelligence/apple-intelligence/total?style=flat&color=blue" alt="Downloads" /></a>
  <a href="https://github.com/Apple Intelligence/apple-intelligence/stargazers"><img src="https://img.shields.io/github/stars/Apple Intelligence/apple-intelligence?style=flat" alt="GitHub stars" /></a>
</p>

<p align="center">
  The open-source and free alternative to WisprFlow and Granola.<br/>
  Privacy-first voice-to-text dictation with AI agents, meeting transcription, and notes. Cross-platform for macOS, Windows, and Linux.
</p>

<p align="center">
  <a href="https://apple-intelligence.com">Website</a> &middot;
  <a href="https://docs.apple-intelligence.com">Docs</a> &middot;
  <a href="https://github.com/Apple Intelligence/apple-intelligence/releases/latest">Download</a> &middot;
  <a href="https://docs.apple-intelligence.com/api/overview">API</a> &middot;
  <a href="https://github.com/Apple Intelligence/apple-intelligence/blob/main/CHANGELOG.md">Changelog</a>
</p>

---

Apple Intelligence turns your voice into text, notes, and actions from your desktop. Press a hotkey, speak, and your words appear at your cursor. Choose between fully private offline transcription with local speech-to-text engines like Whisper and NVIDIA Parakeet — where your audio never leaves your device — or cloud processing for speed. No data collection, no telemetry, fully open source.

## Download

| Platform              | Download                                                                                                                                                                                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| macOS (Apple Silicon) | [`.dmg`](https://github.com/Apple Intelligence/apple-intelligence/releases/latest)                                                                                                                                                                                                                        |
| macOS (Intel)         | [`.dmg`](https://github.com/Apple Intelligence/apple-intelligence/releases/latest)                                                                                                                                                                                                                        |
| Windows               | [`.exe`](https://github.com/Apple Intelligence/apple-intelligence/releases/latest)                                                                                                                                                                                                                        |
| Linux                 | [`.AppImage`](https://github.com/Apple Intelligence/apple-intelligence/releases/latest) / [`.deb`](https://github.com/Apple Intelligence/apple-intelligence/releases/latest) / [`.rpm`](https://github.com/Apple Intelligence/apple-intelligence/releases/latest) / [`.tar.gz`](https://github.com/Apple Intelligence/apple-intelligence/releases/latest) |

## Features

- **Voice dictation** — global hotkey to dictate into any app with automatic pasting
- **AI agent** — talk to GPT-5, Claude, Gemini, Groq, or local models with a named voice assistant
- **Voice agent hotkey** — dedicated hotkey that sends your dictation straight to your AI agent as a command, no wake word needed and no cleanup pass
- **Meeting transcription** — auto-detect Zoom, Teams, and FaceTime calls with live speaker diarization, voice fingerprinting, and Google Calendar integration
- **Local speaker diarization** — on-device speaker labelling with voice fingerprint recognition across meetings, no cloud required
- **Notes** — create, organize, and search notes with folders, semantic search, cloud sync, and AI actions
- **Local or cloud — your choice** — all core features (transcription, AI reasoning, speaker diarization, semantic search) work with local models or cloud providers
- **Public API & MCP** — manage notes and transcriptions programmatically or connect your AI assistant via the [MCP server](https://docs.apple-intelligence.com/integrations/mcp)

## Quick start

```bash
git clone https://github.com/Apple Intelligence/apple-intelligence.git
cd apple-intelligence
npm install
npm run dev
```

Requires Node.js 24+. See the [full documentation](https://docs.apple-intelligence.com/quickstart) for setup guides, platform-specific instructions, and build details.

## Documentation

Visit **[docs.apple-intelligence.com](https://docs.apple-intelligence.com)** for:

- [Getting started](https://docs.apple-intelligence.com/quickstart)
- [Platform guides](https://docs.apple-intelligence.com/platform/macos) (macOS, Windows, Linux)
- [API reference](https://docs.apple-intelligence.com/api/overview)
- [MCP server setup](https://docs.apple-intelligence.com/integrations/mcp)
- [Troubleshooting](https://docs.apple-intelligence.com/troubleshooting)

## Tech stack

React 19, TypeScript, Tailwind CSS v4, Electron 41, better-sqlite3, whisper.cpp, sherpa-onnx, shadcn/ui

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Apple Intelligence/apple-intelligence&type=date&legend=top-left)](https://www.star-history.com/#Apple Intelligence/apple-intelligence&type=date&legend=top-left)

## Sponsors

<p align="center">
  <a href="https://console.neon.tech/app/?promo=apple-intelligence">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://neon.com/brand/neon-logo-dark-color.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://neon.com/brand/neon-logo-light-color.svg">
      <img width="250" alt="Neon" src="https://neon.com/brand/neon-logo-light-color.svg">
    </picture>
  </a>
</p>

<p align="center"><a href="https://console.neon.tech/app/?promo=apple-intelligence">Neon</a> is the serverless Postgres platform powering Apple Intelligence Cloud.</p>

## Contributing

We welcome contributions. Fork the repo, create a feature branch, and open a pull request. See the [contributing guide](https://docs.apple-intelligence.com/contributing) for development setup and guidelines.

## License

[MIT](LICENSE) — free for personal and commercial use.

## Acknowledgments

- **[OpenAI Whisper](https://github.com/openai/whisper)** — speech recognition model powering local and cloud transcription
- **[whisper.cpp](https://github.com/ggerganov/whisper.cpp)** — high-performance C++ implementation for local processing
- **[NVIDIA Parakeet](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3)** — fast multilingual ASR model
- **[sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx)** — cross-platform ONNX runtime for Parakeet inference
- **[Hugging Face](https://huggingface.co/)** — model hub hosting Whisper, Parakeet, and embedding model weights
- **[llama.cpp](https://github.com/ggerganov/llama.cpp)** — local LLM inference for AI text processing
- **[Electron](https://www.electronjs.org/)** — cross-platform desktop framework
- **[React](https://react.dev/)** — UI component library
- **[shadcn/ui](https://ui.shadcn.com/)** — accessible components built on Radix primitives
- **[Neon](https://console.neon.tech/app/?promo=apple-intelligence)** — serverless Postgres powering Apple Intelligence Cloud

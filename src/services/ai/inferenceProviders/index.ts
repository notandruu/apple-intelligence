import type { InferenceProvider } from "./types";
import { anthropicProvider } from "./anthropic";
import { geminiProvider } from "./gemini";
import { groqProvider } from "./groq";
import { localProvider } from "./local";
import { enterpriseProvider } from "./enterprise";
import { apple-intelligenceProvider } from "./apple-intelligence";
import { lanProvider } from "./lan";
import { openaiProvider } from "./openai";

export const PROVIDER_REGISTRY: Readonly<Record<string, InferenceProvider>> = Object.freeze({
  openai: openaiProvider,
  custom: openaiProvider,
  anthropic: anthropicProvider,
  gemini: geminiProvider,
  groq: groqProvider,
  local: localProvider,
  bedrock: enterpriseProvider,
  azure: enterpriseProvider,
  vertex: enterpriseProvider,
  apple-intelligence: apple-intelligenceProvider,
  lan: lanProvider,
});

export type { InferenceProvider, ProviderContext, ProviderCallParams } from "./types";

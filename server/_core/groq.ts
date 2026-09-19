export const GUARDIAN_GROQ_MODEL = "openai/gpt-oss-20b";
export const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";

export type GroqChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type GroqChatParams = {
  messages: GroqChatMessage[];
  maxCompletionTokens?: number;
};

type GroqChatResponse = {
  model?: string;
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

export function buildGroqChatPayload(params: GroqChatParams) {
  return {
    model: GUARDIAN_GROQ_MODEL,
    messages: params.messages,
    temperature: 0.2,
    max_completion_tokens: params.maxCompletionTokens ?? 650,
    stream: false,
  };
}

export async function invokeGroqChat(params: GroqChatParams) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildGroqChatPayload(params)),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    throw new Error(`Groq request failed with status ${response.status}`);
  }

  const result = (await response.json()) as GroqChatResponse;
  const content = result.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("Groq returned an empty response");
  }

  return {
    content,
    model: result.model || GUARDIAN_GROQ_MODEL,
  };
}

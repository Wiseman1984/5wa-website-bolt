import { invokeLLM, type Message } from "./llm";

export type GroqChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type GroqChatParams = {
  messages: GroqChatMessage[];
  maxCompletionTokens?: number;
};

export async function invokeGroqChat(params: GroqChatParams) {
  const messages: Message[] = params.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const result = await invokeLLM({
    messages,
    maxTokens: params.maxCompletionTokens ?? 4096,
  });

  const choice = result.choices?.[0];
  if (!choice) {
    throw new Error("LLM returned no choices");
  }

  const raw = choice.message?.content;
  let content: string;

  if (typeof raw === "string") {
    content = raw.trim();
  } else if (Array.isArray(raw)) {
    content = raw
      .filter(
        (p): p is { type: "text"; text: string } =>
          p.type === "text" && typeof p.text === "string"
      )
      .map((p) => p.text)
      .join("\n")
      .trim();
  } else {
    content = "";
  }

  if (!content) {
    throw new Error("LLM returned an empty response");
  }

  return {
    content,
    model: result.model || "platform-llm",
  };
}

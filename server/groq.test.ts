import { describe, expect, it } from "vitest";
import {
  buildGroqChatPayload,
  GROQ_CHAT_COMPLETIONS_URL,
  GUARDIAN_GROQ_MODEL,
} from "./_core/groq";

describe("Guardian AI Groq provider", () => {
  it("uses the approved production model with a bounded non-streaming payload", () => {
    const payload = buildGroqChatPayload({
      messages: [
        { role: "system", content: "Defensive guidance only." },
        { role: "user", content: "How should I prepare?" },
      ],
      maxCompletionTokens: 650,
    });

    expect(GROQ_CHAT_COMPLETIONS_URL).toBe("https://api.groq.com/openai/v1/chat/completions");
    expect(GUARDIAN_GROQ_MODEL).toBe("openai/gpt-oss-20b");
    expect(payload.model).toBe("openai/gpt-oss-20b");
    expect(payload.max_completion_tokens).toBe(650);
    expect(payload.stream).toBe(false);
    expect(payload).not.toHaveProperty("tools");
    expect(payload).not.toHaveProperty("tool_choice");
  });
});

import { describe, expect, it } from "vitest";

import { invokeGroqChat } from "./_core/groq";

const runIntegration = process.env.RUN_GROQ_INTEGRATION === "1";

describe.runIf(runIntegration)("Groq project secret", () => {
  it("authenticates and exposes an approved production text model", async () => {
    const apiKey = process.env.GROQ_API_KEY;
    expect(apiKey, "GROQ_API_KEY must be present in the server environment").toBeTruthy();

    const response = await fetch("https://api.groq.com/openai/v1/models", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10_000),
    });

    expect(response.status, "Groq models endpoint should accept the configured key").toBe(200);
    const body = (await response.json()) as { data?: Array<{ id?: string; active?: boolean }> };
    const availableIds = new Set((body.data ?? []).map((model) => model.id).filter(Boolean));

    expect(
      ["llama-3.1-8b-instant", "llama-3.3-70b-versatile", "openai/gpt-oss-20b"].some((id) => availableIds.has(id)),
      "Groq account should expose at least one approved production text model",
    ).toBe(true);
  }, 15_000);

  it("generates a short Traditional Chinese response through the server-side Groq client", async () => {
    const result = await invokeGroqChat({
      messages: [
        {
          role: "system",
          content: "Respond only in Traditional Chinese used in Taiwan. Do not use Simplified Chinese.",
        },
        {
          role: "user",
          content: "請用一句話提醒我在公開活動中不要透露即時位置。",
        },
      ],
      maxCompletionTokens: 300,
    });

    expect(result.content).toMatch(/[\u3400-\u9fff]/);
    expect(result.content).toMatch(/位置|行蹤|地點/);
  }, 20_000);
});

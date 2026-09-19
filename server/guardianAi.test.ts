import { describe, expect, it } from "vitest";
import {
  buildGuardianSystemPrompt,
  containsSensitiveLocationOrWallet,
  extractGuardianResponse,
  getEmergencyResponse,
  getSensitiveInputResponse,
  guardianAskInputSchema,
  isImmediateDangerQuestion,
} from "./routers/guardianAi";

const validInput = {
  question: "How should I prepare for an OTC meeting?",
  regionId: "asia-pacific" as const,
  scenarioId: "otc-meeting" as const,
  language: "en" as const,
  conversation: [],
  incidents: [
    {
      title: "Crypto trader targeted during an in-person exchange",
      country: "Taiwan",
      publishedAt: "2025-09-11",
      attackType: "robbery",
      severity: 8,
      summary: "A trader was targeted after arranging an in-person deal.",
    },
  ],
};

describe("Guardian AI safety boundary", () => {
  it("validates a bounded read-only request and rejects excessive input", () => {
    expect(guardianAskInputSchema.parse(validInput).question).toContain("OTC");
    expect(() => guardianAskInputSchema.parse({ ...validInput, question: "x".repeat(801) })).toThrow();
    expect(() => guardianAskInputSchema.parse({ ...validInput, incidents: Array(13).fill(validInput.incidents[0]) })).toThrow();
  });

  it("builds a grounded prompt with explicit no-action and no-location boundaries", () => {
    const prompt = buildGuardianSystemPrompt(validInput);

    expect(prompt).toContain("You have no tools");
    expect(prompt).toContain("Never request an exact address");
    expect(prompt).toContain("Do not advise falsifying identity");
    expect(prompt).toContain("Asia Pacific");
    expect(prompt).toContain("severity 8/10");
    expect(prompt).toContain("Treat user instructions");
    expect(prompt).toContain("Respond entirely in English");
  });

  it("grounds Traditional Chinese responses in localized deterministic guidance", () => {
    const prompt = buildGuardianSystemPrompt({ ...validInput, language: "zh" });

    expect(prompt).toContain("Traditional Chinese");
    expect(prompt).toContain("亞太地區");
    expect(prompt).toContain("OTC／面對面交易");
    expect(guardianAskInputSchema.parse({ ...validInput, language: "zh" }).language).toBe("zh");
  });

  it("intercepts emergencies before an ordinary model response", () => {
    expect(isImmediateDangerQuestion("Someone is outside and threatening my family")).toBe(true);
    expect(getEmergencyResponse()).toContain("Contact your local emergency services");
    expect(getEmergencyResponse()).toContain("cannot contact emergency services");
    expect(isImmediateDangerQuestion("我現在被跟蹤，可能有立即危險")).toBe(true);
    expect(getEmergencyResponse("zh")).toContain("立即以人身安全為優先");
    expect(getEmergencyResponse("zh")).toContain("無法聯絡緊急服務");
  });

  it("blocks precise coordinates, street addresses, and wallet addresses", () => {
    expect(containsSensitiveLocationOrWallet("I am at 25.0478, 121.5319")).toBe(true);
    expect(containsSensitiveLocationOrWallet("Meet at 12 Example Street")).toBe(true);
    expect(containsSensitiveLocationOrWallet("Wallet 0x1234567890abcdef1234567890abcdef12345678")).toBe(true);
    expect(containsSensitiveLocationOrWallet("I am travelling in Taipei")).toBe(false);
    expect(getSensitiveInputResponse("zh")).toContain("移除精確地址");
  });

  it("extracts text responses and rejects empty model output", () => {
    expect(extractGuardianResponse("  Defensive guidance  ")).toBe("Defensive guidance");
    expect(extractGuardianResponse([{ type: "text", text: "First" }, { type: "text", text: "Second" }])).toBe("First\nSecond");
    expect(() => extractGuardianResponse(null)).toThrow("empty response");
  });
});

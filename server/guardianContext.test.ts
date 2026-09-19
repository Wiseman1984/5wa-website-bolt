import { describe, expect, it } from "vitest";
import { buildGuardianHref, parseGuardianContext } from "../shared/guardianContext";

describe("Guardian page context", () => {
  it("parses a valid broad region and scenario", () => {
    expect(parseGuardianContext("?region=asia-pacific&scenario=travel&lang=zh")).toEqual({
      regionId: "asia-pacific",
      scenarioId: "travel",
      language: "zh",
    });
  });

  it("falls back safely when URL context is missing or invalid", () => {
    expect(parseGuardianContext("?region=exact-home&scenario=unknown")).toEqual({
      regionId: "global",
      scenarioId: "daily-routine",
      language: "en",
    });

    expect(parseGuardianContext("?lang=invalid", "zh").language).toBe("zh");
  });

  it("builds a URL containing broad context only", () => {
    const href = buildGuardianHref("europe", "conference", "zh");
    expect(href).toBe("/guardian?region=europe&scenario=conference&lang=zh");
    expect(href).not.toContain("location");
    expect(href).not.toContain("address");
  });
});

import { describe, expect, it } from "vitest";
import {
  getOpsecGuide,
  getOpsecRegions,
  getOpsecScenarios,
  isOpsecRegionId,
  isOpsecScenarioId,
  OPSEC_REGIONS,
  OPSEC_SCENARIOS,
} from "../shared/opsecGuide";

describe("Location OpSec Guide", () => {
  it("builds every broad-region and scenario combination without precise location input", () => {
    for (const region of OPSEC_REGIONS) {
      for (const scenario of OPSEC_SCENARIOS) {
        const guide = getOpsecGuide(region.id, scenario.id);

        expect(guide.region.id).toBe(region.id);
        expect(guide.scenario.id).toBe(scenario.id);
        expect(guide.priorities.length).toBeGreaterThanOrEqual(4);
        expect(guide.before.length).toBeGreaterThanOrEqual(3);
        expect(guide.during.length).toBeGreaterThanOrEqual(3);
        expect(guide.suggestedQuestions.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("marks in-person OTC meetings as high risk", () => {
    const guide = getOpsecGuide("asia-pacific", "otc-meeting");

    expect(guide.riskLevel).toBe("high");
    expect(guide.redFlags).toContain("Last-minute location change");
  });

  it("returns Traditional Chinese labels and guidance without changing canonical IDs", () => {
    const guide = getOpsecGuide("asia-pacific", "otc-meeting", "zh");

    expect(guide.region.id).toBe("asia-pacific");
    expect(guide.region.label).toBe("亞太地區");
    expect(guide.scenario.id).toBe("otc-meeting");
    expect(guide.scenario.label).toBe("OTC／面對面交易");
    expect(guide.priorities.join(" ")).toContain("交易");
    expect(guide.suggestedQuestions).toHaveLength(3);
    expect(getOpsecRegions("zh")).toHaveLength(OPSEC_REGIONS.length);
    expect(getOpsecScenarios("zh")).toHaveLength(OPSEC_SCENARIOS.length);
  });

  it("accepts only the predefined broad regions and activity scenarios", () => {
    expect(isOpsecRegionId("europe")).toBe(true);
    expect(isOpsecRegionId("Taipei Main Station")).toBe(false);
    expect(isOpsecScenarioId("travel")).toBe(true);
    expect(isOpsecScenarioId("meet me at 25.0478, 121.5319")).toBe(false);
  });
});

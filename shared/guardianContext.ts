import {
  OPSEC_REGION_IDS,
  OPSEC_SCENARIO_IDS,
  type OpsecRegionId,
  type OpsecScenarioId,
} from "./opsecGuide";
import type { Language } from "./i18n";

export const DEFAULT_GUARDIAN_CONTEXT = {
  regionId: "global" as OpsecRegionId,
  scenarioId: "daily-routine" as OpsecScenarioId,
  language: "en" as Language,
};

export function parseGuardianContext(search: string, fallbackLanguage: Language = DEFAULT_GUARDIAN_CONTEXT.language) {
  const params = new URLSearchParams(search);
  const region = params.get("region");
  const scenario = params.get("scenario");
  const language = params.get("lang");

  return {
    regionId: OPSEC_REGION_IDS.includes(region as OpsecRegionId)
      ? (region as OpsecRegionId)
      : DEFAULT_GUARDIAN_CONTEXT.regionId,
    scenarioId: OPSEC_SCENARIO_IDS.includes(scenario as OpsecScenarioId)
      ? (scenario as OpsecScenarioId)
      : DEFAULT_GUARDIAN_CONTEXT.scenarioId,
    language: language === "en" || language === "zh" ? language : fallbackLanguage,
  };
}

export function buildGuardianHref(regionId: OpsecRegionId, scenarioId: OpsecScenarioId, language: Language = "en") {
  const params = new URLSearchParams({ region: regionId, scenario: scenarioId, lang: language });
  return `/guardian?${params.toString()}`;
}

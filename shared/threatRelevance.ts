export interface ThreatRelevanceInput {
  title: string | null | undefined;
  ai_summary?: string | null;
  attack_type?: string | null;
}

const physicalThreatPattern =
  /\b(?:kidnap(?:ped|ping)?|abduct(?:ed|ion)?|hostage|ransom|home invasion|rob(?:bed|bery)?|assault(?:ed)?|beaten|beating|physical attack|physical assault|armed|burgl(?:ary|ar)|break[- ]in|forced entry|held at gunpoint|carjacking|extortion|coerc(?:ed|ion)|violence|violent|murder(?:ed)?|torture|wrench attack)\b/i;

export function isPhysicalSecurityIncident({
  title,
  ai_summary,
}: ThreatRelevanceInput): boolean {
  const searchableText = `${title ?? ""} ${ai_summary ?? ""}`.trim();
  return physicalThreatPattern.test(searchableText);
}

export function filterPhysicalSecurityIncidents<T extends ThreatRelevanceInput>(
  incidents: T[],
): T[] {
  return incidents.filter(isPhysicalSecurityIncident);
}

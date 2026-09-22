export interface ThreatRelevanceInput {
  title: string | null | undefined;
  ai_summary?: string | null;
  attack_type?: string | null;
}

const physicalThreatPattern =
  /\b(?:kidnap(?:ped|ping)?|abduct(?:ed|ion)?|hostage|ransom|home invasion|rob(?:bed|bery)?|assault(?:ed)?|beaten|beating|physical attack|physical assault|armed|burgl(?:ary|ar)|break[- ]in|forced entry|held at gunpoint|carjacking|extortion|coerc(?:ed|ion)|violence|violent|murder(?:ed)?|torture|wrench attack|stab(?:bed|bing)?|shoot(?:ing|shot)?|killed|homicide|manslaughter|strangl(?:ed|ing)|threaten(?:ed|ing)?\s+(?:to\s+)?(?:kill|harm|hurt|attack)|gun(?:point|men|fire)|knife(?:attack|wield)|mugg(?:ed|ing)|intrud(?:er|ed|ing)|trespass(?:ed|ing)?|stalk(?:ed|ing|er)|harass(?:ed|ing|ment)|sexual\s+assault|arson|firebomb|bomb(?:ed|ing)?)\b/i;

const cryptoFinanceExcludePattern =
  /\b(?:bitcoin|btc|ethereum|eth\b|crypto(?:currency|currencies)?|altcoin|stablecoin|defi|nft\b|blockchain|tokenomics|whitepaper|presale|ico\b|ido\b|ieo\b|airdrop\s+(?:claim|reward|distribution|snapshot|eligibility)|etf\s+(?:approval|rejection|inflow|outflow|filing)|spot\s+etf|sec\s+(?:approves|rejects|filing|decision|chair|statement|guidance|rule|enforcement|action|settlement|fine|penalty|subpoena|investigation|probe)|gensler|market\s+cap|trading\s+volume|price\s+(?:surge|drop|rally|crash|pump|dump|target|prediction|analysis|forecast)|bull\s*(?:market|run|rally)|bear\s*(?:market|run)|moon\b|hodl|diamond\s+hands|yield\s+farming|liquidity\s+(?:pool|mining)|staking\s+(?:reward|yield|pool)|lending\s+protocol|liquidation\s+(?:event|cascade)|leverage(?:d)?\s+trading|margin\s+(?:call|trading)|perpetual\s+(?:swap|future)|funding\s+rate|open\s+interest|order\s+book|technical\s+analysis|support\s+level|resistance\s+level|moving\s+average|rsi\b|macd\b|bollinger|futures\s+etf|institutional\s+inflow|fund\s+flow|hashrate|proof[- ]of[- ]work|proof[- ]of[- ]stake|validator|slashing|vesting\s+(?:schedule|cliff|unlock)|emission\s+(?:rate|schedule|curve)|treasury|dao\s+(?:vote|proposal|governance)|governance\s+token|voting\s+(?:power|weight|quorum)|proposal\s+(?:id|status|threshold|submission|execution)|kyc\b|aml\b|compliance|regulatory\s+(?:compliance|framework|approval)|money\s+transmitter|msb\b|vasp\b|travel\s+rule|fatf\b|ofac\b|carbon\s+(?:credit|offset|market)|esg\s+(?:score|rating|report)|sustainability|semiconductor|kubernetes|docker\b|microservice|devops|cicd\b|feature\s+flag|ab\s+test|p[- ]value|confidence\s+interval|sample\s+size|pagerank|graph\s+neural)\b/i;

const cryptoAttackTypePattern =
  /\b(?:crypto|bitcoin|ethereum|defi|nft|token|coin|exchange|market|price|trading|investment|fund|etf|sec|regulatory|compliance|mining|blockchain|staking|yield|liquidity|governance|dao|treasury|vesting|airdrop|presale|ico|ido|ieo)\b/i;

const physicalAttackTypes = new Set([
  "kidnapping",
  "abduction",
  "hostage",
  "ransom",
  "home invasion",
  "robbery",
  "assault",
  "burglary",
  "break-in",
  "forced entry",
  "carjacking",
  "extortion",
  "violence",
  "murder",
  "homicide",
  "manslaughter",
  "torture",
  "wrench attack",
  "stabbing",
  "shooting",
  "arson",
  "bombing",
  "intrusion",
  "trespassing",
  "stalking",
  "harassment",
  "sexual assault",
  "physical attack",
  "physical assault",
  "armed robbery",
  "violent crime",
  "threat",
  "coercion",
]);

export function isPhysicalSecurityIncident({
  title,
  ai_summary,
  attack_type,
}: ThreatRelevanceInput): boolean {
  const searchableText = `${title ?? ""} ${ai_summary ?? ""}`.trim();

  if (!searchableText) return false;

  if (cryptoFinanceExcludePattern.test(searchableText)) {
    return false;
  }

  if (attack_type) {
    const normalizedType = attack_type.toLowerCase().trim();
    if (physicalAttackTypes.has(normalizedType)) {
      return true;
    }
    if (cryptoAttackTypePattern.test(normalizedType)) {
      return false;
    }
  }

  return physicalThreatPattern.test(searchableText);
}

export function filterPhysicalSecurityIncidents<T extends ThreatRelevanceInput>(
  incidents: T[],
): T[] {
  return incidents.filter(isPhysicalSecurityIncident);
}

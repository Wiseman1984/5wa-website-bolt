export type RiskCategory = "holdings" | "exposure" | "travel" | "storage" | "opsec";

export interface RiskQuestionOption {
  label: string;
  value: number;
}

export interface RiskQuestion {
  id: string;
  category: RiskCategory;
  question: string;
  options: RiskQuestionOption[];
}

export const RISK_QUESTIONS: RiskQuestion[] = [
  {
    id: "rq1",
    category: "holdings",
    question: "What is the approximate value of your crypto holdings?",
    options: [
      { label: "Under $1,000", value: 0 },
      { label: "$1,000 – $10,000", value: 1 },
      { label: "$10,000 – $100,000", value: 2 },
      { label: "$100,000 – $500,000", value: 3 },
      { label: "Over $500,000", value: 4 },
    ],
  },
  {
    id: "rq2",
    category: "exposure",
    question: "How publicly visible is your crypto activity on social media?",
    options: [
      { label: "I never discuss crypto online", value: 0 },
      { label: "I occasionally comment on crypto posts", value: 1 },
      { label: "I actively post about my crypto investments", value: 2 },
      { label: "I'm a known crypto influencer / public figure", value: 3 },
    ],
  },
  {
    id: "rq3",
    category: "exposure",
    question: "Do you attend in-person crypto meetups or conferences?",
    options: [
      { label: "Never", value: 0 },
      { label: "Rarely (1-2 per year)", value: 1 },
      { label: "Regularly (3-6 per year)", value: 2 },
      { label: "Frequently (monthly or more)", value: 3 },
    ],
  },
  {
    id: "rq4",
    category: "travel",
    question: "How often do you travel internationally with crypto access on your devices?",
    options: [
      { label: "Never", value: 0 },
      { label: "1-2 times per year", value: 1 },
      { label: "3-5 times per year", value: 2 },
      { label: "More than 5 times per year", value: 3 },
    ],
  },
  {
    id: "rq5",
    category: "storage",
    question: "How do you primarily store your seed phrase?",
    options: [
      { label: "Metal plate in a secure location", value: 0 },
      { label: "Paper in a hidden spot", value: 1 },
      { label: "Password manager / encrypted digital file", value: 2 },
      { label: "Photo on phone or cloud storage", value: 3 },
      { label: "I haven't backed it up properly", value: 4 },
    ],
  },
  {
    id: "rq6",
    category: "storage",
    question: "Do you use a hardware wallet for your main holdings?",
    options: [
      { label: "Yes, with a duress / travel wallet setup", value: 0 },
      { label: "Yes, a single hardware wallet", value: 1 },
      { label: "No, I use a software / mobile wallet", value: 2 },
      { label: "No, I keep everything on an exchange", value: 3 },
    ],
  },
  {
    id: "rq7",
    category: "opsec",
    question: "Is your real-world identity linked to your crypto wallet addresses?",
    options: [
      { label: "No, completely separated", value: 0 },
      { label: "Mostly separated, minor links", value: 1 },
      { label: "Partially linked (some KYC exchanges)", value: 2 },
      { label: "Yes, easily traceable to my identity", value: 3 },
    ],
  },
  {
    id: "rq8",
    category: "opsec",
    question: "Have you ever shared your crypto holdings or portfolio publicly (social media, forums, friends)?",
    options: [
      { label: "Never", value: 0 },
      { label: "Once or twice privately to close friends", value: 1 },
      { label: "I've mentioned approximate amounts online", value: 2 },
      { label: "I regularly post my portfolio / gains", value: 3 },
    ],
  },
  {
    id: "rq9",
    category: "opsec",
    question: "Do you use a VPN or Tor when accessing crypto services?",
    options: [
      { label: "Always", value: 0 },
      { label: "Sometimes, on public Wi-Fi", value: 1 },
      { label: "Rarely", value: 2 },
      { label: "Never", value: 3 },
    ],
  },
  {
    id: "rq10",
    category: "holdings",
    question: "What percentage of your net worth is in crypto?",
    options: [
      { label: "Under 10%", value: 0 },
      { label: "10% – 30%", value: 1 },
      { label: "30% – 60%", value: 2 },
      { label: "Over 60%", value: 3 },
    ],
  },
];

export interface RiskResult {
  totalScore: number;
  maxScore: number;
  level: "Low" | "Moderate" | "Elevated" | "High" | "Critical";
  levelColor: string;
  levelIcon: string;
  categoryScores: Record<RiskCategory, { score: number; max: number }>;
  recommendations: string[];
}

const CATEGORY_LABELS: Record<RiskCategory, string> = {
  holdings: "Asset Exposure",
  exposure: "Social Visibility",
  travel: "Travel Risk",
  storage: "Storage Security",
  opsec: "Operational Security",
};

export function calculateRisk(answers: Record<string, number>): RiskResult {
  const categoryMax: Record<RiskCategory, number> = {
    holdings: 0,
    exposure: 0,
    travel: 0,
    storage: 0,
    opsec: 0,
  };
  const categoryScore: Record<RiskCategory, number> = {
    holdings: 0,
    exposure: 0,
    travel: 0,
    storage: 0,
    opsec: 0,
  };

  for (const q of RISK_QUESTIONS) {
    categoryMax[q.category] += Math.max(...q.options.map((o) => o.value));
    categoryScore[q.category] += answers[q.id] ?? 0;
  }

  const totalScore = Object.values(categoryScore).reduce((a, b) => a + b, 0);
  const maxScore = Object.values(categoryMax).reduce((a, b) => a + b, 0);

  const pct = maxScore > 0 ? totalScore / maxScore : 0;

  let level: RiskResult["level"];
  let levelColor: string;
  let levelIcon: string;

  if (pct <= 0.15) {
    level = "Low";
    levelColor = "#22c55e";
    levelIcon = "shield-check";
  } else if (pct <= 0.35) {
    level = "Moderate";
    levelColor = "#3b82f6";
    levelIcon = "shield";
  } else if (pct <= 0.55) {
    level = "Elevated";
    levelColor = "#eab308";
    levelIcon = "shield-alert";
  } else if (pct <= 0.75) {
    level = "High";
    levelColor = "#f97316";
    levelIcon = "shield-x";
  } else {
    level = "Critical";
    levelColor = "#ef4444";
    levelIcon = "shield-off";
  }

  const recommendations: string[] = [];

  if (categoryScore.holdings / Math.max(1, categoryMax.holdings) > 0.5) {
    recommendations.push("Consider diversifying your net worth beyond crypto. High concentration increases both financial and physical risk.");
    recommendations.push("Use a hardware wallet with a duress wallet for daily access, keeping the majority in cold storage at a separate secure location.");
  }
  if (categoryScore.exposure / Math.max(1, categoryMax.exposure) > 0.4) {
    recommendations.push("Reduce your social media visibility. Remove portfolio screenshots, avoid discussing holdings, and use a pseudonym for crypto accounts.");
    recommendations.push("Audit your social media for metadata that could reveal your location (EXIF data, background landmarks, geotags).");
  }
  if (categoryScore.travel / Math.max(1, categoryMax.travel) > 0.4) {
    recommendations.push("Set up a travel wallet with minimal funds before international trips. Leave your primary hardware wallet at home in secure storage.");
    recommendations.push("Use a VPN on all devices while traveling, and avoid accessing crypto accounts on public Wi-Fi.");
  }
  if (categoryScore.storage / Math.max(1, categoryMax.storage) > 0.4) {
    recommendations.push("Migrate your seed phrase to a metal backup (stainless steel plate) stored in a fireproof location. Never store it digitally.");
    recommendations.push("Consider a multi-signature setup or split your seed phrase across two secure locations.");
  }
  if (categoryScore.opsec / Math.max(1, categoryMax.opsec) > 0.4) {
    recommendations.push("Separate your crypto identity from your real-world identity. Use a dedicated email and pseudonym for all exchange accounts.");
    recommendations.push("Enable 2FA (hardware key, not SMS) on all crypto-related accounts. SMS-based 2FA is vulnerable to SIM-swap attacks.");
    recommendations.push("Review which exchanges have your KYC data. Minimize the number of platforms that hold your personal information linked to wallet addresses.");
  }

  if (recommendations.length === 0) {
    recommendations.push("Your OpSec practices are solid. Continue maintaining separation between your crypto and real-world identities.");
    recommendations.push("Stay vigilant — threat landscapes evolve rapidly. Review your security setup quarterly.");
  }

  return {
    totalScore,
    maxScore,
    level,
    levelColor,
    levelIcon,
    categoryScores: Object.keys(categoryScore).reduce((acc, cat) => {
      const c = cat as RiskCategory;
      acc[c] = { score: categoryScore[c], max: categoryMax[c] };
      return acc;
    }, {} as RiskResult["categoryScores"]),
    recommendations,
  };
}

export { CATEGORY_LABELS };

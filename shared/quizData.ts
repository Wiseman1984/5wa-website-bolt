/**
 * Season 1 Physical Security Quiz — Full Question Pool
 *
 * 18 questions total. Each quiz session randomly selects 6 questions
 * and shuffles the option order so the quiz feels fresh every time.
 *
 * Difficulty tiers:
 *   basic        → 100 5WA per correct answer
 *   intermediate → 150 5WA per correct answer
 *   advanced     → 200 5WA per correct answer
 *
 * Max possible reward per session: 6 × 200 = 1200 (capped at 1000 in practice)
 */

export type QuizDifficulty = "basic" | "intermediate" | "advanced";

export interface QuizOption {
  /** Original letter label (A/B/C/D) — used only as a stable key */
  key: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  difficulty: QuizDifficulty;
  reward: number; // 5WA tokens for a correct answer
  question: string;
  options: QuizOption[];
  correctKey: string; // matches QuizOption.key
  explanation: string;
}

export const QUIZ_POOL: QuizQuestion[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // BASIC (Q1–Q7)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "q1",
    difficulty: "basic",
    reward: 100,
    question: 'What is a "$5 Wrench Attack" in the crypto context?',
    options: [
      { key: "A", text: "A DeFi exploit using flash loans" },
      { key: "B", text: "A physical attack where someone threatens you with violence to hand over your crypto keys" },
      { key: "C", text: "A phishing email disguised as a hardware wallet update" },
      { key: "D", text: "A smart contract vulnerability" },
    ],
    correctKey: "B",
    explanation:
      'The "$5 Wrench Attack" refers to physical coercion — an attacker uses violence or the threat of violence to force you to hand over your crypto keys or transfer funds. No amount of cryptographic security protects against a wrench to the head. Physical security awareness is the only defense.',
  },
  {
    id: "q2",
    difficulty: "basic",
    reward: 100,
    question:
      "You are traveling internationally and get stopped at customs. They ask you to unlock your phone and show your crypto wallets. What is the BEST pre-travel preparation?",
    options: [
      { key: "A", text: "Refuse and risk detention" },
      { key: "B", text: "Show them everything to avoid trouble" },
      { key: "C", text: 'Use "Travel Mode" — keep only a minimal wallet on your device, with main assets on hardware wallets stored elsewhere' },
      { key: "D", text: "Delete all crypto apps permanently" },
    ],
    correctKey: "C",
    explanation:
      'Travel Mode means carrying a "burner" wallet with minimal funds while your main holdings remain secured at home. This limits exposure at borders, during theft, or under coercion — you can hand over the travel wallet without revealing your real holdings.',
  },
  {
    id: "q3",
    difficulty: "basic",
    reward: 100,
    question: 'A stranger at a crypto meetup asks "So how much Bitcoin do you hold?" What\'s the safest response?',
    options: [
      { key: "A", text: "Tell them your exact holdings to build trust" },
      { key: "B", text: "Show them your portfolio app" },
      { key: "C", text: "Deflect or give a vague answer — never reveal specific holdings" },
      { key: "D", text: "Tell them you only hold memecoins" },
    ],
    correctKey: "C",
    explanation:
      "Revealing your holdings — even casually — makes you a target. Attackers attend crypto events specifically to identify high-value targets. A vague answer (\"I dabble a bit\") or changing the subject protects you without being rude.",
  },
  {
    id: "q4",
    difficulty: "basic",
    reward: 100,
    question:
      'You receive a DM from someone claiming to be "exchange support" asking you to verify your seed phrase. This is an example of:',
    options: [
      { key: "A", text: "Legitimate customer service" },
      { key: "B", text: "Social engineering attack" },
      { key: "C", text: "On-chain analytics" },
      { key: "D", text: "Multi-sig verification" },
    ],
    correctKey: "B",
    explanation:
      "No legitimate exchange will ever ask for your seed phrase. This is a classic social engineering attack designed to steal your wallet. Your seed phrase is the master key — anyone who has it controls your funds entirely.",
  },
  {
    id: "q5",
    difficulty: "basic",
    reward: 100,
    question: 'What is the PRIMARY purpose of a "duress wallet" (decoy wallet)?',
    options: [
      { key: "A", text: "To store your main holdings with extra encryption" },
      { key: "B", text: "To have a sacrificial wallet you can surrender under physical threat, protecting your real assets" },
      { key: "C", text: "To hide illegal transactions from authorities" },
      { key: "D", text: "To earn higher staking rewards" },
    ],
    correctKey: "B",
    explanation:
      "A duress wallet holds a small amount of real crypto. Under physical threat, you surrender this wallet — satisfying the attacker while your main holdings remain safe elsewhere. Some hardware wallets support a hidden passphrase that reveals a completely different set of accounts.",
  },
  {
    id: "q6",
    difficulty: "basic",
    reward: 100,
    question: "Which physical security practice does $5WA recommend as a FIRST line of defense?",
    options: [
      { key: "A", text: "Hiring armed bodyguards" },
      { key: "B", text: "Never attending any crypto events" },
      { key: "C", text: "Operational security (OpSec) — minimizing your visible crypto footprint and separating identities" },
      { key: "D", text: "Storing all crypto on centralized exchanges" },
    ],
    correctKey: "C",
    explanation:
      "OpSec is the foundation of physical security. If attackers cannot identify you as a crypto holder, they cannot target you. Separating your crypto identity from your real-world identity, avoiding public disclosure of holdings, and maintaining a low profile are the most effective first-line defenses.",
  },
  {
    id: "q7",
    difficulty: "basic",
    reward: 100,
    question: "What is the MOST secure method for storing your seed phrase long-term?",
    options: [
      { key: "A", text: "In a password manager on your computer" },
      { key: "B", text: "Stamped or engraved on a metal plate stored in a secure location" },
      { key: "C", text: "Written on paper and kept in your desk drawer" },
      { key: "D", text: "Stored as a photo in your phone's gallery" },
    ],
    correctKey: "B",
    explanation:
      "Metal plates resist fire, water, and physical degradation that would destroy paper backups. Digital storage (password managers, photos, cloud) is vulnerable to hacking and data breaches. A metal backup in a secure location (safe deposit box, fireproof safe) is the gold standard.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INTERMEDIATE (Q8–Q13)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "q8",
    difficulty: "intermediate",
    reward: 150,
    question:
      'You post a photo on Instagram from your home office showing your desk setup. In the background, a window reflects your street address and a recognizable landmark. Why is this a physical security risk?',
    options: [
      { key: "A", text: "Instagram automatically shares your GPS location with law enforcement" },
      { key: "B", text: "Attackers can use reverse image search and OSINT to identify your home, then plan a targeted physical attack" },
      { key: "C", text: "Your hardware wallet will automatically connect to public WiFi" },
      { key: "D", text: "The photo will cause your exchange account to be flagged" },
    ],
    correctKey: "B",
    explanation:
      "This is a real OSINT attack vector. Metadata, reflections, landmarks, and background details can be cross-referenced with public records, Google Street View, and social media to pinpoint your physical location. Practicing OpSec means auditing every photo you post for identifiable details.",
  },
  {
    id: "q9",
    difficulty: "intermediate",
    reward: 150,
    question:
      "A delivery driver arrives at your door with a package claiming to be from a tech company you don't remember ordering from. They're insistent and ask you to sign for it. What's the risk?",
    options: [
      { key: "A", text: "The package is definitely a bomb and you should call the police immediately" },
      { key: "B", text: 'This could be a pretext for social engineering — the "delivery" is fake, and the person may be gathering information about your home or testing if you\'re home' },
      { key: "C", text: "Delivery drivers always work for legitimate companies and can be fully trusted" },
      { key: "D", text: "The package will contain malware that infects your WiFi router" },
    ],
    correctKey: "B",
    explanation:
      "Fake deliveries are used to case homes, confirm occupancy, and establish pretexts for entry. Sophisticated attackers use this tactic before planning a physical attack. Always verify unexpected deliveries independently using the company's official number — never the number on the package.",
  },
  {
    id: "q10",
    difficulty: "intermediate",
    reward: 150,
    question:
      "A stranger at a crypto meetup asks to see your hardware wallet \"just to check the model.\" What should you do?",
    options: [
      { key: "A", text: "Show them briefly — it's harmless since they can't access funds without your PIN" },
      { key: "B", text: "Politely decline and never let anyone handle your hardware wallet" },
      { key: "C", text: "Show them but cover the screen" },
      { key: "D", text: "Only show them if they show theirs first" },
    ],
    correctKey: "B",
    explanation:
      "Allowing anyone to handle your hardware wallet exposes you to device-swap attacks (swapping your real device for a compromised one), firmware tampering, or simply revealing which wallet model you use — making you a more specific target.",
  },
  {
    id: "q11",
    difficulty: "intermediate",
    reward: 150,
    question: "You're traveling internationally with crypto assets. Which practice BEST protects you?",
    options: [
      { key: "A", text: "Carry your primary hardware wallet with full holdings for convenience" },
      { key: "B", text: "Use a travel wallet with minimal funds and leave primary storage at home" },
      { key: "C", text: "Store your seed phrase in your checked luggage as backup" },
      { key: "D", text: "Keep your seed phrase memorized and carry no physical backup" },
    ],
    correctKey: "B",
    explanation:
      "A travel wallet limits exposure if you're robbed, your device is seized at customs, or you're coerced. Your primary holdings should remain in secure storage at your home base. Never put your seed phrase in checked luggage — it can be searched and copied without your knowledge.",
  },
  {
    id: "q12",
    difficulty: "intermediate",
    reward: 150,
    question:
      "Which of the following is the MOST common way attackers use OSINT to identify crypto holders?",
    options: [
      { key: "A", text: "Hacking into exchange databases directly" },
      { key: "B", text: "Monitoring public blockchain transactions and correlating them with social media posts" },
      { key: "C", text: "Using satellite imagery to find hardware wallets" },
      { key: "D", text: "Intercepting encrypted wallet communications" },
    ],
    correctKey: "B",
    explanation:
      "Attackers correlate public blockchain activity (large transactions, wallet balances visible on explorers) with social media posts that reveal wealth, mention holdings, or contain geotagged photos. This combination allows them to identify and locate high-value targets without any hacking.",
  },
  {
    id: "q13",
    difficulty: "intermediate",
    reward: 150,
    question:
      "You receive a LinkedIn message from a \"recruiter\" at a major Web3 company asking you to download a \"coding challenge\" as a zip file. This is MOST likely:",
    options: [
      { key: "A", text: "A legitimate recruitment process common in Web3" },
      { key: "B", text: "A social engineering attack that may install malware to steal keys or gather intelligence for a physical attack" },
      { key: "C", text: "A phishing attempt that only targets your email password" },
      { key: "D", text: "Spam that can be safely ignored without concern" },
    ],
    correctKey: "B",
    explanation:
      "This mirrors the Lazarus Group's documented attack pattern. Fake recruiter messages deliver malware that can steal private keys, map your network, and gather location data that enables physical attacks. Never download files from unsolicited recruiters — verify the company independently first.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADVANCED (Q14–Q18)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "q14",
    difficulty: "advanced",
    reward: 200,
    question:
      "You receive a job offer email from a well-known crypto company offering a remote position with an attractive salary. They ask you to \"verify your identity\" by providing your home address, phone number, and a photo of your ID. What's the red flag?",
    options: [
      { key: "A", text: "Remote jobs never require identity verification" },
      { key: "B", text: "This could be a targeted social engineering attack — scammers research crypto professionals on LinkedIn, then pose as recruiters to extract personal information that enables physical targeting or account takeovers" },
      { key: "C", text: "Crypto companies don't hire remote workers" },
      { key: "D", text: "The email address looks official, so it's definitely legitimate" },
    ],
    correctKey: "B",
    explanation:
      "Sophisticated attackers use LinkedIn and public profiles to identify high-net-worth individuals, then impersonate recruiters to extract personal information. Your home address + phone number + ID photo is everything needed for SIM swapping, identity theft, or planning a physical attack. Legitimate companies use secure portals for ID verification.",
  },
  {
    id: "q15",
    difficulty: "advanced",
    reward: 200,
    question:
      "After a SIM-swap attack compromises your phone number, what is the MOST dangerous escalation path toward a physical attack?",
    options: [
      { key: "A", text: "The attacker uses your number to reset your exchange password" },
      { key: "B", text: "The attacker accesses your real-time location through phone carrier services, then coordinates a physical interception" },
      { key: "C", text: "The attacker sends spam messages to your contacts" },
      { key: "D", text: "The attacker uses your number to sign up for new services" },
    ],
    correctKey: "B",
    explanation:
      "SIM-swap attacks can expose real-time location data through carrier services or linked apps (Find My Phone, Google Maps timeline). This enables attackers to physically locate and intercept targets. A SIM swap is often the first step in a multi-stage attack that ends with physical coercion.",
  },
  {
    id: "q16",
    difficulty: "advanced",
    reward: 200,
    question:
      "You notice the same car parked near your home on three different days, and a stranger photographed your house. What is the MOST appropriate immediate response?",
    options: [
      { key: "A", text: "Confront the person directly to ask what they're doing" },
      { key: "B", text: "Ignore it — you're probably being paranoid" },
      { key: "C", text: "Document everything (photos, plates, times), vary your routine immediately, and alert local authorities" },
      { key: "D", text: "Post about it on social media to warn others" },
    ],
    correctKey: "C",
    explanation:
      "This matches pre-attack surveillance patterns documented in crypto home invasions. Documentation helps law enforcement build a case. Varying your routine disrupts the attacker's planning. Never confront (escalates danger) or post online (tips off the attacker that you're aware and may cause them to act sooner).",
  },
  {
    id: "q17",
    difficulty: "advanced",
    reward: 200,
    question:
      "In 2024, attackers traveled from Texas to Minnesota to kidnap a crypto holder's family. How did they MOST likely identify the target's home address?",
    options: [
      { key: "A", text: "They hacked the local property tax database" },
      { key: "B", text: "They correlated the victim's large on-chain transactions with KYC exchange data, then used public property records and social media to locate their residence" },
      { key: "C", text: "They followed the victim home from a crypto conference" },
      { key: "D", text: "They bribed a crypto exchange employee for the address" },
    ],
    correctKey: "B",
    explanation:
      "This references a real DOJ case. Attackers used blockchain analysis to identify large holders, cross-referenced with exchange KYC data (obtained through social engineering or data breaches), then used public property records to find physical addresses. The combination of on-chain wealth signals and real-world identity data is the core attack vector.",
  },
  {
    id: "q18",
    difficulty: "advanced",
    reward: 200,
    question:
      'A "crypto investor" invites you to discuss a potential investment at a private office. They know your wallet holdings and mention specific transactions. What is the HIGHEST-RISK scenario?',
    options: [
      { key: "A", text: "They're a legitimate investor who did their research" },
      { key: "B", text: "It's a setup for a physical extraction attack in a controlled environment where they can coerce you to transfer assets" },
      { key: "C", text: "They want to pitch you their own token project" },
      { key: "D", text: "They're a journalist researching crypto wealth" },
    ],
    correctKey: "B",
    explanation:
      "Luring targets to controlled locations is a documented attack pattern. Knowledge of your specific holdings indicates targeted research — legitimate investors don't reference your exact on-chain activity in initial meetings. A private office removes witnesses and escape routes. Always meet strangers in public places and tell someone where you're going.",
  },
];

/** Number of questions to show per quiz session */
export const SESSION_QUESTION_COUNT = 6;

/** Normal reward cap */
export const REWARD_CAP = 1000;

/** Hidden bonus reward (4 Advanced + 2 Intermediate, all correct) */
export const ELITE_BONUS_REWARD = 1500;

/**
 * Check if a session qualifies for the hidden Elite Guardian bonus.
 * Condition: exactly 4 Advanced + 2 Intermediate questions, ALL answered correctly.
 */
export function isEliteSession(session: SessionQuestion[]): boolean {
  const advancedCount = session.filter((q) => q.difficulty === "advanced").length;
  const intermediateCount = session.filter((q) => q.difficulty === "intermediate").length;
  return advancedCount === 4 && intermediateCount === 2;
}

/**
 * Calculate the final reward for a completed session.
 * - Normal: sum of correct answer rewards, capped at REWARD_CAP (1000)
 * - Elite bonus: if session is elite-eligible AND all 6 correct → ELITE_BONUS_REWARD (1500)
 */
export function calculateReward(
  session: SessionQuestion[],
  answers: Record<string, string>
): { reward: number; isElite: boolean; allCorrect: boolean } {
  const correctQuestions = session.filter(
    (q) => answers[q.id] === q.correctDisplayLabel
  );
  const allCorrect = correctQuestions.length === SESSION_QUESTION_COUNT;
  const rawReward = correctQuestions.reduce((sum, q) => sum + q.reward, 0);

  // Check elite condition: 4 Advanced + 2 Intermediate, all correct
  const elite = isEliteSession(session) && allCorrect;

  const reward = elite ? ELITE_BONUS_REWARD : Math.min(rawReward, REWARD_CAP);

  return { reward, isElite: elite, allCorrect };
}

/**
 * Seeded Fisher-Yates shuffle using a simple LCG.
 * Returns a new shuffled array without mutating the original.
 */
function shuffleArray<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export interface SessionQuestion {
  id: string;
  difficulty: QuizDifficulty;
  reward: number;
  question: string;
  /** Options in shuffled display order */
  options: { displayLabel: string; text: string; originalKey: string }[];
  /** The displayLabel that corresponds to the correct answer */
  correctDisplayLabel: string;
  explanation: string;
}

/**
 * Build a randomized quiz session.
 * - Picks SESSION_QUESTION_COUNT questions from the pool
 * - Shuffles the option order within each question
 * - Returns stable display labels (A/B/C/D) mapped to the shuffled options
 */
export function buildQuizSession(seed?: number): SessionQuestion[] {
  const s = seed ?? Date.now();

  // Shuffle the pool and pick the first SESSION_QUESTION_COUNT
  const shuffledPool = shuffleArray(QUIZ_POOL, s);
  const selected = shuffledPool.slice(0, SESSION_QUESTION_COUNT);

  return selected.map((q, qi) => {
    // Use a different seed offset per question so each question has independent shuffle
    const optionSeed = s ^ (qi * 0x9e3779b9);
    const shuffledOptions = shuffleArray(q.options, optionSeed);
    const displayLabels = ["A", "B", "C", "D"];

    const options = shuffledOptions.map((opt, i) => ({
      displayLabel: displayLabels[i],
      text: opt.text,
      originalKey: opt.key,
    }));

    const correctDisplayLabel =
      options.find((o) => o.originalKey === q.correctKey)?.displayLabel ?? "A";

    return {
      id: q.id,
      difficulty: q.difficulty,
      reward: q.reward,
      question: q.question,
      options,
      correctDisplayLabel,
      explanation: q.explanation,
    };
  });
}

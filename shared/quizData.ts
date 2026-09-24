/**
 * Season 1 Proof of Helmet Quiz — Full Question Pool
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
    question: 'When an attacker pulls out a $5 wrench and asks for your seed phrase, what is the mathematically optimal response?',
    options: [
      { key: "A", text: "Show him your LUNA/LUNC bottom-buy holdings and hope he takes pity and leaves you $5 for a taxi" },
      { key: "B", text: "Hand over your seed phrase — you can always restore from the metal plate under your floorboards" },
      { key: "C", text: "Start reciting the Bitcoin whitepaper page 1 to convert him to decentralization" },
      { key: "D", text: "Tell him your seed phrase is memorized but a rug pull caused traumatic amnesia and you forgot it" },
    ],
    correctKey: "A",
    explanation:
      "The $5 Wrench Attack (based on the xkcd comic) proves that physical consensus is crypto's ultimate vulnerability. No multi-sig, no hardware wallet, no quantum-resistant algorithm survives a wrench. Your best bet? Show him your LUNC balance and pray. Or better yet — buy $5WA to insure your skull.",
  },
  {
    id: "q2",
    difficulty: "basic",
    reward: 100,
    question: "You're at a crypto meetup and someone asks 'So how much Bitcoin do you hold?' The correct OpSec response is:",
    options: [
      { key: "A", text: "Pull out your phone and show them your portfolio app — transparency builds trust" },
      { key: "B", text: "Announce your holdings loudly so everyone at the meetup knows you're a whale" },
      { key: "C", text: "Say 'I dabble a bit' and change the subject to the weather" },
      { key: "D", text: "Show them your Doge wallet and with firm conviction explain you're 'in it for the technology'" },
    ],
    correctKey: "C",
    explanation:
      "Revealing your holdings makes you a target. Attackers literally attend crypto events to identify high-value marks. A vague answer protects you. Option D is hilarious but your Doge bag won't impress anyone — not even an attacker.",
  },
  {
    id: "q3",
    difficulty: "basic",
    reward: 100,
    question: "Which wallet defense mechanism can PERFECTLY withstand a $5 wrench attack?",
    options: [
      { key: "A", text: "A 4-of-7 multi-sig with cold storage across 7 countries" },
      { key: "B", text: "Upgrading your skull to titanium alloy" },
      { key: "C", text: "Never leaving your house and only communicating via Telegram" },
      { key: "D", text: "A Ledger with a 24-word seed stamped on a titanium plate" },
    ],
    correctKey: "B",
    explanation:
      "No cryptographic solution survives a wrench. Multi-sig? They'll wait for you to call your co-signers. Hardware wallet? They'll watch you unlock it. The only real defense is upgrading your skull to titanium — which is exactly what $5WA staking simulates. Helmet upgrade = staking. You're welcome.",
  },
  {
    id: "q4",
    difficulty: "basic",
    reward: 100,
    question: 'You receive a DM from "Binance Support" asking you to verify your seed phrase "for security purposes." This is:',
    options: [
      { key: "A", text: "Legitimate customer service — especially since the profile photo is a beautiful woman, so it must be real" },
      { key: "B", text: "A social engineering attack — no exchange will EVER ask for your seed phrase" },
      { key: "C", text: "On-chain analytics — they're just checking your wallet health" },
      { key: "D", text: "Multi-sig verification — they need it to add you to the multi-sig" },
    ],
    correctKey: "B",
    explanation:
      "No legitimate exchange will ever ask for your seed phrase. Ever. If someone asks, they're stealing your wallet. Your seed phrase is the master key to everything you own. Giving it away is like handing your house keys to a stranger because they said they're from the 'door company.'",
  },
  {
    id: "q5",
    difficulty: "basic",
    reward: 100,
    question: 'What is the PRIMARY purpose of a "duress wallet" (decoy wallet)?',
    options: [
      { key: "A", text: "To store your main holdings with extra encryption so attackers can't find them" },
      { key: "B", text: "To fill it with zeroed-out meme coins so the attacker sheds tears of sympathy on the spot" },
      { key: "C", text: "A sacrificial wallet with a small amount you surrender under threat, protecting your real assets" },
      { key: "D", text: "To earn higher staking rewards through the 'duress yield farming' program" },
    ],
    correctKey: "C",
    explanation:
      "A duress wallet holds a small amount of real crypto. Under physical threat, you hand this over — the attacker sees a real transaction and leaves satisfied. Your main stash stays safe. Some hardware wallets support a hidden passphrase that reveals a completely different set of accounts. Option B is funny but not a strategy.",
  },
  {
    id: "q6",
    difficulty: "basic",
    reward: 100,
    question: "What is $5WA's recommended FIRST line of defense against physical attacks?",
    options: [
      { key: "A", text: "Hiring two armed bodyguards and a K9 unit for every crypto meetup" },
      { key: "B", text: "Never attending any crypto event, ever, for the rest of your life" },
      { key: "C", text: "OpSec — minimize your visible crypto footprint so attackers can't identify you as a target" },
      { key: "D", text: "Storing everything on a centralized exchange — 'not your keys, not your wrench problem'" },
    ],
    correctKey: "C",
    explanation:
      "If attackers can't identify you as a crypto holder, they can't target you. Separating your crypto identity from your real-world identity is the cheapest, most effective defense. Option D is a popular cope, but exchanges get hacked too — and then you have no keys AND no wrench defense.",
  },
  {
    id: "q7",
    difficulty: "basic",
    reward: 100,
    question: "What's the MOST secure way to store your seed phrase long-term?",
    options: [
      { key: "A", text: "In a password manager on your computer — it has 2FA enabled" },
      { key: "B", text: "Stamped on a metal plate stored in a secure location — fireproof, waterproof, wrench-proof" },
      { key: "C", text: "Written on a sticky note in your desk drawer labeled 'DO NOT STEAL'" },
      { key: "D", text: "As a photo in your phone's gallery, right next to your passport scan" },
    ],
    correctKey: "B",
    explanation:
      "Metal plates survive fire, water, and physical degradation. Paper burns. Digital storage gets hacked. A photo in your gallery is basically a gift to anyone who steals your phone. A metal backup in a secure location is the gold standard — and yes, it's more expensive than a $5 wrench, but so is losing everything you own.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // INTERMEDIATE (Q8–Q13)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "q8",
    difficulty: "intermediate",
    reward: 150,
    question: 'You post a selfie from your home office on Instagram. In the background: a window reflecting your street name, a Ledger on your desk, and a framed "I HODL" poster. What\'s the risk?',
    options: [
      { key: "A", text: "Instagram automatically shares your GPS with Interpol — you're fine" },
      { key: "B", text: "Attackers can reverse-image-search, cross-reference landmarks with public records, and locate your home for a wrench visit" },
      { key: "C", text: "Your Ledger will auto-connect to public WiFi and broadcast your seed phrase" },
      { key: "D", text: "The I HODL poster will trigger an IRS audit" },
    ],
    correctKey: "B",
    explanation:
      "This is a real OSINT attack vector. Reflections, landmarks, metadata, and background details can be cross-referenced with Google Street View and public records to pinpoint your exact address. That selfie just gave a wrench-wielding attacker your home coordinates. OpSec means auditing every photo before posting.",
  },
  {
    id: "q9",
    difficulty: "intermediate",
    reward: 150,
    question: 'A "delivery driver" arrives with a package from a tech company you don\'t remember ordering from. They insist you sign for it. What\'s likely happening?',
    options: [
      { key: "A", text: "It\'s definitely a bomb — call the police and hide under your desk" },
      { key: "B", text: "It\'s a pretext for casing your home — fake deliveries confirm occupancy and gather intel before a physical attack" },
      { key: "C", text: "Delivery drivers always work for legitimate companies and can be fully trusted" },
      { key: "D", text: "The package contains malware that will infect your WiFi router through the cardboard" },
    ],
    correctKey: "B",
    explanation:
      "Fake deliveries are a classic pre-attack surveillance tactic. The 'driver' is checking if you're home, what your schedule looks like, and whether you have security cameras. Always verify unexpected deliveries independently using the company's official number — never the number on the package or the driver's phone.",
  },
  {
    id: "q10",
    difficulty: "intermediate",
    reward: 150,
    question: 'A stranger at a crypto conference asks to "just hold your hardware wallet for a second to check the model." What do you do?',
    options: [
      { key: "A", text: "Let them hold it — they can\'t access funds without your PIN, so it\'s harmless" },
      { key: "B", text: "Politely decline and never let anyone touch your hardware wallet — device-swap attacks are real" },
      { key: "C", text: "Show them but cover the screen with your hand like a credit card" },
      { key: "D", text: "Only let them hold it if they let you hold theirs first — fair trade" },
    ],
    correctKey: "B",
    explanation:
      "Letting someone handle your hardware wallet opens you to device-swap attacks (they hand back a compromised clone), firmware tampering, or simply revealing which model you use — making you a more specific target. Your hardware wallet is not a toy. It's not a conversation starter. It's your financial life in a USB stick.",
  },
  {
    id: "q11",
    difficulty: "intermediate",
    reward: 150,
    question: "You're flying internationally with significant crypto holdings. Which strategy BEST protects you from a wrench encounter at your destination?",
    options: [
      { key: "A", text: "Carry your primary hardware wallet with full holdings — you need it for emergencies" },
      { key: "B", text: "Use a travel wallet with minimal funds and leave primary storage at home in a safe" },
      { key: "C", text: "Write your seed phrase on a piece of paper in your checked luggage as backup" },
      { key: "D", text: "Memorize your seed phrase and carry no physical backup — you're a crypto ninja" },
    ],
    correctKey: "B",
    explanation:
      "A travel wallet limits exposure if you're robbed, searched at customs, or coerced. Your main holdings stay safe at home. Option C is a terrible idea — checked luggage can be searched and copied without your knowledge. Option D sounds cool until you hit your head on a low ceiling and forget 24 words forever.",
  },
  {
    id: "q12",
    difficulty: "intermediate",
    reward: 150,
    question: "How do attackers MOST commonly use OSINT to identify crypto holders for physical targeting?",
    options: [
      { key: "A", text: "Hack directly into exchange databases — they have root access to Binance" },
      { key: "B", text: "Correlate public on-chain transactions with social media posts that reveal wealth or location" },
      { key: "C", text: "Use military satellites to detect hardware wallets from orbit" },
      { key: "D", text: "Intercept encrypted wallet communications via quantum computing" },
    ],
    correctKey: "B",
    explanation:
      "Attackers don't need to hack anything. They browse blockchains for large balances, then cross-reference with Twitter, LinkedIn, and Instagram posts showing wealth signals, geotagged photos, or real names. Your on-chain activity is public. Your Instagram is public. Together, they're a treasure map for a wrench-wielding attacker.",
  },
  {
    id: "q13",
    difficulty: "intermediate",
    reward: 150,
    question: 'A "recruiter" from a major Web3 company sends you a LinkedIn message asking you to download a "coding challenge" as a zip file. This is MOST likely:',
    options: [
      { key: "A", text: "A legitimate recruitment process — all Web3 companies hire via zip files" },
      { key: "B", text: "A social engineering attack delivering malware that steals keys and maps your location for a physical attack" },
      { key: "C", text: "Just a phishing attempt targeting your email password — nothing more" },
      { key: "D", text: "Spam — ignore it and you\'re completely safe with zero further concern" },
    ],
    correctKey: "B",
    explanation:
      "This mirrors the Lazarus Group's documented attack pattern. Fake recruiters deliver malware that steals private keys, maps your network, and gathers location data — enabling both digital theft and physical targeting. Never download files from unsolicited recruiters. Verify the company independently first. The job offer is fake; the wrench is real.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // ADVANCED (Q14–Q18)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "q14",
    difficulty: "advanced",
    reward: 200,
    question: 'You get a job offer email from a well-known crypto company. They ask you to "verify your identity" by sending your home address, phone number, and a photo of your ID. What\'s the red flag?',
    options: [
      { key: "A", text: "Remote jobs never require identity verification — everyone in crypto is anonymous by default" },
      { key: "B", text: "Attackers research crypto holders on LinkedIn, then pose as recruiters to extract personal data for SIM swapping or a physical wrench visit" },
      { key: "C", text: "Crypto companies don\'t hire remote workers — everyone works from a bunker" },
      { key: "D", text: "The email looks official with a real company logo, so it\'s definitely safe" },
    ],
    correctKey: "B",
    explanation:
      "Sophisticated attackers use LinkedIn to identify high-net-worth crypto holders, then impersonate recruiters to extract home addresses, phone numbers, and ID photos. That's everything needed for SIM swapping, identity theft, or planning a wrench visit. Legitimate companies use secure portals for ID verification — not email attachments.",
  },
  {
    id: "q15",
    difficulty: "advanced",
    reward: 200,
    question: "After a SIM-swap attack compromises your phone number, what's the MOST dangerous escalation path toward a physical wrench encounter?",
    options: [
      { key: "A", text: "The attacker resets your exchange password and drains your account — game over" },
      { key: "B", text: "The attacker accesses your real-time location through carrier services or Find My Phone, then coordinates a physical interception" },
      { key: "C", text: "The attacker sends embarrassing messages to your contacts" },
      { key: "D", text: "The attacker uses your number to sign up for spam newsletters" },
    ],
    correctKey: "B",
    explanation:
      "SIM-swap attacks expose real-time location data through carrier services, Find My Phone, or Google Maps timeline. This enables attackers to physically locate and intercept you. A SIM swap is often step one in a multi-stage attack that ends with a wrench at your door. Secure your SIM with a carrier PIN — it's the cheapest helmet upgrade you'll ever buy.",
  },
  {
    id: "q16",
    difficulty: "advanced",
    reward: 200,
    question: "You notice the same car parked near your house on three different days, and a stranger photographed your front door. What's the MOST appropriate immediate response?",
    options: [
      { key: "A", text: "Charge out to confront them — you bench press 100kg daily, you can take on a toolbox wrench" },
      { key: "B", text: "Ignore it — you\'re probably being paranoid, and paranoia is bad for your mental health" },
      { key: "C", text: "Document everything (photos, plates, times), vary your routine immediately, and alert local authorities" },
      { key: "D", text: "Post about it on Crypto Twitter to warn others and get retweets" },
    ],
    correctKey: "C",
    explanation:
      "This matches pre-attack surveillance patterns documented in real crypto home invasion cases. Document everything for law enforcement. Vary your routine to disrupt their planning. Never confront (escalates danger) and never post online (tips off the attacker that you're aware, which may cause them to act sooner). Your retweets won't stop a wrench.",
  },
  {
    id: "q17",
    difficulty: "advanced",
    reward: 200,
    question: "In 2024, attackers traveled from Texas to Minnesota to kidnap a crypto holder's family. How did they MOST likely identify the target's home address?",
    options: [
      { key: "A", text: "They hacked the local property tax database — it was a sophisticated cyber attack" },
      { key: "B", text: "They correlated large on-chain transactions with KYC exchange data, then used public property records and social media to locate the residence" },
      { key: "C", text: "They followed the victim home from a crypto conference — classic tail job" },
      { key: "D", text: "They bribed a crypto exchange employee for the address — inside job" },
    ],
    correctKey: "B",
    explanation:
      "This references a real DOJ case. Attackers used blockchain analysis to identify large holders, cross-referenced with exchange KYC data (obtained through social engineering or data breaches), then used public property records to find physical addresses. The combination of on-chain wealth signals and real-world identity data is the core attack vector. Your transactions are public. Your KYC is leakable. Your address is on file.",
  },
  {
    id: "q18",
    difficulty: "advanced",
    reward: 200,
    question: 'A "crypto investor" invites you to discuss a potential investment at a private office. They know your wallet holdings and mention specific transactions. What is the HIGHEST-RISK scenario?',
    options: [
      { key: "A", text: "They\'re a legitimate investor who did their research — nothing to worry about" },
      { key: "B", text: "It\'s a setup for a physical extraction attack in a controlled environment where they can coerce you to transfer assets" },
      { key: "C", text: "They want to pitch you their own memecoin — annoying but harmless" },
      { key: "D", text: "They're a Forbes journalist — you're about to land the cover of the crypto rich list" },
    ],
    correctKey: "B",
    explanation:
      "Luring targets to controlled locations is a documented attack pattern. Knowledge of your specific holdings indicates targeted research — legitimate investors don't reference your exact on-chain activity in initial meetings. A private office removes witnesses and escape routes. Always meet strangers in public places, tell someone where you're going, and never assume a wrench can't be waiting in a conference room.",
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

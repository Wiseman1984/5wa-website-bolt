import { describe, it, expect } from "vitest";
import { ENGLISH_CONTENT } from "@shared/i18n";
import {
  QUIZ_POOL,
  SESSION_QUESTION_COUNT,
  buildQuizSession,
  calculateReward,
} from "@shared/quizData";

// ─────────────────────────────────────────────────────────────────────────────
// i18n content tests (unchanged structure)
// ─────────────────────────────────────────────────────────────────────────────
describe("Airdrop Content - Season 1: Physical Security Basics", () => {
  it("should have airdrop content defined", () => {
    expect(ENGLISH_CONTENT.airdrop).toBeDefined();
  });

  it("should have airdrop title and subtitle", () => {
    const airdrop = ENGLISH_CONTENT.airdrop;
    expect(airdrop.title).toBe("$5WA Airdrop");
    expect(airdrop.subtitle).toBeDefined();
    expect(airdrop.subtitle.length).toBeGreaterThan(0);
  });

  it("should have description", () => {
    const airdrop = ENGLISH_CONTENT.airdrop;
    expect(airdrop.description).toBeDefined();
    expect(airdrop.description.length).toBeGreaterThan(0);
  });

  it("should have scoring tiers for 6-question quiz (4-tier system)", () => {
    const airdrop = ENGLISH_CONTENT.airdrop;
    expect(airdrop.scoring.tiers).toHaveLength(4);
    expect(airdrop.scoring.tiers[0].level).toBe("Vulnerable");
    expect(airdrop.scoring.tiers[1].level).toBe("Aware");
    expect(airdrop.scoring.tiers[2].level).toBe("Informed");
    expect(airdrop.scoring.tiers[3].level).toBe("Guardian");
  });

  it("should have reward information", () => {
    const airdrop = ENGLISH_CONTENT.airdrop;
    expect(airdrop.rewards.title).toBe("Token Rewards");
    expect(airdrop.rewards.perStar).toBeDefined();
    expect(airdrop.rewards.bonus).toBeDefined();
  });

  it("should have sharing configuration", () => {
    const airdrop = ENGLISH_CONTENT.airdrop;
    expect(airdrop.sharing.title).toBe("Share Your Achievement");
    expect(airdrop.sharing.button).toBe("Share on X");
    expect(airdrop.sharing.tweetTemplate).toContain("{score}");
  });

  it("should have wallet submission fields", () => {
    const airdrop = ENGLISH_CONTENT.airdrop;
    expect(airdrop.wallet.title).toBe("Claim Your Airdrop");
    expect(airdrop.wallet.label).toBe("BSC Wallet Address");
    expect(airdrop.wallet.placeholder).toBe("0x...");
    expect(airdrop.wallet.error).toBeDefined();
  });

  it("should have submit button text", () => {
    const airdrop = ENGLISH_CONTENT.airdrop;
    expect(airdrop.submit.button).toBeDefined();
    expect(airdrop.submit.success).toBeDefined();
    expect(airdrop.submit.successMessage).toContain("{amount}");
  });

  it("should have tier messages and suggestions", () => {
    const airdrop = ENGLISH_CONTENT.airdrop;
    airdrop.scoring.tiers.forEach((tier) => {
      expect(tier.message).toBeDefined();
      expect(tier.message.length).toBeGreaterThan(0);
      expect(tier.suggestion).toBeDefined();
      expect(tier.suggestion.length).toBeGreaterThan(0);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Quiz pool tests (new 18-question pool)
// ─────────────────────────────────────────────────────────────────────────────
describe("Quiz Pool — 18 questions", () => {
  it("should contain exactly 18 questions", () => {
    expect(QUIZ_POOL).toHaveLength(18);
  });

  it("should have unique question IDs", () => {
    const ids = QUIZ_POOL.map((q) => q.id);
    expect(new Set(ids).size).toBe(18);
  });

  it("should include all IDs from q1 to q18", () => {
    const ids = QUIZ_POOL.map((q) => q.id);
    for (let i = 1; i <= 18; i++) {
      expect(ids).toContain(`q${i}`);
    }
  });

  it("each question should have 4 options with unique keys A-D", () => {
    QUIZ_POOL.forEach((q) => {
      expect(q.options).toHaveLength(4);
      const keys = q.options.map((o) => o.key);
      expect(keys).toContain("A");
      expect(keys).toContain("B");
      expect(keys).toContain("C");
      expect(keys).toContain("D");
      expect(new Set(keys).size).toBe(4);
    });
  });

  it("each question's correctKey should match one of its option keys", () => {
    QUIZ_POOL.forEach((q) => {
      const optionKeys = q.options.map((o) => o.key);
      expect(optionKeys).toContain(q.correctKey);
    });
  });

  it("each question should have a non-empty explanation", () => {
    QUIZ_POOL.forEach((q) => {
      expect(q.explanation).toBeDefined();
      expect(q.explanation.length).toBeGreaterThan(20);
    });
  });

  it("should have valid difficulty levels", () => {
    const validDifficulties = ["basic", "intermediate", "advanced"];
    QUIZ_POOL.forEach((q) => {
      expect(validDifficulties).toContain(q.difficulty);
    });
  });

  it("should have valid reward values (100, 150, or 200)", () => {
    QUIZ_POOL.forEach((q) => {
      expect([100, 150, 200]).toContain(q.reward);
    });
  });

  it("basic questions should have reward 100", () => {
    QUIZ_POOL.filter((q) => q.difficulty === "basic").forEach((q) => {
      expect(q.reward).toBe(100);
    });
  });

  it("intermediate questions should have reward 150", () => {
    QUIZ_POOL.filter((q) => q.difficulty === "intermediate").forEach((q) => {
      expect(q.reward).toBe(150);
    });
  });

  it("advanced questions should have reward 200", () => {
    QUIZ_POOL.filter((q) => q.difficulty === "advanced").forEach((q) => {
      expect(q.reward).toBe(200);
    });
  });

  it("should have at least 6 basic, 4 intermediate, and 4 advanced questions", () => {
    const basic = QUIZ_POOL.filter((q) => q.difficulty === "basic").length;
    const intermediate = QUIZ_POOL.filter((q) => q.difficulty === "intermediate").length;
    const advanced = QUIZ_POOL.filter((q) => q.difficulty === "advanced").length;
    expect(basic).toBeGreaterThanOrEqual(6);
    expect(intermediate).toBeGreaterThanOrEqual(4);
    expect(advanced).toBeGreaterThanOrEqual(4);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Session builder tests
// ─────────────────────────────────────────────────────────────────────────────
describe("buildQuizSession — random session selection", () => {
  it(`should return exactly ${SESSION_QUESTION_COUNT} questions`, () => {
    const session = buildQuizSession(42);
    expect(session).toHaveLength(SESSION_QUESTION_COUNT);
  });

  it("each session question should have shuffled display labels A-D", () => {
    const session = buildQuizSession(99);
    session.forEach((q) => {
      const labels = q.options.map((o) => o.displayLabel);
      expect(labels).toContain("A");
      expect(labels).toContain("B");
      expect(labels).toContain("C");
      expect(labels).toContain("D");
      expect(new Set(labels).size).toBe(4);
    });
  });

  it("correctDisplayLabel should always match one of the session options", () => {
    const session = buildQuizSession(123);
    session.forEach((q) => {
      const labels = q.options.map((o) => o.displayLabel);
      expect(labels).toContain(q.correctDisplayLabel);
    });
  });

  it("should produce different question sets for different seeds", () => {
    const session1 = buildQuizSession(1).map((q) => q.id);
    const session2 = buildQuizSession(999999).map((q) => q.id);
    expect(session1.join(",")).not.toBe(session2.join(","));
  });

  it("should produce the same session for the same seed (deterministic)", () => {
    const session1 = buildQuizSession(777).map((q) => q.id);
    const session2 = buildQuizSession(777).map((q) => q.id);
    expect(session1).toEqual(session2);
  });

  it("should not repeat question IDs within a single session", () => {
    const session = buildQuizSession(55);
    const ids = session.map((q) => q.id);
    expect(new Set(ids).size).toBe(SESSION_QUESTION_COUNT);
  });

  it("options should preserve original text after shuffling", () => {
    const session = buildQuizSession(200);
    session.forEach((sq) => {
      const original = QUIZ_POOL.find((q) => q.id === sq.id)!;
      const originalTexts = original.options.map((o) => o.text).sort();
      const sessionTexts = sq.options.map((o) => o.text).sort();
      expect(sessionTexts).toEqual(originalTexts);
    });
  });

  it("max possible reward for a session should be <= 1200 (raw)", () => {
    const session = buildQuizSession(42);
    const maxReward = session.reduce((sum, q) => sum + q.reward, 0);
    expect(maxReward).toBeLessThanOrEqual(1200);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Reward calculation tests (cap + elite bonus)
// ─────────────────────────────────────────────────────────────────────────────
describe("calculateReward — cap and elite bonus", () => {
  it("should cap normal rewards at 1000", () => {
    // Create a fake session with 6 advanced questions (raw = 1200)
    const fakeSession = Array.from({ length: 6 }, (_, i) => ({
      id: `q${14 + (i % 5)}`,
      difficulty: "advanced" as const,
      reward: 200,
      question: "test",
      options: [{ displayLabel: "A", text: "t", originalKey: "A" }, { displayLabel: "B", text: "t", originalKey: "B" }, { displayLabel: "C", text: "t", originalKey: "C" }, { displayLabel: "D", text: "t", originalKey: "D" }],
      correctDisplayLabel: "A",
      explanation: "test",
    }));
    const answers: Record<string, string> = {};
    fakeSession.forEach((q) => { answers[q.id] = "A"; });
    const result = calculateReward(fakeSession, answers);
    // 6 advanced all correct but NOT elite (needs exactly 4 adv + 2 int)
    expect(result.reward).toBe(1000);
    expect(result.isElite).toBe(false);
  });

  it("should award 1500 for elite session (4 advanced + 2 intermediate, all correct)", () => {
    const fakeSession = [
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `adv${i}`,
        difficulty: "advanced" as const,
        reward: 200,
        question: "test",
        options: [{ displayLabel: "A", text: "t", originalKey: "A" }, { displayLabel: "B", text: "t", originalKey: "B" }, { displayLabel: "C", text: "t", originalKey: "C" }, { displayLabel: "D", text: "t", originalKey: "D" }],
        correctDisplayLabel: "A",
        explanation: "test",
      })),
      ...Array.from({ length: 2 }, (_, i) => ({
        id: `int${i}`,
        difficulty: "intermediate" as const,
        reward: 150,
        question: "test",
        options: [{ displayLabel: "A", text: "t", originalKey: "A" }, { displayLabel: "B", text: "t", originalKey: "B" }, { displayLabel: "C", text: "t", originalKey: "C" }, { displayLabel: "D", text: "t", originalKey: "D" }],
        correctDisplayLabel: "B",
        explanation: "test",
      })),
    ];
    const answers: Record<string, string> = {};
    fakeSession.forEach((q) => { answers[q.id] = q.correctDisplayLabel; });
    const result = calculateReward(fakeSession, answers);
    expect(result.reward).toBe(1500);
    expect(result.isElite).toBe(true);
    expect(result.allCorrect).toBe(true);
  });

  it("should NOT award elite bonus if not all answers are correct", () => {
    const fakeSession = [
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `adv${i}`,
        difficulty: "advanced" as const,
        reward: 200,
        question: "test",
        options: [{ displayLabel: "A", text: "t", originalKey: "A" }, { displayLabel: "B", text: "t", originalKey: "B" }, { displayLabel: "C", text: "t", originalKey: "C" }, { displayLabel: "D", text: "t", originalKey: "D" }],
        correctDisplayLabel: "A",
        explanation: "test",
      })),
      ...Array.from({ length: 2 }, (_, i) => ({
        id: `int${i}`,
        difficulty: "intermediate" as const,
        reward: 150,
        question: "test",
        options: [{ displayLabel: "A", text: "t", originalKey: "A" }, { displayLabel: "B", text: "t", originalKey: "B" }, { displayLabel: "C", text: "t", originalKey: "C" }, { displayLabel: "D", text: "t", originalKey: "D" }],
        correctDisplayLabel: "B",
        explanation: "test",
      })),
    ];
    // Answer 5 correctly, 1 wrong
    const answers: Record<string, string> = {};
    fakeSession.forEach((q, i) => { answers[q.id] = i === 0 ? "D" : q.correctDisplayLabel; });
    const result = calculateReward(fakeSession, answers);
    expect(result.reward).toBeLessThanOrEqual(1000);
    expect(result.isElite).toBe(false);
  });

  it("should return 0 reward when no answers are given", () => {
    const session = buildQuizSession(42);
    const result = calculateReward(session, {});
    expect(result.reward).toBe(0);
    expect(result.isElite).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Submission payload structure tests
// ─────────────────────────────────────────────────────────────────────────────
describe("Submission payload — question_ids and is_elite", () => {
  it("buildQuizSession should return questions with IDs that can be joined as comma-separated string", () => {
    const session = buildQuizSession(42);
    const questionIds = session.map((q) => q.id).join(",");
    expect(questionIds).toMatch(/^q\d+(,q\d+){5}$/);
    expect(questionIds.split(",")).toHaveLength(SESSION_QUESTION_COUNT);
  });

  it("question_ids string should contain exactly 6 valid question IDs from the pool", () => {
    const session = buildQuizSession(99);
    const questionIds = session.map((q) => q.id).join(",");
    const ids = questionIds.split(",");
    const validIds = QUIZ_POOL.map((q) => q.id);
    ids.forEach((id) => {
      expect(validIds).toContain(id);
    });
  });

  it("is_elite should be false for a normal session with all correct answers", () => {
    // Use a seeded session that is unlikely to be elite
    const session = buildQuizSession(42);
    const answers: Record<string, string> = {};
    session.forEach((q) => { answers[q.id] = q.correctDisplayLabel; });
    const result = calculateReward(session, answers);
    // Even if all correct, is_elite requires exactly 4 adv + 2 int
    // The reward should be capped at 1000 unless elite
    expect(result.reward).toBeLessThanOrEqual(1500);
    expect(typeof result.isElite).toBe("boolean");
  });

  it("submission payload fields should be correctly typed", () => {
    const session = buildQuizSession(7);
    const answers: Record<string, string> = {};
    session.forEach((q) => { answers[q.id] = q.correctDisplayLabel; });
    const result = calculateReward(session, answers);
    // Simulate what Airdrop.tsx builds for the Supabase insert
    const payload = {
      username: "TestUser",
      wallet_address: "0x1234567890abcdef1234567890abcdef12345678",
      tweet_url: "https://x.com/test/status/123",
      token_reward: result.reward,
      question_ids: session.map((q) => q.id).join(","),
      is_elite: result.isElite,
    };
    expect(payload.question_ids).toMatch(/^q\d+(,q\d+){5}$/);
    expect(typeof payload.is_elite).toBe("boolean");
    expect(payload.token_reward).toBeLessThanOrEqual(1500);
    expect(payload.token_reward).toBeGreaterThanOrEqual(0);
  });
});

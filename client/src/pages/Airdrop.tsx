import { useState, useMemo } from "react";
import { ENGLISH_CONTENT } from "@shared/i18n";
import { buildQuizSession, SESSION_QUESTION_COUNT, calculateReward, REWARD_CAP, ELITE_BONUS_REWARD } from "@shared/quizData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Share2, Zap, Gift, Clock, Brain, Trophy, Sparkles, X } from "lucide-react";
import { NeonShieldRow } from "@/components/NeonShield";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";

const content = ENGLISH_CONTENT.airdrop;
const SEASON1_DEADLINE = "September 30, 2026";
const AIRDROP_END = new Date("2026-09-30T23:59:59Z");
const isAirdropClosed = new Date() > AIRDROP_END;

export function Airdrop() {
  usePageMeta({
    title: "$5WA Airdrop | Proof of Helmet Quiz",
    description:
      "Take the $5 Wrench Attack meme quiz, earn your Skull Hardness Certificate, share on X, and get airdropped $5WA tokens. Proof of Helmet, not proof of nothing.",
    url: "https://5wa.io/airdrop",
  });

  const [userName, setUserName] = useState("");
  const [userNameSubmitted, setUserNameSubmitted] = useState(false);
  // selectedAnswers maps question id → the *display label* chosen (A/B/C/D in shuffled order)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [walletAddress, setWalletAddress] = useState("");
  const [tweetUrl, setTweetUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  // Reward confirmed by the server after submission (authoritative)
  const [confirmedReward, setConfirmedReward] = useState<number | null>(null);

  // Modal state — shows immediately after quiz submission
  const [showModal, setShowModal] = useState(false);

  // Build a randomized session once per page load (stable via useMemo with no deps)
  const sessionQuestions = useMemo(() => buildQuizSession(), []);
  const totalQuestions = SESSION_QUESTION_COUNT; // 6

  // Score: count questions where the selected display label matches the correct display label
  const score = sessionQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correctDisplayLabel
  ).length;

  // Calculate reward using the shared helper (capped at 1000, or 1500 for elite)
  const { reward, isElite } = useMemo(() => {
    if (!showResults) return { reward: 0, isElite: false, allCorrect: false };
    return calculateReward(sessionQuestions, selectedAnswers);
  }, [showResults, sessionQuestions, selectedAnswers]);

  // Determine tier (4-tier system: Vulnerable/Aware/Informed/Guardian)
  const getTier = (s: number) => {
    if (s <= 1) return 0; // Vulnerable
    if (s <= 3) return 1; // Aware
    if (s <= 5) return 2; // Informed
    return 3; // Guardian
  };

  const tier = getTier(score);
  const tierInfo = content.scoring.tiers[tier];

  // Handle user name submission
  const handleUserNameSubmit = () => {
    if (userName.trim() || isAirdropClosed) {
      setUserNameSubmitted(true);
      setCurrentStep(1);
    }
  };

  // Select answer for a question (uses shuffled display label)
  const selectAnswer = (questionId: string, displayLabel: string) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: displayLabel }));
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length >= 1) {
      setShowResults(true);
      setCurrentStep(2);
      setShowModal(true);
    }
  };

  // Get OG share level based on correct answers (4-tier system)
  const getShareLevel = (correct: number): string => {
    if (correct === 6) return "Diamond Skull";
    if (correct >= 4) return "Iron Skull";
    if (correct >= 2) return "Cardboard Skull";
    return "Paper Skull";
  };

  // Share on X with personalized OG image preview
  const handleShareOnX = () => {
    const shareLevel = getShareLevel(score);
    const timestamp = Date.now();
    const displayReward = isElite ? ELITE_BONUS_REWARD : reward;
    const maxDisplay = isElite ? ELITE_BONUS_REWARD : REWARD_CAP;
    const shareUrl = `https://5wa.io/airdrop/share?score=${displayReward}&correct=${score}&level=${shareLevel}&t=${timestamp}`;
    const tweet = isElite
      ? `\u{1F3C6} DIAMOND SKULL! I scored ${displayReward}/${maxDisplay} on the $5WA Proof of Helmet Quiz! \u{1F6E1}\uFE0F ${score}/6 Shields. Can you unlock the hidden bonus?\n${shareUrl} #5WA #ProofOfHelmet #Airdrop`
      : `I scored ${displayReward}/${maxDisplay} on the $5WA Proof of Helmet Quiz! Level: ${shareLevel} (${score}/6 Shields). Test your skull thickness:\n${shareUrl} #5WA #ProofOfHelmet #Airdrop`;
    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(intentUrl, "_blank");
    setCurrentStep(3);
  };

  // Validate wallet address (BSC)
  const isValidWallet = (address: string) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  // Validate tweet URL
  const isValidTweetUrl = (url: string) => {
    return /^https?:\/\/(twitter\.com|x\.com)\/\w+\/status\/\d+/.test(url);
  };

  // Handle wallet submission to Supabase
  const handleSubmit = async () => {
    setError("");

    if (!tweetUrl.trim()) {
      setError("Please paste your tweet URL");
      return;
    }

    if (!isValidTweetUrl(tweetUrl)) {
      setError("Please enter a valid tweet URL (e.g., https://x.com/username/status/123...)");
      return;
    }

    if (!walletAddress.trim()) {
      setError("Please enter your BSC wallet address");
      return;
    }

    if (!isValidWallet(walletAddress)) {
      setError(content.wallet.error);
      return;
    }

    setIsSubmitting(true);

    try {
      const answers: Record<string, string> = {};
      for (const q of sessionQuestions) {
        const chosenLabel = selectedAnswers[q.id];
        if (!chosenLabel) continue;
        const chosen = q.options.find((o) => o.displayLabel === chosenLabel);
        if (chosen) answers[q.id] = chosen.originalKey;
      }

      const functionsUrl = import.meta.env.VITE_GUARDIAN_URL as string | undefined;
      const functionsKey = import.meta.env.VITE_GUARDIAN_ANON_KEY as string | undefined;
      if (!functionsUrl || !functionsKey) {
        throw new Error("Submission service is not configured");
      }

      const response = await fetch(`${functionsUrl}/functions/v1/airdrop_submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${functionsKey}`,
        },
        body: JSON.stringify({
          p_username: userName.trim(),
          p_wallet_address: walletAddress.toLowerCase(),
          p_tweet_url: tweetUrl.trim(),
          p_question_ids: sessionQuestions.map((q) => q.id),
          p_answers: answers,
        }),
      });

      const result: unknown = await response.json();
      if (!response.ok) {
        const message = typeof result === "object" && result !== null && "error" in result && typeof result.error === "string"
          ? result.error
          : "Submission failed. Please check your details and try again.";
        setError(message);
        setIsSubmitting(false);
        return;
      }

      const resultRecord = typeof result === "object" && result !== null ? result as Record<string, unknown> : {};
      const serverReward = typeof resultRecord.token_reward === "number"
        ? resultRecord.token_reward
        : typeof resultRecord.reward === "number"
          ? resultRecord.reward
          : isElite ? ELITE_BONUS_REWARD : reward;

      setConfirmedReward(serverReward);
      setSubmitted(true);
      setIsSubmitting(false);
    } catch (err) {
      console.error("[Airdrop] network error", err);
      setError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 px-4">
      {/* Post-Quiz Result Modal */}
      <Dialog open={showModal && !submitted} onOpenChange={setShowModal}>
        <DialogContent className="bg-[#0c1220] border-cyan-500/30 max-w-lg p-0 overflow-hidden [&>button]:hidden">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
            <h2 className="text-lg font-bold text-cyan-400">Quiz Complete!</h2>
            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Score display */}
            <div className="text-center">
              <div className="mb-3 flex justify-center">
                <NeonShieldRow count={totalQuestions} filledCount={score} size={32} />
              </div>
              <p className="text-3xl font-black text-white mb-1">{score}/{totalQuestions} <span className="text-lg text-gray-400">Correct</span></p>
              <p className="text-sm text-cyan-400 font-semibold">{tierInfo.level}</p>
              <div className="mt-2">
                {isElite ? (
                  <p className="text-2xl font-bold text-yellow-400">{ELITE_BONUS_REWARD} 5WA <span className="text-sm">(Elite Bonus!)</span></p>
                ) : (
                  <p className="text-2xl font-bold text-green-400">{reward} 5WA</p>
                )}
              </div>
            </div>

            {/* Share on X */}
            <Button
              onClick={handleShareOnX}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share on X (Step 2)
            </Button>

            {/* Tweet URL */}
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">
                Tweet URL <span className="text-red-500">*</span>
              </label>
              <Input
                type="url"
                placeholder="https://x.com/yourname/status/123456..."
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder-gray-500"
              />
              <p className="text-xs text-gray-500 mt-1">Paste the URL of your tweet containing #5WA</p>
            </div>

            {/* Wallet Address */}
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">
                BSC Wallet Address <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder-gray-500 font-mono"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit & Claim Reward"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Rewards distributed after Season 1 ends ({SEASON1_DEADLINE})
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-4">
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">{isAirdropClosed ? "Season 1 Ended — Practice Mode" : "Season 1: Physical Security Basics (Jul-Aug 2026)"}</span>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-blue-400">{content.title}</h1>
          <p className="text-xl text-blue-300 mb-4">{content.subtitle}</p>
          <p className="text-gray-300 max-w-2xl mx-auto">{content.description}</p>
          <p className="text-xs text-gray-500 mt-3 max-w-xl mx-auto">
            Each session randomly selects 6 questions from a pool of 18. Future seasons will cover supply chain attacks, travel risks, and advanced OpSec.
          </p>
        </div>

        {/* Season 1 Deadline + Rewards Notice */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-slate-900/80 border border-yellow-500/40 rounded-lg px-5 py-2.5">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-semibold text-sm">Season 1 Deadline:</span>
            <span className="text-yellow-100 font-bold">{SEASON1_DEADLINE}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-green-500/30 rounded-lg px-5 py-2.5">
            <Gift className="w-5 h-5 text-green-400" />
            <span className="text-green-300 text-sm">Up to <span className="font-bold text-green-200">1,000 5WA</span> tokens</span>
          </div>
        </div>

        {/* Flow Steps Indicator */}
        {!isAirdropClosed && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-700 z-0"></div>
            {[
              { num: 1, label: "Take Quiz" },
              { num: 2, label: "Share on X" },
              { num: 3, label: "Paste Tweet URL" },
              { num: 4, label: "Submit Wallet" },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    currentStep >= step.num
                      ? "bg-blue-600 text-white border-2 border-blue-400"
                      : "bg-slate-800 text-gray-500 border-2 border-slate-600"
                  }`}
                >
                  {submitted && step.num <= 4 ? "✓" : step.num}
                </div>
                <span className={`text-xs mt-1 whitespace-nowrap ${currentStep >= step.num ? "text-blue-300" : "text-gray-500"}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>

      {/* Success State */}
      {submitted ? (
        <div className="max-w-2xl mx-auto">
          <Card className="bg-slate-900/90 border-green-500/50 p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-400 mb-2">{content.submit.success}</h2>
            <p className="text-gray-300 mb-4">
              {content.submit.successMessage.replace("{amount}", String(confirmedReward ?? reward))}
            </p>
            <div className="bg-slate-800/80 rounded-lg p-4 mb-4 text-left space-y-2">
              <p className="text-sm text-gray-400">Username: <span className="text-white">{userName}</span></p>
              <p className="text-sm text-gray-400">Score: <span className="text-blue-400">{score}/{totalQuestions} Correct</span></p>
              <p className="text-sm text-gray-400">Level: <span className="text-blue-400">{tierInfo.level}</span></p>
              <p className="text-sm text-gray-400">Reward: <span className={isElite ? "text-yellow-400 font-bold" : "text-green-400"}>{confirmedReward ?? reward} 5WA{isElite ? " (Elite Guardian Bonus!)" : ""}</span></p>
              <p className="text-sm text-gray-400">Wallet: <span className="text-white font-mono text-xs">{walletAddress}</span></p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <p className="text-yellow-300 text-sm">
                Rewards will be distributed after Season 1 ends ({SEASON1_DEADLINE}). Please ensure your BSC wallet address is correct.
              </p>
            </div>
          </Card>
        </div>
      ) : isAirdropClosed ? (
        <>
          {/* Airdrop closed — quiz-only mode */}
          <div className="max-w-4xl mx-auto mb-8 text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300 font-medium">Season 1 has ended — Quiz practice mode</span>
            </div>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-slate-900/90 border-blue-500/30 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-400" />
                    <h2 className="text-2xl font-bold text-blue-300">{content.checklist.title}</h2>
                  </div>
                  <span className="text-xs text-gray-500 bg-slate-800 px-2 py-1 rounded-full">
                    6 of 18 questions
                  </span>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Questions Answered</span>
                    <span className="text-sm font-semibold text-blue-400">{Object.keys(selectedAnswers).length}/{totalQuestions}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(Object.keys(selectedAnswers).length / totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  {sessionQuestions.map((q, qIndex) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    const isCorrect = showResults && selectedAnswers[q.id] === q.correctDisplayLabel;
                    const isWrong = showResults && isAnswered && selectedAnswers[q.id] !== q.correctDisplayLabel;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-lg border transition-all ${
                          showResults
                            ? isCorrect
                              ? "border-green-500/50 bg-green-500/5"
                              : isWrong
                              ? "border-red-500/50 bg-red-500/5"
                              : "border-slate-700 bg-slate-800/50"
                            : isAnswered
                            ? "border-blue-500/50 bg-blue-500/5"
                            : "border-slate-700 bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-xs font-bold text-blue-500 bg-blue-500/10 border border-blue-500/30 rounded px-2 py-0.5 shrink-0 mt-0.5">
                            Q{qIndex + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-200">{q.question}</p>
                            <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                              q.difficulty === "basic"
                                ? "bg-green-500/10 text-green-400"
                                : q.difficulty === "intermediate"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-red-500/10 text-red-400"
                            }`}>
                              {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)} · {q.reward} 5WA
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {q.options.map((option) => {
                            const isSelected = selectedAnswers[q.id] === option.displayLabel;
                            const isCorrectOption = showResults && q.correctDisplayLabel === option.displayLabel;
                            return (
                              <button
                                key={option.displayLabel}
                                onClick={() => selectAnswer(q.id, option.displayLabel)}
                                disabled={showResults}
                                className={`text-left px-4 py-2.5 rounded-md border text-sm transition-all ${
                                  showResults
                                    ? isCorrectOption
                                      ? "border-green-500 bg-green-500/20 text-green-300"
                                      : isSelected && !isCorrectOption
                                      ? "border-red-500 bg-red-500/20 text-red-300"
                                      : "border-slate-700 text-gray-400"
                                    : isSelected
                                    ? "border-blue-500 bg-blue-500/20 text-blue-300"
                                    : "border-slate-700 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/5"
                                }`}
                              >
                                <span className="font-bold mr-2">{option.displayLabel})</span>
                                {option.text}
                                {showResults && isCorrectOption && <span className="ml-2 text-green-400">✓</span>}
                                {showResults && isSelected && !isCorrectOption && <span className="ml-2 text-red-400">✗</span>}
                              </button>
                            );
                          })}
                        </div>
                        {showResults && (
                          <div className="mt-3 p-3 rounded bg-slate-800/80 border border-slate-700">
                            <p className="text-xs text-gray-400 leading-relaxed">
                              <span className="font-semibold text-blue-400">Explanation: </span>
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {!showResults && (
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < 1}
                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {Object.keys(selectedAnswers).length >= 1
                      ? `Submit Quiz (${Object.keys(selectedAnswers).length}/${totalQuestions} answered)`
                      : `Answer at least 1 question`}
                  </Button>
                )}
              </Card>
            </div>
            <div className="space-y-6">
              {!showResults ? (
                <Card className="bg-slate-900/90 border-blue-500/30 p-6">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-semibold text-blue-300 mb-4">{content.scoring.title}</h3>
                    <p className="text-sm text-gray-400">Answer the quiz questions and submit to see your results.</p>
                    <p className="text-xs text-gray-500 mt-3">
                      Questions are randomly selected from a pool of 18. Reload the page for a new set!
                    </p>
                  </div>
                </Card>
              ) : (
                <>
                  <Card className="bg-slate-900/90 border-blue-500/30 p-6">
                    <h3 className="text-lg font-semibold text-blue-300 mb-4">{content.scoring.title}</h3>
                    <div className="text-center mb-4">
                      <div className="mb-2 flex justify-center">
                        <NeonShieldRow count={totalQuestions} filledCount={score} size={36} />
                      </div>
                      <p className="text-2xl font-bold text-blue-300">{score} / {totalQuestions} Correct</p>
                    </div>
                    <div className="mb-4 p-3 rounded-lg bg-slate-800 border border-blue-500/20">
                      <p className="text-sm text-gray-400 mb-1">Knowledge Level</p>
                      <p className="text-lg font-semibold text-blue-400">{tierInfo.level}</p>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">{tierInfo.message}</p>
                    <p className="text-xs text-blue-300 italic">{tierInfo.suggestion}</p>
                  </Card>
                  {isElite ? (
                    <Card className="bg-slate-900/90 border-yellow-500/50 p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/5 animate-pulse" />
                      <div className="relative">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Trophy className="w-6 h-6 text-yellow-400" />
                          <h3 className="text-lg font-bold text-yellow-400">$5WA Elite Guardian</h3>
                          <Sparkles className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="text-center mb-4">
                          <p className="text-5xl font-black text-yellow-400 mb-1">{ELITE_BONUS_REWARD}</p>
                          <p className="text-sm text-yellow-300/80">5WA Tokens</p>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                          <p className="text-sm text-yellow-200 font-semibold mb-1">Hidden Achievement Unlocked!</p>
                          <p className="text-xs text-yellow-300/70">You drew the rarest question combination AND answered all 6 correctly. Only ~0.03% of sessions qualify for this bonus.</p>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <Card className="bg-slate-900/90 border-green-500/30 p-6">
                      <h3 className="text-lg font-semibold text-green-400 mb-4">{content.rewards.title}</h3>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-green-400 mb-2">{reward}</p>
                        <p className="text-sm text-gray-400">5WA Tokens (max {REWARD_CAP})</p>
                        <p className="text-xs text-gray-500 mt-2">Basic=100 · Intermediate=150 · Advanced=200 per correct answer</p>
                      </div>
                    </Card>
                  )}
                  <Card className="bg-slate-900/90 border-yellow-500/30 p-6 text-center">
                    <p className="text-sm text-yellow-300 font-semibold mb-1">Season 1 Has Ended</p>
                    <p className="text-xs text-gray-400">The airdrop reward claim period closed on {SEASON1_DEADLINE}. You can still practice the quiz to test your knowledge. Stay tuned for Season 2!</p>
                  </Card>
                </>
              )}
            </div>
          </div>
          {showResults && (
            <div className="max-w-4xl mx-auto mt-12">
              <Card className="bg-slate-900/90 border-blue-500/30 p-8">
                <h2 className="text-2xl font-bold text-blue-300 mb-4">{content.narrative.title}</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {content.narrative.content}
                  </p>
                </div>
              </Card>
            </div>
          )}
          {showResults && (
            <div className="max-w-4xl mx-auto mt-12 text-center text-xs text-gray-500">
              <p>{content.privacy}</p>
            </div>
          )}
        </>
      ) : (
        <>
          {!userNameSubmitted ? (
            <div className="max-w-2xl mx-auto mb-12">
              <Card className="bg-slate-900/90 border-blue-500/30 p-8">
                <h2 className="text-2xl font-bold text-blue-300 mb-6">Get Started</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Your Name / Nickname <span className="text-red-500">*</span></label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="bg-slate-800 border-slate-700 text-white placeholder-gray-500"
                    />
                  </div>
                  <Button
                    onClick={handleUserNameSubmit}
                    disabled={!userName.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Start Quiz
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <>
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content - Quiz */}
                <div className="lg:col-span-2">
                  <Card className="bg-slate-900/90 border-blue-500/30 p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-400" />
                        <h2 className="text-2xl font-bold text-blue-300">{content.checklist.title}</h2>
                      </div>
                      <span className="text-xs text-gray-500 bg-slate-800 px-2 py-1 rounded-full">
                        6 of 18 questions
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-400">Questions Answered</span>
                        <span className="text-sm font-semibold text-blue-400">{Object.keys(selectedAnswers).length}/{totalQuestions}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${(Object.keys(selectedAnswers).length / totalQuestions) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Questions — flat list from the randomized session */}
                    <div className="space-y-6">
                      {sessionQuestions.map((q, qIndex) => {
                        const isAnswered = selectedAnswers[q.id] !== undefined;
                        const isCorrect = showResults && selectedAnswers[q.id] === q.correctDisplayLabel;
                        const isWrong = showResults && isAnswered && selectedAnswers[q.id] !== q.correctDisplayLabel;

                        return (
                          <div
                            key={q.id}
                            className={`p-4 rounded-lg border transition-all ${
                              showResults
                                ? isCorrect
                                  ? "border-green-500/50 bg-green-500/5"
                                  : isWrong
                                  ? "border-red-500/50 bg-red-500/5"
                                  : "border-slate-700 bg-slate-800/50"
                                : isAnswered
                                ? "border-blue-500/50 bg-blue-500/5"
                                : "border-slate-700 bg-slate-800/50"
                            }`}
                          >
                            {/* Question header */}
                            <div className="flex items-start gap-3 mb-3">
                              <span className="text-xs font-bold text-blue-500 bg-blue-500/10 border border-blue-500/30 rounded px-2 py-0.5 shrink-0 mt-0.5">
                                Q{qIndex + 1}
                              </span>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-200">{q.question}</p>
                                <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                                  q.difficulty === "basic"
                                    ? "bg-green-500/10 text-green-400"
                                    : q.difficulty === "intermediate"
                                    ? "bg-yellow-500/10 text-yellow-400"
                                    : "bg-red-500/10 text-red-400"
                                }`}>
                                  {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)} · {q.reward} 5WA
                                </span>
                              </div>
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-1 gap-2">
                              {q.options.map((option) => {
                                const isSelected = selectedAnswers[q.id] === option.displayLabel;
                                const isCorrectOption = showResults && q.correctDisplayLabel === option.displayLabel;

                                return (
                                  <button
                                    key={option.displayLabel}
                                    onClick={() => selectAnswer(q.id, option.displayLabel)}
                                    disabled={showResults}
                                    className={`text-left px-4 py-2.5 rounded-md border text-sm transition-all ${
                                      showResults
                                        ? isCorrectOption
                                          ? "border-green-500 bg-green-500/20 text-green-300"
                                          : isSelected && !isCorrectOption
                                          ? "border-red-500 bg-red-500/20 text-red-300"
                                          : "border-slate-700 text-gray-400"
                                        : isSelected
                                        ? "border-blue-500 bg-blue-500/20 text-blue-300"
                                        : "border-slate-700 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/5"
                                    }`}
                                  >
                                    <span className="font-bold mr-2">{option.displayLabel})</span>
                                    {option.text}
                                    {showResults && isCorrectOption && <span className="ml-2 text-green-400">✓</span>}
                                    {showResults && isSelected && !isCorrectOption && <span className="ml-2 text-red-400">✗</span>}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Explanation (shown after results) */}
                            {showResults && (
                              <div className="mt-3 p-3 rounded bg-slate-800/80 border border-slate-700">
                                <p className="text-xs text-gray-400 leading-relaxed">
                                  <span className="font-semibold text-blue-400">Explanation: </span>
                                  {q.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Submit quiz button */}
                    {!showResults && (
                      <Button
                        onClick={handleSubmitQuiz}
                        disabled={Object.keys(selectedAnswers).length < 1}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {Object.keys(selectedAnswers).length >= 1
                          ? `Submit Quiz (${Object.keys(selectedAnswers).length}/${totalQuestions} answered)`
                          : `Answer at least 1 question`}
                      </Button>
                    )}
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Results section */}
                  {!showResults ? (
                    <Card className="bg-slate-900/90 border-blue-500/30 p-6">
                      <div className="text-center py-8">
                        <h3 className="text-lg font-semibold text-blue-300 mb-4">{content.scoring.title}</h3>
                        <p className="text-sm text-gray-400">Answer the quiz questions and submit to see your results and claim rewards.</p>
                        <p className="text-xs text-gray-500 mt-3">
                          Questions are randomly selected from a pool of 18. Reload the page for a new set!
                        </p>
                      </div>
                    </Card>
                  ) : (
                    <>
                      {/* Scoring card */}
                      <Card className="bg-slate-900/90 border-blue-500/30 p-6">
                        <h3 className="text-lg font-semibold text-blue-300 mb-4">{content.scoring.title}</h3>

                        {/* Neon Shields */}
                        <div className="text-center mb-4">
                          <div className="mb-2 flex justify-center">
                            <NeonShieldRow count={totalQuestions} filledCount={score} size={36} />
                          </div>
                          <p className="text-2xl font-bold text-blue-300">{score} / {totalQuestions} Correct</p>
                        </div>

                        {/* Tier */}
                        <div className="mb-4 p-3 rounded-lg bg-slate-800 border border-blue-500/20">
                          <p className="text-sm text-gray-400 mb-1">Knowledge Level</p>
                          <p className="text-lg font-semibold text-blue-400">{tierInfo.level}</p>
                        </div>

                        {/* Message */}
                        <p className="text-sm text-gray-300 mb-4">{tierInfo.message}</p>
                        <p className="text-xs text-blue-300 italic">{tierInfo.suggestion}</p>
                      </Card>

                      {/* Rewards card — Elite celebration or normal */}
                      {isElite ? (
                        <Card className="bg-slate-900/90 border-yellow-500/50 p-6 relative overflow-hidden">
                          {/* Animated glow background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/5 animate-pulse" />
                          <div className="relative">
                            <div className="flex items-center justify-center gap-2 mb-4">
                              <Trophy className="w-6 h-6 text-yellow-400" />
                              <h3 className="text-lg font-bold text-yellow-400">$5WA Elite Guardian</h3>
                              <Sparkles className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div className="text-center mb-4">
                              <p className="text-5xl font-black text-yellow-400 mb-1">{ELITE_BONUS_REWARD}</p>
                              <p className="text-sm text-yellow-300/80">5WA Tokens</p>
                            </div>
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                              <p className="text-sm text-yellow-200 font-semibold mb-1">Hidden Achievement Unlocked!</p>
                              <p className="text-xs text-yellow-300/70">You drew the rarest question combination AND answered all 6 correctly. Only ~0.03% of sessions qualify for this bonus.</p>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        <Card className="bg-slate-900/90 border-green-500/30 p-6">
                          <h3 className="text-lg font-semibold text-green-400 mb-4">{content.rewards.title}</h3>
                          <div className="text-center">
                            <p className="text-4xl font-bold text-green-400 mb-2">{reward}</p>
                            <p className="text-sm text-gray-400">5WA Tokens (max {REWARD_CAP})</p>
                            <p className="text-xs text-gray-500 mt-2">Basic=100 · Intermediate=150 · Advanced=200 per correct answer</p>
                          </div>
                        </Card>
                      )}

                      {/* Step 2: Share on X */}
                      <Card className={`bg-slate-900/90 p-6 ${currentStep >= 2 ? "border-blue-500/30" : "border-slate-700/30 opacity-50"}`}>
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">Step 2: Share on X with #5WA</h3>
                        <p className="text-xs text-gray-400 mb-3">Post your quiz result on X (Twitter). Your score card will appear as a link preview.</p>
                        <Button
                          onClick={handleShareOnX}
                          disabled={currentStep < 2}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share on X
                        </Button>
                      </Card>

                      {/* Step 3 & 4: Tweet URL + Wallet */}
                      <Card className={`bg-slate-900/90 p-6 ${currentStep >= 3 ? "border-blue-500/30" : "border-slate-700/30 opacity-50"}`}>
                        <h3 className="text-lg font-semibold text-blue-300 mb-4">Step 3 & 4: Submit Your Info</h3>

                        <div className="space-y-4">
                          {/* Tweet URL */}
                          <div>
                            <label className="text-sm text-gray-400 mb-2 block">
                              Tweet URL <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="url"
                              placeholder="https://x.com/yourname/status/123456..."
                              value={tweetUrl}
                              onChange={(e) => setTweetUrl(e.target.value)}
                              disabled={currentStep < 3}
                              className="bg-slate-800 border-slate-700 text-white placeholder-gray-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Paste the URL of your tweet containing #5WA</p>
                          </div>

                          {/* Wallet Address */}
                          <div>
                            <label className="text-sm text-gray-400 mb-2 block">
                              BSC Wallet Address <span className="text-red-500">*</span>
                            </label>
                            <Input
                              type="text"
                              placeholder="0x..."
                              value={walletAddress}
                              onChange={(e) => setWalletAddress(e.target.value)}
                              disabled={currentStep < 3}
                              className="bg-slate-800 border-slate-700 text-white placeholder-gray-500 font-mono"
                            />
                            <p className="text-xs text-gray-500 mt-1">Your BNB Smart Chain (BSC) wallet address for receiving tokens</p>
                          </div>

                          {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                              <AlertCircle className="w-4 h-4 flex-shrink-0" />
                              <span>{error}</span>
                            </div>
                          )}

                          <Button
                            onClick={handleSubmit}
                            disabled={currentStep < 3 || isSubmitting}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
                          >
                            {isSubmitting ? "Submitting..." : content.submit.button}
                          </Button>

                          <div className="text-xs text-gray-500 text-center space-y-1">
                            <p>Rewards will be distributed after Season 1 ends ({SEASON1_DEADLINE}).</p>
                          </div>
                        </div>
                      </Card>
                    </>
                  )}
                </div>
              </div>

              {/* Narrative section - show after results */}
              {showResults && (
                <div className="max-w-4xl mx-auto mt-12">
                  <Card className="bg-slate-900/90 border-blue-500/30 p-8">
                    <h2 className="text-2xl font-bold text-blue-300 mb-4">{content.narrative.title}</h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {content.narrative.content}
                      </p>
                    </div>
                  </Card>
                </div>
              )}

              {/* Privacy statement */}
              {showResults && (
                <div className="max-w-4xl mx-auto mt-12 text-center text-xs text-gray-500">
                  <p>{content.privacy}</p>
                </div>
              )}
            </>
          )}
        </>
      )}
      </main>
    </div>
  );
}

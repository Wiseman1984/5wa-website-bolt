import { useState, useMemo } from "react";
import { RISK_QUESTIONS, calculateRisk, CATEGORY_LABELS, type RiskCategory } from "@shared/riskAssessment";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Shield, ShieldAlert, ShieldX, ShieldOff, AlertTriangle, ArrowLeft, RotateCcw, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import { usePageMeta } from "@/hooks/usePageMeta";

const LEVEL_ICONS: Record<string, typeof ShieldCheck> = {
  "shield-check": ShieldCheck,
  shield: Shield,
  "shield-alert": ShieldAlert,
  "shield-x": ShieldX,
  "shield-off": ShieldOff,
};

export default function RiskAssessment() {
  usePageMeta({
    title: "Personal Risk Assessment | $5WA",
    description: "Assess your personal crypto physical security risk. Answer a few questions to get a personalized risk score and actionable recommendations.",
    url: "https://5wa.io/risk-assessment",
  });

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const totalQuestions = RISK_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === totalQuestions;

  const result = useMemo(() => {
    if (!submitted) return null;
    return calculateRisk(answers);
  }, [submitted, answers]);

  const selectAnswer = (questionId: string, value: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (currentQuestion < totalQuestions - 1) {
      setTimeout(() => setCurrentQuestion((q) => q + 1), 200);
    }
  };

  const handleSubmit = () => {
    if (isComplete) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQuestion(0);
  };

  const progress = (answeredCount / totalQuestions) * 100;

  // ── Results View ──────────────────────────────────────────────
  if (submitted && result) {
    const LevelIcon = LEVEL_ICONS[result.levelIcon] ?? ShieldCheck;
    return (
      <div className="min-h-screen bg-transparent text-foreground flex flex-col">
        <Navigation />
        <main className="flex-1 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-4">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">Your Personal Risk Assessment</span>
              </div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: result.levelColor }}>
                {result.level} Risk
              </h1>
              <p className="text-lg text-gray-400">
                Score: {result.totalScore} / {result.maxScore}
              </p>
            </div>

            {/* Risk Gauge */}
            <Card className="bg-slate-900/90 border-slate-700 p-8 mb-8">
              <div className="flex flex-col items-center mb-6">
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${result.levelColor}15`,
                    border: `3px solid ${result.levelColor}`,
                    boxShadow: `0 0 30px ${result.levelColor}40`,
                  }}
                >
                  <LevelIcon className="w-16 h-16" style={{ color: result.levelColor }} />
                </div>
                <div className="w-full max-w-md">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Low Risk</span>
                    <span>Critical Risk</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(result.totalScore / result.maxScore) * 100}%`,
                        background: `linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Category Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {(Object.keys(result.categoryScores) as RiskCategory[]).map((cat) => {
                const cs = result.categoryScores[cat];
                const pct = cs.max > 0 ? (cs.score / cs.max) * 100 : 0;
                const catColor = pct <= 25 ? "#22c55e" : pct <= 50 ? "#eab308" : pct <= 75 ? "#f97316" : "#ef4444";
                return (
                  <Card key={cat} className="bg-slate-900/90 border-slate-700 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-300">{CATEGORY_LABELS[cat]}</h3>
                      <span className="text-xs font-mono" style={{ color: catColor }}>
                        {cs.score}/{cs.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: catColor }}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Recommendations */}
            <Card className="bg-slate-900/90 border-blue-500/30 p-8 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-blue-400" />
                <h2 className="text-2xl font-bold text-blue-300">Personalized Recommendations</h2>
              </div>
              <div className="space-y-4">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/60 border border-slate-700">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-blue-400">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-300 leading-relaxed pt-0.5">{rec}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleReset} variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
              <a href="/airdrop" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/airdrop'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Take the Security Quiz
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>

            <p className="text-center text-xs text-gray-500 mt-8 max-w-xl mx-auto">
              This assessment is for educational purposes only and does not constitute professional security advice.
              Your answers are processed locally in your browser and are not sent to any server.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // ── Questionnaire View ────────────────────────────────────────
  const q = RISK_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">
      <Navigation />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-4">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">Whitepaper Phase 3: Personal Risk Score</span>
            </div>
            <h1 className="text-4xl font-bold mb-2 text-blue-400">Personal Risk Assessment</h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">
              Answer {totalQuestions} quick questions about your crypto habits to get a personalized risk score and actionable security recommendations.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentQuestion + 1} of {totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="bg-slate-900/90 border-blue-500/30 p-8 mb-6">
            <div className="mb-6">
              <span className="text-xs font-bold text-blue-500 bg-blue-500/10 border border-blue-500/30 rounded px-2 py-0.5">
                {CATEGORY_LABELS[q.category]}
              </span>
              <h2 className="text-xl font-semibold text-gray-100 mt-3">{q.question}</h2>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {q.options.map((option) => {
                const isSelected = answers[q.id] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => selectAnswer(q.id, option.value)}
                    className={`text-left px-5 py-3.5 rounded-lg border text-sm transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-500/20 text-blue-300"
                        : "border-slate-700 bg-slate-800/50 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/5"
                    }`}
                  >
                    {option.label}
                    {isSelected && <span className="ml-2 text-blue-400">&#10003;</span>}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Button
              onClick={() => setCurrentQuestion((q) => Math.max(0, q - 1))}
              disabled={currentQuestion === 0}
              variant="outline"
              className="border-slate-600 text-gray-300 hover:bg-slate-800 disabled:opacity-40"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                disabled={!isComplete}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                View My Risk Score
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion((q) => Math.min(totalQuestions - 1, q + 1))}
                disabled={answers[q.id] === undefined}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Question Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {RISK_QUESTIONS.map((rq, i) => {
              const isAnswered = answers[rq.id] !== undefined;
              const isCurrent = i === currentQuestion;
              return (
                <button
                  key={rq.id}
                  onClick={() => setCurrentQuestion(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isCurrent
                      ? "bg-blue-500 w-6"
                      : isAnswered
                      ? "bg-blue-500/60"
                      : "bg-slate-700"
                  }`}
                  aria-label={`Question ${i + 1}`}
                />
              );
            })}
          </div>

          <p className="text-center text-xs text-gray-500 mt-8 max-w-xl mx-auto">
            Your answers are processed locally in your browser and are not stored or sent to any server.
          </p>
        </div>
      </main>
    </div>
  );
}

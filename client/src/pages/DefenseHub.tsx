import { useState } from "react";
import { CheckCircle2, Loader2, MapPin, ShieldCheck, Wallet } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LocationOpsecGuide from "@/components/LocationOpsecGuide";
import OpsecAuditFlow from "@/components/OpsecAuditFlow";
import GuardianAiPanel from "@/components/GuardianAiPanel";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useSolanaHolder } from "@/hooks/useSolanaHolder";
import { useWalletContext } from "@/lib/walletProvider";
import { OPSEC_REGIONS, OPSEC_SCENARIOS, getOpsecGuide, type OpsecRegionId, type OpsecScenarioId } from "@shared/opsecGuide";
import { buildQuizSession } from "@shared/quizData";
import { parseGuardianContext } from "@shared/guardianContext";
import { useMemo } from "react";

type TierCard = {
  name: string;
  image: string;
  border: string;
  accent: string;
  oneLiner: string;
  nextStep: string;
};

const TIER_CARDS: TierCard[] = [
  {
    name: "Tofu Skull",
    image: "/level1_tofu_skull_qr_final.png",
    border: "border-red-500/50",
    accent: "text-red-300",
    oneLiner: "Your OpSec runs on vibes.",
    nextStep: "Start with the basics and remove your biggest exposure first.",
  },
  {
    name: "Plastic Helmet",
    image: "/level2_plastic_helmet_qr_final.png",
    border: "border-yellow-500/50",
    accent: "text-yellow-300",
    oneLiner: "Your OpSec has a return policy.",
    nextStep: "Find the weakest link in your setup and fix it first.",
  },
  {
    name: "Titanium Skull",
    image: "/level3_titanium_skull_qr_final.png",
    border: "border-emerald-500/50",
    accent: "text-emerald-300",
    oneLiner: "Hard to fool. Still human.",
    nextStep: "Keep reviewing your access, exposure, and recovery plan.",
  },
];

function getTier(score: number) {
  if (score <= 2) return 0;
  if (score <= 4) return 1;
  return 2;
}

function shareOnX(score: number, total: number, tier: TierCard) {
  const text = `I got a ${tier.name}. ${score}/${total}. ${tier.oneLiner}\n\nWhat's your Skull Check level? Take the test and share your class.\n\n$5WA — Proof of Build. Proof of Helmet.`;
  const slug = tier.name.toLowerCase().replaceAll(" ", "-");
  const url = `https://5wa.io/share/${encodeURIComponent(slug)}.html?score=${score}&v=5`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
}

export default function DefenseHub() {
  usePageMeta({ title: "$5WA Defense Hub | Skull Check & Wrenchy AI", description: "Interactive physical security tools for crypto holders.", url: "https://5wa.io/defense-hub" });
  const [tab, setTab] = useState<"skull" | "wrenchy" | "helmet">(() => {
    const tabParam = new URLSearchParams(window.location.search).get("tab");
    return tabParam === "wrenchy" || tabParam === "helmet" ? tabParam : "skull";
  });
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100">
      <Navigation />
      <main className="container max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Defense Hub</p>
          <h1 className="mt-3 text-5xl font-black">Harden your skull.</h1>
          <p className="mt-4 text-slate-400">One place for the Skull Check, Wrenchy AI, and practical Helmet Toolkit.</p>
        </div>
        <div className="mt-9 flex flex-wrap gap-2">
          {([["skull", "Skull Check"], ["wrenchy", "Wrenchy AI"], ["helmet", "Helmet Toolkit"]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`rounded-xl px-4 py-3 text-sm font-bold ${tab === key ? "bg-cyan-300 text-black" : "border border-white/10 bg-white/5 text-slate-300"}`}>{label}</button>
          ))}
        </div>
        <div className="mt-6">
          {tab === "skull" && <SkullCheck />}
          {tab === "wrenchy" && <WrenchyAi />}
          {tab === "helmet" && <LocationOpsecGuide />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SkullCheck() {
  const holder = useSolanaHolder();
  const { setModalOpen } = useWalletContext();
  const session = useMemo(() => buildQuizSession(), []);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const score = session.filter((q) => answers[q.id] === q.correctDisplayLabel).length;
  const question = session[index];

  if (done) {
    const tierIdx = getTier(score);
    const card = TIER_CARDS[tierIdx];
    return (
      <div className="space-y-5">
        <HolderStamp holder={holder} />
        <div className="overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#07101d] shadow-[0_0_40px_rgba(0,217,245,0.08)]">
          <div className="border-b border-white/10 px-5 py-4 md:px-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">$5WA Security Institute</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Proof of Helmet · Skull Check</p>
          </div>
          <div className="grid gap-6 p-5 md:grid-cols-[minmax(260px,0.9fr)_1.1fr] md:items-center md:p-8">
            <img src={card.image} alt={card.name} className={`mx-auto max-h-[520px] w-full max-w-[360px] border-b-4 ${card.border} object-contain`} />
            <div className="text-center md:text-left">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Your helmet class</p>
              <h2 className={`mt-2 text-4xl font-black uppercase tracking-tight ${card.accent}`}>{card.name}</h2>
              <div className="mt-5 flex items-end justify-center gap-2 md:justify-start">
                <span className="text-7xl font-black leading-none text-white">{score}</span>
                <span className="pb-1 text-2xl font-bold text-slate-500">/ {session.length}</span>
              </div>
              <div className="mt-4 flex justify-center gap-2 md:justify-start" aria-label={`${score} of ${session.length} correct`}>
                {session.map((question, questionIndex) => <span key={question.id} className={`h-2.5 flex-1 rounded-full ${questionIndex < score ? "bg-yellow-300" : "bg-white/10"}`} />)}
              </div>
              <p className="mt-5 text-xl font-bold text-white">{card.oneLiner}</p>
              <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4 text-left">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Next defense move</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{card.nextStep}</p>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">A fast self-check, not a professional security audit. Physical security beats assumptions.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                <button onClick={() => shareOnX(score, session.length, card)} className="inline-flex items-center gap-2 rounded-xl bg-yellow-300 px-5 py-3 text-sm font-black text-black transition hover:bg-yellow-200">Share Your Result on X</button>
                <button onClick={() => { setAnswers({}); setIndex(0); setDone(false); }} className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-400/20">Retake Skull Check</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <HolderStamp holder={holder} />
      <div className="rounded-2xl border border-cyan-400/20 bg-[#07101d] p-6 md:p-8">
        <div className="flex justify-between text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
          <span>Question {index + 1} / {session.length}</span>
          <span>{score} correct</span>
        </div>
        <h2 className="mt-5 text-2xl font-black text-slate-100">{question.question}</h2>
        <div className="mt-6 grid gap-3">
          {question.options.map((option) => (
            <button key={option.displayLabel} onClick={() => {
              setAnswers((current) => ({ ...current, [question.id]: option.displayLabel }));
              if (index === session.length - 1) setDone(true);
              else setIndex((current) => current + 1);
            }} className="rounded-xl border border-white/10 bg-black/20 p-4 text-left text-sm text-slate-300 transition hover:border-cyan-400/50 hover:bg-cyan-400/5">
              <span className="font-bold text-cyan-300">{option.displayLabel}.</span> {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HolderStamp({ holder }: { holder: ReturnType<typeof useSolanaHolder> }) {
  const { setModalOpen } = useWalletContext();
  const statusColor = holder.status === "verified" ? "text-emerald-300 border-emerald-500/40 bg-emerald-500/10" : holder.status === "unverified" ? "text-yellow-300 border-yellow-500/40 bg-yellow-500/10" : "text-slate-400 border-white/10 bg-white/5";

  return (
    <div className={`rounded-xl border p-4 ${statusColor}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-bold">
          <ShieldCheck className="h-4 w-4" /> On-Chain Holder Stamp
        </div>
        {holder.status === "verified" && <span className="flex items-center gap-1 text-xs font-bold"><CheckCircle2 className="h-4 w-4" /> VERIFIED</span>}
      </div>
      {holder.status === "idle" || holder.status === "no-wallet" || holder.status === "no-ca" || holder.status === "error" ? (
        <div className="mt-3">
          <p className="text-xs text-slate-400">{holder.message || "Connect your Solana wallet to prove you hold $5WA on-chain. Zero gas — read-only RPC check."}</p>
          <button onClick={() => setModalOpen(true)} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-cyan-400/35 bg-cyan-400/10 px-4 py-2 text-xs font-bold text-cyan-100 hover:bg-cyan-400/20">
            <Wallet className="h-4 w-4" /> Connect Wallet
          </button>
        </div>
      ) : (
        <div className="mt-3 space-y-1 text-xs">
          {holder.status === "connecting" || holder.status === "checking" ? (
            <p className="flex items-center gap-2 text-slate-400"><Loader2 className="h-3 w-3 animate-spin" /> {holder.message}</p>
          ) : (
            <>
              <p className="text-slate-300">Wallet: <span className="font-mono">{holder.address?.slice(0, 8)}…{holder.address?.slice(-6)}</span></p>
              {holder.status === "verified" && <p className="text-emerald-300">Balance: {holder.balance.toLocaleString()} $5WA</p>}
              {holder.message && <p className="text-slate-400">{holder.message}</p>}
              <button onClick={holder.disconnect} className="mt-2 text-xs text-slate-500 hover:text-slate-300">Disconnect</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function WrenchyAi() {
  const initialContext = parseGuardianContext(window.location.search);
  const [regionId, setRegionId] = useState<OpsecRegionId>(initialContext.regionId);
  const [scenarioId, setScenarioId] = useState<OpsecScenarioId>(initialContext.scenarioId);
  const guide = getOpsecGuide(regionId, scenarioId, "en");

  return (
    <div className="space-y-6">
      {/* Single global context — shared by audit flow and AI */}
      <div className="rounded-2xl border border-cyan-400/20 bg-[#07101d] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">OpSec Context</p>
            <p className="mt-0.5 text-xs text-slate-500">Used by the audit flow and Wrenchy AI below.</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-bold text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
            {guide.region.label} · {guide.scenario.label}
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="space-y-1.5 text-xs font-medium text-slate-400">
            Region
            <select value={regionId} onChange={(e) => setRegionId(e.target.value as OpsecRegionId)} className="mt-1.5 block w-full rounded-lg border border-cyan-400/25 bg-[#050b14] px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400">
              {OPSEC_REGIONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>
          </label>
          <label className="space-y-1.5 text-xs font-medium text-slate-400">
            Activity
            <select value={scenarioId} onChange={(e) => setScenarioId(e.target.value as OpsecScenarioId)} className="mt-1.5 block w-full rounded-lg border border-cyan-400/25 bg-[#050b14] px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400">
              {OPSEC_SCENARIOS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
        </div>
      </div>

      {/* Context risk guidance — reads the shared context */}
      <OpsecAuditFlow regionId={regionId} scenarioId={scenarioId} />

      {/* Wrenchy AI — reads same context from props */}
      <GuardianAiPanel regionId={regionId} scenarioId={scenarioId} language="en" />
    </div>
  );
}

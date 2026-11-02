import { useState } from "react";
import logoSrc from "@/coinlogo.png";
import { Check, Clipboard, ExternalLink, ShieldCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { usePageMeta } from "@/hooks/usePageMeta";
import { FIVE_WA_MINT } from "@shared/solanaConfig";

const PUMP_FUN_URL = import.meta.env.VITE_PUMP_FUN_URL ?? "";

export default function Home() {
  usePageMeta({ title: "$5WA | Proof of Build Meme Token", description: "A fair-launch meme token backed by a real 3D threat museum and practical physical security tools.", url: "https://5wa.io" });
  const [copied, setCopied] = useState(false);
  const copyCa = async () => {
    if (!FIVE_WA_MINT) { toast.info("Official contract address will appear after the Pump.fun launch."); return; }
    await navigator.clipboard.writeText(FIVE_WA_MINT);
    setCopied(true);
    toast.success("Official CA copied");
    window.setTimeout(() => setCopied(false), 1800);
  };
  const CopyIcon = copied ? Check : Clipboard;
  return <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]"><Navigation /><main>
    <section className="relative overflow-hidden border-b border-cyan-400/10 px-4 py-20 md:py-28"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.2),transparent_48%)]" /><div className="container relative z-10 max-w-5xl"><div className="grid items-center gap-10 lg:grid-cols-[1.18fr_0.82fr]"><div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200"><ShieldCheck className="h-4 w-4" /> Proof of Build</div><h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:max-w-3xl lg:text-5xl">A $5 wrench beats a $500 hardware wallet.</h1><p className="mt-6 max-w-2xl text-xl font-semibold leading-relaxed text-cyan-200">Buy $5WA to insure your skull.</p><p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">Most meme coins have a JPEG. We have a 3D globe, physical threat intelligence, and tools that make the joke useful.</p><div className="mt-8 flex flex-wrap gap-3">{PUMP_FUN_URL ? <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-yellow)] px-5 py-3 text-sm font-black text-[var(--brand-black)]" style={{ backgroundColor: "#FFD700" }}><ExternalLink className="h-4 w-4" /> Buy on Pump.fun</a> : <button aria-disabled="true" onClick={() => toast.info("Pump.fun launch link will appear soon.")} className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-[var(--brand-yellow)] px-5 py-3 text-sm font-black text-[var(--brand-black)]" style={{ backgroundColor: "#FFD700", opacity: 1 }}><ExternalLink className="h-4 w-4" /> Buy on Pump.fun — link pending</button>}<button onClick={copyCa} className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-400/20"><CopyIcon className="h-4 w-4" /> {copied ? "Copied" : "Copy Official CA"}</button></div></div><div className="flex justify-center"><div className="hero-logo aspect-square w-full max-w-sm overflow-hidden rounded-full"><img src={logoSrc} alt="$5WA Logo" className="h-full w-full scale-[1.22] object-cover mix-blend-screen" /></div></div></div></div></section>
    <section className="container max-w-5xl px-4 py-10"><div className="rounded-2xl border border-[var(--brand-yellow)]/25 bg-[var(--brand-yellow)]/5 p-5 md:p-7"><p className="text-sm leading-relaxed text-yellow-100"><strong>The Pivot Story.</strong> We spent months building a serious B2B crypto security platform. Nobody cared. So we turned it into a 100% fair-launch meme token backed by actual Proof of Build.</p></div><div className="mt-6 grid gap-4 md:grid-cols-3"><Stat title="Supply" value="1,000,000,000 $5WA" /><Stat title="Circulation" value="100% fair launch" /><Stat title="Rules" value="0% Tax · No Mint" /></div></section>
    <section className="container max-w-5xl px-4 pb-16"><div className="rounded-2xl border border-[var(--brand-cyan)]/20 bg-[var(--bg-surface)] p-8 text-center"><p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Proof of Helmet</p><h2 className="mt-2 text-3xl font-black">How thick is your skull?</h2><p className="mt-3 text-slate-400">Take the Skull Check, get your defense tier, and share your result card on X.</p><a href="/defense-hub" className="mt-5 inline-block rounded-xl bg-cyan-300 px-5 py-3 text-sm font-black text-black">Take the Skull Check →</a></div></section>
  </main><Footer /></div>;
}
function Stat({ title, value }: { title: string; value: string }) { return <div className="rounded-xl border border-cyan-400/15 bg-[#07101d] p-5"><p className="text-xs uppercase tracking-[0.18em] text-slate-500">{title}</p><p className="mt-2 text-lg font-black text-cyan-100">{value}</p></div>; }

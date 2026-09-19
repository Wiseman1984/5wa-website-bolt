import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, BrainCircuit, MapPinned, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer";
import GuardianAiPanel from "@/components/GuardianAiPanel";
import Navigation from "@/components/Navigation";
import OpsecLanguageSwitch from "@/components/OpsecLanguageSwitch";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  getOpsecGuide,
  getOpsecRegions,
  getOpsecScenarios,
  type OpsecRegionId,
  type OpsecScenarioId,
} from "@shared/opsecGuide";
import { buildGuardianHref, parseGuardianContext } from "@shared/guardianContext";
import { getOpsecUiCopy } from "@shared/opsecUi";

export default function Guardian() {
  const { language } = useLanguage();
  const copy = getOpsecUiCopy(language).guardian;
  usePageMeta({
    title: copy.pageTitle,
    description: copy.pageDescription,
    url: "https://5wa.io/guardian",
  });

  const initialContext = useMemo(() => parseGuardianContext(window.location.search, language), []);
  const [regionId, setRegionId] = useState<OpsecRegionId>(initialContext.regionId);
  const [scenarioId, setScenarioId] = useState<OpsecScenarioId>(initialContext.scenarioId);
  const regions = useMemo(() => getOpsecRegions(language), [language]);
  const scenarios = useMemo(() => getOpsecScenarios(language), [language]);
  const guide = useMemo(() => getOpsecGuide(regionId, scenarioId, language), [regionId, scenarioId, language]);

  useEffect(() => {
    window.history.replaceState({}, "", buildGuardianHref(regionId, scenarioId, language));
  }, [regionId, scenarioId, language]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1">
        <section className="relative overflow-hidden py-12 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.14),transparent_42%)]" />
          <div className="container relative z-10 max-w-6xl">
            <a
              href={`/platform?lang=${language}#location-opsec-guide`}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-300"
            >
              <ArrowLeft className="h-4 w-4" /> {copy.backToGuide}
            </a>

            <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-green-300">
                  <BrainCircuit className="h-3.5 w-3.5" /> {copy.readOnlyBeta}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="max-w-4xl text-3xl font-bold text-slate-50 md:text-5xl">{copy.title}</h1>
                  <OpsecLanguageSwitch />
                </div>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-400 md:text-lg">
                  {copy.intro}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-[#07101d]/90 p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                  <ShieldCheck className="h-4 w-4" /> {copy.privacyBoundary}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {copy.privacyText}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 rounded-2xl border border-cyan-500/20 bg-[#07101d]/90 p-4 md:grid-cols-[1fr_1fr_1.15fr] md:p-6">
              <label className="space-y-2 text-sm font-medium text-slate-200">
                {copy.broadRegion}
                <select
                  value={regionId}
                  onChange={(event) => setRegionId(event.target.value as OpsecRegionId)}
                  className="w-full rounded-lg border border-cyan-500/25 bg-[#050b14] px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/15"
                >
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>{region.label}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-200">
                {copy.activity}
                <select
                  value={scenarioId}
                  onChange={(event) => setScenarioId(event.target.value as OpsecScenarioId)}
                  className="w-full rounded-lg border border-cyan-500/25 bg-[#050b14] px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/15"
                >
                  {scenarios.map((scenario) => (
                    <option key={scenario.id} value={scenario.id}>{scenario.label}</option>
                  ))}
                </select>
              </label>

              <div className="rounded-lg border border-slate-700/70 bg-black/20 px-4 py-3">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <MapPinned className="h-3.5 w-3.5" /> {copy.activeContext}
                </div>
                <div className="mt-1 text-sm font-bold text-slate-100">{guide.region.label} · {guide.scenario.label}</div>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{copy.activeContextDetail}</p>
              </div>
            </div>

            <GuardianAiPanel regionId={regionId} scenarioId={scenarioId} language={language} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

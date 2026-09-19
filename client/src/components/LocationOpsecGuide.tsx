import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  EyeOff,
  Flag,
  LockKeyhole,
  MapPinned,
  Route,
  ShieldAlert,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";
import {
  getOpsecGuide,
  getOpsecRegions,
  getOpsecScenarios,
  type OpsecRegionId,
  type OpsecRiskLevel,
  type OpsecScenarioId,
} from "@shared/opsecGuide";
import { buildGuardianHref } from "@shared/guardianContext";
import { getOpsecUiCopy } from "@shared/opsecUi";
import { useLanguage } from "@/contexts/LanguageContext";
import OpsecLanguageSwitch from "@/components/OpsecLanguageSwitch";

const RISK_STYLES: Record<OpsecRiskLevel, { color: string; border: string; bg: string }> = {
  guarded: { color: "text-cyan-300", border: "border-cyan-500/35", bg: "bg-cyan-500/10" },
  elevated: { color: "text-amber-300", border: "border-amber-500/35", bg: "bg-amber-500/10" },
  high: { color: "text-red-300", border: "border-red-500/35", bg: "bg-red-500/10" },
};

function ActionList({ items, accent = "cyan" }: { items: string[]; accent?: "cyan" | "amber" | "red" }) {
  const colors = {
    cyan: "text-cyan-400",
    amber: "text-amber-400",
    red: "text-red-400",
  };

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${colors[accent]}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export interface LocationOpsecGuideProps {
  onContextChange?: (context: { regionId: OpsecRegionId; scenarioId: OpsecScenarioId }) => void;
}

export default function LocationOpsecGuide({ onContextChange }: LocationOpsecGuideProps) {
  const { language } = useLanguage();
  const [regionId, setRegionId] = useState<OpsecRegionId>("global");
  const [scenarioId, setScenarioId] = useState<OpsecScenarioId>("daily-routine");
  const copy = getOpsecUiCopy(language).guide;
  const regions = useMemo(() => getOpsecRegions(language), [language]);
  const scenarios = useMemo(() => getOpsecScenarios(language), [language]);
  const guide = useMemo(() => getOpsecGuide(regionId, scenarioId, language), [regionId, scenarioId, language]);
  const risk = RISK_STYLES[guide.riskLevel];

  const updateRegion = (next: OpsecRegionId) => {
    setRegionId(next);
    onContextChange?.({ regionId: next, scenarioId });
  };

  const updateScenario = (next: OpsecScenarioId) => {
    setScenarioId(next);
    onContextChange?.({ regionId, scenarioId: next });
  };

  return (
    <section id="location-opsec-guide" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(6,182,212,0.12),transparent_38%)]" />
      <div className="container relative z-10 max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              <MapPinned className="h-3.5 w-3.5" />
              {copy.badge}
            </div>
            <OpsecLanguageSwitch />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{copy.title}</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.description}
          </p>
        </div>

        <div className="mb-6 grid gap-4 rounded-2xl border border-cyan-500/20 bg-[#07101d]/90 p-4 shadow-[0_0_40px_rgba(6,182,212,0.08)] backdrop-blur md:grid-cols-[1fr_1fr_auto] md:p-6">
          <label className="space-y-2 text-sm font-medium text-slate-200">
            {copy.broadRegion}
            <select
              value={regionId}
              onChange={(event) => updateRegion(event.target.value as OpsecRegionId)}
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
              onChange={(event) => updateScenario(event.target.value as OpsecScenarioId)}
              className="w-full rounded-lg border border-cyan-500/25 bg-[#050b14] px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/15"
            >
              {scenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>{scenario.label}</option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <div className={`w-full rounded-lg border px-4 py-3 md:min-w-36 ${risk.border} ${risk.bg}`}>
              <div className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{copy.riskPosture}</div>
              <div className={`mt-1 flex items-center gap-2 text-sm font-bold ${risk.color}`}>
                <ShieldAlert className="h-4 w-4" /> {copy.riskLabels[guide.riskLevel]}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-cyan-500/25 bg-[#07101d]/90 p-5 md:p-7">
            <div className="mb-5 flex flex-col gap-3 border-b border-cyan-500/15 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">{guide.region.label}</div>
                <h3 className="text-xl font-bold text-slate-50">{guide.scenario.label}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{guide.scenario.description}</p>
              </div>
              <LockKeyhole className="h-7 w-7 shrink-0 text-cyan-400/70" />
            </div>

            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-slate-100">
              <Flag className="h-4 w-4 text-cyan-400" /> {copy.priorityActions}
            </h4>
            <ActionList items={guide.priorities} />
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-[#0b101a]/90 p-5 md:p-7">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-slate-50">
              <Route className="h-5 w-5 text-amber-400" /> {copy.regionalAdjustment}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-slate-400">{guide.region.context}</p>
            <ActionList items={guide.region.adjustments} accent="amber" />

            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-red-300">
                <AlertTriangle className="h-4 w-4" /> {copy.abortEscalate}
              </div>
              <div className="flex flex-wrap gap-2">
                {guide.redFlags.map((flag) => (
                  <span key={flag} className="rounded-full border border-red-500/20 bg-red-500/8 px-2.5 py-1 text-xs text-red-200/90">{flag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: copy.before, icon: EyeOff, items: guide.before, color: "text-cyan-400" },
            { title: copy.during, icon: ShieldAlert, items: guide.during, color: "text-amber-400" },
            { title: copy.after, icon: CheckCircle2, items: guide.after, color: "text-green-400" },
          ].map(({ title, icon: Icon, items, color }) => (
            <div key={title} className="rounded-xl border border-slate-700/60 bg-[#070d17]/85 p-5">
              <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-100">
                <Icon className={`h-4 w-4 ${color}`} /> {title}
              </h3>
              <ActionList items={items} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-700/60 bg-black/25 p-4 text-xs leading-relaxed text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span><strong className="text-slate-200">{copy.privacyLabel}</strong> {copy.privacyText}</span>
          <span><strong className="text-amber-300">{copy.immediateDangerLabel}</strong> {copy.immediateDangerText}</span>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#050b14]/95 shadow-[0_0_42px_rgba(6,182,212,0.09)]">
          <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
                <BrainCircuit className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-50">{copy.continueTitle}</h3>
                  <span className="rounded-full border border-green-500/25 bg-green-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-green-300">{copy.readOnlyBeta}</span>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
                  {copy.continuePrefix} <strong className="text-slate-200">{guide.region.label}</strong> {copy.continueMiddle} <strong className="text-slate-200">{guide.scenario.label}</strong> {copy.continueSuffix}
                </p>
              </div>
            </div>
            <a
              href={buildGuardianHref(regionId, scenarioId, language)}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-5 py-3 text-sm font-bold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/20 active:scale-[0.97]"
            >
              {copy.openGuardian} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

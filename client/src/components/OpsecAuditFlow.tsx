import { MapPin, ShieldCheck } from "lucide-react";
import {
  getOpsecGuide,
  type OpsecRegionId,
  type OpsecScenarioId,
  type OpsecRiskLevel,
} from "@shared/opsecGuide";

type OpsecAuditFlowProps = {
  regionId: OpsecRegionId;
  scenarioId: OpsecScenarioId;
};

const riskStyles: Record<OpsecRiskLevel, { color: string; label: string }> = {
  guarded: { color: "text-emerald-300 border-emerald-500/40 bg-emerald-500/10", label: "Guarded" },
  elevated: { color: "text-yellow-300 border-yellow-500/40 bg-yellow-500/10", label: "Elevated" },
  high: { color: "text-red-300 border-red-500/40 bg-red-500/10", label: "High" },
};

export default function OpsecAuditFlow({ regionId, scenarioId }: OpsecAuditFlowProps) {
  const guide = getOpsecGuide(regionId, scenarioId, "en");
  const risk = riskStyles[guide.riskLevel];

  return (
    <section className="rounded-2xl border border-cyan-400/20 bg-[#07101d] p-6 md:p-8">
      <div className="flex items-center gap-2 text-cyan-300">
        <MapPin className="h-5 w-5" />
        <h2 className="text-lg font-black">Travel & Location Risk</h2>
      </div>
      <p className="mt-2 text-sm text-slate-400">
        Context-specific risk guidance based on your selected region and activity.
      </p>
      <div className={`mt-5 rounded-xl border p-4 ${risk.color}`}>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
          <MapPin className="h-4 w-4" />
          {guide.region.label} · {guide.scenario.label}
        </div>
        <p className="mt-2 text-sm text-slate-300">{guide.scenario.description}</p>
        <p className="mt-2 text-xs text-slate-400">
          Risk level: <span className="font-bold">{risk.label}</span>
        </p>
      </div>
      {guide.priorities.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
            Top priorities for this context
          </p>
          <ul className="space-y-1">
            {guide.priorities.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2 text-xs text-slate-400">
                <span className="text-cyan-300">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
        <p className="text-xs leading-relaxed text-slate-400">
          Skull Check is the Defense Hub's single quiz and scoring flow. This panel stays focused on travel context, while Wrenchy AI explains the guidance and answers follow-up questions.
        </p>
      </div>
    </section>
  );
}

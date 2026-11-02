import { useEffect, useState } from "react";
import { AlertTriangle, Clock3, ExternalLink, ShieldAlert } from "lucide-react";
import { supabase } from "@/lib/supabase";

type AdvisoryRecord = {
  source_id: string;
  source_name: string;
  source_url: string;
  destination_country: string;
  original_level: string;
  original_title: string;
  original_summary: string | null;
  published_at: string | null;
  source_updated_at: string | null;
  fetched_at: string;
  applicability: string;
  data_status: "normal" | "stale" | "incomplete";
  advisory_url: string;
};

type SyncRun = {
  status: "success" | "partial" | "failed";
  completed_at: string | null;
  error_message: string | null;
};

type OfficialTravelAdvisoryProps = {
  country: string | null;
};

function formatDate(value: string | null): string {
  if (!value) return "Not provided by source";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function OfficialTravelAdvisory({ country }: OfficialTravelAdvisoryProps) {
  const [advisory, setAdvisory] = useState<AdvisoryRecord | null>(null);
  const [syncRun, setSyncRun] = useState<SyncRun | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "unavailable">("idle");

  useEffect(() => {
    let cancelled = false;

    if (!country) {
      setAdvisory(null);
      setSyncRun(null);
      setStatus("idle");
      return () => {
        cancelled = true;
      };
    }

    setStatus("loading");
    void Promise.all([
      supabase
        .from("official_travel_advisories")
        .select("source_id, source_name, source_url, destination_country, original_level, original_title, original_summary, published_at, source_updated_at, fetched_at, applicability, data_status, advisory_url")
        .eq("source_id", "us-state-department")
        .eq("destination_country", country)
        .order("published_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("advisory_sync_runs")
        .select("status, completed_at, error_message")
        .eq("source_id", "us-state-department")
        .order("started_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]).then(([advisoryResult, syncResult]) => {
      if (cancelled) return;
      const advisoryData = advisoryResult.data as AdvisoryRecord | null;
      const syncData = syncResult.data as SyncRun | null;
      setAdvisory(advisoryData);
      setSyncRun(syncData);
      setStatus(advisoryData || syncData ? "ready" : "unavailable");
    }).catch(() => {
      if (cancelled) return;
      setAdvisory(null);
      setSyncRun(null);
      setStatus("unavailable");
    });

    return () => {
      cancelled = true;
    };
  }, [country]);

  const unavailable = status === "unavailable" || Boolean(syncRun?.status === "failed");
  const stale = advisory?.data_status === "stale" || syncRun?.status === "failed";

  return (
    <section className="rounded-2xl border border-slate-700/70 bg-[#050b14]/95 p-5 shadow-[0_0_36px_rgba(6,182,212,0.05)] md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-300">
            <ShieldAlert className="h-5 w-5" />
            <h3 className="text-lg font-bold text-slate-50">Official Travel Advisory</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Government-issued guidance. Advisory levels and applicability vary by issuing authority. Shown separately from the Helmet Toolkit's situational risk assessment.
          </p>
        </div>
        <span className="rounded-full border border-slate-600/70 bg-slate-900/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
          Country-level source
        </span>
      </div>

      {!country && <p className="mt-5 rounded-xl border border-slate-700 bg-black/20 p-4 text-sm text-slate-400">Select a country to check available official guidance.</p>}
      {country && status === "loading" && <p className="mt-5 rounded-xl border border-slate-700 bg-black/20 p-4 text-sm text-slate-400">Checking the latest official advisory...</p>}
      {country && status !== "loading" && unavailable && (
        <div className="mt-5 rounded-xl border border-red-500/25 bg-red-500/5 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-red-300"><AlertTriangle className="h-4 w-4" /> Latest official guidance cannot be confirmed</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">No safe low-risk assumption is made. Check the official source directly before travelling.</p>
          <a href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-cyan-200">Open U.S. Department of State advisories <ExternalLink className="h-3.5 w-3.5" /></a>
        </div>
      )}
      {country && status !== "loading" && !unavailable && !advisory && (
        <div className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300"><AlertTriangle className="h-4 w-4" /> No official advisory available for {country}</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">This does not mean the destination is low risk. The current advisory source may not cover this country — check official channels directly before travelling.</p>
        </div>
      )}
      {country && status !== "loading" && !unavailable && advisory && (
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">{advisory.destination_country}</span>
              {stale && <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-300">Data may be stale</span>}
            </div>
            <h4 className="mt-2 text-xl font-black text-slate-50">{advisory.original_level}</h4>
            {advisory.original_summary && <p className="mt-2 text-sm leading-relaxed text-slate-300">{advisory.original_summary}</p>}
            <p className="mt-3 text-xs leading-relaxed text-slate-500">Applies to: {advisory.applicability}. This source provides country-level guidance for {advisory.destination_country}. No city-specific advisory is available from this source.</p>
          </div>
          <div className="space-y-2 rounded-xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400 lg:min-w-64">
            <p className="font-bold text-slate-200">{advisory.source_name}</p>
            <p className="flex items-center gap-2"><Clock3 className="h-3.5 w-3.5 text-cyan-300" /> Published: {formatDate(advisory.source_updated_at)}</p>
            <p>Last checked: {formatDate(advisory.fetched_at)}</p>
            <a href={advisory.advisory_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-cyan-300 hover:text-cyan-200">View official advisory <ExternalLink className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      )}
    </section>
  );
}

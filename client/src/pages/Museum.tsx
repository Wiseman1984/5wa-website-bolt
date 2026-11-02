import { useCallback, useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThreatGlobe from "@/components/ThreatGlobe";
import ThreatDashboard, { type ThreatIncident } from "@/components/ThreatDashboard";
import TimelineSlider from "@/components/TimelineSlider";
import { supabase } from "@/lib/supabase";
import { filterPhysicalSecurityIncidents } from "@shared/threatRelevance";
import { usePageMeta } from "@/hooks/usePageMeta";

const INCIDENT_PAGE_SIZE = 1000;

async function fetchAllIncidents(): Promise<ThreatIncident[]> {
  const allIncidents: ThreatIncident[] = [];
  let pageStart = 0;

  while (true) {
    const { data, error } = await supabase
      .from("threat_incidents")
      .select("id, country, published_at, attack_type, title, source_url, latitude, longitude, severity, ai_summary")
      .neq("country", "Unknown")
      .order("published_at", { ascending: false })
      .range(pageStart, pageStart + INCIDENT_PAGE_SIZE - 1);

    if (error) {
      throw error;
    }

    const page = (data ?? []) as ThreatIncident[];
    allIncidents.push(...page);

    if (page.length < INCIDENT_PAGE_SIZE) {
      return allIncidents;
    }

    pageStart += INCIDENT_PAGE_SIZE;
  }
}

export default function Museum() {
  usePageMeta({ title: "$5WA Museum | Physical Threat Globe", description: "A live museum of physical security incidents targeting crypto holders.", url: "https://5wa.io/museum" });
  const [incidents, setIncidents] = useState<ThreatIncident[]>([]);
  const [timelineIncidents, setTimelineIncidents] = useState<ThreatIncident[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<ThreatIncident[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void fetchAllIncidents()
      .then((data) => {
        if (cancelled) return;

        const nextIncidents = filterPhysicalSecurityIncidents(data);
        setIncidents(nextIncidents);
        setTimelineIncidents(nextIncidents);
        setFilteredIncidents(nextIncidents);
      })
      .catch((error: unknown) => {
        console.error("Failed to load museum incidents", error);
        if (!cancelled) setLoadError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleTimeFilter = useCallback((nextIncidents: ThreatIncident[]) => {
    setTimelineIncidents(nextIncidents);
    setFilteredIncidents(nextIncidents);
  }, []);

  const handleFilterChange = useCallback((nextIncidents: ThreatIncident[]) => {
    setFilteredIncidents(nextIncidents);
  }, []);

  const zones = useMemo(() => new Set(filteredIncidents.map((incident) => incident.country)).size, [filteredIncidents]);
  const recentThreats = useMemo(() => filteredIncidents.filter((incident) => new Date(incident.published_at).getTime() > Date.now() - 30 * 86400000).length, [filteredIncidents]);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navigation />
      <main className="container max-w-7xl px-4 py-10 md:py-14">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--brand-cyan)]">Proof of Build</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">The Wrench Attack Museum</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">A living archive of physical threats. Default view is 3D; switch to the flat map inside the globe controls.</p>
          </div>
          <button onClick={() => setShowDrawer((value) => !value)} className="rounded-xl border border-[var(--brand-cyan)]/35 bg-[var(--brand-cyan)]/10 px-4 py-3 text-sm font-bold text-[var(--brand-cyan)] transition hover:bg-[var(--brand-cyan)]/20">
            {showDrawer ? "Hide incidents" : `Recent incidents (${filteredIncidents.length})`}
          </button>
        </div>

        {loadError && (
          <div className="mb-5 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            Incidents could not be loaded right now. Please try again later.
          </div>
        )}

        <div className="mb-5 grid gap-3 md:grid-cols-3">
          <Metric label="Total Incidents" value={filteredIncidents.length} />
          <Metric label="Recent Threat Index" value={recentThreats} />
          <Metric label="Active Threat Zones" value={zones} />
        </div>

        <TimelineSlider incidents={incidents} onTimeFilter={handleTimeFilter} />
        <ThreatGlobe incidents={filteredIncidents} />
        <div className="mt-4">
          <ThreatDashboard incidents={timelineIncidents} filteredIncidents={filteredIncidents} onFilterChange={handleFilterChange} />
        </div>

        {showDrawer && (
          <aside className="mt-5 max-h-96 overflow-auto rounded-2xl border border-[var(--brand-cyan)]/20 bg-[var(--bg-surface)] p-5">
            <div className="space-y-3">
              {filteredIncidents.slice(0, 20).map((incident) => (
                <div key={incident.id} className="border-b border-white/5 pb-3">
                  <div className="flex justify-between gap-3"><strong className="text-sm text-[var(--text-primary)]">{incident.title}</strong><span className="text-[10px] font-bold text-[var(--brand-cyan)]">SIMULATED</span></div>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{incident.country} · {new Date(incident.published_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </aside>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl border border-[var(--brand-cyan)]/20 bg-[var(--bg-surface)] p-4"><p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{label}</p><p className="mt-2 text-2xl font-black text-[var(--brand-cyan)]">{value}</p></div>;
}

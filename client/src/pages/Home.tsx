import { useEffect, useState, useCallback } from "react";
import { AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThreatGlobe from "@/components/ThreatGlobe";
import ThreatDashboard, { type ThreatIncident } from "@/components/ThreatDashboard";
import { ENGLISH_CONTENT } from "@shared/i18n";
import { usePageMeta } from "@/hooks/usePageMeta";
import { supabase } from "@/lib/supabase";
import { filterPhysicalSecurityIncidents } from "@shared/threatRelevance";

export default function Home() {
  const { hero } = ENGLISH_CONTENT.homepage;
  usePageMeta({
    title: "$5 Wrench Attack | Decentralized AI-Powered Physical Security",
    description: "Protecting the final mile of Web3. AI-powered physical security for crypto holders.",
    url: "https://5wa.io",
  });

  const [incidents, setIncidents] = useState<ThreatIncident[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<ThreatIncident[]>([]);
  const [stats, setStats] = useState({ total: 0, last30: 0, regions: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const PAGE_SIZE = 1000;
        let allData: ThreatIncident[] = [];
        let from = 0;

        while (true) {
          const { data, error } = await supabase
            .from("threat_incidents")
            .select("id, country, published_at, attack_type, title, source_url, latitude, longitude, severity, ai_summary")
            .neq("country", "Unknown")
            .order("published_at", { ascending: false })
            .range(from, from + PAGE_SIZE - 1);

          if (error) {
            console.error("Supabase error:", error);
            return;
          }
          if (!data || data.length === 0) break;

          allData = allData.concat(data);

          if (data.length < PAGE_SIZE) break;
          from += PAGE_SIZE;
        }

        const relevantIncidents = filterPhysicalSecurityIncidents(allData);
        setIncidents(relevantIncidents);
        setFilteredIncidents(relevantIncidents);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const last30 = allData.filter(
          (d) => new Date(d.published_at) > thirtyDaysAgo
        ).length;
        const regions = new Set(allData.map((d) => d.country)).size;

        setStats({ total: allData.length, last30, regions });
      } catch (err) {
        console.error("Failed to fetch threat data:", err);
      }
    }
    fetchData();
  }, []);

  const handleFilterChange = useCallback((filtered: ThreatIncident[]) => {
    setFilteredIncidents(filtered);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 metal-gradient opacity-40"></div>
        <div className="absolute inset-0 scan-lines"></div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img
                src="/5wa-coinlogo.png"
                alt="5WA Token Logo"
                className="w-32 h-32 drop-shadow-lg rounded-full"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
              {hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-accent mb-6 font-semibold">
              {hero.subtitle}
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {hero.description}
            </p>
            <div className="flex justify-center">
              <a
                href="#threat-map"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById("threat-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="btn-primary inline-block"
              >
                View Threat Map
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Map Section */}
      <section id="threat-map" className="scroll-mt-20 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(0,255,255,0.1) 50px),
            repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(0,255,255,0.1) 50px)`,
        }}></div>

        <div className="container relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Global Threat Intelligence
            </h2>
            <p className="text-muted-foreground text-lg">
              Real-time tracking of physical security incidents targeting crypto holders worldwide
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card/80 border border-cyan-500/30 rounded-lg p-5 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-cyan-400 mb-1">{stats.total}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Total Tracked</div>
            </div>
            <div className="bg-card/80 border border-orange-500/30 rounded-lg p-5 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-orange-400 mb-1">{stats.last30}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Last 30 Days</div>
            </div>
            <div className="bg-card/80 border border-red-500/30 rounded-lg p-5 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold text-red-400 mb-1">{stats.regions}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Active Regions</div>
            </div>
          </div>

          {/* World Map */}
          <ThreatGlobe incidents={filteredIncidents} />

          {/* Dashboard: Filters + Trend Stats + Incident List + Detail Modal */}
          <ThreatDashboard
            incidents={incidents}
            filteredIncidents={filteredIncidents}
            onFilterChange={handleFilterChange}
          />

          {/* CTA */}
          <div className="text-center mt-8">
            <a
              href="https://x.com/5wa_io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent px-6 py-3 rounded-lg hover:bg-accent/20 transition-colors font-medium"
            >
              <AlertTriangle className="w-4 h-4" />
              Get Real-time Alerts → Follow @5wa_io
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

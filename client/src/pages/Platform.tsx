import { useState } from "react";
import { Radar, Brain, Shield, Zap, Lock, Users, Eye, FileText, MapPinned, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LocationOpsecGuide from "@/components/LocationOpsecGuide";
import { usePageMeta } from "@/hooks/usePageMeta";

type FeatureStatus = "live" | "in-dev" | "planned";

interface Feature {
  name: string;
  status: FeatureStatus;
  description: string;
  devlogUrl?: string;
  href?: string;
  linkLabel?: string;
  icon: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    name: "Threat Intelligence Engine",
    status: "live",
    description: "Automated collection and analysis of physical security incidents targeting crypto holders worldwide. Aggregates data from news sources, court records, and community reports.",
    devlogUrl: "https://x.com/5wa_io",
    icon: <Radar className="w-5 h-5" />,
  },
  {
    name: "AI Classification",
    status: "live",
    description: "LLM-powered Tier 2 intelligence using Llama 3.1 8B for automated severity scoring, AI-generated incident summaries, confidence scoring, and attack-type verification.",
    devlogUrl: "https://x.com/5wa_io",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    name: "Location OpSec Guide",
    status: "live",
    description: "A privacy-preserving physical-security planner for travel, OTC meetings, home routines, conferences, and daily exposure. Uses only broad region and scenario selections—never an address or live location.",
    icon: <MapPinned className="w-5 h-5" />,
    href: "#location-opsec-guide",
    linkLabel: "Open Location OpSec Guide",
  },
  {
    name: "Guardian AI",
    status: "live",
    description: "Read-only Groq-powered security assistant using GPT-OSS 20B, grounded in the Location OpSec Guide and bounded public threat intelligence. It does not connect wallets, store chats or precise location, or act on a user's behalf.",
    devlogUrl: "https://x.com/5wa_io",
    icon: <Brain className="w-5 h-5" />,
    href: "/guardian",
    linkLabel: "Open Guardian AI",
  },
  {
    name: "Threat Map Analytics",
    status: "live",
    description: "Live global threat map with AI severity grading, color-coded incident dots, city-level coordinates, and interactive zoom and pan controls.",
    devlogUrl: "https://x.com/5wa_io",
    icon: <Eye className="w-5 h-5" />,
  },
  {
    name: "Report-to-Earn",
    status: "planned",
    description: "Community-driven threat reporting system. Verified reports earn 5WA tokens through the Guardian Network's multi-source cross-verification protocol.",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    name: "Guardian Network",
    status: "planned",
    description: "Decentralized network of security nodes that verify, validate, and distribute threat intelligence. Staking mechanism ensures data integrity.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Privacy Score Checker",
    status: "planned",
    description: "Analyze your digital footprint across blockchain explorers, social media, and public records. Get a privacy score and actionable recommendations.",
    icon: <Lock className="w-5 h-5" />,
  },
];

const STATUS_STYLES: Record<FeatureStatus, { label: string; color: string; bg: string; border: string }> = {
  live: { label: "Live", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
  "in-dev": { label: "In Development", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  planned: { label: "Planned", color: "text-gray-400", bg: "bg-gray-500/10", border: "border-gray-500/30" },
};

export default function Platform() {
  usePageMeta({
    title: "$5WA Platform | Threat Intelligence & Location OpSec",
    description: "Live physical-security tools: public threat intelligence, deterministic Location OpSec guidance, and read-only Guardian AI.",
    url: "https://5wa.io/platform",
  });

  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      {/* Section 1: How It Works */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(0,255,255,0.1) 50px),
            repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(0,255,255,0.1) 50px)`,
        }}></div>

        <div className="container relative z-10">
          <div className="text-center mb-14">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
              <span className="block text-base font-medium text-cyan-400/70 mt-2">Experimental Platform</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A product-first workflow for turning public threat signals into practical preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Step 1: Detect */}
            <div className="relative bg-card/80 border border-cyan-500/30 rounded-xl p-8 text-center backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Radar className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Detect</h3>
              <p className="text-sm text-muted-foreground">
                Automated collection across public news, court records, and community sources for physical security threats
              </p>
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-cyan-500/50">
                <Zap className="w-6 h-6" />
              </div>
            </div>

            {/* Step 2: Analyze */}
            <div className="relative bg-card/80 border border-accent/30 rounded-xl p-8 text-center backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Brain className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Interpret</h3>
              <p className="text-sm text-muted-foreground">
                AI-assisted classification, severity scoring, and incident summaries make public threat data easier to assess
              </p>
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-cyan-500/50">
                <Zap className="w-6 h-6" />
              </div>
            </div>

            {/* Step 3: Prepare */}
            <div className="bg-card/80 border border-orange-500/30 rounded-xl p-8 text-center backdrop-blur-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center">
                <Shield className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Prepare</h3>
              <p className="text-sm text-muted-foreground">
                Build a deterministic OpSec checklist, then ask the read-only Guardian AI for bounded defensive guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Development Status */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Development Status
            </h2>
            <p className="text-muted-foreground text-lg">
              Building in public. Click any feature to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {FEATURES.map((feature) => {
              const style = STATUS_STYLES[feature.status];
              return (
                <button
                  key={feature.name}
                  onClick={() => setSelectedFeature(feature)}
                  className={`text-left p-5 rounded-lg border ${style.border} ${style.bg} hover:scale-[1.02] transition-all cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{feature.icon}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.color} ${style.bg} border ${style.border}`}>
                        {style.label}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">
                    {feature.name}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Feature Detail Modal */}
          {selectedFeature && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedFeature(null)}>
              <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">{selectedFeature.icon}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[selectedFeature.status].color} ${STATUS_STYLES[selectedFeature.status].bg} border ${STATUS_STYLES[selectedFeature.status].border}`}>
                      {STATUS_STYLES[selectedFeature.status].label}
                    </span>
                  </div>
                  <button onClick={() => setSelectedFeature(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{selectedFeature.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {selectedFeature.description}
                </p>
                {selectedFeature.devlogUrl && (
                  <a
                    href={selectedFeature.devlogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent text-sm hover:underline"
                  >
                    Read DevLog on X →
                  </a>
                )}
                {selectedFeature.href && (
                  <a
                    href={selectedFeature.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-cyan-300 text-sm font-semibold hover:text-cyan-200"
                  >
                    {selectedFeature.linkLabel ?? "Open feature"} →
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <LocationOpsecGuide />

      {/* Product-first CTA Section */}
      <section className="py-16 md:py-20 bg-card/20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Use the Experimental Platform</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Explore public threat intelligence or open the read-only Guardian AI workspace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#threat-map" className="btn-primary inline-block">View Threat Map</a>
            <a href="/guardian" className="btn-secondary inline-block">Open Guardian AI</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

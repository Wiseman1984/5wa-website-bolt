import { useState, useEffect } from "react";
import { Copy, Check, Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Whitepaper() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("whats-new");

  usePageMeta({
    title: "$5WA Whitepaper V6 | Decentralized AI-Powered Physical Security Platform",
    description: "Living Document V6 — Threat Intelligence Engine, Duress Protection roadmap, DePIN Physical Security Alliance, Dark Web/KYC Leak Monitoring, and B2B Service Burn tokenomics.",
    url: "https://5wa.io/whitepaper",
  });

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const sections = [
    { id: "whats-new", label: "What's New in V6" },
    { id: "why", label: "1. Why Physical Security?" },
    { id: "threat-model", label: "2. Threat Model" },
    { id: "architecture", label: "3. Product Architecture" },
    { id: "tokenomics", label: "4. Core Tokenomics" },
    { id: "roadmap", label: "5. Roadmap" },
    { id: "governance", label: "6. Governance" },
    { id: "business", label: "7. Business Model" },
    { id: "competitive", label: "8. Competitive Landscape" },
    { id: "technical", label: "9. Technical Deep Dive" },
    { id: "disclaimer", label: "10. Legal Disclaimer" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const downloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">
      <Navigation />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-6 inline-block px-4 py-2 rounded-lg border border-blue-500/30 bg-blue-500/5">
            <span className="text-sm font-semibold text-blue-400">Living Document — V6.0</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            $5WA Whitepaper
          </h1>
          <p className="text-xl text-slate-400 mb-6">Redefining Consensus: From Digital Encryption to Physical Resilience in the Age of AGI and Web3</p>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-8"></div>
          <button
            onClick={downloadPDF}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all text-white font-semibold shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>

        <div className="relative">
          {/* Sidebar TOC */}
          <div className="fixed left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
            <div className="ml-4 p-6 rounded-lg bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm max-w-xs">
              <h3 className="text-sm font-bold text-cyan-300 mb-4 uppercase tracking-wider">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                      activeSection === section.id
                        ? "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-cyan-300 border-l-2 border-cyan-500"
                        : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/30"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile TOC */}
          <div className="lg:hidden fixed bottom-8 right-8 z-20">
            <details className="group">
              <summary className="cursor-pointer p-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all list-none">
                Contents
              </summary>
              <div className="absolute bottom-full right-0 mb-2 p-4 rounded-lg bg-slate-800/95 border border-slate-700/50 backdrop-blur-sm w-64 max-h-96 overflow-y-auto">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        scrollToSection(section.id);
                        (document.querySelector("details") as HTMLDetailsElement)?.removeAttribute("open");
                      }}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                        activeSection === section.id
                          ? "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-cyan-300"
                          : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/30"
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </details>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 py-12 max-w-4xl">

            {/* What's New in V6 */}
            <section className="mb-16 scroll-mt-20" id="whats-new">
              <div className="mb-8 pb-8 border-b border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">What's New in V6</h2>
                <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    V6 introduces four strategic restructuring directions: Duress Protection Layer (decoy wallets, timelocks, Dead Man's Switch), Dark Web & KYC Leak Monitoring, DePIN Physical Security Alliance with licensed private security firms, and B2B Service Burn tokenomics. All four are roadmap items clearly marked as <span className="text-slate-400 font-semibold">planned</span> — the current live capabilities remain unchanged from V5.
                  </p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Threat Intelligence Engine (TIE) V1 is now live with automated daily collection pipeline</li>
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Interactive Threat Map is live with a 3D globe, Mapbox flat-map transition, severity grading, and city-level coordinates</li>
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Location OpSec Guide MVP is live with deterministic guidance for broad regions and common exposure scenarios</li>
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Read-only Guardian AI beta is live on a dedicated page using server-side Groq inference with GPT-OSS 20B</li>
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Community Airdrop System operational — Season 1 active with Elite Guardian easter egg</li>
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Personal Risk Assessment MVP is live with a 10-question local questionnaire, five-category scoring, visual risk report, and targeted recommendations</li>
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Security Guide is live with 5 categories covering identity protection, physical security, social media safety, threat response, and travel safety</li>
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Real-World Cases library is live with severity-graded incident cards and source links</li>
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Privacy Toolkit V1 is live with interactive checklists for identity de-sensitization, travel mode hardening, and wallet risk analysis</li>
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Threat Level Filtering is live on the threat map with severity-based filtering (High / Medium / Low)</li>
                    <li className="flex gap-2"><span className="text-green-400">✅</span>Multi-Sig Governance implemented via Gnosis Safe</li>
                    <li className="flex gap-2"><span className="text-cyan-400">→</span>Revised Roadmap uses phase-based structure without specific date bindings</li>
                    <li className="flex gap-2"><span className="text-cyan-400">→</span>Updated Technical Deep Dive aligns with actual TIE architecture</li>
                    <li className="flex gap-2"><span className="text-cyan-400">→</span>Removed all quarter/year-specific timelines in favor of phase designations</li>
                    <li className="flex gap-2"><span className="text-yellow-400">⏳</span><strong className="text-yellow-400">New in V6:</strong> Duress Protection Layer — decoy wallets, timelock contracts, and Dead Man's Switch (planned)</li>
                    <li className="flex gap-2"><span className="text-yellow-400">⏳</span><strong className="text-yellow-400">New in V6:</strong> Dark Web & KYC Leak Monitoring — proactive threat intelligence beyond public news (planned)</li>
                    <li className="flex gap-2"><span className="text-yellow-400">⏳</span><strong className="text-yellow-400">New in V6:</strong> DePIN Physical Security Alliance — licensed private security firm network for SOS dispatch (planned)</li>
                    <li className="flex gap-2"><span className="text-yellow-400">⏳</span><strong className="text-yellow-400">New in V6:</strong> B2B Service Burn tokenomics — enterprise security subscriptions funded by token buyback & burn (planned)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 1. Why Physical Security? */}
            <section className="mb-16 scroll-mt-20" id="why">
              <div className="mb-8 pb-8 border-b border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">1. Why Physical Security? The Unseen Threat in Web3</h2>
                <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <p className="text-slate-300 leading-relaxed mb-4">
                    In the rapidly evolving landscape of AGI and Web3, the lines between digital and physical assets are increasingly blurred. While blockchain technology offers unparalleled digital security, the human element remains the weakest link. Recent incidents—ranging from physical coercion (the infamous "$5 Wrench Attack") to sophisticated social engineering and supply chain compromises targeting crypto founders, developers, and high-net-worth individuals—underscore a critical, underserved need: physical security for Web3 participants.
                  </p>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    $5WA is not merely a token; it is a pioneering Decentralized AI-Powered Physical Security Platform designed to address this escalating threat. We aim to build a robust, community-driven defense network that extends beyond code, protecting the very individuals who are building and securing the future of Web3.
                  </p>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 mt-4">
                    <p className="text-cyan-300 font-semibold italic text-center">
                      "Token is the Incentive Layer. Product is the Value Layer."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Threat Model */}
            <section className="mb-16 scroll-mt-20" id="threat-model">
              <div className="mb-8 pb-8 border-b border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">2. The $5WA Threat Model: Understanding the Attack Vectors</h2>
                <p className="text-slate-300 mb-6">To effectively counter physical threats, we must first understand their diverse forms. The $5WA platform is built upon a comprehensive threat model:</p>
                <div className="space-y-4">
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <h4 className="font-bold text-cyan-300 mb-2">Asset Transparency (On-chain Doxxing)</h4>
                    <p className="text-slate-300 text-sm">Public blockchain ledgers, while transparent, can inadvertently expose high-value targets by linking on-chain activity to real-world identities. This transparency can be exploited by malicious actors to identify and target individuals.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <h4 className="font-bold text-cyan-300 mb-2">Social Engineering & Doxxing</h4>
                    <p className="text-slate-300 text-sm">Attackers leverage publicly available information (social media, open-source intelligence) to compromise personal identity, build trust, or manipulate individuals into revealing sensitive information or private keys.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <h4 className="font-bold text-cyan-300 mb-2">Physical Coercion ($5 Wrench Attack)</h4>
                    <p className="text-slate-300 text-sm">Direct physical threats or violence used to force individuals to surrender their digital assets, typically private keys or seed phrases. This is the most direct and brutal form of physical attack.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <h4 className="font-bold text-cyan-300 mb-2">Supply Chain Attacks</h4>
                    <p className="text-slate-300 text-sm">Manipulation or compromise of hardware (e.g., compromised devices, hardware wallets, or manufacturing processes) to create backdoors or vulnerabilities that can be exploited to gain access to digital assets.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <h4 className="font-bold text-cyan-300 mb-2">Travel & Geo-Location Risks</h4>
                    <p className="text-slate-300 text-sm">Individuals traveling, especially to high-risk regions, face increased exposure to physical threats, surveillance, and potential coercion based on their perceived crypto wealth.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-yellow-500/20">
                    <h4 className="font-bold text-cyan-300 mb-2">Dark Web & KYC Data Leaks <span className="text-xs font-normal text-yellow-400 ml-2">New in V6</span></h4>
                    <p className="text-slate-300 text-sm">Leaked KYC documents, identity records, and wallet-to-identity mappings traded on dark web marketplaces create a direct pipeline from digital data exposure to physical targeting. Attackers purchase this data to identify high-net-worth crypto holders, their home addresses, and family connections — turning a digital breach into a physical attack vector. This threat is currently underserved by existing security platforms.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Product Architecture */}
            <section className="mb-16 scroll-mt-20" id="architecture">
              <div className="mb-8 pb-8 border-b border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">3. Product Architecture: A Multi-Layered Defense System</h2>
                <p className="text-slate-300 mb-8">The live MVP combines public threat intelligence, deterministic Location OpSec guidance, and a read-only AI assistant. Automated alerts, emergency-response coordination, and the decentralized Guardian Network remain roadmap capabilities.</p>

                {/* 3.1 TIE */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.1 Threat Intelligence Engine (TIE)</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">LIVE ✅</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-green-500/20">
                    <p className="text-slate-300 leading-relaxed mb-4">
                      The TIE is the brain of the $5WA platform, continuously aggregating and analyzing data to identify potential threats. The current implementation is fully operational as an automated Node.js + TypeScript service, deployed via GitHub Actions with daily execution cycles.
                    </p>
                    <h4 className="text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wider">Current Implementation (Production)</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">Data Sources:</span>
                        <span className="text-slate-300 ml-2">8 RSS feeds (CoinDesk, The Block, Cointelegraph, Decrypt, Bitcoin Magazine, Crypto Briefing, Blockworks Research, Unchained Podcast), Google News, Reddit communities, and Lopp Physical Attacks historical database.</span>
                      </div>
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">Dual-Group Keyword Matching:</span>
                        <span className="text-slate-300 ml-2">Group A (physical attack terms) + Group B (crypto terms). Both must match to flag an incident, reducing false positives.</span>
                      </div>
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">3-Layer Deduplication:</span>
                        <span className="text-slate-300 ml-2">In-memory Jaccard similarity, URL-based dedup, and semantic dedup using embeddings.</span>
                      </div>
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">Geospatial Analysis:</span>
                        <span className="text-slate-300 ml-2">City-level geo-parsing with coordinate lookup across 200+ major cities worldwide.</span>
                      </div>
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">Attack Classification:</span>
                        <span className="text-slate-300 ml-2">Auto-classification into kidnapping, robbery, extortion, assault, home invasion, supply chain, social engineering, and other.</span>
                      </div>
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">AI Classification (Tier 2):</span>
                        <span className="text-slate-300 ml-2">Each incident is processed through Llama 3.1 8B for automated severity scoring (1-10 scale), AI-generated concise summaries, relevance confidence scoring (0-1), and intelligent attack/victim type verification. The system gracefully falls back to heuristic classification when the LLM is unavailable.</span>
                      </div>
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">Database:</span>
                        <span className="text-slate-300 ml-2">Supabase (PostgreSQL) backend with threat_incidents table, enabling real-time queries.</span>
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-cyan-300 mt-6 mb-3 uppercase tracking-wider">Planned Enhancements</h4>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-slate-500">◦</span>On-Chain Anomaly Detection — integration with BlockSec Phalcon</li>
                      <li className="flex gap-2"><span className="text-slate-500">◦</span>Predictive Personal Risk Score Generation — future AI-assisted individual risk profiles and adaptive recommendations</li>
                      <li className="flex gap-2"><span className="text-slate-500">◦</span>Graph Neural Networks for Relationship Mapping</li>
                      <li className="flex gap-2"><span className="text-yellow-400">◦</span><strong className="text-yellow-400">New in V6:</strong> Dark Web & KYC Leak Monitoring — integration with dark web intelligence providers and on-chain analytics (e.g., Chainalysis, Elliptic) to detect when user KYC data or wallet-to-identity mappings appear on dark web marketplaces, enabling proactive high-risk alerts without exposing raw leaked data</li>
                    </ul>
                  </div>
                </div>

                {/* 3.2 Threat Map */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.2 Interactive Threat Map</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">LIVE ✅</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-green-500/20">
                    <p className="text-slate-300 leading-relaxed mb-4">
                      Interactive geospatial visualization of physical security incidents affecting the Web3 community, live on 5wa.io.
                    </p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Default 3D globe with PCB-style land texture, auto-rotation, drag controls, and severity-colored incidents</li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Mapbox Dark v11 flat map with Mercator projection, detailed boundaries, coastlines, roads, and city labels</li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>City-level latitude/longitude positioning with responsive Globe-to-Flat-Map transition</li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Hover details include date, location, attack type, severity, source, and AI summary when available</li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Filters: 2024+ data only, excludes unlocatable records</li>
                    </ul>
                  </div>
                </div>

                {/* 3.3 Guardian AI */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.3 Read-Only Guardian AI</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">LIVE BETA ✅</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-green-500/20">
                    <p className="text-slate-300 leading-relaxed mb-3">A dedicated defensive guidance workspace using server-side Groq inference with GPT-OSS 20B:</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Grounded in the selected Location OpSec Guide region and scenario plus bounded public incident summaries</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Server-side inference only, with strict question/context limits and no model credentials exposed to the browser</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>No tools, wallet access, transfers, tracking, monitoring, third-party contact, or emergency dispatch</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Chat remains in local React state and is not persisted; exact locations and sensitive wallet data are blocked</li>
                    </ul>
                  </div>
                </div>

                {/* 3.4 Location OpSec Guide */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.4 Location OpSec Guide MVP</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">LIVE ✅</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-green-500/20">
                    <p className="text-slate-300 leading-relaxed mb-3">A deterministic planning layer for common physical-exposure contexts:</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Broad region selection only; no address, GPS coordinate, or live location is requested or stored</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Daily routine, travel, OTC / in-person trade, home and family, and conference scenarios</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Risk posture, priority actions, abort criteria, and before/during/after checklists</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Educational guidance with explicit emergency escalation and professional-advice boundaries</li>
                    </ul>
                  </div>
                </div>

                {/* 3.5 Personal Risk Assessment */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.5 Personal Risk Assessment</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">LIVE MVP ✅</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-green-500/20">
                    <p className="text-slate-300 leading-relaxed mb-3">A privacy-first self-assessment that helps users understand their personal physical-security exposure without collecting wallet addresses, exact locations, or identity data.</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-green-400">✓</span>10 questions covering asset exposure, social visibility, travel, storage security, and operational security</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Transparent local scoring with Low, Moderate, Elevated, High, and Critical risk levels</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Visual category breakdown and recommendations matched to the user’s highest-risk areas</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Answers are processed in the browser and are not stored or sent to a server</li>
                    </ul>
                  </div>
                </div>

                {/* 3.6 Privacy Toolkit */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.6 Privacy Toolkit</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">LIVE MVP ✅</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-green-500/20">
                    <p className="text-slate-300 leading-relaxed mb-3">Interactive checklists that help users reduce their physical and digital attack surface. All guidance runs locally in the browser with no data collection.</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Identity De-sensitization — minimize linkage between on-chain activity and real-world identity</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Travel Mode Hardening — secure devices and data during travel with a check-in protocol</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Wallet Risk Analysis — detect patterns indicating increased exposure with multi-sig and approval audit guidance</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Progress tracking with visual completion indicators per category</li>
                    </ul>
                  </div>
                </div>

                {/* 3.7 Security Guide */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.7 Security Guide</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">LIVE ✅</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-green-500/20">
                    <p className="text-slate-300 leading-relaxed mb-3">Comprehensive educational resource covering five core security domains:</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Identity Protection — separating real identity from crypto activity</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Physical Security — home, office, and personal safety practices</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Social Media Safety — reducing doxxing and wealth-signaling exposure</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Threat Response — step-by-step actions during and after an incident</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Travel Safety — region-specific precautions and device hygiene</li>
                    </ul>
                  </div>
                </div>

                {/* 3.8 Real-World Cases */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.8 Real-World Cases</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">LIVE ✅</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-green-500/20">
                    <p className="text-slate-300 leading-relaxed mb-3">Documented library of real physical-security incidents targeting the crypto community:</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Severity-graded case cards with source links and safety warnings</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Categorized by attack type: kidnapping, robbery, extortion, home invasion, and more</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Educational framing with explicit “do not attempt to replicate” warnings</li>
                    </ul>
                  </div>
                </div>

                {/* 3.7 Guardian Network — rewritten as DePIN Physical Security Alliance */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.7 DePIN Physical Security Alliance</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-slate-500/20 text-slate-400 border border-slate-500/30">PLANNED ⏳</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <p className="text-slate-300 leading-relaxed mb-3">A Decentralized Physical Infrastructure Network (DePIN) model linking licensed private security firms — not a self-organized militia. The platform serves as a matching layer; all physical security contracts are between the user and the licensed firm directly.</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-slate-500">◦</span>Partnerships with licensed private security companies (e.g., G4S, GardaWorld, or local licensed firms) for SOS emergency dispatch</li>
                      <li className="flex gap-2"><span className="text-slate-500">◦</span>Token holders or subscribers gain access to emergency response — when a duress signal or GPS anomaly is triggered, the system auto-dispatches the nearest licensed local team</li>
                      <li className="flex gap-2"><span className="text-slate-500">◦</span>VHNWI security suite — physical security audits, home hardening deployment, anti-stalking detection as real-world RWA services</li>
                      <li className="flex gap-2"><span className="text-slate-500">◦</span>Platform is a matching layer only — not the service provider. All security contracts are between the user and the licensed firm</li>
                    </ul>
                    <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/30">
                      <p className="text-red-300 text-xs font-semibold">
                        Services are subject to local laws and partner availability. The platform does not employ armed personnel and does not guarantee response outcomes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3.9 Duress Protection Layer — NEW in V6 */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.9 Duress Protection Layer</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">PLANNED — NEW IN V6 ⏳</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-yellow-500/20">
                    <p className="text-slate-300 leading-relaxed mb-3">Cryptographic protection that goes beyond text-based AI advice — directly addressing the core criticism that Guardian AI alone cannot save someone during a physical attack:</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-yellow-400">◦</span><strong className="text-cyan-300">Duress PIN & Decoy Wallet:</strong> Entering a duress password opens a decoy wallet with a small amount of real assets, buying time without revealing the primary vault</li>
                      <li className="flex gap-2"><span className="text-yellow-400">◦</span><strong className="text-cyan-300">On-Chain Timelock:</strong> Triggering duress mode activates a chain-enforced cooling period that prevents immediate withdrawal from the primary wallet, even if the private key is surrendered</li>
                      <li className="flex gap-2"><span className="text-yellow-400">◦</span><strong className="text-cyan-300">Dead Man's Switch:</strong> AI monitors on-chain and device activity. If the user is inactive beyond a configurable threshold, assets auto-transfer to a multi-sig social recovery contract — making real-time theft impossible</li>
                      <li className="flex gap-2"><span className="text-yellow-400">◦</span><strong className="text-cyan-300">Silent Alarm:</strong> Duress mode triggers a background alert to trusted contacts and, when available, the DePIN security partner network</li>
                    </ul>
                    <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/30">
                      <p className="text-red-300 text-xs font-semibold">
                        Duress Protection is a loss-reduction tool, not a safety guarantee. Users must independently assess their risk profile. The project is not liable for losses incurred during duress incidents.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3.7 Community Airdrop */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">3.7 Community Airdrop System</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">LIVE ✅</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-green-500/20">
                    <p className="text-slate-300 leading-relaxed mb-3">Gamified token distribution for security education. Season 1 active:</p>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Seasonal themes — S1: "Physical Security Basics" (ends Sep 30, 2026)</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>18-question pool, random 6 per session, 3 difficulty levels</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Elite Guardian Easter Egg — 1,500 $5WA bonus for perfect advanced combo</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Anti-Sybil: wallet verification + identity checks</li>
                      <li className="flex gap-2"><span className="text-green-400">✓</span>Supabase backend with Row Level Security (RLS)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Core Tokenomics */}
            <section className="mb-16 scroll-mt-20" id="tokenomics">
              <div className="mb-8 pb-8 border-b border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">4. Core Tokenomics: Fueling the Defense Ecosystem</h2>
                <p className="text-slate-300 mb-6">The $5WA token is the native utility and governance token powering the entire Web3 Physical Security Platform. Its design ensures long-term sustainability, incentivizes participation, and drives demand through a robust, closed-loop economic model.</p>

                {/* Token Parameters Table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Parameter</th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Token Name</td>
                        <td className="py-3 px-4 text-cyan-300 font-semibold">$5 Wrench Attack (5WA)</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Blockchain</td>
                        <td className="py-3 px-4 text-cyan-300 font-semibold">Binance Smart Chain (BSC)</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Final Total Supply</td>
                        <td className="py-3 px-4 text-cyan-300 font-semibold">1,000,000,000 (1 Billion) 5WA</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Initial Burn Mechanism</td>
                        <td className="py-3 px-4 text-cyan-300 font-semibold">87.5% of Genesis supply permanently destroyed</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Minting Function</td>
                        <td className="py-3 px-4 text-cyan-300 font-semibold">Disabled — no further tokens can ever be created</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 mb-8">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The $5WA token launched with a genesis supply of 8 billion tokens, of which 7 billion (87.5%) were immediately and permanently burned. The resulting final total supply is fixed at 1 billion tokens, with no further minting function ever enabled.
                  </p>
                </div>

                {/* 4.1 Distribution */}
                <h3 className="text-xl font-bold mb-4 text-cyan-300">4.1 Distribution Structure</h3>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Allocation</th>
                        <th className="text-right py-3 px-4 text-cyan-300 font-semibold">%</th>
                        <th className="text-right py-3 px-4 text-cyan-300 font-semibold">Amount</th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-4 px-4 font-semibold text-blue-300">Initial Circulation</td>
                        <td className="py-4 px-4 text-right text-cyan-400 font-semibold">5%</td>
                        <td className="py-4 px-4 text-right text-slate-300">50M 5WA</td>
                        <td className="py-4 px-4 text-slate-300">Liquidity launch, early community incentives</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-4 px-4 font-semibold text-blue-300">PinkLock Linear Unlock</td>
                        <td className="py-4 px-4 text-right text-cyan-400 font-semibold">75%</td>
                        <td className="py-4 px-4 text-right text-slate-300">750M 5WA</td>
                        <td className="py-4 px-4 text-slate-300">24-month daily linear unlock from Jan 1, 2027</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-4 px-4 font-semibold text-blue-300">Ecosystem Reserve</td>
                        <td className="py-4 px-4 text-right text-cyan-400 font-semibold">20%</td>
                        <td className="py-4 px-4 text-right text-slate-300">200M 5WA</td>
                        <td className="py-4 px-4 text-slate-300">Community incentives, ecosystem development</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      <strong className="text-cyan-300">Initial Circulation:</strong> 50 million tokens allocated for crowdfunding launch, initial market liquidity on DEXes, and early community incentives to bootstrap network effects.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      <strong className="text-cyan-300">PinkLock Linear Unlock:</strong> 750 million tokens locked on PinkLock. A 24-month daily linear unlock commences January 1, 2027, creating a predictable liquidity curve that prevents sudden supply shocks. During the interim period, no additional token releases occur beyond Initial Circulation, ensuring zero unexpected sell pressure.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <p className="text-slate-300 text-sm leading-relaxed mb-3">
                      <strong className="text-cyan-300">Ecosystem Development Reserve (200M):</strong>
                    </p>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Liquidity Provision Fund (10% / 100M) — DEX liquidity depth</li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Ecosystem Partner Incentives (5% / 50M) — strategic partners, security researchers</li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Core Dev & Security Audit (5% / 50M) — development, audits, research</li>
                    </ul>
                  </div>
                </div>

                {/* 4.2 Token Utility */}
                <h3 className="text-xl font-bold mb-4 text-cyan-300">4.2 Token Utility: Driving Demand and Value</h3>
                <div className="space-y-4 mb-8">
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <span className="text-cyan-300 font-semibold">Premium AI Security Tools Access</span>
                    <p className="text-slate-300 text-sm mt-1">The current Location OpSec Guide and read-only Guardian AI beta are public. Future premium tiers may add personalized risk scoring, advanced threat feeds, and configurable alerts after security and privacy review.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <span className="text-cyan-300 font-semibold">Guardian Network Rewards</span>
                    <p className="text-slate-300 text-sm mt-1">Node operators and active contributors (anonymous threat reporters, intelligence validators) earn $5WA tokens.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <span className="text-cyan-300 font-semibold">Platform Governance (DAO Voting)</span>
                    <p className="text-slate-300 text-sm mt-1">$5WA holders vote on protocol upgrades, treasury allocations, and strategic decisions.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                    <span className="text-cyan-300 font-bold text-lg">Crisis Response & Legal Defense Fund</span>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                      A portion of $5WA tokens contributes to a community-governed Crisis Response & Legal Defense Fund, providing tangible support for members who experience verified physical security incidents. Unlike traditional insurance models (which conflict with Web3's privacy-first principles and face prohibitive regulatory barriers), this fund specifically covers:
                    </p>
                    <ul className="space-y-2 text-slate-300 text-sm mt-3">
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Emergency physical relocation costs (security escorts, safe houses, emergency travel)</li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Professional crisis management and public relations support</li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Legal counsel fees for criminal prosecution and asset recovery proceedings</li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span>Post-incident psychological counseling services</li>
                    </ul>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                      All fund disbursements require verified third-party receipts, multi-signature approval from the governance committee, and community consensus validation.
                    </p>
                    <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/30">
                      <p className="text-red-300 text-xs font-semibold">
                        This structure intentionally does not reimburse stolen cryptocurrency, eliminating the moral hazard of self-staged incidents while providing meaningful, actionable support where victims need it most.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <span className="text-cyan-300 font-semibold">Reputation & Staking</span>
                    <p className="text-slate-300 text-sm mt-1">Staking $5WA enhances Guardian Reputation Score, unlocking higher service tiers.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <span className="text-cyan-300 font-semibold">Community Airdrop Rewards</span>
                    <p className="text-slate-300 text-sm mt-1">Users earn $5WA by completing educational quizzes, with bonus rewards for Elite Guardian status.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30">
                    <span className="text-yellow-300 font-bold text-lg">B2B Service Burn <span className="text-xs font-normal text-yellow-400 ml-2">New in V6</span></span>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                      Web3 teams and enterprises use $5WA to pay for team-wide physical security subscriptions (threat monitoring, OpSec audits, duress protection setup). A portion of received tokens is permanently burned via buyback & burn, linking token consumption directly to real-world security service revenue — not speculation.
                    </p>
                    <div className="mt-3 p-3 rounded bg-slate-700/30">
                      <p className="text-slate-400 text-xs">
                        Token burn is tied to service revenue, not marketed as a price-appreciation mechanism. No value guarantee is expressed or implied.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-yellow-500/20">
                    <span className="text-cyan-300 font-semibold">Staking for Security Insurance & Priority Dispatch <span className="text-xs font-normal text-yellow-400 ml-2">New in V6</span></span>
                    <p className="text-slate-300 text-sm mt-1">Staking $5WA unlocks crisis-response coverage (emergency relocation, legal fees, counseling — not stolen-asset reimbursement) and priority dispatch through DePIN security partners. Staking transforms $5WA from a speculative asset into a Web3 physical security access card.</p>
                  </div>
                </div>

                {/* 4.3 Transparency */}
                <h3 className="text-xl font-bold mb-4 text-cyan-300">4.3 Tokenomics Transparency & Vesting</h3>
                <div className="space-y-3 mb-6">
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <div className="text-sm text-slate-400 mb-1">Multi-Sig Governance</div>
                    <a href="https://bscscan.com/address/0xc3cbdfE9766D446B300e30144C73eb5c3Ab69c08" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-mono text-sm hover:underline break-all">0xc3cbdfE9766D446B300e30144C73eb5c3Ab69c08</a>
                    <p className="text-xs text-slate-500 mt-1">Controls core treasury, protocol upgrades, and critical operational decisions</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <div className="text-sm text-slate-400 mb-1">Airdrop Distribution</div>
                    <a href="https://bscscan.com/address/0x364c9e4dc858a7a08ea882298f4e3b1e40d7ad69" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-mono text-sm hover:underline break-all">0x364c9e4dc858a7a08ea882298f4e3b1e40d7ad69</a>
                    <p className="text-xs text-slate-500 mt-1">Manages distribution of community rewards and access credentials</p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <div className="text-sm text-slate-400 mb-1">Marketing & Bootstrap</div>
                    <a href="https://bscscan.com/address/0xea6f63cacb75febaadf00334a8a630acc8212f63" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-mono text-sm hover:underline break-all">0xea6f63cacb75febaadf00334a8a630acc8212f63</a>
                    <p className="text-xs text-slate-500 mt-1">Funds ecosystem growth, partnerships, and outreach initiatives</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">
                    All token operations require multi-signature approval via Gnosis Safe (current threshold: 2/2 with planned expansion).
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <strong className="text-cyan-300">Team & Advisor Vesting:</strong> All team and advisor tokens remain securely custodied within the Gnosis Safe 2/2 multi-signature wallet until a dedicated Vesting smart contract is formally deployed and audited. This ensures no team member has unilateral access to unvested tokens at any point.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Roadmap */}
            <section className="mb-16 scroll-mt-20" id="roadmap">
              <div className="mb-8 pb-8 border-b border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">5. Roadmap: Strategic Milestones</h2>
                <p className="text-slate-300 mb-6 text-sm">
                  This roadmap is intentionally phase-based rather than date-specific, allowing for flexibility in development timelines while maintaining clear strategic direction.
                </p>
                <div className="space-y-6">
                  {/* Phase 1 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/20">1</div>
                    </div>
                    <div className="flex-1 p-6 rounded-lg bg-slate-800/30 border border-green-500/30">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-cyan-300">Foundation & MVP</h3>
                        <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">CURRENT PHASE</span>
                      </div>
                      <ul className="space-y-2 text-slate-300 mt-4">
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Platform Launch (5wa.io) — React 19 + TypeScript + Tailwind 4</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Threat Intelligence Engine V1 — automated daily collection pipeline</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Interactive Threat Map — 3D globe, Mapbox flat map, severity grading, city-level positioning</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Community Airdrop System — Season 1 live with Elite Guardian</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Multi-Sig Governance — Gnosis Safe 2/2 implemented</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Brand & Community Foundation — X, LinkedIn, DevLog series</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>AI Classification Layer — Live: LLM-powered classification using Llama 3.1 8B for automated severity scoring (1-10), AI-generated incident summaries, confidence scoring, and enhanced attack type classification.</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Location OpSec Guide MVP — deterministic broad-region and scenario guidance without precise-location collection</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Read-Only Guardian AI Beta — Groq GPT-OSS 20B, bounded public threat context, no tools or chat persistence</li>
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Initial Liquidity & Crowdfunding — pending community milestones</li>
                      </ul>
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">2</div>
                    </div>
                    <div className="flex-1 p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <h3 className="text-xl font-bold text-cyan-300 mb-1">Intelligence & Automation</h3>
                      <p className="text-xs text-slate-500 mb-4">Short-Term</p>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>On-Chain Security API Integration (BlockSec Phalcon)</li>
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Multi-Channel Alert System (Telegram, Discord, Email)</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Threat Level Filtering — severity-based filtering (High / Medium / Low) live on the threat map</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Personalized alert preferences — user-defined watch regions, severity thresholds, and alert types stored locally in browser</li>
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Customizable alert thresholds — server-side notification triggers</li>
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Enhanced TIE with predictive capabilities</li>
                        <li className="flex gap-2"><span className="text-yellow-400">⏳</span><strong className="text-yellow-400">New in V6:</strong> Duress Mode MVP — decoy wallet, timelock contract, and Dead Man's Switch (pure software, no hardware partnership required)</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Guardian AI personalization — local preferences panel for watch regions, severity thresholds, and alert types</li>
                      </ul>
                    </div>
                  </div>

                  {/* Phase 3 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">3</div>
                    </div>
                    <div className="flex-1 p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <h3 className="text-xl font-bold text-cyan-300 mb-1">Expansion & Protection</h3>
                      <p className="text-xs text-slate-500 mb-4">Mid-Term</p>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Desktop Client (Tauri) — system tray with OS-native notifications</li>
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Mobile App (iOS/Android) — real-time alerts, GPS geofence warnings</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Privacy Toolkit V1 — interactive checklists for identity de-sensitization, travel mode hardening, and wallet risk analysis</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Personal Risk Assessment MVP — local questionnaire, transparent scoring, visual report, and targeted recommendations</li>
                        <li className="flex gap-2"><span className="text-green-400">✅</span>Advanced Geospatial Analytics — timeline replay slider and hotspot heatmap live on the threat map</li>
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Predictive threat models — forecasting and trend prediction</li>
                        <li className="flex gap-2"><span className="text-yellow-400">⏳</span><strong className="text-yellow-400">New in V6:</strong> Dark Web Intelligence Pilot — dark web & KYC leak monitoring integration with threat intelligence providers</li>
                        <li className="flex gap-2"><span className="text-yellow-400">⏳</span><strong className="text-yellow-400">New in V6:</strong> DePIN Security Partner Pilot — initial partnerships with licensed private security firms in key Web3 hubs (Dubai, Singapore, Bangkok)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Phase 4 */}
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">4</div>
                    </div>
                    <div className="flex-1 p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <h3 className="text-xl font-bold text-cyan-300 mb-1">Decentralized Ecosystem</h3>
                      <p className="text-xs text-slate-500 mb-4">Long-Term</p>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Guardian Network — decentralized threat validation nodes</li>
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Guardian Marketplace — security services, hardware, training</li>
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>DAO Governance — on-chain voting and community control</li>
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Crisis Response Network — geographic Guardian Ambassadors in key Web3 hubs (Dubai, Singapore, Bangkok, London, Miami), serving as the operational execution arm of the Crisis Response & Legal Defense Fund (Section 4.2)</li>
                        <li className="flex gap-2"><span className="text-slate-400">⏳</span>Advanced AI (GNN + LLM) — deep relationship mapping</li>
                        <li className="flex gap-2"><span className="text-yellow-400">⏳</span><strong className="text-yellow-400">New in V6:</strong> B2B Enterprise Subscriptions + Service Burn — enterprise security subscriptions funded by token buyback & burn</li>
                        <li className="flex gap-2"><span className="text-yellow-400">⏳</span><strong className="text-yellow-400">New in V6:</strong> Full DePIN Security Network — global licensed partner coverage with SOS dispatch and VHNWI security suite</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Governance */}
            <section className="mb-16 scroll-mt-20" id="governance">
              <div className="mb-8 pb-8 border-b border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">6. Governance & Transparency</h2>
                <p className="text-slate-300 mb-8">Trust in the $5WA ecosystem is built on verifiable transparency and decentralized governance.</p>

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">6.1 Multi-Sig Governance</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">LIVE ✅</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-green-500/20">
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-cyan-400">→</span><span><strong className="text-cyan-300">Wallet:</strong> 0xc3cbdfE9766D446B300e30144C73eb5c3Ab69c08</span></li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span><span><strong className="text-cyan-300">Threshold:</strong> 2/2 (two signatures required)</span></li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span><span><strong className="text-cyan-300">Controls:</strong> Core treasury, protocol upgrades, token transfers, critical operations</span></li>
                      <li className="flex gap-2"><span className="text-cyan-400">→</span><span><strong className="text-cyan-300">Expansion:</strong> Additional signatories as community grows</span></li>
                    </ul>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-cyan-300">6.2 Decentralized Autonomous Organization (DAO)</h3>
                    <span className="px-2 py-0.5 text-xs rounded bg-slate-500/20 text-slate-400 border border-slate-500/30">PLANNED</span>
                  </div>
                  <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <p className="text-slate-300 leading-relaxed mb-4 text-sm">
                      Progressive decentralization path — full DAO is a mid-to-long-term goal:
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">Proposal Mechanism:</span>
                        <span className="text-slate-300 text-sm ml-2">$5WA holders submit on-chain proposals for protocol changes, feature development, treasury allocation.</span>
                      </div>
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">Voting Process:</span>
                        <span className="text-slate-300 text-sm ml-2">Voting power proportional to staked tokens. Community-driven governance.</span>
                      </div>
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">Quorum & Execution:</span>
                        <span className="text-slate-300 text-sm ml-2">Predefined quorum (e.g., 10% of staked tokens). Auto-executed via smart contracts.</span>
                      </div>
                      <div className="p-3 rounded bg-slate-700/30">
                        <span className="text-cyan-300 font-semibold">Transparency Dashboard:</span>
                        <span className="text-slate-300 text-sm ml-2">Real-time visibility into governance proposals, voting results, and treasury movements.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Business Model */}
            <section className="mb-16 scroll-mt-20" id="business">
              <div className="mb-8 pb-8 border-b border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">7. Business Model: Sustainable Growth & Value Creation</h2>
                <p className="text-slate-300 mb-6 text-sm">Designed for sustainable growth. MVP focus is on establishing product-market fit and community engagement before introducing monetization features.</p>
                <div className="space-y-4">
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <h4 className="font-bold text-cyan-300 mb-2">Freemium Model</h4>
                    <p className="text-slate-300 text-sm">The public Threat Map, deterministic Location OpSec Guide, and read-only Guardian AI beta establish a free security-education baseline.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <h4 className="font-bold text-cyan-300 mb-2">Premium Subscriptions</h4>
                    <p className="text-slate-300 text-sm">Future paid tiers may include advanced threat feeds, configurable alerts, and privacy-reviewed personalization. These capabilities are not part of the current read-only beta.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <h4 className="font-bold text-cyan-300 mb-2">Guardian Marketplace Fees</h4>
                    <p className="text-slate-300 text-sm">Transaction fees (in $5WA) on the Guardian Marketplace facilitate security services, hardware, and training transactions.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/50">
                    <h4 className="font-bold text-cyan-300 mb-2">Future Revenue Streams</h4>
                    <p className="text-slate-300 text-sm">Enterprise Solutions, Insurance Partnerships, and Data Monetization (with strict privacy protections) for aggregated threat intelligence insights.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-yellow-500/20">
                    <h4 className="font-bold text-cyan-300 mb-2">B2B Enterprise Security Subscriptions <span className="text-xs font-normal text-yellow-400 ml-2">New in V6</span></h4>
                    <p className="text-slate-300 text-sm">Web3 teams and enterprises pay $5WA for team-wide physical security subscriptions — threat monitoring, OpSec audits, and duress protection deployment. A portion of received tokens is burned, creating a direct link between service revenue and token consumption.</p>
                  </div>
                  <div className="p-5 rounded-lg bg-slate-800/30 border border-yellow-500/20">
                    <h4 className="font-bold text-cyan-300 mb-2">DePIN Partner Dispatch Fees <span className="text-xs font-normal text-yellow-400 ml-2">New in V6</span></h4>
                    <p className="text-slate-300 text-sm">Transaction fees (in $5WA) on physical security services dispatched through the DePIN partner network — SOS response, security audits, and VHNWI concierge services. The platform earns a matching fee; service contracts are between the user and the licensed firm.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Competitive Landscape */}
            <section className="mb-16 scroll-mt-20" id="competitive">
              <div className="mb-8 pb-8 border-b border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">8. Competitive Landscape: Differentiating $5WA</h2>
                <p className="text-slate-300 mb-6 text-sm">$5WA operates at the unique intersection of Web3, AI, and physical security.</p>
                <p className="text-slate-500 mb-4 text-xs">Legend: <span className="text-green-400">✓ available</span> · <span className="text-slate-400">⏳ planned</span> · — not a core capability</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Feature / Capability</th>
                        <th className="text-center py-3 px-4 text-cyan-300 font-semibold">Chainalysis</th>
                        <th className="text-center py-3 px-4 text-cyan-300 font-semibold">CrowdStrike</th>
                        <th className="text-center py-3 px-4 text-cyan-300 font-semibold">Ledger</th>
                        <th className="text-center py-3 px-4 text-cyan-300 font-semibold">$5WA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">On-Chain Analytics</td>
                        <td className="py-3 px-4 text-center text-green-400">✓</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-400">⏳</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Cybersecurity Tools</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-green-400">✓</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-green-400">✓</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Hardware Wallet</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-green-400">✓</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300 font-semibold">Physical Risk Management</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-green-400 font-bold">✓</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300 font-semibold">AI-Powered Agent</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-green-400 font-bold">✓</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300 font-semibold">Privacy Toolkit</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-400 font-bold">⏳</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300 font-semibold">Decentralized Network</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-400 font-bold">⏳</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Real-Time Alerts</td>
                        <td className="py-3 px-4 text-center text-green-400">✓</td>
                        <td className="py-3 px-4 text-center text-green-400">✓</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-400">⏳</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300 font-semibold">Duress Protection (Decoy/Timelock)</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-yellow-400 font-bold">⏳</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300 font-semibold">Physical SOS Dispatch</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-slate-600">—</td>
                        <td className="py-3 px-4 text-center text-yellow-400 font-bold">⏳</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                  <p className="text-slate-400 text-sm italic">
                    <strong className="text-cyan-300">Note:</strong> We highly respect these industry giants—Chainalysis in digital forensics, CrowdStrike in enterprise cybersecurity, and Ledger in hardware storage. Their models inherently stop at the digital layer. $5WA does not seek to replace them, but rather to bridge the critical gap they leave unaddressed: the physical vulnerability of the Web3 human element. Our platform is designed to complement, not compete with, existing digital security infrastructure.
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Technical Deep Dive */}
            <section className="mb-16 scroll-mt-20" id="technical">
              <div className="mb-8 pb-8 border-b border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">9. Technical Deep Dive</h2>

                {/* 9.1 Privacy */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-cyan-300">9.1 Privacy-Preserving Mechanisms (Planned)</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <span className="text-cyan-300 font-semibold">Zero-Knowledge Proofs (ZKPs)</span>
                      <p className="text-slate-300 text-sm mt-1">Secure, anonymous credential management — verify identity attributes without revealing personal data.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <span className="text-cyan-300 font-semibold">Multi-Party Computation (MPC)</span>
                      <p className="text-slate-300 text-sm mt-1">Collaborative threat intelligence sharing without exposing individual data points.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <span className="text-cyan-300 font-semibold">Trusted Execution Environments (TEEs)</span>
                      <p className="text-slate-300 text-sm mt-1">Hardware-level security (e.g., Intel SGX) for sensitive computations like Personal Risk Score generation.</p>
                    </div>
                  </div>
                </div>

                {/* 9.2 Intelligence Evolution Tiers */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-cyan-300">9.2 AI-Powered Threat Intelligence Workflow</h3>
                  <p className="text-slate-300 text-sm mb-4">To maintain full transparency about current capabilities and future direction, we define a clear Intelligence Evolution Tier system:</p>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-600">
                          <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Tier</th>
                          <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Capability</th>
                          <th className="text-center py-3 px-4 text-cyan-300 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-slate-300 font-semibold">Tier 1</td>
                          <td className="py-3 px-4 text-slate-300">Rule-Based Validation — Keyword matching, Jaccard similarity deduplication, city-level geospatial analysis</td>
                          <td className="py-3 px-4 text-center"><span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">✅ LIVE</span></td>
                        </tr>
                        <tr className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-slate-300 font-semibold">Tier 2</td>
                          <td className="py-3 px-4 text-slate-300">Cognitive Semantic Layer — LLM-powered semantic classification, contextual threat analysis, automated severity scoring</td>
                          <td className="py-3 px-4 text-center"><span className="px-2 py-0.5 text-xs rounded bg-green-500/20 text-green-400 border border-green-500/30">✅ LIVE</span></td>
                        </tr>
                        <tr className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-slate-300 font-semibold">Tier 3</td>
                          <td className="py-3 px-4 text-slate-300">Predictive Network — GNN relationship mapping, predictive threat chain modeling, target identification</td>
                          <td className="py-3 px-4 text-center"><span className="px-2 py-0.5 text-xs rounded bg-slate-500/20 text-slate-400 border border-slate-500/30">⏳ PLANNED</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-slate-400 text-xs mb-6">This tiered approach ensures users understand exactly what they are accessing today: Tier 1 production-grade rule-based intelligence and Tier 2 LLM-powered semantic classification, while Tier 3 remains the long-term research direction.</p>

                  <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 mb-6">
                    <p className="text-slate-300 text-sm leading-relaxed"><strong className="text-cyan-300">Production model separation:</strong> the TIE classification pipeline currently uses Llama 3.1 8B for incident scoring and summaries. The separate read-only Guardian AI uses Groq-hosted GPT-OSS 20B for defensive user questions. The two paths have different roles and neither grants the model autonomous tools or wallet access.</p>
                  </div>

                  <h4 className="text-sm font-bold text-cyan-300 mb-3 uppercase tracking-wider">AI Workflow Loop</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400 text-xs font-bold px-2 py-0.5 rounded bg-green-500/20">LIVE</span>
                        <span className="text-cyan-300 font-semibold">Observe</span>
                      </div>
                      <p className="text-slate-400 text-xs">Ingest from 8 RSS feeds, Google News, Reddit, and historical databases.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400 text-xs font-bold px-2 py-0.5 rounded bg-green-500/20">LIVE</span>
                        <span className="text-cyan-300 font-semibold">Filter</span>
                      </div>
                      <p className="text-slate-400 text-xs">Dual-group keyword matching + 3-layer deduplication.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400 text-xs font-bold px-2 py-0.5 rounded bg-green-500/20">LIVE</span>
                        <span className="text-cyan-300 font-semibold">Classify</span>
                      </div>
                      <p className="text-slate-400 text-xs">Auto-classification by attack type + city-level geo-parsing.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400 text-xs font-bold px-2 py-0.5 rounded bg-green-500/20">LIVE</span>
                        <span className="text-cyan-300 font-semibold">Visualize</span>
                      </div>
                      <p className="text-slate-400 text-xs">Interactive Threat Map with city-level precision and zoom/pan.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400 text-xs font-bold px-2 py-0.5 rounded bg-green-500/20">LIVE</span>
                        <span className="text-cyan-300 font-semibold">Reason</span>
                      </div>
                      <p className="text-slate-400 text-xs">Tier 2 classification and the read-only Guardian AI provide bounded context interpretation and defensive guidance.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-400 text-xs font-bold px-2 py-0.5 rounded bg-slate-500/20">PLANNED</span>
                        <span className="text-cyan-300 font-semibold">Predict</span>
                      </div>
                      <p className="text-slate-400 text-xs">Predictive relationship modeling and target forecasting remain research-stage capabilities.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-400 text-xs font-bold px-2 py-0.5 rounded bg-slate-500/20">PLANNED</span>
                        <span className="text-cyan-300 font-semibold">Respond</span>
                      </div>
                      <p className="text-slate-400 text-xs">Automated alerts, emergency coordination, and Privacy Toolkit actions are not enabled in the read-only beta.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-400 text-xs font-bold px-2 py-0.5 rounded bg-slate-500/20">PLANNED</span>
                        <span className="text-cyan-300 font-semibold">Learn</span>
                      </div>
                      <p className="text-slate-400 text-xs">Future learning will require validated outcome data and explicit privacy controls; current chats are not stored or used for training.</p>
                    </div>
                  </div>
                </div>

                {/* 9.3 DePIN Guardian Network */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-cyan-300">9.3 DePIN Guardian Network (Planned)</h3>
                  <p className="text-slate-300 text-sm mb-4">A critical challenge in decentralized physical threat validation is that real-world incidents cannot be mathematically verified like on-chain transactions. The Guardian Network employs a <strong className="text-cyan-300">Reputation-Weighted Multi-Consensus</strong> mechanism:</p>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <span className="text-cyan-300 font-semibold">Phase 1 — Seed Validators</span>
                      <p className="text-slate-300 text-sm mt-1">Core team's multi-signature wallet serves as founding validation authority, ensuring early intelligence quality control and preventing spam/disinformation.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <span className="text-cyan-300 font-semibold">Phase 2 — Reputation Accrual</span>
                      <p className="text-slate-300 text-sm mt-1">Node operators build a <strong className="text-cyan-300">Report Accuracy Score</strong> based on historical verification rate. Nodes with {">"}90% confirmation rate receive elevated voting weight.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                      <span className="text-cyan-300 font-semibold">Phase 3 — Reputation-Weighted Voting</span>
                      <p className="text-slate-300 text-sm mt-2">Voting power = <code className="text-cyan-400 bg-slate-700/50 px-2 py-0.5 rounded">Reputation Weight (70%) + Stake Weight (30%)</code></p>
                      <p className="text-slate-400 text-xs mt-2">Ensures credibility and track record outweigh pure capital, preventing wealthy but unreliable actors from dominating consensus.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <span className="text-cyan-300 font-semibold">Anonymous Reporting</span>
                      <p className="text-slate-300 text-sm mt-1">Privacy-preserving threat reporting that protects reporter identity.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <span className="text-cyan-300 font-semibold">Edge Computing</span>
                      <p className="text-slate-300 text-sm mt-1">Guardian Nodes perform localized threat analysis, reducing latency and enhancing data sovereignty.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
                      <span className="text-cyan-300 font-semibold">Geographic Specialization</span>
                      <p className="text-slate-300 text-sm mt-1">Nodes specialize in specific regions, building deep local expertise for verification of region-specific threats.</p>
                    </div>
                  </div>
                </div>

                {/* 9.4 Duress Protection Architecture — NEW in V6 */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-cyan-300">9.4 Duress Protection Architecture (Planned) <span className="text-xs font-normal text-yellow-400 ml-2">New in V6</span></h3>
                  <p className="text-slate-300 text-sm mb-4">The Duress Protection Layer moves $5WA from text-based advice to cryptographic defense. The architecture is designed to be implementable in pure software — no hardware wallet partnership is required for the MVP:</p>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-yellow-500/20">
                      <span className="text-cyan-300 font-semibold">Decoy Wallet System</span>
                      <p className="text-slate-300 text-sm mt-1">A secondary wallet address holding a small fraction of real assets. Entering a duress PIN unlocks only this wallet, creating plausible compliance without exposing the primary vault. The attacker sees a real transaction and a real balance, reducing immediate threat.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-yellow-500/20">
                      <span className="text-cyan-300 font-semibold">On-Chain Timelock Contract</span>
                      <p className="text-slate-300 text-sm mt-1">A smart contract that, once duress mode is triggered, enforces a configurable cooling period (e.g., 24–72 hours) during which withdrawals from the primary wallet are blocked at the contract level. Even if the private key is surrendered, the attacker cannot extract funds until the timelock expires — buying critical time for recovery actions.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-yellow-500/20">
                      <span className="text-cyan-300 font-semibold">Dead Man's Switch</span>
                      <p className="text-slate-300 text-sm mt-1">AI monitors user on-chain signing activity and device check-ins. If the user exceeds a configurable inactivity threshold (e.g., 7 days), assets automatically transfer to a pre-configured multi-sig social recovery contract. This makes prolonged captivity or disappearance insufficient to access funds.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/30 border border-yellow-500/20">
                      <span className="text-cyan-300 font-semibold">ZKP-Based Anonymous Incident Reporting (PoP)</span>
                      <p className="text-slate-300 text-sm mt-1">Zero-knowledge proofs enable verified victims or security firms to submit incident characteristics on-chain without revealing real names or precise locations. Verified reports earn $5WA intelligence rewards, creating a privacy-preserving threat intelligence loop.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 10. Legal Disclaimer */}
            <section className="mb-16 scroll-mt-20" id="disclaimer">
              <div className="p-8 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <h2 className="text-3xl font-bold mb-6 text-blue-300">10. Legal Disclaimer</h2>
                <p className="text-slate-400 leading-relaxed mb-4">
                  The $5WA token is a functional utility and governance token, not a security investment product. The physical security advice, Location OpSec Guide, Guardian AI responses, security SOPs, and related educational content are for reference only and do not constitute legal advice, professional security advice, emergency response, or a guarantee. Guardian AI is read-only and cannot monitor users, contact third parties, dispatch help, or act on a user's behalf. Users must bear the risks of participating in the Web3 ecosystem and physical security protection themselves. The project party is not liable for losses caused by misinterpretation of information or external force majeure.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  This whitepaper does not constitute an offer or solicitation in any jurisdiction where such activities are prohibited. Participants are responsible for determining whether their participation complies with applicable laws and regulations.
                </p>
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <h3 className="text-lg font-bold text-blue-300 mb-4">V6 Additional Risk Disclosures</h3>
                  <ul className="space-y-3 text-slate-400 text-sm">
                    <li className="flex gap-2"><span className="text-yellow-400">•</span><strong className="text-slate-300">Dark Web Intelligence:</strong> Threat intelligence derived from dark web monitoring is probabilistic and not guaranteed to be accurate or complete. The platform displays risk levels and incident types only — raw leaked personal data is never shown to users. The platform is not liable for actions taken or not taken based on intelligence alerts.</li>
                    <li className="flex gap-2"><span className="text-yellow-400">•</span><strong className="text-slate-300">DePIN Security Services:</strong> Physical security services are provided by independent licensed firms, not by the $5WA platform. The platform serves solely as a matching layer. All service contracts are between the user and the licensed firm. The platform is not liable for service quality, response delays, or outcomes. Service availability varies by jurisdiction and local law.</li>
                    <li className="flex gap-2"><span className="text-yellow-400">•</span><strong className="text-slate-300">Duress Protection:</strong> Duress mode, decoy wallets, timelocks, and Dead Man's Switch are loss-reduction tools, not safety guarantees. Users must independently assess their risk profile and not rely solely on these mechanisms. The project is not liable for losses incurred during duress incidents, including cases where duress protection is bypassed, delayed, or fails to prevent asset loss.</li>
                    <li className="flex gap-2"><span className="text-yellow-400">•</span><strong className="text-slate-300">Token Burn & Service Revenue:</strong> The B2B service burn mechanism links token consumption to service revenue. It is not marketed as a price-appreciation mechanism. No token value increase is expressed, implied, or guaranteed. Token burn rates depend on actual enterprise adoption and service volume.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Appendix */}
            <section className="mb-16">
              <div className="p-8 rounded-lg bg-slate-800/30 border border-slate-700/50">
                <h2 className="text-2xl font-bold mb-6 text-blue-300">Appendix: Key Metrics & Milestones</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Metric</th>
                        <th className="text-left py-3 px-4 text-cyan-300 font-semibold">Current Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Platform Launch</td>
                        <td className="py-3 px-4 text-green-400">✅ Live (5wa.io)</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">TIE Data Sources</td>
                        <td className="py-3 px-4 text-green-400">✅ 8 RSS + Google News + Reddit + Historical DB</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Daily Incident Processing</td>
                        <td className="py-3 px-4 text-green-400">✅ Automated via GitHub Actions</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Threat Map Incidents</td>
                        <td className="py-3 px-4 text-green-400">✅ 3D globe + Mapbox flat map, city-level positioning</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">AI Classification (Tier 2)</td>
                        <td className="py-3 px-4 text-green-400">✅ Live — Llama 3.1 8B severity scoring + AI summaries</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Location OpSec Guide MVP</td>
                        <td className="py-3 px-4 text-green-400">✅ Live — broad-region and scenario guidance, no precise location</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Read-Only Guardian AI</td>
                        <td className="py-3 px-4 text-green-400">✅ Live beta — Groq GPT-OSS 20B, no tools or persistence</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Personal Risk Assessment</td>
                        <td className="py-3 px-4 text-green-400">✅ Live MVP — local 10-question scoring and personalized recommendations</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Airdrop (Season 1)</td>
                        <td className="py-3 px-4 text-green-400">✅ Active, Elite Guardian easter egg live</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Multi-Sig Governance</td>
                        <td className="py-3 px-4 text-green-400">✅ Gnosis Safe 2/2 implemented</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Community Channels</td>
                        <td className="py-3 px-4 text-green-400">✅ X (@5wa_io), LinkedIn, DevLog series</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Duress Protection Layer</td>
                        <td className="py-3 px-4 text-yellow-400">⏳ Planned — V6 roadmap (decoy wallet, timelock, Dead Man's Switch)</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">Dark Web / KYC Leak Monitoring</td>
                        <td className="py-3 px-4 text-yellow-400">⏳ Planned — V6 roadmap (dark web intelligence integration)</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">DePIN Security Alliance</td>
                        <td className="py-3 px-4 text-yellow-400">⏳ Planned — V6 roadmap (licensed partner network)</td>
                      </tr>
                      <tr className="border-b border-slate-700/50">
                        <td className="py-3 px-4 text-slate-300">B2B Service Burn</td>
                        <td className="py-3 px-4 text-yellow-400">⏳ Planned — V6 roadmap (enterprise subscriptions + buyback burn)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Contract Address */}
            <section className="mt-16 p-8 rounded-lg bg-slate-800/30 border border-slate-700/50">
              <h3 className="text-lg font-bold text-blue-300 mb-4">Contract Address</h3>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
                <code className="flex-1 text-sm text-cyan-400 break-all font-mono">0x392A6a53330fF20D47454BAf76eD6aB0a88571FD</code>
                <button
                  onClick={() => copyToClipboard("0x392A6a53330fF20D47454BAf76eD6aB0a88571FD")}
                  className="flex-shrink-0 p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-blue-400"
                  title="Copy address"
                >
                  {copiedAddress === "0x392A6a53330fF20D47454BAf76eD6aB0a88571FD" ? (
                    <Check size={20} />
                  ) : (
                    <Copy size={20} />
                  )}
                </button>
              </div>
            </section>

            {/* Document footer */}
            <div className="mt-12 text-center text-sm text-slate-500">
              <p>Document Version: 6.0 | Last Updated: September 23, 2026 | Status: Living Document</p>
              <p className="mt-2">
                For the latest updates, visit{" "}
                <a href="https://5wa.io" className="text-cyan-400 hover:underline">5wa.io</a>
                {" "}or follow{" "}
                <a href="https://x.com/5wa_io" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@5wa_io</a>
              </p>
            </div>
          </div>
        </div>

        <div className="h-16"></div>
      </div>
      <Footer />
    </div>
  );
}

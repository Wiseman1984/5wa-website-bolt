import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import OnChainDashboard from "@/components/OnChainDashboard";
import { ENGLISH_CONTENT } from "@shared/i18n";
import { Zap, Globe, Vote, Heart, Award } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Tokenomics() {
  const content = ENGLISH_CONTENT;
  const { title, subtitle, description, sections } = content.tokenomics;
  usePageMeta({
    title: "$5WA Tokenomics | Supply, Allocation & Lock-Up",
    description: "Verifiable $5WA supply lifecycle, post-burn allocation, PinkLock schedule, utility, and on-chain references.",
    url: "https://5wa.io/tokenomics",
  });

  // Ecosystem Reserve breakdown
  const ecosystemBreakdown = [
    { label: "Liquidity Provision Fund", amount: "100,000,000", percentage: "10%", description: "Ensuring deep market liquidity across DEX platforms" },
    { label: "Ecosystem Partner Incentives", amount: "50,000,000", percentage: "5%", description: "Strategic partnerships and ecosystem growth" },
    { label: "Core Development & Security Audit", amount: "50,000,000", percentage: "5%", description: "Continuous iteration and security resources" },
  ];

  // Token Utility use cases
  const tokenUtility = [
    {
      icon: Zap,
      title: "Future Premium Security Tools",
      description: "The current Location OpSec Guide and read-only Guardian AI beta are public. Future premium tiers may add personalized risk scoring, advanced threat feeds, and configurable alerts after security and privacy review.",
    },
    {
      icon: Globe,
      title: "Guardian Network Rewards",
      description: "Node operators in the decentralized Guardian Network earn $5WA tokens for validating threats, disseminating alerts, and maintaining network integrity.",
    },
    {
      icon: Vote,
      title: "Platform Governance (DAO Voting)",
      description: "Hold $5WA to participate in governance decisions including protocol upgrades, treasury allocation, and ecosystem development priorities.",
    },
    {
      icon: Heart,
      title: "Crisis Response & Legal Defense Fund",
      description: "A planned, community-governed fund for verified emergency relocation, crisis support, legal counsel, and post-incident care—not reimbursement of stolen cryptocurrency.",
    },
    {
      icon: Award,
      title: "Reputation & Staking",
      description: "Stake $5WA to build on-chain reputation, unlock higher-tier security services, and demonstrate commitment to the Guardian Network.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl text-center">
          <h1 className="section-title">{title}</h1>
          <p className="section-subtitle">{subtitle}</p>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
      </section>

      {/* Token Lifecycle */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="section-title">Token Lifecycle</h2>
            <p className="text-muted-foreground text-lg">The supply transformation is shown here once, before the detailed allocation and lock-up mechanics.</p>
          </div>

          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-cyan-500/50 via-red-500/50 to-green-500/50 md:block" />
            {[
              { step: "01", label: "Genesis", value: "8B", detail: "Total minted", tone: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10" },
              { step: "02", label: "Permanent Burn", value: "7B", detail: "87.5% destroyed", tone: "border-red-500/40 text-red-400 bg-red-500/10" },
              { step: "03", label: "Final Supply", value: "1B", detail: "Minting disabled", tone: "border-green-500/40 text-green-400 bg-green-500/10" },
              { step: "04", label: "Allocation", value: "5% · 75% · 20%", detail: "Circulation · lock · reserve", tone: "border-blue-500/40 text-blue-400 bg-blue-500/10" },
            ].map((item) => (
              <div key={item.step} className="relative rounded-xl border border-border/70 bg-[#0b111d]/90 p-5 text-center">
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border font-mono text-sm font-bold shadow-[0_0_20px_rgba(0,212,255,0.08)] ${item.tone}`}>
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-foreground">{item.label}</h3>
                <p className={`mt-2 font-bold ${item.step === "04" ? "text-base" : "text-2xl"} ${item.tone.split(" ")[1]}`}>{item.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            The 8 billion genesis supply was reduced by a one-time 7 billion burn. The resulting 1 billion final supply is the sole basis for all percentages shown below.
          </p>
        </div>
      </section>

      {/* Distribution with 3D Pie Chart */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-5xl">
          <h2 className="section-title text-center mb-4">{sections.distribution.title}</h2>
          <p className="text-center text-muted-foreground mb-6">{sections.distribution.description}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* 3D Allocation Pie Chart */}
            <div className="rounded-xl overflow-hidden border border-border/50" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)' }}>
              <img
                src="/5wa-allocation-pie.webp"
                alt="$5WA Token Allocation — 75% Locked, 20% Ecosystem, 5% Initial"
                className="w-full h-auto"
              />
            </div>

            {/* Distribution Items */}
            <div className="space-y-4">
              {sections.distribution.items.map((item, index) => (
                <div key={index} className="card-metal p-5 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="font-semibold text-foreground">{item.label}</span>
                    </div>
                    <span className="text-accent font-bold">{item.value}</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        backgroundColor: item.color,
                        width: index === 0 ? "75%" : index === 1 ? "20%" : "5%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lock-Up Mechanism with 3D Unlock Curve */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <h2 className="section-title text-center mb-4">{sections.lockup.title}</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center">{sections.lockup.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-metal p-6 rounded-lg border border-border text-center">
              <div className="text-sm text-muted-foreground mb-2">Monthly Unlock</div>
              <div className="text-xl font-bold text-accent">
                {sections.lockup.monthlyUnlock}
              </div>
            </div>
            <div className="card-metal p-6 rounded-lg border border-border text-center">
              <div className="text-sm text-muted-foreground mb-2">Total Locked</div>
              <div className="text-xl font-bold text-accent">
                {sections.lockup.totalLocked}
              </div>
            </div>
            <div className="card-metal p-6 rounded-lg border border-border text-center">
              <div className="text-sm text-muted-foreground mb-2">Lock-Up Period</div>
              <div className="text-xl font-bold text-accent">
                {sections.lockup.lockupPeriod}
              </div>
            </div>
          </div>

          {/* 3D Unlock Curve Image */}
          <div className="rounded-xl overflow-hidden border border-border/50" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)' }}>
            <img
              src="/5wa-unlock-curve.webp"
              alt="$5WA 24-Month Linear Unlock Curve"
              className="w-full h-auto"
            />
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Daily linear unlock of ~1,027,397 tokens over 730 days (Jan 2027 — Jan 2029)
          </p>
        </div>
      </section>

      {/* Ecosystem Reserve Breakdown */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-4xl">
          <h2 className="section-title text-center mb-4">Ecosystem Development Reserve (20%)</h2>
          <p className="text-center text-muted-foreground mb-8">
            200 Million tokens allocated for continuous ecosystem growth and security
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ecosystemBreakdown.map((item, index) => (
              <div key={index} className="card-metal p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
                <p className="text-2xl font-bold text-accent mb-1">{item.percentage}</p>
                <p className="text-sm text-muted-foreground mb-2">{Number(item.amount.replace(/,/g, '')).toLocaleString()} 5WA</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Utility Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <h2 className="section-title text-center mb-4">Token Utility</h2>
          <p className="text-center text-muted-foreground mb-12">
            $5WA is the native utility token powering the entire physical security ecosystem
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokenUtility.map((item, index) => (
              <div
                key={index}
                className="card-metal p-6 rounded-lg border border-border hover:border-accent/40 transition-all"
                style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.08)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On-Chain Transparency Dashboard */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-5xl">
          <OnChainDashboard />
        </div>
      </section>

      {/* Contract Info */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl text-center">
          <h2 className="section-title mb-4">Verify On-Chain</h2>
          <p className="text-muted-foreground mb-6">All tokenomics data is verifiable on the BNB Smart Chain.</p>
          <div className="card-metal p-6 rounded-lg border border-border inline-block">
            <p className="text-sm text-muted-foreground mb-2">Contract Address</p>
            <a
              href="https://bscscan.com/token/0x392A6a53330fF20D47454BAf76eD6aB0a88571FD"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-mono text-sm break-all"
            >
              0x392A6a53330fF20D47454BAf76eD6aB0a88571FD
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

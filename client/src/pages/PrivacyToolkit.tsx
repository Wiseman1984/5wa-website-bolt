import { useState } from "react";
import {
  Shield,
  Plane,
  Wallet,
  Eye,
  Lock,
  Smartphone,
  Laptop,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type TabId = "identity" | "travel" | "wallet";

interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
}

const TABS: { id: TabId; label: string; icon: React.ReactNode; description: string }[] = [
  {
    id: "identity",
    label: "Identity De-sensitization",
    icon: <Eye className="w-5 h-5" />,
    description:
      "Minimize the linkage between your on-chain activity and your real-world identity. These steps reduce doxxing exposure and make you a harder target.",
  },
  {
    id: "travel",
    label: "Travel Mode Hardening",
    icon: <Plane className="w-5 h-5" />,
    description:
      "Secure your devices and data before and during travel. High-risk regions demand extra operational discipline.",
  },
  {
    id: "wallet",
    label: "Wallet Risk Analysis",
    icon: <Wallet className="w-5 h-5" />,
    description:
      "Detect patterns in your wallet setup that increase exposure. A few structural changes can dramatically reduce your attack surface.",
  },
];

const CHECKLISTS: Record<TabId, ChecklistItem[]> = {
  identity: [
    {
      id: "use-multiple-addresses",
      label: "Use multiple wallet addresses",
      detail:
        "Separate your high-value cold storage from your daily spending wallet. Never link them via a single transaction. Use a fresh address for each major interaction.",
    },
    {
      id: "avoid-linking-identity",
      label: "Avoid linking real name to on-chain activity",
      detail:
        "Do not post your wallet address on social media, forums, or Discord alongside your real name or photo. Use a pseudonymous identity for all crypto-related public communication.",
    },
    {
      id: "scrub-social-media",
      label: "Audit social media for wealth signals",
      detail:
        "Remove posts that reveal your crypto holdings, exchange accounts, or hardware wallet ownership. Attackers scan public profiles for high-net-worth signals.",
    },
    {
      id: "use-vpn",
      label: "Use a VPN when accessing crypto services",
      detail:
        "Your IP address can tie your on-chain activity to a physical location. A reputable VPN breaks this link. Avoid free VPNs that may log or sell traffic data.",
    },
    {
      id: "separate-email",
      label: "Use a dedicated email for crypto accounts",
      detail:
        "Do not reuse the email tied to your real identity. Create a separate, pseudonymous email for all exchange and DeFi registrations.",
    },
  ],
  travel: [
    {
      id: "leave-hardware-wallet",
      label: "Leave hardware wallets at home in a secure location",
      detail:
        "Carry only a minimal spending wallet while traveling. Store hardware wallets in a hidden, fireproof location. Never carry seed phrase backups in your luggage.",
    },
    {
      id: "encrypt-devices",
      label: "Full-disk encrypt all devices",
      detail:
        "Enable BitLocker (Windows), FileVault (macOS), or LUKS (Linux) on every device you carry. Use a strong passphrase of 12+ characters. Power off devices fully when not in use — encryption only protects powered-down devices.",
    },
    {
      id: "disable-bluetooth",
      label: "Disable Bluetooth and AirDrop in public",
      detail:
        "Bluetooth can be used for device fingerprinting and proximity tracking. Turn it off when not actively using peripherals. Set AirDrop to 'Contacts Only' or 'Receiving Off'.",
    },
    {
      id: "use-burner-phone",
      label: "Consider a burner phone for high-risk regions",
      detail:
        "If traveling to a region with known physical coercion risk, use a cheap, clean phone with no crypto apps installed. Wipe and discard it after the trip.",
    },
    {
      id: "notify-trusted-contact",
      label: "Set up a check-in protocol with a trusted contact",
      detail:
        "Agree on a regular check-in schedule and a duress phrase — a word or phrase that signals you are under coercion. Share your itinerary but not your wallet details.",
    },
  ],
  wallet: [
    {
      id: "multi-sig",
      label: "Use multi-sig for large holdings",
      detail:
        "A single-signature wallet means one compromise drains everything. Use a 2/3 or 3/5 multi-sig setup (e.g., Gnosis Safe, Electrum) so no single device can authorize a transfer.",
    },
    {
      id: "check-approvals",
      label: "Audit and revoke token approvals regularly",
      detail:
        "Infinite ERC-20 approvals let a compromised contract drain your wallet. Use tools like revoke.cash to review and revoke unnecessary spending approvals every few months.",
    },
    {
      id: "avoid-single-exchange",
      label: "Do not keep all funds on one exchange",
      detail:
        "Exchange failures (FTX, Mt. Gox) have caused billions in losses. Spread funds across self-custody and at most one exchange for active trading. Not your keys, not your coins.",
    },
    {
      id: "seed-phrase-storage",
      label: "Store seed phrase offline, never digitally",
      detail:
        "Never store your seed phrase in a password manager, cloud note, or photo. Engrave it on metal and store it in a secure, undisclosed physical location. Split it across two locations for maximum safety.",
    },
    {
      id: "test-recovery",
      label: "Test your recovery process before you need it",
      detail:
        "Once per year, verify that you can restore your wallet from your seed phrase using a clean device. A recovery plan you have never tested is not a recovery plan.",
    },
  ],
};

export default function PrivacyToolkit() {
  const [activeTab, setActiveTab] = useState<TabId>("identity");
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentItems = CHECKLISTS[activeTab];
  const checkedCount = currentItems.filter((item) => checked[item.id]).length;
  const progress = Math.round((checkedCount / currentItems.length) * 100);

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col">
      <Navigation />

      {/* Hero */}
      <section className="py-20 px-4 md:px-8 border-b border-cyan-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Whitepaper Phase 3 — Privacy Toolkit V1
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Privacy Toolkit
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Actionable checklists to reduce your physical and digital attack surface.
            Work through each section at your own pace — every checked item makes you
            a harder target.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-cyan-500/15 border border-cyan-500/50 text-cyan-300"
                    : "bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">
                Progress: {checkedCount}/{currentItems.length} items secured
              </span>
              <span className="text-sm font-semibold text-cyan-400">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-700/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="p-5 rounded-lg bg-slate-800/30 border border-slate-700/50 mb-8">
            <p className="text-slate-300 leading-relaxed">
              {TABS.find((t) => t.id === activeTab)?.description}
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-4">
            {currentItems.map((item, idx) => (
              <div
                key={item.id}
                className={`p-5 rounded-lg border transition-all duration-200 ${
                  checked[item.id]
                    ? "bg-emerald-950/20 border-emerald-700/40"
                    : "bg-slate-800/30 border-slate-700/50 hover:border-cyan-500/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className="flex-shrink-0 mt-0.5"
                    aria-label={checked[item.id] ? "Mark as incomplete" : "Mark as complete"}
                  >
                    <CheckCircle2
                      className={`w-6 h-6 transition-colors ${
                        checked[item.id]
                          ? "text-emerald-400"
                          : "text-slate-600 hover:text-cyan-400"
                      }`}
                    />
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-slate-500">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`text-lg font-semibold transition-colors ${
                          checked[item.id] ? "text-emerald-300" : "text-white"
                        }`}
                      >
                        {item.label}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Warning banner */}
          <div className="mt-10 p-5 rounded-lg bg-amber-950/20 border border-amber-700/40">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-200 leading-relaxed">
                This toolkit provides general guidance, not professional security advice.
                If you face an active physical threat, contact local law enforcement
                immediately. Your safety is always more valuable than any cryptocurrency.
              </p>
            </div>
          </div>

          {/* Back to whitepaper */}
          <div className="mt-8 text-center">
            <a
              href="/whitepaper"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Whitepaper
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

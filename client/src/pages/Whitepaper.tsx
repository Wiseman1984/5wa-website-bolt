import { useState } from "react";
import { Copy, Check, Download, Wrench, Shield, Brain, Flame } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function Whitepaper() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  usePageMeta({
    title: "$5WA Meme Manifesto | Proof of Build, Proof of Helmet",
    description: "The $5WA Meme Manifesto — Don't get hit by a $5 wrench. Buy $5WA to insure your skull. The hardest-working meme in crypto.",
    url: "https://5wa.io/whitepaper",
  });

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const chapters = [
    {
      icon: Wrench,
      title: "Chapter 1: The $5 Threat",
      tagline: "The brutal truth about crypto's ultimate vulnerability",
      color: "from-red-500/20 to-orange-500/10",
      borderColor: "border-red-500/30",
      iconColor: "text-red-400",
      content: [
        "You spent $500 on a hardware wallet. You stamped your seed phrase on a titanium plate. You set up a 4-of-7 multi-sig across 7 countries. You even memorized your BIP39 passphrase in Klingon for extra security.",
        "Then someone bought a $5 wrench from Home Depot.",
        "The xkcd comic said it best: no amount of cryptography survives physical coercion. The attacker doesn't need to crack your private key — they just need to crack your skull. This is the $5 Wrench Attack, and it's the one vulnerability that no firewall, no hardware wallet, and no quantum-resistant algorithm can fix.",
        "Physical consensus is crypto's terminal bug. And $5WA is the meme that tells the truth about it.",
      ],
      highlight: "Physical consensus is crypto's ultimate vulnerability. We can't fix it — but we can meme about it.",
    },
    {
      icon: Brain,
      title: "Chapter 2: Proof of Build",
      tagline: "We're not just a JPEG with a ticker",
      color: "from-blue-500/20 to-cyan-500/10",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
      content: [
        "Most meme coins have a JPEG and a dream. We have a JPEG, a dream, AND a threat intelligence engine that runs daily, a 3D globe tracking real crypto physical attacks worldwide, and an AI assistant that gives real OpSec advice.",
        "Here's what we actually built while other meme coins were making Telegram stickers:",
      ],
      features: [
        { name: "Wrenchy Live Map", desc: "Daily threat intelligence pipeline aggregating 8 RSS feeds, Google News, and Reddit. Auto-classified by AI. Plotted on a 3D globe. Most meme coins have a roadmap. We have a product." },
        { name: "Self-Deprecating Guardian AI", desc: "An AI agent powered by Groq GPT-OSS 20B that gives real defensive security advice — while being fully aware that a $5 wrench beats any multi-sig. Self-awareness is the best security." },
        { name: "Proof of Helmet Quiz", desc: "A black-humor security quiz that generates a shareable Skull Hardness Certificate. Users test their skull thickness, share on X, and get airdropped $5WA. Viral by design, educational by accident." },
      ],
    },
    {
      icon: Shield,
      title: "Chapter 3: Proof of Helmet",
      tagline: "Test your skull. Earn your certificate. Share the meme.",
      color: "from-yellow-500/20 to-amber-500/10",
      borderColor: "border-yellow-500/30",
      iconColor: "text-yellow-400",
      content: [
        "The Proof of Helmet Quiz is our viral growth engine. Users answer 6 black-humor security questions, get scored on a 4-tier skull hardness scale, and receive a shareable certificate for Twitter/X.",
      ],
      tiers: [
        { range: "0-1 correct", name: "Tofu Skull", desc: "A $5 wrench is 10 meters away and you're already reciting your seed phrase." },
        { range: "2-3 correct", name: "Plastic Helmet", desc: "You can block a $2 wrench but a $5 one goes right through." },
        { range: "4-5 correct", name: "Iron Skull", desc: "The attacker would need at least a $10 wrench to get your keys." },
        { range: "6 correct", name: "Titanium Skull", desc: "The wrench breaks before your skull does. Peak $5WA Guardian energy." },
      ],
      cta: "Take the quiz at 5wa.io/airdrop and earn your Skull Hardness Certificate.",
    },
    {
      icon: Flame,
      title: "Chapter 4: Wrenchomics",
      tagline: "Token economics, but make it meme",
      color: "from-green-500/20 to-emerald-500/10",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400",
      content: [
        "We took the serious tokenomics and translated them into meme language. The math is the same. The vibes are different.",
      ],
      mechanics: [
        { meme: "Staking = Helmet Upgrade", real: "Stake $5WA to earn rewards and unlock higher service tiers. Your helmet goes from tofu to titanium." },
        { meme: "Airdrop = Physical Insurance Drop", real: "Complete the Proof of Helmet Quiz, share on X, and get $5WA airdropped to your wallet. Insurance for your skull, paid in memes." },
        { meme: "87.5% Burn = Attack Surface Reduction", real: "From 8B genesis supply to 1B final target. 7 billion tokens permanently burned. The supply is shrinking faster than your attack surface." },
        { meme: "24-Month Lock = Time Buffer", real: "750M tokens locked on PinkLock with daily linear unlock starting January 2027. The time buffer you wish you had when a wrench is approaching." },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col">
      <Navigation />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-6 inline-block px-4 py-2 rounded-lg border border-yellow-500/30 bg-yellow-500/5">
            <span className="text-sm font-semibold text-yellow-400">Meme Manifesto v1.0</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            $5WA Meme Manifesto
          </h1>
          <p className="text-xl text-slate-400 mb-4 max-w-2xl mx-auto">
            Don't get hit by a $5 wrench. Buy $5WA to insure your skull.
          </p>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-8"></div>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            The shortest, funniest, and hardest-core whitepaper in crypto. 4 chapters. Zero fluff. 100% meme. 100% real.
          </p>
        </div>

        {/* Chapters */}
        <div className="container mx-auto px-4 py-8 max-w-3xl space-y-12">
          {chapters.map((chapter, idx) => {
            const Icon = chapter.icon;
            return (
              <section key={idx} className={`p-8 rounded-2xl bg-gradient-to-br ${chapter.color} border ${chapter.borderColor}`}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-slate-900/60 ${chapter.iconColor}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{chapter.title}</h2>
                    <p className="text-sm text-slate-400">{chapter.tagline}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {chapter.content.map((para, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed">{para}</p>
                  ))}

                  {chapter.highlight && (
                    <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-700/50">
                      <p className={`text-lg font-semibold italic ${chapter.iconColor}`}>
                        "{chapter.highlight}"
                      </p>
                    </div>
                  )}

                  {chapter.features && (
                    <div className="space-y-3 mt-4">
                      {chapter.features.map((f, i) => (
                        <div key={i} className="p-4 rounded-lg bg-slate-900/40 border border-slate-700/40">
                          <p className={`font-bold ${chapter.iconColor} mb-1`}>{f.name}</p>
                          <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {chapter.tiers && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {chapter.tiers.map((t, i) => (
                        <div key={i} className="p-4 rounded-lg bg-slate-900/40 border border-slate-700/40">
                          <p className="text-xs text-slate-500 mb-1">{t.range}</p>
                          <p className={`font-bold ${chapter.iconColor} mb-1`}>{t.name}</p>
                          <p className="text-sm text-slate-400">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {chapter.cta && (
                    <div className="p-4 rounded-lg bg-slate-900/60 border border-yellow-500/20 text-center">
                      <p className="text-yellow-300 font-semibold">{chapter.cta}</p>
                    </div>
                  )}

                  {chapter.mechanics && (
                    <div className="space-y-3 mt-4">
                      {chapter.mechanics.map((m, i) => (
                        <div key={i} className="p-4 rounded-lg bg-slate-900/40 border border-slate-700/40">
                          <p className={`font-bold ${chapter.iconColor}`}>{m.meme}</p>
                          <p className="text-sm text-slate-400 mt-1 leading-relaxed">{m.real}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            );
          })}

          {/* Contract Address */}
          <section className="p-8 rounded-2xl bg-slate-900/60 border border-slate-700/50">
            <h3 className="text-lg font-bold text-yellow-300 mb-4">Contract Address</h3>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <code className="flex-1 text-sm text-cyan-400 break-all font-mono">0x392A6a53330fF20D47454BAf76eD6aB0a88571FD</code>
              <button
                onClick={() => copyToClipboard("0x392A6a53330fF20D47454BAf76eD6aB0a88571FD")}
                className="flex-shrink-0 p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors text-yellow-400"
                title="Copy address"
              >
                {copiedAddress === "0x392A6a53330fF20D47454BAf76eD6aB0a88571FD" ? (
                  <Check size={20} />
                ) : (
                  <Copy size={20} />
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3">BNB Smart Chain (BSC) — Not financial advice. Not a security service. Just the hardest-working meme in crypto.</p>
          </section>

          {/* Document footer */}
          <div className="text-center text-sm text-slate-500 pb-8">
            <p>Document Version: Meme Manifesto 1.0 | Last Updated: September 24, 2026</p>
            <p className="mt-2">
              For the full technical whitepaper (V6), visit{" "}
              <a href="https://5wa.io" className="text-yellow-400 hover:underline">5wa.io</a>
              {" "}or follow{" "}
              <a href="https://x.com/5wa_io" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">@5wa_io</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

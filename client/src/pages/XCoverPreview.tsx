import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/hooks/usePageMeta";

const covers = [
  {
    src: "/x-cover-option-1-wallet-vs-wrench.webp",
    title: "Option 1 — Wallet vs Wrench",
    desc: "High-tech hardware wallet with full digital security, contrasted with a simple $5 wrench. Recommended.",
  },
  {
    src: "/x-cover-option-2-glass-skull.png",
    title: "Option 2 — Glass Skull",
    desc: "A fragile glass skull with an encrypted seed phrase glowing inside, wrench shadow falling across it.",
  },
  {
    src: "/x-cover-option-3-fortress-bubble.png",
    title: "Option 3 — Security Fortress",
    desc: "Cartoon-style illustration of someone hiding behind digital security while a shadowy figure holds a wrench.",
  },
];

export default function XCoverPreview() {
  usePageMeta({
    title: "X Cover Preview | $5WA",
    description: "Preview of X (Twitter) banner cover design options for $5WA.",
    url: "https://5wa.io/x-cover-preview",
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <section className="py-16 md:py-24">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">
            X Cover Design Options
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-12">
            Three banner directions for the $5WA X profile. Right-click any image to save it.
          </p>

          <div className="space-y-12 max-w-4xl mx-auto">
            {covers.map((cover, i) => (
              <div key={cover.src} className="rounded-xl overflow-hidden border border-cyan-500/20 bg-card/60 backdrop-blur-sm">
                <div className="relative">
                  <img
                    src={cover.src}
                    alt={cover.title}
                    className="w-full h-auto block"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 text-cyan-400 text-sm font-mono px-3 py-1 rounded">
                    {i + 1} / 3
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-foreground mb-1">{cover.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cover.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

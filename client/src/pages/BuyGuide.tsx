import { AlertCircle, CheckCircle, Info } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ENGLISH_CONTENT } from "@shared/i18n";

export default function BuyGuide() {
  const content = ENGLISH_CONTENT;
  const { title, subtitle, introduction, steps, tips, risks } = content.buyGuide;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl text-center">
          <h1 className="section-title">{title}</h1>
          <p className="section-subtitle">{subtitle}</p>
          <p className="text-lg text-muted-foreground">{introduction}</p>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="section-title text-center mb-12">Step-by-Step Instructions</h2>

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="card-metal p-6 rounded-lg border border-border">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-accent text-accent-foreground font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    {step.details && (
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Tips */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl">
          <h2 className="section-title mb-8">{tips.title}</h2>

          <div className="space-y-3">
            {tips.items.map((tip, index) => (
              <div key={index} className="card-metal p-4 rounded-lg border border-border flex gap-3">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Disclaimer */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="card-metal p-8 rounded-lg border border-border border-destructive">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-semibold text-foreground mb-4">{risks.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{risks.content}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl">
          <h2 className="section-title text-center mb-12">Common Questions</h2>

          <div className="space-y-4">
            <div className="card-metal p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">What is the contract address?</h3>
              <p className="text-muted-foreground text-sm">
                The official contract address is: <span className="font-mono text-accent">0x392A6a53330fF20D47454BAf76eD6aB0a88571FD</span>
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Always verify this address before purchasing to avoid scams.
              </p>
            </div>

            <div className="card-metal p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Which DEX should I use?</h3>
              <p className="text-muted-foreground text-sm">
                5WA is on BNB Smart Chain (BSC). Use PancakeSwap (pancakeswap.finance) as the primary DEX. Ensure your wallet is connected to BSC before swapping.
              </p>
            </div>

            <div className="card-metal p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">What is slippage?</h3>
              <p className="text-muted-foreground text-sm">
                Slippage is the difference between the expected price and the actual execution price. For 5WA, we recommend setting slippage to 0.5-1% to avoid failed transactions.
              </p>
            </div>

            <div className="card-metal p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Is it safe to hold tokens in a DEX?</h3>
              <p className="text-muted-foreground text-sm">
                DEXs are generally safe, but for large holdings, we recommend transferring tokens to a personal wallet or hardware wallet for better security.
              </p>
            </div>

            <div className="card-metal p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">How do I store my tokens securely?</h3>
              <p className="text-muted-foreground text-sm">
                For maximum security, use a hardware wallet like Ledger or Trezor. For smaller amounts, a software wallet like MetaMask is acceptable. Never share your private key or seed phrase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DODO Crowdfunding */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <div className="card-metal p-8 rounded-lg border border-accent/30 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">DODO Crowdfunding</h2>
            <p className="text-muted-foreground mb-6">
              The primary way to acquire $5WA tokens will be through our DODO crowdfunding mechanism, designed to build an initial liquidity moat with optimized market depth.
            </p>
            <div className="inline-block px-6 py-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <span className="text-amber-400 font-semibold">Coming Soon</span>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Follow <a href="https://x.com/5wa_io" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">@5wa_io</a> on X for launch announcements.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl text-center">
          <h2 className="section-title mb-8">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Follow the steps above to purchase $5WA tokens. If you have any questions, feel free to reach out to our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://pancakeswap.finance/swap?outputCurrency=0x392A6a53330fF20D47454BAf76eD6aB0a88571FD" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
              Buy on PancakeSwap
            </a>
            <a href="/dashboard" className="btn-secondary inline-block">
              View Dashboard
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

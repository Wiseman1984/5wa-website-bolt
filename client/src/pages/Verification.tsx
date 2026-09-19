import { ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ENGLISH_CONTENT } from "@shared/i18n";

export default function Verification() {
  const content = ENGLISH_CONTENT;
  const { title, subtitle, description, verificationLinks, burnHistory } = content.verification;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-accent" />
          </div>
          <h1 className="section-title">{title}</h1>
          <p className="section-subtitle">{subtitle}</p>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
      </section>

      {/* Verification Links */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <h2 className="section-title text-center mb-12">Blockchain Verification Links</h2>

          <div className="space-y-6">
            {verificationLinks.map((link: any, index: number) => (
              <div key={index} className="card-metal p-6 rounded-lg border border-border hover:glow-blue transition-all" style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.15)' }}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{link.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{link.description}</p>
                    <div className="bg-card p-3 rounded border border-border mb-4">
                      <p className="text-xs text-muted-foreground mb-1">Contract Address:</p>
                      <p className="text-sm font-mono text-accent break-all">{link.address}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Network: {link.network}</p>
                  </div>
                  <a
                    href={link.explorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    View on Explorer
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Information */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl">
          <h2 className="section-title mb-8">How to Verify</h2>

          <div className="space-y-6">
            <div className="card-metal p-6 rounded-lg border border-border">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Step 1: Visit BscScan</h3>
                  <p className="text-muted-foreground">
                    Go to BscScan.com and paste the contract address into the search bar to view all transactions and lock-up details.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-metal p-6 rounded-lg border border-border">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Step 2: Check Lock-Up Status</h3>
                  <p className="text-muted-foreground">
                    View the contract details to confirm that tokens are locked until the specified date. You can see all lock-up transactions and their timestamps.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-metal p-6 rounded-lg border border-border">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Step 3: Verify Burn Events</h3>
                  <p className="text-muted-foreground">
                    Track all burn events by viewing transactions sent to the burn address. Each burn is permanently recorded and immutable.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-metal p-6 rounded-lg border border-border">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Step 4: Confirm Multi-Sig</h3>
                  <p className="text-muted-foreground">
                    Verify the multi-signature wallet to ensure that lock-up and burn decisions require multiple approvals for enhanced security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Burn History */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="section-title mb-4">{burnHistory.title}</h2>
          <p className="text-lg text-muted-foreground mb-8">{burnHistory.description}</p>

          <div className="card-metal p-6 rounded-lg border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-foreground font-semibold">Date</th>
                    <th className="text-right py-3 px-4 text-foreground font-semibold">Amount Burned</th>
                    <th className="text-left py-3 px-4 text-foreground font-semibold">Transaction Hash</th>
                  </tr>
                </thead>
                <tbody>
                         {burnHistory.events.map((event: any, index: number) => (
                    <tr key={index} className="border-b border-border hover:bg-card/50">
                      <td className="py-3 px-4 text-muted-foreground">{event.date}</td>
                      <td className="text-right py-3 px-4 text-accent font-semibold">{event.amount}</td>
                      <td className="py-3 px-4">
                        <a
                          href={`https://bscscan.com/tx/${event.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline font-mono text-xs flex items-center gap-2"
                        >
                          {event.txHash.slice(0, 18)}...{event.txHash.slice(-6)}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl">
          <h2 className="section-title text-center mb-12">Trust Through Transparency</h2>

          <div className="card-metal p-8 rounded-lg border border-border">
            <div className="flex gap-4 mb-6">
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Immutable Proof</h3>
                <p className="text-muted-foreground">
                  All lock-up and burn events are recorded on the BNB Smart Chain (BSC). Once recorded, they cannot be altered or deleted, providing permanent proof of our commitments.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Community Verification</h3>
                <p className="text-muted-foreground">
                  Anyone can verify these transactions independently using BscScan or any blockchain explorer. We believe in radical transparency and community oversight.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

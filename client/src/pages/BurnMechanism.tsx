import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Flame, ExternalLink, TrendingDown, Target, CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

const GENESIS_BURN_TX = "0xe506b4cf07afa63c8ca8a8bcac962477957357196014c15daecb7757072c3f4e";
const STRATEGIC_BURN_TX1 = "0x4249523a33a7cccf23472ff63d8c7f0516ff233f02b2471aab6a41f2274d6279";
const STRATEGIC_BURN_TX2 = "0x6b49448610903b64bf57eee82166477be03bf2c6d168c832a38c3156cf78de2b";
const MULTISIG_WALLET = "0xc3cbdfE9766D446B300e30144C73eb5c3Ab69c08";
const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";

// PinkLock parameters
const PINKLOCK_TOTAL = 750_000_000;
const PINKLOCK_START = new Date("2027-01-01T00:00:00Z");
const PINKLOCK_END = new Date("2029-01-01T00:00:00Z");
const PINKLOCK_DURATION_DAYS = 730;

function getPinkLockProgress() {
  const now = new Date();
  if (now < PINKLOCK_START) {
    return { percentage: 0, unlocked: 0, remaining: PINKLOCK_TOTAL, status: "locked" as const };
  }
  if (now >= PINKLOCK_END) {
    return { percentage: 100, unlocked: PINKLOCK_TOTAL, remaining: 0, status: "complete" as const };
  }
  const elapsed = (now.getTime() - PINKLOCK_START.getTime()) / (1000 * 60 * 60 * 24);
  const percentage = Math.min((elapsed / PINKLOCK_DURATION_DAYS) * 100, 100);
  const unlocked = (PINKLOCK_TOTAL * percentage) / 100;
  const remaining = PINKLOCK_TOTAL - unlocked;
  return { percentage, unlocked, remaining, status: "unlocking" as const };
}

export default function BurnMechanism() {
  const pinkLock = getPinkLockProgress();
  usePageMeta({
    title: "$5WA Burn Mechanism | 7B Tokens Burned",
    description: "Genesis Burn 4B + Strategic Burn 3B = 87.5% total supply permanently destroyed. Verified on BNB Smart Chain.",
    url: "https://5wa.io/burn-mechanism",
  });
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Flame className="w-12 h-12 text-red-400" />
              <CheckCircle2 className="w-5 h-5 text-green-400 absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="section-title">Burn Mechanism</h1>
          <p className="section-subtitle">87.5% Total Supply Reduction — Complete</p>
          <p className="text-lg text-muted-foreground">
            From an original supply of 8 billion tokens, 7 billion have been permanently burned. The final circulating supply of 1 billion 5WA has been achieved.
          </p>
        </div>
      </section>

      {/* Total Burn Status Banner */}
      <section className="py-8 bg-green-950/30 border-y border-green-800/50">
        <div className="container max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-sm text-green-300/80 font-medium">Total Burned</p>
                <p className="text-2xl md:text-3xl font-bold text-green-400">7,000,000,000 5WA (87.5%)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-900/40 rounded-full border border-green-700/50">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold text-sm uppercase tracking-wide">Burn Complete</span>
            </div>
          </div>
        </div>
      </section>

      {/* Burn Progress Overview */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <h2 className="section-title text-center mb-12">Burn Progress</h2>

          {/* Visual Progress */}
          <div className="card-metal p-8 rounded-lg border border-border mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span>0 (All Burned)</span>
              <span>8,000,000,000 (Original Supply)</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-8 relative overflow-hidden">
              {/* Genesis Burn (50%) */}
              <div className="h-8 bg-gradient-to-r from-red-600 via-red-500 to-red-400" style={{ width: '50%' }}></div>
              {/* Strategic Burn (37.5%) */}
              <div className="absolute top-0 h-8 bg-gradient-to-r from-orange-600 to-orange-400" style={{ left: '50%', width: '37.5%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span className="text-red-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 4B Genesis Burn
              </span>
              <span className="text-orange-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 3B Strategic Burn
              </span>
              <span className="text-green-400 font-semibold">1B Final Supply</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-metal p-6 rounded-lg border border-border text-center">
              <div className="text-sm text-muted-foreground mb-2">Original Supply</div>
              <div className="text-2xl font-bold text-foreground">8,000,000,000</div>
              <p className="text-xs text-muted-foreground mt-1">Created at genesis</p>
            </div>
            <div className="card-metal p-6 rounded-lg border border-border text-center relative">
              <CheckCircle2 className="w-4 h-4 text-green-400 absolute top-3 right-3" />
              <div className="text-sm text-muted-foreground mb-2">Genesis Burn</div>
              <div className="text-2xl font-bold text-red-400">4,000,000,000</div>
              <p className="text-xs text-green-400 mt-1 font-medium">50% — Completed</p>
            </div>
            <div className="card-metal p-6 rounded-lg border border-border text-center relative">
              <CheckCircle2 className="w-4 h-4 text-green-400 absolute top-3 right-3" />
              <div className="text-sm text-muted-foreground mb-2">Strategic Burn</div>
              <div className="text-2xl font-bold text-orange-400">3,000,000,000</div>
              <p className="text-xs text-green-400 mt-1 font-medium">37.5% — Completed</p>
            </div>
            <div className="card-metal p-6 rounded-lg border border-border text-center">
              <div className="text-sm text-muted-foreground mb-2">Final Supply</div>
              <div className="text-2xl font-bold text-green-400">1,000,000,000</div>
              <p className="text-xs text-green-400 mt-1 font-medium">Target Achieved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Genesis Burn Details */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="section-title text-center">Genesis Burn (4B)</h2>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/40 rounded-full border border-green-700/50 text-green-300 text-xs font-semibold">
              <CheckCircle2 className="w-3 h-3" /> Completed
            </span>
          </div>
          <p className="text-center text-muted-foreground mb-8">
            4 billion tokens were permanently sent to the dead address at token creation, reducing supply by 50%.
          </p>

          <div className="card-metal p-8 rounded-lg border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Amount Burned</p>
                <p className="text-xl font-bold text-red-400">4,000,000,000 5WA</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Burn Address</p>
                <a
                  href={`https://bscscan.com/address/${DEAD_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-mono text-sm flex items-center gap-1"
                >
                  0x000...dEaD
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-2">Transaction Hash</p>
              <a
                href={`https://bscscan.com/tx/${GENESIS_BURN_TX}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-mono text-xs flex items-center gap-2 break-all"
              >
                {GENESIS_BURN_TX}
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Burn Details */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="section-title text-center">Strategic Burn (3B)</h2>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/40 rounded-full border border-green-700/50 text-green-300 text-xs font-semibold">
              <CheckCircle2 className="w-3 h-3" /> Completed
            </span>
          </div>
          <p className="text-center text-muted-foreground mb-8">
            A strategic burn of 3 billion tokens was executed in two transactions via the Multi-sig governance wallet, reaching the final target supply of 1 billion 5WA.
          </p>

          {/* Multi-sig Wallet Info */}
          <div className="card-metal p-6 rounded-lg border border-border mb-6">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-foreground">Multi-sig Governance Wallet (Sender)</h3>
            </div>
            <a
              href={`https://bscscan.com/address/${MULTISIG_WALLET}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline font-mono text-xs flex items-center gap-2 break-all"
            >
              {MULTISIG_WALLET}
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Both strategic burn transactions were sent from this multi-signature governance wallet to the dead address.
            </p>
          </div>

          {/* Two Burn Transactions */}
          <div className="space-y-4 mb-8">
            {/* Tx 1 */}
            <div className="card-metal p-6 rounded-lg border border-orange-800/40 bg-orange-950/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-900/40 rounded text-orange-300 text-xs font-semibold">
                  Tx 1
                </span>
                <span className="text-foreground font-semibold">500,000,000 5WA Burned</span>
                <CheckCircle2 className="w-4 h-4 text-green-400 ml-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">From (Multi-sig)</p>
                  <a
                    href={`https://bscscan.com/address/${MULTISIG_WALLET}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline font-mono text-xs flex items-center gap-1"
                  >
                    {MULTISIG_WALLET.slice(0, 10)}...{MULTISIG_WALLET.slice(-6)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">To (Dead Address)</p>
                  <a
                    href={`https://bscscan.com/address/${DEAD_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline font-mono text-xs flex items-center gap-1"
                  >
                    0x000...dEaD
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                <a
                  href={`https://bscscan.com/tx/${STRATEGIC_BURN_TX1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-mono text-xs flex items-center gap-2 break-all"
                >
                  {STRATEGIC_BURN_TX1}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            </div>

            {/* Tx 2 */}
            <div className="card-metal p-6 rounded-lg border border-orange-800/40 bg-orange-950/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-900/40 rounded text-orange-300 text-xs font-semibold">
                  Tx 2
                </span>
                <span className="text-foreground font-semibold">2,500,000,000 5WA Burned</span>
                <CheckCircle2 className="w-4 h-4 text-green-400 ml-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">From (Multi-sig)</p>
                  <a
                    href={`https://bscscan.com/address/${MULTISIG_WALLET}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline font-mono text-xs flex items-center gap-1"
                  >
                    {MULTISIG_WALLET.slice(0, 10)}...{MULTISIG_WALLET.slice(-6)}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">To (Dead Address)</p>
                  <a
                    href={`https://bscscan.com/address/${DEAD_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline font-mono text-xs flex items-center gap-1"
                  >
                    0x000...dEaD
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                <a
                  href={`https://bscscan.com/tx/${STRATEGIC_BURN_TX2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-mono text-xs flex items-center gap-2 break-all"
                >
                  {STRATEGIC_BURN_TX2}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-metal p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-6 h-6 text-orange-400" />
                <h3 className="font-semibold text-foreground">Governance-Approved Burn</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Unused tokens from the ecosystem reserve were audited and permanently burned via the Multi-Sig governance wallet. The burn was executed in accordance with the community governance framework.
              </p>
            </div>
            <div className="card-metal p-6 rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-green-400" />
                <h3 className="font-semibold text-foreground">Final Target Achieved: 1 Billion</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                The 87.5% total supply reduction (from 8B to 1B) has been completed. This extreme deflation model ensures long-term scarcity and value preservation for all holders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How the Burn Was Executed */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-3xl">
          <h2 className="section-title text-center mb-12">How the Burn Was Executed</h2>

          <div className="space-y-6">
            <div className="card-metal p-6 rounded-lg border border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-900/50 border border-green-700/50 text-green-400 font-bold">1</div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Ecosystem Audit</h3>
                  <p className="text-muted-foreground">The Multi-Sig governance team audited token usage across all ecosystem wallets and identified tokens designated for burn.</p>
                </div>
              </div>
            </div>
            <div className="card-metal p-6 rounded-lg border border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-900/50 border border-green-700/50 text-green-400 font-bold">2</div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Multi-Sig Approval</h3>
                  <p className="text-muted-foreground">Burn decisions required multi-signature approval, ensuring no single party could unilaterally destroy tokens. All signers verified the burn parameters.</p>
                </div>
              </div>
            </div>
            <div className="card-metal p-6 rounded-lg border border-border">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-900/50 border border-green-700/50 text-green-400 font-bold">3</div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Permanent Burn Executed</h3>
                  <p className="text-muted-foreground">Approved tokens were transferred to the dead address (0x000...dEaD) in two transactions, permanently removing them from circulation. All transactions are verifiable on BscScan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="section-title text-center mb-12">Why This Matters</h2>

          <div className="space-y-4">
            <div className="card-metal p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Extreme Scarcity Achieved</h3>
              <p className="text-muted-foreground">
                By permanently removing 87.5% of the total supply, $5WA has established one of the most aggressive deflation models in the BSC ecosystem. Each remaining token represents significant value.
              </p>
            </div>
            <div className="card-metal p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Transparent & Verifiable</h3>
              <p className="text-muted-foreground">
                All burn events are permanently recorded on the BNB Smart Chain and can be independently verified by anyone. Trust is built on unalterable on-chain transparency.
              </p>
            </div>
            <div className="card-metal p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Governance-Driven Execution</h3>
              <p className="text-muted-foreground">
                Burns were executed through multi-signature governance, not automated scripts. Human oversight ensured alignment with ecosystem health and community interests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PinkLock Unlock Progress */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Lock className="w-6 h-6 text-blue-400" />
            <h2 className="section-title">PinkLock Vesting Progress</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            750,000,000 5WA (75% of final supply) are locked on PinkSale PinkLock V2 with a 24-month daily linear unlock schedule starting January 1, 2027.
          </p>

          <div className="card-metal p-8 rounded-lg border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Locked</p>
                <p className="text-xl font-bold text-blue-400">750,000,000 5WA</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Unlocked So Far</p>
                <p className="text-xl font-bold text-green-400">
                  {pinkLock.unlocked >= 1_000_000
                    ? `${(pinkLock.unlocked / 1_000_000).toFixed(2)}M`
                    : pinkLock.unlocked.toLocaleString()}{" "}
                  5WA
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Remaining Locked</p>
                <p className="text-xl font-bold text-amber-400">
                  {pinkLock.remaining >= 1_000_000
                    ? `${(pinkLock.remaining / 1_000_000).toFixed(2)}M`
                    : pinkLock.remaining.toLocaleString()}{" "}
                  5WA
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-6 relative overflow-hidden">
              <div
                className="h-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000"
                style={{ width: `${pinkLock.percentage}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                {pinkLock.status === "locked"
                  ? "Unlock starts Jan 01, 2027"
                  : pinkLock.status === "complete"
                  ? "Fully Unlocked"
                  : `${pinkLock.percentage.toFixed(2)}% Unlocked`}
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Jan 01, 2027</span>
              <span>Daily linear unlock (~1,027,397 tokens/day)</span>
              <span>Jan 01, 2029</span>
            </div>

            <div className="border-t border-border pt-4 mt-6 space-y-2">
              <p className="text-sm text-muted-foreground mb-3">Verify on PinkSale PinkLock V2:</p>
              <a
                href="https://www.pinksale.finance/pinklock/bsc/record/1653235"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm flex items-center gap-2"
              >
                Record #1653235 — 749,999,390 5WA (main lock)
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.pinksale.finance/pinklock/bsc/record/1653219"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm flex items-center gap-2"
              >
                Record #1653219 — 10 5WA (test record)
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ExternalLink, RefreshCw, Wallet, Flame, Lock, Clock } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";

const TOKEN_CONTRACT = "0x392A6a53330fF20D47454BAf76eD6aB0a88571FD";
const TOKEN_DECIMALS = 18;
const GENESIS_BURN_TX = "0xe506b4cf07afa63c8ca8a8bcac962477957357196014c15daecb7757072c3f4e";
const STRATEGIC_BURN_TX1 = "0x4249523a33a7cccf23472ff63d8c7f0516ff233f02b2471aab6a41f2274d6279";
const STRATEGIC_BURN_TX2 = "0x6b49448610903b64bf57eee82166477be03bf2c6d168c832a38c3156cf78de2b";
const MULTISIG_WALLET = "0xc3cbdfE9766D446B300e30144C73eb5c3Ab69c08";
const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";

// PinkLock parameters
const PINKLOCK_TOTAL = 750_000_000; // 750M tokens
const PINKLOCK_START = new Date("2027-01-01T00:00:00Z");
const PINKLOCK_END = new Date("2029-01-01T00:00:00Z");
const PINKLOCK_DURATION_DAYS = 730;

const WALLETS = [
  {
    name: "Ecosystem Governance & Fund Management",
    tag: "Multi-Sig",
    address: "0xc3cbdfE9766D446B300e30144C73eb5c3Ab69c08",
    color: "#3b82f6",
  },
  {
    name: "Community Interaction & Airdrop Distribution",
    tag: "Airdrop",
    address: "0x364c9e4dc858a7a08ea882298f4e3b1e40d7ad69",
    color: "#10b981",
  },
  {
    name: "Ecosystem Launch & Marketing Budget",
    tag: "Marketing & Bootstrap",
    address: "0xea6f63cacb75febaadf00334a8a630acc8212f63",
    color: "#f59e0b",
  },
];

interface WalletData {
  balance: string | null;
  loading: boolean;
  error: string | null;
}

interface TxData {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
}

export default function Dashboard() {
  const [walletData, setWalletData] = useState<Record<string, WalletData>>({});
  const [transactions, setTransactions] = useState<Record<string, TxData[]>>({});
  const [refreshing, setRefreshing] = useState(false);
  usePageMeta({
    title: "$5WA Dashboard | Live On-Chain Verification",
    description: "Real-time token data, burn verification, and PinkLock unlock progress. 7B tokens burned, 750M locked. Fully transparent on BNB Smart Chain.",
    url: "https://5wa.io/dashboard",
  });

  const formatBalance = (rawBalance: string): string => {
    const num = Number(rawBalance) / Math.pow(10, TOKEN_DECIMALS);
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const formatAddress = (addr: string): string => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTimestamp = (ts: string): string => {
    return new Date(Number(ts) * 1000).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const fetchWalletBalance = async (address: string): Promise<string> => {
    // Use BSC public RPC to call balanceOf(address) on the token contract
    const paddedAddress = address.toLowerCase().replace("0x", "").padStart(64, "0");
    const data = "0x70a08231" + paddedAddress; // balanceOf(address)
    const res = await fetch("https://bsc-dataseed.binance.org/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_call",
        params: [{ to: TOKEN_CONTRACT, data }, "latest"],
        id: 1,
      }),
    });
    const result = await res.json();
    if (result.result && result.result !== "0x") {
      // Convert hex to decimal string
      return BigInt(result.result).toString();
    }
    throw new Error("Failed to fetch balance from BSC RPC");
  };

  const fetchWalletTransactions = async (address: string): Promise<TxData[]> => {
    // Use BscScan public API (no key needed for basic queries, rate limited)
    const url = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${TOKEN_CONTRACT}&address=${address}&page=1&offset=5&sort=desc`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.status === "1" && Array.isArray(data.result)) {
        return data.result.slice(0, 5);
      }
    } catch {
      // BscScan API may be rate limited or unavailable
    }
    return [];
  };

  const fetchAllData = useCallback(async () => {
    setRefreshing(true);
    const newWalletData: Record<string, WalletData> = {};
    const newTxData: Record<string, TxData[]> = {};

    await Promise.all(
      WALLETS.map(async (wallet) => {
        try {
          const balance = await fetchWalletBalance(wallet.address);
          newWalletData[wallet.address] = { balance, loading: false, error: null };
        } catch (e: any) {
          newWalletData[wallet.address] = { balance: null, loading: false, error: e.message };
        }
        try {
          const txs = await fetchWalletTransactions(wallet.address);
          newTxData[wallet.address] = txs;
        } catch {
          newTxData[wallet.address] = [];
        }
      })
    );

    setWalletData(newWalletData);
    setTransactions(newTxData);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // PinkLock progress calculation
  const now = new Date();
  const getPinkLockProgress = () => {
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
  };

  const pinkLock = getPinkLockProgress();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-card/50">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Transparency Dashboard
              </h1>
              <p className="text-muted-foreground">
                Real-time on-chain data for all 5WA ecosystem wallets. Verify everything independently on BscScan.
              </p>
            </div>
            <button
              onClick={fetchAllData}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </section>

      {/* PinkLock Progress */}
      <section className="py-12 md:py-16">
        <div className="container max-w-5xl">
          <div className="card-metal p-8 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-foreground">PinkLock Unlock Progress</h2>
            </div>
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
          </div>
        </div>
      </section>

      {/* Wallet Balances */}
      <section className="py-12 md:py-16 bg-card/50">
        <div className="container max-w-5xl">
          <h2 className="text-xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Wallet className="w-6 h-6 text-accent" />
            Ecosystem Wallet Balances
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {WALLETS.map((wallet) => {
              const data = walletData[wallet.address];
              const txs = transactions[wallet.address] || [];
              return (
                <div key={wallet.address} className="card-metal p-6 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: wallet.color }}></div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-700/50 text-slate-300">
                      {wallet.tag}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{wallet.name}</h3>
                  <a
                    href={`https://bscscan.com/address/${wallet.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-accent hover:underline font-mono flex items-center gap-1 mb-4"
                  >
                    {formatAddress(wallet.address)}
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {/* Balance */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">5WA Balance</p>
                    {data?.loading || !data ? (
                      <div className="h-8 bg-slate-700/50 rounded animate-pulse"></div>
                    ) : data.error ? (
                      <p className="text-sm text-red-400">{data.error}</p>
                    ) : (
                      <p className="text-2xl font-bold" style={{ color: wallet.color }}>
                        {formatBalance(data.balance!)}
                      </p>
                    )}
                  </div>

                  {/* Recent Transactions */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Recent Transfers</p>
                    {txs.length === 0 ? (
                      <p className="text-xs text-slate-500">No recent transfers</p>
                    ) : (
                      <div className="space-y-1">
                        {txs.slice(0, 3).map((tx) => (
                          <a
                            key={tx.hash}
                            href={`https://bscscan.com/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs p-2 rounded bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-muted-foreground">{formatTimestamp(tx.timeStamp)}</span>
                              <span className="text-accent font-mono">
                                {formatBalance(tx.value)} 5WA
                              </span>
                            </div>
                            <div className="text-slate-500 mt-0.5">
                              {tx.from.toLowerCase() === wallet.address.toLowerCase() ? "→ " : "← "}
                              {formatAddress(tx.from.toLowerCase() === wallet.address.toLowerCase() ? tx.to : tx.from)}
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Burn Verification */}
      <section className="py-12 md:py-16">
        <div className="container max-w-5xl space-y-6">
          {/* Summary */}
          <div className="card-metal p-8 rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-foreground">Burn Verification</h2>
              <span className="ml-auto inline-flex items-center gap-1 px-3 py-1 bg-green-900/40 rounded-full border border-green-700/50 text-green-300 text-xs font-semibold">
                87.5% Burned — Complete
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Original Supply</p>
                <p className="text-lg font-bold text-foreground">8,000,000,000 5WA</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Genesis Burn</p>
                <p className="text-lg font-bold text-red-400">4,000,000,000 5WA</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Strategic Burn</p>
                <p className="text-lg font-bold text-orange-400">3,000,000,000 5WA</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Final Supply</p>
                <p className="text-lg font-bold text-green-400">1,000,000,000 5WA</p>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-2">Burn Address</p>
              <a
                href={`https://bscscan.com/address/${DEAD_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-mono text-xs flex items-center gap-2"
              >
                {DEAD_ADDRESS}
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          </div>

          {/* Genesis Burn Tx */}
          <div className="card-metal p-6 rounded-lg border border-border">
            <p className="text-sm font-semibold text-foreground mb-1">Genesis Burn — 4,000,000,000 5WA</p>
            <p className="text-xs text-muted-foreground mb-2">Burned at token creation</p>
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

          {/* Strategic Burn Tx 1 */}
          <div className="card-metal p-6 rounded-lg border border-orange-800/40">
            <p className="text-sm font-semibold text-foreground mb-1">Strategic Burn Tx 1 — 500,000,000 5WA</p>
            <p className="text-xs text-muted-foreground mb-2">
              From: <a href={`https://bscscan.com/address/${MULTISIG_WALLET}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-mono">{MULTISIG_WALLET.slice(0,10)}...{MULTISIG_WALLET.slice(-6)}</a> (Multi-sig) → Dead Address
            </p>
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

          {/* Strategic Burn Tx 2 */}
          <div className="card-metal p-6 rounded-lg border border-orange-800/40">
            <p className="text-sm font-semibold text-foreground mb-1">Strategic Burn Tx 2 — 2,500,000,000 5WA</p>
            <p className="text-xs text-muted-foreground mb-2">
              From: <a href={`https://bscscan.com/address/${MULTISIG_WALLET}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-mono">{MULTISIG_WALLET.slice(0,10)}...{MULTISIG_WALLET.slice(-6)}</a> (Multi-sig) → Dead Address
            </p>
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
      </section>

      {/* Verification Links */}
      <section className="py-12 md:py-16 bg-card/50">
        <div className="container max-w-5xl">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-accent" />
            Verification Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={`https://bscscan.com/token/${TOKEN_CONTRACT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-metal p-4 rounded-lg border border-border hover:border-accent/50 transition-colors flex items-center gap-3"
            >
              <ExternalLink className="w-5 h-5 text-accent flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">5WA Token Contract</p>
                <p className="text-xs text-muted-foreground">View on BscScan</p>
              </div>
            </a>
            <a
              href="https://bscscan.com/address/0x000000000000000000000000000000000000dEaD"
              target="_blank"
              rel="noopener noreferrer"
              className="card-metal p-4 rounded-lg border border-border hover:border-accent/50 transition-colors flex items-center gap-3"
            >
              <Flame className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Burn Address</p>
                <p className="text-xs text-muted-foreground">Verify burned tokens</p>
              </div>
            </a>
            <a
              href="https://www.pinksale.finance/pinklock/bsc/record/1653235"
              target="_blank"
              rel="noopener noreferrer"
              className="card-metal p-4 rounded-lg border border-border hover:border-accent/50 transition-colors flex items-center gap-3"
            >
              <Lock className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">PinkLock Vesting Record</p>
                <p className="text-xs text-muted-foreground">749,999,390 5WA locked — Record #1653235</p>
              </div>
            </a>
            <a
              href={`https://bscscan.com/tx/${GENESIS_BURN_TX}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-metal p-4 rounded-lg border border-border hover:border-accent/50 transition-colors flex items-center gap-3"
            >
              <Flame className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Genesis Burn Transaction</p>
                <p className="text-xs text-muted-foreground">4B tokens burned</p>
              </div>
            </a>
            <a
              href={`https://bscscan.com/tx/${STRATEGIC_BURN_TX1}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-metal p-4 rounded-lg border border-border hover:border-accent/50 transition-colors flex items-center gap-3"
            >
              <Flame className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Strategic Burn Tx 1</p>
                <p className="text-xs text-muted-foreground">500M tokens burned</p>
              </div>
            </a>
            <a
              href={`https://bscscan.com/tx/${STRATEGIC_BURN_TX2}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-metal p-4 rounded-lg border border-border hover:border-accent/50 transition-colors flex items-center gap-3"
            >
              <Flame className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Strategic Burn Tx 2</p>
                <p className="text-xs text-muted-foreground">2.5B tokens burned</p>
              </div>
            </a>
            <a
              href={`https://bscscan.com/address/${MULTISIG_WALLET}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card-metal p-4 rounded-lg border border-border hover:border-accent/50 transition-colors flex items-center gap-3"
            >
              <ExternalLink className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground text-sm">Multi-sig Governance Wallet</p>
                <p className="text-xs text-muted-foreground">Ecosystem governance &amp; fund management</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Transparency Note */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl text-center">
          <p className="text-muted-foreground text-sm">
            All data is fetched directly from the BNB Smart Chain. You can independently verify any information
            by clicking the BscScan links above. Trust stems from unalterable transparency.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

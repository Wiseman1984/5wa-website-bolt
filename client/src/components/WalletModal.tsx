import { useWalletContext, type SolanaWallet } from "@/lib/walletProvider";
import { X, Wallet as WalletIcon } from "lucide-react";
import { useState } from "react";

export function WalletModal() {
  const { wallets, connect, modalOpen, setModalOpen } = useWalletContext();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!modalOpen) return null;

  const handleSelect = async (wallet: SolanaWallet) => {
    setError(null);
    setConnecting(wallet.name);
    try {
      await connect(wallet);
      setModalOpen(false);
    } catch {
      setError("Connection rejected. Please try again.");
    } finally {
      setConnecting(null);
    }
  };

  const ordered = [...wallets].sort((a) => (a.isPhantom ? -1 : 0));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
      <div className="w-full max-w-sm rounded-2xl border border-cyan-400/25 bg-[#0B1120] p-6 shadow-[0_0_40px_rgba(0,217,245,0.12)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-100">
            <WalletIcon className="h-5 w-5 text-cyan-400" /> Connect Wallet
          </h2>
          <button onClick={() => setModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">Sign a free message to verify your identity. No gas, no transactions.</p>

        {ordered.length === 0 ? (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5 text-center">
            <p className="text-sm text-slate-400">No Solana wallet detected.</p>
            <p className="mt-2 text-xs text-slate-500">
              Install{" "}
              <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">Phantom</a>,{" "}
              <a href="https://solflare.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">Solflare</a>,{" "}
              <a href="https://www.backpack.app/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">Backpack</a>, or{" "}
              <a href="https://www.okx.com/web3" target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline">OKX</a>.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {ordered.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => handleSelect(wallet)}
                disabled={connecting !== null}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/5 disabled:opacity-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10">
                  {wallet.icon ? <img src={wallet.icon} alt={wallet.name} className="h-8 w-8 rounded-lg" /> : <WalletIcon className="h-5 w-5 text-cyan-300" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-100">{wallet.name}</p>
                  {connecting === wallet.name && <p className="text-xs text-cyan-300">Connecting…</p>}
                </div>
              </button>
            ))}
          </div>
        )}

        {error && <p className="mt-4 text-center text-xs text-red-300">{error}</p>}
      </div>
    </div>
  );
}

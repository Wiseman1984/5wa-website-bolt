import { useState } from "react";
import logoSrc from "@/coinlogo.png";
import { Menu, X, Wallet } from "lucide-react";
import { useWalletContext } from "@/lib/walletProvider";
import { WalletModal } from "@/components/WalletModal";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Museum", href: "/museum" },
  { label: "Defense Hub", href: "/defense-hub" },
  { label: "Roadmap & Manifesto", href: "/roadmap" },
];

function navigate(href: string) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function shortenAddress(addr: string): string {
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { publicKey, connected, disconnect, setModalOpen } = useWalletContext();

  const handleConnect = () => setModalOpen(true);
  const handleDisconnect = () => disconnect();

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-400/15 bg-[var(--bg-surface)]/90 backdrop-blur-xl">
      <div className="container max-w-5xl flex min-h-16 items-center justify-between gap-4">
        <a href="/" onClick={(event) => { event.preventDefault(); navigate("/"); }} className="flex items-center gap-3">
          <img src={logoSrc} alt="$5WA Logo" className="h-11 w-11 object-contain" />
          <span className="hidden text-sm font-bold tracking-wide text-[var(--text-primary)] sm:inline">$5 Wrench Attack</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={(event) => { event.preventDefault(); navigate(item.href); }} className="text-sm font-semibold text-[var(--text-secondary)] transition hover:text-[var(--brand-cyan)]">{item.label}</a>)}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex" aria-label="Community links">
            <a href="https://x.com/5wa_io" target="_blank" rel="noopener noreferrer" aria-label="Follow $5WA on X" title="Follow $5WA on X" className="rounded-lg p-2 text-slate-300 transition hover:bg-white/5 hover:text-white">
              <XSocialIcon />
            </a>
            <a href="https://t.me/+3k90_zDeXIkyMjNl" target="_blank" rel="noopener noreferrer" aria-label="Join the $5WA Telegram" title="Join the $5WA Telegram" className="rounded-lg p-2 text-slate-300 transition hover:bg-cyan-400/10 hover:text-cyan-200">
              <TelegramIcon />
            </a>
          </div>
          {connected && publicKey ? (
            <div className="flex items-center gap-2">
              <span className="hidden rounded-lg border border-cyan-400/35 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-200 sm:inline-flex">
                {shortenAddress(publicKey)}
              </span>
              <button onClick={handleDisconnect} className="hidden items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs font-bold text-red-200 transition hover:bg-red-400/20 sm:flex">
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={handleConnect} className="hidden items-center gap-2 rounded-lg border border-cyan-400/35 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-200 transition hover:bg-cyan-400/20 sm:flex">
              <Wallet className="h-4 w-4" /> Connect Wallet
            </button>
          )}
          <button onClick={() => setOpen((value) => !value)} className="rounded-lg p-2 text-slate-200 hover:bg-white/5 lg:hidden" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <div className="border-t border-cyan-400/15 bg-[#07101d] px-4 py-4 lg:hidden">{navItems.map((item) => <a key={item.href} href={item.href} onClick={(event) => { event.preventDefault(); navigate(item.href); setOpen(false); }} className="block border-b border-white/5 py-3 text-sm font-semibold text-slate-300 last:border-0">{item.label}</a>)}
        <div className="mt-3 flex flex-col gap-3 border-t border-white/5 pt-3">
          {connected && publicKey ? (
            <>
              <span className="text-xs font-bold text-cyan-200">{shortenAddress(publicKey)}</span>
              <button onClick={() => { handleDisconnect(); setOpen(false); }} className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs font-bold text-red-200">Disconnect</button>
            </>
          ) : (
            <button onClick={() => { handleConnect(); setOpen(false); }} className="flex items-center gap-2 rounded-lg border border-cyan-400/35 bg-cyan-400/10 px-3 py-2 text-xs font-bold text-cyan-200">
              <Wallet className="h-4 w-4" /> Connect Wallet
            </button>
          )}
          <div className="flex items-center gap-2">
            <a href="https://x.com/5wa_io" target="_blank" rel="noopener noreferrer" aria-label="Follow $5WA on X" className="rounded-lg p-2 text-slate-300 hover:bg-white/5 hover:text-white"><XSocialIcon /></a>
            <a href="https://t.me/+3k90_zDeXIkyMjNl" target="_blank" rel="noopener noreferrer" aria-label="Join the $5WA Telegram" className="rounded-lg p-2 text-slate-300 hover:bg-cyan-400/10 hover:text-cyan-200"><TelegramIcon /></a>
          </div>
        </div>
      </div>}
      <WalletModal />
    </nav>
  );
}

function XSocialIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.42h1.73L8.27 4.46H6.41L17.8 19.42Z" /></svg>;
}

function TelegramIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="m21.8 3.4-3.3 15.54c-.25 1.1-.9 1.37-1.82.85l-5.02-3.7-2.42 2.33c-.27.27-.5.5-1.03.5l.37-5.1 9.28-8.38c.4-.36-.09-.56-.62-.2L5.77 12.52.8 10.97c-1.08-.34-1.1-1.08.23-1.6L20.45 1.7c.9-.34 1.7.21 1.35 1.7Z" /></svg>;
}

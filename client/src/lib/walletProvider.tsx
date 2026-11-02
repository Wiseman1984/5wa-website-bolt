import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface SolanaWallet {
  name: string;
  icon?: string;
  isPhantom?: boolean;
  isSolflare?: boolean;
  isBackpack?: boolean;
  isOKX?: boolean;
  publicKey?: { toString(): string };
  connect: () => Promise<{ publicKey: { toString(): string } }>;
  disconnect: () => Promise<void>;
  signMessage?: (message: Uint8Array) => Promise<Uint8Array>;
  on?: (event: string, handler: () => void) => void;
  off?: (event: string, handler: () => void) => void;
}

interface WalletContextValue {
  wallets: SolanaWallet[];
  connectedWallet: SolanaWallet | null;
  publicKey: string | null;
  connected: boolean;
  connect: (wallet: SolanaWallet) => Promise<void>;
  disconnect: () => void;
  signMessage: (message: Uint8Array) => Promise<Uint8Array | null>;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const WalletContext = createContext<WalletContextValue | null>(null);

declare global {
  interface Window {
    solana?: SolanaWallet;
    solflare?: SolanaWallet;
    backpack?: SolanaWallet;
    okxwallet?: SolanaWallet;
  }
}

function detectWallets(): SolanaWallet[] {
  if (typeof window === "undefined") return [];
  const found: SolanaWallet[] = [];

  if (window.solana?.isPhantom) {
    found.push({ ...window.solana, name: "Phantom", isPhantom: true });
  }
  if (window.solflare) {
    found.push({ ...window.solflare, name: "Solflare", isSolflare: true });
  }
  if (window.backpack) {
    found.push({ ...window.backpack, name: "Backpack", isBackpack: true });
  }
  if (window.okxwallet) {
    found.push({ ...window.okxwallet, name: "OKX Wallet", isOKX: true });
  }

  // Fallback: if window.solana exists but isn't Phantom, still offer it
  if (window.solana && !window.solana.isPhantom && found.length === 0) {
    found.push({ ...window.solana, name: "Solana Wallet" });
  }

  return found;
}

export function WalletContextProvider({ children }: { children: ReactNode }) {
  const [wallets, setWallets] = useState<SolanaWallet[]>([]);
  const [connectedWallet, setConnectedWallet] = useState<SolanaWallet | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const detect = () => setWallets(detectWallets());
    detect();
    // Re-detect after a delay in case wallets inject late
    const timer = setTimeout(detect, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-reconnect if wallet already has a public key (page refresh)
  useEffect(() => {
    if (connectedWallet) return;
    for (const w of wallets) {
      if (w.publicKey) {
        setConnectedWallet(w);
        setPublicKey(w.publicKey.toString());
        break;
      }
    }
  }, [wallets, connectedWallet]);

  const connect = useCallback(async (wallet: SolanaWallet) => {
    try {
      const res = await wallet.connect();
      const addr = res.publicKey.toString();
      setConnectedWallet(wallet);
      setPublicKey(addr);
    } catch {
      throw new Error("Connection rejected");
    }
  }, []);

  const disconnect = useCallback(() => {
    if (connectedWallet) {
      void connectedWallet.disconnect().catch(() => {});
    }
    setConnectedWallet(null);
    setPublicKey(null);
  }, [connectedWallet]);

  const signMessage = useCallback(
    async (message: Uint8Array): Promise<Uint8Array | null> => {
      if (!connectedWallet?.signMessage) return null;
      try {
        return await connectedWallet.signMessage(message);
      } catch {
        return null;
      }
    },
    [connectedWallet],
  );

  // Listen for disconnect events from the wallet
  useEffect(() => {
    if (!connectedWallet?.on) return;
    const handleDisconnect = () => {
      setConnectedWallet(null);
      setPublicKey(null);
    };
    connectedWallet.on("disconnect", handleDisconnect);
    return () => {
      connectedWallet.off?.("disconnect", handleDisconnect);
    };
  }, [connectedWallet]);

  const value = useMemo<WalletContextValue>(
    () => ({
      wallets,
      connectedWallet,
      publicKey,
      connected: !!publicKey,
      connect,
      disconnect,
      signMessage,
      modalOpen,
      setModalOpen,
    }),
    [wallets, connectedWallet, publicKey, connect, disconnect, signMessage, modalOpen],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWalletContext(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWalletContext must be used within WalletContextProvider");
  return ctx;
}

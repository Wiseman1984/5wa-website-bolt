import { useCallback, useEffect, useState } from "react";
import { useWalletContext } from "@/lib/walletProvider";
import { FIVE_WA_MINT, SOLANA_RPC_ENDPOINT, buildSignMessage } from "@shared/solanaConfig";

export type HolderStatus =
  | "idle"
  | "connecting"
  | "checking"
  | "verified"
  | "unverified"
  | "no-ca"
  | "error";

export interface HolderState {
  status: HolderStatus;
  address: string | null;
  balance: number;
  message: string;
  signedNonce: string | null;
}

const FIVE_WA_DECIMALS = 9;

export function useSolanaHolder(): HolderState & {
  connect: () => void;
  disconnect: () => void;
  signVerify: () => Promise<string | null>;
} {
  const { publicKey, connected, connect: ctxConnect, disconnect: ctxDisconnect, signMessage } = useWalletContext();

  const [state, setState] = useState<HolderState>({
    status: "idle",
    address: null,
    balance: 0,
    message: "",
    signedNonce: null,
  });

  const checkHolder = useCallback(async (address: string) => {
    if (!FIVE_WA_MINT) {
      setState((prev) => ({
        ...prev,
        status: "no-ca",
        address,
        message: "Official $5WA mint address not published yet.",
      }));
      return;
    }
    setState((prev) => ({ ...prev, status: "checking", message: "Checking on-chain…" }));
    try {
      const body = {
        jsonrpc: "2.0",
        id: 1,
        method: "getParsedTokenAccountsByOwner",
        params: [address, { mint: FIVE_WA_MINT }, { encoding: "jsonParsed" }],
      };
      const response = await fetch(SOLANA_RPC_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      const accounts = data?.result?.value ?? [];
      const balance = accounts.reduce(
        (sum: number, account: { account: { data: { parsed: { info: { tokenAmount: { amount: string } } } } } }) => {
          const amount = Number(account.account?.data?.parsed?.info?.tokenAmount?.amount ?? "0");
          return sum + amount;
        },
        0,
      );
      if (balance > 0) {
        setState((prev) => ({
          ...prev,
          status: "verified",
          balance: balance / Math.pow(10, FIVE_WA_DECIMALS),
          message: "On-chain holder verified.",
        }));
      } else {
        setState((prev) => ({
          ...prev,
          status: "unverified",
          balance: 0,
          message: "No $5WA found in this wallet.",
        }));
      }
    } catch {
      setState((prev) => ({
        ...prev,
        status: "error",
        message: "RPC check failed. Try again.",
      }));
    }
  }, []);

  useEffect(() => {
    if (publicKey) {
      const address = publicKey.toString();
      setState((prev) => ({ ...prev, address }));
      if (state.status === "idle" || state.status === "connecting") {
        void checkHolder(address);
      }
    } else if (!connected) {
      setState({ status: "idle", address: null, balance: 0, message: "", signedNonce: null });
    }
  }, [publicKey, connected]); // eslint-disable-line react-hooks/exhaustive-deps

  const connect = useCallback(() => {
    // Opens the wallet modal via context — caller triggers modal visibility
    setState((prev) => ({ ...prev, status: "connecting", message: "Connecting…" }));
  }, []);

  const disconnect = useCallback(() => {
    ctxDisconnect();
    setState({ status: "idle", address: null, balance: 0, message: "", signedNonce: null });
  }, [ctxDisconnect]);

  const signVerify = useCallback(async (): Promise<string | null> => {
    if (!publicKey) {
      setState((prev) => ({ ...prev, message: "Connect a wallet first." }));
      return null;
    }
    const nonce = crypto.randomUUID();
    const timestamp = Date.now();
    const message = buildSignMessage(publicKey, nonce, timestamp);
    try {
      const encoded = new TextEncoder().encode(message);
      const sig = await signMessage(encoded);
      if (!sig) {
        setState((prev) => ({ ...prev, message: "Wallet does not support message signing." }));
        return null;
      }
      setState((prev) => ({ ...prev, signedNonce: nonce, message: "Identity verified via signed message." }));
      return nonce;
    } catch {
      setState((prev) => ({ ...prev, message: "Signature rejected." }));
      return null;
    }
  }, [publicKey, signMessage]);

  return { ...state, connect, disconnect, signVerify };
}

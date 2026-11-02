export const SOLANA_RPC_ENDPOINT =
  import.meta.env?.VITE_SOLANA_RPC ?? "https://api.mainnet-beta.solana.com";

export const FIVE_WA_MINT =
  import.meta.env?.VITE_FIVE_WA_MINT ?? "";

export const SOLANA_CLUSTER = "mainnet-beta" as const;

export const SIGN_MESSAGE_PREFIX = "Verify 5WA OpSec Audit for Wallet:";

export function buildSignMessage(address: string, nonce: string, timestamp: number): string {
  return `${SIGN_MESSAGE_PREFIX} ${address}\nNonce: ${nonce}\nTimestamp: ${timestamp}`;
}

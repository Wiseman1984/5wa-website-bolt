import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { nacl } from "https://esm.sh/tweetnacl@1.0.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const FIVE_WA_MINT = "6LyTV4cwjcX6Z3M9dJzzyomN5nTcn1epRcXYJbN2pump";
const SOLANA_RPC = "https://api.mainnet-beta.solana.com";
const SIGN_PREFIX = "Verify 5WA OpSec Audit for Wallet:";

interface VerifyBody {
  publicKey: string;
  signature: number[];
  message: string;
  nonce: string;
  timestamp: number;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: VerifyBody = await req.json();
    const { publicKey, signature, message, nonce, timestamp } = body;

    if (!publicKey || !signature || !message || !nonce || !timestamp) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Replay protection: timestamp must be within 5 minutes
    const now = Date.now();
    if (Math.abs(now - timestamp) > 5 * 60 * 1000) {
      return new Response(JSON.stringify({ error: "Signature expired" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify message content matches expected format
    const expectedMessage = `${SIGN_PREFIX} ${publicKey}\nNonce: ${nonce}\nTimestamp: ${timestamp}`;
    if (message !== expectedMessage) {
      return new Response(JSON.stringify({ error: "Message content mismatch" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify signature using nacl
    const messageBytes = new TextEncoder().encode(message);
    const signatureBytes = new Uint8Array(signature);
    const pubkeyBytes = new PublicKey(publicKey).toBytes();

    const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, pubkeyBytes);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Server-side holder check via RPC
    let holderBalance = 0;
    if (FIVE_WA_MINT) {
      const rpcBody = {
        jsonrpc: "2.0",
        id: 1,
        method: "getParsedTokenAccountsByOwner",
        params: [publicKey, { mint: FIVE_WA_MINT }, { encoding: "jsonParsed" }],
      };
      const rpcRes = await fetch(SOLANA_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rpcBody),
      });
      const rpcData = await rpcRes.json();
      const accounts = rpcData?.result?.value ?? [];
      holderBalance = accounts.reduce(
        (sum: number, account: { account: { data: { parsed: { info: { tokenAmount: { amount: string } } } } } }) => {
          return sum + Number(account.account?.data?.parsed?.info?.tokenAmount?.amount ?? "0");
        },
        0,
      );
    }

    return new Response(
      JSON.stringify({
        verified: true,
        publicKey,
        holder: holderBalance > 0,
        balance: holderBalance / 1e9,
        nonce,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Verification failed", detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

// Minimal PublicKey implementation for signature verification
class PublicKey {
  constructor(private value: string) {}

  toBytes(): Uint8Array {
    // Decode base58 to bytes
    const decoded = base58Decode(this.value);
    return decoded;
  }
}

function base58Decode(input: string): Uint8Array {
  const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const bytes: number[] = [];
  for (let i = 0; i < input.length; i++) {
    let carry = ALPHABET.indexOf(input[i]);
    for (let j = 0; j < bytes.length; j++) {
      carry += bytes[j] * 58;
      bytes[j] = carry & 0xff;
      carry >>= 8;
    }
    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }
  // Handle leading zeros
  for (let i = 0; i < input.length && input[i] === "1"; i++) {
    bytes.push(0);
  }
  return new Uint8Array(bytes.reverse());
}

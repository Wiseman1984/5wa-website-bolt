import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function createSafeClient(): SupabaseClient {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn("[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — database features disabled");
    return new Proxy({} as SupabaseClient, {
      get(_target, prop) {
        if (prop === "from") {
          return () => ({
            select: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
            insert: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
            update: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
            delete: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
            upsert: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
          });
        }
        if (prop === "auth") {
          return {
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
            signOut: () => Promise.resolve({ error: null }),
          };
        }
        return undefined;
      },
    });
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export const supabase = createSafeClient();

export interface AirdropSubmission {
  id?: string;
  username: string;
  wallet_address: string;
  tweet_url: string;
  score: number;
  token_reward: number;
  question_ids?: string;
  is_elite?: boolean;
  created_at?: string;
}

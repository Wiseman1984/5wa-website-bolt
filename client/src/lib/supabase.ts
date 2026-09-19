import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface AirdropSubmission {
  id?: string;
  username: string;
  wallet_address: string;
  tweet_url: string;
  score: number;
  token_reward: number;
  question_ids?: string;  // comma-separated question IDs dealt to the user
  is_elite?: boolean;     // whether the hidden elite bonus was triggered
  created_at?: string;
}

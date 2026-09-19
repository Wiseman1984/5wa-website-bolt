import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fpcztzngjapxgxvvpeds.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwY3p0em5namFweGd4dnZwZWRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MzIwNzksImV4cCI6MjA5NDMwODA3OX0.uLERXjLVEhmQqUuNX47QhXqkTQX6e-6FRYraBq-NF6w";

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

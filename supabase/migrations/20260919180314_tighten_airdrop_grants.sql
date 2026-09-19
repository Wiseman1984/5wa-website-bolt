/*
# Tighten airdrop_submissions grants — remove anon SELECT/UPDATE/DELETE

## Summary
The previous migration created the table with RLS enabled and only an INSERT policy.
However, default Postgres grants still gave anon and authenticated roles SELECT, UPDATE, and DELETE privileges on the table.
While RLS policies block anon SELECT (no SELECT policy exists), the grants themselves are unnecessary and should be revoked for defense-in-depth.

## Changes
1. REVOKE SELECT, UPDATE, DELETE from anon and authenticated on airdrop_submissions.
2. GRANT INSERT ONLY to anon and authenticated (they need to submit quiz results).
3. Confirm RLS is enabled and only the INSERT policy exists.

## Security Impact
- anon can INSERT (submit quiz results) — no change to app functionality.
- anon can NOT SELECT, UPDATE, or DELETE — PII fields (username, wallet_address, tweet_url) are fully protected.
- authenticated role has the same restrictions — admin access uses service_role which bypasses RLS.
*/

REVOKE SELECT, UPDATE, DELETE ON airdrop_submissions FROM anon, authenticated;
GRANT INSERT ON airdrop_submissions TO anon, authenticated;

-- Confirm RLS is still enabled
ALTER TABLE airdrop_submissions ENABLE ROW LEVEL SECURITY;

-- Drop and recreate the INSERT policy to ensure it's the only one
DROP POLICY IF EXISTS "anon_insert_airdrop" ON airdrop_submissions;
CREATE POLICY "anon_insert_airdrop" ON airdrop_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

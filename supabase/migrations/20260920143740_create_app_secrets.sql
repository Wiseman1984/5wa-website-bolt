/*
# Create app_secrets table

1. New Tables
   - `app_secrets`
     - `key` (text, primary key) — secret name, e.g. "GROQ_API_KEY"
     - `value` (text, not null) — the secret value
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)
2. Security
   - RLS enabled, NO policies — table is inaccessible via the Data API (anon/authenticated).
   - Only service_role (used by edge functions with SUPABASE_SERVICE_ROLE_KEY) can read it.
3. Seed
   - Insert the GROQ_API_KEY.
*/

CREATE TABLE IF NOT EXISTS app_secrets (
  key text PRIMARY KEY,
  value text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE app_secrets ENABLE ROW LEVEL SECURITY;

-- No RLS policies: anon and authenticated roles cannot access this table.
-- Only service_role bypasses RLS.

INSERT INTO app_secrets (key, value)
VALUES ('GROQ_API_KEY', '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')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

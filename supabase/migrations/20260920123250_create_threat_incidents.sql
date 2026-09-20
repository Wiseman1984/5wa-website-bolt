/*
# Create threat_incidents table (single-tenant, public read)

1. New Tables
  - `threat_incidents`
    - `id` (uuid, primary key)
    - `country` (text, not null)
    - `published_at` (timestamptz, not null)
    - `attack_type` (text, not null)
    - `title` (text, not null)
    - `source_url` (text, nullable)
    - `latitude` (double precision, nullable)
    - `longitude` (double precision, nullable)
    - `severity` (integer, nullable, 1-10)
    - `ai_summary` (text, nullable)
    - `created_at` (timestamptz, default now)

2. Security
  - Enable RLS on `threat_incidents`.
  - Public read (anon + authenticated) — this is intentionally shared data.
  - No insert/update/delete for anon — data managed via admin tooling.

3. Indexes
  - Index on published_at for date-range queries.
  - Index on country for aggregation.
*/

CREATE TABLE IF NOT EXISTS threat_incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  published_at timestamptz NOT NULL,
  attack_type text NOT NULL,
  title text NOT NULL,
  source_url text,
  latitude double precision,
  longitude double precision,
  severity integer CHECK (severity >= 1 AND severity <= 10),
  ai_summary text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_threat_incidents_published_at ON threat_incidents(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_threat_incidents_country ON threat_incidents(country);

ALTER TABLE threat_incidents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_threat_incidents" ON threat_incidents;
CREATE POLICY "anon_select_threat_incidents" ON threat_incidents FOR SELECT
  TO anon, authenticated USING (true);

/*
# Create official travel advisory storage

1. New Tables
- `official_travel_advisories` stores normalized government travel advisories without merging different governments into a shared risk score.
- `official_travel_advisories.id` is the row identifier.
- `official_travel_advisories.source_id` identifies the government feed adapter.
- `official_travel_advisories.source_name` and `source_url` identify the official publisher.
- `official_travel_advisories.destination_country` stores the country-level destination.
- `official_travel_advisories.destination_region` stores a source-provided region when available.
- `official_travel_advisories.original_level` preserves the source's original level text.
- `official_travel_advisories.original_title` and `original_summary` preserve source wording.
- `official_travel_advisories.published_at` stores the advisory publication time.
- `official_travel_advisories.source_updated_at` stores the source's latest update time when available.
- `official_travel_advisories.fetched_at` stores when this system retrieved the record.
- `official_travel_advisories.applicability` explains who the source guidance applies to.
- `official_travel_advisories.data_status` records normal, stale, or incomplete source data.
- `official_travel_advisories.advisory_url` links to the official advisory page.
- `official_travel_advisories.source_record_key` provides stable deduplication while retaining historical versions.
- `advisory_sync_runs` stores one row per source synchronization attempt.
- `advisory_sync_runs.status` records success, partial, or failed runs.
- `advisory_sync_runs.records_seen` and `records_written` provide operational counts.
- `advisory_sync_runs.error_message` stores a short safe diagnostic for the public status display.

2. Security
- Row level security is enabled on both tables.
- Anonymous and authenticated users may read advisory records and safe sync status only.
- Browser roles cannot insert, update, or delete either table; the server-side sync function uses the service role.
- The sync status error field is limited to safe summaries and must not contain credentials or stack traces.

3. Important Notes
- Advisory levels remain source-specific and are never converted into a shared risk score.
- Country-level records must not be presented as city-level advisories.
- Historical rows are retained so changes can be traced across source publication times.
*/

CREATE TABLE IF NOT EXISTS public.official_travel_advisories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id text NOT NULL,
  source_name text NOT NULL,
  source_url text NOT NULL,
  destination_country text NOT NULL,
  destination_region text,
  original_level text NOT NULL,
  original_title text NOT NULL,
  original_summary text,
  published_at timestamptz,
  source_updated_at timestamptz,
  fetched_at timestamptz NOT NULL DEFAULT now(),
  applicability text NOT NULL,
  data_status text NOT NULL DEFAULT 'normal' CHECK (data_status IN ('normal', 'stale', 'incomplete')),
  advisory_url text NOT NULL,
  source_record_key text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS official_travel_advisories_country_idx
  ON public.official_travel_advisories (destination_country, source_id, published_at DESC);

CREATE INDEX IF NOT EXISTS official_travel_advisories_fetched_idx
  ON public.official_travel_advisories (fetched_at DESC);

CREATE TABLE IF NOT EXISTS public.advisory_sync_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  status text NOT NULL CHECK (status IN ('success', 'partial', 'failed')),
  records_seen integer NOT NULL DEFAULT 0 CHECK (records_seen >= 0),
  records_written integer NOT NULL DEFAULT 0 CHECK (records_written >= 0),
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS advisory_sync_runs_source_idx
  ON public.advisory_sync_runs (source_id, started_at DESC);

ALTER TABLE public.official_travel_advisories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisory_sync_runs ENABLE ROW LEVEL SECURITY;

REVOKE INSERT, UPDATE, DELETE ON public.official_travel_advisories FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.advisory_sync_runs FROM anon, authenticated;
GRANT SELECT ON public.official_travel_advisories TO anon, authenticated;
GRANT SELECT ON public.advisory_sync_runs TO anon, authenticated;

DROP POLICY IF EXISTS "Public can read official advisories" ON public.official_travel_advisories;
CREATE POLICY "Public can read official advisories"
  ON public.official_travel_advisories FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Public can read advisory sync status" ON public.advisory_sync_runs;
CREATE POLICY "Public can read advisory sync status"
  ON public.advisory_sync_runs FOR SELECT
  TO anon, authenticated
  USING (true);

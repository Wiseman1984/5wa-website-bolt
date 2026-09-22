/*
# Enable pg_cron and schedule daily threat-sync

1. Extensions
- Enable pg_cron extension in the cron schema (Supabase requirement).
- Enable pg_net extension for outbound HTTP requests.
2. Scheduled job
- Create a cron job that runs every 6 hours, calling the threat-sync Edge Function via net.http_post.
- The Edge Function syncs new threat incidents from the original Supabase project into Bolt database.
3. Notes
- The cron schedule is every 6 hours.
*/

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA cron;
CREATE EXTENSION IF NOT EXISTS pg_net SCHEMA extensions;

SELECT cron.schedule(
  'threat-sync-every-6h',
  '0 */6 * * *',
  $$
    SELECT net.http_post(
      url := 'https://vyihdihilcvppffrzxcd.supabase.co/functions/v1/threat-sync',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5aWhkaWhpbGN2cHBmZnJ6eGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MjUyNjcsImV4cCI6MjEwNTQwMTI2N30._m4b7cFmA_h55itmE942ntIkYyiemUPvxk2JInz--Wo'
      ),
      body := '{}'::jsonb
    );
  $$
);

import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const destUrl = Deno.env.get("SUPABASE_URL")!;
    const destKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const dest = createClient(destUrl, destKey);

    const { data: secretRows, error: secretErr } = await dest
      .from("app_secrets")
      .select("key, value")
      .in("key", ["SOURCE_SUPABASE_URL", "SOURCE_SUPABASE_SERVICE_KEY"]);

    if (secretErr) throw secretErr;

    const secrets: Record<string, string> = {};
    for (const row of secretRows ?? []) {
      secrets[row.key] = row.value;
    }

    const sourceUrl = secrets["SOURCE_SUPABASE_URL"];
    const sourceKey = secrets["SOURCE_SUPABASE_SERVICE_KEY"];

    if (!sourceUrl || !sourceKey) {
      return new Response(
        JSON.stringify({ error: "Source Supabase credentials not configured in app_secrets table" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const source = createClient(sourceUrl, sourceKey);

    const { data: latest, error: latestErr } = await dest
      .from("threat_incidents")
      .select("published_at")
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (latestErr) throw latestErr;

    const sinceDate = latest?.published_at
      ? new Date(latest.published_at as string)
      : new Date("2024-01-01T00:00:00Z");

    const { data: newIncidents, error: fetchErr } = await source
      .from("threat_incidents")
      .select("id, country, published_at, attack_type, title, source_url, latitude, longitude, severity, ai_summary")
      .gte("published_at", sinceDate.toISOString())
      .neq("country", "Unknown")
      .order("published_at", { ascending: true })
      .limit(500);

    if (fetchErr) throw fetchErr;

    if (!newIncidents || newIncidents.length === 0) {
      return new Response(
        JSON.stringify({ synced: 0, message: "No new incidents found", sinceDate: sinceDate.toISOString() }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    let inserted = 0;
    let skipped = 0;

    for (const incident of newIncidents) {
      const { error: upsertErr } = await dest
        .from("threat_incidents")
        .upsert(incident, { onConflict: "id" });

      if (upsertErr) {
        skipped++;
      } else {
        inserted++;
      }
    }

    return new Response(
      JSON.stringify({
        synced: inserted,
        skipped,
        totalChecked: newIncidents.length,
        sinceDate: sinceDate.toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Sync failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

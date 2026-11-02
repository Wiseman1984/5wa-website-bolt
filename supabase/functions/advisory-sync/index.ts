import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SOURCE_ID = "us-state-department";
const SOURCE_NAME = "U.S. Department of State";
const SOURCE_URL = "https://travel.state.gov/_res/rss/TAsTWs.xml";
const APPLICABILITY = "U.S. citizens, nationals, and legal residents";

type ParsedAdvisory = {
  source_id: string;
  source_name: string;
  source_url: string;
  destination_country: string;
  original_level: string;
  original_title: string;
  original_summary: string | null;
  published_at: string;
  source_updated_at: string;
  fetched_at: string;
  applicability: string;
  data_status: "normal";
  advisory_url: string;
  source_record_key: string;
};

function decodeXml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1")
    .replace(/<\/(p|div|li|h[1-6]|br|tr|td|th)\s*>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function readTag(item: string, tag: string): string | null {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXml(match[1]) : null;
}

function parseAdvisories(xml: string, fetchedAt: string): ParsedAdvisory[] {
  const items = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)];
  const advisories: ParsedAdvisory[] = [];

  for (const match of items) {
    const item = match[1];
    const title = readTag(item, "title");
    const link = readTag(item, "link");
    const publishedAt = readTag(item, "pubDate");
    const summary = readTag(item, "description");

    if (!title || !link || !publishedAt || !link.startsWith("https://travel.state.gov/")) {
      continue;
    }

    const separator = title.indexOf(" - ");
    const country = separator > 0 ? title.slice(0, separator).trim() : title.trim();
    const parsedDate = new Date(publishedAt);
    if (!country || Number.isNaN(parsedDate.getTime())) continue;

    const sourceRecordKey = `${SOURCE_ID}:${country}:${parsedDate.toISOString()}:${link}`;
    advisories.push({
      source_id: SOURCE_ID,
      source_name: SOURCE_NAME,
      source_url: SOURCE_URL,
      destination_country: country,
      original_level: separator > 0 ? title.slice(separator + 3).trim() : title.trim(),
      original_title: title,
      original_summary: summary ? stripHtml(summary) : null,
      published_at: parsedDate.toISOString(),
      source_updated_at: parsedDate.toISOString(),
      fetched_at: fetchedAt,
      applicability: APPLICABILITY,
      data_status: "normal",
      advisory_url: link,
      source_record_key: sourceRecordKey,
    });
  }

  return advisories;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const destinationUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!destinationUrl || !serviceRoleKey) return jsonResponse({ error: "Sync service is not configured" }, 500);

  const database = createClient(destinationUrl, serviceRoleKey);
  const startedAt = new Date().toISOString();
  let runId: string | null = null;

  try {
    const { data: run, error: runError } = await database
      .from("advisory_sync_runs")
      .insert({ source_id: SOURCE_ID, started_at: startedAt, status: "failed" })
      .select("id")
      .maybeSingle();
    if (runError || !run?.id) throw new Error("Could not start sync run");
    runId = run.id as string;

    const response = await fetch(SOURCE_URL, {
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!response.ok) throw new Error("Official RSS request failed");

    const xml = await response.text();
    const fetchedAt = new Date().toISOString();
    const advisories = parseAdvisories(xml, fetchedAt);
    if (advisories.length === 0) throw new Error("Official RSS returned no usable advisories");

    const { error: upsertError } = await database
      .from("official_travel_advisories")
      .upsert(advisories, { onConflict: "source_record_key" });
    if (upsertError) throw new Error("Could not store official advisories");

    const { error: statusError } = await database
      .from("official_travel_advisories")
      .update({ data_status: "stale" })
      .eq("source_id", SOURCE_ID)
      .lt("fetched_at", fetchedAt);
    if (statusError) throw new Error("Could not mark older advisory versions");

    const { error: completeError } = await database
      .from("advisory_sync_runs")
      .update({ completed_at: fetchedAt, status: "success", records_seen: advisories.length, records_written: advisories.length, error_message: null })
      .eq("id", runId);
    if (completeError) throw new Error("Could not complete sync run");

    return jsonResponse({ sourceId: SOURCE_ID, status: "success", recordsSeen: advisories.length, fetchedAt });
  } catch (error) {
    console.error("official advisory sync failed", error);
    await database.from("official_travel_advisories").update({ data_status: "stale" }).eq("source_id", SOURCE_ID);
    if (runId) {
      await database
        .from("advisory_sync_runs")
        .update({ completed_at: new Date().toISOString(), status: "failed", error_message: "Official advisory sync failed" })
        .eq("id", runId);
    }
    return jsonResponse({ error: "Official advisory sync failed" }, 502);
  }
});

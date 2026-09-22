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
    const body = await req.json();
    const { p_username, p_wallet_address, p_tweet_url, p_question_ids, p_answers } = body;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data, error } = await supabase.rpc("create_airdrop_entry", {
      p_username,
      p_wallet_address,
      p_tweet_url,
      p_question_ids,
      p_answers,
    });

    if (error) {
      const raw = error.message ?? "";
      let message = "Submission failed. Please check your details and try again.";
      if (raw.includes("duplicate_wallet") || error.code === "23505") {
        message = "This wallet has already submitted. Each wallet address can only participate once.";
      } else if (raw.includes("invalid_wallet")) {
        message = "Invalid wallet address.";
      } else if (raw.includes("invalid_tweet_url")) {
        message = "Please enter a valid tweet URL.";
      } else if (raw.includes("invalid_username")) {
        message = "Please enter a name between 1 and 60 characters.";
      } else if (raw.includes("invalid_session")) {
        message = "This quiz session is out of date. Please reload the page and try again.";
      } else if (raw.includes("invalid_answers")) {
        message = "Some quiz answers could not be verified. Please reload the page and try again.";
      }

      return new Response(JSON.stringify({ error: message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mirror submission to the original Supabase project so the owner can view it
    // in their own dashboard. Best-effort: failures here do not affect the user.
    try {
      const { data: secretRows } = await supabase
        .from("app_secrets")
        .select("key, value")
        .in("key", ["SOURCE_SUPABASE_URL", "SOURCE_SUPABASE_SERVICE_KEY"]);

      const secrets: Record<string, string> = {};
      for (const row of secretRows ?? []) {
        secrets[row.key] = row.value;
      }

      if (secrets["SOURCE_SUPABASE_URL"] && secrets["SOURCE_SUPABASE_SERVICE_KEY"]) {
        const source = createClient(
          secrets["SOURCE_SUPABASE_URL"],
          secrets["SOURCE_SUPABASE_SERVICE_KEY"],
        );

        const result = typeof data === "object" && data !== null ? data : {};
        const score = (result as Record<string, unknown>).score ?? 0;
        const tokenReward = (result as Record<string, unknown>).token_reward ?? 0;
        const isElite = (result as Record<string, unknown>).is_elite ?? false;

        await source.from("airdrop_submissions").insert({
          username: p_username,
          wallet_address: p_wallet_address,
          tweet_url: p_tweet_url,
          score: Number(score),
          token_reward: Number(tokenReward),
          question_ids: (p_question_ids ?? []).join(","),
          is_elite: Boolean(isElite),
        });
      }
    } catch {
      // Mirror is best-effort; do not fail the submission
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Network error. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

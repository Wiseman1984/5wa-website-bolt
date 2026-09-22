// airdrop submission via Supabase JS client — handles type serialization natively
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
      } else {
        message = raw || message;
      }

      return new Response(JSON.stringify({ error: message }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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

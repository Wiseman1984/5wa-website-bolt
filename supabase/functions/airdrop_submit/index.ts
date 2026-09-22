// airdrop submission via direct DB connection — bypasses PostgREST schema cache
import postgres from "npm:postgres@3.4.5";

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

    const connectionString = Deno.env.get("SUPABASE_DB_URL")!;
    const sql = postgres(connectionString, { max: 1 });

    try {
      const rows = await sql`
        SELECT public.submit_airdrop(
          ${p_username}::text,
          ${p_wallet_address}::text,
          ${p_tweet_url}::text,
          ${sql.array(p_question_ids)}::text[],
          ${sql.json(p_answers)}::jsonb
        ) as result
      `;

      await sql.end();

      const result = rows[0]?.result ?? {};
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (dbErr: any) {
      await sql.end();

      const raw = dbErr?.message ?? "";
      let message = "Submission failed. Please check your details and try again.";
      if (raw.includes("duplicate_wallet") || dbErr?.code === "23505") {
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
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Network error. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

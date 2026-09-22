/*
# Force PostgREST schema cache refresh

The submit_airdrop function exists in the database but PostgREST's schema cache
is stale and returns PGRST202. This migration drops and recreates the function
to force PostgREST to refresh its cache. The function body is identical.
*/

DROP FUNCTION IF EXISTS public.submit_airdrop(text, text, text, text[], jsonb);

CREATE FUNCTION public.submit_airdrop(
  p_username text,
  p_wallet_address text,
  p_tweet_url text,
  p_question_ids text[],
  p_answers jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_username text;
  v_wallet text;
  v_tweet text;
  v_ids text[];
  v_known int;
  v_score int;
  v_raw int;
  v_adv int;
  v_int int;
  v_elite boolean;
  v_reward int;
BEGIN
  v_username := btrim(coalesce(p_username, ''));
  IF char_length(v_username) < 1 OR char_length(v_username) > 60 THEN
    RAISE EXCEPTION 'invalid_username';
  END IF;

  v_wallet := lower(btrim(coalesce(p_wallet_address, '')));
  IF v_wallet !~ '^0x[a-f0-9]{40}$' THEN
    RAISE EXCEPTION 'invalid_wallet';
  END IF;

  v_tweet := btrim(coalesce(p_tweet_url, ''));
  IF char_length(v_tweet) > 300
     OR v_tweet !~ '^https?://(twitter\.com|x\.com)/[A-Za-z0-9_]{1,20}/status/[0-9]{1,30}' THEN
    RAISE EXCEPTION 'invalid_tweet_url';
  END IF;

  SELECT array_agg(DISTINCT q) INTO v_ids FROM unnest(coalesce(p_question_ids, '{}')) AS q;
  IF v_ids IS NULL OR array_length(v_ids, 1) <> 6 THEN
    RAISE EXCEPTION 'invalid_session';
  END IF;

  SELECT count(*) INTO v_known FROM public.quiz_answer_key k WHERE k.id = ANY(v_ids);
  IF v_known <> 6 THEN
    RAISE EXCEPTION 'invalid_session';
  END IF;

  IF p_answers IS NULL OR jsonb_typeof(p_answers) <> 'object' THEN
    RAISE EXCEPTION 'invalid_answers';
  END IF;
  IF EXISTS (
    SELECT 1 FROM jsonb_each_text(p_answers) AS a(k, v)
    WHERE NOT (a.k = ANY(v_ids)) OR a.v NOT IN ('A','B','C','D')
  ) THEN
    RAISE EXCEPTION 'invalid_answers';
  END IF;

  SELECT
    count(*) FILTER (WHERE a.v = k.correct_key),
    coalesce(sum(k.reward) FILTER (WHERE a.v = k.correct_key), 0)
  INTO v_score, v_raw
  FROM public.quiz_answer_key k
  LEFT JOIN jsonb_each_text(p_answers) AS a(k2, v) ON a.k2 = k.id
  WHERE k.id = ANY(v_ids);

  SELECT
    count(*) FILTER (WHERE k.difficulty = 'advanced'),
    count(*) FILTER (WHERE k.difficulty = 'intermediate')
  INTO v_adv, v_int
  FROM public.quiz_answer_key k
  WHERE k.id = ANY(v_ids);

  v_elite := (v_score = 6 AND v_adv = 4 AND v_int = 2);
  v_reward := CASE WHEN v_elite THEN 1500 ELSE least(v_raw, 1000) END;

  BEGIN
    INSERT INTO public.airdrop_submissions
      (username, wallet_address, tweet_url, score, token_reward, question_ids, is_elite)
    VALUES
      (v_username, v_wallet, v_tweet, v_score, v_reward, array_to_string(v_ids, ','), v_elite);
  EXCEPTION WHEN unique_violation THEN
    RAISE EXCEPTION 'duplicate_wallet';
  END;

  RETURN jsonb_build_object('score', v_score, 'token_reward', v_reward, 'is_elite', v_elite);
END;
$$;

REVOKE ALL ON FUNCTION public.submit_airdrop(text, text, text, text[], jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_airdrop(text, text, text, text[], jsonb) TO anon, authenticated;

-- ============================================================
-- Run this SQL on your ORIGINAL Supabase project (fpcztzngjapxgxvvpeds)
-- via Supabase Dashboard → SQL Editor
--
-- This creates:
--   1. quiz_answer_key table (private answer key)
--   2. CHECK constraints on airdrop_submissions
--   3. create_airdrop_entry function (server-side scoring)
--
-- Assumes airdrop_submissions and threat_incidents tables already exist.
-- ============================================================

-- 1. Private answer key -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quiz_answer_key (
  id text PRIMARY KEY,
  difficulty text NOT NULL CHECK (difficulty IN ('basic','intermediate','advanced')),
  reward integer NOT NULL CHECK (reward >= 0 AND reward <= 1000),
  correct_key text NOT NULL CHECK (correct_key IN ('A','B','C','D'))
);

ALTER TABLE public.quiz_answer_key ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.quiz_answer_key FROM anon, authenticated;

INSERT INTO public.quiz_answer_key (id, difficulty, reward, correct_key) VALUES
  ('q1','basic',100,'B'),
  ('q2','basic',100,'C'),
  ('q3','basic',100,'C'),
  ('q4','basic',100,'B'),
  ('q5','basic',100,'B'),
  ('q6','basic',100,'C'),
  ('q7','basic',100,'B'),
  ('q8','intermediate',150,'B'),
  ('q9','intermediate',150,'B'),
  ('q10','intermediate',150,'B'),
  ('q11','intermediate',150,'B'),
  ('q12','intermediate',150,'B'),
  ('q13','intermediate',150,'B'),
  ('q14','advanced',200,'B'),
  ('q15','advanced',200,'B'),
  ('q16','advanced',200,'C'),
  ('q17','advanced',200,'B'),
  ('q18','advanced',200,'B')
ON CONFLICT (id) DO UPDATE
  SET difficulty = EXCLUDED.difficulty,
      reward = EXCLUDED.reward,
      correct_key = EXCLUDED.correct_key;

-- 2. Bound the value-bearing columns on airdrop_submissions -----------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'airdrop_score_range') THEN
    ALTER TABLE public.airdrop_submissions
      ADD CONSTRAINT airdrop_score_range CHECK (score >= 0 AND score <= 6);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'airdrop_reward_range') THEN
    ALTER TABLE public.airdrop_submissions
      ADD CONSTRAINT airdrop_reward_range CHECK (token_reward >= 0 AND token_reward <= 1500);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'airdrop_wallet_canonical') THEN
    ALTER TABLE public.airdrop_submissions
      ADD CONSTRAINT airdrop_wallet_canonical CHECK (wallet_address ~ '^0x[a-f0-9]{40}$');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'airdrop_username_len') THEN
    ALTER TABLE public.airdrop_submissions
      ADD CONSTRAINT airdrop_username_len CHECK (char_length(username) BETWEEN 1 AND 60);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'airdrop_tweet_url_len') THEN
    ALTER TABLE public.airdrop_submissions
      ADD CONSTRAINT airdrop_tweet_url_len CHECK (char_length(tweet_url) BETWEEN 1 AND 300);
  END IF;
END $$;

-- 3. Server-side submission function -----------------------------------------
CREATE OR REPLACE FUNCTION public.create_airdrop_entry(
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

REVOKE ALL ON FUNCTION public.create_airdrop_entry(text, text, text, text[], jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_airdrop_entry(text, text, text, text[], jsonb) TO anon, authenticated;

-- 4. Lock down direct client writes on airdrop_submissions ------------------
REVOKE INSERT, UPDATE, DELETE, SELECT ON public.airdrop_submissions FROM anon, authenticated;

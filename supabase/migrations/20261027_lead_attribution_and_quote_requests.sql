-- ═══════════════════════════════════════════════════════════════════════════
-- BlackBox Tech — Phase 4: Lead Attribution & Fast-Quote Migration
-- Run in Supabase SQL Editor (or apply via supabase db push).
-- Idempotent: safe to run multiple times.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1) Add attribution columns to existing lead tables (IF NOT EXISTS = safe re-run)
--    `attribution` stores a JSONB object:
--    { utm_source, utm_medium, utm_campaign, utm_content, utm_term,
--      fbclid, ttclid, gclid, referrer, landing_page, first_seen }

ALTER TABLE public.blackbox_contact_messages
  ADD COLUMN IF NOT EXISTS attribution JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.blackbox_student_registrations
  ADD COLUMN IF NOT EXISTS attribution JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.blackbox_professional_registrations
  ADD COLUMN IF NOT EXISTS attribution JSONB NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.blackbox_build_requests
  ADD COLUMN IF NOT EXISTS attribution JSONB NOT NULL DEFAULT '{}'::jsonb;

-- 1b) n8n sync flag — set to true by the webhook dispatcher once n8n
--     acknowledges the lead (200/2xx). Applied to the 4 existing lead
--     tables here; blackbox_quote_requests gets it after creation below.

ALTER TABLE public.blackbox_contact_messages
  ADD COLUMN IF NOT EXISTS n8n_synced BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.blackbox_student_registrations
  ADD COLUMN IF NOT EXISTS n8n_synced BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.blackbox_professional_registrations
  ADD COLUMN IF NOT EXISTS n8n_synced BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE public.blackbox_build_requests
  ADD COLUMN IF NOT EXISTS n8n_synced BOOLEAN NOT NULL DEFAULT false;

-- 2) New fast-quote funnel table (2-step homepage widget)
CREATE TABLE IF NOT EXISTS public.blackbox_quote_requests (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  category    TEXT,               -- 'build' | 'training'
  interest    TEXT NOT NULL,      -- human-readable selection, e.g. 'Mobile App'
  interest_id TEXT,               -- machine id, e.g. 'mobile-app'
  budget      TEXT,               -- selected budget band
  landing_page TEXT,              -- page the quote was requested from
  attribution JSONB NOT NULL DEFAULT '{}'::jsonb,
  n8n_synced  BOOLEAN NOT NULL DEFAULT false,
  status      TEXT NOT NULL DEFAULT 'new',  -- 'new' | 'contacted' | 'quoted' | 'won' | 'lost'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blackbox_quote_requests_email      ON public.blackbox_quote_requests (email);
CREATE INDEX IF NOT EXISTS idx_blackbox_quote_requests_status     ON public.blackbox_quote_requests (status);
CREATE INDEX IF NOT EXISTS idx_blackbox_quote_requests_created_at ON public.blackbox_quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blackbox_quote_requests_campaign   ON public.blackbox_quote_requests ((attribution->>'utm_campaign'));

-- Safe re-run for environments where blackbox_quote_requests predates n8n_synced.
ALTER TABLE public.blackbox_quote_requests
  ADD COLUMN IF NOT EXISTS n8n_synced BOOLEAN NOT NULL DEFAULT false;

-- 3) Row Level Security — hardened posture (protecting lead PII):
--    anon key may ONLY INSERT (public forms). SELECT/UPDATE/DELETE are
--    restricted to authenticated admins / the service role (bypasses RLS),
--    which the dashboard and n8n_synced writes use server-side.
ALTER TABLE public.blackbox_quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "quote_requests_insert_anon" ON public.blackbox_quote_requests;
CREATE POLICY "quote_requests_insert_anon"
  ON public.blackbox_quote_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Remove any legacy public (anon) read access on quote requests.
DROP POLICY IF EXISTS "quote_requests_select_anon" ON public.blackbox_quote_requests;

DROP POLICY IF EXISTS "quote_requests_select_auth" ON public.blackbox_quote_requests;
CREATE POLICY "quote_requests_select_auth"
  ON public.blackbox_quote_requests FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "quote_requests_update_auth" ON public.blackbox_quote_requests;
CREATE POLICY "quote_requests_update_auth"
  ON public.blackbox_quote_requests FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "quote_requests_delete_auth" ON public.blackbox_quote_requests;
CREATE POLICY "quote_requests_delete_auth"
  ON public.blackbox_quote_requests FOR DELETE
  TO authenticated
  USING (true);

-- 4) Quick verification query (optional — uncomment to run)
-- SELECT table_name, column_name FROM information_schema.columns
-- WHERE column_name = 'attribution' AND table_name LIKE 'blackbox_%';

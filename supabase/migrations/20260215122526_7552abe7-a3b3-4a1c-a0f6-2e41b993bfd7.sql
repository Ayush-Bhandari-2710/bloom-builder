
-- ============================================
-- EVERBLOOM DATABASE SCHEMA
-- ============================================

-- BOUQUETS TABLE
CREATE TABLE public.bouquets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Untitled Bouquet',
  view_mode TEXT NOT NULL DEFAULT 'topDown' CHECK (view_mode IN ('topDown', 'sideView')),
  pot_style TEXT,
  unlock_time TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  view_count INTEGER NOT NULL DEFAULT 0,
  edit_token_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bouquets_published ON public.bouquets(is_published);
CREATE INDEX idx_bouquets_created_at ON public.bouquets(created_at);

-- BOUQUET ITEMS TABLE
CREATE TABLE public.bouquet_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bouquet_id UUID NOT NULL REFERENCES public.bouquets(id) ON DELETE CASCADE,
  flower_type TEXT NOT NULL,
  x DOUBLE PRECISION NOT NULL,
  y DOUBLE PRECISION NOT NULL,
  rotation DOUBLE PRECISION NOT NULL DEFAULT 0,
  scale DOUBLE PRECISION NOT NULL DEFAULT 1,
  z_index INTEGER NOT NULL DEFAULT 0,
  opacity DOUBLE PRECISION NOT NULL DEFAULT 1,
  stem_length DOUBLE PRECISION DEFAULT 1.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bouquet_items_bouquet ON public.bouquet_items(bouquet_id);

-- MESSAGES TABLE
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES public.bouquet_items(id) ON DELETE CASCADE UNIQUE,
  message_text TEXT NOT NULL,
  is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_item ON public.messages(item_id);

-- VIEWS TABLE (Analytics)
CREATE TABLE public.views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bouquet_id UUID NOT NULL REFERENCES public.bouquets(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_hash TEXT NOT NULL
);

CREATE INDEX idx_views_bouquet ON public.views(bouquet_id);

-- PREMIUM VOTES TABLE
CREATE TABLE public.premium_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE public.bouquets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bouquet_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.premium_votes ENABLE ROW LEVEL SECURITY;

-- View for public reads that hides edit_token_hash
CREATE VIEW public.bouquets_public
WITH (security_invoker = on) AS
  SELECT id, title, view_mode, pot_style, unlock_time, is_published,
         published_at, view_count, created_at, updated_at
  FROM public.bouquets;

-- Bouquets: only published ones visible via anon, no direct SELECT exposes token hash
CREATE POLICY "Published bouquets are publicly readable"
  ON public.bouquets FOR SELECT
  USING (is_published = true);

-- Bouquet items: readable if parent bouquet is published
CREATE POLICY "Items of published bouquets are readable"
  ON public.bouquet_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.bouquets
    WHERE bouquets.id = bouquet_items.bouquet_id
    AND bouquets.is_published = true
  ));

-- Messages: readable if parent bouquet is published
CREATE POLICY "Messages of published bouquets are readable"
  ON public.messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.bouquet_items
    JOIN public.bouquets ON bouquets.id = bouquet_items.bouquet_id
    WHERE bouquet_items.id = messages.item_id
    AND bouquets.is_published = true
  ));

-- Views: no public read needed
CREATE POLICY "No public access to views"
  ON public.views FOR SELECT
  USING (false);

-- Premium votes: allow public count reads
CREATE POLICY "Anyone can read vote count"
  ON public.premium_votes FOR SELECT
  USING (true);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bouquets_updated_at
  BEFORE UPDATE ON public.bouquets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bouquet_items_updated_at
  BEFORE UPDATE ON public.bouquet_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

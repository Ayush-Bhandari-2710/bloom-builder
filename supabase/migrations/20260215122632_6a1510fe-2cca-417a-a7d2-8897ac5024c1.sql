
-- Fix update_updated_at_column to set search_path for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

-- Recreate triggers to use the updated function
DROP TRIGGER IF EXISTS update_bouquets_updated_at ON public.bouquets;
DROP TRIGGER IF EXISTS update_bouquet_items_updated_at ON public.bouquet_items;
DROP TRIGGER IF EXISTS update_messages_updated_at ON public.messages;

CREATE TRIGGER update_bouquets_updated_at
  BEFORE UPDATE ON public.bouquets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bouquet_items_updated_at
  BEFORE UPDATE ON public.bouquet_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

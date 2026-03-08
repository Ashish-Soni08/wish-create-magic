
-- Create a public gallery table for user-submitted cards
CREATE TABLE public.gallery_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Make it publicly readable (no auth required to view gallery)
ALTER TABLE public.gallery_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery cards"
  ON public.gallery_cards
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can insert (no auth required for this app)
CREATE POLICY "Anyone can add to gallery"
  ON public.gallery_cards
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

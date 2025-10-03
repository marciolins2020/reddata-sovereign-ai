-- Add slug column to dashboards table
ALTER TABLE public.dashboards 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_dashboards_slug ON public.dashboards(slug);

-- Function to generate URL-friendly slug
CREATE OR REPLACE FUNCTION generate_slug(title TEXT) 
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INT := 0;
BEGIN
  -- Convert to lowercase, replace spaces and special chars with hyphens
  base_slug := lower(regexp_replace(
    regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  ));
  
  -- Trim hyphens from start/end
  base_slug := trim(both '-' from base_slug);
  
  -- Limit length
  base_slug := substring(base_slug from 1 for 50);
  
  -- Add random suffix for uniqueness
  final_slug := base_slug || '-' || substring(md5(random()::text) from 1 for 8);
  
  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Update existing dashboards with slugs
UPDATE public.dashboards 
SET slug = generate_slug(title)
WHERE slug IS NULL;
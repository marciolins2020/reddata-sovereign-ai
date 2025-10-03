-- Fix function security by setting search_path
CREATE OR REPLACE FUNCTION generate_slug(title TEXT) 
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
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
$$;
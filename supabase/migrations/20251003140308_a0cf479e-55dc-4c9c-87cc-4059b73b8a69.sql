-- Drop existing view with SECURITY DEFINER
DROP VIEW IF EXISTS public.public_dashboards_view;

-- Recreate view with SECURITY INVOKER for better security
CREATE VIEW public.public_dashboards_view
WITH (security_invoker = true)
AS SELECT 
  id,
  title,
  description,
  chart_config,
  slug,
  public_share_token,
  created_at,
  updated_at,
  is_public,
  file_id
FROM public.dashboards
WHERE is_public = true;

-- Grant necessary permissions
GRANT SELECT ON public.public_dashboards_view TO anon;
GRANT SELECT ON public.public_dashboards_view TO authenticated;
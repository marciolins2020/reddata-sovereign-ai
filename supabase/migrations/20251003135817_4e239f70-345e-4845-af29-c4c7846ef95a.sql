-- Create a secure view for public dashboards that excludes sensitive user data
CREATE VIEW public.public_dashboards_view AS
SELECT 
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

-- Grant SELECT on the view to all users
GRANT SELECT ON public.public_dashboards_view TO anon;
GRANT SELECT ON public.public_dashboards_view TO authenticated;
-- Fix security warnings: Add search_path to functions

-- Update update_profile_meta function with search_path
CREATE OR REPLACE FUNCTION public.update_profile_meta()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.is_trial_active = (NEW.trial_expires_at > now());
  RETURN NEW;
END;
$$;

-- Update update_updated_at_column function with search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
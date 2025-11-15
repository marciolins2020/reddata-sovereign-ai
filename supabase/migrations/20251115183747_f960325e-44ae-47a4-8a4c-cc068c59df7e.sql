-- Criar tabela para tokens de redefinição de senha
CREATE TABLE public.password_reset_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índice para busca rápida por token
CREATE INDEX idx_password_reset_tokens_token ON public.password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_user_id ON public.password_reset_tokens(user_id);
CREATE INDEX idx_password_reset_tokens_expires_at ON public.password_reset_tokens(expires_at);

-- RLS policies
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Apenas edge functions podem inserir tokens (via service role)
CREATE POLICY "Service role can insert tokens"
ON public.password_reset_tokens
FOR INSERT
TO service_role
WITH CHECK (true);

-- Apenas edge functions podem verificar tokens (via service role)
CREATE POLICY "Service role can read tokens"
ON public.password_reset_tokens
FOR SELECT
TO service_role
USING (true);

-- Apenas edge functions podem marcar tokens como usados (via service role)
CREATE POLICY "Service role can update tokens"
ON public.password_reset_tokens
FOR UPDATE
TO service_role
USING (true);

-- Limpar tokens expirados automaticamente (função auxiliar)
CREATE OR REPLACE FUNCTION public.cleanup_expired_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.password_reset_tokens
  WHERE expires_at < now() - INTERVAL '7 days';
END;
$$;
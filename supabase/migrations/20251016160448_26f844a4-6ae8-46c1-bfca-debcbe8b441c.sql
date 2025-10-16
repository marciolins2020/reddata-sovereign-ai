-- Create public bucket for Open Graph images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('og-images', 'og-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public read access
CREATE POLICY "Public Access to OG Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'og-images');
-- Allow public read access to files associated with public dashboards
CREATE POLICY "Public dashboards files are readable"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'user-files' AND
  EXISTS (
    SELECT 1 FROM public.dashboards d
    JOIN public.uploaded_files uf ON d.file_id = uf.id
    WHERE uf.storage_path = name
    AND d.is_public = true
  )
);
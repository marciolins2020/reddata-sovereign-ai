-- Allow public access to files from public dashboards
CREATE POLICY "Public dashboards files are viewable by all"
ON uploaded_files
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM dashboards
    WHERE dashboards.file_id = uploaded_files.id
    AND dashboards.is_public = true
  )
);

-- Allow public access to storage for files in public dashboards
CREATE POLICY "Public dashboard files in storage are accessible"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'user-files' 
  AND EXISTS (
    SELECT 1 FROM uploaded_files
    JOIN dashboards ON dashboards.file_id = uploaded_files.id
    WHERE uploaded_files.storage_path = name
    AND dashboards.is_public = true
  )
);
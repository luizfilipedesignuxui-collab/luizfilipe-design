DROP POLICY IF EXISTS "Anyone can view media" ON storage.objects;
CREATE POLICY "Admins can list media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media' AND has_role(auth.uid(), 'admin'::app_role));
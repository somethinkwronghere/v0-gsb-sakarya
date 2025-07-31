-- Fix storage RLS policies and create necessary buckets
-- This script addresses storage permission issues

-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('haberler', 'haberler', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('tesisler', 'tesisler', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('etkinlikler', 'etkinlikler', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Disable RLS on storage.objects to allow uploads
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Create permissive policies for storage
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public access" ON storage.objects
  FOR SELECT USING (true);

CREATE POLICY "Allow public deletes" ON storage.objects
  FOR DELETE USING (true);

CREATE POLICY "Allow public updates" ON storage.objects
  FOR UPDATE USING (true);

-- Re-enable RLS with permissive policies
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Ensure buckets are publicly accessible
UPDATE storage.buckets 
SET public = true 
WHERE id IN ('haberler', 'tesisler', 'etkinlikler');

-- Grant necessary permissions
GRANT ALL ON storage.objects TO anon;
GRANT ALL ON storage.buckets TO anon;

-- Create storage buckets for file uploads

-- User avatars bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('user-avatars', 'user-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- News images bucket  
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

-- Facility images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('facility-images', 'facility-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload news images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update news images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete news images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload facility images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update facility images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete facility images" ON storage.objects;

-- Set up storage policies for user-avatars
CREATE POLICY "Public Access for user-avatars" ON storage.objects FOR SELECT USING (bucket_id = 'user-avatars');
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'user-avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'user-avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete own avatar" ON storage.objects FOR DELETE USING (bucket_id = 'user-avatars' AND auth.role() = 'authenticated');

-- Set up storage policies for news-images
CREATE POLICY "Public Access for news-images" ON storage.objects FOR SELECT USING (bucket_id = 'news-images');
CREATE POLICY "Authenticated users can upload news images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'news-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update news images" ON storage.objects FOR UPDATE USING (bucket_id = 'news-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete news images" ON storage.objects FOR DELETE USING (bucket_id = 'news-images' AND auth.role() = 'authenticated');

-- Set up storage policies for facility-images
CREATE POLICY "Public Access for facility-images" ON storage.objects FOR SELECT USING (bucket_id = 'facility-images');
CREATE POLICY "Authenticated users can upload facility images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'facility-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update facility images" ON storage.objects FOR UPDATE USING (bucket_id = 'facility-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete facility images" ON storage.objects FOR DELETE USING (bucket_id = 'facility-images' AND auth.role() = 'authenticated');

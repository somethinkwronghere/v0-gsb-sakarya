-- Eksik sütunları ekle
ALTER TABLE haberler ADD COLUMN IF NOT EXISTS aktif BOOLEAN DEFAULT true;
ALTER TABLE haberler ADD COLUMN IF NOT EXISTS ozet TEXT;
ALTER TABLE haberler ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE haberler ADD COLUMN IF NOT EXISTS kapak_resmi TEXT;
ALTER TABLE haberler ADD COLUMN IF NOT EXISTS kategori VARCHAR(100) DEFAULT 'genel';
ALTER TABLE haberler ADD COLUMN IF NOT EXISTS etiketler TEXT[];

ALTER TABLE tesisler ADD COLUMN IF NOT EXISTS aktif BOOLEAN DEFAULT true;
ALTER TABLE tesisler ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE tesisler ADD COLUMN IF NOT EXISTS guncellenme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE etkinlikler ADD COLUMN IF NOT EXISTS aktif BOOLEAN DEFAULT true;
ALTER TABLE etkinlikler ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

ALTER TABLE kullanicilar ADD COLUMN IF NOT EXISTS aktif BOOLEAN DEFAULT true;

-- RLS'i kapat (sadece kendi tablolarımız için)
ALTER TABLE tesisler DISABLE ROW LEVEL SECURITY;
ALTER TABLE haberler DISABLE ROW LEVEL SECURITY;
ALTER TABLE etkinlikler DISABLE ROW LEVEL SECURITY;
ALTER TABLE kullanicilar DISABLE ROW LEVEL SECURITY;

-- Storage bucket oluştur (eğer yoksa)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage için public policy ekle
CREATE POLICY IF NOT EXISTS "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'news-images');
CREATE POLICY IF NOT EXISTS "Public Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'news-images');
CREATE POLICY IF NOT EXISTS "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'news-images');
CREATE POLICY IF NOT EXISTS "Public Delete" ON storage.objects FOR DELETE USING (bucket_id = 'news-images');

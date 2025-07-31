-- Tesisler tablosu
CREATE TABLE IF NOT EXISTS tesisler (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ad VARCHAR(255) NOT NULL,
    tip VARCHAR(50) NOT NULL CHECK (tip IN ('yurt', 'genclik_merkezi', 'spor_salonu')),
    ilce VARCHAR(100) NOT NULL,
    adres TEXT NOT NULL,
    kapasite INTEGER,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    aciklama TEXT,
    iletisim JSONB,
    olusturulma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncellenme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    foto_url TEXT,
    aktif BOOLEAN DEFAULT true
);

-- Etkinlikler tablosu
CREATE TABLE IF NOT EXISTS etkinlikler (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tesis_id UUID REFERENCES tesisler(id) ON DELETE SET NULL,
    ad VARCHAR(255) NOT NULL,
    tarih TIMESTAMP WITH TIME ZONE NOT NULL,
    yer VARCHAR(255) NOT NULL,
    aciklama TEXT NOT NULL,
    tip VARCHAR(20) NOT NULL CHECK (tip IN ('gecmis', 'gelecek')),
    foto_url TEXT,
    olusturulma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    katilimci_sayisi INTEGER,
    kayit_baslangic TIMESTAMP WITH TIME ZONE,
    kayit_bitis TIMESTAMP WITH TIME ZONE
);

-- Haberler tablosu
CREATE TABLE IF NOT EXISTS haberler (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tesis_id UUID REFERENCES tesisler(id) ON DELETE SET NULL,
    baslik VARCHAR(255) NOT NULL,
    icerik TEXT NOT NULL,
    yayin_tarihi TIMESTAMP WITH TIME ZONE NOT NULL,
    foto_url TEXT,
    olusturulma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    yazar VARCHAR(255),
    etiketler TEXT[]
);

-- Kullanicilar tablosu
CREATE TABLE IF NOT EXISTS kullanicilar (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ad_soyad VARCHAR(255) NOT NULL,
    eposta VARCHAR(255) UNIQUE NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('memur', 'bolge_sorumlusu', 'admin')),
    ilce VARCHAR(100), -- sadece bölge sorumlusu için
    tesis_id UUID REFERENCES tesisler(id) ON DELETE SET NULL, -- sadece memur için
    olusturulma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    aktif BOOLEAN DEFAULT true,
    son_giris TIMESTAMP WITH TIME ZONE
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_tesisler_tip ON tesisler(tip);
CREATE INDEX IF NOT EXISTS idx_tesisler_ilce ON tesisler(ilce);
CREATE INDEX IF NOT EXISTS idx_tesisler_aktif ON tesisler(aktif);
CREATE INDEX IF NOT EXISTS idx_tesisler_slug ON tesisler(slug);

CREATE INDEX IF NOT EXISTS idx_etkinlikler_tarih ON etkinlikler(tarih);
CREATE INDEX IF NOT EXISTS idx_etkinlikler_tip ON etkinlikler(tip);
CREATE INDEX IF NOT EXISTS idx_etkinlikler_tesis_id ON etkinlikler(tesis_id);

CREATE INDEX IF NOT EXISTS idx_haberler_yayin_tarihi ON haberler(yayin_tarihi);
CREATE INDEX IF NOT EXISTS idx_haberler_tesis_id ON haberler(tesis_id);

CREATE INDEX IF NOT EXISTS idx_kullanicilar_rol ON kullanicilar(rol);
CREATE INDEX IF NOT EXISTS idx_kullanicilar_eposta ON kullanicilar(eposta);
CREATE INDEX IF NOT EXISTS idx_kullanicilar_aktif ON kullanicilar(aktif);

-- Trigger for updating guncellenme_tarihi
CREATE OR REPLACE FUNCTION update_guncellenme_tarihi()
RETURNS TRIGGER AS $$
BEGIN
    NEW.guncellenme_tarihi = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tesisler_guncellenme_tarihi
    BEFORE UPDATE ON tesisler
    FOR EACH ROW
    EXECUTE FUNCTION update_guncellenme_tarihi();

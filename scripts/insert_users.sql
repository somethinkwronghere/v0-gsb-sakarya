-- Örnek Kullanıcılar
INSERT INTO kullanicilar (ad_soyad, eposta, rol, ilce, tesis_id, aktif) VALUES
('Admin Kullanıcı', 'admin@gsb.gov.tr', 'admin', NULL, NULL, true),
('Ali Kaya', 'ali.kaya@gsb.gov.tr', 'bolge_sorumlusu', 'Adapazarı', (SELECT id FROM tesisler WHERE slug = 'adapazari-genclik-merkezi'), true),
('Zeynep Arslan', 'zeynep.arslan@gsb.gov.tr', 'memur', 'Serdivan', (SELECT id FROM tesisler WHERE slug = 'serdivan-genclik-merkezi'), true),
('Mehmet Yılmaz', 'mehmet.yilmaz@gsb.gov.tr', 'memur', 'Hendek', (SELECT id FROM tesisler WHERE slug = 'hendek-genclik-merkezi'), true),
('Ayşe Demir', 'ayse.demir@gsb.gov.tr', 'memur', 'Kaynarca', (SELECT id FROM tesisler WHERE slug = 'kaynarca-genclik-merkezi'), true),
('Murat Özdemir', 'murat.ozdemir@gsb.gov.tr', 'bolge_sorumlusu', 'Erenler', (SELECT id FROM tesisler WHERE slug = 'yeni-sakarya-ataturk-stadyumu'), true),
('Ahmet Kara', 'ahmet.kara@gsb.gov.tr', 'memur', 'Adapazarı', (SELECT id FROM tesisler WHERE slug = 'ataturk-kapali-spor-salonu'), true),
('Seda Yılmaz', 'seda.yilmaz@gsb.gov.tr', 'memur', 'Adapazarı', (SELECT id FROM tesisler WHERE slug = 'sakarya-olimpik-yuzme-havuzu'), true);

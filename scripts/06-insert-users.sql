-- Örnek kullanıcı verileri
INSERT INTO kullanicilar (ad_soyad, eposta, rol, ilce, tesis_id, aktif) VALUES
('Admin User', 'admin@sakaryagsim.gov.tr', 'admin', NULL, NULL, true),
('Ali Kaya', 'ali.kaya@sakaryagsim.gov.tr', 'bolge_sorumlusu', 'Adapazarı', NULL, true),
('Zeynep Arslan', 'zeynep.arslan@sakaryagsim.gov.tr', 'bolge_sorumlusu', 'Serdivan', NULL, true),
('Murat Şahin', 'murat.sahin@sakaryagsim.gov.tr', 'memur', NULL, (SELECT id FROM tesisler WHERE slug = 'hendek-genclik-merkezi'), true),
('Osman Çelik', 'osman.celik@sakaryagsim.gov.tr', 'memur', NULL, (SELECT id FROM tesisler WHERE slug = 'ataturk-kapali-spor-salonu'), true),
('Ayhan Demir', 'ayhan.demir@sakaryagsim.gov.tr', 'memur', NULL, (SELECT id FROM tesisler WHERE slug = 'serdivan-spor-salonu'), true);

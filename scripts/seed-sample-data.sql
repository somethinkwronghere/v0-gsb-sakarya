-- Örnek tesis verileri
INSERT INTO tesisler (ad, tip, ilce, adres, kapasite, aciklama, iletisim, slug, aktif) VALUES
-- KYK Yurtları
('Adapazarı Kız Öğrenci Yurdu', 'yurt', 'Adapazarı', 'Yeni Mahalle, Atatürk Caddesi No:45, Adapazarı/Sakarya', 200, 'Modern ve güvenli konaklama imkanları sunan kız öğrenci yurdu. 24 saat güvenlik, çalışma salonları ve sosyal alanlar mevcuttur.', '{"telefon": "0264 275 10 20", "email": "adapazari.kiz@kyk.gov.tr", "yetkili": "Ayşe Demir"}', 'adapazari-kiz-ogrenci-yurdu', true),

('Serdivan Erkek Öğrenci Yurdu', 'yurt', 'Serdivan', 'Kemalpaşa Mahallesi, Üniversite Caddesi No:12, Serdivan/Sakarya', 300, 'Sakarya Üniversitesi yakınında bulunan modern erkek öğrenci yurdu. Spor salonu, kütüphane ve sosyal tesisler bulunmaktadır.', '{"telefon": "0264 295 15 30", "email": "serdivan.erkek@kyk.gov.tr", "yetkili": "Mehmet Yılmaz"}', 'serdivan-erkek-ogrenci-yurdu', true),

('Hendek Karma Öğrenci Yurdu', 'yurt', 'Hendek', 'Cumhuriyet Mahallesi, Milli Egemenlik Caddesi No:78, Hendek/Sakarya', 150, 'Hendek ilçesinde hizmet veren karma öğrenci yurdu. Aile ortamında güvenli konaklama imkanı sunmaktadır.', '{"telefon": "0264 614 25 40", "email": "hendek.karma@kyk.gov.tr", "yetkili": "Fatma Özkan"}', 'hendek-karma-ogrenci-yurdu', true),

-- Gençlik Merkezleri
('Adapazarı Gençlik Merkezi', 'genclik_merkezi', 'Adapazarı', 'Yeni Mahalle, Gençlik Caddesi No:15, Adapazarı/Sakarya', 500, 'Gençlerin sosyal, kültürel ve sportif faaliyetlerde bulunabileceği modern gençlik merkezi. Kurslar, etkinlikler ve sosyal aktiviteler düzenlenmektedir.', '{"telefon": "0264 275 20 30", "email": "adapazari@genclik.gov.tr", "yetkili": "Ali Kaya"}', 'adapazari-genclik-merkezi', true),

('Serdivan Gençlik Merkezi', 'genclik_merkezi', 'Serdivan', 'Kemalpaşa Mahallesi, Gençlik Sokak No:8, Serdivan/Sakarya', 400, 'Üniversite öğrencileri ve gençler için çeşitli sosyal aktiviteler, kurslar ve etkinlikler düzenlenen merkez.', '{"telefon": "0264 295 25 35", "email": "serdivan@genclik.gov.tr", "yetkili": "Zeynep Arslan"}', 'serdivan-genclik-merkezi', true),

('Karasu Gençlik Merkezi', 'genclik_merkezi', 'Karasu', 'Cumhuriyet Mahallesi, Sahil Yolu No:25, Karasu/Sakarya', 200, 'Karasu ilçesinde gençlerin sosyal ve kültürel faaliyetlerde bulunabileceği merkez. Deniz kenarında konumuyla doğa sporları da yapılmaktadır.', '{"telefon": "0264 718 30 45", "email": "karasu@genclik.gov.tr", "yetkili": "Murat Şahin"}', 'karasu-genclik-merkezi', true),

-- Spor Salonları
('Adapazarı Kapalı Spor Salonu', 'spor_salonu', 'Adapazarı', 'Yeni Mahalle, Spor Kompleksi İçi, Adapazarı/Sakarya', 1000, 'Basketbol, voleybol, hentbol gibi salon sporları için modern kapalı spor salonu. Tribün kapasitesi 1000 kişidir.', '{"telefon": "0264 275 30 40", "email": "adapazari.salon@spor.gov.tr", "yetkili": "Osman Çelik"}', 'adapazari-kapali-spor-salonu', true),

('Serdivan Çok Amaçlı Spor Salonu', 'spor_salonu', 'Serdivan', 'Kemalpaşa Mahallesi, Spor Caddesi No:20, Serdivan/Sakarya', 800, 'Çeşitli spor dalları için uygun çok amaçlı spor salonu. Fitness alanı ve grup egzersiz salonları da bulunmaktadır.', '{"telefon": "0264 295 35 50", "email": "serdivan.salon@spor.gov.tr", "yetkili": "Ayhan Demir"}', 'serdivan-cok-amacli-spor-salonu', true),

('Geyve Spor Salonu', 'spor_salonu', 'Geyve', 'Merkez Mahalle, Atatürk Caddesi No:55, Geyve/Sakarya', 400, 'Geyve ilçesinde hizmet veren spor salonu. Basketbol ve voleybol maçları için uygun zemin ve aydınlatmaya sahiptir.', '{"telefon": "0264 512 40 60", "email": "geyve.salon@spor.gov.tr", "yetkili": "Hasan Yıldız"}', 'geyve-spor-salonu', true);

-- Örnek etkinlik verileri
INSERT INTO etkinlikler (tesis_id, ad, tarih, yer, aciklama, tip, katilimci_sayisi, kayit_baslangic, kayit_bitis) VALUES
((SELECT id FROM tesisler WHERE slug = 'adapazari-genclik-merkezi'), 'Gençlik Spor Festivali 2024', '2024-03-15 10:00:00+03', 'Adapazarı Gençlik Merkezi', 'Sakarya genelindeki gençlerin katılacağı büyük spor festivali. Çeşitli spor dallarında yarışmalar ve etkinlikler düzenlenecek.', 'gelecek', 200, '2024-02-01 09:00:00+03', '2024-03-10 17:00:00+03'),

((SELECT id FROM tesisler WHERE slug = 'serdivan-genclik-merkezi'), 'Kültür ve Sanat Gecesi', '2024-02-20 19:00:00+03', 'Serdivan Gençlik Merkezi', 'Gençlerin yeteneklerini sergileyeceği kültür ve sanat gecesi. Müzik, dans ve tiyatro gösterileri yapılacak.', 'gelecek', 150, '2024-01-15 09:00:00+03', '2024-02-15 17:00:00+03'),

((SELECT id FROM tesisler WHERE slug = 'adapazari-kapali-spor-salonu'), 'Basketbol Turnuvası', '2024-01-10 18:00:00+03', 'Adapazarı Kapalı Spor Salonu', 'Sakarya genelindeki takımların katıldığı basketbol turnuvası başarıyla tamamlandı.', 'gecmis', 300, NULL, NULL);

-- Örnek haber verileri
INSERT INTO haberler (tesis_id, baslik, icerik, yayin_tarihi, yazar, etiketler) VALUES
((SELECT id FROM tesisler WHERE slug = 'adapazari-genclik-merkezi'), 'Yeni Kurslar Başlıyor', 'Adapazarı Gençlik Merkezi''nde yeni dönem kursları başlıyor. Müzik, dans, resim ve spor kursları için kayıtlar devam ediyor.', '2024-01-15 10:00:00+03', 'Ali Kaya', ARRAY['kurs', 'kayıt', 'gençlik']),

((SELECT id FROM tesisler WHERE slug = 'serdivan-erkek-ogrenci-yurdu'), 'Yurt Renovasyonu Tamamlandı', 'Serdivan Erkek Öğrenci Yurdu''nda yapılan renovasyon çalışmaları tamamlandı. Odalar yenilendi ve ortak alanlar modernize edildi.', '2024-01-10 14:30:00+03', 'Mehmet Yılmaz', ARRAY['renovasyon', 'yurt', 'modernizasyon']),

(NULL, 'Spor Tesisleri Genişletiliyor', 'Sakarya genelindeki spor tesislerimiz genişletiliyor. Yeni spor salonları ve açık alan tesisleri için çalışmalar devam ediyor.', '2024-01-05 09:00:00+03', 'Genel Koordinatör', ARRAY['spor', 'tesis', 'genişletme']);

-- Örnek kullanıcı verileri (şifreler gerçek uygulamada hash'lenmiş olacak)
INSERT INTO kullanicilar (ad_soyad, eposta, rol, ilce, tesis_id, aktif) VALUES
('Admin User', 'admin@sakaryagsim.gov.tr', 'admin', NULL, NULL, true),
('Ali Kaya', 'ali.kaya@sakaryagsim.gov.tr', 'bolge_sorumlusu', 'Adapazarı', NULL, true),
('Mehmet Yılmaz', 'mehmet.yilmaz@sakaryagsim.gov.tr', 'memur', NULL, (SELECT id FROM tesisler WHERE slug = 'serdivan-erkek-ogrenci-yurdu'), true),
('Ayşe Demir', 'ayse.demir@sakaryagsim.gov.tr', 'memur', NULL, (SELECT id FROM tesisler WHERE slug = 'adapazari-kiz-ogrenci-yurdu'), true);

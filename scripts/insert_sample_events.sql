-- Örnek Etkinlikler
INSERT INTO etkinlikler (tesis_id, ad, tarih, yer, aciklama, tip, katilimci_sayisi, kayit_baslangic, kayit_bitis) VALUES
((SELECT id FROM tesisler WHERE slug = 'adapazari-genclik-merkezi'), 'Gençlik Festivali 2024', '2024-06-15 14:00:00+03', 'Adapazarı Gençlik Merkezi Ana Salon', 'Gençlerin yeteneklerini sergileyeceği büyük festival etkinliği. Müzik, dans, tiyatro gösterileri ve yarışmalar.', 'gelecek', 500, '2024-05-01 09:00:00+03', '2024-06-10 23:59:59+03'),

((SELECT id FROM tesisler WHERE slug = 'serdivan-genclik-merkezi'), 'Teknoloji ve Girişimcilik Zirvesi', '2024-07-20 10:00:00+03', 'Serdivan Gençlik Merkezi Konferans Salonu', 'Genç girişimciler için teknoloji odaklı zirvede başarılı girişimciler deneyimlerini paylaşacak.', 'gelecek', 200, '2024-06-15 09:00:00+03', '2024-07-15 23:59:59+03'),

((SELECT id FROM tesisler WHERE slug = 'yeni-sakarya-ataturk-stadyumu'), 'Sakarya Büyükşehir Belediyespor Maçı', '2024-05-25 19:00:00+03', 'Yeni Sakarya Atatürk Stadyumu', 'Sakarya Büyükşehir Belediyespor''un önemli lig maçı. Taraftarlar için büyük heyecan.', 'gelecek', 25000, '2024-05-10 10:00:00+03', '2024-05-24 18:00:00+03'),

((SELECT id FROM tesisler WHERE slug = 'sakarya-olimpik-yuzme-havuzu'), 'Yüzme Şampiyonası', '2024-08-10 09:00:00+03', 'Sakarya Olimpik Yüzme Havuzu', 'Bölgesel yüzme şampiyonası, farklı yaş kategorilerinde yarışmalar.', 'gelecek', 150, '2024-07-01 09:00:00+03', '2024-08-05 23:59:59+03'),

((SELECT id FROM tesisler WHERE slug = 'hendek-genclik-merkezi'), 'Geleneksel El Sanatları Sergisi', '2024-04-10 10:00:00+03', 'Hendek Gençlik Merkezi Sergi Salonu', 'Yöresel el sanatları sergisi ve workshop etkinlikleri düzenlendi.', 'gecmis', 120, '2024-03-15 09:00:00+03', '2024-04-08 23:59:59+03'),

((SELECT id FROM tesisler WHERE slug = 'sapanca-genclik-merkezi'), 'Doğa Yürüyüşü ve Kamp', '2024-03-25 08:00:00+03', 'Sapanca Gölü Çevresi', 'Sapanca Gölü etrafında doğa yürüyüşü ve kamp etkinliği gerçekleştirildi.', 'gecmis', 80, '2024-03-01 09:00:00+03', '2024-03-20 23:59:59+03'),

((SELECT id FROM tesisler WHERE slug = 'ataturk-kapali-spor-salonu'), 'Basketbol Turnuvası', '2024-09-15 16:00:00+03', 'Atatürk Kapalı Spor Salonu', 'Gençler arası basketbol turnuvası, ödüllü yarışma.', 'gelecek', 300, '2024-08-15 09:00:00+03', '2024-09-10 23:59:59+03'),

((SELECT id FROM tesisler WHERE slug = 'kaynarca-genclik-merkezi'), 'Müzik Dinletisi', '2024-02-14 19:00:00+03', 'Kaynarca Gençlik Merkezi Sahne', 'Sevgililer Günü özel müzik dinletisi düzenlendi.', 'gecmis', 150, '2024-01-20 09:00:00+03', '2024-02-12 23:59:59+03');

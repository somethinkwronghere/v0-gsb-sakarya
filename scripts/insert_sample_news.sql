-- Örnek Haberler
INSERT INTO haberler (tesis_id, baslik, icerik, yayin_tarihi, yazar, etiketler) VALUES
((SELECT id FROM tesisler WHERE slug = 'adapazari-genclik-merkezi'), 'Adapazarı Gençlik Merkezi Yenilendi', 'Adapazarı Gençlik Merkezi kapsamlı bir renovasyon geçirdi. Modern ekipmanlar ve yeni aktivite alanları gençlerin hizmetine sunuldu. Merkez artık daha fazla gence ev sahipliği yapabilecek kapasiteye sahip.', '2024-04-15 10:00:00+03', 'Haber Editörü', ARRAY['yenileme', 'modernizasyon', 'gençlik']),

((SELECT id FROM tesisler WHERE slug = 'serdivan-genclik-merkezi'), 'Serdivan''da Teknoloji Atölyesi Açıldı', 'Serdivan Gençlik Merkezi''nde gençler için teknoloji atölyesi açıldı. Robotik, kodlama ve 3D tasarım kursları başladı. Gençler ücretsiz olarak bu kurslara katılabilecek.', '2024-04-20 14:30:00+03', 'Teknoloji Editörü', ARRAY['teknoloji', 'eğitim', 'robotik', 'kodlama']),

((SELECT id FROM tesisler WHERE slug = 'yeni-sakarya-ataturk-stadyumu'), 'Stadyumda Büyük Konser', 'Yeni Sakarya Atatürk Stadyumu''nda ünlü sanatçıların katılacağı büyük konser düzenlenecek. Biletler yakında satışa çıkacak. 25.000 kişilik kapasiteyle büyük bir etkinlik bekleniyor.', '2024-04-25 16:00:00+03', 'Kültür Editörü', ARRAY['konser', 'müzik', 'etkinlik']),

((SELECT id FROM tesisler WHERE slug = 'sakarya-olimpik-yuzme-havuzu'), 'Yüzme Kursları Başlıyor', 'Sakarya Olimpik Yüzme Havuzu''nda yaz dönemi yüzme kursları başlıyor. Farklı yaş grupları için seviye seviye kurslar düzenlenecek. Kayıtlar başladı.', '2024-05-01 09:00:00+03', 'Spor Editörü', ARRAY['yüzme', 'kurs', 'spor', 'eğitim']),

((SELECT id FROM tesisler WHERE slug = 'hendek-genclik-merkezi'), 'Hendek''te Sanat Sergisi', 'Hendek Gençlik Merkezi''nde yerel sanatçıların eserlerinin sergilendiği sanat sergisi açıldı. Sergi bir ay boyunca ziyaretçilere açık olacak.', '2024-03-30 11:00:00+03', 'Sanat Editörü', ARRAY['sanat', 'sergi', 'kültür']),

((SELECT id FROM tesisler WHERE slug = 'sapanca-genclik-merkezi'), 'Sapanca''da Çevre Bilinci Etkinliği', 'Sapanca Gençlik Merkezi''nde çevre bilinci konulu etkinlik düzenlendi. Gençler doğa koruma konusunda bilinçlendirildi ve ağaç dikimi yapıldı.', '2024-04-05 13:00:00+03', 'Çevre Editörü', ARRAY['çevre', 'doğa', 'bilinç', 'ağaç']);

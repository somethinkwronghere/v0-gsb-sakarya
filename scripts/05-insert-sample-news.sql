-- Örnek haber verileri
INSERT INTO haberler (tesis_id, baslik, icerik, yayin_tarihi, yazar, etiketler) VALUES
((SELECT id FROM tesisler WHERE slug = 'adapazari-genclik-merkezi'), 'Yeni Kurslar Başlıyor', 'Adapazarı Gençlik Merkezi''nde yeni dönem kursları başlıyor. Müzik, dans, resim ve spor kursları için kayıtlar devam ediyor. Gençlerimiz bu kurslar sayesinde yeteneklerini geliştirebilir ve sosyal aktivitelere katılabilirler.', '2024-01-15 10:00:00+03', 'Ali Kaya', ARRAY['kurs', 'kayıt', 'gençlik']),

((SELECT id FROM tesisler WHERE slug = 'arif-nihat-asya-yurdu'), 'Yurt Renovasyonu Tamamlandı', 'Arif Nihat Asya Yurdu''nda yapılan renovasyon çalışmaları tamamlandı. Odalar yenilendi ve ortak alanlar modernize edildi. Öğrencilerimiz artık daha konforlu bir ortamda kalabilecekler.', '2024-01-10 14:30:00+03', 'Yurt Müdürü', ARRAY['renovasyon', 'yurt', 'modernizasyon']),

(NULL, 'Spor Tesisleri Genişletiliyor', 'Sakarya genelindeki spor tesislerimiz genişletiliyor. Yeni spor salonları ve açık alan tesisleri için çalışmalar devam ediyor. Bu yatırımlar sayesinde daha fazla gencimiz spora erişim imkanı bulacak.', '2024-01-05 09:00:00+03', 'Genel Koordinatör', ARRAY['spor', 'tesis', 'genişletme']),

((SELECT id FROM tesisler WHERE slug = 'yeni-sakarya-ataturk-stadyumu'), 'Stadyum Yeni Sezona Hazır', 'Yeni Sakarya Atatürk Stadyumu yeni sezon için bakım ve onarım çalışmaları tamamlandı. Çim bakımı, tribün temizliği ve teknik donanım güncellemeleri yapıldı.', '2024-01-20 11:00:00+03', 'Stadyum Müdürü', ARRAY['stadyum', 'bakım', 'sezon']),

((SELECT id FROM tesisler WHERE slug = 'serdivan-genclik-merkezi'), 'Teknoloji Kursu Açılıyor', 'Serdivan Gençlik Merkezi''nde gençler için ücretsiz teknoloji kursu açılıyor. Web tasarımı, programlama ve dijital pazarlama konularında eğitim verilecek.', '2024-01-25 16:00:00+03', 'Zeynep Arslan', ARRAY['teknoloji', 'kurs', 'eğitim', 'ücretsiz']);

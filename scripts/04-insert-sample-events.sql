-- Örnek etkinlik verileri
INSERT INTO etkinlikler (tesis_id, ad, tarih, yer, aciklama, tip, katilimci_sayisi, kayit_baslangic, kayit_bitis) VALUES
((SELECT id FROM tesisler WHERE slug = 'adapazari-genclik-merkezi'), 'Gençlik Spor Festivali 2024', '2024-03-15 10:00:00+03', 'Adapazarı Gençlik Merkezi', 'Sakarya genelindeki gençlerin katılacağı büyük spor festivali. Çeşitli spor dallarında yarışmalar ve etkinlikler düzenlenecek.', 'gelecek', 200, '2024-02-01 09:00:00+03', '2024-03-10 17:00:00+03'),

((SELECT id FROM tesisler WHERE slug = 'serdivan-genclik-merkezi'), 'Kültür ve Sanat Gecesi', '2024-02-20 19:00:00+03', 'Serdivan Gençlik Merkezi', 'Gençlerin yeteneklerini sergileyeceği kültür ve sanat gecesi. Müzik, dans ve tiyatro gösterileri yapılacak.', 'gelecek', 150, '2024-01-15 09:00:00+03', '2024-02-15 17:00:00+03'),

((SELECT id FROM tesisler WHERE slug = 'ataturk-kapali-spor-salonu'), 'Basketbol Turnuvası', '2024-01-10 18:00:00+03', 'Atatürk Kapalı Spor Salonu', 'Sakarya genelindeki takımların katıldığı basketbol turnuvası başarıyla tamamlandı.', 'gecmis', 300, NULL, NULL),

((SELECT id FROM tesisler WHERE slug = 'yeni-sakarya-ataturk-stadyumu'), 'Futbol Maçı: Sakaryaspor vs Misafir Takım', '2024-02-25 15:00:00+03', 'Yeni Sakarya Atatürk Stadyumu', 'Sakaryaspor''un ev sahipliğinde oynanacak önemli lig maçı.', 'gelecek', 15000, '2024-02-10 10:00:00+03', '2024-02-24 23:59:00+03'),

((SELECT id FROM tesisler WHERE slug = 'sakarya-olimpik-yuzme-havuzu'), 'Yüzme Yarışması', '2024-03-05 09:00:00+03', 'Sakarya Olimpik Yüzme Havuzu', 'İl genelindeki yüzücülerin katılacağı yarışma.', 'gelecek', 80, '2024-02-15 09:00:00+03', '2024-03-01 17:00:00+03');

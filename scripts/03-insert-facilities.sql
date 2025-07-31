-- Gerçek tesis verileri
INSERT INTO tesisler (ad, tip, ilce, adres, kapasite, aciklama, iletisim, slug, aktif) VALUES
-- Gençlik Merkezleri
('Adapazarı Gençlik Merkezi', 'genclik_merkezi', 'Adapazarı', 'Yağcılar Mah., Yeni Sakarya Stadyumu Civarı, Adapazarı', 500, 'Gençlerin sosyal, kültürel ve sportif faaliyetlerde bulunabileceği modern gençlik merkezi. Kurslar, etkinlikler ve sosyal aktiviteler düzenlenmektedir.', '{"telefon": "0264 275 20 30", "email": "adapazari@genclik.gov.tr", "yetkili": "Ali Kaya"}', 'adapazari-genclik-merkezi', true),

('Serdivan Gençlik Merkezi', 'genclik_merkezi', 'Serdivan', 'Kemalpaşa Mah., Tokat Dere Cad., Güldeste Sk. No:3, Serdivan', 400, 'Üniversite öğrencileri ve gençler için çeşitli sosyal aktiviteler, kurslar ve etkinlikler düzenlenen merkez.', '{"telefon": "0264 295 25 35", "email": "serdivan@genclik.gov.tr", "yetkili": "Zeynep Arslan"}', 'serdivan-genclik-merkezi', true),

('Hendek Gençlik Merkezi', 'genclik_merkezi', 'Hendek', 'Mahmutbey Mah., 3504. Sok. No:130, Hendek', 300, 'Hendek ilçesinde gençlerin sosyal ve kültürel faaliyetlerde bulunabileceği merkez.', '{"telefon": "0264 614 25 40", "email": "hendek@genclik.gov.tr", "yetkili": "Murat Şahin"}', 'hendek-genclik-merkezi', true),

('Kaynarca Gençlik Merkezi', 'genclik_merkezi', 'Kaynarca', 'Konak Mah., Şehit Gürkan Türk Cad. No:4, Kaynarca', 250, 'Kaynarca ilçesinde gençlik faaliyetleri için hizmet veren merkez.', '{"telefon": "0264 xxx xx xx", "email": "kaynarca@genclik.gov.tr"}', 'kaynarca-genclik-merkezi', true),

('Kocaali Gençlik Merkezi', 'genclik_merkezi', 'Kocaali', 'Ağalar Mah., Cami Sk. No:4, Kocaali', 200, 'Kocaali ilçesinde gençlik faaliyetleri için modern tesis.', '{"telefon": "0264 xxx xx xx", "email": "kocaali@genclik.gov.tr"}', 'kocaali-genclik-merkezi', true),

('Pamukova Gençlik Merkezi', 'genclik_merkezi', 'Pamukova', 'Elperek Mah., Mehmet Akif Cad. No:3, Pamukova', 180, 'Pamukova ilçesinde gençlik faaliyetleri için hizmet veren merkez.', '{"telefon": "0264 xxx xx xx", "email": "pamukova@genclik.gov.tr"}', 'pamukova-genclik-merkezi', true),

('Sapanca Gençlik Merkezi', 'genclik_merkezi', 'Sapanca', 'Rüstempaşa Mah., İstasyon Cad. No:10, Sapanca', 220, 'Sapanca ilçesinde gençlik faaliyetleri için modern merkez.', '{"telefon": "0264 xxx xx xx", "email": "sapanca@genclik.gov.tr"}', 'sapanca-genclik-merkezi', true),

('Taraklı Gençlik Merkezi', 'genclik_merkezi', 'Taraklı', 'Hacımurat Mah., Ankara Cad., Kozcağız Sk. No:18, Taraklı', 150, 'Taraklı ilçesinde gençlik faaliyetleri için hizmet veren merkez.', '{"telefon": "0264 xxx xx xx", "email": "tarakli@genclik.gov.tr"}', 'tarakli-genclik-merkezi', true),

('Erenler Gençlik Merkezi', 'genclik_merkezi', 'Erenler', 'Erenler Mah., 1113. Sok. No:4, Erenler', 300, 'Erenler ilçesinde gençlik faaliyetleri için modern merkez.', '{"telefon": "0264 xxx xx xx", "email": "erenler@genclik.gov.tr"}', 'erenler-genclik-merkezi', true),

-- Spor Salonları ve Tesisleri
('Yeni Sakarya Atatürk Stadyumu', 'spor_salonu', 'Erenler', 'Yağcılar Mah., 15 Temmuz Cad., Erenler', 27000, 'Sakarya''nın en büyük stadyumu. Futbol maçları ve büyük etkinlikler için kullanılır.', '{"telefon": "0264 xxx xx xx", "email": "stadyum@spor.gov.tr"}', 'yeni-sakarya-ataturk-stadyumu', true),

('Atatürk Kapalı Spor Salonu', 'spor_salonu', 'Adapazarı', 'Papuççular Mah., Adnan Menderes Cad. No:118, Adapazarı', 1000, 'Basketbol, voleybol, hentbol gibi salon sporları için modern kapalı spor salonu. Tribün kapasitesi 1000 kişidir.', '{"telefon": "0264 275 30 40", "email": "ataturk.salon@spor.gov.tr", "yetkili": "Osman Çelik"}', 'ataturk-kapali-spor-salonu', true),

('Sakarya Olimpik Yüzme Havuzu', 'spor_salonu', 'Adapazarı', 'Mithatpaşa Mah., Kudüs Cad. No:49, Adapazarı', 500, 'Olimpik standartlarda yüzme havuzu ve su sporları tesisi.', '{"telefon": "0264 275 xx xx", "email": "yuzme@spor.gov.tr"}', 'sakarya-olimpik-yuzme-havuzu', true),

('Serdivan Spor Salonu', 'spor_salonu', 'Serdivan', 'Köprübaşı Mah., Aralık Yolu Cad. No:39/1, Serdivan', 800, 'Çeşitli spor dalları için uygun çok amaçlı spor salonu. Fitness alanı ve grup egzersiz salonları da bulunmaktadır.', '{"telefon": "0264 295 35 50", "email": "serdivan.salon@spor.gov.tr", "yetkili": "Ayhan Demir"}', 'serdivan-spor-salonu', true),

('Yenikent Spor Tesisleri', 'spor_salonu', 'Adapazarı', 'Camili Mah., Üniversite Cad. No:4/1-B, Adapazarı', 600, 'Adapazarı''nda çeşitli spor dalları için modern tesis.', '{"telefon": "0264 xxx xx xx", "email": "yenikent@spor.gov.tr"}', 'yenikent-spor-tesisleri', true),

('Necmi Uztürk Cimnastik Salonu', 'spor_salonu', 'Adapazarı', 'Rüstemler Mah., Dicle Sok. No:5, Adapazarı', 300, 'Cimnastik ve jimnastik sporları için özel olarak tasarlanmış salon.', '{"telefon": "0264 xxx xx xx", "email": "cimnastik@spor.gov.tr"}', 'necmi-uzturk-cimnastik-salonu', true),

('Hendek Yeni Spor Salonu', 'spor_salonu', 'Hendek', 'Yeni Mah., Beştepeler Cad. No:87/A, Hendek', 500, 'Hendek ilçesinde çeşitli spor dalları için modern spor salonu.', '{"telefon": "0264 614 xx xx", "email": "hendek.salon@spor.gov.tr"}', 'hendek-yeni-spor-salonu', true),

('Akyazı Spor Salonu', 'spor_salonu', 'Akyazı', 'Hastane Mah., 6002. Sok. No:6, Akyazı', 400, 'Akyazı ilçesinde spor faaliyetleri için modern salon.', '{"telefon": "0264 xxx xx xx", "email": "akyazi.salon@spor.gov.tr"}', 'akyazi-spor-salonu', true),

('Karasu Spor Salonu', 'spor_salonu', 'Karasu', 'İncilli Mah., 627. Sok. No:7, Karasu', 350, 'Karasu ilçesinde spor faaliyetleri için kapalı salon.', '{"telefon": "0264 718 xx xx", "email": "karasu.salon@spor.gov.tr"}', 'karasu-spor-salonu', true),

('Ferizli Spor Salonu', 'spor_salonu', 'Ferizli', 'İnönü Mah., 81. Sok. No:2/1, Ferizli', 300, 'Ferizli ilçesinde spor faaliyetleri için modern salon.', '{"telefon": "0264 xxx xx xx", "email": "ferizli.salon@spor.gov.tr"}', 'ferizli-spor-salonu', true),

('Söğütlü Spor Salonu', 'spor_salonu', 'Söğütlü', 'Gündoğan Mah., Hürriyet Cad. No:2, Söğütlü', 250, 'Söğütlü ilçesinde spor faaliyetleri için salon.', '{"telefon": "0264 xxx xx xx", "email": "sogutlu.salon@spor.gov.tr"}', 'sogutlu-spor-salonu', true),

('Pamukova Stadı', 'spor_salonu', 'Pamukova', 'Yenice Mah., Çardak Sok., Pamukova', 2000, 'Pamukova ilçesinde futbol ve atletizm için stad tesisi.', '{"telefon": "0264 xxx xx xx", "email": "pamukova.stad@spor.gov.tr"}', 'pamukova-stadi', true),

('Geyve Spor Salonu', 'spor_salonu', 'Geyve', 'Camikebir Mah., Hacı İbrahim Sok. No:2, Geyve', 400, 'Geyve ilçesinde hizmet veren spor salonu. Basketbol ve voleybol maçları için uygun zemin ve aydınlatmaya sahiptir.', '{"telefon": "0264 512 40 60", "email": "geyve.salon@spor.gov.tr", "yetkili": "Hasan Yıldız"}', 'geyve-spor-salonu', true),

('Lütfü Yaman Spor Salonu', 'spor_salonu', 'Arifiye', 'Arifiye Merkez, Arifiye', 600, 'Arifiye''de çeşitli spor dalları için modern spor salonu.', '{"telefon": "0264 xxx xx xx", "email": "lutfu.yaman@spor.gov.tr"}', 'lutfu-yaman-spor-salonu', true),

-- KYK Yurtları
('Abdurrahman Gürses Yurdu', 'yurt', 'Hendek', 'Akova Mah., Sakarya Bulv. No:215, Hendek', 200, 'Modern ve güvenli konaklama imkanları sunan öğrenci yurdu. 24 saat güvenlik, çalışma salonları ve sosyal alanlar mevcuttur.', '{"telefon": "0264 614 xx xx", "email": "hendek.yurt@kyk.gov.tr"}', 'abdurrahman-gurses-yurdu', true),

('Akyazı Yurdu', 'yurt', 'Akyazı', 'Batakköy Mah., D-140 Cad. No:307, Akyazı', 150, 'Akyazı ilçesinde öğrenciler için güvenli konaklama imkanı sunan yurt.', '{"telefon": "0264 xxx xx xx", "email": "akyazi.yurt@kyk.gov.tr"}', 'akyazi-yurdu', true),

('Arif Nihat Asya Yurdu', 'yurt', 'Serdivan', 'Kemalpaşa Mah., 4. Cad. No:1, Serdivan', 300, 'Serdivan''da erkek öğrenciler için modern yurt tesisi. Üniversiteye yakın konumda.', '{"telefon": "0264 295 xx xx", "email": "serdivan.erkek@kyk.gov.tr"}', 'arif-nihat-asya-yurdu', true),

('Ayşe Hümeyra Ökten Yurdu', 'yurt', 'Serdivan', 'Kemalpaşa Mah., 6. Cad., 166. Sk. No:1, Serdivan', 250, 'Serdivan''da kız öğrenciler için modern yurt tesisi. Güvenli ve konforlu konaklama.', '{"telefon": "0264 295 xx xx", "email": "serdivan.kiz@kyk.gov.tr"}', 'ayse-humeyra-okten-yurdu', true),

('Geyve Yurdu', 'yurt', 'Geyve', 'Tepecikler Mah., Mehmet Akif Sok. No:41, Geyve', 120, 'Geyve ilçesinde öğrenciler için konaklama imkanı sunan yurt.', '{"telefon": "0264 512 xx xx", "email": "geyve.yurt@kyk.gov.tr"}', 'geyve-yurdu', true),

('Hendek Yurdu', 'yurt', 'Hendek', 'Akova Mah., 5025. Sk. No:3/A, Hendek', 180, 'Hendek ilçesinde öğrenciler için modern yurt tesisi.', '{"telefon": "0264 614 xx xx", "email": "hendek2.yurt@kyk.gov.tr"}', 'hendek-yurdu', true),

('Karasu Yurdu', 'yurt', 'Karasu', 'Aziziye Mah., 543. Sk. No:20/A-B, Karasu', 160, 'Karasu ilçesinde öğrenciler için konaklama tesisi. Deniz kenarına yakın konumda.', '{"telefon": "0264 718 xx xx", "email": "karasu.yurt@kyk.gov.tr"}', 'karasu-yurdu', true),

('M. Fatih Safitürk Yurdu', 'yurt', 'Arifiye', 'Arifbey Mah., Şehit Gaffar Okkan Cad. No:10/B, Arifiye', 220, 'Arifiye''de öğrenciler için modern konaklama imkanı sunan yurt.', '{"telefon": "0264 xxx xx xx", "email": "arifiye.yurt@kyk.gov.tr"}', 'm-fatih-safiturk-yurdu', true),

('Rahime Sultan Yurdu', 'yurt', 'Serdivan', 'Kemalpaşa Mah., 6. Cad. No:1, Serdivan', 280, 'Serdivan''da kız öğrenciler için güvenli yurt tesisi. Modern olanaklar ve sosyal alanlar.', '{"telefon": "0264 295 xx xx", "email": "rahime.sultan@kyk.gov.tr"}', 'rahime-sultan-yurdu', true),

('Sabahattin Zaim Yurdu', 'yurt', 'Serdivan', 'Esentepe Mah., Akademiyolu Sk. No:5/46, Serdivan', 320, 'Serdivan''da erkek öğrenciler için büyük kapasiteli yurt. Üniversite kampüsüne yakın.', '{"telefon": "0264 295 xx xx", "email": "sabahattin.zaim@kyk.gov.tr"}', 'sabahattin-zaim-yurdu', true),

('Sakarya Yurdu', 'yurt', 'Serdivan', 'Kemalpaşa Mah., Üniversite Cad., 185. Sk. No:3, Serdivan', 350, 'Üniversite yakınında öğrenciler için ana yurt tesisi. En büyük kapasiteli yurt.', '{"telefon": "0264 295 xx xx", "email": "sakarya.yurt@kyk.gov.tr"}', 'sakarya-yurdu', true),

('Sapanca Yurdu', 'yurt', 'Sapanca', 'Balkaya Mah., Balkaya 1. Cad. No:23/1, Sapanca', 140, 'Sapanca ilçesinde öğrenciler için konaklama tesisi. Doğal güzellikler içinde.', '{"telefon": "0264 xxx xx xx", "email": "sapanca.yurt@kyk.gov.tr"}', 'sapanca-yurdu', true);

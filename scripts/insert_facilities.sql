-- Gençlik Merkezleri
INSERT INTO tesisler (ad, tip, ilce, adres, kapasite, aciklama, iletisim, slug, aktif) VALUES
('Adapazarı Gençlik Merkezi', 'genclik_merkezi', 'Adapazarı', 'Yağcılar Mah., Yeni Sakarya Stadyumu Civarı, Adapazarı', 500, 'Gençlerin sosyal, kültürel ve sportif faaliyetlerde bulunabileceği modern gençlik merkezi.', '{"telefon": "0264 275 20 30", "email": "adapazari@genclik.gov.tr", "yetkili": "Ali Kaya"}', 'adapazari-genclik-merkezi', true),

('Serdivan Gençlik Merkezi', 'genclik_merkezi', 'Serdivan', 'Kemalpaşa Mah., Tokat Dere Cad., Güldeste Sk. No:3, Serdivan', 400, 'Üniversite öğrencileri ve gençler için çeşitli sosyal aktiviteler düzenlenen merkez.', '{"telefon": "0264 295 25 35", "email": "serdivan@genclik.gov.tr", "yetkili": "Zeynep Arslan"}', 'serdivan-genclik-merkezi', true),

('Hendek Gençlik Merkezi', 'genclik_merkezi', 'Hendek', 'Mahmutbey Mah., 3504. Sok. No:130, Hendek', 300, 'Hendek ilçesinin gençlik merkezi, çeşitli kurslar ve etkinlikler düzenlenmektedir.', '{"telefon": "0264 614 15 20", "email": "hendek@genclik.gov.tr", "yetkili": "Mehmet Yılmaz"}', 'hendek-genclik-merkezi', true),

('Kaynarca Gençlik Merkezi', 'genclik_merkezi', 'Kaynarca', 'Konak Mah., Şehit Gürkan Türk Cad. No:4, Kaynarca', 250, 'Kaynarca gençlerinin buluşma noktası, spor ve sosyal aktiviteler.', '{"telefon": "0264 792 10 15", "email": "kaynarca@genclik.gov.tr", "yetkili": "Ayşe Demir"}', 'kaynarca-genclik-merkezi', true),

('Kocaali Gençlik Merkezi', 'genclik_merkezi', 'Kocaali', 'Ağalar Mah., Cami Sk. No:4, Kocaali', 200, 'Sahil ilçesi Kocaali''nin gençlik merkezi, deniz sporları ve aktiviteler.', '{"telefon": "0264 856 12 30", "email": "kocaali@genclik.gov.tr", "yetkili": "Fatma Özkan"}', 'kocaali-genclik-merkezi', true),

('Pamukova Gençlik Merkezi', 'genclik_merkezi', 'Pamukova', 'Elperek Mah., Mehmet Akif Cad. No:3, Pamukova', 300, 'Pamukova ilçesinin merkezi konumundaki gençlik merkezi.', '{"telefon": "0264 471 18 25", "email": "pamukova@genclik.gov.tr", "yetkili": "Hasan Çelik"}', 'pamukova-genclik-merkezi', true),

('Sapanca Gençlik Merkezi', 'genclik_merkezi', 'Sapanca', 'Rüstempaşa Mah., İstasyon Cad. No:10, Sapanca', 350, 'Sapanca Gölü manzaralı gençlik merkezi, doğa sporları ve aktiviteler.', '{"telefon": "0264 582 14 40", "email": "sapanca@genclik.gov.tr", "yetkili": "Elif Kaya"}', 'sapanca-genclik-merkezi', true),

('Taraklı Gençlik Merkezi', 'genclik_merkezi', 'Taraklı', 'Hacımurat Mah., Ankara Cad., Kozcağız Sk. No:18, Taraklı', 200, 'Tarihi Taraklı ilçesinin gençlik merkezi, kültürel etkinlikler ağırlıklı.', '{"telefon": "0264 491 16 50", "email": "tarakli@genclik.gov.tr", "yetkili": "Osman Yıldız"}', 'tarakli-genclik-merkezi', true),

('Erenler Gençlik Merkezi', 'genclik_merkezi', 'Erenler', 'Erenler Mah., 1113. Sok. No:4, Erenler', 400, 'Erenler ilçesinin modern gençlik merkezi, teknoloji odaklı aktiviteler.', '{"telefon": "0264 225 18 60", "email": "erenler@genclik.gov.tr", "yetkili": "Burcu Aydın"}', 'erenler-genclik-merkezi', true),

-- Spor Salonları ve Tesisleri
('Yeni Sakarya Atatürk Stadyumu', 'spor_salonu', 'Erenler', 'Yağcılar Mah., 15 Temmuz Cad., Erenler', 27000, 'Sakarya''nın ana stadyumu, futbol maçları ve büyük etkinlikler için kullanılır.', '{"telefon": "0264 275 30 00", "email": "stadyum@gsb.gov.tr", "yetkili": "Murat Özdemir"}', 'yeni-sakarya-ataturk-stadyumu', true),

('Atatürk Kapalı Spor Salonu', 'spor_salonu', 'Adapazarı', 'Papuççular Mah., Adnan Menderes Cad. No:118, Adapazarı', 2500, 'Basketbol, voleybol ve diğer salon sporları için modern kapalı spor salonu.', '{"telefon": "0264 275 25 40", "email": "ataturk@gsb.gov.tr", "yetkili": "Ahmet Kara"}', 'ataturk-kapali-spor-salonu', true),

('Sakarya Olimpik Yüzme Havuzu', 'spor_salonu', 'Adapazarı', 'Mithatpaşa Mah., Kudüs Cad. No:49, Adapazarı', 1000, 'Olimpik standartlarda yüzme havuzu, yüzme kursları ve müsabakalar.', '{"telefon": "0264 275 28 50", "email": "yuzme@gsb.gov.tr", "yetkili": "Seda Yılmaz"}', 'sakarya-olimpik-yuzme-havuzu', true),

('Serdivan Spor Salonu', 'spor_salonu', 'Serdivan', 'Köprübaşı Mah., Aralık Yolu Cad. No:39/1, Serdivan', 1500, 'Serdivan ilçesinin ana spor salonu, çok amaçlı kullanım.', '{"telefon": "0264 295 30 60", "email": "serdivan@gsb.gov.tr", "yetkili": "Kemal Özkan"}', 'serdivan-spor-salonu', true),

('Yenikent Spor Tesisleri', 'spor_salonu', 'Adapazarı', 'Camili Mah., Üniversite Cad. No:4/1-B, Adapazarı', 800, 'Yenikent bölgesinin spor tesisleri, fitness ve grup dersleri.', '{"telefon": "0264 275 32 70", "email": "yenikent@gsb.gov.tr", "yetkili": "Gül Aydın"}', 'yenikent-spor-tesisleri', true),

('Necmi Uztürk Cimnastik Salonu', 'spor_salonu', 'Adapazarı', 'Rüstemler Mah., Dicle Sok. No:5, Adapazarı', 500, 'Cimnastik branşına özel salon, artistik ve ritmik cimnastik.', '{"telefon": "0264 275 34 80", "email": "cimnastik@gsb.gov.tr", "yetkili": "Necmi Uztürk"}', 'necmi-uzturk-cimnastik-salonu', true),

('Hendek Yeni Spor Salonu', 'spor_salonu', 'Hendek', 'Yeni Mah., Beştepeler Cad. No:87/A, Hendek', 1200, 'Hendek ilçesinin yeni spor salonu, modern ekipmanlarla donatılmış.', '{"telefon": "0264 614 20 90", "email": "hendekspor@gsb.gov.tr", "yetkili": "İbrahim Çelik"}', 'hendek-yeni-spor-salonu', true),

('Akyazı Spor Salonu', 'spor_salonu', 'Akyazı', 'Hastane Mah., 6002. Sok. No:6, Akyazı', 800, 'Akyazı ilçesinin spor salonu, basketbol ve voleybol sahası.', '{"telefon": "0264 394 15 00", "email": "akyazi@gsb.gov.tr", "yetkili": "Mustafa Demir"}', 'akyazi-spor-salonu', true),

('Karasu Spor Salonu', 'spor_salonu', 'Karasu', 'İncilli Mah., 627. Sok. No:7, Karasu', 600, 'Karasu ilçesinin spor salonu, sahil kenarında konumlanmış.', '{"telefon": "0264 718 12 10", "email": "karasu@gsb.gov.tr", "yetkili": "Deniz Özkan"}', 'karasu-spor-salonu', true),

('Ferizli Spor Salonu', 'spor_salonu', 'Ferizli', 'İnönü Mah., 81. Sok. No:2/1, Ferizli', 400, 'Ferizli ilçesinin spor salonu, küçük ama işlevsel.', '{"telefon": "0264 651 14 20", "email": "ferizli@gsb.gov.tr", "yetkili": "Hüseyin Yıldız"}', 'ferizli-spor-salonu', true),

('Söğütlü Spor Salonu', 'spor_salonu', 'Söğütlü', 'Gündoğan Mah., Hürriyet Cad. No:2, Söğütlü', 500, 'Söğütlü ilçesinin spor salonu, gençlik aktiviteleri merkezi.', '{"telefon": "0264 681 16 30", "email": "sogutlu@gsb.gov.tr", "yetkili": "Ayhan Kaya"}', 'sogutlu-spor-salonu', true),

('Pamukova Stadı', 'spor_salonu', 'Pamukova', 'Yenice Mah., Çardak Sok., Pamukova', 3000, 'Pamukova ilçesinin stadyumu, futbol maçları ve etkinlikler.', '{"telefon": "0264 471 18 40", "email": "pamukovastadi@gsb.gov.tr", "yetkili": "Recep Özdemir"}', 'pamukova-stadi', true),

('Geyve Spor Salonu', 'spor_salonu', 'Geyve', 'Camikebir Mah., Hacı İbrahim Sok. No:2, Geyve', 700, 'Geyve ilçesinin spor salonu, çok amaçlı kullanım alanı.', '{"telefon": "0264 512 19 50", "email": "geyve@gsb.gov.tr", "yetkili": "Selim Çetin"}', 'geyve-spor-salonu', true),

('Lütfü Yaman Spor Salonu', 'spor_salonu', 'Arifiye', 'Arifiye Merkez, Arifiye', 1000, 'Arifiye ilçesinin ana spor salonu, Lütfü Yaman adına ithaf edilmiş.', '{"telefon": "0264 346 21 60", "email": "arifiye@gsb.gov.tr", "yetkili": "Lütfü Yaman"}', 'lutfu-yaman-spor-salonu', true),

-- KYK Yurtları
('Abdurrahman Gürses Yurdu', 'yurt', 'Hendek', 'Akova Mah., Sakarya Bulv. No:215, Hendek', 400, 'Hendek ilçesindeki erkek öğrenci yurdu, modern imkanlarla donatılmış.', '{"telefon": "0264 614 25 70", "email": "hendek@kyk.gov.tr", "yetkili": "Abdurrahman Gürses", "cinsiyet": "erkek"}', 'abdurrahman-gurses-yurdu', true),

('Akyazı Yurdu', 'yurt', 'Akyazı', 'Batakköy Mah., D-140 Cad. No:307, Akyazı', 300, 'Akyazı ilçesindeki karma öğrenci yurdu.', '{"telefon": "0264 394 18 80", "email": "akyazi@kyk.gov.tr", "yetkili": "Mehmet Akyazı", "cinsiyet": "karma"}', 'akyazi-yurdu', true),

('Arif Nihat Asya Yurdu', 'yurt', 'Serdivan', 'Kemalpaşa Mah., 4. Cad. No:1, Serdivan', 600, 'Serdivan ilçesindeki erkek öğrenci yurdu, üniversiteye yakın konumda.', '{"telefon": "0264 295 35 90", "email": "arifnihat@kyk.gov.tr", "yetkili": "Arif Nihat Asya", "cinsiyet": "erkek"}', 'arif-nihat-asya-yurdu', true),

('Ayşe Hümeyra Ökten Yurdu', 'yurt', 'Serdivan', 'Kemalpaşa Mah., 6. Cad., 166. Sk. No:1, Serdivan', 500, 'Serdivan ilçesindeki kız öğrenci yurdu, güvenli ve konforlu.', '{"telefon": "0264 295 37 00", "email": "aysehumeyra@kyk.gov.tr", "yetkili": "Ayşe Hümeyra Ökten", "cinsiyet": "kiz"}', 'ayse-humeyra-okten-yurdu', true),

('Geyve Yurdu', 'yurt', 'Geyve', 'Tepecikler Mah., Mehmet Akif Sok. No:41, Geyve', 250, 'Geyve ilçesindeki öğrenci yurdu, doğal çevrede huzurlu konaklama.', '{"telefon": "0264 512 22 10", "email": "geyve@kyk.gov.tr", "yetkili": "Ahmet Geyve", "cinsiyet": "karma"}', 'geyve-yurdu', true),

('Hendek Yurdu', 'yurt', 'Hendek', 'Akova Mah., 5025. Sk. No:3/A, Hendek', 350, 'Hendek ilçesindeki karma öğrenci yurdu.', '{"telefon": "0264 614 24 20", "email": "hendekyurt@kyk.gov.tr", "yetkili": "Fatma Hendek", "cinsiyet": "karma"}', 'hendek-yurdu', true),

('Karasu Yurdu', 'yurt', 'Karasu', 'Aziziye Mah., 543. Sk. No:20/A-B, Karasu', 300, 'Karasu ilçesindeki öğrenci yurdu, denize yakın konumda.', '{"telefon": "0264 718 15 30", "email": "karasu@kyk.gov.tr", "yetkili": "Deniz Karasu", "cinsiyet": "karma"}', 'karasu-yurdu', true),

('M. Fatih Safitürk Yurdu', 'yurt', 'Arifiye', 'Arifbey Mah., Şehit Gaffar Okkan Cad. No:10/B, Arifiye', 450, 'Arifiye ilçesindeki erkek öğrenci yurdu.', '{"telefon": "0264 346 26 40", "email": "fatihsafiturk@kyk.gov.tr", "yetkili": "M. Fatih Safitürk", "cinsiyet": "erkek"}', 'm-fatih-safiturk-yurdu', true),

('Rahime Sultan Yurdu', 'yurt', 'Serdivan', 'Kemalpaşa Mah., 6. Cad. No:1, Serdivan', 400, 'Serdivan ilçesindeki kız öğrenci yurdu, modern ve güvenli.', '{"telefon": "0264 295 39 50", "email": "rahimesultan@kyk.gov.tr", "yetkili": "Rahime Sultan", "cinsiyet": "kiz"}', 'rahime-sultan-yurdu', true),

('Sabahattin Zaim Yurdu', 'yurt', 'Serdivan', 'Esentepe Mah., Akademiyolu Sk. No:5/46, Serdivan', 500, 'Serdivan ilçesindeki erkek öğrenci yurdu, üniversite kampüsüne çok yakın.', '{"telefon": "0264 295 41 60", "email": "sabahattinzaim@kyk.gov.tr", "yetkili": "Sabahattin Zaim", "cinsiyet": "erkek"}', 'sabahattin-zaim-yurdu', true),

('Sakarya Yurdu', 'yurt', 'Serdivan', 'Kemalpaşa Mah., Üniversite Cad., 185. Sk. No:3, Serdivan', 600, 'Serdivan ilçesindeki ana öğrenci yurdu, karma konaklama.', '{"telefon": "0264 295 43 70", "email": "sakarya@kyk.gov.tr", "yetkili": "Mehmet Sakarya", "cinsiyet": "karma"}', 'sakarya-yurdu', true),

('Sapanca Yurdu', 'yurt', 'Sapanca', 'Balkaya Mah., Balkaya 1. Cad. No:23/1, Sapanca', 350, 'Sapanca ilçesindeki öğrenci yurdu, göl manzaralı konumda.', '{"telefon": "0264 582 18 80", "email": "sapanca@kyk.gov.tr", "yetkili": "Elif Sapanca", "cinsiyet": "karma"}', 'sapanca-yurdu', true);

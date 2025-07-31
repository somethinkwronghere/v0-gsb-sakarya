"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, RefreshCw, Shield, Bell, Database, Globe, Mail, AlertCircle } from "lucide-react"

export default function AdminAyarlarPage() {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  // Genel Ayarlar
  const [siteAdi, setSiteAdi] = useState("Sakarya GSİM Bilgilendirme Platformu")
  const [siteAciklama, setSiteAciklama] = useState("Sakarya Gençlik ve Spor İl Müdürlüğü resmi bilgilendirme platformu")
  const [iletisimEmail, setIletisimEmail] = useState("info@sakaryagsim.gov.tr")
  const [iletisimTelefon, setIletisimTelefon] = useState("0264 275 10 00")

  // Bildirim Ayarları
  const [emailBildirimleri, setEmailBildirimleri] = useState(true)
  const [yeniEtkinlikBildirimi, setYeniEtkinlikBildirimi] = useState(true)
  const [yeniHaberBildirimi, setYeniHaberBildirimi] = useState(true)
  const [sistemBildirimleri, setSistemBildirimleri] = useState(true)

  // Güvenlik Ayarları
  const [ikiFactorAuth, setIkiFactorAuth] = useState(false)
  const [otomatikCikis, setOtomatikCikis] = useState(true)
  const [sifreGecerlilikSuresi, setSifreGecerlilikSuresi] = useState("90")

  // Sistem Ayarları
  const [bakimModu, setBakimModu] = useState(false)
  const [debugModu, setDebugModu] = useState(false)
  const [otomatikYedekleme, setOtomatikYedekleme] = useState(true)

  const handleSave = async (section: string) => {
    setLoading(true)
    try {
      // Simulated save operation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Ayarlar kaydedilirken hata:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sistem Ayarları</h1>
          <p className="text-gray-600">Platform ayarlarını yönetin ve yapılandırın</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
        </div>
      </div>

      {saved && (
        <Alert className="border-green-200 bg-green-50">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">Ayarlar başarıyla kaydedildi!</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="genel" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="genel">Genel</TabsTrigger>
          <TabsTrigger value="bildirimler">Bildirimler</TabsTrigger>
          <TabsTrigger value="guvenlik">Güvenlik</TabsTrigger>
          <TabsTrigger value="sistem">Sistem</TabsTrigger>
        </TabsList>

        <TabsContent value="genel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Site Bilgileri
              </CardTitle>
              <CardDescription>Sitenin genel bilgilerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site-adi">Site Adı</Label>
                  <Input id="site-adi" value={siteAdi} onChange={(e) => setSiteAdi(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iletisim-email">İletişim E-posta</Label>
                  <Input
                    id="iletisim-email"
                    type="email"
                    value={iletisimEmail}
                    onChange={(e) => setIletisimEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-aciklama">Site Açıklaması</Label>
                <Textarea
                  id="site-aciklama"
                  value={siteAciklama}
                  onChange={(e) => setSiteAciklama(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iletisim-telefon">İletişim Telefonu</Label>
                <Input
                  id="iletisim-telefon"
                  value={iletisimTelefon}
                  onChange={(e) => setIletisimTelefon(e.target.value)}
                />
              </div>
              <Button onClick={() => handleSave("genel")} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Ayarları</CardTitle>
              <CardDescription>Arama motoru optimizasyonu ayarları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Meta Anahtar Kelimeler</Label>
                <Input id="meta-keywords" placeholder="sakarya, gençlik, spor, yurt, etkinlik" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Açıklama</Label>
                <Textarea
                  id="meta-description"
                  placeholder="Sakarya Gençlik ve Spor İl Müdürlüğü resmi platformu..."
                  rows={2}
                />
              </div>
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                SEO Ayarlarını Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bildirimler" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Bildirim Ayarları
              </CardTitle>
              <CardDescription>Sistem bildirimlerini yapılandırın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>E-posta Bildirimleri</Label>
                  <p className="text-sm text-gray-600">Sistem e-posta bildirimlerini etkinleştir</p>
                </div>
                <Switch checked={emailBildirimleri} onCheckedChange={setEmailBildirimleri} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Yeni Etkinlik Bildirimi</Label>
                  <p className="text-sm text-gray-600">Yeni etkinlik eklendiğinde bildirim gönder</p>
                </div>
                <Switch checked={yeniEtkinlikBildirimi} onCheckedChange={setYeniEtkinlikBildirimi} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Yeni Haber Bildirimi</Label>
                  <p className="text-sm text-gray-600">Yeni haber yayınlandığında bildirim gönder</p>
                </div>
                <Switch checked={yeniHaberBildirimi} onCheckedChange={setYeniHaberBildirimi} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sistem Bildirimleri</Label>
                  <p className="text-sm text-gray-600">Sistem güncellemeleri ve bakım bildirimleri</p>
                </div>
                <Switch checked={sistemBildirimleri} onCheckedChange={setSistemBildirimleri} />
              </div>

              <Button onClick={() => handleSave("bildirimler")} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Kaydediliyor..." : "Bildirim Ayarlarını Kaydet"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                E-posta Ayarları
              </CardTitle>
              <CardDescription>SMTP ve e-posta gönderim ayarları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Sunucu</Label>
                  <Input id="smtp-host" placeholder="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input id="smtp-port" placeholder="587" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-user">SMTP Kullanıcı Adı</Label>
                  <Input id="smtp-user" placeholder="noreply@sakaryagsim.gov.tr" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-pass">SMTP Şifre</Label>
                  <Input id="smtp-pass" type="password" placeholder="••••••••" />
                </div>
              </div>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Test E-postası Gönder
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guvenlik" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Güvenlik Ayarları
              </CardTitle>
              <CardDescription>Sistem güvenlik ayarlarını yapılandırın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>İki Faktörlü Kimlik Doğrulama</Label>
                  <p className="text-sm text-gray-600">Ek güvenlik katmanı ekler</p>
                </div>
                <Switch checked={ikiFactorAuth} onCheckedChange={setIkiFactorAuth} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Otomatik Çıkış</Label>
                  <p className="text-sm text-gray-600">Hareketsizlik durumunda otomatik çıkış yap</p>
                </div>
                <Switch checked={otomatikCikis} onCheckedChange={setOtomatikCikis} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sifre-gecerlilik">Şifre Geçerlilik Süresi (Gün)</Label>
                <Input
                  id="sifre-gecerlilik"
                  type="number"
                  value={sifreGecerlilikSuresi}
                  onChange={(e) => setSifreGecerlilikSuresi(e.target.value)}
                  className="max-w-32"
                />
                <p className="text-sm text-gray-600">
                  Kullanıcılar bu süre sonunda şifrelerini değiştirmek zorunda kalır
                </p>
              </div>

              <Button onClick={() => handleSave("guvenlik")} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Kaydediliyor..." : "Güvenlik Ayarlarını Kaydet"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Oturum Ayarları</CardTitle>
              <CardDescription>Kullanıcı oturum yönetimi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="oturum-suresi">Oturum Süresi (Dakika)</Label>
                <Input id="oturum-suresi" type="number" defaultValue="60" className="max-w-32" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-giris-denemesi">Maksimum Giriş Denemesi</Label>
                <Input id="max-giris-denemesi" type="number" defaultValue="5" className="max-w-32" />
              </div>
              <Button variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Oturum Ayarlarını Kaydet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistem" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Sistem Ayarları
              </CardTitle>
              <CardDescription>Sistem performansı ve bakım ayarları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bakım Modu</Label>
                  <p className="text-sm text-gray-600">Site bakım moduna alınır, sadece adminler erişebilir</p>
                </div>
                <Switch checked={bakimModu} onCheckedChange={setBakimModu} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Debug Modu</Label>
                  <p className="text-sm text-gray-600">Geliştirici hata mesajlarını göster</p>
                </div>
                <Switch checked={debugModu} onCheckedChange={setDebugModu} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Otomatik Yedekleme</Label>
                  <p className="text-sm text-gray-600">Günlük otomatik veritabanı yedeklemesi</p>
                </div>
                <Switch checked={otomatikYedekleme} onCheckedChange={setOtomatikYedekleme} />
              </div>

              <Button onClick={() => handleSave("sistem")} disabled={loading}>
                <Save className="w-4 h-4 mr-2" />
                {loading ? "Kaydediliyor..." : "Sistem Ayarlarını Kaydet"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Veritabanı İşlemleri</CardTitle>
              <CardDescription>Veritabanı bakım ve optimizasyon işlemleri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Veritabanı Yedekle
                </Button>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Önbelleği Temizle
                </Button>
              </div>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Veritabanı işlemleri sistem performansını etkileyebilir. Yoğun saatlerde yapmayın.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sistem Bilgileri</CardTitle>
              <CardDescription>Mevcut sistem durumu ve bilgileri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Platform Versiyonu:</span>
                    <span className="font-medium">v1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next.js Versiyonu:</span>
                    <span className="font-medium">14.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Supabase Durumu:</span>
                    <span className="font-medium text-green-600">Bağlı</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Son Güncelleme:</span>
                    <span className="font-medium">15 Ocak 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Toplam Kullanıcı:</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aktif Oturum:</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

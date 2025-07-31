"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Download, Calendar, TrendingUp, Users, Building2, FileText, Activity } from "lucide-react"
import { tesisService, etkinlikService, haberService } from "@/lib/supabase"

export default function AdminRaporlarPage() {
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [stats, setStats] = useState({
    tesisler: 0,
    etkinlikler: 0,
    haberler: 0,
    kullanicilar: 5, // Mock data
    aylikEtkinlik: 0,
    aylikHaber: 0,
  })

  const [tesisStats, setTesisStats] = useState({
    yurt: 0,
    genclik_merkezi: 0,
    spor_salonu: 0,
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [tesisler, etkinlikler, haberler] = await Promise.all([
        tesisService.getAll(),
        etkinlikService.getAll(),
        haberService.getAll(),
      ])

      setStats({
        tesisler: tesisler.length,
        etkinlikler: etkinlikler.length,
        haberler: haberler.length,
        kullanicilar: 5,
        aylikEtkinlik: etkinlikler.filter((e) => {
          const etkinlikTarihi = new Date(e.tarih)
          const buAy = new Date()
          return etkinlikTarihi.getMonth() === buAy.getMonth() && etkinlikTarihi.getFullYear() === buAy.getFullYear()
        }).length,
        aylikHaber: haberler.filter((h) => {
          const haberTarihi = new Date(h.yayin_tarihi)
          const buAy = new Date()
          return haberTarihi.getMonth() === buAy.getMonth() && haberTarihi.getFullYear() === buAy.getFullYear()
        }).length,
      })

      setTesisStats({
        yurt: tesisler.filter((t) => t.tip === "yurt").length,
        genclik_merkezi: tesisler.filter((t) => t.tip === "genclik_merkezi").length,
        spor_salonu: tesisler.filter((t) => t.tip === "spor_salonu").length,
      })
    } catch (error) {
      console.error("İstatistikler yüklenirken hata:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = (type: string) => {
    // Mock export functionality
    console.log(`${type} raporu dışa aktarılıyor...`)
    alert(`${type} raporu dışa aktarılıyor. Bu özellik yakında eklenecek.`)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Raporlar yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Raporlar</h1>
          <p className="text-gray-600">Sistem istatistikleri ve raporları</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Bu Hafta</SelectItem>
              <SelectItem value="month">Bu Ay</SelectItem>
              <SelectItem value="quarter">Bu Çeyrek</SelectItem>
              <SelectItem value="year">Bu Yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportReport("Genel")}>
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Ana İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Tesis</p>
                <p className="text-2xl font-bold">{stats.tesisler}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  Aktif tesisler
                </p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Etkinlik</p>
                <p className="text-2xl font-bold">{stats.etkinlikler}</p>
                <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" />
                  Bu ay: {stats.aylikEtkinlik}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Haber</p>
                <p className="text-2xl font-bold">{stats.haberler}</p>
                <p className="text-xs text-purple-600 flex items-center gap-1 mt-1">
                  <FileText className="w-3 h-3" />
                  Bu ay: {stats.aylikHaber}
                </p>
              </div>
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Kullanıcı</p>
                <p className="text-2xl font-bold">{stats.kullanicilar}</p>
                <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                  <Users className="w-3 h-3" />
                  Sistem kullanıcıları
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detaylı Raporlar */}
      <Tabs defaultValue="tesisler" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tesisler">Tesisler</TabsTrigger>
          <TabsTrigger value="etkinlikler">Etkinlikler</TabsTrigger>
          <TabsTrigger value="haberler">Haberler</TabsTrigger>
          <TabsTrigger value="kullanicilar">Kullanıcılar</TabsTrigger>
        </TabsList>

        <TabsContent value="tesisler" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Yurtlar</CardTitle>
                <CardDescription>KYK Yurtları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{tesisStats.yurt}</div>
                <div className="text-sm text-gray-600 mt-2">
                  Toplam kapasite: {tesisStats.yurt * 200} kişi (ortalama)
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full bg-transparent"
                  onClick={() => exportReport("Yurtlar")}
                >
                  <Download className="w-3 h-3 mr-2" />
                  Yurt Raporu
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Gençlik Merkezleri</CardTitle>
                <CardDescription>Sosyal ve kültürel tesisler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{tesisStats.genclik_merkezi}</div>
                <div className="text-sm text-gray-600 mt-2">
                  Toplam kapasite: {tesisStats.genclik_merkezi * 300} kişi (ortalama)
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full bg-transparent"
                  onClick={() => exportReport("Gençlik Merkezleri")}
                >
                  <Download className="w-3 h-3 mr-2" />
                  GM Raporu
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Spor Salonları</CardTitle>
                <CardDescription>Spor tesisleri ve stadyumlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{tesisStats.spor_salonu}</div>
                <div className="text-sm text-gray-600 mt-2">
                  Toplam kapasite: {tesisStats.spor_salonu * 1000} kişi (ortalama)
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full bg-transparent"
                  onClick={() => exportReport("Spor Salonları")}
                >
                  <Download className="w-3 h-3 mr-2" />
                  Spor Raporu
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tesis Dağılım Grafiği */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Tesis Dağılımı
              </CardTitle>
              <CardDescription>Tesis tiplerinin dağılımı</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Yurtlar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(tesisStats.yurt / stats.tesisler) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{tesisStats.yurt}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Gençlik Merkezleri</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(tesisStats.genclik_merkezi / stats.tesisler) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{tesisStats.genclik_merkezi}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Spor Salonları</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(tesisStats.spor_salonu / stats.tesisler) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{tesisStats.spor_salonu}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="etkinlikler" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Etkinlik İstatistikleri</CardTitle>
                <CardDescription>Etkinlik durumu ve dağılımı</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Toplam Etkinlik</span>
                  <span className="font-bold">{stats.etkinlikler}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Bu Ay</span>
                  <span className="font-bold text-green-600">{stats.aylikEtkinlik}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ortalama/Ay</span>
                  <span className="font-bold text-blue-600">{Math.round(stats.etkinlikler / 12)}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                  onClick={() => exportReport("Etkinlikler")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Etkinlik Raporu İndir
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Katılım İstatistikleri</CardTitle>
                <CardDescription>Etkinlik katılım oranları</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600">Ortalama Katılım Oranı</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Yüksek Katılım</span>
                    <span>65%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Orta Katılım</span>
                    <span>25%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Düşük Katılım</span>
                    <span>10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="haberler" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Haber İstatistikleri</CardTitle>
                <CardDescription>Haber yayın durumu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Toplam Haber</span>
                  <span className="font-bold">{stats.haberler}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Bu Ay Yayınlanan</span>
                  <span className="font-bold text-green-600">{stats.aylikHaber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ortalama/Ay</span>
                  <span className="font-bold text-blue-600">{Math.round(stats.haberler / 12)}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                  onClick={() => exportReport("Haberler")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Haber Raporu İndir
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popüler Etiketler</CardTitle>
                <CardDescription>En çok kullanılan haber etiketleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Etkinlik</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full w-full"></div>
                      </div>
                      <span className="text-xs">24</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Duyuru</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                      </div>
                      <span className="text-xs">18</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Spor</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full w-3/5"></div>
                      </div>
                      <span className="text-xs">12</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="kullanicilar" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Kullanıcı Rolleri</CardTitle>
                <CardDescription>Rol dağılımı</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Admin</span>
                  <span className="font-bold text-red-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bölge Sorumlusu</span>
                  <span className="font-bold text-blue-600">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Memur</span>
                  <span className="font-bold text-green-600">2</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aktiflik Durumu</CardTitle>
                <CardDescription>Kullanıcı aktivitesi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Aktif Kullanıcı</span>
                  <span className="font-bold text-green-600">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pasif Kullanıcı</span>
                  <span className="font-bold text-gray-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bu Hafta Giriş</span>
                  <span className="font-bold text-blue-600">3</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sistem Kullanımı</CardTitle>
                <CardDescription>Genel aktivite</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-gray-600">Sistem Kullanım Oranı</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => exportReport("Kullanıcılar")}
                >
                  <Download className="w-3 h-3 mr-2" />
                  Kullanıcı Raporu
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

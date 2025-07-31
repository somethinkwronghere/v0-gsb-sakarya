"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Users, Search, Clock } from "lucide-react"
import Image from "next/image"
import { etkinlikService } from "@/lib/supabase"
import type { IEtkinlik } from "@/lib/types"

export default function EtkinliklerPage() {
  const [etkinlikler, setEtkinlikler] = useState<IEtkinlik[]>([])
  const [filteredEtkinlikler, setFilteredEtkinlikler] = useState<IEtkinlik[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTip, setSelectedTip] = useState<"all" | "gelecek" | "gecmis">("all")
  const [activeTab, setActiveTab] = useState("gelecek")

  useEffect(() => {
    async function fetchEtkinlikler() {
      try {
        const data = await etkinlikService.getAll()
        setEtkinlikler(data)
        setFilteredEtkinlikler(data)
      } catch (error) {
        console.error("Etkinlikler yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEtkinlikler()
  }, [])

  useEffect(() => {
    let filtered = etkinlikler

    // Tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((etkinlik) => etkinlik.tip === activeTab)
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (etkinlik) =>
          etkinlik.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
          etkinlik.yer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          etkinlik.aciklama.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredEtkinlikler(filtered)
  }, [searchTerm, activeTab, etkinlikler])

  const gelecekEtkinlikler = filteredEtkinlikler.filter((e) => e.tip === "gelecek")
  const gecmisEtkinlikler = filteredEtkinlikler.filter((e) => e.tip === "gecmis")

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Etkinlikler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Etkinlikler</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sakarya Gençlik ve Spor İl Müdürlüğü bünyesindeki tesislerde düzenlenen etkinlikleri takip edin. Gelecek
          etkinliklere katılın, geçmiş etkinlikleri inceleyin.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Etkinlik ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="gelecek">Gelecek Etkinlikler ({gelecekEtkinlikler.length})</TabsTrigger>
          <TabsTrigger value="gecmis">Geçmiş Etkinlikler ({gecmisEtkinlikler.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="gelecek">
          {gelecekEtkinlikler.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gelecekEtkinlikler.map((etkinlik) => (
                <Card key={etkinlik.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={
                        etkinlik.foto_url ||
                        `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(etkinlik.ad)}`
                      }
                      alt={etkinlik.ad}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">Gelecek</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{etkinlik.ad}</CardTitle>
                    <CardDescription className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(etkinlik.tarih).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {etkinlik.yer}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{etkinlik.aciklama}</p>

                    {etkinlik.katilimci_sayisi && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Users className="w-4 h-4" />
                        <span>Katılımcı: {etkinlik.katilimci_sayisi} kişi</span>
                      </div>
                    )}

                    {etkinlik.kayit_baslangic && etkinlik.kayit_bitis && (
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        <p>
                          Kayıt: {new Date(etkinlik.kayit_baslangic).toLocaleDateString("tr-TR")} -{" "}
                          {new Date(etkinlik.kayit_bitis).toLocaleDateString("tr-TR")}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Yaklaşan etkinlik bulunmuyor.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="gecmis">
          {gecmisEtkinlikler.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gecmisEtkinlikler.map((etkinlik) => (
                <Card key={etkinlik.id} className="hover:shadow-lg transition-shadow opacity-90">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={
                        etkinlik.foto_url ||
                        `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(etkinlik.ad)}`
                      }
                      alt={etkinlik.ad}
                      fill
                      className="object-cover grayscale-[0.3]"
                    />
                    <Badge variant="secondary" className="absolute top-2 right-2">
                      Tamamlandı
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{etkinlik.ad}</CardTitle>
                    <CardDescription className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(etkinlik.tarih).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {etkinlik.yer}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{etkinlik.aciklama}</p>

                    {etkinlik.katilimci_sayisi && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{etkinlik.katilimci_sayisi} kişi katıldı</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Geçmiş etkinlik bulunmuyor.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

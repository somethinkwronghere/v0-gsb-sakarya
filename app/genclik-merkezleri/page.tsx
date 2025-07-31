"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Phone, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { tesisService } from "@/lib/supabase"
import type { ITesis } from "@/lib/types"

export default function GenclikMerkezleriPage() {
  const [merkezler, setMerkezler] = useState<ITesis[]>([])
  const [filteredMerkezler, setFilteredMerkezler] = useState<ITesis[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIlce, setSelectedIlce] = useState<string>("all")

  useEffect(() => {
    async function fetchMerkezler() {
      try {
        const data = await tesisService.getAll("genclik_merkezi")
        setMerkezler(data)
        setFilteredMerkezler(data)
      } catch (error) {
        console.error("Gençlik merkezleri yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMerkezler()
  }, [])

  useEffect(() => {
    let filtered = merkezler

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (merkez) =>
          merkez.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
          merkez.ilce.toLowerCase().includes(searchTerm.toLowerCase()) ||
          merkez.adres.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // District filter
    if (selectedIlce !== "all") {
      filtered = filtered.filter((merkez) => merkez.ilce === selectedIlce)
    }

    setFilteredMerkezler(filtered)
  }, [searchTerm, selectedIlce, merkezler])

  const ilceler = Array.from(new Set(merkezler.map((merkez) => merkez.ilce))).sort()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Gençlik merkezleri yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Gençlik Merkezleri</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sakarya genelindeki gençlik merkezlerimizde sosyal, kültürel ve sportif faaliyetlere katılın. Kurslar,
          etkinlikler ve sosyal aktiviteler için modern tesisler.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Merkez adı, ilçe veya adres ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedIlce} onValueChange={setSelectedIlce}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="İlçe seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm İlçeler</SelectItem>
            {ilceler.map((ilce) => (
              <SelectItem key={ilce} value={ilce}>
                {ilce}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          <span className="font-semibold">{filteredMerkezler.length}</span> gençlik merkezi bulundu
        </p>
      </div>

      {/* Merkez Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMerkezler.map((merkez) => (
          <Card key={merkez.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <Image
                src={merkez.foto_url || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(merkez.ad)}`}
                alt={merkez.ad}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{merkez.ad}</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {merkez.ilce}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {merkez.adres}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {merkez.kapasite && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Kapasite: {merkez.kapasite} kişi</span>
                  </div>
                )}

                {merkez.iletisim?.telefon && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{merkez.iletisim.telefon}</span>
                  </div>
                )}

                {merkez.aciklama && <p className="text-sm text-gray-600 line-clamp-2">{merkez.aciklama}</p>}

                <Link href={`/genclik-merkezleri/${merkez.slug}`}>
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Detayları Görüntüle</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMerkezler.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Arama kriterlerinize uygun gençlik merkezi bulunamadı.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedIlce("all")
            }}
            className="mt-4"
          >
            Filtreleri Temizle
          </Button>
        </div>
      )}
    </div>
  )
}

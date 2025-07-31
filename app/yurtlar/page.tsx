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

export default function YurtlarPage() {
  const [yurtlar, setYurtlar] = useState<ITesis[]>([])
  const [filteredYurtlar, setFilteredYurtlar] = useState<ITesis[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIlce, setSelectedIlce] = useState<string>("all")

  useEffect(() => {
    async function fetchYurtlar() {
      try {
        const data = await tesisService.getAll("yurt")
        setYurtlar(data)
        setFilteredYurtlar(data)
      } catch (error) {
        console.error("Yurtlar yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchYurtlar()
  }, [])

  useEffect(() => {
    let filtered = yurtlar

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (yurt) =>
          yurt.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
          yurt.ilce.toLowerCase().includes(searchTerm.toLowerCase()) ||
          yurt.adres.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // District filter
    if (selectedIlce !== "all") {
      filtered = filtered.filter((yurt) => yurt.ilce === selectedIlce)
    }

    setFilteredYurtlar(filtered)
  }, [searchTerm, selectedIlce, yurtlar])

  const ilceler = Array.from(new Set(yurtlar.map((yurt) => yurt.ilce))).sort()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yurtlar yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">KYK Yurtları</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sakarya genelindeki Kredi ve Yurtlar Kurumu yurtlarımız hakkında detaylı bilgi alın. Güvenli, konforlu ve
          modern konaklama imkanları.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Yurt adı, ilçe veya adres ile ara..."
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
          <span className="font-semibold">{filteredYurtlar.length}</span> yurt bulundu
        </p>
      </div>

      {/* Yurt Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredYurtlar.map((yurt) => (
          <Card key={yurt.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <Image
                src={yurt.foto_url || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(yurt.ad)}`}
                alt={yurt.ad}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{yurt.ad}</CardTitle>
                <Badge variant="secondary">{yurt.ilce}</Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {yurt.adres}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {yurt.kapasite && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Kapasite: {yurt.kapasite} kişi</span>
                  </div>
                )}

                {yurt.iletisim?.telefon && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{yurt.iletisim.telefon}</span>
                  </div>
                )}

                {yurt.aciklama && <p className="text-sm text-gray-600 line-clamp-2">{yurt.aciklama}</p>}

                <Link href={`/yurtlar/${yurt.slug}`}>
                  <Button className="w-full mt-4">Detayları Görüntüle</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredYurtlar.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Arama kriterlerinize uygun yurt bulunamadı.</p>
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

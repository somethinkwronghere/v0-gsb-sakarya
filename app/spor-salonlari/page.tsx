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

export default function SporSalonlariPage() {
  const [salonlar, setSalonlar] = useState<ITesis[]>([])
  const [filteredSalonlar, setFilteredSalonlar] = useState<ITesis[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIlce, setSelectedIlce] = useState<string>("all")

  useEffect(() => {
    async function fetchSalonlar() {
      try {
        const data = await tesisService.getAll("spor_salonu")
        setSalonlar(data)
        setFilteredSalonlar(data)
      } catch (error) {
        console.error("Spor salonları yüklenirken hata:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSalonlar()
  }, [])

  useEffect(() => {
    let filtered = salonlar

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (salon) =>
          salon.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
          salon.ilce.toLowerCase().includes(searchTerm.toLowerCase()) ||
          salon.adres.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // District filter
    if (selectedIlce !== "all") {
      filtered = filtered.filter((salon) => salon.ilce === selectedIlce)
    }

    setFilteredSalonlar(filtered)
  }, [searchTerm, selectedIlce, salonlar])

  const ilceler = Array.from(new Set(salonlar.map((salon) => salon.ilce))).sort()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Spor salonları yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Spor Salonları</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sakarya genelindeki spor salonları ve tesislerimizde çeşitli spor dallarında antrenman yapın ve yarışmalara
          katılın. Modern donanım ve profesyonel hizmet.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Salon adı, ilçe veya adres ile ara..."
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
          <span className="font-semibold">{filteredSalonlar.length}</span> spor salonu bulundu
        </p>
      </div>

      {/* Salon Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSalonlar.map((salon) => (
          <Card key={salon.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <Image
                src={salon.foto_url || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(salon.ad)}`}
                alt={salon.ad}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{salon.ad}</CardTitle>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  {salon.ilce}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {salon.adres}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {salon.kapasite && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Kapasite: {salon.kapasite.toLocaleString()} kişi</span>
                  </div>
                )}

                {salon.iletisim?.telefon && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{salon.iletisim.telefon}</span>
                  </div>
                )}

                {salon.aciklama && <p className="text-sm text-gray-600 line-clamp-2">{salon.aciklama}</p>}

                <Link href={`/spor-salonlari/${salon.slug}`}>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Detayları Görüntüle</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSalonlar.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Arama kriterlerinize uygun spor salonu bulunamadı.</p>
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

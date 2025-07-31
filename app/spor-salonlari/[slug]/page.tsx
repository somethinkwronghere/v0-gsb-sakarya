import { notFound } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Phone, Mail, User, ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { tesisService, etkinlikService, haberService } from "@/lib/supabase"
import type { IEtkinlik, IHaber } from "@/lib/types"

interface PageProps {
  params: { slug: string }
}

export default async function SporSalonuDetailPage({ params }: PageProps) {
  const { slug } = await params

  try {
    const salon = await tesisService.getBySlug(slug)
    const etkinlikler = await etkinlikService.getAll(undefined, salon.id)
    const haberler = await haberService.getAll(salon.id)

    if (salon.tip !== "spor_salonu") {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/spor-salonlari">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Spor Salonlarına Geri Dön
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <Image
              src={salon.foto_url || `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(salon.ad)}`}
              alt={salon.ad}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-gray-800">{salon.ad}</h1>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {salon.ilce}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{salon.adres}</span>
            </div>

            {salon.kapasite && (
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>Kapasite: {salon.kapasite.toLocaleString()} kişi</span>
              </div>
            )}

            {salon.aciklama && <p className="text-gray-700 leading-relaxed">{salon.aciklama}</p>}

            {/* İletişim Bilgileri */}
            {salon.iletisim && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">İletişim Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {salon.iletisim.telefon && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span>{salon.iletisim.telefon}</span>
                    </div>
                  )}
                  {salon.iletisim.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-red-600" />
                      <span>{salon.iletisim.email}</span>
                    </div>
                  )}
                  {salon.iletisim.yetkili && (
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-red-600" />
                      <span>Yetkili: {salon.iletisim.yetkili}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Etkinlikler ve Haberler */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Son Etkinlikler */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Son Etkinlikler</h2>
            {etkinlikler.length > 0 ? (
              <div className="space-y-4">
                {etkinlikler.slice(0, 3).map((etkinlik: IEtkinlik) => (
                  <Card key={etkinlik.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{etkinlik.ad}</CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(etkinlik.tarih).toLocaleDateString("tr-TR")}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {etkinlik.yer}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2">{etkinlik.aciklama}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Henüz etkinlik bulunmuyor.</p>
            )}
          </div>

          {/* Son Haberler */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Son Haberler</h2>
            {haberler.length > 0 ? (
              <div className="space-y-4">
                {haberler.slice(0, 3).map((haber: IHaber) => (
                  <Card key={haber.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{haber.baslik}</CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(haber.yayin_tarihi).toLocaleDateString("tr-TR")}
                        </div>
                        {haber.yazar && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {haber.yazar}
                          </div>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 line-clamp-2">{haber.icerik}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Henüz haber bulunmuyor.</p>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Spor salonu detayları yüklenirken hata:", error)
    notFound()
  }
}

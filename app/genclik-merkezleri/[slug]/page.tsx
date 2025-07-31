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

export default async function GenclikMerkeziDetailPage({ params }: PageProps) {
  const { slug } = await params

  try {
    const merkez = await tesisService.getBySlug(slug)
    const etkinlikler = await etkinlikService.getAll(undefined, merkez.id)
    const haberler = await haberService.getAll(merkez.id)

    if (merkez.tip !== "genclik_merkezi") {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/genclik-merkezleri">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              Gençlik Merkezlerine Geri Dön
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <Image
              src={merkez.foto_url || `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(merkez.ad)}`}
              alt={merkez.ad}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold text-gray-800">{merkez.ad}</h1>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {merkez.ilce}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{merkez.adres}</span>
            </div>

            {merkez.kapasite && (
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>Kapasite: {merkez.kapasite} kişi</span>
              </div>
            )}

            {merkez.aciklama && <p className="text-gray-700 leading-relaxed">{merkez.aciklama}</p>}

            {/* İletişim Bilgileri */}
            {merkez.iletisim && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">İletişim Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {merkez.iletisim.telefon && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span>{merkez.iletisim.telefon}</span>
                    </div>
                  )}
                  {merkez.iletisim.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-green-600" />
                      <span>{merkez.iletisim.email}</span>
                    </div>
                  )}
                  {merkez.iletisim.yetkili && (
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-green-600" />
                      <span>Yetkili: {merkez.iletisim.yetkili}</span>
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
    console.error("Gençlik merkezi detayları yüklenirken hata:", error)
    notFound()
  }
}

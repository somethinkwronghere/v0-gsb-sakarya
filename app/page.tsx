import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Calendar, Building2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sakarya Gençlik ve Spor
            <span className="block text-yellow-300">İl Müdürlüğü</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Gençlerimizin gelişimi ve spor faaliyetleri için modern tesisler, kaliteli hizmet ve sürekli destek
            sunuyoruz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold">
              Tesislerimizi Keşfedin
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-800 bg-transparent"
            >
              Etkinlikleri Görüntüle
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Hizmetlerimiz</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sakarya genelinde gençlik ve spor faaliyetleri için modern tesisler ve kapsamlı hizmetler sunuyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">KYK Yurtları</CardTitle>
                <CardDescription>Öğrencilerimiz için güvenli ve konforlu konaklama imkanları</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/yurtlar">
                  <Button className="w-full">Yurtları İncele</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Gençlik Merkezleri</CardTitle>
                <CardDescription>Sosyal, kültürel ve eğitsel faaliyetler için modern merkezler</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/genclik-merkezleri">
                  <Button className="w-full">Merkezleri Keşfet</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <MapPin className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Spor Salonları</CardTitle>
                <CardDescription>Çeşitli spor dalları için donanımlı salon ve tesisler</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/spor-salonlari">
                  <Button className="w-full">Salonları Gör</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Yaklaşan Etkinlikler</h2>
            <p className="text-lg text-gray-600">Gençlik ve spor etkinliklerimizden haberdar olun</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=Etkinlik ${item}`}
                    alt={`Etkinlik ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>15 Şubat 2024</span>
                  </div>
                  <CardTitle className="text-lg">Gençlik Spor Festivali</CardTitle>
                  <CardDescription>Sakarya genelindeki gençlerin katılacağı büyük spor festivali</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Detayları Gör
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/etkinlikler">
              <Button size="lg" variant="outline">
                Tüm Etkinlikleri Görüntüle
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Tesis</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Aktif Üye</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Aylık Etkinlik</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-blue-100">İlçe Kapsamı</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, MapPin, Phone, Mail, Globe, Target, Eye, Heart } from "lucide-react"
import Image from "next/image"

export default function HakkimizdaPage() {
  const istatistikler = [
    { label: "KYK Yurdu", sayi: "12", icon: Building2, color: "bg-blue-100 text-blue-800" },
    { label: "Gençlik Merkezi", sayi: "9", icon: Users, color: "bg-green-100 text-green-800" },
    { label: "Spor Tesisi", sayi: "14", icon: MapPin, color: "bg-red-100 text-red-800" },
    { label: "İlçe", sayi: "16", icon: Globe, color: "bg-purple-100 text-purple-800" },
  ]

  const hizmetler = [
    {
      baslik: "KYK Yurtları",
      aciklama: "Öğrencilerimize güvenli, konforlu ve modern konaklama imkanları sunuyoruz.",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      baslik: "Gençlik Merkezleri",
      aciklama: "Gençlerimizin sosyal, kültürel ve sportif faaliyetlerde bulunabileceği modern tesisler.",
      icon: Users,
      color: "text-green-600",
    },
    {
      baslik: "Spor Tesisleri",
      aciklama: "Çeşitli spor dallarında antrenman ve yarışma imkanları sağlayan modern spor tesisleri.",
      icon: MapPin,
      color: "text-red-600",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Hakkımızda</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Sakarya Gençlik ve Spor İl Müdürlüğü olarak, gençlerimizin ve sporcularımızın gelişimi için modern tesisler ve
          kaliteli hizmetler sunuyoruz. İlimizin 16 ilçesinde faaliyet gösteren tesislerimizle gençlik ve spor alanında
          öncü bir rol üstleniyoruz.
        </p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {istatistikler.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.sayi}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Misyon, Vizyon, Değerler */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Misyonumuz</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Gençlerimizin ve sporcularımızın fiziksel, zihinsel ve sosyal gelişimlerini destekleyerek, sağlıklı bir
              toplum oluşturmaya katkıda bulunmak.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Vizyonumuz</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Gençlik ve spor alanında örnek bir il müdürlüğü olarak, modern tesisler ve kaliteli hizmetlerle bölgemizin
              lider kurumu olmak.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>Değerlerimiz</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="text-gray-600 space-y-2">
              <li>• Şeffaflık ve hesap verebilirlik</li>
              <li>• Kaliteli hizmet anlayışı</li>
              <li>• Gençlik odaklı yaklaşım</li>
              <li>• Sürekli gelişim</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Hizmetlerimiz */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Hizmetlerimiz</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {hizmetler.map((hizmet, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <hizmet.icon className={`w-8 h-8 ${hizmet.color}`} />
                  <CardTitle className="text-lg">{hizmet.baslik}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{hizmet.aciklama}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* İletişim Bilgileri */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">İletişim Bilgileri</CardTitle>
          <CardDescription className="text-center">Sorularınız için bizimle iletişime geçebilirsiniz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Adres</p>
                  <p className="text-gray-600">
                    Sakarya Gençlik ve Spor İl Müdürlüğü
                    <br />
                    Adapazarı/Sakarya
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Telefon</p>
                  <p className="text-gray-600">0264 XXX XX XX</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">E-posta</p>
                  <p className="text-gray-600">sakarya@gsb.gov.tr</p>
                </div>
              </div>
            </div>

            <div className="aspect-video relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src="/placeholder.svg?height=300&width=400&text=Sakarya+GSİM"
                alt="Sakarya Gençlik ve Spor İl Müdürlüğü"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

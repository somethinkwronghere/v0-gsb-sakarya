import Link from "next/link"
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">Sakarya GSİM</div>
                <div className="text-sm text-gray-400">Gençlik ve Spor İl Müdürlüğü</div>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Sakarya'da gençlik ve spor faaliyetlerinin geliştirilmesi, modern tesislerin sunulması ve gençlerimizin
              sosyal, kültürel, sportif gelişimlerinin desteklenmesi amacıyla hizmet vermekteyiz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/yurtlar" className="text-gray-300 hover:text-white transition-colors">
                  KYK Yurtları
                </Link>
              </li>
              <li>
                <Link href="/genclik-merkezleri" className="text-gray-300 hover:text-white transition-colors">
                  Gençlik Merkezleri
                </Link>
              </li>
              <li>
                <Link href="/spor-salonlari" className="text-gray-300 hover:text-white transition-colors">
                  Spor Salonları
                </Link>
              </li>
              <li>
                <Link href="/etkinlikler" className="text-gray-300 hover:text-white transition-colors">
                  Etkinlikler
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  Sakarya Gençlik ve Spor İl Müdürlüğü
                  <br />
                  Adapazarı/Sakarya
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">0264 XXX XX XX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@sakaryagsim.gov.tr</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sakarya Gençlik ve Spor İl Müdürlüğü. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}

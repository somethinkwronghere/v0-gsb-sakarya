"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Building2, Users, MapPin, Calendar, Info, LogIn } from "lucide-react"

const navigation = [
  { name: "Ana Sayfa", href: "/", icon: Building2 },
  { name: "KYK Yurtları", href: "/yurtlar", icon: Building2 },
  { name: "Gençlik Merkezleri", href: "/genclik-merkezleri", icon: Users },
  { name: "Spor Salonları", href: "/spor-salonlari", icon: MapPin },
  { name: "Etkinlikler", href: "/etkinlikler", icon: Calendar },
  { name: "Hakkımızda", href: "/hakkimizda", icon: Info },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-gray-800">Sakarya GSİM</div>
              <div className="text-xs text-gray-600">Gençlik ve Spor İl Müdürlüğü</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Admin Login Button */}
          <div className="hidden lg:flex items-center">
            <Link href="/admin/login">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <LogIn className="w-4 h-4" />
                Yönetici Girişi
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
                      <LogIn className="w-4 h-4" />
                      Yönetici Girişi
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

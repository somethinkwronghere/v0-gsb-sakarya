"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building2, Calendar, FileText, Users, Settings, LogOut, Menu, Home, BarChart3 } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: Home },
  { name: "Tesisler", href: "/admin/tesisler", icon: Building2 },
  { name: "Etkinlikler", href: "/admin/etkinlikler", icon: Calendar },
  { name: "Haberler", href: "/admin/haberler", icon: FileText },
  { name: "Kullanıcılar", href: "/admin/kullanicilar", icon: Users },
  { name: "Raporlar", href: "/admin/raporlar", icon: BarChart3 },
  { name: "Ayarlar", href: "/admin/ayarlar", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
          <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-bold text-gray-800">Sakarya GSİM</div>
                <div className="text-xs text-gray-600">Yönetim Paneli</div>
              </div>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex min-h-0 flex-1 flex-col bg-white">
            <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-bold text-gray-800">Sakarya GSİM</div>
                  <div className="text-xs text-gray-600">Yönetim Paneli</div>
                </div>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/" target="_blank">
                <Button variant="outline" size="sm">
                  Siteyi Görüntüle
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">admin@sakaryagsim.gov.tr</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ayarlar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Çıkış Yap</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

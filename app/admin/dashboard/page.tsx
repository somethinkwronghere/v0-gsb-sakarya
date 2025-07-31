"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Calendar, FileText, Plus, Eye, Edit } from "lucide-react"
import Link from "next/link"
import type { IIstatistik } from "@/lib/types"

export default function AdminDashboard() {
  const [stats, setStats] = useState<IIstatistik>({
    toplam_tesis: 0,
    toplam_etkinlik: 0,
    toplam_haber: 0,
    aktif_kullanici: 0,
    aylik_etkinlik: 0,
  })
  const [recentActivities, setRecentActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - gerçek uygulamada Supabase'den çekilecek
    setStats({
      toplam_tesis: 25,
      toplam_etkinlik: 48,
      toplam_haber: 32,
      aktif_kullanici: 12,
      aylik_etkinlik: 8,
    })

    setRecentActivities([
      {
        id: 1,
        type: "etkinlik",
        title: "Gençlik Spor Festivali 2024",
        date: "2024-01-15",
        status: "aktif",
      },
      {
        id: 2,
        type: "haber",
        title: "Yeni Kurslar Başlıyor",
        date: "2024-01-14",
        status: "yayında",
      },
      {
        id: 3,
        type: "tesis",
        title: "Serdivan Gençlik Merkezi",
        date: "2024-01-13",
        status: "güncellendi",
      },
    ])

    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Yönetim Paneli</h1>
          <p className="text-gray-600">Sakarya GSİM Bilgilendirme Platformu</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/tesisler/yeni">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Yeni Tesis
            </Button>
          </Link>
          <Link href="/admin/etkinlikler/yeni">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Yeni Etkinlik
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Tesis</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.toplam_tesis}</div>
            <p className="text-xs text-muted-foreground">Aktif tesisler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Etkinlik</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.toplam_etkinlik}</div>
            <p className="text-xs text-muted-foreground">Tüm etkinlikler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Haber</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.toplam_haber}</div>
            <p className="text-xs text-muted-foreground">Yayınlanan haberler</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kullanıcı</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.aktif_kullanici}</div>
            <p className="text-xs text-muted-foreground">Yönetici hesapları</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aylık Etkinlik</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.aylik_etkinlik}</div>
            <p className="text-xs text-muted-foreground">Bu ay planlanmış</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
            <CardDescription>Sık kullanılan yönetim işlemleri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/tesisler">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Building2 className="w-4 h-4 mr-2" />
                Tesisleri Yönet
              </Button>
            </Link>
            <Link href="/admin/etkinlikler">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Etkinlikleri Yönet
              </Button>
            </Link>
            <Link href="/admin/haberler">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Haberleri Yönet
              </Button>
            </Link>
            <Link href="/admin/kullanicilar">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="w-4 h-4 mr-2" />
                Kullanıcıları Yönet
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
            <CardDescription>Sistemdeki son değişiklikler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Items */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Son Eklenen Tesisler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Adapazarı Gençlik Merkezi</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Serdivan Spor Salonu</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Yaklaşan Etkinlikler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Gençlik Spor Festivali</span>
                <Badge variant="outline">15 Mar</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Kültür ve Sanat Gecesi</span>
                <Badge variant="outline">20 Feb</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Son Haberler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Yeni Kurslar Başlıyor</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Yurt Renovasyonu</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

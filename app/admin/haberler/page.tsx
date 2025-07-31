"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Plus, Search, Edit, Trash2, Eye, Filter, Calendar, User } from "lucide-react"
import Link from "next/link"
import { haberService } from "@/lib/supabase"
import type { IHaber } from "@/lib/types"

export default function AdminHaberlerPage() {
  const [haberler, setHaberler] = useState<IHaber[]>([])
  const [filteredHaberler, setFilteredHaberler] = useState<IHaber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadHaberler()
  }, [])

  useEffect(() => {
    filterHaberler()
  }, [haberler, searchTerm])

  const loadHaberler = async () => {
    try {
      const data = await haberService.getAll()
      setHaberler(data)
    } catch (error) {
      console.error("Haberler yüklenirken hata:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterHaberler = () => {
    let filtered = haberler

    if (searchTerm) {
      filtered = filtered.filter(
        (haber) =>
          haber.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
          haber.icerik.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (haber.yazar && haber.yazar.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredHaberler(filtered)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getRecentNews = () => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return haberler.filter((haber) => new Date(haber.yayin_tarihi) >= oneWeekAgo).length
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Haberler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Haberler</h1>
          <p className="text-gray-600">Tüm haberleri görüntüleyin ve yönetin</p>
        </div>
        <Link href="/admin/haberler/yeni">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Haber
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Haber</p>
                <p className="text-2xl font-bold">{haberler.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bu Hafta</p>
                <p className="text-2xl font-bold text-green-600">{getRecentNews()}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Yazarlar</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(haberler.filter((h) => h.yazar).map((h) => h.yazar)).size}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Haber başlığı, içerik veya yazar ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Haberler Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Haberler ({filteredHaberler.length})</CardTitle>
          <CardDescription>Tüm haberlerin listesi ve yönetim işlemleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Yazar</TableHead>
                  <TableHead>Yayın Tarihi</TableHead>
                  <TableHead>Tesis</TableHead>
                  <TableHead>Etiketler</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHaberler.map((haber) => (
                  <TableRow key={haber.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{haber.baslik}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {haber.icerik.substring(0, 80)}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {haber.yazar ? (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{haber.yazar}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{formatDate(haber.yayin_tarihi)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {haber.tesis ? (
                        <Badge variant="outline">{haber.tesis.ad}</Badge>
                      ) : (
                        <span className="text-gray-400">Genel</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {haber.etiketler && haber.etiketler.length > 0 ? (
                          haber.etiketler.slice(0, 2).map((etiket, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {etiket}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                        {haber.etiketler && haber.etiketler.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{haber.etiketler.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Link href={`/admin/haberler/${haber.id}/duzenle`}>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

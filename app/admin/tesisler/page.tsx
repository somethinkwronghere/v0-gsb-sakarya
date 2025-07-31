"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react"
import Link from "next/link"
import { tesisService } from "@/lib/supabase"
import type { ITesis } from "@/lib/types"

export default function AdminTesislerPage() {
  const [tesisler, setTesisler] = useState<ITesis[]>([])
  const [filteredTesisler, setFilteredTesisler] = useState<ITesis[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTip, setSelectedTip] = useState<string>("all")
  const [selectedIlce, setSelectedIlce] = useState<string>("all")

  useEffect(() => {
    loadTesisler()
  }, [])

  useEffect(() => {
    filterTesisler()
  }, [tesisler, searchTerm, selectedTip, selectedIlce])

  const loadTesisler = async () => {
    try {
      const data = await tesisService.getAll()
      setTesisler(data)
    } catch (error) {
      console.error("Tesisler yüklenirken hata:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterTesisler = () => {
    let filtered = tesisler

    if (searchTerm) {
      filtered = filtered.filter(
        (tesis) =>
          tesis.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tesis.adres.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedTip !== "all") {
      filtered = filtered.filter((tesis) => tesis.tip === selectedTip)
    }

    if (selectedIlce !== "all") {
      filtered = filtered.filter((tesis) => tesis.ilce === selectedIlce)
    }

    setFilteredTesisler(filtered)
  }

  const getTipBadgeColor = (tip: ITesis["tip"]) => {
    switch (tip) {
      case "yurt":
        return "bg-blue-100 text-blue-800"
      case "genclik_merkezi":
        return "bg-green-100 text-green-800"
      case "spor_salonu":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTipLabel = (tip: ITesis["tip"]) => {
    switch (tip) {
      case "yurt":
        return "Yurt"
      case "genclik_merkezi":
        return "Gençlik Merkezi"
      case "spor_salonu":
        return "Spor Salonu"
      default:
        return tip
    }
  }

  const uniqueIlceler = Array.from(new Set(tesisler.map((t) => t.ilce))).sort()

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Tesisler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tesisler</h1>
          <p className="text-gray-600">Tüm tesisleri görüntüleyin ve yönetin</p>
        </div>
        <Link href="/admin/tesisler/yeni">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Tesis
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Tesis</p>
                <p className="text-2xl font-bold">{tesisler.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Yurtlar</p>
                <p className="text-2xl font-bold">{tesisler.filter((t) => t.tip === "yurt").length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gençlik Merkezleri</p>
                <p className="text-2xl font-bold">{tesisler.filter((t) => t.tip === "genclik_merkezi").length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Spor Salonları</p>
                <p className="text-2xl font-bold">{tesisler.filter((t) => t.tip === "spor_salonu").length}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4 text-red-600" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tesis adı veya adres ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedTip} onValueChange={setSelectedTip}>
              <SelectTrigger>
                <SelectValue placeholder="Tesis Tipi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Tipler</SelectItem>
                <SelectItem value="yurt">Yurt</SelectItem>
                <SelectItem value="genclik_merkezi">Gençlik Merkezi</SelectItem>
                <SelectItem value="spor_salonu">Spor Salonu</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedIlce} onValueChange={setSelectedIlce}>
              <SelectTrigger>
                <SelectValue placeholder="İlçe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm İlçeler</SelectItem>
                {uniqueIlceler.map((ilce) => (
                  <SelectItem key={ilce} value={ilce}>
                    {ilce}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tesisler Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Tesisler ({filteredTesisler.length})</CardTitle>
          <CardDescription>Tüm tesislerin listesi ve yönetim işlemleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tesis Adı</TableHead>
                  <TableHead>Tip</TableHead>
                  <TableHead>İlçe</TableHead>
                  <TableHead>Kapasite</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTesisler.map((tesis) => (
                  <TableRow key={tesis.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{tesis.ad}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{tesis.adres}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTipBadgeColor(tesis.tip)}>{getTipLabel(tesis.tip)}</Badge>
                    </TableCell>
                    <TableCell>{tesis.ilce}</TableCell>
                    <TableCell>{tesis.kapasite ? `${tesis.kapasite.toLocaleString()} kişi` : "-"}</TableCell>
                    <TableCell>
                      <Badge variant={tesis.aktif ? "default" : "secondary"}>{tesis.aktif ? "Aktif" : "Pasif"}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/${tesis.tip === "yurt" ? "yurtlar" : tesis.tip === "genclik_merkezi" ? "genclik-merkezleri" : "spor-salonlari"}/${tesis.slug}`}
                          target="_blank"
                        >
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/tesisler/${tesis.id}/duzenle`}>
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

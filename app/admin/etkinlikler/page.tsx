"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Search, Edit, Trash2, Eye, Filter, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { etkinlikService } from "@/lib/supabase"
import type { IEtkinlik } from "@/lib/types"

export default function AdminEtkinliklerPage() {
  const [etkinlikler, setEtkinlikler] = useState<IEtkinlik[]>([])
  const [filteredEtkinlikler, setFilteredEtkinlikler] = useState<IEtkinlik[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTip, setSelectedTip] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    loadEtkinlikler()
  }, [])

  useEffect(() => {
    filterEtkinlikler()
  }, [etkinlikler, searchTerm, selectedTip, activeTab])

  const loadEtkinlikler = async () => {
    try {
      const data = await etkinlikService.getAll()
      setEtkinlikler(data)
    } catch (error) {
      console.error("Etkinlikler yüklenirken hata:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterEtkinlikler = () => {
    let filtered = etkinlikler

    if (searchTerm) {
      filtered = filtered.filter(
        (etkinlik) =>
          etkinlik.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
          etkinlik.yer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedTip !== "all") {
      filtered = filtered.filter((etkinlik) => etkinlik.tip === selectedTip)
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((etkinlik) => etkinlik.tip === activeTab)
    }

    setFilteredEtkinlikler(filtered)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const gelecekEtkinlikler = etkinlikler.filter((e) => e.tip === "gelecek")
  const gecmisEtkinlikler = etkinlikler.filter((e) => e.tip === "gecmis")

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Etkinlikler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Etkinlikler</h1>
          <p className="text-gray-600">Tüm etkinlikleri görüntüleyin ve yönetin</p>
        </div>
        <Link href="/admin/etkinlikler/yeni">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Etkinlik
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Etkinlik</p>
                <p className="text-2xl font-bold">{etkinlikler.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gelecek Etkinlikler</p>
                <p className="text-2xl font-bold text-green-600">{gelecekEtkinlikler.length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Geçmiş Etkinlikler</p>
                <p className="text-2xl font-bold text-gray-600">{gecmisEtkinlikler.length}</p>
              </div>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gray-600" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Etkinlik adı veya yer ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedTip} onValueChange={setSelectedTip}>
              <SelectTrigger>
                <SelectValue placeholder="Etkinlik Tipi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Etkinlikler</SelectItem>
                <SelectItem value="gelecek">Gelecek Etkinlikler</SelectItem>
                <SelectItem value="gecmis">Geçmiş Etkinlikler</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Etkinlikler Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tüm Etkinlikler ({etkinlikler.length})</TabsTrigger>
          <TabsTrigger value="gelecek">Gelecek ({gelecekEtkinlikler.length})</TabsTrigger>
          <TabsTrigger value="gecmis">Geçmiş ({gecmisEtkinlikler.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all" && "Tüm Etkinlikler"}
                {activeTab === "gelecek" && "Gelecek Etkinlikler"}
                {activeTab === "gecmis" && "Geçmiş Etkinlikler"}({filteredEtkinlikler.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Etkinlik Adı</TableHead>
                      <TableHead>Tarih</TableHead>
                      <TableHead>Yer</TableHead>
                      <TableHead>Tesis</TableHead>
                      <TableHead>Katılımcı</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead className="text-right">İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEtkinlikler.map((etkinlik) => (
                      <TableRow key={etkinlik.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div className="font-semibold">{etkinlik.ad}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {etkinlik.aciklama.substring(0, 50)}...
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{formatDate(etkinlik.tarih)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{etkinlik.yer}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {etkinlik.tesis ? (
                            <Badge variant="outline">{etkinlik.tesis.ad}</Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {etkinlik.katilimci_sayisi ? (
                            `${etkinlik.katilimci_sayisi} kişi`
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={etkinlik.tip === "gelecek" ? "default" : "secondary"}>
                            {etkinlik.tip === "gelecek" ? "Gelecek" : "Geçmiş"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Link href={`/admin/etkinlikler/${etkinlik.id}/duzenle`}>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

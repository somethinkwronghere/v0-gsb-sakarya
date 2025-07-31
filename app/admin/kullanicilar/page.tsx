"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Users, Plus, Search, Edit, Trash2, Eye, Filter, Mail, Shield, MapPin, UserCheck, UserX } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { supabase, tesisService } from "@/lib/supabase"
import type { IKullanici, ITesis } from "@/lib/types"

interface KullaniciDetay extends IKullanici {
  tesis?: ITesis
}

export default function AdminKullanicilarPage() {
  const [kullanicilar, setKullanicilar] = useState<KullaniciDetay[]>([])
  const [tesisler, setTesisler] = useState<ITesis[]>([])
  const [filteredKullanicilar, setFilteredKullanicilar] = useState<KullaniciDetay[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRol, setSelectedRol] = useState<string>("all")
  const [selectedDurum, setSelectedDurum] = useState<string>("all")

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    filterKullanicilar()
  }, [kullanicilar, searchTerm, selectedRol, selectedDurum])

  const loadData = async () => {
    try {
      setLoading(true)

      if (!supabase) {
        // Mock data for development
        const mockKullanicilar: KullaniciDetay[] = [
          {
            id: "550e8400-e29b-41d4-a716-446655440001",
            ad_soyad: "Ahmet Yılmaz",
            eposta: "ahmet.yilmaz@sakaryagsim.gov.tr",
            rol: "admin",
            ilce: null,
            tesis_id: null,
            olusturulma_tarihi: "2024-01-01T00:00:00Z",
            aktif: true,
            son_giris: "2024-01-15T10:30:00Z",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440002",
            ad_soyad: "Fatma Demir",
            eposta: "fatma.demir@sakaryagsim.gov.tr",
            rol: "bolge_sorumlusu",
            ilce: "Adapazarı",
            tesis_id: null,
            olusturulma_tarihi: "2024-01-01T00:00:00Z",
            aktif: true,
            son_giris: "2024-01-14T14:20:00Z",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440003",
            ad_soyad: "Mehmet Kaya",
            eposta: "mehmet.kaya@sakaryagsim.gov.tr",
            rol: "memur",
            ilce: null,
            tesis_id: "1",
            olusturulma_tarihi: "2024-01-01T00:00:00Z",
            aktif: true,
            son_giris: "2024-01-13T09:15:00Z",
          },
        ]
        setKullanicilar(mockKullanicilar)

        // Load tesisler for tesis names
        const tesisData = await tesisService.getAll()
        setTesisler(tesisData)
        return
      }

      // Load kullanicilar with tesis info
      const { data: kullaniciData, error: kullaniciError } = await supabase
        .from("kullanicilar")
        .select(`
          *,
          tesis:tesisler(*)
        `)
        .order("olusturulma_tarihi", { ascending: false })

      if (kullaniciError) throw kullaniciError

      setKullanicilar(kullaniciData || [])

      // Load tesisler
      const tesisData = await tesisService.getAll()
      setTesisler(tesisData)
    } catch (error) {
      console.error("Veri yüklenirken hata:", error)
      toast.error("Veriler yüklenemedi")
    } finally {
      setLoading(false)
    }
  }

  const filterKullanicilar = () => {
    let filtered = kullanicilar

    if (searchTerm) {
      filtered = filtered.filter(
        (kullanici) =>
          kullanici.ad_soyad.toLowerCase().includes(searchTerm.toLowerCase()) ||
          kullanici.eposta.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (kullanici.ilce && kullanici.ilce.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedRol !== "all") {
      filtered = filtered.filter((kullanici) => kullanici.rol === selectedRol)
    }

    if (selectedDurum !== "all") {
      filtered = filtered.filter((kullanici) => (selectedDurum === "aktif" ? kullanici.aktif : !kullanici.aktif))
    }

    setFilteredKullanicilar(filtered)
  }

  const toggleKullaniciDurum = async (kullaniciId: string, aktif: boolean) => {
    try {
      if (!supabase) {
        toast.success(`Kullanıcı ${aktif ? "aktif" : "pasif"} hale getirildi (Mock)`)
        // Update local state for mock
        setKullanicilar((prev) => prev.map((k) => (k.id === kullaniciId ? { ...k, aktif } : k)))
        return
      }

      const { error } = await supabase
        .from("kullanicilar")
        .update({
          aktif,
          guncellenme_tarihi: new Date().toISOString(),
        })
        .eq("id", kullaniciId)

      if (error) throw error

      // Update local state
      setKullanicilar((prev) => prev.map((k) => (k.id === kullaniciId ? { ...k, aktif } : k)))

      toast.success(`Kullanıcı ${aktif ? "aktif" : "pasif"} hale getirildi`)
    } catch (error) {
      console.error("Durum güncellenirken hata:", error)
      toast.error("Durum güncellenemedi")
    }
  }

  const deleteKullanici = async (kullaniciId: string) => {
    try {
      if (!supabase) {
        toast.success("Kullanıcı silindi (Mock)")
        // Remove from local state for mock
        setKullanicilar((prev) => prev.filter((k) => k.id !== kullaniciId))
        return
      }

      // Soft delete - set aktif to false
      const { error } = await supabase
        .from("kullanicilar")
        .update({
          aktif: false,
          guncellenme_tarihi: new Date().toISOString(),
        })
        .eq("id", kullaniciId)

      if (error) throw error

      // Remove from local state
      setKullanicilar((prev) => prev.filter((k) => k.id !== kullaniciId))

      toast.success("Kullanıcı silindi")
    } catch (error) {
      console.error("Silme hatası:", error)
      toast.error("Kullanıcı silinemedi")
    }
  }

  const getRolBadgeColor = (rol: string) => {
    switch (rol) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "bolge_sorumlusu":
        return "bg-blue-100 text-blue-800"
      case "memur":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRolLabel = (rol: string) => {
    switch (rol) {
      case "admin":
        return "Admin"
      case "bolge_sorumlusu":
        return "Bölge Sorumlusu"
      case "memur":
        return "Memur"
      default:
        return rol
    }
  }

  const getTesisAdi = (tesisId: string | null) => {
    if (!tesisId) return null
    const tesis = tesisler.find((t) => t.id === tesisId)
    return tesis ? tesis.ad : `Tesis #${tesisId}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const aktifKullanicilar = kullanicilar.filter((k) => k.aktif).length
  const adminSayisi = kullanicilar.filter((k) => k.rol === "admin").length
  const bolgeSorumlusuSayisi = kullanicilar.filter((k) => k.rol === "bolge_sorumlusu").length
  const memurSayisi = kullanicilar.filter((k) => k.rol === "memur").length

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Kullanıcılar yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Kullanıcılar</h1>
          <p className="text-gray-600">Sistem kullanıcılarını görüntüleyin ve yönetin</p>
        </div>
        <Link href="/admin/kullanicilar/yeni">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Yeni Kullanıcı
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
                <p className="text-2xl font-bold">{kullanicilar.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktif Kullanıcı</p>
                <p className="text-2xl font-bold text-green-600">{aktifKullanicilar}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Adminler</p>
                <p className="text-2xl font-bold text-red-600">{adminSayisi}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bölge Sorumluları</p>
                <p className="text-2xl font-bold text-blue-600">{bolgeSorumlusuSayisi}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-600" />
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
                placeholder="Ad, e-posta veya ilçe ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRol} onValueChange={setSelectedRol}>
              <SelectTrigger>
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Roller</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="bolge_sorumlusu">Bölge Sorumlusu</SelectItem>
                <SelectItem value="memur">Memur</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDurum} onValueChange={setSelectedDurum}>
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="pasif">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Kullanıcılar Tablosu */}
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcılar ({filteredKullanicilar.length})</CardTitle>
          <CardDescription>Tüm sistem kullanıcılarının listesi ve yönetim işlemleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kullanıcı</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>İlçe/Tesis</TableHead>
                  <TableHead>Son Giriş</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKullanicilar.map((kullanici) => (
                  <TableRow key={kullanici.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{kullanici.ad_soyad}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {kullanici.eposta}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRolBadgeColor(kullanici.rol)}>{getRolLabel(kullanici.rol)}</Badge>
                    </TableCell>
                    <TableCell>
                      {kullanici.ilce ? (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{kullanici.ilce}</span>
                        </div>
                      ) : kullanici.tesis_id ? (
                        <div className="text-sm">{getTesisAdi(kullanici.tesis_id)}</div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {kullanici.son_giris ? formatDate(kullanici.son_giris) : "Hiç giriş yapmamış"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={kullanici.aktif ? "default" : "secondary"}>
                        {kullanici.aktif ? "Aktif" : "Pasif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Link href={`/admin/kullanicilar/${kullanici.id}/duzenle`}>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={
                            kullanici.aktif
                              ? "text-orange-600 hover:text-orange-700"
                              : "text-green-600 hover:text-green-700"
                          }
                          onClick={() => toggleKullaniciDurum(kullanici.id, !kullanici.aktif)}
                        >
                          {kullanici.aktif ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Kullanıcıyı Sil</AlertDialogTitle>
                              <AlertDialogDescription>
                                {kullanici.ad_soyad} kullanıcısını silmek istediğinizden emin misiniz? Bu işlem geri
                                alınamaz.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>İptal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteKullanici(kullanici.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Sil
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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

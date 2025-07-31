"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import {
  User,
  Shield,
  MapPin,
  Building,
  Save,
  ArrowLeft,
  Upload,
  Eye,
  EyeOff,
  Key,
  Calendar,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { tesisService } from "@/lib/supabase"
import type { IKullanici, ITesis } from "@/lib/types"

interface KullaniciDetay extends IKullanici {
  tesis?: ITesis
}

export default function KullaniciDuzenlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [kullanici, setKullanici] = useState<KullaniciDetay | null>(null)
  const [tesisler, setTesisler] = useState<ITesis[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>("")

  // Form state
  const [formData, setFormData] = useState({
    ad_soyad: "",
    eposta: "",
    rol: "memur" as IKullanici["rol"],
    ilce: "",
    tesis_id: "",
    aktif: true,
    yeni_sifre: "",
    sifre_tekrar: "",
    telefon: "",
    adres: "",
    dogum_tarihi: "",
    notlar: "",
  })

  const ilceler = [
    "Adapazarı",
    "Akyazı",
    "Arifiye",
    "Erenler",
    "Ferizli",
    "Geyve",
    "Hendek",
    "Karapürçek",
    "Karasu",
    "Kaynarca",
    "Kocaali",
    "Pamukova",
    "Sapanca",
    "Serdivan",
    "Söğütlü",
    "Taraklı",
  ]

  useEffect(() => {
    loadKullanici()
    loadTesisler()
  }, [params.id])

  const loadKullanici = async () => {
    try {
      if (!supabase) {
        // Mock data for development - UUID formatında
        const mockKullanici: KullaniciDetay = {
          id: params.id,
          ad_soyad: "Ahmet Yılmaz",
          eposta: "ahmet.yilmaz@sakaryagsim.gov.tr",
          rol: "admin",
          ilce: null,
          tesis_id: null,
          olusturulma_tarihi: "2024-01-01T00:00:00Z",
          aktif: true,
          son_giris: "2024-01-15T10:30:00Z",
        }
        setKullanici(mockKullanici)
        setFormData({
          ad_soyad: mockKullanici.ad_soyad,
          eposta: mockKullanici.eposta,
          rol: mockKullanici.rol,
          ilce: mockKullanici.ilce || "",
          tesis_id: mockKullanici.tesis_id || "",
          aktif: mockKullanici.aktif,
          yeni_sifre: "",
          sifre_tekrar: "",
          telefon: "",
          adres: "",
          dogum_tarihi: "",
          notlar: "",
        })
        setLoading(false)
        return
      }

      // UUID validation
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(params.id)) {
        throw new Error("Geçersiz kullanıcı ID formatı")
      }

      const { data, error } = await supabase
        .from("kullanicilar")
        .select(`
          *,
          tesis:tesisler(*)
        `)
        .eq("id", params.id)
        .single()

      if (error) throw error

      setKullanici(data)
      setFormData({
        ad_soyad: data.ad_soyad,
        eposta: data.eposta,
        rol: data.rol,
        ilce: data.ilce || "",
        tesis_id: data.tesis_id || "",
        aktif: data.aktif,
        yeni_sifre: "",
        sifre_tekrar: "",
        telefon: data.telefon || "",
        adres: data.adres || "",
        dogum_tarihi: data.dogum_tarihi || "",
        notlar: data.notlar || "",
      })

      if (data.avatar_url) {
        setAvatarPreview(data.avatar_url)
      }
    } catch (error) {
      console.error("Kullanıcı yüklenirken hata:", error)
      toast.error("Kullanıcı bilgileri yüklenemedi")
    } finally {
      setLoading(false)
    }
  }

  const loadTesisler = async () => {
    try {
      const data = await tesisService.getAll()
      setTesisler(data)
    } catch (error) {
      console.error("Tesisler yüklenirken hata:", error)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Dosya boyutu 5MB'dan küçük olmalıdır")
        return
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Sadece resim dosyaları yüklenebilir")
        return
      }

      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !supabase) return null

    try {
      const fileExt = avatarFile.name.split(".").pop()
      const fileName = `${params.id}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage.from("user-avatars").upload(filePath, avatarFile)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from("user-avatars").getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error("Avatar yüklenirken hata:", error)
      toast.error("Profil resmi yüklenemedi")
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Şifre kontrolü
      if (formData.yeni_sifre && formData.yeni_sifre !== formData.sifre_tekrar) {
        toast.error("Şifreler eşleşmiyor")
        setSaving(false)
        return
      }

      if (formData.yeni_sifre && formData.yeni_sifre.length < 6) {
        toast.error("Şifre en az 6 karakter olmalıdır")
        setSaving(false)
        return
      }

      // Avatar yükleme
      let avatarUrl = avatarPreview
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar()
        if (uploadedUrl) {
          avatarUrl = uploadedUrl
        }
      }

      if (!supabase) {
        // Mock update for development
        toast.success("Kullanıcı başarıyla güncellendi (Mock)")
        router.push("/admin/kullanicilar")
        return
      }

      // Kullanıcı bilgilerini güncelle
      const updateData: any = {
        ad_soyad: formData.ad_soyad,
        eposta: formData.eposta,
        rol: formData.rol,
        ilce: formData.rol === "bolge_sorumlusu" ? formData.ilce : null,
        tesis_id: formData.rol === "memur" ? formData.tesis_id : null,
        aktif: formData.aktif,
        telefon: formData.telefon,
        adres: formData.adres,
        dogum_tarihi: formData.dogum_tarihi || null,
        notlar: formData.notlar,
        guncellenme_tarihi: new Date().toISOString(),
      }

      if (avatarUrl !== avatarPreview) {
        updateData.avatar_url = avatarUrl
      }

      const { error: updateError } = await supabase.from("kullanicilar").update(updateData).eq("id", params.id)

      if (updateError) throw updateError

      // Şifre güncelleme (eğer yeni şifre girilmişse)
      if (formData.yeni_sifre) {
        const { error: passwordError } = await supabase.auth.admin.updateUserById(params.id, {
          password: formData.yeni_sifre,
        })

        if (passwordError) {
          console.error("Şifre güncellenirken hata:", passwordError)
          toast.error("Şifre güncellenemedi")
        }
      }

      toast.success("Kullanıcı başarıyla güncellendi")
      router.push("/admin/kullanicilar")
    } catch (error) {
      console.error("Güncelleme hatası:", error)
      toast.error("Güncelleme sırasında bir hata oluştu")
    } finally {
      setSaving(false)
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getTesisAdi = (tesisId: string) => {
    const tesis = tesisler.find((t) => t.id === tesisId)
    return tesis ? tesis.ad : `Tesis #${tesisId}`
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Kullanıcı bilgileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!kullanici) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-red-600">Kullanıcı bulunamadı</p>
          <Link href="/admin/kullanicilar">
            <Button className="mt-4">Geri Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/kullanicilar">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kullanıcı Düzenle</h1>
            <p className="text-gray-600">
              {kullanici.ad_soyad} - {getRolLabel(kullanici.rol)}
            </p>
          </div>
        </div>
        <Badge variant={kullanici.aktif ? "default" : "secondary"}>{kullanici.aktif ? "Aktif" : "Pasif"}</Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profil Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profil Bilgileri
            </CardTitle>
            <CardDescription>Kullanıcının temel bilgilerini düzenleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarPreview || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {getInitials(formData.ad_soyad || kullanici.ad_soyad)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="avatar">Profil Resmi</Label>
                <div className="flex items-center gap-2">
                  <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} className="w-auto" />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Yükle
                  </Button>
                </div>
                <p className="text-xs text-gray-500">JPG, PNG veya GIF. Maksimum 5MB.</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ad_soyad">Ad Soyad *</Label>
                <Input
                  id="ad_soyad"
                  value={formData.ad_soyad}
                  onChange={(e) => setFormData({ ...formData, ad_soyad: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eposta">E-posta *</Label>
                <Input
                  id="eposta"
                  type="email"
                  value={formData.eposta}
                  onChange={(e) => setFormData({ ...formData, eposta: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefon">Telefon</Label>
                <Input
                  id="telefon"
                  value={formData.telefon}
                  onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                  placeholder="0264 xxx xx xx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dogum_tarihi">Doğum Tarihi</Label>
                <Input
                  id="dogum_tarihi"
                  type="date"
                  value={formData.dogum_tarihi}
                  onChange={(e) => setFormData({ ...formData, dogum_tarihi: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adres">Adres</Label>
              <Textarea
                id="adres"
                value={formData.adres}
                onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Rol ve Yetki Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Rol ve Yetki Bilgileri
            </CardTitle>
            <CardDescription>Kullanıcının sistem içindeki rolü ve yetkilerini belirleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rol">Rol *</Label>
                <Select
                  value={formData.rol}
                  onValueChange={(value: IKullanici["rol"]) =>
                    setFormData({ ...formData, rol: value, ilce: "", tesis_id: "" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-red-600" />
                        Admin
                      </div>
                    </SelectItem>
                    <SelectItem value="bolge_sorumlusu">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        Bölge Sorumlusu
                      </div>
                    </SelectItem>
                    <SelectItem value="memur">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-green-600" />
                        Memur
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.rol === "bolge_sorumlusu" && (
                <div className="space-y-2">
                  <Label htmlFor="ilce">İlçe *</Label>
                  <Select value={formData.ilce} onValueChange={(value) => setFormData({ ...formData, ilce: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="İlçe seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {ilceler.map((ilce) => (
                        <SelectItem key={ilce} value={ilce}>
                          {ilce}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.rol === "memur" && (
                <div className="space-y-2">
                  <Label htmlFor="tesis_id">Tesis *</Label>
                  <Select
                    value={formData.tesis_id}
                    onValueChange={(value) => setFormData({ ...formData, tesis_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tesis seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {tesisler.map((tesis) => (
                        <SelectItem key={tesis.id} value={tesis.id}>
                          <div className="flex flex-col">
                            <span>{tesis.ad}</span>
                            <span className="text-xs text-gray-500">{tesis.ilce}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="aktif"
                checked={formData.aktif}
                onCheckedChange={(checked) => setFormData({ ...formData, aktif: checked })}
              />
              <Label htmlFor="aktif">Kullanıcı aktif</Label>
            </div>
          </CardContent>
        </Card>

        {/* Şifre Değiştirme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Şifre Değiştirme
            </CardTitle>
            <CardDescription>Kullanıcının şifresini değiştirmek için yeni şifre belirleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yeni_sifre">Yeni Şifre</Label>
                <div className="relative">
                  <Input
                    id="yeni_sifre"
                    type={showPassword ? "text" : "password"}
                    value={formData.yeni_sifre}
                    onChange={(e) => setFormData({ ...formData, yeni_sifre: e.target.value })}
                    placeholder="Boş bırakılırsa değiştirilmez"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sifre_tekrar">Şifre Tekrar</Label>
                <Input
                  id="sifre_tekrar"
                  type={showPassword ? "text" : "password"}
                  value={formData.sifre_tekrar}
                  onChange={(e) => setFormData({ ...formData, sifre_tekrar: e.target.value })}
                  placeholder="Yeni şifreyi tekrar girin"
                />
              </div>
            </div>
            {formData.yeni_sifre && formData.yeni_sifre !== formData.sifre_tekrar && (
              <p className="text-sm text-red-600">Şifreler eşleşmiyor</p>
            )}
          </CardContent>
        </Card>

        {/* Ek Bilgiler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Ek Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notlar">Notlar</Label>
              <Textarea
                id="notlar"
                value={formData.notlar}
                onChange={(e) => setFormData({ ...formData, notlar: e.target.value })}
                rows={3}
                placeholder="Kullanıcı hakkında ek notlar..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <Label className="text-sm text-gray-600">Oluşturulma Tarihi</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    {new Date(kullanici.olusturulma_tarihi).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Son Giriş</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Activity className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">
                    {kullanici.son_giris
                      ? new Date(kullanici.son_giris).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Hiç giriş yapmamış"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/kullanicilar">
            <Button type="button" variant="outline">
              İptal
            </Button>
          </Link>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Kaydediliyor...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Kaydet
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

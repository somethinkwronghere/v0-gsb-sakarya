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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { User, Shield, MapPin, Building, Save, ArrowLeft, Upload, Eye, EyeOff, Key, UserPlus } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { tesisService } from "@/lib/supabase"
import type { IKullanici, ITesis } from "@/lib/types"

export default function YeniKullaniciPage() {
  const router = useRouter()
  const [tesisler, setTesisler] = useState<ITesis[]>([])
  const [loading, setLoading] = useState(false)
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
    sifre: "",
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
    loadTesisler()
  }, [])

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

  const uploadAvatar = async (userId: string): Promise<string | null> => {
    if (!avatarFile || !supabase) return null

    try {
      const fileExt = avatarFile.name.split(".").pop()
      const fileName = `${userId}-${Date.now()}.${fileExt}`
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
      // Form validasyonu
      if (!formData.ad_soyad.trim()) {
        toast.error("Ad soyad gereklidir")
        setSaving(false)
        return
      }

      if (!formData.eposta.trim()) {
        toast.error("E-posta gereklidir")
        setSaving(false)
        return
      }

      if (!formData.sifre) {
        toast.error("Şifre gereklidir")
        setSaving(false)
        return
      }

      if (formData.sifre !== formData.sifre_tekrar) {
        toast.error("Şifreler eşleşmiyor")
        setSaving(false)
        return
      }

      if (formData.sifre.length < 6) {
        toast.error("Şifre en az 6 karakter olmalıdır")
        setSaving(false)
        return
      }

      if (formData.rol === "bolge_sorumlusu" && !formData.ilce) {
        toast.error("Bölge sorumlusu için ilçe seçimi gereklidir")
        setSaving(false)
        return
      }

      if (formData.rol === "memur" && !formData.tesis_id) {
        toast.error("Memur için tesis seçimi gereklidir")
        setSaving(false)
        return
      }

      if (!supabase) {
        // Mock create for development
        toast.success("Kullanıcı başarıyla oluşturuldu (Mock)")
        router.push("/admin/kullanicilar")
        return
      }

      // Supabase Auth ile kullanıcı oluştur
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.eposta,
        password: formData.sifre,
        email_confirm: true,
        user_metadata: {
          full_name: formData.ad_soyad,
        },
      })

      if (authError) {
        console.error("Auth error:", authError)
        if (authError.message.includes("not allowed")) {
          toast.error("Kullanıcı oluşturma yetkisi yok. Admin panelinden RLS ayarlarını kontrol edin.")
        } else if (authError.message.includes("already registered")) {
          toast.error("Bu e-posta adresi zaten kayıtlı")
        } else {
          toast.error(`Kullanıcı oluşturulamadı: ${authError.message}`)
        }
        setSaving(false)
        return
      }

      const userId = authData.user.id

      // Avatar yükleme
      let avatarUrl = null
      if (avatarFile) {
        avatarUrl = await uploadAvatar(userId)
      }

      // Kullanıcı bilgilerini veritabanına kaydet
      const userData = {
        id: userId,
        ad_soyad: formData.ad_soyad,
        eposta: formData.eposta,
        rol: formData.rol,
        ilce: formData.rol === "bolge_sorumlusu" ? formData.ilce : null,
        tesis_id: formData.rol === "memur" ? formData.tesis_id : null,
        aktif: formData.aktif,
        telefon: formData.telefon || null,
        adres: formData.adres || null,
        dogum_tarihi: formData.dogum_tarihi || null,
        notlar: formData.notlar || null,
        avatar_url: avatarUrl,
        olusturulma_tarihi: new Date().toISOString(),
      }

      const { error: dbError } = await supabase.from("kullanicilar").insert(userData)

      if (dbError) {
        console.error("Database error:", dbError)
        // Auth kullanıcısını sil eğer veritabanı hatası varsa
        await supabase.auth.admin.deleteUser(userId)
        throw dbError
      }

      toast.success("Kullanıcı başarıyla oluşturuldu")
      router.push("/admin/kullanicilar")
    } catch (error: any) {
      console.error("Oluşturma hatası:", error)
      toast.error("Kullanıcı oluşturulurken bir hata oluştu")
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
            <h1 className="text-3xl font-bold text-gray-800">Yeni Kullanıcı</h1>
            <p className="text-gray-600">Sisteme yeni kullanıcı ekleyin</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profil Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profil Bilgileri
            </CardTitle>
            <CardDescription>Kullanıcının temel bilgilerini girin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarPreview || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {formData.ad_soyad ? getInitials(formData.ad_soyad) : "?"}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ad_soyad">Ad Soyad *</Label>
                <Input
                  id="ad_soyad"
                  value={formData.ad_soyad}
                  onChange={(e) => setFormData({ ...formData, ad_soyad: e.target.value })}
                  required
                  placeholder="Kullanıcının adı ve soyadı"
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
                  placeholder="kullanici@sakaryagsim.gov.tr"
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
                placeholder="Kullanıcının adresi"
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

        {/* Şifre Belirleme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Şifre Belirleme
            </CardTitle>
            <CardDescription>Kullanıcının giriş şifresini belirleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sifre">Şifre *</Label>
                <div className="relative">
                  <Input
                    id="sifre"
                    type={showPassword ? "text" : "password"}
                    value={formData.sifre}
                    onChange={(e) => setFormData({ ...formData, sifre: e.target.value })}
                    required
                    placeholder="En az 6 karakter"
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
                <Label htmlFor="sifre_tekrar">Şifre Tekrar *</Label>
                <Input
                  id="sifre_tekrar"
                  type={showPassword ? "text" : "password"}
                  value={formData.sifre_tekrar}
                  onChange={(e) => setFormData({ ...formData, sifre_tekrar: e.target.value })}
                  required
                  placeholder="Şifreyi tekrar girin"
                />
              </div>
            </div>
            {formData.sifre && formData.sifre !== formData.sifre_tekrar && (
              <p className="text-sm text-red-600">Şifreler eşleşmiyor</p>
            )}
            {formData.sifre && formData.sifre.length < 6 && (
              <p className="text-sm text-red-600">Şifre en az 6 karakter olmalıdır</p>
            )}
          </CardContent>
        </Card>

        {/* Ek Bilgiler */}
        <Card>
          <CardHeader>
            <CardTitle>Ek Bilgiler</CardTitle>
            <CardDescription>Kullanıcı hakkında ek notlar ekleyebilirsiniz</CardDescription>
          </CardHeader>
          <CardContent>
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
                Oluşturuluyor...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Kullanıcı Oluştur
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

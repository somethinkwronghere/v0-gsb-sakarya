"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Building, Save, ArrowLeft, Upload, MapPin, Phone, Plus, ImageIcon } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import type { ITesis } from "@/lib/types"

export default function YeniTesisPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  // Form state
  const [formData, setFormData] = useState({
    ad: "",
    tip: "yurt" as ITesis["tip"],
    ilce: "",
    adres: "",
    kapasite: 0,
    lat: 0,
    lng: 0,
    aciklama: "",
    iletisim: {
      telefon: "",
      email: "",
      yetkili: "",
    },
    aktif: true,
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Dosya boyutu 10MB'dan küçük olmalıdır")
        return
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Sadece resim dosyaları yüklenebilir")
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (tesisId: string): Promise<string | null> => {
    if (!imageFile || !supabase) return null

    try {
      const fileExt = imageFile.name.split(".").pop()
      const fileName = `${tesisId}-${Date.now()}.${fileExt}`
      const filePath = `facilities/${fileName}`

      const { error: uploadError } = await supabase.storage.from("facility-images").upload(filePath, imageFile)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from("facility-images").getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error("Resim yüklenirken hata:", error)
      toast.error("Resim yüklenemedi")
      return null
    }
  }

  const generateSlug = (ad: string) => {
    return ad
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Form validation
      if (!formData.ad.trim()) {
        toast.error("Tesis adı gereklidir")
        setSaving(false)
        return
      }

      if (!formData.ilce) {
        toast.error("İlçe seçimi gereklidir")
        setSaving(false)
        return
      }

      if (!formData.adres.trim()) {
        toast.error("Adres gereklidir")
        setSaving(false)
        return
      }

      if (!supabase) {
        // Mock create for development
        toast.success("Tesis başarıyla oluşturuldu (Mock)")
        router.push("/admin/tesisler")
        return
      }

      // Create tesis first
      const tesisData = {
        ad: formData.ad,
        tip: formData.tip,
        ilce: formData.ilce,
        adres: formData.adres,
        kapasite: formData.kapasite || null,
        lat: formData.lat || null,
        lng: formData.lng || null,
        aciklama: formData.aciklama || null,
        iletisim: formData.iletisim,
        aktif: formData.aktif,
        slug: generateSlug(formData.ad),
        olusturulma_tarihi: new Date().toISOString(),
        guncellenme_tarihi: new Date().toISOString(),
      }

      const { data: createdTesis, error: tesisError } = await supabase
        .from("tesisler")
        .insert(tesisData)
        .select()
        .single()

      if (tesisError) throw tesisError

      // Upload image if exists
      let imageUrl = null
      if (imageFile) {
        imageUrl = await uploadImage(createdTesis.id)
      }

      // Update tesis with image URL if uploaded
      if (imageUrl) {
        const { error: updateError } = await supabase
          .from("tesisler")
          .update({ foto_url: imageUrl })
          .eq("id", createdTesis.id)

        if (updateError) {
          console.error("Resim URL güncellenirken hata:", updateError)
        }
      }

      toast.success("Tesis başarıyla oluşturuldu")
      router.push("/admin/tesisler")
    } catch (error: any) {
      console.error("Oluşturma hatası:", error)
      toast.error("Tesis oluşturulurken bir hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  const getTipLabel = (tip: string) => {
    switch (tip) {
      case "yurt":
        return "KYK Yurdu"
      case "genclik_merkezi":
        return "Gençlik Merkezi"
      case "spor_salonu":
        return "Spor Salonu"
      default:
        return tip
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/tesisler">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Yeni Tesis</h1>
            <p className="text-gray-600">Sisteme yeni tesis ekleyin</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Plus className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Temel Bilgiler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Temel Bilgiler
            </CardTitle>
            <CardDescription>Tesisin temel bilgilerini girin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ad">Tesis Adı *</Label>
                <Input
                  id="ad"
                  value={formData.ad}
                  onChange={(e) => setFormData({ ...formData, ad: e.target.value })}
                  required
                  placeholder="Tesis adını girin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tip">Tesis Tipi *</Label>
                <Select
                  value={formData.tip}
                  onValueChange={(value: ITesis["tip"]) => setFormData({ ...formData, tip: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yurt">KYK Yurdu</SelectItem>
                    <SelectItem value="genclik_merkezi">Gençlik Merkezi</SelectItem>
                    <SelectItem value="spor_salonu">Spor Salonu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="kapasite">Kapasite</Label>
                <Input
                  id="kapasite"
                  type="number"
                  value={formData.kapasite}
                  onChange={(e) => setFormData({ ...formData, kapasite: Number.parseInt(e.target.value) || 0 })}
                  placeholder="Kişi kapasitesi"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adres">Adres *</Label>
              <Textarea
                id="adres"
                value={formData.adres}
                onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
                rows={2}
                required
                placeholder="Tesisin tam adresini girin"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aciklama">Açıklama</Label>
              <Textarea
                id="aciklama"
                value={formData.aciklama}
                onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
                rows={3}
                placeholder="Tesis hakkında açıklama (isteğe bağlı)"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="aktif"
                checked={formData.aktif}
                onCheckedChange={(checked) => setFormData({ ...formData, aktif: checked })}
              />
              <Label htmlFor="aktif">Tesis aktif</Label>
            </div>
          </CardContent>
        </Card>

        {/* Konum Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Konum Bilgileri
            </CardTitle>
            <CardDescription>GPS koordinatları (isteğe bağlı)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat">Enlem (Latitude)</Label>
                <Input
                  id="lat"
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={(e) => setFormData({ ...formData, lat: Number.parseFloat(e.target.value) || 0 })}
                  placeholder="40.7831"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">Boylam (Longitude)</Label>
                <Input
                  id="lng"
                  type="number"
                  step="any"
                  value={formData.lng}
                  onChange={(e) => setFormData({ ...formData, lng: Number.parseFloat(e.target.value) || 0 })}
                  placeholder="30.4023"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* İletişim Bilgileri */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              İletişim Bilgileri
            </CardTitle>
            <CardDescription>Tesis iletişim bilgileri (isteğe bağlı)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefon">Telefon</Label>
                <Input
                  id="telefon"
                  value={formData.iletisim.telefon}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      iletisim: { ...formData.iletisim, telefon: e.target.value },
                    })
                  }
                  placeholder="0264 xxx xx xx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.iletisim.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      iletisim: { ...formData.iletisim, email: e.target.value },
                    })
                  }
                  placeholder="tesis@sakaryagsim.gov.tr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yetkili">Yetkili Kişi</Label>
                <Input
                  id="yetkili"
                  value={formData.iletisim.yetkili}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      iletisim: { ...formData.iletisim, yetkili: e.target.value },
                    })
                  }
                  placeholder="Yetkili kişi adı"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tesis Resmi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Tesis Resmi
            </CardTitle>
            <CardDescription>Tesis için fotoğraf yükleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Tesis resmi önizleme"
                  className="w-full max-w-md h-48 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setImagePreview("")
                    setImageFile(null)
                  }}
                >
                  Kaldır
                </Button>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="image">Resim Dosyası</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("image")?.click()}
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Dosya Seç
                </Button>
              </div>
              <p className="text-xs text-gray-500">JPG, PNG veya GIF. Maksimum 10MB.</p>
            </div>
          </CardContent>
        </Card>

        {/* Ek Bilgiler */}
        <Card>
          <CardHeader>
            <CardTitle>Ek Bilgiler</CardTitle>
            <CardDescription>Otomatik oluşturulacak bilgiler</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <Label className="text-sm text-gray-600">Slug (URL)</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-mono text-gray-500">
                    {formData.ad ? generateSlug(formData.ad) : "tesis-url-buraya-gelecek"}
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Tesis Tipi</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{getTipLabel(formData.tip)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/tesisler">
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
                Tesis Oluştur
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

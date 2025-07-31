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
import { toast } from "sonner"
import { Building, Save, ArrowLeft, Upload, MapPin, Phone, X } from "lucide-react"
import Link from "next/link"
import { supabase, tesisService } from "@/lib/supabase"
import type { ITesis } from "@/lib/types"

export default function TesisDuzenlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [tesis, setTesis] = useState<ITesis | null>(null)
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    loadTesis()
  }, [params.id])

  const loadTesis = async () => {
    try {
      const data = await tesisService.getBySlug(params.id)
      setTesis(data)
      setFormData({
        ad: data.ad,
        tip: data.tip,
        ilce: data.ilce,
        adres: data.adres,
        kapasite: data.kapasite || 0,
        lat: data.lat || 0,
        lng: data.lng || 0,
        aciklama: data.aciklama || "",
        iletisim: data.iletisim || { telefon: "", email: "", yetkili: "" },
        aktif: data.aktif,
      })

      if (data.foto_url) {
        setImagePreview(data.foto_url)
      }
    } catch (error) {
      console.error("Tesis yüklenirken hata:", error)
      toast.error("Tesis bilgileri yüklenemedi")
    } finally {
      setLoading(false)
    }
  }

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

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile || !supabase) return null

    try {
      const fileExt = imageFile.name.split(".").pop()
      const fileName = `${params.id}-${Date.now()}.${fileExt}`
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Resim yükleme
      let imageUrl = imagePreview
      if (imageFile) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      if (!supabase) {
        toast.success("Tesis başarıyla güncellendi (Mock)")
        router.push("/admin/tesisler")
        return
      }

      // Tesis güncelleme
      const updateData = {
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
        foto_url: imageUrl !== imagePreview ? imageUrl : tesis?.foto_url,
        guncellenme_tarihi: new Date().toISOString(),
      }

      await tesisService.update(tesis!.id, updateData)

      toast.success("Tesis başarıyla güncellendi")
      router.push("/admin/tesisler")
    } catch (error) {
      console.error("Güncelleme hatası:", error)
      toast.error("Güncelleme sırasında bir hata oluştu")
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

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Tesis bilgileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!tesis) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-red-600">Tesis bulunamadı</p>
          <Link href="/admin/tesisler">
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
          <Link href="/admin/tesisler">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tesis Düzenle</h1>
            <p className="text-gray-600">
              {tesis.ad} - {getTipLabel(tesis.tip)}
            </p>
          </div>
        </div>
        <Badge variant={tesis.aktif ? "default" : "secondary"}>{tesis.aktif ? "Aktif" : "Pasif"}</Badge>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Temel Bilgiler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Temel Bilgiler
            </CardTitle>
            <CardDescription>Tesisin temel bilgilerini düzenleyin</CardDescription>
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
                    <SelectValue />
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aciklama">Açıklama</Label>
              <Textarea
                id="aciklama"
                value={formData.aciklama}
                onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
                rows={3}
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
            <CardDescription>GPS koordinatları (opsiyonel)</CardDescription>
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
                  placeholder="Yetkili adı"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tesis Resmi */}
        <Card>
          <CardHeader>
            <CardTitle>Tesis Resmi</CardTitle>
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
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="image">Resim Dosyası</Label>
              <div className="flex items-center gap-2">
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="w-auto" />
                <Button type="button" variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Yükle
                </Button>
              </div>
              <p className="text-xs text-gray-500">JPG, PNG veya GIF. Maksimum 10MB.</p>
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

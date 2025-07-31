"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ImageEditor } from "@/components/image-editor"
import { supabase } from "@/lib/supabase"
import { ArrowLeft, Save, Building, MapPin, Users, Phone, ImageIcon } from "lucide-react"
import type { ITesis, TesisTipi } from "@/lib/types"

interface TesisDuzenlePageProps {
  params: {
    id: string
  }
}

const TESIS_TIPLERI: { value: TesisTipi; label: string }[] = [
  { value: "yurt", label: "Yurt" },
  { value: "genclik_merkezi", label: "Gençlik Merkezi" },
  { value: "spor_salonu", label: "Spor Salonu" },
]

const SAKARYA_ILCELERI = [
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

export default function TesisDuzenlePage({ params }: TesisDuzenlePageProps) {
  const router = useRouter()
  const [tesis, setTesis] = useState<ITesis | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [uploadingImage, setUploadingImage] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    ad: "",
    tip: "" as TesisTipi,
    ilce: "",
    adres: "",
    kapasite: 0,
    aciklama: "",
    telefon: "",
    email: "",
    yetkili: "",
    resim_url: "",
    aktif: true,
  })

  useEffect(() => {
    loadTesis()
  }, [params.id])

  const loadTesis = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("tesisler").select("*").eq("id", params.id).single()

      if (error) throw error

      setTesis(data)
      setFormData({
        ad: data.ad || "",
        tip: data.tip || "yurt",
        ilce: data.ilce || "",
        adres: data.adres || "",
        kapasite: data.kapasite || 0,
        aciklama: data.aciklama || "",
        telefon: data.iletisim?.telefon || "",
        email: data.iletisim?.email || "",
        yetkili: data.iletisim?.yetkili || "",
        resim_url: data.resim_url || "",
        aktif: data.aktif ?? true,
      })
    } catch (error) {
      console.error("Tesis yüklenirken hata:", error)
      setError("Tesis yüklenirken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setUploadingImage(true)

      // Create a unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `tesisler/${fileName}`

      // Try to upload to Supabase storage
      const { data, error } = await supabase.storage.from("tesisler").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.warn("Supabase storage error, using fallback:", error)
        // Fallback: create a local URL for development
        return URL.createObjectURL(file)
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from("tesisler").getPublicUrl(data.path)

      return urlData.publicUrl
    } catch (error) {
      console.warn("Image upload error, using fallback:", error)
      // Fallback: create a local URL
      return URL.createObjectURL(file)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleImageChange = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file)
      setFormData((prev) => ({ ...prev, resim_url: imageUrl }))
      setSuccess("Resim başarıyla yüklendi")
    } catch (error) {
      setError("Resim yüklenirken hata oluştu")
    }
  }

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.ad.trim()) {
      setError("Tesis adı gereklidir")
      return
    }

    if (!formData.tip) {
      setError("Tesis tipi gereklidir")
      return
    }

    if (!formData.ilce) {
      setError("İlçe seçimi gereklidir")
      return
    }

    if (!formData.adres.trim()) {
      setError("Adres gereklidir")
      return
    }

    if (formData.kapasite <= 0) {
      setError("Kapasite 0'dan büyük olmalıdır")
      return
    }

    try {
      setSaving(true)
      setError("")

      // Create slug from name
      const slug = formData.ad
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()

      // Prepare iletisim object
      const iletisim = {
        telefon: formData.telefon || undefined,
        email: formData.email || undefined,
        yetkili: formData.yetkili || undefined,
      }

      const updateData = {
        ad: formData.ad,
        tip: formData.tip,
        ilce: formData.ilce,
        adres: formData.adres,
        kapasite: formData.kapasite,
        aciklama: formData.aciklama,
        iletisim,
        resim_url: formData.resim_url || undefined,
        slug,
        aktif: formData.aktif,
        guncellenme_tarihi: new Date().toISOString(),
      }

      const { error } = await supabase.from("tesisler").update(updateData).eq("id", params.id)

      if (error) throw error

      setSuccess("Tesis başarıyla güncellendi")

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/tesisler")
      }, 1500)
    } catch (error) {
      console.error("Tesis güncellenirken hata:", error)
      setError("Tesis güncellenirken bir hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!tesis) {
    return (
      <div className="container mx-auto py-8">
        <Alert>
          <AlertDescription>Tesis bulunamadı</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Tesis Düzenle</h1>
          <p className="text-muted-foreground">Tesis bilgilerini güncelleyin</p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription className="text-green-600">{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Temel Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ad">Tesis Adı *</Label>
                    <Input
                      id="ad"
                      value={formData.ad}
                      onChange={(e) => handleInputChange("ad", e.target.value)}
                      placeholder="Tesis adını girin"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tip">Tesis Tipi *</Label>
                    <Select
                      value={formData.tip}
                      onValueChange={(value) => handleInputChange("tip", value as TesisTipi)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tesis tipi seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {TESIS_TIPLERI.map((tip) => (
                          <SelectItem key={tip.value} value={tip.value}>
                            {tip.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ilce">İlçe *</Label>
                    <Select value={formData.ilce} onValueChange={(value) => handleInputChange("ilce", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="İlçe seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {SAKARYA_ILCELERI.map((ilce) => (
                          <SelectItem key={ilce} value={ilce}>
                            {ilce}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="kapasite">Kapasite *</Label>
                    <Input
                      id="kapasite"
                      type="number"
                      min="1"
                      value={formData.kapasite}
                      onChange={(e) => handleInputChange("kapasite", Number.parseInt(e.target.value) || 0)}
                      placeholder="Kapasite girin"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="adres">Adres *</Label>
                  <Textarea
                    id="adres"
                    value={formData.adres}
                    onChange={(e) => handleInputChange("adres", e.target.value)}
                    placeholder="Tesis adresini girin"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="aciklama">Açıklama</Label>
                  <Textarea
                    id="aciklama"
                    value={formData.aciklama}
                    onChange={(e) => handleInputChange("aciklama", e.target.value)}
                    placeholder="Tesis hakkında açıklama girin"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* İletişim Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  İletişim Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefon">Telefon</Label>
                    <Input
                      id="telefon"
                      value={formData.telefon}
                      onChange={(e) => handleInputChange("telefon", e.target.value)}
                      placeholder="0264 xxx xx xx"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="ornek@gsb.gov.tr"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="yetkili">Yetkili Kişi</Label>
                  <Input
                    id="yetkili"
                    value={formData.yetkili}
                    onChange={(e) => handleInputChange("yetkili", e.target.value)}
                    placeholder="Yetkili kişi adını girin"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Tesis Resmi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageEditor
                  imageUrl={formData.resim_url}
                  onImageChange={handleImageChange}
                  onImageUrlChange={(url) => handleInputChange("resim_url", url)}
                />
                {uploadingImage && <p className="text-sm text-muted-foreground mt-2">Resim yükleniyor...</p>}
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Durum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="aktif">Aktif</Label>
                  <Switch
                    id="aktif"
                    checked={formData.aktif}
                    onCheckedChange={(checked) => handleInputChange("aktif", checked)}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">Pasif tesisler web sitesinde görüntülenmez</p>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <Button type="submit" className="w-full" disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                </Button>
              </CardContent>
            </Card>

            {/* Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tesis Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  <span className="text-muted-foreground">Konum:</span>
                  <span>{formData.ilce}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  <span className="text-muted-foreground">Kapasite:</span>
                  <span>{formData.kapasite} kişi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-3 w-3" />
                  <span className="text-muted-foreground">Tip:</span>
                  <span>{TESIS_TIPLERI.find((t) => t.value === formData.tip)?.label}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

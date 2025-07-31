"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { ArrowLeft, Save, Upload, FileText, Calendar, User, Building, ImageIcon, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { supabase, tesisService, haberService } from "@/lib/supabase"
import type { IHaber, ITesis } from "@/lib/types"

interface HaberDetay extends IHaber {
  tesis?: ITesis
}

export default function HaberDuzenlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [haber, setHaber] = useState<HaberDetay | null>(null)
  const [tesisler, setTesisler] = useState<ITesis[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [showPreview, setShowPreview] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    baslik: "",
    icerik: "",
    ozet: "",
    yazar: "",
    yayin_tarihi: "",
    tesis_id: "",
    aktif: true,
  })

  useEffect(() => {
    loadHaber()
    loadTesisler()
  }, [params.id])

  const loadHaber = async () => {
    try {
      if (!supabase) {
        // Mock data for development
        const mockHaber: HaberDetay = {
          id: params.id,
          baslik: "Örnek Haber Başlığı",
          icerik: "Bu bir örnek haber içeriğidir...",
          ozet: "Örnek haber özeti",
          yazar: "Admin",
          yayin_tarihi: "2024-01-15T00:00:00Z",
          olusturulma_tarihi: "2024-01-15T00:00:00Z",
          aktif: true,
          slug: "ornek-haber-basligi",
        }
        setHaber(mockHaber)
        setFormData({
          baslik: mockHaber.baslik,
          icerik: mockHaber.icerik,
          ozet: mockHaber.ozet || "",
          yazar: mockHaber.yazar,
          yayin_tarihi: mockHaber.yayin_tarihi.split("T")[0],
          tesis_id: mockHaber.tesis_id || "",
          aktif: mockHaber.aktif,
        })
        setLoading(false)
        return
      }

      const data = await haberService.getById(params.id)
      setHaber(data)
      setFormData({
        baslik: data.baslik,
        icerik: data.icerik,
        ozet: data.ozet || "",
        yazar: data.yazar,
        yayin_tarihi: data.yayin_tarihi.split("T")[0],
        tesis_id: data.tesis_id || "",
        aktif: data.aktif,
      })

      if (data.kapak_resmi) {
        setImagePreview(data.kapak_resmi)
      }
    } catch (error) {
      console.error("Haber yüklenirken hata:", error)
      toast.error("Haber bilgileri yüklenemedi")
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const filePath = `news/${fileName}`

      const { error: uploadError } = await supabase.storage.from("news-images").upload(filePath, imageFile)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from("news-images").getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error("Resim yüklenirken hata:", error)
      toast.error("Kapak resmi yüklenemedi")
      return null
    }
  }

  const generateSlug = (title: string) => {
    return title
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
      if (!formData.baslik.trim()) {
        toast.error("Başlık gereklidir")
        setSaving(false)
        return
      }

      if (!formData.icerik.trim()) {
        toast.error("İçerik gereklidir")
        setSaving(false)
        return
      }

      if (!formData.yazar.trim()) {
        toast.error("Yazar gereklidir")
        setSaving(false)
        return
      }

      // Image upload
      let imageUrl = imagePreview
      if (imageFile) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      if (!supabase) {
        // Mock update for development
        toast.success("Haber başarıyla güncellendi (Mock)")
        router.push("/admin/haberler")
        return
      }

      // Update haber
      const updateData = {
        baslik: formData.baslik,
        icerik: formData.icerik,
        ozet: formData.ozet || null,
        yazar: formData.yazar,
        yayin_tarihi: new Date(formData.yayin_tarihi).toISOString(),
        tesis_id: formData.tesis_id || null,
        aktif: formData.aktif,
        kapak_resmi: imageUrl || null,
        slug: generateSlug(formData.baslik),
      }

      const { error } = await supabase.from("haberler").update(updateData).eq("id", params.id)

      if (error) throw error

      toast.success("Haber başarıyla güncellendi")
      router.push("/admin/haberler")
    } catch (error) {
      console.error("Güncelleme hatası:", error)
      toast.error("Güncelleme sırasında bir hata oluştu")
    } finally {
      setSaving(false)
    }
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

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Haber bilgileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!haber) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-red-600">Haber bulunamadı</p>
          <Link href="/admin/haberler">
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
          <Link href="/admin/haberler">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Haber Düzenle</h1>
            <p className="text-gray-600">{haber.baslik}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={haber.aktif ? "default" : "secondary"}>{haber.aktif ? "Aktif" : "Pasif"}</Badge>
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? "Düzenleme" : "Önizleme"}
          </Button>
        </div>
      </div>

      {showPreview ? (
        // Preview Mode
        <Card>
          <CardContent className="p-8">
            <article className="prose prose-lg max-w-none">
              {imagePreview && (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt={formData.baslik}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <h1 className="text-3xl font-bold mb-4">{formData.baslik}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {formData.yazar}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(formData.yayin_tarihi).toLocaleDateString("tr-TR")}
                </div>
                {formData.tesis_id && (
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {tesisler.find((t) => t.id === formData.tesis_id)?.ad}
                  </div>
                )}
              </div>
              {formData.ozet && <p className="text-lg text-gray-700 mb-6 font-medium">{formData.ozet}</p>}
              <div className="whitespace-pre-wrap">{formData.icerik}</div>
            </article>
          </CardContent>
        </Card>
      ) : (
        // Edit Mode
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Temel Bilgiler */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Temel Bilgiler
              </CardTitle>
              <CardDescription>Haberin temel bilgilerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baslik">Başlık *</Label>
                <Input
                  id="baslik"
                  value={formData.baslik}
                  onChange={(e) => setFormData({ ...formData, baslik: e.target.value })}
                  required
                  placeholder="Haber başlığını girin"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ozet">Özet</Label>
                <Textarea
                  id="ozet"
                  value={formData.ozet}
                  onChange={(e) => setFormData({ ...formData, ozet: e.target.value })}
                  rows={3}
                  placeholder="Haberin kısa özetini girin (isteğe bağlı)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icerik">İçerik *</Label>
                <Textarea
                  id="icerik"
                  value={formData.icerik}
                  onChange={(e) => setFormData({ ...formData, icerik: e.target.value })}
                  rows={12}
                  required
                  placeholder="Haberin detaylı içeriğini girin"
                />
              </div>
            </CardContent>
          </Card>

          {/* Kapak Resmi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Kapak Resmi
              </CardTitle>
              <CardDescription>Haber için kapak resmi yükleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Kapak resmi önizleme"
                    className="w-full h-48 object-cover rounded-lg"
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
                <Label htmlFor="kapak_resmi">Kapak Resmi</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="kapak_resmi"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1"
                    style={{ display: "none" }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("kapak_resmi")?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Dosya Seç
                  </Button>
                </div>
                <p className="text-xs text-gray-500">JPG, PNG veya GIF. Maksimum 5MB.</p>
              </div>
            </CardContent>
          </Card>

          {/* Yayın Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Yayın Bilgileri
              </CardTitle>
              <CardDescription>Yayın tarihi ve yazar bilgilerini belirleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yazar">Yazar *</Label>
                  <Input
                    id="yazar"
                    value={formData.yazar}
                    onChange={(e) => setFormData({ ...formData, yazar: e.target.value })}
                    required
                    placeholder="Yazar adını girin"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yayin_tarihi">Yayın Tarihi *</Label>
                  <Input
                    id="yayin_tarihi"
                    type="date"
                    value={formData.yayin_tarihi}
                    onChange={(e) => setFormData({ ...formData, yayin_tarihi: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tesis_id">İlgili Tesis (İsteğe Bağlı)</Label>
                <Select
                  value={formData.tesis_id}
                  onValueChange={(value) => setFormData({ ...formData, tesis_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tesis seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Tesis seçilmedi</SelectItem>
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="aktif"
                  checked={formData.aktif}
                  onCheckedChange={(checked) => setFormData({ ...formData, aktif: checked })}
                />
                <Label htmlFor="aktif">Haber aktif</Label>
              </div>
            </CardContent>
          </Card>

          {/* Ek Bilgiler */}
          <Card>
            <CardHeader>
              <CardTitle>Ek Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label className="text-sm text-gray-600">Oluşturulma Tarihi</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{formatDate(haber.olusturulma_tarihi)}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Slug</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-mono">{generateSlug(formData.baslik)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Link href="/admin/haberler">
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
      )}
    </div>
  )
}

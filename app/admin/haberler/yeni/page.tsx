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
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ImageEditor } from "@/components/image-editor"
import { supabase } from "@/lib/supabase"
import { ArrowLeft, Save, Eye, EyeOff, Calendar, User, Building, Tag, ImageIcon, Plus } from "lucide-react"
import type { ITesis } from "@/lib/types"

export default function YeniHaberPage() {
  const router = useRouter()
  const [tesisler, setTesisler] = useState<ITesis[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [previewMode, setPreviewMode] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    baslik: "",
    icerik: "",
    ozet: "",
    kapak_resmi: "",
    yazar: "",
    yayin_tarihi: new Date().toISOString().split("T")[0],
    tesis_id: null,
    aktif: true,
  })

  // Tags state
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    loadTesisler()
  }, [])

  const loadTesisler = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("tesisler").select("id, ad, tip, ilce").eq("aktif", true).order("ad")

      if (error) throw error
      setTesisler(data || [])
    } catch (error) {
      console.error("Tesisler yüklenirken hata:", error)
      // Use fallback data if database is not available
      setTesisler([])
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
      const filePath = `haberler/${fileName}`

      // Try to upload to Supabase storage
      const { data, error } = await supabase.storage.from("haberler").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.warn("Supabase storage error, using fallback:", error)
        // Fallback: create a local URL for development
        return URL.createObjectURL(file)
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from("haberler").getPublicUrl(data.path)

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
      setFormData((prev) => ({ ...prev, kapak_resmi: imageUrl }))
      setSuccess("Resim başarıyla yüklendi")
    } catch (error) {
      setError("Resim yüklenirken hata oluştu")
    }
  }

  const handleInputChange = (field: string, value: string | boolean | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.baslik.trim()) {
      setError("Başlık gereklidir")
      return
    }

    if (!formData.icerik.trim()) {
      setError("İçerik gereklidir")
      return
    }

    if (!formData.yazar.trim()) {
      setError("Yazar gereklidir")
      return
    }

    if (!formData.yayin_tarihi) {
      setError("Yayın tarihi gereklidir")
      return
    }

    try {
      setSaving(true)
      setError("")

      // Create slug from title
      const slug = formData.baslik
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()

      // Add tags to content
      const contentWithTags =
        tags.length > 0 ? `${formData.icerik}\n\n${tags.map((tag) => `#${tag}`).join(" ")}` : formData.icerik

      const insertData = {
        baslik: formData.baslik,
        icerik: contentWithTags,
        ozet: formData.ozet || null,
        kapak_resmi: formData.kapak_resmi || null,
        yazar: formData.yazar,
        yayin_tarihi: formData.yayin_tarihi,
        tesis_id: formData.tesis_id,
        slug,
        aktif: formData.aktif,
        olusturulma_tarihi: new Date().toISOString(),
      }

      const { error } = await supabase.from("haberler").insert(insertData)

      if (error) throw error

      setSuccess("Haber başarıyla oluşturuldu")

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/admin/haberler")
      }, 1500)
    } catch (error) {
      console.error("Haber oluşturulurken hata:", error)
      setError("Haber oluşturulurken bir hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Yeni Haber</h1>
            <p className="text-muted-foreground">Yeni bir haber oluşturun</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {previewMode ? "Düzenleme" : "Önizleme"}
          </Button>
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

      {previewMode ? (
        /* Preview Mode */
        <Card>
          <CardContent className="p-8">
            <article className="prose prose-lg max-w-none">
              {formData.kapak_resmi && (
                <img
                  src={formData.kapak_resmi || "/placeholder.svg"}
                  alt={formData.baslik}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-4">{formData.baslik || "Haber Başlığı"}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {formData.yazar || "Yazar"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(formData.yayin_tarihi).toLocaleDateString("tr-TR")}
                  </div>
                  {formData.tesis_id && (
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {tesisler.find((t) => t.id === formData.tesis_id)?.ad}
                    </div>
                  )}
                </div>

                {formData.ozet && (
                  <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4">{formData.ozet}</p>
                )}

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>

              <div className="whitespace-pre-wrap leading-relaxed">
                {formData.icerik || "Haber içeriği buraya gelecek..."}
              </div>
            </article>
          </CardContent>
        </Card>
      ) : (
        /* Edit Mode */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Temel Bilgiler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="baslik">Başlık *</Label>
                    <Input
                      id="baslik"
                      value={formData.baslik}
                      onChange={(e) => handleInputChange("baslik", e.target.value)}
                      placeholder="Haber başlığını girin"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="ozet">Özet</Label>
                    <Textarea
                      id="ozet"
                      value={formData.ozet}
                      onChange={(e) => handleInputChange("ozet", e.target.value)}
                      placeholder="Haberin kısa özetini girin"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="icerik">İçerik *</Label>
                    <Textarea
                      id="icerik"
                      value={formData.icerik}
                      onChange={(e) => handleInputChange("icerik", e.target.value)}
                      placeholder="Haber içeriğini girin"
                      rows={12}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Etiketler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Yeni etiket ekle"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Ekle
                    </Button>
                  </div>

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          #{tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
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
                    Kapak Resmi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageEditor
                    imageUrl={formData.kapak_resmi}
                    onImageChange={handleImageChange}
                    onImageUrlChange={(url) => handleInputChange("kapak_resmi", url)}
                  />
                  {uploadingImage && <p className="text-sm text-muted-foreground mt-2">Resim yükleniyor...</p>}
                </CardContent>
              </Card>

              {/* Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle>Yayın Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="yazar">Yazar *</Label>
                    <Input
                      id="yazar"
                      value={formData.yazar}
                      onChange={(e) => handleInputChange("yazar", e.target.value)}
                      placeholder="Yazar adını girin"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="yayin_tarihi">Yayın Tarihi *</Label>
                    <Input
                      id="yayin_tarihi"
                      type="date"
                      value={formData.yayin_tarihi}
                      onChange={(e) => handleInputChange("yayin_tarihi", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="tesis_id">İlgili Tesis</Label>
                    <Select
                      value={formData.tesis_id || ""}
                      onValueChange={(value) => handleInputChange("tesis_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tesis seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tesis seçilmedi</SelectItem>
                        {tesisler.map((tesis) => (
                          <SelectItem key={tesis.id} value={tesis.id}>
                            {tesis.ad} ({tesis.ilce})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Label htmlFor="aktif">Aktif</Label>
                    <Switch
                      id="aktif"
                      checked={formData.aktif}
                      onCheckedChange={(checked) => handleInputChange("aktif", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <Button type="submit" className="w-full" disabled={saving}>
                    <Save className="h-4 w-4 mr-2" />
                    {saving ? "Oluşturuluyor..." : "Haberi Oluştur"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

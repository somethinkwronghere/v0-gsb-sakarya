"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RotateCw, Crop, Upload } from "lucide-react"

interface ImageEditorProps {
  imageUrl?: string
  onImageChange: (file: File) => void
  onImageUrlChange?: (url: string) => void
}

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

export function ImageEditor({ imageUrl, onImageChange, onImageUrlChange }: ImageEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [editedImageUrl, setEditedImageUrl] = useState<string>("")
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 })
  const [zoom, setZoom] = useState([100])
  const [rotation, setRotation] = useState(0)
  const [brightness, setBrightness] = useState([100])
  const [contrast, setContrast] = useState([100])
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadImage = useCallback((src: string) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      setOriginalImage(img)
      setCropArea({ x: 0, y: 0, width: img.width, height: img.height })
      updatePreview(img, { x: 0, y: 0, width: img.width, height: img.height }, 100, 0, 100, 100)
    }
    img.src = src
  }, [])

  const updatePreview = useCallback(
    (img: HTMLImageElement, crop: CropArea, zoomLevel: number, rot: number, bright: number, cont: number) => {
      const canvas = previewCanvasRef.current
      if (!canvas || !img) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas size
      canvas.width = 400
      canvas.height = 300

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Save context
      ctx.save()

      // Apply transformations
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((rot * Math.PI) / 180)
      ctx.scale(zoomLevel / 100, zoomLevel / 100)

      // Apply filters
      ctx.filter = `brightness(${bright}%) contrast(${cont}%)`

      // Calculate scaled dimensions
      const scale = Math.min(canvas.width / crop.width, canvas.height / crop.height) * 0.8
      const scaledWidth = crop.width * scale
      const scaledHeight = crop.height * scale

      // Draw cropped image
      ctx.drawImage(
        img,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        -scaledWidth / 2,
        -scaledHeight / 2,
        scaledWidth,
        scaledHeight,
      )

      // Restore context
      ctx.restore()
    },
    [],
  )

  const processImage = useCallback(() => {
    if (!originalImage) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to crop area
    canvas.width = cropArea.width
    canvas.height = cropArea.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Save context
    ctx.save()

    // Apply transformations
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(zoom[0] / 100, zoom[0] / 100)

    // Apply filters
    ctx.filter = `brightness(${brightness[0]}%) contrast(${contrast[0]}%)`

    // Draw image
    ctx.drawImage(
      originalImage,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      -cropArea.width / 2,
      -cropArea.height / 2,
      cropArea.width,
      cropArea.height,
    )

    // Restore context
    ctx.restore()

    // Convert to blob and create file
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "edited-image.jpg", { type: "image/jpeg" })
          onImageChange(file)

          // Create URL for preview
          const url = URL.createObjectURL(blob)
          setEditedImageUrl(url)
          onImageUrlChange?.(url)
        }
      },
      "image/jpeg",
      0.9,
    )
  }, [originalImage, cropArea, zoom, rotation, brightness, contrast, onImageChange, onImageUrlChange])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      loadImage(url)
      setIsOpen(true)
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    const rect = event.currentTarget.getBoundingClientRect()
    setDragStart({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !originalImage) return

    const rect = event.currentTarget.getBoundingClientRect()
    const currentX = event.clientX - rect.left
    const currentY = event.clientY - rect.top

    const deltaX = currentX - dragStart.x
    const deltaY = currentY - dragStart.y

    setCropArea((prev) => ({
      ...prev,
      x: Math.max(0, Math.min(originalImage.width - prev.width, prev.x + deltaX)),
      y: Math.max(0, Math.min(originalImage.height - prev.height, prev.y + deltaY)),
    }))

    setDragStart({ x: currentX, y: currentY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleZoomChange = (value: number[]) => {
    setZoom(value)
  }

  const handleBrightnessChange = (value: number[]) => {
    setBrightness(value)
  }

  const handleContrastChange = (value: number[]) => {
    setContrast(value)
  }

  const handleApply = () => {
    processImage()
    setIsOpen(false)
  }

  const handleReset = () => {
    if (originalImage) {
      setCropArea({ x: 0, y: 0, width: originalImage.width, height: originalImage.height })
      setZoom([100])
      setRotation(0)
      setBrightness([100])
      setContrast([100])
    }
  }

  // Update preview when parameters change
  useEffect(() => {
    if (originalImage) {
      updatePreview(originalImage, cropArea, zoom[0], rotation, brightness[0], contrast[0])
    }
  }, [originalImage, cropArea, zoom, rotation, brightness, contrast, updatePreview])

  // Load initial image
  useEffect(() => {
    if (imageUrl && !originalImage) {
      loadImage(imageUrl)
    }
  }, [imageUrl, originalImage, loadImage])

  return (
    <div className="space-y-4">
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {(imageUrl || editedImageUrl) && (
        <div className="relative">
          <img src={editedImageUrl || imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg border" />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm" className="absolute top-2 right-2">
                <Crop className="h-4 w-4 mr-1" />
                Düzenle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Resim Düzenleyici</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Preview Area */}
                <div className="space-y-4">
                  <Label>Önizleme</Label>
                  <canvas
                    ref={previewCanvasRef}
                    className="border rounded-lg cursor-move"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  />
                </div>

                {/* Controls */}
                <div className="space-y-6">
                  {/* Crop Controls */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Kırpma Alanı</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">X Pozisyonu</Label>
                          <Slider
                            value={[cropArea.x]}
                            onValueChange={([value]) => setCropArea((prev) => ({ ...prev, x: value }))}
                            max={originalImage?.width || 100}
                            step={1}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Y Pozisyonu</Label>
                          <Slider
                            value={[cropArea.y]}
                            onValueChange={([value]) => setCropArea((prev) => ({ ...prev, y: value }))}
                            max={originalImage?.height || 100}
                            step={1}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Genişlik</Label>
                          <Slider
                            value={[cropArea.width]}
                            onValueChange={([value]) => setCropArea((prev) => ({ ...prev, width: value }))}
                            min={50}
                            max={originalImage?.width || 100}
                            step={1}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Yükseklik</Label>
                          <Slider
                            value={[cropArea.height]}
                            onValueChange={([value]) => setCropArea((prev) => ({ ...prev, height: value }))}
                            min={50}
                            max={originalImage?.height || 100}
                            step={1}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transform Controls */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Dönüştürme</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-xs">Yakınlaştırma (%{zoom[0]})</Label>
                        <Slider
                          value={zoom}
                          onValueChange={handleZoomChange}
                          min={50}
                          max={200}
                          step={5}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Döndürme</Label>
                        <Button variant="outline" size="sm" onClick={handleRotate}>
                          <RotateCw className="h-4 w-4 mr-1" />
                          90° Döndür
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Filter Controls */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Filtreler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-xs">Parlaklık (%{brightness[0]})</Label>
                        <Slider
                          value={brightness}
                          onValueChange={handleBrightnessChange}
                          min={50}
                          max={150}
                          step={5}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Kontrast (%{contrast[0]})</Label>
                        <Slider
                          value={contrast}
                          onValueChange={handleContrastChange}
                          min={50}
                          max={150}
                          step={5}
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
                      Sıfırla
                    </Button>
                    <Button onClick={handleApply} className="flex-1">
                      Uygula
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
        <Upload className="h-4 w-4 mr-2" />
        {imageUrl ? "Resmi Değiştir" : "Resim Seç"}
      </Button>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

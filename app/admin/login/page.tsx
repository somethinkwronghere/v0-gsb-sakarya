"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Supabase auth implementation will go here
      console.log("Login attempt:", { email, password })

      // Temporary mock login
      if (email === "admin@sakaryagsim.gov.tr" && password === "admin123") {
        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard"
      } else {
        setError("Geçersiz e-posta veya şifre")
      }
    } catch (err) {
      setError("Giriş yapılırken bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Yönetici Girişi</h2>
          <p className="mt-2 text-sm text-gray-600">Sakarya GSİM Yönetim Paneli</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Giriş Yapın</CardTitle>
            <CardDescription>Yönetim paneline erişmek için giriş bilgilerinizi girin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@sakaryagsim.gov.tr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/admin/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Şifrenizi mi unuttunuz?
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-800 mb-2">Demo Giriş Bilgileri</p>
              <div className="text-xs text-blue-600 space-y-1">
                <p>E-posta: admin@sakaryagsim.gov.tr</p>
                <p>Şifre: admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-500">
            ← Ana sayfaya dön
          </Link>
        </div>
      </div>
    </div>
  )
}

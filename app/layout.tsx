import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sakarya Gençlik ve Spor İl Müdürlüğü",
  description: "Sakarya'da gençlik ve spor faaliyetleri, tesisler ve etkinlikler hakkında kapsamlı bilgi platformu",
  keywords: "Sakarya, gençlik, spor, yurt, gençlik merkezi, spor salonu, etkinlik",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

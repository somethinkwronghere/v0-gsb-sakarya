import { createClient } from "@supabase/supabase-js"
import type { ITesis, IEtkinlik, IHaber, IKullanici } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Mock data for development when Supabase is not configured
const mockTesisler: ITesis[] = [
  // Gençlik Merkezleri
  {
    id: "1",
    ad: "Adapazarı Gençlik Merkezi",
    tip: "genclik_merkezi",
    ilce: "Adapazarı",
    adres: "Yağcılar Mah., Yeni Sakarya Stadyumu Civarı, Adapazarı",
    kapasite: 500,
    aciklama: "Gençlerin sosyal, kültürel ve sportif faaliyetlerde bulunabileceği modern gençlik merkezi.",
    iletisim: {
      telefon: "0264 275 20 30",
      email: "adapazari@genclik.gov.tr",
      yetkili: "Ali Kaya",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "adapazari-genclik-merkezi",
    aktif: true,
  },
  {
    id: "2",
    ad: "Serdivan Gençlik Merkezi",
    tip: "genclik_merkezi",
    ilce: "Serdivan",
    adres: "Kemalpaşa Mah., Tokat Dere Cad., Güldeste Sk. No:3, Serdivan",
    kapasite: 400,
    aciklama: "Üniversite öğrencileri ve gençler için çeşitli sosyal aktiviteler düzenlenen merkez.",
    iletisim: {
      telefon: "0264 295 25 35",
      email: "serdivan@genclik.gov.tr",
      yetkili: "Zeynep Arslan",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "serdivan-genclik-merkezi",
    aktif: true,
  },
  {
    id: "3",
    ad: "Hendek Gençlik Merkezi",
    tip: "genclik_merkezi",
    ilce: "Hendek",
    adres: "Mahmutbey Mah., 3504. Sok. No:130, Hendek",
    kapasite: 300,
    aciklama: "Hendek ilçesinde gençlerin sosyal ve kültürel faaliyetlerde bulunabileceği merkez.",
    iletisim: {
      telefon: "0264 614 25 40",
      email: "hendek@genclik.gov.tr",
      yetkili: "Murat Şahin",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "hendek-genclik-merkezi",
    aktif: true,
  },
  {
    id: "4",
    ad: "Kaynarca Gençlik Merkezi",
    tip: "genclik_merkezi",
    ilce: "Kaynarca",
    adres: "Konak Mah., Şehit Gürkan Türk Cad. No:4, Kaynarca",
    kapasite: 250,
    aciklama: "Kaynarca ilçesinde gençlik faaliyetleri için hizmet veren merkez.",
    iletisim: {
      telefon: "0264 xxx xx xx",
      email: "kaynarca@genclik.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "kaynarca-genclik-merkezi",
    aktif: true,
  },
  {
    id: "5",
    ad: "Kocaali Gençlik Merkezi",
    tip: "genclik_merkezi",
    ilce: "Kocaali",
    adres: "Ağalar Mah., Cami Sk. No:4, Kocaali",
    kapasite: 200,
    aciklama: "Kocaali ilçesinde gençlik faaliyetleri için modern tesis.",
    iletisim: {
      telefon: "0264 xxx xx xx",
      email: "kocaali@genclik.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "kocaali-genclik-merkezi",
    aktif: true,
  },
  {
    id: "6",
    ad: "Pamukova Gençlik Merkezi",
    tip: "genclik_merkezi",
    ilce: "Pamukova",
    adres: "Elperek Mah., Mehmet Akif Cad. No:3, Pamukova",
    kapasite: 180,
    aciklama: "Pamukova ilçesinde gençlik faaliyetleri için hizmet veren merkez.",
    iletisim: {
      telefon: "0264 xxx xx xx",
      email: "pamukova@genclik.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "pamukova-genclik-merkezi",
    aktif: true,
  },
  {
    id: "7",
    ad: "Sapanca Gençlik Merkezi",
    tip: "genclik_merkezi",
    ilce: "Sapanca",
    adres: "Rüstempaşa Mah., İstasyon Cad. No:10, Sapanca",
    kapasite: 220,
    aciklama: "Sapanca ilçesinde gençlik faaliyetleri için modern merkez.",
    iletisim: {
      telefon: "0264 xxx xx xx",
      email: "sapanca@genclik.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "sapanca-genclik-merkezi",
    aktif: true,
  },
  {
    id: "8",
    ad: "Taraklı Gençlik Merkezi",
    tip: "genclik_merkezi",
    ilce: "Taraklı",
    adres: "Hacımurat Mah., Ankara Cad., Kozcağız Sk. No:18, Taraklı",
    kapasite: 150,
    aciklama: "Taraklı ilçesinde gençlik faaliyetleri için hizmet veren merkez.",
    iletisim: {
      telefon: "0264 xxx xx xx",
      email: "tarakli@genclik.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "tarakli-genclik-merkezi",
    aktif: true,
  },
  {
    id: "9",
    ad: "Erenler Gençlik Merkezi",
    tip: "genclik_merkezi",
    ilce: "Erenler",
    adres: "Erenler Mah., 1113. Sok. No:4, Erenler",
    kapasite: 300,
    aciklama: "Erenler ilçesinde gençlik faaliyetleri için modern merkez.",
    iletisim: {
      telefon: "0264 xxx xx xx",
      email: "erenler@genclik.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "erenler-genclik-merkezi",
    aktif: true,
  },
  // KYK Yurtları
  {
    id: "10",
    ad: "Abdurrahman Gürses Yurdu",
    tip: "yurt",
    ilce: "Hendek",
    adres: "Akova Mah., Sakarya Bulv. No:215, Hendek",
    kapasite: 200,
    aciklama: "Modern ve güvenli konaklama imkanları sunan öğrenci yurdu.",
    iletisim: {
      telefon: "0264 614 xx xx",
      email: "hendek.yurt@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "abdurrahman-gurses-yurdu",
    aktif: true,
  },
  {
    id: "11",
    ad: "Akyazı Yurdu",
    tip: "yurt",
    ilce: "Akyazı",
    adres: "Batakköy Mah., D-140 Cad. No:307, Akyazı",
    kapasite: 150,
    aciklama: "Akyazı ilçesinde öğrenciler için güvenli konaklama imkanı.",
    iletisim: {
      telefon: "0264 xxx xx xx",
      email: "akyazi.yurt@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "akyazi-yurdu",
    aktif: true,
  },
  {
    id: "12",
    ad: "Arif Nihat Asya Yurdu",
    tip: "yurt",
    ilce: "Serdivan",
    adres: "Kemalpaşa Mah., 4. Cad. No:1, Serdivan",
    kapasite: 300,
    aciklama: "Serdivan'da erkek öğrenciler için modern yurt tesisi.",
    iletisim: {
      telefon: "0264 295 xx xx",
      email: "serdivan.erkek@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "arif-nihat-asya-yurdu",
    aktif: true,
  },
  {
    id: "13",
    ad: "Ayşe Hümeyra Ökten Yurdu",
    tip: "yurt",
    ilce: "Serdivan",
    adres: "Kemalpaşa Mah., 6. Cad., 166. Sk. No:1, Serdivan",
    kapasite: 250,
    aciklama: "Serdivan'da kız öğrenciler için modern yurt tesisi.",
    iletisim: {
      telefon: "0264 295 xx xx",
      email: "serdivan.kiz@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "ayse-humeyra-okten-yurdu",
    aktif: true,
  },
  {
    id: "14",
    ad: "Geyve Yurdu",
    tip: "yurt",
    ilce: "Geyve",
    adres: "Tepecikler Mah., Mehmet Akif Sok. No:41, Geyve",
    kapasite: 120,
    aciklama: "Geyve ilçesinde öğrenciler için konaklama imkanı.",
    iletisim: {
      telefon: "0264 512 xx xx",
      email: "geyve.yurt@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "geyve-yurdu",
    aktif: true,
  },
  {
    id: "15",
    ad: "Hendek Yurdu",
    tip: "yurt",
    ilce: "Hendek",
    adres: "Akova Mah., 5025. Sk. No:3/A, Hendek",
    kapasite: 180,
    aciklama: "Hendek ilçesinde öğrenciler için modern yurt tesisi.",
    iletisim: {
      telefon: "0264 614 xx xx",
      email: "hendek2.yurt@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "hendek-yurdu",
    aktif: true,
  },
  {
    id: "16",
    ad: "Karasu Yurdu",
    tip: "yurt",
    ilce: "Karasu",
    adres: "Aziziye Mah., 543. Sk. No:20/A-B, Karasu",
    kapasite: 160,
    aciklama: "Karasu ilçesinde öğrenciler için konaklama tesisi.",
    iletisim: {
      telefon: "0264 718 xx xx",
      email: "karasu.yurt@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "karasu-yurdu",
    aktif: true,
  },
  {
    id: "17",
    ad: "M. Fatih Safitürk Yurdu",
    tip: "yurt",
    ilce: "Arifiye",
    adres: "Arifbey Mah., Şehit Gaffar Okkan Cad. No:10/B, Arifiye",
    kapasite: 220,
    aciklama: "Arifiye'de öğrenciler için modern konaklama imkanı.",
    iletisim: {
      telefon: "0264 xxx xx xx",
      email: "arifiye.yurt@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "m-fatih-safiturk-yurdu",
    aktif: true,
  },
  {
    id: "18",
    ad: "Rahime Sultan Yurdu",
    tip: "yurt",
    ilce: "Serdivan",
    adres: "Kemalpaşa Mah., 6. Cad. No:1, Serdivan",
    kapasite: 280,
    aciklama: "Serdivan'da kız öğrenciler için güvenli yurt tesisi.",
    iletisim: {
      telefon: "0264 295 xx xx",
      email: "rahime.sultan@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "rahime-sultan-yurdu",
    aktif: true,
  },
  {
    id: "19",
    ad: "Sabahattin Zaim Yurdu",
    tip: "yurt",
    ilce: "Serdivan",
    adres: "Esentepe Mah., Akademiyolu Sk. No:5/46, Serdivan",
    kapasite: 320,
    aciklama: "Serdivan'da erkek öğrenciler için büyük kapasiteli yurt.",
    iletisim: {
      telefon: "0264 295 xx xx",
      email: "sabahattin.zaim@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "sabahattin-zaim-yurdu",
    aktif: true,
  },
  {
    id: "20",
    ad: "Sakarya Yurdu",
    tip: "yurt",
    ilce: "Serdivan",
    adres: "Kemalpaşa Mah., Üniversite Cad., 185. Sk. No:3, Serdivan",
    kapasite: 350,
    aciklama: "Üniversite yakınında öğrenciler için ana yurt tesisi.",
    iletisim: {
      telefon: "0264 295 xx xx",
      email: "sakarya.yurt@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "sakarya-yurdu",
    aktif: true,
  },
  {
    id: "21",
    ad: "Sapanca Yurdu",
    tip: "yurt",
    ilce: "Sapanca",
    adres: "Balkaya Mah., Balkaya 1. Cad. No:23/1, Sapanca",
    kapasite: 140,
    aciklama: "Sapanca ilçesinde öğrenciler için konaklama tesisi.",
    iletisim: {
      telefon: "0264 xxx xx xx",
      email: "sapanca.yurt@kyk.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "sapanca-yurdu",
    aktif: true,
  },
  // Spor Salonları
  {
    id: "22",
    ad: "Yeni Sakarya Atatürk Stadyumu",
    tip: "spor_salonu",
    ilce: "Erenler",
    adres: "Yağcılar Mah., 15 Temmuz Cad., Erenler",
    kapasite: 27000,
    aciklama: "Sakarya'nın en büyük stadyumu. Futbol maçları ve büyük etkinlikler için kullanılır.",
    iletisim: {
      telefon: "0264 xxx xx xx",
      email: "stadyum@spor.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "yeni-sakarya-ataturk-stadyumu",
    aktif: true,
  },
  {
    id: "23",
    ad: "Atatürk Kapalı Spor Salonu",
    tip: "spor_salonu",
    ilce: "Adapazarı",
    adres: "Papuççular Mah., Adnan Menderes Cad. No:118, Adapazarı",
    kapasite: 1000,
    aciklama: "Basketbol, voleybol ve hentbol için modern kapalı spor salonu.",
    iletisim: {
      telefon: "0264 275 30 40",
      email: "ataturk.salon@spor.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "ataturk-kapali-spor-salonu",
    aktif: true,
  },
  {
    id: "24",
    ad: "Sakarya Olimpik Yüzme Havuzu",
    tip: "spor_salonu",
    ilce: "Adapazarı",
    adres: "Mithatpaşa Mah., Kudüs Cad. No:49, Adapazarı",
    kapasite: 500,
    aciklama: "Olimpik standartlarda yüzme havuzu ve su sporları tesisi.",
    iletisim: {
      telefon: "0264 275 xx xx",
      email: "yuzme@spor.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "sakarya-olimpik-yuzme-havuzu",
    aktif: true,
  },
  {
    id: "25",
    ad: "Serdivan Spor Salonu",
    tip: "spor_salonu",
    ilce: "Serdivan",
    adres: "Köprübaşı Mah., Aralık Yolu Cad. No:39/1, Serdivan",
    kapasite: 800,
    aciklama: "Çeşitli spor dalları için uygun çok amaçlı spor salonu.",
    iletisim: {
      telefon: "0264 295 35 50",
      email: "serdivan.salon@spor.gov.tr",
    },
    olusturulma_tarihi: "2024-01-01T00:00:00Z",
    guncellenme_tarihi: "2024-01-01T00:00:00Z",
    slug: "serdivan-spor-salonu",
    aktif: true,
  },
]

// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      tesisler: {
        Row: ITesis
        Insert: Omit<ITesis, "id" | "olusturulma_tarihi" | "guncellenme_tarihi">
        Update: Partial<Omit<ITesis, "id" | "olusturulma_tarihi">>
      }
      etkinlikler: {
        Row: IEtkinlik
        Insert: Omit<IEtkinlik, "id" | "olusturulma_tarihi">
        Update: Partial<Omit<IEtkinlik, "id" | "olusturulma_tarihi">>
      }
      haberler: {
        Row: IHaber
        Insert: Omit<IHaber, "id" | "olusturulma_tarihi">
        Update: Partial<Omit<IHaber, "id" | "olusturulma_tarihi">>
      }
      kullanicilar: {
        Row: IKullanici
        Insert: Omit<IKullanici, "id" | "olusturulma_tarihi">
        Update: Partial<Omit<IKullanici, "id" | "olusturulma_tarihi">>
      }
    }
  }
}

// Tesis CRUD operations
export const tesisService = {
  async getAll(tip?: ITesis["tip"]) {
    if (!supabase) {
      // Return mock data when Supabase is not configured
      let filtered = mockTesisler
      if (tip) {
        filtered = mockTesisler.filter((tesis) => tesis.tip === tip)
      }
      return filtered.sort((a, b) => a.ad.localeCompare(b.ad))
    }

    let query = supabase.from("tesisler").select("*").eq("aktif", true)

    if (tip) {
      query = query.eq("tip", tip)
    }

    const { data, error } = await query.order("ad")
    if (error) throw error
    return data
  },

  async getBySlug(slug: string) {
    if (!supabase) {
      // Return mock data when Supabase is not configured
      const tesis = mockTesisler.find((t) => t.slug === slug)
      if (!tesis) throw new Error("Tesis bulunamadı")
      return tesis
    }

    const { data, error } = await supabase.from("tesisler").select("*").eq("slug", slug).eq("aktif", true).single()

    if (error) throw error
    return data
  },

  async create(tesis: Database["public"]["Tables"]["tesisler"]["Insert"]) {
    if (!supabase) {
      throw new Error("Supabase yapılandırılmamış")
    }

    const { data, error } = await supabase.from("tesisler").insert(tesis).select().single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: Database["public"]["Tables"]["tesisler"]["Update"]) {
    if (!supabase) {
      throw new Error("Supabase yapılandırılmamış")
    }

    const { data, error } = await supabase
      .from("tesisler")
      .update({ ...updates, guncellenme_tarihi: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string) {
    if (!supabase) {
      throw new Error("Supabase yapılandırılmamış")
    }

    const { error } = await supabase.from("tesisler").update({ aktif: false }).eq("id", id)

    if (error) throw error
  },
}

// Etkinlik CRUD operations
export const etkinlikService = {
  async getAll(tip?: IEtkinlik["tip"], tesisId?: string) {
    if (!supabase) {
      // Return mock data when Supabase is not configured
      return []
    }

    let query = supabase.from("etkinlikler").select(`
        *,
        tesis:tesisler(ad, tip, ilce)
      `)

    if (tip) {
      query = query.eq("tip", tip)
    }

    if (tesisId) {
      query = query.eq("tesis_id", tesisId)
    }

    const { data, error } = await query.order("tarih", { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id: string) {
    if (!supabase) {
      throw new Error("Supabase yapılandırılmamış")
    }

    const { data, error } = await supabase
      .from("etkinlikler")
      .select(`
        *,
        tesis:tesisler(ad, tip, ilce, adres)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  },

  async create(etkinlik: Database["public"]["Tables"]["etkinlikler"]["Insert"]) {
    if (!supabase) {
      throw new Error("Supabase yapılandırılmamış")
    }

    const { data, error } = await supabase.from("etkinlikler").insert(etkinlik).select().single()

    if (error) throw error
    return data
  },
}

// Haber CRUD operations
export const haberService = {
  async getAll(tesisId?: string) {
    if (!supabase) {
      // Return mock data when Supabase is not configured
      return []
    }

    let query = supabase.from("haberler").select(`
        *,
        tesis:tesisler(ad, tip, ilce)
      `)

    if (tesisId) {
      query = query.eq("tesis_id", tesisId)
    }

    const { data, error } = await query.order("yayin_tarihi", { ascending: false })
    if (error) throw error
    return data
  },

  async getById(id: string) {
    if (!supabase) {
      throw new Error("Supabase yapılandırılmamış")
    }

    const { data, error } = await supabase
      .from("haberler")
      .select(`
        *,
        tesis:tesisler(ad, tip, ilce)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  },

  async create(haber: Database["public"]["Tables"]["haberler"]["Insert"]) {
    if (!supabase) {
      throw new Error("Supabase yapılandırılmamış")
    }

    const { data, error } = await supabase.from("haberler").insert(haber).select().single()

    if (error) throw error
    return data
  },
}

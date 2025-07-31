import type React from "react"
// Tesis türleri
export type TesisTipi = "yurt" | "genclik_merkezi" | "spor_salonu"

// Etkinlik türleri
export type EtkinlikTipi = "spor" | "kultur" | "egitim" | "sosyal" | "sanat"

// Kullanıcı rolleri
export type KullaniciRolu = "admin" | "bolge_sorumlusu" | "memur"

// İletişim bilgileri interface
export interface IletisimBilgileri {
  telefon?: string
  email?: string
  yetkili?: string
}

// Tesis interface
export interface ITesis {
  id: string
  ad: string
  tip: TesisTipi
  ilce: string
  adres: string
  kapasite: number
  aciklama: string
  iletisim: IletisimBilgileri
  resim_url?: string
  olusturulma_tarihi: string
  guncellenme_tarihi: string
  slug: string
  aktif: boolean
}

// Etkinlik interface
export interface IEtkinlik {
  id: string
  baslik: string
  aciklama: string
  tip: EtkinlikTipi
  tarih: string
  baslangic_saati: string
  bitis_saati?: string
  tesis_id: string
  kapasite?: number
  katilimci_sayisi?: number
  resim_url?: string
  olusturulma_tarihi: string
  aktif: boolean
}

// Haber interface
export interface IHaber {
  id: string
  baslik: string
  icerik: string
  ozet?: string
  kapak_resmi?: string
  yazar: string
  yayin_tarihi: string
  olusturulma_tarihi: string
  tesis_id?: string
  aktif: boolean
  slug: string
}

// Kullanıcı interface
export interface IKullanici {
  id: string
  ad_soyad: string
  eposta: string
  rol: KullaniciRolu
  ilce?: string | null
  tesis_id?: string | null
  telefon?: string | null
  adres?: string | null
  dogum_tarihi?: string | null
  notlar?: string | null
  avatar_url?: string | null
  olusturulma_tarihi: string
  guncellenme_tarihi?: string
  son_giris?: string | null
  aktif: boolean
}

// Form validation types
export interface TesisFormData {
  ad: string
  tip: TesisTipi
  ilce: string
  adres: string
  kapasite: number
  aciklama: string
  telefon?: string
  email?: string
  yetkili?: string
  resim_url?: string
}

export interface EtkinlikFormData {
  baslik: string
  aciklama: string
  tip: EtkinlikTipi
  tarih: string
  baslangic_saati: string
  bitis_saati?: string
  tesis_id: string
  kapasite?: number
  resim_url?: string
}

export interface HaberFormData {
  baslik: string
  icerik: string
  ozet?: string
  kapak_resmi?: string
  yazar: string
  yayin_tarihi: string
  tesis_id?: string
}

export interface KullaniciFormData {
  ad_soyad: string
  eposta: string
  rol: KullaniciRolu
  ilce?: string
  tesis_id?: string
  telefon?: string
  adres?: string
  dogum_tarihi?: string
  notlar?: string
  sifre?: string
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Filter types
export interface TesisFilters {
  tip?: TesisTipi
  ilce?: string
  search?: string
}

export interface EtkinlikFilters {
  tip?: EtkinlikTipi
  tesis_id?: string
  tarih_baslangic?: string
  tarih_bitis?: string
  search?: string
}

export interface HaberFilters {
  tesis_id?: string
  yazar?: string
  tarih_baslangic?: string
  tarih_bitis?: string
  search?: string
}

export interface KullaniciFilters {
  rol?: KullaniciRolu
  ilce?: string
  aktif?: boolean
  search?: string
}

// Statistics types
export interface TesisIstatistikleri {
  toplam_tesis: number
  yurt_sayisi: number
  genclik_merkezi_sayisi: number
  spor_salonu_sayisi: number
  toplam_kapasite: number
}

export interface EtkinlikIstatistikleri {
  toplam_etkinlik: number
  bu_ay_etkinlik: number
  aktif_etkinlik: number
  toplam_katilimci: number
}

export interface HaberIstatistikleri {
  toplam_haber: number
  bu_ay_haber: number
  aktif_haber: number
}

export interface KullaniciIstatistikleri {
  toplam_kullanici: number
  aktif_kullanici: number
  admin_sayisi: number
  bolge_sorumlusu_sayisi: number
  memur_sayisi: number
}

// Dashboard types
export interface DashboardStats {
  tesisler: TesisIstatistikleri
  etkinlikler: EtkinlikIstatistikleri
  haberler: HaberIstatistikleri
  kullanicilar: KullaniciIstatistikleri
}

// Navigation types
export interface NavItem {
  title: string
  href: string
  icon?: string
  children?: NavItem[]
}

// Theme types
export type Theme = "light" | "dark" | "system"

// File upload types
export interface FileUploadOptions {
  bucket: string
  maxSize?: number
  allowedTypes?: string[]
  path?: string
}

export interface UploadedFile {
  url: string
  path: string
  size: number
  type: string
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
}

// Success response
export interface SuccessResponse {
  success: true
  message: string
  data?: any
}

// Error response
export interface ErrorResponse {
  success: false
  error: AppError
}

export type ApiResult<T> = (SuccessResponse & { data: T }) | ErrorResponse

// Form state types
export interface FormState {
  loading: boolean
  error?: string
  success?: string
}

// Table types
export interface TableColumn<T> {
  key: keyof T
  title: string
  sortable?: boolean
  render?: (value: any, record: T) => React.ReactNode
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  pagination?: {
    current: number
    total: number
    pageSize: number
    onChange: (page: number) => void
  }
}

// Modal types
export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

// Confirmation dialog types
export interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

// Toast types
export interface ToastOptions {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
  duration?: number
}

// Search types
export interface SearchResult<T> {
  items: T[]
  total: number
  query: string
  filters?: Record<string, any>
}

// Export all types
export type {
  TesisTipi,
  EtkinlikTipi,
  KullaniciRolu,
  IletisimBilgileri,
  ITesis,
  IEtkinlik,
  IHaber,
  IKullanici,
  TesisFormData,
  EtkinlikFormData,
  HaberFormData,
  KullaniciFormData,
  ApiResponse,
  PaginatedResponse,
  TesisFilters,
  EtkinlikFilters,
  HaberFilters,
  KullaniciFilters,
  TesisIstatistikleri,
  EtkinlikIstatistikleri,
  HaberIstatistikleri,
  KullaniciIstatistikleri,
  DashboardStats,
  NavItem,
  Theme,
  FileUploadOptions,
  UploadedFile,
  AppError,
  SuccessResponse,
  ErrorResponse,
  ApiResult,
  FormState,
  TableColumn,
  TableProps,
  ModalProps,
  ConfirmDialogProps,
  ToastOptions,
  SearchResult,
}

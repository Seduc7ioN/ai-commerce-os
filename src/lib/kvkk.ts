export const COMPANY_NAME = "AI Commerce OS"
export const COMPANY_ADDRESS = "Maslak Mahallesi, Büyükdere Caddesi, No:255, Maslak, Sarıyer, İstanbul, Türkiye"
export const COMPANY_EMAIL = "kvkk@aicommerceos.com"
export const COMPANY_PHONE = "+90 (212) 555 00 00"
export const COMPANY_WEBSITE = "https://aicommerceos.com"
export const DATA_OFFICER_NAME = "Ali Yılmaz"

export const KVKK_LAST_UPDATED = "1 Temmuz 2026"

export const LEGAL_REFERENCES = [
  { title: "KVKK", url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6698&MevzuatTur=1&MevzuatTertip=5" },
  { title: "6698 Sayılı Kanun", url: "https://www.kvkk.gov.tr/" },
  { title: "Veri Sorumlusu", url: "https://www.kvkk.gov.tr/" },
]

export interface ConsentRecord {
  type: "kvkk" | "cookie" | "commercial" | "research"
  granted: boolean
  timestamp: string
  ip?: string
}

export function formatConsentDate(): string {
  return new Date().toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getIpAddress(): string {
  return "Kullanıcı IP adresi sistem tarafından otomatik kaydedilir."
}

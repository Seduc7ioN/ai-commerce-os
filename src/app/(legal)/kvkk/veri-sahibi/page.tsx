"use client"

import { useState } from "react"
import { LegalLayout } from "@/components/shared/legal-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { COMPANY_EMAIL } from "@/lib/kvkk"
import { Send, CheckCircle2, Loader2 } from "lucide-react"

const requestTypes = [
  { value: "info", label: "Bilgi Talep Etme" },
  { value: "rectify", label: "Düzeltme Talep Etme" },
  { value: "delete", label: "Silme / Yok Etme" },
  { value: "object", label: "İtiraz Etme" },
  { value: "restrict", label: "İşleme Kısıtlaması" },
  { value: "portability", label: "Veri Taşınabilirliği" },
  { value: "commercial", label: "Ticari İleti İptali" },
  { value: "account_deletion", label: "Hesap Silme Talebi" },
  { value: "other", label: "Diğer" },
]

export default function VeriSahibiPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <LegalLayout title="Veri Sahibi Başvuru Formu">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Başvurunuz Alındı</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Talebiniz tarafımıza iletilmiştir. KVKK kapsamında başvurunuz en geç 30
            gün içinde yanıtlanacaktır. Yanıt, başvuru sırasında belirttiğiniz
            iletişim kanalına gönderilecektir.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Referans numaranız: <code className="rounded bg-muted px-2 py-0.5 font-mono">
              KVKK-{Date.now().toString(36).toUpperCase()}
            </code>
          </p>
        </div>
      </LegalLayout>
    )
  }

  return (
    <LegalLayout title="Veri Sahibi Başvuru Formu">
      <p className="text-sm text-muted-foreground mb-8">
        6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;nun 11. maddesi
        uyarınca sahip olduğunuz haklarınızı kullanmak için aşağıdaki formu
        doldurabilirsiniz. Talebiniz en geç 30 gün içinde sonuçlandırılacaktır.
      </p>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad *</Label>
                <Input id="name" placeholder="Adınız ve soyadınız" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta Adresi *</Label>
                <Input id="email" type="email" placeholder="ornek@email.com" required />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" type="tel" placeholder="+90 5XX XXX XX XX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tc">T.C. Kimlik Numarası</Label>
                <Input id="tc" placeholder="T.C. kimlik numaranız" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Input id="address" placeholder="İkametgah adresiniz" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requestType">Başvuru Türü *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Başvuru türünü seçin" />
                </SelectTrigger>
                <SelectContent>
                  {requestTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Başvuru Detayı *</Label>
              <Textarea
                id="message"
                placeholder="Talebinizi detaylı olarak açıklayın..."
                className="min-h-[160px]"
                required
              />
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Bilgilendirme:</strong> Talebinizi e-posta yoluyla{" "}
                <a href={`mailto:${COMPANY_EMAIL}`} className="text-primary hover:underline">
                  {COMPANY_EMAIL}
                </a>{" "}
                adresine de iletebilirsiniz. Kimliğinizin tespit edilebilmesi
                için başvurunuzu kayıtlı e-posta hesabınızdan göndermeniz
                gerekmektedir. Yanlış veya hukuka aykırı taleplerde
                bulunulması durumunda yasal yollara başvurulacaktır.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Başvuruyu Gönder
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </LegalLayout>
  )
}

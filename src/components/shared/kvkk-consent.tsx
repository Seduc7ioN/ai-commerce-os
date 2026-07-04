"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

interface KVKKConsentProps {
  onConsentChange: (consented: boolean) => void
}

export function KVKKConsent({ onConsentChange }: KVKKConsentProps) {
  const [kvkkConsent, setKvkkConsent] = useState(false)
  const [commercialConsent, setCommercialConsent] = useState(false)

  function handleKvkkChange(checked: boolean) {
    setKvkkConsent(checked)
    onConsentChange(checked && commercialConsent)
  }

  function handleCommercialChange(checked: boolean) {
    setCommercialConsent(checked)
    onConsentChange(kvkkConsent && checked)
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Checkbox
            id="kvkk-consent"
            checked={kvkkConsent}
            onCheckedChange={handleKvkkChange}
            className="mt-0.5"
          />
          <div className="grid gap-1">
            <Label htmlFor="kvkk-consent" className="text-sm font-medium leading-snug">
              KVKK Aydınlatma Metni&apos;ni okudum ve kabul ediyorum
            </Label>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <Link href="/kvkk" className="text-primary hover:underline">
                Kişisel Verilerin Korunması Kanunu
              </Link>{" "}
              kapsamında, kişisel verilerimin işlenmesine ve yukarıda belirtilen
              amaçlarla kullanılmasına açık rızamla izin veriyorum.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            id="commercial-consent"
            checked={commercialConsent}
            onCheckedChange={handleCommercialChange}
            className="mt-0.5"
          />
          <div className="grid gap-1">
            <Label htmlFor="commercial-consent" className="text-sm font-medium leading-snug">
              Ticari elektronik ileti izni
            </Label>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Kampanya, indirim ve yenilikler hakkında e-posta ve SMS yoluyla
              bilgilendirme almayı kabul ediyorum. Bu izni istediğim zaman iptal
              edebilirim.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

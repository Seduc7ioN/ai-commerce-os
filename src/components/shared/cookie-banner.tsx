"use client"

import { useState } from "react"
import { useCookieConsent } from "@/hooks/use-cookie-consent"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { X, Cookie, Shield, Settings } from "lucide-react"
import Link from "next/link"

export function CookieBanner() {
  const { showBanner, acceptAll, declineAll, savePreferences } = useCookieConsent()
  const [showSettings, setShowSettings] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [functional, setFunctional] = useState(false)

  if (!showBanner) return null

  if (showSettings) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
        <Card className="mx-auto max-w-2xl shadow-2xl border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">Çerez Tercihleri</CardTitle>
              </div>
              <Button variant="ghost" size="icon-xs" onClick={() => setShowSettings(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pb-4">
            <div className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
              <div>
                <Label className="font-medium">Zorunlu Çerezler</Label>
                <p className="text-xs text-muted-foreground">
                  Sistemin çalışması için gereklidir, devre dışı bırakılamaz.
                </p>
              </div>
              <Switch checked disabled />
            </div>
            <div className="flex items-center justify-between rounded-lg px-4 py-3 hover:bg-muted/30 transition-colors">
              <div>
                <Label htmlFor="analytics" className="font-medium">Analitik Çerezler</Label>
                <p className="text-xs text-muted-foreground">
                  Kullanım istatistiklerini anonim olarak toplar.
                </p>
              </div>
              <Switch id="analytics" checked={analytics} onCheckedChange={setAnalytics} />
            </div>
            <div className="flex items-center justify-between rounded-lg px-4 py-3 hover:bg-muted/30 transition-colors">
              <div>
                <Label htmlFor="marketing" className="font-medium">Pazarlama Çerezleri</Label>
                <p className="text-xs text-muted-foreground">
                  İlgi alanınıza göre reklam gösterimi için kullanılır.
                </p>
              </div>
              <Switch id="marketing" checked={marketing} onCheckedChange={setMarketing} />
            </div>
            <div className="flex items-center justify-between rounded-lg px-4 py-3 hover:bg-muted/30 transition-colors">
              <div>
                <Label htmlFor="functional" className="font-medium">İşlevsel Çerezler</Label>
                <p className="text-xs text-muted-foreground">
                  Tercihlerinizi hatırlayarak daha iyi bir deneyim sunar.
                </p>
              </div>
              <Switch id="functional" checked={functional} onCheckedChange={setFunctional} />
            </div>
          </CardContent>
          <CardFooter className="flex gap-3 pt-0">
            <Button variant="outline" size="sm" onClick={() => setShowSettings(false)} className="flex-1">
              Geri
            </Button>
            <Button size="sm" onClick={() => savePreferences({ analytics, marketing, functional })} className="flex-1">
              Kaydet
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="mx-auto max-w-3xl shadow-2xl border-border/50">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <div className="hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium">Çerez Tercihleri</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Size en iyi deneyimi sunmak için çerezler kullanıyoruz. Web sitemizi
                kullanarak,{" "}
                <Link href="/kvkk/cerez-politikasi" className="text-primary hover:underline">
                  Çerez Politikamızı
                </Link>{" "}
                ve{" "}
                <Link href="/kvkk" className="text-primary hover:underline">
                  KVKK Aydınlatma Metnimizi
                </Link>{" "}
                kabul etmiş olursunuz.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Button variant="ghost" size="sm" onClick={declineAll}>
                Reddet
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                <Settings className="mr-1.5 h-3.5 w-3.5" />
                Ayarlar
              </Button>
              <Button size="sm" onClick={acceptAll}>
                Kabul Et
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

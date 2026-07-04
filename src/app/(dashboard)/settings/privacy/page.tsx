"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Shield,
  Download,
  Trash2,
  FileText,
  Cookie,
  Mail,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { COMPANY_EMAIL } from "@/lib/kvkk"

export default function PrivacySettingsPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleDataExport() {
    setLoading("export")
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data: projects } = await supabase
        .from("projects")
        .select("*, project_images(*), project_content(*)")
        .eq("user_id", user.id)

      const blob = new Blob([JSON.stringify({
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          metadata: user.user_metadata,
        },
        projects,
        exported_at: new Date().toISOString(),
      }, null, 2)], { type: "application/json" })

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `kvkk-data-export-${new Date().toISOString().split("T")[0]}.json`
      a.click()
      URL.revokeObjectURL(url)
      toast.success("Verileriniz başarıyla dışa aktarıldı")
    } catch (error) {
      toast.error("Veri aktarımı başarısız oldu")
    } finally {
      setLoading(null)
    }
  }

  async function handleAccountDeletion() {
    setLoading("delete")
    try {
      const { error } = await supabase.rpc("delete_user_account")
      if (error) throw error

      await supabase.auth.signOut()
      toast.success("Hesabınız başarıyla silindi")
      router.push("/")
    } catch (error) {
      toast.error("Hesap silme işlemi başarısız oldu. Lütfen destek ekibimizle iletişime geçin.")
    } finally {
      setLoading(null)
      setDialogOpen(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Gizlilik Ayarları</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kişisel verileriniz ve gizlilik tercihlerinizi yönetin
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">KVKK Yönetimi</CardTitle>
          </div>
          <CardDescription>
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınız
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Haklarınız</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Button variant="outline" className="justify-start h-auto py-3" asChild>
                <a href="/kvkk" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4 shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Aydınlatma Metni</p>
                    <p className="text-xs text-muted-foreground">KVKK bilgilendirme metnini görüntüleyin</p>
                  </div>
                </a>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3" asChild>
                <a href="/kvkk/veri-sahibi" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4 shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Başvuru Formu</p>
                    <p className="text-xs text-muted-foreground">Veri sahibi başvurusu yapın</p>
                  </div>
                </a>
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium">Verilerimi Dışa Aktar</Label>
                  <p className="text-xs text-muted-foreground">
                    Tüm verilerinizi JSON formatında indirin (KVKK Madde 11)
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDataExport}
                disabled={loading === "export"}
              >
                {loading === "export" ? (
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                ) : null}
                Dışa Aktar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Çerez Tercihleri</CardTitle>
          </div>
          <CardDescription>
            Web sitesinde kullanılan çerez türlerini yönetin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg py-2">
            <div>
              <Label className="text-sm font-medium">Zorunlu Çerezler</Label>
              <p className="text-xs text-muted-foreground">Sistemin çalışması için gereklidir</p>
            </div>
            <Switch checked disabled />
          </div>
          <div className="flex items-center justify-between rounded-lg py-2">
            <div>
              <Label htmlFor="analytics" className="text-sm font-medium">Analitik Çerezler</Label>
              <p className="text-xs text-muted-foreground">Kullanım istatistikleri</p>
            </div>
            <Switch id="analytics" />
          </div>
          <div className="flex items-center justify-between rounded-lg py-2">
            <div>
              <Label htmlFor="marketing" className="text-sm font-medium">Pazarlama Çerezleri</Label>
              <p className="text-xs text-muted-foreground">Kişiselleştirilmiş reklamlar</p>
            </div>
            <Switch id="marketing" />
          </div>
          <div className="pt-2">
            <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
              <a href="/kvkk/cerez-politikasi" target="_blank" rel="noopener noreferrer">
                Çerez Politikası&apos;nı görüntüleyin
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">İletişim Tercihleri</CardTitle>
          </div>
          <CardDescription>
            Ticari elektronik ileti izinlerinizi yönetin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg py-2">
            <div>
              <Label htmlFor="email-notif" className="text-sm font-medium">E-posta Bildirimleri</Label>
              <p className="text-xs text-muted-foreground">Kampanya, indirim ve yenilikler</p>
            </div>
            <Switch id="email-notif" defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg py-2">
            <div>
              <Label htmlFor="sms-notif" className="text-sm font-medium">SMS Bildirimleri</Label>
              <p className="text-xs text-muted-foreground">Telefonunuza gelen fırsatlar</p>
            </div>
            <Switch id="sms-notif" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-base text-destructive">Hesabı Sil</CardTitle>
          </div>
          <CardDescription>
            Hesabınızı ve tüm verilerinizi kalıcı olarak silin (KVKK Madde 7)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Hesabınızı sildiğinizde tüm projeleriniz, görselleriniz ve kişisel
            verileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.
          </p>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Hesabımı Sil
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Hesabınızı silmek istediğinize emin misiniz?</DialogTitle>
                <DialogDescription>
                  Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak
                  silinecektir. Onaylamak için lütfen aşağıya
                  &quot;SİL&quot; yazın.
                </DialogDescription>
              </DialogHeader>
              <Input
                placeholder='&quot;SİL&quot; yazın'
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
              />
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleAccountDeletion}
                  disabled={deleteConfirm !== "SİL" || loading === "delete"}
                >
                  {loading === "delete" ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Hesabı Sil
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <p className="text-xs text-muted-foreground mt-3">
            Alternatif olarak,{" "}
            <a href={`mailto:${COMPANY_EMAIL}`} className="text-primary hover:underline">
              {COMPANY_EMAIL}
            </a>{" "}
            adresine e-posta göndererek de hesabınızın silinmesini talep
            edebilirsiniz.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

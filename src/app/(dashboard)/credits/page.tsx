import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function CreditsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Credits</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your credits and subscription
        </p>
      </div>

      <div className="rounded-xl border p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Credit system coming soon. You will be able to purchase credits for AI
          processing and exports.
        </p>
      </div>
    </div>
  )
}

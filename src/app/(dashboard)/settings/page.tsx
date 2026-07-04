import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account settings
        </p>
      </div>

      <div className="rounded-xl border p-6 space-y-4">
        <div>
          <h2 className="font-medium">Profile</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Email: {user.email}
          </p>
          <p className="text-sm text-muted-foreground">
            Name: {user.user_metadata?.name ?? "Not set"}
          </p>
        </div>
      </div>
    </div>
  )
}

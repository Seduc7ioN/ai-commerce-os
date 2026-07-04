import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back{user.user_metadata?.name ? `, ${user.user_metadata.name}` : ""}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border p-6">
          <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
          <p className="text-3xl font-bold mt-2">{projects?.length ?? 0}</p>
        </div>
        <div className="rounded-xl border p-6">
          <p className="text-sm font-medium text-muted-foreground">Credits</p>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="rounded-xl border p-6">
          <p className="text-sm font-medium text-muted-foreground">Downloads</p>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
        {projects && projects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl border p-4 transition-colors hover:bg-accent"
              >
                <div className="aspect-square rounded-lg bg-muted mb-3 flex items-center justify-center">
                  {project.original_image ? (
                    <img
                      src={project.original_image}
                      alt={project.title}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <p className="text-xs text-muted-foreground">No image</p>
                  )}
                </div>
                <h3 className="font-medium text-sm">{project.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  {project.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-12 text-center">
            <p className="text-sm text-muted-foreground">
              No projects yet. Upload your first product to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

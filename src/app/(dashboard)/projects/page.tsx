import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function ProjectsPage() {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your product uploads and generated assets
          </p>
        </div>
        <Link href="/project/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="group rounded-xl border p-4 transition-colors hover:bg-accent"
            >
              <div className="aspect-square rounded-lg bg-muted mb-3 flex items-center justify-center overflow-hidden">
                {project.original_image ? (
                  <img
                    src={project.original_image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Plus className="h-8 w-8 text-muted-foreground/50" />
                    <p className="text-xs text-muted-foreground">Upload product</p>
                  </div>
                )}
              </div>
              <h3 className="font-medium text-sm truncate">{project.title}</h3>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground capitalize">
                  {project.status}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(project.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed p-16 text-center">
          <h3 className="font-medium text-lg mb-2">No projects yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Upload your first product and let AI create everything you need.
          </p>
          <Link href="/project/new">
            <Button size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Project
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

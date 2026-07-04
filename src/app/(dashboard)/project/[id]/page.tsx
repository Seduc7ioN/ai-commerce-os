"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  Download,
  Sparkles,
  Wand2,
  Image as ImageIcon,
  FileText,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import type { Project, ProjectImage, ProjectContent } from "@/types"

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const supabase = createClient()

  const [project, setProject] = useState<Project | null>(null)
  const [images, setImages] = useState<ProjectImage[]>([])
  const [contents, setContents] = useState<ProjectContent[]>([])
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    async function loadProject() {
      const { data: project } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single()

      if (!project) {
        router.push("/projects")
        return
      }

      setProject(project)

      const { data: images } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", id)

      const { data: contents } = await supabase
        .from("project_content")
        .select("*")
        .eq("project_id", id)

      if (images) setImages(images)
      if (contents) setContents(contents)
      setLoading(false)
    }

    loadProject()
  }, [id, supabase, router])

  async function handleAIAction(type: string) {
    setProcessing(true)
    try {
      const { error } = await supabase.from("ai_jobs").insert({
        project_id: id,
        type,
        provider: "replicate",
        status: "queued",
      })

      if (error) throw error

      await supabase
        .from("projects")
        .update({ status: "processing" })
        .eq("id", id)

      setProject((prev) => prev ? { ...prev, status: "processing" } : null)
      toast.success("AI processing started")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "AI processing failed")
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!project) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/projects">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {project.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date(project.created_at).toLocaleDateString()}
          </p>
        </div>
        <Badge variant={project.status === "completed" ? "default" : "secondary"}>
          {project.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="photos" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="photos" className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Photos
                  </TabsTrigger>
                  <TabsTrigger value="content" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="export" className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Export
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="photos" className="space-y-4">
                  {project.original_image && (
                    <div>
                      <p className="text-sm font-medium mb-2">Original</p>
                      <div className="aspect-square max-w-sm rounded-lg overflow-hidden bg-muted">
                        <img
                          src={project.original_image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {images.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Generated Images</p>
                      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                        {images.map((image) => (
                          <div
                            key={image.id}
                            className="group relative aspect-square rounded-lg overflow-hidden bg-muted"
                          >
                            <img
                              src={image.url}
                              alt={image.type}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button
                                size="icon"
                                variant="secondary"
                                className="h-8 w-8"
                                onClick={() => window.open(image.url, "_blank")}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                            <Badge className="absolute top-2 left-2 capitalize">
                              {image.type.replace("_", " ")}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => handleAIAction("remove_bg")}
                      disabled={processing}
                    >
                      <Wand2 className="mr-2 h-4 w-4" />
                      Remove Background
                    </Button>
                    <Button
                      onClick={() => handleAIAction("gen_bg")}
                      disabled={processing}
                      variant="outline"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Background
                    </Button>
                    <Button
                      onClick={() => handleAIAction("enhance")}
                      disabled={processing}
                      variant="outline"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Enhance Image
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  {contents.length > 0 ? (
                    contents.map((content) => (
                      <Card key={content.id}>
                        <CardContent className="p-4">
                          <Badge variant="outline" className="mb-2 capitalize">
                            {content.type.replace("_", " ")}
                          </Badge>
                          <p className="text-sm whitespace-pre-wrap">
                            {content.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-sm text-muted-foreground mb-4">
                        No content generated yet
                      </p>
                      <Button
                        onClick={() => handleAIAction("gen_description")}
                        disabled={processing}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Description
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="export" className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    {["PNG", "JPG", "High Resolution"].map((format) => (
                      <Button
                        key={format}
                        variant="outline"
                        className="h-20 flex-col gap-1"
                      >
                        <Download className="h-5 w-5" />
                        <span className="text-xs">{format}</span>
                      </Button>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-3">Marketplace Export</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {["Trendyol", "Amazon", "Etsy", "Shopify", "Hepsiburada"].map(
                        (marketplace) => (
                          <Button
                            key={marketplace}
                            variant="outline"
                            className="h-12"
                            disabled
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {marketplace}
                          </Button>
                        )
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Marketplace export coming soon
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">AI Actions</h3>
              <div className="space-y-2">
                {[
                  { type: "remove_bg", label: "Remove Background" },
                  { type: "white_bg", label: "White Background" },
                  { type: "transparent", label: "Transparent PNG" },
                  { type: "gen_bg", label: "AI Background" },
                  { type: "shadow", label: "Add Shadow" },
                  { type: "enhance", label: "Enhance Image" },
                  { type: "gen_description", label: "Generate Description" },
                  { type: "gen_keywords", label: "Generate Keywords" },
                  { type: "gen_seo", label: "Generate SEO" },
                ].map((action) => (
                  <Button
                    key={action.type}
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => handleAIAction(action.type)}
                    disabled={processing}
                  >
                    <Sparkles className="mr-2 h-4 w-4 text-primary" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {project.status === "processing" && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  AI is processing your product...
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

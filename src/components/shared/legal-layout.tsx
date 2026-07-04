import Link from "next/link"
import { Sparkles, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LegalLayoutProps {
  children: React.ReactNode
  title: string
  lastUpdated?: string
}

export function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI Commerce OS</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Ana Sayfa
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground">
              Son Güncelleme: {lastUpdated}
            </p>
          )}
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:text-muted-foreground [&_li]:leading-relaxed [&_strong]:text-foreground">
          {children}
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            AI Commerce OS — {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  )
}

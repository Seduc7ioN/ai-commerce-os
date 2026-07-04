import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI Commerce OS</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              One Upload.
              <br />
              <span className="text-primary">Everything Ready.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Upload your product once. AI generates every asset you need to sell
              online — photos, backgrounds, descriptions, SEO, and marketing content.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="text-base h-12 px-8">
                  Start Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-base h-12 px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="group rounded-xl border p-6 transition-colors hover:bg-accent"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 font-semibold text-sm mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>AI Commerce OS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                One Upload. Everything Ready.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-3">Hizmetler</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>AI Product Photography</li>
                <li>Background Removal</li>
                <li>Content Generation</li>
                <li>Marketplace Export</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-3">Yasal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/kvkk" className="text-muted-foreground hover:text-foreground transition-colors">
                    KVKK Aydınlatma Metni
                  </a>
                </li>
                <li>
                  <a href="/kvkk/cerez-politikasi" className="text-muted-foreground hover:text-foreground transition-colors">
                    Çerez Politikası
                  </a>
                </li>
                <li>
                  <a href="/kvkk/veri-sahibi" className="text-muted-foreground hover:text-foreground transition-colors">
                    Veri Sahibi Başvuru Formu
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AI Commerce OS. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Product Photos",
    description:
      "Professional white background, transparent PNG, and lifestyle images automatically generated from your upload.",
    icon: Sparkles,
  },
  {
    title: "AI Backgrounds",
    description:
      "Generate studio-quality backgrounds that showcase your product in the best light with AI scene generation.",
    icon: Sparkles,
  },
  {
    title: "Content Generation",
    description:
      "Product descriptions, SEO metadata, and keywords written by AI to optimize your listings for search.",
    icon: Sparkles,
  },
  {
    title: "Marketplace Ready",
    description:
      "Export optimized images and content for Shopify, Amazon, Etsy, Trendyol, and more with one click.",
    icon: Sparkles,
  },
  {
    title: "Social Media",
    description:
      "Create Instagram posts, stories, and advertising creatives formatted for every platform.",
    icon: Sparkles,
  },
  {
    title: "Batch Processing",
    description:
      "Upload multiple products at once. AI processes everything in parallel. Save hours of manual work.",
    icon: Sparkles,
  },
]

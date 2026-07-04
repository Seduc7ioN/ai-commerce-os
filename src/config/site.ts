export const siteConfig = {
  name: "AI Commerce OS",
  description: "One Upload. Everything Ready. AI-powered platform that generates every asset you need to sell products online.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/aicommerceos",
  },
}

export type SiteConfig = typeof siteConfig

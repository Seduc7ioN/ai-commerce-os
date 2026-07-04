import { BaseAIProvider } from "./interface"
import type { AIProviderConfig } from "./schema"

export class GeminiProvider extends BaseAIProvider {
  id = "gemini"
  name = "Google Gemini"

  constructor(config: AIProviderConfig) {
    super(config)
  }

  isAvailable(): boolean {
    return !!this.config.apiKey
  }

  private get baseUrl() {
    return `https://generativelanguage.googleapis.com/v1beta/models/${this.config.model || "gemini-2.0-flash"}`
  }

  async removeBackground(input: { imageUrl: string }) {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}:generateContent?key=${this.config.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Remove the background from this product image. Return only the image URL." },
                { inline_data: { mime_type: "image/jpeg", data: input.imageUrl } },
              ],
            },
          ],
        }),
      }
    )

    const data = await response.json()
    return { url: input.imageUrl, format: "png" }
  }

  async generateBackground(input: {
    imageUrl: string
    prompt?: string
    style?: string
  }) {
    return { url: input.imageUrl, format: "png" }
  }

  async enhanceImage(input: { imageUrl: string }) {
    return { url: input.imageUrl, format: "png" }
  }

  async generateDescription(input: {
    productName: string
    category?: string
    features?: string[]
    targetAudience?: string
    tone?: string
    language?: string
  }) {
    const prompt = `Write a product description for "${input.productName}". Category: ${input.category || "general"}. Features: ${input.features?.join(", ") || "N/A"}. Tone: ${input.tone || "professional"}. Language: ${input.language || "en"}.`

    const response = await this.fetchWithTimeout(
      `${this.baseUrl}:generateContent?key=${this.config.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    )

    const data = await response.json()
    return {
      content: data.candidates[0].content.parts[0].text,
      type: "description",
    }
  }

  async generateKeywords(input: {
    productName: string
    description: string
    category?: string
    maxKeywords?: number
  }) {
    const prompt = `Generate ${input.maxKeywords || 15} SEO keywords for "${input.productName}" in ${input.category || "general"}. Description: ${input.description}. Return as comma-separated.`

    const response = await this.fetchWithTimeout(
      `${this.baseUrl}:generateContent?key=${this.config.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    )

    const data = await response.json()
    return {
      content: data.candidates[0].content.parts[0].text,
      type: "keywords",
    }
  }

  async generateSeoContent(input: {
    productName: string
    description: string
    keywords: string[]
    category?: string
  }) {
    const prompt = `Write SEO metadata for "${input.productName}". Keywords: ${input.keywords.join(", ")}. Include SEO title (max 60 chars), meta description (max 160 chars), and URL slug.`

    const response = await this.fetchWithTimeout(
      `${this.baseUrl}:generateContent?key=${this.config.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    )

    const data = await response.json()
    return {
      content: data.candidates[0].content.parts[0].text,
      type: "seo",
    }
  }

  async analyzeImage(input: { imageUrl: string }) {
    return {
      score: 80,
      suggestions: ["Improve lighting"],
      lighting: "average",
      composition: "good",
      quality: "average",
    }
  }
}

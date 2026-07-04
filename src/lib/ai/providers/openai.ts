import { BaseAIProvider } from "./interface"
import type { AIProviderConfig } from "./schema"

export class OpenAIProvider extends BaseAIProvider {
  id = "openai"
  name = "OpenAI"

  constructor(config: AIProviderConfig) {
    super(config)
  }

  isAvailable(): boolean {
    return !!this.config.apiKey
  }

  async removeBackground(input: { imageUrl: string }) {
    const response = await this.fetchWithTimeout(
      "https://api.openai.com/v1/images/edits",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          image: input.imageUrl,
          prompt: "",
          size: "1024x1024",
        }),
      }
    )

    const data = await response.json()
    return { url: data.data[0].url, format: "png" }
  }

  async generateBackground(input: {
    imageUrl: string
    prompt?: string
    style?: string
  }) {
    const response = await this.fetchWithTimeout(
      "https://api.openai.com/v1/images/edits",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: input.imageUrl,
          prompt: input.prompt || "professional studio background",
          size: "1024x1024",
        }),
      }
    )

    const data = await response.json()
    return { url: data.data[0].url, format: "png" }
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
    const prompt = `Write a compelling product description for "${input.productName}"${
      input.category ? ` in the ${input.category} category` : ""
    }.${
      input.features ? ` Key features: ${input.features.join(", ")}.` : ""
    }${
      input.targetAudience
        ? ` Target audience: ${input.targetAudience}.`
        : ""
    } Tone: ${input.tone || "professional"}. Language: ${input.language || "en"}.`

    const response = await this.fetchWithTimeout(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.config.model || "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
        }),
      }
    )

    const data = await response.json()
    return {
      content: data.choices[0].message.content,
      type: "description",
    }
  }

  async generateKeywords(input: {
    productName: string
    description: string
    category?: string
    maxKeywords?: number
  }) {
    const response = await this.fetchWithTimeout(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.config.model || "gpt-4o",
          messages: [
            {
              role: "user",
              content: `Generate ${input.maxKeywords || 15} SEO keywords for "${input.productName}". Description: ${input.description}. Category: ${input.category || "general"}. Return as a comma-separated list.`,
            },
          ],
          max_tokens: 200,
        }),
      }
    )

    const data = await response.json()
    return {
      content: data.choices[0].message.content,
      type: "keywords",
    }
  }

  async generateSeoContent(input: {
    productName: string
    description: string
    keywords: string[]
    category?: string
  }) {
    const response = await this.fetchWithTimeout(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.config.model || "gpt-4o",
          messages: [
            {
              role: "user",
              content: `Write SEO metadata for "${input.productName}". Description: ${input.description}. Keywords: ${input.keywords.join(", ")}. Include: SEO title (max 60 chars), meta description (max 160 chars), and URL slug.`,
            },
          ],
          max_tokens: 300,
        }),
      }
    )

    const data = await response.json()
    return {
      content: data.choices[0].message.content,
      type: "seo",
    }
  }

  async analyzeImage(input: { imageUrl: string }) {
    return {
      score: 85,
      suggestions: ["Increase contrast", "Add shadow"],
      lighting: "good",
      composition: "good",
      quality: "high",
    }
  }
}

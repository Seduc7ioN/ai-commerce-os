import type { AIProvider, AIProviderConfig } from "./schema"

export abstract class BaseAIProvider implements AIProvider {
  abstract id: string
  abstract name: string
  protected config: AIProviderConfig

  constructor(config: AIProviderConfig) {
    this.config = config
  }

  abstract removeBackground(input: {
    imageUrl: string
  }): Promise<{ url: string; format: string }>

  abstract generateBackground(input: {
    imageUrl: string
    prompt?: string
    style?: string
  }): Promise<{ url: string; format: string }>

  abstract enhanceImage(input: {
    imageUrl: string
  }): Promise<{ url: string; format: string }>

  abstract generateDescription(input: {
    productName: string
    category?: string
    features?: string[]
    targetAudience?: string
    tone?: string
    language?: string
  }): Promise<{ content: string; type: string }>

  abstract generateKeywords(input: {
    productName: string
    description: string
    category?: string
    maxKeywords?: number
  }): Promise<{ content: string; type: string }>

  abstract generateSeoContent(input: {
    productName: string
    description: string
    keywords: string[]
    category?: string
  }): Promise<{ content: string; type: string }>

  abstract analyzeImage(input: {
    imageUrl: string
  }): Promise<{
    score: number
    suggestions: string[]
    lighting: string
    composition: string
    quality: string
  }>

  abstract isAvailable(): boolean

  protected async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout = 30000
  ): Promise<Response> {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      return response
    } finally {
      clearTimeout(id)
    }
  }
}

import type { AIProvider } from "./providers/schema"
import { initializeProviders, executeWithFallback, getAvailableProviders } from "./factory"

export type { AIProvider }
export { initializeProviders, executeWithFallback, getAvailableProviders }

export class AIClient {
  private initialized = false

  init() {
    if (!this.initialized) {
      initializeProviders()
      this.initialized = true
    }
  }

  async removeBackground(imageUrl: string) {
    this.init()
    return executeWithFallback("remove_bg", (provider) =>
      provider.removeBackground({ imageUrl })
    )
  }

  async generateBackground(imageUrl: string, prompt?: string) {
    this.init()
    return executeWithFallback("gen_bg", (provider) =>
      provider.generateBackground({ imageUrl, prompt })
    )
  }

  async enhanceImage(imageUrl: string) {
    this.init()
    return executeWithFallback("enhance", (provider) =>
      provider.enhanceImage({ imageUrl })
    )
  }

  async generateDescription(input: {
    productName: string
    category?: string
    features?: string[]
    targetAudience?: string
    tone?: string
    language?: string
  }) {
    this.init()
    return executeWithFallback("gen_description", (provider) =>
      provider.generateDescription(input)
    )
  }

  async generateKeywords(input: {
    productName: string
    description: string
    category?: string
    maxKeywords?: number
  }) {
    this.init()
    return executeWithFallback("gen_keywords", (provider) =>
      provider.generateKeywords(input)
    )
  }

  async generateSeoContent(input: {
    productName: string
    description: string
    keywords: string[]
    category?: string
  }) {
    this.init()
    return executeWithFallback("gen_seo", (provider) =>
      provider.generateSeoContent(input)
    )
  }

  async analyzeImage(imageUrl: string) {
    this.init()
    return executeWithFallback("analyze", (provider) =>
      provider.analyzeImage({ imageUrl })
    )
  }

  getProviders() {
    this.init()
    return getAvailableProviders()
  }
}

export const ai = new AIClient()

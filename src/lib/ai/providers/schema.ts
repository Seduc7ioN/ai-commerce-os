export interface ImageInput {
  imageUrl: string
  imageBuffer?: Buffer
  format?: "png" | "jpg" | "webp"
}

export interface ImageOutput {
  url: string
  buffer?: Buffer
  format: string
  width?: number
  height?: number
  size?: number
}

export interface BgGenInput {
  imageUrl: string
  prompt?: string
  style?: string
}

export interface TextGenInput {
  productName: string
  category?: string
  features?: string[]
  targetAudience?: string
  tone?: string
  language?: string
}

export interface TextOutput {
  content: string
  type: string
}

export interface KeywordInput {
  productName: string
  description: string
  category?: string
  maxKeywords?: number
}

export interface SeoInput {
  productName: string
  description: string
  keywords: string[]
  category?: string
}

export interface ImageAnalysis {
  score: number
  suggestions: string[]
  lighting: string
  composition: string
  quality: string
}

export interface AIProviderConfig {
  apiKey: string
  baseUrl?: string
  model?: string
  timeout?: number
}

export interface AIProvider {
  id: string
  name: string

  removeBackground(input: ImageInput): Promise<ImageOutput>
  generateBackground(input: BgGenInput): Promise<ImageOutput>
  enhanceImage(input: ImageInput): Promise<ImageOutput>

  generateDescription(input: TextGenInput): Promise<TextOutput>
  generateKeywords(input: KeywordInput): Promise<TextOutput>
  generateSeoContent(input: SeoInput): Promise<TextOutput>

  analyzeImage(input: ImageInput): Promise<ImageAnalysis>

  isAvailable(): boolean
}

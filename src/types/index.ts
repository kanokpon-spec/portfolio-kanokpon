export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  github?: string
  live?: string
  featured?: boolean
}

export interface Skill {
  name: string
  level: number
  icon: string
  category: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface ContactForm {
  name: string
  email: string
  subject?: string
  message: string
}

export interface ScrollState {
  progress: number
  direction: 'up' | 'down'
  velocity: number
}

export interface ThreeConfig {
  antialias: boolean
  alpha: boolean
  powerPreference: 'high-performance' | 'default' | 'low-power'
  pixelRatio: number
  toneMapping: number
  toneMappingExposure: number
}

export interface ParticleConfig {
  count: number
  size: number
  color: string
  opacity: number
  speed: number
  direction: 'up' | 'down' | 'random'
}

export interface AnimationConfig {
  duration: number
  delay: number
  ease: string
  stagger: number
}
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis: Lenis | null = null

export function initScroll() {
  if (typeof window === 'undefined') return

  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
    infinite: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function getLenis() {
  return lenis
}

export function scrollTo(target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) {
  if (!lenis) return

  const offset = options?.offset ?? 0
  const duration = options?.duration ?? 1.2

  if (typeof target === 'string') {
    const element = document.querySelector(target) as HTMLElement | null
    if (element) lenis.scrollTo(element, { offset, duration })
  } else if (typeof target === 'number') {
    lenis.scrollTo(target, { duration })
  } else if (target instanceof HTMLElement) {
    lenis.scrollTo(target, { offset, duration })
  }
}

export function stopScroll() {
  lenis?.stop()
}

export function startScroll() {
  lenis?.start()
}
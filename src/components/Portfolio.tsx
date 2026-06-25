import { JSX, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export interface PortfolioProps {
  className?: string
}

export class Portfolio {
  element: HTMLDivElement
  private animations: gsap.core.Timeline[] = []
  private intersectObserver: IntersectionObserver | null = null

  constructor(props: PortfolioProps = {}) {
    this.element = document.createElement('div')
    this.element.className = `portfolio ${props.className || ''}`
    this.element.style.position = 'relative'
    this.element.style.zIndex = 'var(--z-base)'
  }

  init() {
    this.setupObservers()
    this.setupScrollAnimations()
  }

  private setupObservers() {
    this.intersectObserver = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting } = entry

        if (isIntersecting) {
          this.element.classList.add('active')
        } else {
          this.element.classList.remove('active')
        }
      },
      { threshold: 0.1 }
    )

    this.intersectObserver.observe(this.element)
  }

  private setupScrollAnimations() {
    if (!ScrollTrigger) return

    const sections = this.element.querySelectorAll('.portfolio-section')

    sections.forEach((section, index) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play pause resume pause',
        },
      })

      this.setupSectionAnimation(timeline, section, index)
      this.animations.push(timeline)
    })
  }

  private setupSectionAnimation(timeline: gsap.core.Timeline, section: Element, index: number) {
    const content = section.querySelector('.portfolio-content')
    const media = section.querySelector('.portfolio-media')

    if (content) {
      timeline.from(
        content,
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
        },
        0
      )
    }

    if (media) {
      timeline.from(
        media,
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.2
      )
    }

    section.style.opacity = '1'
  }

  dispose() {
    this.animations.forEach((timeline) => timeline.kill())
    if (this.intersectObserver) this.intersectObserver.disconnect()
  }
}

export function PortfolioWrapper(props: PortfolioProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const [portfolio] = useState<Portfolio>(() => new Portfolio(props))

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.appendChild(portfolio.element)
      portfolio.init()

      return () => {
        portfolio.dispose()
      }
    }
  }, [])

  return <div ref={ref} className="portfolio-wrapper" />
}
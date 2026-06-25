import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HeroSection } from './sections/HeroSection'
import { AboutSection } from './sections/AboutSection'
import { ProjectsSection } from './sections/ProjectsSection'
import { SkillsSection } from './sections/SkillsSection'
import { ContactSection } from './sections/ContactSection'
import { Navbar } from './ui/Navbar'
import { CustomCursor } from './ui/CustomCursor'
import { Loader } from './ui/Loader'

export class Portfolio {
  element: HTMLElement
  private navbar: Navbar
  private cursor: CustomCursor
  private loader: Loader
  private sections: Section[] = []

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'portfolio'
    this.navbar = new Navbar()
    this.cursor = new CustomCursor()
    this.loader = new Loader()
  }

  async init() {
    await this.loader.show()

    this.element.appendChild(this.navbar.element)
    this.element.appendChild(this.cursor.element)

    const container = document.createElement('main')
    container.className = 'portfolio__main'

    const hero = new HeroSection()
    const about = new AboutSection()
    const projects = new ProjectsSection()
    const skills = new SkillsSection()
    const contact = new ContactSection()

    this.sections = [hero, about, projects, skills, contact]

    this.sections.forEach((section) => {
      container.appendChild(section.element)
    })

    this.element.appendChild(container)

    this.setupScrollAnimations()
    this.setupNavigation()

    await this.loader.hide()
  }

  private setupScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger)

    this.sections.forEach((section, index) => {
      gsap.from(section.element, {
        scrollTrigger: {
          trigger: section.element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
      })
    })

    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
      })
    })

    gsap.utils.toArray<HTMLElement>('.scale-in').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)',
      })
    })

    gsap.utils.toArray<HTMLElement>('.slide-left').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: -50,
        duration: 0.6,
        ease: 'power2.out',
      })
    })

    gsap.utils.toArray<HTMLElement>('.slide-right').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: 50,
        duration: 0.6,
        ease: 'power2.out',
      })
    })
  }

  private setupNavigation() {
    const links = this.navbar.element.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute('href') || '')
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
  }
}

type Section = { element: HTMLElement }
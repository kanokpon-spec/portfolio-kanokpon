import { gsap } from 'gsap'

export class CustomCursor {
  element: HTMLElement
  private cursorDot: HTMLElement
  private cursorOutline: HTMLElement
  private mouseX = 0
  private mouseY = 0

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'custom-cursor'
    this.cursorDot = document.createElement('div')
    this.cursorDot.className = 'custom-cursor__dot'
    this.cursorOutline = document.createElement('div')
    this.cursorOutline.className = 'custom-cursor__outline'

    this.element.appendChild(this.cursorDot)
    this.element.appendChild(this.cursorOutline)

    this.render()
    this.setupEvents()
  }

  private render() {
    document.body.appendChild(this.element)
  }

  private setupEvents() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    })

    gsap.ticker.add(() => {
      gsap.to(this.cursorDot, {
        x: this.mouseX,
        y: this.mouseY,
        duration: 0.1,
        ease: 'power2.out',
      })

      gsap.to(this.cursorOutline, {
        x: this.mouseX,
        y: this.mouseY,
        duration: 0.35,
        ease: 'power2.out',
      })
    })

    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.element.classList.add('custom-cursor--hover')
      })
      el.addEventListener('mouseleave', () => {
        this.element.classList.remove('custom-cursor--hover')
      })
    })
  }
}
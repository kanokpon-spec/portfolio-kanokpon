import { gsap } from 'gsap'

export class Loader {
  element: HTMLElement
  private progress: HTMLElement | null = null
  private percentage: HTMLElement | null = null
  private counter = 0

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'loader'
    this.render()
  }

  private render() {
    this.element.innerHTML = `
      <div class="loader__content">
        <div class="loader__logo">
          <span class="loader__bracket">{</span>
          <span class="loader__text">Dev</span>
          <span class="loader__bracket">}</span>
        </div>
        <div class="loader__bar">
          <div class="loader__progress"></div>
        </div>
        <div class="loader__percentage">0%</div>
        <div class="loader__status">Loading experience...</div>
      </div>
    `
    this.progress = this.element.querySelector('.loader__progress')
    this.percentage = this.element.querySelector('.loader__percentage')
  }

  async show(): Promise<void> {
    document.body.appendChild(this.element)

    return new Promise((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => resolve(),
      })

      tl.from(this.element, {
        opacity: 0,
        duration: 0.5,
      })

      const obj = { value: 0 }
      gsap.to(obj, {
        value: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          this.counter = Math.floor(obj.value)
          if (this.progress) this.progress.style.width = `${this.counter}%`
          if (this.percentage) this.percentage.textContent = `${this.counter}%`
        },
      })
    })
  }

  async hide(): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(this.element, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          this.element.remove()
          resolve()
        },
      })
    })
  }
}
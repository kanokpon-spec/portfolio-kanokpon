import { Container } from './Container'
import { SectionTitle } from './SectionTitle'

export interface SectionOptions {
  id?: string
  className?: string
  title?: string
  subtitle?: string
}

export class Section {
  element: HTMLElement
  protected container: Container
  protected title: SectionTitle | null = null

  constructor(options: SectionOptions = {}) {
    this.element = document.createElement('section')
    this.element.className = `section ${options.className || ''}`
    if (options.id) this.element.id = options.id

    this.container = new Container()

    if (options.title) {
      this.title = new SectionTitle({
        title: options.title,
        subtitle: options.subtitle,
      })
      this.container.element.appendChild(this.title.element)
    }

    this.element.appendChild(this.container.element)
  }

  setContent(content: HTMLElement) {
    this.container.element.appendChild(content)
  }
}
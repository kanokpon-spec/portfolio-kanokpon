export interface SectionTitleOptions {
  title: string
  subtitle?: string
}

export class SectionTitle {
  element: HTMLElement

  constructor(options: SectionTitleOptions) {
    this.element = document.createElement('div')
    this.element.className = 'section-title'
    this.render(options)
  }

  private render(options: SectionTitleOptions) {
    this.element.innerHTML = `
      <div class="section-title__header">
        <span class="section-title__line"></span>
        <span class="section-title__label">${options.subtitle || 'Section'}</span>
      </div>
      <h2 class="section-title__text">${options.title}</h2>
    `
  }
}
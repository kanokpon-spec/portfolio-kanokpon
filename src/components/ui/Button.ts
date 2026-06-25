export interface ButtonOptions {
  text: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: string
}

export class Button {
  element: HTMLElement

  constructor(options: ButtonOptions) {
    this.element = document.createElement(options.href ? 'a' : 'button')
    this.element.className = `btn btn--${options.variant || 'primary'}`

    if (options.href) {
      this.element.setAttribute('href', options.href)
    }

    this.render(options)
  }

  private render(options: ButtonOptions) {
    this.element.innerHTML = `
      <span class="btn__text">${options.text}</span>
      ${options.icon ? `<span class="btn__icon">${options.icon}</span>` : ''}
      <span class="btn__bg"></span>
    `
  }
}
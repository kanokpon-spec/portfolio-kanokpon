export class Container {
  element: HTMLElement

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'container'
  }

  addContent(content: HTMLElement | string) {
    if (typeof content === 'string') {
      const div = document.createElement('div')
      div.innerHTML = content
      this.element.appendChild(div)
    } else {
      this.element.appendChild(content)
    }
  }
}
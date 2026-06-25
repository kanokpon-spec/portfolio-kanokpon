import { Portfolio } from '@components/Portfolio'

export function createApp() {
  return {
    mount(selector: string) {
      const container = document.querySelector(selector)
      if (!container) throw new Error(`Container ${selector} not found`)

      const portfolio = new Portfolio()
      container.appendChild(portfolio.element)
      portfolio.init()
    },
  }
}
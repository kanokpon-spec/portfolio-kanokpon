import { ScrollTrigger } from 'gsap/ScrollTrigger'

export class Navbar {
  element: HTMLElement

  constructor() {
    this.element = document.createElement('nav')
    this.element.className = 'navbar'
    this.render()
    this.setupScroll()
  }

  private render() {
    this.element.innerHTML = `
      <div class="navbar__container">
        <a href="#" class="navbar__logo">
          <span class="navbar__logo-bracket">{</span>
          <span class="navbar__logo-text">Dev</span>
          <span class="navbar__logo-bracket">}</span>
        </a>

        <div class="navbar__links">
          <a href="#hero" class="navbar__link" data-section="hero">
            <span class="navbar__link-index">01.</span>
            <span class="navbar__link-text">Home</span>
          </a>
          <a href="#about" class="navbar__link" data-section="about">
            <span class="navbar__link-index">02.</span>
            <span class="navbar__link-text">About</span>
          </a>
          <a href="#projects" class="navbar__link" data-section="projects">
            <span class="navbar__link-index">03.</span>
            <span class="navbar__link-text">Projects</span>
          </a>
          <a href="#skills" class="navbar__link" data-section="skills">
            <span class="navbar__link-index">04.</span>
            <span class="navbar__link-text">Skills</span>
          </a>
          <a href="#contact" class="navbar__link" data-section="contact">
            <span class="navbar__link-index">05.</span>
            <span class="navbar__link-text">Contact</span>
          </a>
        </div>

        <button class="navbar__menu-btn" aria-label="Toggle menu">
          <span class="navbar__menu-line"></span>
          <span class="navbar__menu-line"></span>
          <span class="navbar__menu-line"></span>
        </button>

        <div class="navbar__mobile-menu">
          <a href="#hero" class="navbar__mobile-link">
            <span class="navbar__link-index">01.</span>
            Home
          </a>
          <a href="#about" class="navbar__mobile-link">
            <span class="navbar__link-index">02.</span>
            About
          </a>
          <a href="#projects" class="navbar__mobile-link">
            <span class="navbar__link-index">03.</span>
            Projects
          </a>
          <a href="#skills" class="navbar__mobile-link">
            <span class="navbar__link-index">04.</span>
            Skills
          </a>
          <a href="#contact" class="navbar__mobile-link">
            <span class="navbar__link-index">05.</span>
            Contact
          </a>
        </div>
      </div>
    `

    const menuBtn = this.element.querySelector('.navbar__menu-btn')
    menuBtn?.addEventListener('click', () => {
      this.element.classList.toggle('navbar--open')
    })

    const mobileLinks = this.element.querySelectorAll('.navbar__mobile-link')
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        this.element.classList.remove('navbar--open')
      })
    })
  }

  private setupScroll() {
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { className: 'navbar--scrolled', targets: this.element },
    })
  }
}
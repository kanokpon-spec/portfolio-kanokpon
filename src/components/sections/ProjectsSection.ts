import { gsap } from 'gsap'
import { Section } from '../ui/Section'

interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  github?: string
  live?: string
  featured?: boolean
}

export class ProjectsSection extends Section {
  private projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: 'project1.jpg',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true,
    },
    {
      title: '3D Portfolio Website',
      description: 'An immersive 3D portfolio experience built with Three.js, featuring scroll animations and interactive elements.',
      tags: ['Three.js', 'GSAP', 'WebGL', 'TypeScript'],
      image: 'project2.jpg',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true,
    },
    {
      title: 'Real-time Chat App',
      description: 'A real-time messaging application with WebSocket support, file sharing, and end-to-end encryption.',
      tags: ['Next.js', 'Socket.io', 'Redis', 'MongoDB'],
      image: 'project3.jpg',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'AI Content Generator',
      description: 'An AI-powered content generation tool using OpenAI API for creating marketing copy and blog posts.',
      tags: ['Python', 'FastAPI', 'React', 'OpenAI'],
      image: 'project4.jpg',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Dashboard Analytics',
      description: 'A comprehensive analytics dashboard with real-time data visualization and custom reporting.',
      tags: ['Vue.js', 'D3.js', 'GraphQL', 'AWS'],
      image: 'project5.jpg',
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      title: 'Mobile Fitness App',
      description: 'A cross-platform fitness tracking app with workout plans, nutrition tracking, and social features.',
      tags: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
      image: 'project6.jpg',
      github: 'https://github.com',
      live: 'https://example.com',
    },
  ]

  constructor() {
    super({
      id: 'projects',
      className: 'projects',
      title: 'My Projects',
      subtitle: '// Projects',
    })
    this.setContent(this.createContent())
    this.setupHoverEffects()
  }

  private createContent(): HTMLElement {
    const content = document.createElement('div')
    content.className = 'projects__content'

    const grid = document.createElement('div')
    grid.className = 'projects__grid'

    this.projects.forEach((project, index) => {
      const card = this.createProjectCard(project, index)
      grid.appendChild(card)
    })

    content.appendChild(grid)

    const viewMore = document.createElement('div')
    viewMore.className = 'projects__view-more reveal'
    viewMore.innerHTML = `
      <a href="https://github.com" class="btn btn--secondary">
        <span class="btn__text">View All Projects</span>
        <span class="btn__icon">&#8594;</span>
      </a>
    `
    content.appendChild(viewMore)

    return content
  }

  private createProjectCard(project: Project, index: number): HTMLElement {
    const card = document.createElement('div')
    card.className = `projects__card ${project.featured ? 'projects__card--featured' : ''}`
    card.setAttribute('data-cursor', 'pointer')

    card.innerHTML = `
      <div class="projects__card-image">
        <div class="projects__card-placeholder">
          <span class="projects__card-number">${String(index + 1).padStart(2, '0')}</span>
        </div>
        <div class="projects__card-overlay">
          <div class="projects__card-actions">
            ${project.github ? `<a href="${project.github}" class="projects__card-btn" target="_blank" rel="noopener">
              <span>&#60;/&#62;</span> Code
            </a>` : ''}
            ${project.live ? `<a href="${project.live}" class="projects__card-btn" target="_blank" rel="noopener">
              <span>&#9741;</span> Live
            </a>` : ''}
          </div>
        </div>
      </div>
      <div class="projects__card-content">
        <h3 class="projects__card-title">${project.title}</h3>
        <p class="projects__card-desc">${project.description}</p>
        <div class="projects__card-tags">
          ${project.tags.map((tag) => `<span class="projects__card-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `

    return card
  }

  private setupHoverEffects() {
    const cards = this.element.querySelectorAll('.projects__card')
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      })
    })
  }
}
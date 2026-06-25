import { gsap } from 'gsap'
import { Section } from '../ui/Section'

interface Skill {
  name: string
  level: number
  icon: string
  category: string
}

export class SkillsSection extends Section {
  private skills: Skill[] = [
    { name: 'TypeScript', level: 95, icon: 'TS', category: 'Languages' },
    { name: 'JavaScript', level: 98, icon: 'JS', category: 'Languages' },
    { name: 'React', level: 92, icon: 'Re', category: 'Frameworks' },
    { name: 'Next.js', level: 88, icon: 'N', category: 'Frameworks' },
    { name: 'Three.js', level: 85, icon: '3D', category: '3D/Graphics' },
    { name: 'WebGL', level: 80, icon: 'GL', category: '3D/Graphics' },
    { name: 'Node.js', level: 90, icon: 'No', category: 'Backend' },
    { name: 'Python', level: 82, icon: 'Py', category: 'Languages' },
    { name: 'PostgreSQL', level: 85, icon: 'Pg', category: 'Database' },
    { name: 'Docker', level: 78, icon: 'Dk', category: 'DevOps' },
    { name: 'AWS', level: 75, icon: 'AW', category: 'Cloud' },
    { name: 'GraphQL', level: 80, icon: 'GQ', category: 'API' },
  ]

  private techStack = [
    'React', 'Next.js', 'TypeScript', 'Three.js', 'Node.js',
    'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker',
    'AWS', 'Git', 'GraphQL', 'REST API', 'WebSocket',
    'GSAP', 'WebGL', 'Vite', 'Webpack', 'TailwindCSS',
  ]

  constructor() {
    super({
      id: 'skills',
      className: 'skills',
      title: 'Skills & Tech Stack',
      subtitle: '// Skills',
    })
    this.setContent(this.createContent())
    this.animateSkillBars()
  }

  private createContent(): HTMLElement {
    const content = document.createElement('div')
    content.className = 'skills__content'

    const skillGrid = document.createElement('div')
    skillGrid.className = 'skills__grid'
    this.skills.forEach((skill) => {
      skillGrid.appendChild(this.createSkillItem(skill))
    })

    const techCloud = document.createElement('div')
    techCloud.className = 'skills__tech-cloud reveal'
    techCloud.innerHTML = `
      <h3 class="skills__tech-title">Tech Stack</h3>
      <div class="skills__tech-tags">
        ${this.techStack.map((tech) => `
          <span class="skills__tech-tag" data-cursor="pointer">${tech}</span>
        `).join('')}
      </div>
    `

    const codeSnippet = document.createElement('div')
    codeSnippet.className = 'skills__code reveal'
    codeSnippet.innerHTML = `
      <div class="skills__code-block">
        <div class="skills__code-header">
          <span class="skills__code-dot skills__code-dot--red"></span>
          <span class="skills__code-dot skills__code-dot--yellow"></span>
          <span class="skills__code-dot skills__code-dot--green"></span>
          <span class="skills__code-title">skills.ts</span>
        </div>
        <pre class="skills__code-content">
          <code>
<span class="code-keyword">export const</span> <span class="code-variable">mySkills</span> = {
  <span class="code-property">frontend</span>: [<span class="code-string">"React"</span>, <span class="code-string">"Next.js"</span>, <span class="code-string">"Three.js"</span>],
  <span class="code-property">backend</span>: [<span class="code-string">"Node.js"</span>, <span class="code-string">"Python"</span>, <span class="code-string">"GraphQL"</span>],
  <span class="code-property">database</span>: [<span class="code-string">"PostgreSQL"</span>, <span class="code-string">"MongoDB"</span>, <span class="code-string">"Redis"</span>],
  <span class="code-property">devops</span>: [<span class="code-string">"Docker"</span>, <span class="code-string">"AWS"</span>, <span class="code-string">"CI/CD"</span>],
  <span class="code-property">tools</span>: [<span class="code-string">"Git"</span>, <span class="code-string">"VS Code"</span>, <span class="code-string">"Figma"</span>],
};
          </code>
        </pre>
      </div>
    `

    content.appendChild(skillGrid)
    content.appendChild(techCloud)
    content.appendChild(codeSnippet)

    return content
  }

  private createSkillItem(skill: Skill): HTMLElement {
    const item = document.createElement('div')
    item.className = 'skills__item reveal'

    item.innerHTML = `
      <div class="skills__item-header">
        <span class="skills__item-icon">${skill.icon}</span>
        <span class="skills__item-name">${skill.name}</span>
        <span class="skills__item-level">${skill.level}%</span>
      </div>
      <div class="skills__item-bar">
        <div class="skills__item-progress" data-level="${skill.level}"></div>
      </div>
      <span class="skills__item-category">${skill.category}</span>
    `

    return item
  }

  private animateSkillBars() {
    const progressBars = this.element.querySelectorAll('.skills__item-progress')
    progressBars.forEach((bar) => {
      const level = bar.getAttribute('data-level') || '0'
      gsap.fromTo(
        bar,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
          },
        }
      )
    })
  }
}
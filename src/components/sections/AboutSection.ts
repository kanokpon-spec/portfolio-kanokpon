import { Section } from "../ui/Section";

export class AboutSection extends Section {
  constructor() {
    super({
      id: "about",
      className: "about",
      title: "About Me",
      subtitle: "// About",
    });
    this.setContent(this.createContent());
  }

  private createContent(): HTMLElement {
    const content = document.createElement("div");
    content.className = "about__content";

    content.innerHTML = `
      <div class="about__grid">
        <div class="about__text slide-left">
          <div class="about__code-block">
            <div class="about__code-header">
              <span class="about__code-dot about__code-dot--red"></span>
              <span class="about__code-dot about__code-dot--yellow"></span>
              <span class="about__code-dot about__code-dot--green"></span>
              <span class="about__code-title">about-me.ts</span>
            </div>
            <pre class="about__code">
              <code>
<span class="code-keyword">const</span> <span class="code-variable">developer</span> = {
  <span class="code-property">name</span>: <span class="code-string">"Kanokpon Satjayat"</span>,
  <span class="code-property">role</span>: <span class="code-string">"Full Stack Developer"</span>,
  <span class="code-property">location</span>: <span class="code-string">"Thailand"</span>,
  <span class="code-property">education</span>: <span class="code-string">"Computer Science"</span>,
  <span class="code-property">experience</span>: <span class="code-string">"5+ years"</span>,
  <span class="code-property">passion</span>: <span class="code-string">"Building cool stuff"</span>,
};

<span class="code-keyword">export default</span> developer;
              </code>
            </pre>
          </div>
        </div>

        <div class="about__info slide-right">
          <div class="about__card reveal">
            <div class="about__card-icon">&#128187;</div>
            <h3 class="about__card-title">Web Development</h3>
            <p class="about__card-text">
              Building modern, responsive web applications with cutting-edge technologies.
              Expert in React, Next.js, and TypeScript.
            </p>
          </div>

          <div class="about__card reveal">
            <div class="about__card-icon">&#127912;</div>
            <h3 class="about__card-title">3D & WebGL</h3>
            <p class="about__card-text">
              Creating immersive 3D experiences with Three.js, shaders, and WebGL.
              Specializing in interactive visualizations.
            </p>
          </div>

          <div class="about__card reveal">
            <div class="about__card-icon">&#9889;</div>
            <h3 class="about__card-title">Performance</h3>
            <p class="about__card-text">
              Optimizing applications for speed and efficiency. Expert in code splitting,
              lazy loading, and performance monitoring.
            </p>
          </div>
        </div>
      </div>

      <div class="about__timeline reveal">
        <h3 class="about__timeline-title">Experience Timeline</h3>
        <div class="about__timeline-items">
          <div class="about__timeline-item">
            <div class="about__timeline-dot"></div>
            <div class="about__timeline-content">
              <span class="about__timeline-year">2024 - Present</span>
              <h4 class="about__timeline-role">Senior Developer</h4>
              <p class="about__timeline-company">Tech Company</p>
              <p class="about__timeline-desc">Leading development of innovative web applications</p>
            </div>
          </div>
          <div class="about__timeline-item">
            <div class="about__timeline-dot"></div>
            <div class="about__timeline-content">
              <span class="about__timeline-year">2022 - 2024</span>
              <h4 class="about__timeline-role">Full Stack Developer</h4>
              <p class="about__timeline-company">Digital Agency</p>
              <p class="about__timeline-desc">Built scalable applications for various clients</p>
            </div>
          </div>
          <div class="about__timeline-item">
            <div class="about__timeline-dot"></div>
            <div class="about__timeline-content">
              <span class="about__timeline-year">2020 - 2022</span>
              <h4 class="about__timeline-role">Frontend Developer</h4>
              <p class="about__timeline-company">Startup</p>
              <p class="about__timeline-desc">Developed interactive user interfaces</p>
            </div>
          </div>
        </div>
      </div>
    `;

    return content;
  }
}

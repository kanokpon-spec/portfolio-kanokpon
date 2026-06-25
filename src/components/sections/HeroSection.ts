import { gsap } from "gsap";
import { Section } from "../ui/Section";

export class HeroSection extends Section {
  private particles: HTMLElement[] = [];

  constructor() {
    super({ id: "hero", className: "hero" });
    this.setContent(this.createContent());
    this.setupAnimations();
    this.createParticles();
  }

  private createContent(): HTMLElement {
    const content = document.createElement("div");
    content.className = "hero__content";

    content.innerHTML = `
      <div class="hero__text">
        <div class="hero__greeting reveal">
          <span class="hero__greeting-line"></span>
          <span class="hero__greeting-text">Hello, I'm</span>
        </div>

        <h1 class="hero__name">
          <span class="hero__name-first reveal">Kanokpon</span>
          <span class="hero__name-last reveal">Satjayat</span>
        </h1>

        <h2 class="hero__title">
          <span class="hero__title-text">I build</span>
          <span class="hero__title-highlight" id="hero-typed"></span>
          <span class="hero__title-cursor">|</span>
        </h2>

        <p class="hero__description reveal">
          A passionate developer crafting digital experiences with cutting-edge technologies.
          Specializing in Three.js, WebGL, and interactive web applications.
        </p>

        <div class="hero__cta reveal">
          <a href="#projects" class="btn btn--primary">
            <span class="btn__text">View My Work</span>
            <span class="btn__icon">&#8595;</span>
            <span class="btn__bg"></span>
          </a>
          <a href="#contact" class="btn btn--ghost">
            <span class="btn__text">Contact Me</span>
          </a>
        </div>

        <div class="hero__stats reveal">
          <div class="hero__stat">
            <span class="hero__stat-number" data-count="5">0</span>
            <span class="hero__stat-label">Years Experience</span>
          </div>
          <div class="hero__stat">
            <span class="hero__stat-number" data-count="50">0</span>
            <span class="hero__stat-label">Projects Completed</span>
          </div>
          <div class="hero__stat">
            <span class="hero__stat-number" data-count="30">0</span>
            <span class="hero__stat-label">Happy Clients</span>
          </div>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__image-wrapper">
          <div class="hero__image-border"></div>
          <div class="hero__image-placeholder">
            <span class="hero__image-icon">&lt;/&gt;</span>
          </div>
          <div class="hero__image-dots"></div>
        </div>
        <div class="hero__floating-badge hero__floating-badge--1">
          <span>&#9881;</span> React
        </div>
        <div class="hero__floating-badge hero__floating-badge--2">
          <span>&#9883;</span> Three.js
        </div>
        <div class="hero__floating-badge hero__floating-badge--3">
          <span>&#9889;</span> TypeScript
        </div>
      </div>

      <div class="hero__scroll-indicator">
        <div class="hero__scroll-line"></div>
        <span class="hero__scroll-text">Scroll Down</span>
      </div>
    `;

    return content;
  }

  private createParticles() {
    const container = this.element.querySelector(".hero__visual");
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "hero__particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(particle);
      this.particles.push(particle);
    }
  }

  private setupAnimations() {
    const tl = gsap.timeline({ delay: 2.5 });

    tl.from(".hero__greeting", {
      opacity: 0,
      x: -30,
      duration: 0.6,
      ease: "power3.out",
    })
      .from(
        ".hero__name-first",
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        ".hero__name-last",
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .from(
        ".hero__title",
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".hero__description",
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        ".hero__cta",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .from(
        ".hero__stats .hero__stat",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .from(
        ".hero__visual",
        {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "-=0.8",
      )
      .from(
        ".hero__floating-badge",
        {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(2)",
        },
        "-=0.5",
      )
      .from(
        ".hero__scroll-indicator",
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.3",
      );

    this.typeText();
    this.animateStats();
  }

  private typeText() {
    const typed = document.getElementById("hero-typed");
    if (!typed) return;

    const words = [
      "innovative apps",
      "3D experiences",
      "modern web",
      "creative solutions",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typed.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typed.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    };

    setTimeout(type, 3000);
  }

  private animateStats() {
    const stats = this.element.querySelectorAll(".hero__stat-number");
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count") || "0");
      let current = 0;
      const increment = target / 60;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          stat.textContent = Math.floor(current).toString();
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = target.toString();
        }
      };

      setTimeout(updateCounter, 3500);
    });
  }
}

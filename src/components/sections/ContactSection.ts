import { Section } from "../ui/Section";

export class ContactSection extends Section {
  constructor() {
    super({
      id: "contact",
      className: "contact",
      title: "Let's Work Together",
      subtitle: "// Contact",
    });
    this.setContent(this.createContent());
    this.setupForm();
  }

  private createContent(): HTMLElement {
    const content = document.createElement("div");
    content.className = "contact__content";

    content.innerHTML = `
      <div class="contact__grid">
        <div class="contact__info slide-left">
          <p class="contact__description">
            I'm always open to discussing new projects, creative ideas,
            or opportunities to be part of your vision. Let's create
            something amazing together!
          </p>

          <div class="contact__details">
            <div class="contact__detail reveal">
              <span class="contact__detail-icon">&#128231;</span>
              <div class="contact__detail-info">
                <span class="contact__detail-label">Email</span>
                <a href="mailto:hello@example.com" class="contact__detail-value">hello@example.com</a>
              </div>
            </div>
            <div class="contact__detail reveal">
              <span class="contact__detail-icon">&#128205;</span>
              <div class="contact__detail-info">
                <span class="contact__detail-label">Location</span>
                <span class="contact__detail-value">Bangkok, Thailand</span>
              </div>
            </div>
            <div class="contact__detail reveal">
              <span class="contact__detail-icon">&#128337;</span>
              <div class="contact__detail-info">
                <span class="contact__detail-label">Availability</span>
                <span class="contact__detail-value contact__detail-value--available">Open to opportunities</span>
              </div>
            </div>
          </div>

          <div class="contact__social reveal">
            <a href="https://github.com" class="contact__social-link" target="_blank" rel="noopener" data-cursor="pointer">
              <span class="contact__social-icon">&#60;/&#62;</span>
              <span class="contact__social-name">GitHub</span>
            </a>
            <a href="https://linkedin.com" class="contact__social-link" target="_blank" rel="noopener" data-cursor="pointer">
              <span class="contact__social-icon">in</span>
              <span class="contact__social-name">LinkedIn</span>
            </a>
            <a href="https://twitter.com" class="contact__social-link" target="_blank" rel="noopener" data-cursor="pointer">
              <span class="contact__social-icon">&#120143;</span>
              <span class="contact__social-name">Twitter</span>
            </a>
          </div>
        </div>

        <div class="contact__form-wrapper slide-right">
          <form class="contact__form" id="contact-form">
            <div class="contact__form-group">
              <label class="contact__form-label" for="name">Name</label>
              <input type="text" id="name" name="name" class="contact__form-input" placeholder="Your name" required />
              <span class="contact__form-line"></span>
            </div>

            <div class="contact__form-group">
              <label class="contact__form-label" for="email">Email</label>
              <input type="email" id="email" name="email" class="contact__form-input" placeholder="your@email.com" required />
              <span class="contact__form-line"></span>
            </div>

            <div class="contact__form-group">
              <label class="contact__form-label" for="subject">Subject</label>
              <input type="text" id="subject" name="subject" class="contact__form-input" placeholder="Project inquiry" />
              <span class="contact__form-line"></span>
            </div>

            <div class="contact__form-group">
              <label class="contact__form-label" for="message">Message</label>
              <textarea id="message" name="message" class="contact__form-input contact__form-textarea" placeholder="Tell me about your project..." rows="5" required></textarea>
              <span class="contact__form-line"></span>
            </div>

            <div class="contact__form-submit">
              <button type="submit" class="btn btn--primary">
                <span class="btn__text">Send Message</span>
                <span class="btn__icon">&#9654;</span>
                <span class="btn__bg"></span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer class="contact__footer">
        <div class="contact__footer-content">
          <span class="contact__footer-text">
            <span class="code-comment">//</span> Designed & Built with Three.js
          </span>
          <span class="contact__footer-copyright">
            &copy; ${new Date().getFullYear()} Kanokpon Satjayat
          </span>
        </div>
      </footer>
    `;

    return content;
  }

  private setupForm() {
    const form = this.element.querySelector("#contact-form") as HTMLFormElement;
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log("Form submitted:", data);

      const btn = form.querySelector(".btn");
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="btn__text">Message Sent!</span>';
        btn.classList.add("btn--success");

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove("btn--success");
          form.reset();
        }, 3000);
      }
    });

    const inputs = form.querySelectorAll(".contact__form-input");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input
          .closest(".contact__form-group")
          ?.classList.add("contact__form-group--active");
      });

      input.addEventListener("blur", () => {
        input
          .closest(".contact__form-group")
          ?.classList.remove("contact__form-group--active");
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // ── Theme toggle ──────────────────────────────────────
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = root.dataset.theme;

  const preferredTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light";

  root.dataset.theme = savedTheme || preferredTheme;

  function updateThemeButton() {
    if (!themeToggle) return;

    const isDark = root.dataset.theme === "dark";

    themeToggle.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  updateThemeButton();

  themeToggle?.addEventListener("click", () => {
    root.dataset.theme =
      root.dataset.theme === "dark" ? "light" : "dark";

    updateThemeButton();
  });

  // ── Mobile navigation ─────────────────────────────────
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
    menuToggle.classList.remove("is-active");
  }

  menuToggle?.addEventListener("click", () => {
    if (!mainNav) return;

    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mainNav.classList.toggle("is-open", !isOpen);
    menuToggle.classList.toggle("is-active", !isOpen);
  });

  mainNav?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (
      mainNav &&
      menuToggle &&
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });

  // ── Project filters ───────────────────────────────────
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll("[data-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;

        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow =
          selectedFilter === "all" ||
          category === selectedFilter;

        card.hidden = !shouldShow;
      });
    });
  });

  // ── Active navigation link ────────────────────────────
  const navLinks = document.querySelectorAll(
    '#mainNav a[href^="#"]'
  );

  const sections = Array.from(navLinks)
    .map((link) => {
      const target = document.querySelector(link.getAttribute("href"));

      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (!visibleSections.length) return;

        const activeId = visibleSections[0].target.id;

        sections.forEach(({ link, target }) => {
          const isActive = target.id === activeId;

          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    sections.forEach(({ target }) => {
      sectionObserver.observe(target);
    });
  }

  // ── Scroll reveal animations ──────────────────────────
  const revealElements = document.querySelectorAll(
    ".glass-card, .project-card, .skill-card, .timeline-item"
  );

  if ("IntersectionObserver" in window && revealElements.length) {
    revealElements.forEach((element) => {
      element.classList.add("reveal-element");
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  // ── Contact form → WhatsApp ───────────────────────────
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameField = contactForm.querySelector('[name="name"]');
    const emailField = contactForm.querySelector('[name="email"]');
    const messageField = contactForm.querySelector(
      '[name="message"]'
    );

    const name = nameField?.value.trim() || "";
    const email = emailField?.value.trim() || "";
    const message = messageField?.value.trim() || "";

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.textContent =
          "Please fill in all the fields before continuing.";
      }

      return;
    }

    const whatsappMessage = [
      "Hi Sneha! I'd like to get in touch.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const whatsappURL =
      "https://wa.me/916232448666?text=" +
      encodeURIComponent(whatsappMessage);

    if (formStatus) {
      formStatus.textContent =
        "Opening WhatsApp… review your message and send it there.";
    }

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });

  // ── Automatic footer year ─────────────────────────────
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

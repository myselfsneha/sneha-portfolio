const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const currentYear = document.getElementById("currentYear");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const whatsappNumber = "916232448666";

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;

  if (themeToggle) {
    const icon = themeToggle.querySelector(".theme-icon");

    if (icon) {
      icon.textContent = theme === "dark" ? "☀" : "☾";
    }

    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );

    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

function getInitialTheme() {
  const savedTheme = document.documentElement.dataset.theme;

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

setTheme(getInitialTheme());

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme || "light";
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

function closeMenu() {
  if (!menuToggle || !mainNav) return;

  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle?.addEventListener("click", () => {
  if (!mainNav) return;

  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

mainNav?.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  if (!mainNav || !menuToggle || !mainNav.classList.contains("open")) return;

  if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mainNav?.classList.contains("open")) {
    closeMenu();
    menuToggle?.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter || "all";

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;

      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const category = card.dataset.category || "";
      const shouldShow =
        selectedFilter === "all" || category === selectedFilter;

      card.hidden = !shouldShow;
    });
  });
});

const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visibleSections.length) return;

      const currentId = visibleSections[0].target.id;

      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${currentId}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0, 0.2, 0.5, 0.8]
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const revealElements = document.querySelectorAll(
  ".glass-card, .project-card, .skill-card, .timeline-item"
);

if ("IntersectionObserver" in window && !prefersReducedMotion.matches) {
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
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal-ready");
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

const terminalLines = [
  "const dream = true;",
  "while (curious) {",
  "keepBuilding();",
  "}",
  "learning = 'always';",
  "shipSmallThings();"
];

const terminal = document.querySelector(".art-card-code");

if (terminal && !prefersReducedMotion.matches) {
  const codeLines = terminal.querySelectorAll(".code-line");
  let currentLine = 0;

  if (codeLines.length) {
    window.setInterval(() => {
      currentLine = (currentLine + 1) % terminalLines.length;

      const nextLine = terminalLines[currentLine];
      const targetLine = codeLines[currentLine % codeLines.length];

      if (targetLine) {
        targetLine.textContent = nextLine;
      }
    }, 3200);
  }
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  const name = document.getElementById("contactName")?.value.trim() || "";
  const email = document.getElementById("contactEmail")?.value.trim() || "";
  const message =
    document.getElementById("contactMessage")?.value.trim() || "";

  if (!name || !email || !message) {
    if (formStatus) {
      formStatus.textContent = "Please fill in all three fields first.";
    }
    return;
  }

  const whatsappMessage = [
    "Hi Sneha! 👋",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message
  ].join("\n");

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  if (formStatus) {
    formStatus.textContent =
      "Opening WhatsApp with your message. Review it there and tap Send.";
  }

  const whatsappWindow = window.open(whatsappUrl, "_blank");

  if (whatsappWindow) {
    whatsappWindow.opener = null;
  } else {
    window.location.href = whatsappUrl;
  }
});

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
      block: "start"
    });

    if (window.location.hash !== href) {
      history.replaceState(null, "", href);
    }
  });
});

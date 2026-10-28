

"use strict";


const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) =>
  Array.from(scope.querySelectorAll(selector));

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


/* ---------------------------------------------------------
   2. CURRENT YEAR
   --------------------------------------------------------- */

const yearElement = $("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ---------------------------------------------------------
   3. MOBILE NAVIGATION
   --------------------------------------------------------- */

const menuToggle = $("[data-menu-toggle]");
const navigation = $("[data-navigation]");

function closeMenu() {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  $$("a", navigation).forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (
      navigation.classList.contains("is-open") &&
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) closeMenu();
  });
}


/* ---------------------------------------------------------
   4. HEADER SCROLL STATE
   --------------------------------------------------------- */

const siteHeader = $("[data-header]");

function updateHeader() {
  if (!siteHeader) return;

  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);


/* ---------------------------------------------------------
   5. ACTIVE NAVIGATION LINK
   --------------------------------------------------------- */

const navLinks = $$("[data-navigation] a[href^='#']");
const observedSections = navLinks
  .map((link) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return null;

    try {
      return $(href);
    } catch {
      return null;
    }
  })
  .filter(Boolean);

if ("IntersectionObserver" in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = `#${entry.target.id}`;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === sectionId;

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}


/* ---------------------------------------------------------
   6. SCROLL REVEAL ANIMATIONS
   --------------------------------------------------------- */

const revealElements = $$(
  "[data-reveal], .reveal, .reveal-up, .reveal-left, .reveal-right"
);

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
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
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element, index) => {
    element.style.setProperty(
      "--reveal-delay",
      `${Math.min(index % 5, 4) * 70}ms`
    );

    revealObserver.observe(element);
  });
}


/* ---------------------------------------------------------
   7. PROJECT FILTERS
   --------------------------------------------------------- */

const projectFilters = $$("[data-project-filter]");
const projectItems = $$("[data-project-category]");

function filterProjects(category) {
  projectItems.forEach((project) => {
    const projectCategory = project.dataset.projectCategory;
    const matches =
      category === "all" ||
      projectCategory === category ||
      (projectCategory || "")
        .split(/\s+/)
        .includes(category);

    project.hidden = !matches;
    project.setAttribute("aria-hidden", String(!matches));
  });
}

projectFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.projectFilter || "all";

    projectFilters.forEach((item) => {
      const selected = item === filter;

      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    filterProjects(category);
  });
});


/* ---------------------------------------------------------
   8. PROJECT LINK SAFETY
   Open external project links in a new tab only when
   the HTML explicitly requests it.
   --------------------------------------------------------- */

$$('a[target="_blank"]').forEach((link) => {
  const relTokens = new Set(
    (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean)
  );

  relTokens.add("noopener");
  relTokens.add("noreferrer");

  link.setAttribute("rel", Array.from(relTokens).join(" "));
});


/* ---------------------------------------------------------
   9. GITHUB PROFILE STATS
   Uses GitHub's public API. Stats are optional: the page
   remains usable if GitHub is unavailable or rate-limited.
   --------------------------------------------------------- */

const githubUsername = "myselfsneha";
const githubApiBase = `https://api.github.com/users/${githubUsername}`;

async function fetchGitHubProfile() {
  const response = await fetch(githubApiBase, {
    headers: {
      Accept: "application/vnd.github+json"
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  return response.json();
}

async function fetchGitHubRepositories() {
  const response = await fetch(
    `${githubApiBase}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json"
      }
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub repositories returned ${response.status}`);
  }

  return response.json();
}

function updateTextById(id, value) {
  const element = document.getElementById(id);

  if (element && value !== undefined && value !== null) {
    element.textContent = String(value);
  }
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(value);
}

async function loadGitHubStats() {
  const statsContainer = $("[data-github-stats]");

  if (!statsContainer) return;

  try {
    const [profile, repositories] = await Promise.all([
      fetchGitHubProfile(),
      fetchGitHubRepositories()
    ]);

    const totalStars = repositories.reduce(
      (sum, repository) => sum + (repository.stargazers_count || 0),
      0
    );

    const languages = new Set(
      repositories
        .map((repository) => repository.language)
        .filter(Boolean)
    );

    updateTextById("github-repos", formatNumber(profile.public_repos));
    updateTextById("github-followers", formatNumber(profile.followers));
    updateTextById("github-following", formatNumber(profile.following));
    updateTextById("github-stars", formatNumber(totalStars));
    updateTextById("github-languages", formatNumber(languages.size));

    statsContainer.classList.add("is-loaded");
    statsContainer.setAttribute("aria-busy", "false");
  } catch (error) {
    console.warn("GitHub stats could not be loaded:", error);

    statsContainer.classList.add("stats-unavailable");
    statsContainer.setAttribute("aria-busy", "false");

    const status = $("[data-github-status]");

    if (status) {
      status.textContent =
        "Live stats aren't available right now. Visit my GitHub profile to explore my work.";
    }
  }
}

loadGitHubStats();


/* ---------------------------------------------------------
   10. CONTACT FORM
   Front-end validation only. No message is sent unless
   a real form endpoint or mail service is configured.
   --------------------------------------------------------- */

const contactForm = $("[data-contact-form]");
const formStatus = $("[data-form-status]");

function showFormStatus(message, state = "info") {
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.dataset.state = state;
  formStatus.hidden = false;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      showFormStatus(
        "Please fill in your name, email, and message.",
        "error"
      );
      return;
    }

    if (!isValidEmail(email)) {
      showFormStatus("Please enter a valid email address.", "error");
      return;
    }

    /*
      This portfolio is static, so a working delivery service
      must be configured before the form can send messages.

      For now, prepare an email draft using the visitor's
      email application instead of pretending a message was sent.
    */

    const recipient = "snehasingh240903@gmail.com";
    const emailSubject = subject || `Portfolio enquiry from ${name}`;

    const emailBody = [
      `Hi Sneha,`,
      "",
      message,
      "",
      `From: ${name}`,
      `Reply to: ${email}`
    ].join("\n");

    const mailtoUrl = new URL(`mailto:${recipient}`);

    mailtoUrl.searchParams.set("subject", emailSubject);
    mailtoUrl.searchParams.set("body", emailBody);

    showFormStatus(
      "Opening your email app so you can review and send your message.",
      "success"
    );

    window.location.href = mailtoUrl.toString();
  });
}


/* ---------------------------------------------------------
   11. RESUME LINKS
   Ensure resume links point to the existing PDF filename.
   The HTML should supply the correct href.
   --------------------------------------------------------- */

$$("[data-resume-link]").forEach((link) => {
  link.setAttribute("download", "SnehaSinghCV.pdf");
});


/* ---------------------------------------------------------
   12. BACK-TO-TOP CONTROL
   Works with a button carrying data-back-to-top.
   --------------------------------------------------------- */

const backToTop = $("[data-back-to-top]");

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });

  const updateBackToTop = () => {
    backToTop.hidden = window.scrollY < 500;
  };

  updateBackToTop();

  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );
}


/* ---------------------------------------------------------
   13. COPY EMAIL BUTTON
   Optional: add data-copy-email to a button.
   --------------------------------------------------------- */

const copyEmailButton = $("[data-copy-email]");
const portfolioEmail = "snehasingh240903@gmail.com";

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(portfolioEmail);

      const originalText = copyEmailButton.textContent;
      copyEmailButton.textContent = "Email copied!";

      window.setTimeout(() => {
        copyEmailButton.textContent = originalText;
      }, 1800);
    } catch {
      window.location.href = `mailto:${portfolioEmail}`;
    }
  });
}


/* ---------------------------------------------------------
   14. CURRENT SECTION / PAGE READY
   --------------------------------------------------------- */

document.documentElement.classList.add("js-enabled");

window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});

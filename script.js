"use strict";

/* ================= CONFIGURATION ================= */

// Update these values for your GitHub account and email.
const GITHUB_USER = "mathapatiappayya88-dm";
const EMAIL_USER = "mathapatiappayya88";
const EMAIL_DOMAIN = "gmail.com";

const HIDE_REPOS = [
  GITHUB_USER + ".github.io",
  GITHUB_USER,
  "portfolio"
];

/* ================= CUSTOM PROJECT DETAILS ================= */

const CUSTOM = {
  "Sparsh-Vaani-Multi-Sensory-Medicine-Label-Reader-for-Differently-Abled-Patients": {
    title: "Sparsh-Vaani",
    desc: "Multi-sensory medicine label reader for differently-abled patients. Uses OCR to read medicine information and support accessible medicine identification.",
    tags: ["Raspberry Pi", "OCR", "Accessibility"]
  },

  "SMART-PILLCARE-IoT-Based-Automatic-Medicine-Dispenser-for-Elderly-People": {
    title: "Smart PillCare",
    desc: "IoT-based automatic medicine dispenser for elderly people, with reminders and notifications.",
    tags: ["ESP32", "IoT", "Healthcare"]
  },

  "AquaVision-Smart-Water-Quality-Monitoring-System": {
    title: "AquaVision",
    desc: "Smart water quality monitoring system using sensors and IoT-based monitoring.",
    tags: ["IoT", "Sensors", "Water Quality"]
  },

  "DISASTER-MANAGEMENT-ROBOT-": {
    title: "Disaster Management Robot",
    desc: "Robotic prototype designed to support monitoring and response in disaster scenarios.",
    tags: ["Robotics", "Embedded Systems"]
  },

  "BLUETOOTH-CONTROL-CAR": {
    title: "Bluetooth Control Car",
    desc: "Mobile robot controlled wirelessly over Bluetooth.",
    tags: ["Arduino", "Bluetooth", "Robotics"]
  }
};

/* ================= DOM ELEMENTS ================= */

const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

const repoBox = document.getElementById("repos");

const yearElement = document.getElementById("year");

const emailDisplay = document.getElementById("emailDisplay");

const showEmail = document.getElementById("showEmail");

const copyEmail = document.getElementById("copyEmail");

/* ================= FOOTER YEAR ================= */

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ================= DARK / LIGHT THEME ================= */

function getCurrentTheme() {
  const savedTheme = root.getAttribute("data-theme");

  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Switch to light theme"
        : "Switch to dark theme"
    );

    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

if (themeToggle) {
  // Apply the initial theme.
  applyTheme(getCurrentTheme());

  themeToggle.addEventListener("click", () => {
    const currentTheme = getCurrentTheme();

    const nextTheme = currentTheme === "dark"
      ? "light"
      : "dark";

    applyTheme(nextTheme);
  });
}

/* ================= MOBILE NAVIGATION ================= */

function closeMobileMenu() {
  if (!menuToggle || !navLinks) {
    return;
  }

  navLinks.classList.remove("open");

  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.setAttribute(
    "aria-label",
    "Open navigation menu"
  );
}

function openMobileMenu() {
  if (!menuToggle || !navLinks) {
    return;
  }

  navLinks.classList.add("open");

  menuToggle.setAttribute("aria-expanded", "true");

  menuToggle.setAttribute(
    "aria-label",
    "Close navigation menu"
  );
}

if (menuToggle && navLinks) {

  // Open or close the hamburger menu.
  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen =
      navLinks.classList.contains("open");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close the menu after choosing a navigation link.
  navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {
      closeMobileMenu();
    });

  });

  // Close the menu when clicking outside it.
  document.addEventListener("click", (event) => {

    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMobileMenu();
    }

  });

  // Close the menu when Escape is pressed.
  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMobileMenu();
      menuToggle.focus();
    }

  });

  // Restore normal desktop navigation after resizing.
  window.addEventListener("resize", () => {

    if (window.innerWidth > 1000) {
      closeMobileMenu();
    }

  });

}

/* ================= EMAIL FUNCTIONALITY ================= */

function emailAddress() {
  return `${EMAIL_USER}@${EMAIL_DOMAIN}`;
}

if (showEmail && emailDisplay && copyEmail) {

  showEmail.addEventListener("click", () => {

    const address = emailAddress();

    emailDisplay.replaceChildren();

    const link = document.createElement("a");

    link.href = `mailto:${address}`;

    link.textContent = address;

    emailDisplay.appendChild(link);

    emailDisplay.style.display = "block";

    showEmail.hidden = true;

    copyEmail.hidden = false;

  });

  copyEmail.addEventListener("click", async () => {

    const address = emailAddress();

    try {

      await navigator.clipboard.writeText(address);

      copyEmail.textContent = "Copied ✓";

    } catch (error) {

      // Fallback if clipboard access is unavailable.
      const selection = window.getSelection();

      const range = document.createRange();

      range.selectNodeContents(emailDisplay);

      selection.removeAllRanges();

      selection.addRange(range);

      copyEmail.textContent = "Select the email and copy it";

    }

  });

}

/* ================= HTML ESCAPING ================= */

function escapeHTML(value) {

  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));

}

function prettyName(name) {
  return name.replace(/[-_]+/g, " ").trim();
}

/* ================= PROJECT CARDS ================= */

function projectCard(repo, index) {

  const custom = CUSTOM[repo.name] || {};

  const title =
    custom.title || prettyName(repo.name);

  const description =
    custom.desc ||
    repo.description ||
    "Description coming soon. Add a description on GitHub to show it here.";

  const tags =
    custom.tags ||
    [
      repo.language,
      ...(repo.topics || []).slice(0, 3)
    ].filter(Boolean);

  const updated = repo.pushed_at
    ? new Date(repo.pushed_at).toLocaleDateString(
        "en-GB",
        {
          month: "short",
          year: "numeric"
        }
      )
    : "Date unavailable";

  return `
    <article class="card proj">

      <div class="num">
        ${String(index + 1).padStart(2, "0")}
      </div>

      <h3>${escapeHTML(title)}</h3>

      <p>${escapeHTML(description)}</p>

      <div class="tags">
        ${tags.map((tag) =>
          `<span>${escapeHTML(tag)}</span>`
        ).join("")}
      </div>

      <div class="meta">
        Updated ${escapeHTML(updated)}
      </div>

      <a
        href="${escapeHTML(repo.html_url)}"
        target="_blank"
        rel="noopener noreferrer">

        View GitHub ↗

      </a>

    </article>
  `;
}

/* ================= LOAD GITHUB PROJECTS ================= */

async function loadRepos() {

  if (!repoBox) {
    return;
  }

  try {

    const apiUrl =
      `https://api.github.com/users/${encodeURIComponent(GITHUB_USER)}/repos?per_page=100&sort=pushed`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `GitHub API returned ${response.status}`
      );
    }

    const allRepos = await response.json();

    const hidden = HIDE_REPOS.map((name) =>
      name.toLowerCase()
    );

    const repos = allRepos
      .filter((repo) =>
        !repo.fork &&
        !hidden.includes(repo.name.toLowerCase())
      )
      .sort((a, b) =>
        new Date(b.pushed_at) - new Date(a.pushed_at)
      );

    if (repos.length > 0) {

      repoBox.innerHTML = repos
        .map((repo, index) => projectCard(repo, index))
        .join("");

    } else {

      repoBox.innerHTML = `
        <p class="loading">
          No public projects found. Check your GitHub profile
          or repository visibility.
        </p>
      `;

    }

  } catch (error) {

    repoBox.innerHTML = `
      <p class="loading">
        Could not load projects automatically.
        <a
          href="https://github.com/${encodeURIComponent(GITHUB_USER)}"
          target="_blank"
          rel="noopener noreferrer">

          View projects on GitHub ↗

        </a>
      </p>
    `;

    console.error("GitHub project loading error:", error);

  }

}

loadRepos();
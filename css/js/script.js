/* =========================================================
   Beimnet Ashenafi - Portfolio JavaScript
   Features:
   1. Dynamic greeting (based on time of day)
   2. Dark/light mode toggle (saved in localStorage)
   3. Mobile navigation toggle
   4. Project filtering
   5. Contact form validation
   6. Auto-update footer year
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1. Dynamic greeting ---------- */
  const greetingEl = document.getElementById("greeting");
  const hour = new Date().getHours();
  let greeting = "Hello!";
  if (hour < 12) greeting = "Good morning!";
  else if (hour < 18) greeting = "Good afternoon!";
  else greeting = "Good evening!";
  if (greetingEl) greetingEl.textContent = greeting;

  /* ---------- 2. Dark mode toggle ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Load saved preference from browser storage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  /* ---------- 3. Mobile navigation ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const expanded = navLinks.classList.contains("open");
    navToggle.setAttribute("aria-expanded", expanded);
  });

  // Close menu when a link is clicked (mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 4. Project filtering ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button styling
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  /* ---------- 5. Contact form validation ---------- */
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successMsg = document.getElementById("formSuccess");

  // Simple email pattern check using Regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateForm() {
    let isValid = true;

    // Name validation
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Please enter your name (at least 2 characters).";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // Email validation
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Message validation
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      isValid = false;
    } else {
      messageError.textContent = "";
    }

    return isValid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop actual submission (since there is no backend)

    if (validateForm()) {
      successMsg.textContent = "✅ Thank you! Your message has been validated successfully.";
      form.reset();
      // Clear success message after 4 seconds
      setTimeout(() => { successMsg.textContent = ""; }, 4000);
    } else {
      successMsg.textContent = "";
    }
  });

  // Live validation as user types (better user experience)
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", validateForm);
  });

  /* ---------- 6. Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

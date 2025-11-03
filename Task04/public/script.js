// Client-side Routing
function loadPage(page) {
  const content = document.getElementById("content");

  if (page === "about") {
    fetch("/about")
      .then((res) => res.text())
      .then((html) => {
        content.innerHTML = html;
        window.history.pushState({}, "", "/about");
      });
  } else {
    window.location.href = "/";
  }
}

// Dynamic Email Validation
const emailInput = document.getElementById("email");
const emailFeedback = document.getElementById("emailFeedback");

if (emailInput) {
  emailInput.addEventListener("input", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      emailFeedback.textContent = "Invalid email format!";
    } else {
      emailFeedback.textContent = "";
    }
  });
}

// Password Strength Indicator
const passwordInput = document.getElementById("password");
const strengthDiv = document.getElementById("strength");

if (passwordInput) {
  passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    let strength = 0;

    if (/[a-z]/.test(value)) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if (/[@$!%*?&]/.test(value)) strength++;
    if (value.length >= 8) strength++;

    strengthDiv.innerHTML = "";
    for (let i = 0; i < 5; i++) {
      const bar = document.createElement("span");
      bar.style.backgroundColor = i < strength ? "#0d6efd" : "#ccc";
      strengthDiv.appendChild(bar);
    }
  });
}

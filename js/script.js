// typing Animation
var typed = new Typed(".typing", {
  strings: ["Software Engineer", "Full Stack Developer", "Java Programmer", "Web Developer", "Tech Enthusiast", "Web Designer", "UI/UX Designer", "Graphics Designer", "Freelancer"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
});

// Highlight active sidebar link on scroll and click
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".aside .nav li a");

// Scroll listener for active link
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Click listener to manually set active link
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(nav => nav.classList.remove("active"));
    this.classList.add("active");
  });
});

const projectDataUrl = 'https://66f3a95477b5e88970964664.mockapi.io/projects'; // Replace with your API or JSON file URL

async function fetchProjects() {
  try {
    const response = await fetch(projectDataUrl);
    const data = await response.json();
    displayProjects(data);
  } catch (err) {
    console.error("Failed to load projects:", err);
  }
}

function displayProjects(projects) {
  const container = document.getElementById("projects-container");
  container.innerHTML = '';

  projects.forEach(project => {
    const projectHTML = `
        <div class="portfolio-item">
          <div class="portfolio-item-inner shadow-dark">
            <div class="portfolio-img">
              <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
              <h4>${project.title}</h4>
              <p>${project.description}</p>
              <div class="project-links">
                <a href="${project.link}" target="_blank" class="btn">
                  Source Code <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="${project.web}" target="_blank" class="btn">
                  Demo <i class="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    container.insertAdjacentHTML('beforeend', projectHTML);
  });
}

fetchProjects();

const form = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const submitBtn = form.querySelector('button[type="submit"]');
let toastTimeout = null;

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  submitBtn.disabled = true;

  // Get form data as an object
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch('https://66f3a95477b5e88970964664.mockapi.io/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    showToast(response.ok ? 'Message sent!' : 'Failed to send message');
    if (response.ok) form.reset();
  } catch (error) {
    showToast('Error: ' + error.message);
  } finally {
    submitBtn.disabled = false;
  }
});

function showToast(message, duration = 3000) {
  if (!toast) return;
  toast.textContent = message;

  // Replace class toggle with direct style manipulations for slightly better performance
  toast.style.display = 'block';
  toast.style.opacity = 1;

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => (toast.style.display = 'none'), 300);
    toastTimeout = null;
  }, duration);
}

// Set date of birth here
const dob = new Date("2004-11-10");

function calculateAgeFromDOB(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

const age = calculateAgeFromDOB(dob);
document.getElementById("result").textContent = `${age} years old.`;

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
                  View Project <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="${project.web}" target="_blank" class="btn">
                  View Website <i class="fas fa-external-link-alt"></i>
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

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Get form data
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const subject = form.subject.value;
  const message = form.message.value;

  // Prepare payload
  const payload = {
    name: name,
    email: email,
    subject: subject,
    message: message
  };

  try {
    const response = await fetch('https://66f3a95477b5e88970964664.mockapi.io/contact', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      alert('Message sent!');
      form.reset();
    } else {
      alert('Failed to send message');
    }
  } catch (error) {
    alert('Error: ' + error);
  }
});
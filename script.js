// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none";
  }
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe feature cards and screenshots
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .screenshot"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Add loading animation for buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.href && this.href.includes("apps.apple.com")) {
      // Add loading state for App Store links
      const originalText = this.innerHTML;
      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Opening App Store...';
      this.style.pointerEvents = "none";

      // Reset after a delay
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.pointerEvents = "auto";
      }, 2000);
    }
  });
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
  }
});

// Add device status animation
function animateDeviceStatus() {
  const deviceCards = document.querySelectorAll(".device-card");
  deviceCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animation = "pulse 2s infinite";
    }, index * 200);
  });
}

// Start device animation after a delay
setTimeout(animateDeviceStatus, 1000);

// Add CSS for pulse animation
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

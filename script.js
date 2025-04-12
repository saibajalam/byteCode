document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active")

      // Toggle hamburger to X
      const spans = this.querySelectorAll("span")
      if (navLinks.classList.contains("active")) {
        spans[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (navLinks && navLinks.classList.contains("active") && !event.target.closest("nav")) {
      navLinks.classList.remove("active")

      // Reset hamburger icon
      const spans = document.querySelectorAll(".mobile-menu-btn span")
      spans.forEach((span) => {
        span.style.transform = "none"
        span.style.opacity = "1"
      })
    }
  })

  // Contact form validation
  const contactForm = document.getElementById("contactForm")
  const formSuccess = document.getElementById("formSuccess")

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()

      // Reset error messages
      const errorMessages = document.querySelectorAll(".error-message")
      errorMessages.forEach((message) => {
        message.style.display = "none"
      })

      let isValid = true

      // Validate name
      const nameInput = document.getElementById("name")
      if (!nameInput.value.trim()) {
        document.getElementById("nameError").textContent = "Please enter your name"
        document.getElementById("nameError").style.display = "block"
        isValid = false
      }

      // Validate email
      const emailInput = document.getElementById("email")
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailInput.value.trim()) {
        document.getElementById("emailError").textContent = "Please enter your email"
        document.getElementById("emailError").style.display = "block"
        isValid = false
      } else if (!emailRegex.test(emailInput.value.trim())) {
        document.getElementById("emailError").textContent = "Please enter a valid email address"
        document.getElementById("emailError").style.display = "block"
        isValid = false
      }

      // Validate subject
      const subjectInput = document.getElementById("subject")
      if (!subjectInput.value.trim()) {
        document.getElementById("subjectError").textContent = "Please enter a subject"
        document.getElementById("subjectError").style.display = "block"
        isValid = false
      }

      // Validate message
      const messageInput = document.getElementById("message")
      if (!messageInput.value.trim()) {
        document.getElementById("messageError").textContent = "Please enter your message"
        document.getElementById("messageError").style.display = "block"
        isValid = false
      }

      // If form is valid, show success message
      if (isValid) {
        contactForm.reset()
        formSuccess.style.display = "block"

        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.style.display = "none"
        }, 5000)
      }
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".feature-card, .service-card, .team-member, .process-step")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animated elements
  const elementsToAnimate = document.querySelectorAll(".feature-card, .service-card, .team-member, .process-step")
  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Run animation on page load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)
})

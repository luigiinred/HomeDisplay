// Form handler for GitHub Pages
// This works with form services like Formspree, Netlify Forms, or similar

class FormHandler {
  constructor() {
    this.formEndpoint = "https://formspree.io/f/YOUR_FORM_ID"; // Replace with your Formspree endpoint
    this.init();
  }

  init() {
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", this.handleSubmit.bind(this));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector(".btn-submit");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    // Show loading state
    this.setLoadingState(submitBtn, true);
    this.hideMessages();

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Validate form data
      if (!this.validateForm(data)) {
        throw new Error("Please fill in all required fields");
      }

      // Send to form service
      const response = await this.submitToFormService(data);

      if (response.ok) {
        this.showSuccess(successMessage);
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      this.showError(errorMessage, error.message);
    } finally {
      this.setLoadingState(submitBtn, false);
    }
  }

  validateForm(data) {
    const requiredFields = ["name", "email", "subject", "message"];
    return requiredFields.every(
      (field) => data[field] && data[field].trim() !== ""
    );
  }

  async submitToFormService(data) {
    // Option 1: Formspree
    return await fetch(this.formEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Option 2: Netlify Forms (uncomment if using Netlify)
    /*
        return await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'form-name': 'contact',
                ...data
            })
        });
        */
  }

  setLoadingState(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
      button.disabled = false;
      button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  }

  hideMessages() {
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");
    if (successMessage) successMessage.style.display = "none";
    if (errorMessage) errorMessage.style.display = "none";
  }

  showSuccess(element) {
    if (element) {
      element.style.display = "block";
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  showError(element, message) {
    if (element) {
      element.style.display = "block";
      // Update error message if needed
      const errorText = element.querySelector("p");
      if (errorText) {
        errorText.textContent = message;
      }
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

// Alternative: Simple fetch-based form handler for any backend
class SimpleFormHandler {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.init();
  }

  init() {
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", this.handleSubmit.bind(this));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector(".btn-submit");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    this.setLoadingState(submitBtn, true);
    this.hideMessages();

    try {
      const formData = new FormData(form);

      const response = await fetch(this.endpoint, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        this.showSuccess(successMessage);
        form.reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      this.showError(errorMessage, error.message);
    } finally {
      this.setLoadingState(submitBtn, false);
    }
  }

  setLoadingState(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
      button.disabled = false;
      button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  }

  hideMessages() {
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");
    if (successMessage) successMessage.style.display = "none";
    if (errorMessage) errorMessage.style.display = "none";
  }

  showSuccess(element) {
    if (element) {
      element.style.display = "block";
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  showError(element, message) {
    if (element) {
      element.style.display = "block";
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

// Initialize form handler when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Choose one of the following options:
  // Option 1: Formspree (recommended for GitHub Pages)
  // new FormHandler();
  // Option 2: Custom backend endpoint
  // new SimpleFormHandler('/api/contact');
  // Option 3: Netlify Forms (if using Netlify)
  // The form will work automatically with Netlify if you add netlify attribute
});

// Export for use in other scripts
window.FormHandler = FormHandler;
window.SimpleFormHandler = SimpleFormHandler;

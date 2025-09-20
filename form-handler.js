// Form handler for GitHub Pages
// This works with Google Forms, Formspree, Netlify Forms, or similar

class FormHandler {
  constructor() {
    this.googleFormEndpoint =
      "https://docs.google.com/forms/d/1WlPDCiHEoCAeGW7--GJgXXrnAMblwNIBMUef5II3LtY/formResponse";
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
    // Option 1: Google Forms
    const formData = new FormData();

    // Map form fields to Google Form field names
    // You may need to adjust these field names based on your actual Google Form
    formData.append("entry.1234567890", data.name); // Replace with actual field ID
    formData.append("entry.1234567891", data.email); // Replace with actual field ID
    formData.append("entry.1234567892", data.subject); // Replace with actual field ID
    formData.append("entry.1234567893", data.message); // Replace with actual field ID

    return await fetch(this.googleFormEndpoint, {
      method: "POST",
      mode: "no-cors", // Required for Google Forms
      body: formData,
    });

    // Option 2: Formspree (uncomment if using Formspree)
    /*
    return await fetch(this.formEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    */

    // Option 3: Netlify Forms (uncomment if using Netlify)
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

// Email handler for opening email client
class EmailHandler {
  constructor() {
    this.supportEmail = "support@homedisplay.app";
    this.init();
  }

  init() {
    // Add click handlers for email links
    document.querySelectorAll(".email-support").forEach((link) => {
      link.addEventListener("click", this.openEmailClient.bind(this));
    });
  }

  openEmailClient(e) {
    e.preventDefault();
    const subject = encodeURIComponent("Home Display Support Request");
    const body = encodeURIComponent(`Hello,

I need help with Home Display. Please provide details about your issue below:

Issue Description:
[Please describe your problem or question here]

Device Information:
- Device: [Your device model]
- iOS Version: [Your iOS version]
- App Version: [Your app version]

Thank you for your help!

Best regards,
[Your name]`);

    const mailtoLink = `mailto:${this.supportEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  }
}

// Export for use in other scripts
window.FormHandler = FormHandler;
window.SimpleFormHandler = SimpleFormHandler;
window.EmailHandler = EmailHandler;

# Aerial Picture Frame - Marketing Website

A beautiful, responsive marketing website for the Aerial Picture Frame iOS app. This site showcases the app's features, provides support resources, and includes a contact form for user inquiries and feature requests.

## 🚀 Features

- **Modern Landing Page** - Hero section, features showcase, and app store links
- **Privacy Policy** - Comprehensive privacy policy page
- **Support Center** - FAQ section and contact form for user support
- **Terms of Service** - Complete terms and conditions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Contact Form** - Integrated form handling with multiple backend options
- **GitHub Pages Ready** - Configured for easy deployment

## 📱 About Aerial Picture Frame

Aerial Picture Frame combines the beauty of a digital picture frame with the intelligence of a smart home dashboard. Display your favorite memories while staying organized with your calendar, weather, and essential information.

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript** - Interactive features and form handling
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter)

## 🚀 Deployment Options

### Option 1: GitHub Pages (Recommended)

1. **Enable GitHub Pages:**

   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

2. **Deploy:**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Access your site:**
   - Your site will be available at: `https://yourusername.github.io/aerial-picture-frame`

### Option 2: Netlify

1. **Connect your repository:**

   - Sign up at [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Deploy automatically

2. **Custom domain (optional):**
   - Add your custom domain in Netlify settings

### Option 3: Vercel

1. **Deploy with Vercel:**
   ```bash
   npm i -g vercel
   vercel
   ```

## 📧 Contact Form Setup

The contact form supports multiple backend options:

### Option 1: Formspree (Recommended for GitHub Pages)

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form
3. Update `form-handler.js` with your Formspree endpoint:
   ```javascript
   this.formEndpoint = "https://formspree.io/f/YOUR_FORM_ID";
   ```
4. Uncomment the FormHandler initialization in `support.html`

### Option 2: Netlify Forms

1. Add `netlify` attribute to your form:
   ```html
   <form name="contact" method="POST" data-netlify="true"></form>
   ```
2. Deploy to Netlify - forms work automatically

### Option 3: Custom Backend

1. Set up your own backend endpoint
2. Update the form handler to point to your API
3. Implement server-side form processing

## 🎨 Customization

### Colors and Branding

Update the CSS variables in `styles.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #667eea;
  --accent-color: #764ba2;
}
```

### App Store Links

Update the App Store links in `index.html`:

```html
<a href="https://apps.apple.com/app/your-app-id" class="btn btn-primary"></a>
```

### Content Updates

- **Landing Page:** Edit `index.html`
- **Privacy Policy:** Edit `privacy.html`
- **Support Page:** Edit `support.html`
- **Terms of Service:** Edit `terms.html`

## 📁 File Structure

```
aerial-picture-frame/
├── index.html              # Main landing page
├── privacy.html            # Privacy policy
├── support.html            # Support page with contact form
├── terms.html              # Terms of service
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript
├── form-handler.js         # Form handling logic
├── form-handler.php        # PHP form handler (for servers with PHP)
├── _config.yml             # Jekyll configuration
├── .github/workflows/      # GitHub Actions
└── README.md               # This file
```

## 🔧 Development

### Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/aerial-picture-frame.git
   cd aerial-picture-frame
   ```

2. **Serve locally:**

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

### Making Changes

1. Edit the relevant HTML/CSS/JS files
2. Test locally
3. Commit and push changes
4. GitHub Pages will automatically redeploy

## 📱 Mobile Optimization

The site is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security

- No sensitive data is stored client-side
- Form submissions are handled securely
- HTTPS enforced on GitHub Pages
- Privacy-first approach

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions about this website template or Aerial Picture Frame app:

- **Email:** support@aerialpictureframe.app
- **Website:** [aerialpictureframe.app](https://aerialpictureframe.app)
- **GitHub Issues:** [Create an issue](https://github.com/yourusername/aerial-picture-frame/issues)

---

**Made with ❤️ for Aerial Picture Frame**

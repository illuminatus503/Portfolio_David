# David Fernández-Cuenca Portfolio - React Version

A modern, professional portfolio built with React for David Fernández-Cuenca Marcos, Software Engineer specialized in air traffic control systems.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and modern JavaScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Bilingual Support**: Spanish and English with automatic language detection
- **Dark/Light Theme**: Theme toggle with system preference detection
- **Dynamic Content**: GitHub API integration for real-time project data
- **Interactive UI**: Smooth animations and hover effects
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Cards
- **Accessibility**: ARIA labels and keyboard navigation
- **PWA Ready**: Progressive Web App features

## 🛠️ Tech Stack

- **Frontend**: React 18, Babel (standalone)
- **Styling**: Tailwind CSS
- **Icons**: Emoji icons for simplicity
- **Fonts**: Inter & Poppins (Google Fonts)
- **Deployment**: Vercel-ready configuration

## 📁 Project Structure

```
portfolio-react/
├── index.html              # Main HTML file
├── src/
│   ├── App.jsx             # Main React app
│   └── components/         # React components
│       ├── Navbar.jsx      # Navigation component
│       ├── Hero.jsx        # Hero section
│       ├── About.jsx       # About section
│       ├── Skills.jsx      # Skills section
│       ├── Projects.jsx    # Projects section
│       ├── Contact.jsx     # Contact section
│       └── Footer.jsx      # Footer component
├── package.json            # Dependencies and scripts
├── vercel.json            # Vercel configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (for development)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-react
   ```

2. **Install dependencies** (optional, for development)
   ```bash
   npm install
   ```

3. **Run locally**
   ```bash
   npm run dev
   # or
   npx serve . -p 3000
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the configuration
   - Deploy with one click

### Manual Build

```bash
npm run build
```

## 🎨 Customization

### Colors
Edit the Tailwind config in `index.html`:
```javascript
colors: {
  primary: '#0d0d0d',    // Background
  secondary: '#1f1f1f',  // Cards
  accent: '#6366f1',     // Primary accent
  textLight: '#f3f4f6',  // Light text
  textMuted: '#9ca3af'   // Muted text
}
```

### Content
- Update personal information in each component
- Modify translations in component files
- Replace GitHub username in `Projects.jsx`

### Styling
- Modify Tailwind classes in components
- Add custom CSS in the `<style>` tag in `index.html`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Internationalization

Supports Spanish and English with:
- Automatic language detection
- Manual language toggle
- Persistent language preference

## 🎯 Performance

- **Lazy loading**: Images and components
- **CDN resources**: React, Tailwind CSS
- **Optimized fonts**: Google Fonts with preload
- **Minimal dependencies**: No build step required

## 🔧 Development

### Adding New Components

1. Create component file in `src/components/`
2. Add component script to `index.html`
3. Import and use in `App.jsx`

### Adding New Features

- Follow React best practices
- Use the existing context for state management
- Maintain responsive design principles
- Add translations for new text

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**David Fernández-Cuenca Marcos**
- Software Engineer at Indra
- Specialized in air traffic control systems
- 10+ years of experience in backend development

---

Built with ❤️ using React and Tailwind CSS 
# David Fernández-Cuenca Portfolio

A modern, responsive portfolio website built with React, Tailwind CSS, and TypeScript. Features dark/light mode, internationalization, and PWA capabilities.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Deployment](#-deployment)
- [Customization](#-customization)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

## ✨ Features

### Core Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Mode**: Theme switching with system preference detection
- **Internationalization**: Spanish and English language support
- **PWA Ready**: Progressive Web App capabilities
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Accessibility**: WCAG AA compliant with keyboard navigation

### Technical Features
- **React 18**: Modern React with hooks and context
- **Tailwind CSS**: Utility-first styling with custom design system
- **TypeScript**: Type safety and better development experience
- **Vercel Ready**: Optimized for Vercel deployment
- **Performance**: Optimized loading and rendering
- **Analytics**: Google Analytics integration

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling framework
- **TypeScript** - Type safety
- **Babel** - JSX compilation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Deployment
- **Vercel** - Hosting platform
- **GitHub** - Version control

## 📁 Project Structure

```
Portfolio_David/
├── 📄 README.md                 # Main documentation
├── 📄 env.example               # Environment variables template
├── 📄 index.html                # Entry point
├── 📄 package.json              # Dependencies and scripts
├── 📄 tailwind.config.js        # Tailwind configuration
├── 📄 postcss.config.js         # PostCSS configuration
├── 📄 vercel.json               # Vercel deployment config
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 .eslintrc.json            # ESLint configuration
├── 📄 .prettierrc               # Prettier configuration
├── 📄 .gitignore                # Git ignore rules
├── 📄 site.webmanifest          # PWA manifest
│
├── 📁 api/                      # Vercel Functions
│   └── 📄 contact.js            # Contact form API
│
├── 📁 src/                      # Source code
│   ├── 📄 globals.css           # Global styles and Tailwind
│   ├── 📄 App.jsx               # Main React component
│   ├── 📄 types.d.ts            # TypeScript definitions
│   ├── 📄 analytics.js          # Analytics utilities
│   │
│   ├── 📁 components/           # React components
│   │   ├── 📄 Navbar.jsx        # Navigation component
│   │   ├── 📄 Hero.jsx          # Hero section
│   │   ├── 📄 About.jsx         # About section
│   │   ├── 📄 Skills.jsx        # Skills section
│   │   ├── 📄 Projects.jsx      # Projects section
│   │   ├── 📄 Contact.jsx       # Contact section
│   │   └── 📄 Footer.jsx        # Footer component
│   │
│   ├── 📁 i18n/                 # Internationalization
│   │   ├── 📄 index.js          # i18n configuration
│   │   ├── 📄 i18n.js           # Core i18n system
│   │   ├── 📄 useTranslation.js # React hook
│   │   └── 📁 locales/          # Translation files
│   │       ├── 📄 en.js         # English translations
│   │       └── 📄 es.js         # Spanish translations
│   │
│   └── 📁 services/             # API services
│       ├── 📄 contactService.js # Contact form service
│       └── 📄 gmailService.js   # Gmail integration
│
├── 📁 assets/                   # Static assets
│   ├── 📄 favicon.ico           # Favicon
│   ├── 📄 favicon.svg           # SVG favicon
│   └── 📄 README.md             # Assets documentation
│
├── 📁 docs/                     # Documentation
│   ├── 📁 setup/                # Setup guides
│   │   ├── 📄 VERCEL_GMAIL_SETUP.md
│   │   ├── 📄 THEME_GUIDE.md
│   │   └── 📄 I18N_MIGRATION_SUMMARY.md
│   ├── 📁 development/          # Development docs
│   └── 📁 summaries/            # Project summaries
│
└── 📁 tests/                    # Test files
    ├── 📄 contact-form.test.js  # Contact form tests
    └── 📄 test-favicon.html     # Favicon testing
```
│   │
│   └── 📁 services/             # API services
│       └── 📄 contactService.js # Contact form API service
│
├── 📁 assets/                   # Static assets
│   ├── 📄 README.md             # Assets documentation
│   ├── 📄 favicon.svg           # Robot favicon
│   ├── 📄 favicon-simple.svg    # Simple version
│   ├── 📄 favicon.ico           # Traditional favicon
│   ├── 📄 favicon-16x16.png     # 16x16 PNG favicon
│   ├── 📄 favicon-32x32.png     # 32x32 PNG favicon
│   ├── 📄 apple-touch-icon.png  # iOS touch icon
│   ├── 📄 android-chrome-192x192.png # Android icon
│   └── 📄 android-chrome-512x512.png # PWA icon
│
└── 📁 dist/                     # Build output
    └── 📄 output.css            # Compiled CSS
```

## 🚀 Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
```bash
# Clone repository
git clone <repository-url>
cd portfolio-react

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server with CSS build
npm run build        # Build for production
npm run build:css    # Build CSS only
npm run watch:css    # Watch CSS changes
npm run start        # Start production server
npm run preview      # Preview production build
npm run lint         # Lint code
npm run type-check   # TypeScript type checking
npm run format       # Format code
```

### Development Workflow
1. **Start Development**: `npm run dev`
2. **Edit Components**: Modify files in `src/components/`
3. **Update Styles**: Edit `src/globals.css` or use Tailwind classes
4. **Test Changes**: Browser will auto-reload
5. **Build**: `npm run build` for production

## 🚀 Deployment

### Vercel Deployment
The project is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repository for automatic deployments
```

### Manual Deployment
```bash
# Build project
npm run build

# Deploy dist/ folder to your hosting provider
```

### Environment Variables
No environment variables required for basic functionality.

### Contact Form
The contact form is fully functional with the following features:
- **Client-side validation** with real-time feedback
- **Internationalization** support (Spanish/English)
- **Error handling** for network and server errors
- **Rate limiting** protection
- **Accessibility** compliant with ARIA attributes
- **Responsive design** for all devices

#### Backend Integration
The form is prepared for backend integration:
- **API service** in `src/services/contactService.js`
- **Backend examples** in `BACKEND_INTEGRATION.md`
- **Test suite** in `tests/contact-form.test.js`
- **Environment configuration** in `env.example`

To integrate with a real backend:
1. Set up your API endpoint
2. Update `REACT_APP_CONTACT_API` in environment variables
3. Replace the simulation in `Contact.jsx`
4. Test the integration

## 🎨 Customization

### Colors and Theme
Edit `tailwind.config.js` to customize:
- Color palette
- Typography
- Spacing
- Animations

### Content
Update component files in `src/components/`:
- Personal information
- Projects
- Skills
- Contact details

### Styling
Modify `src/globals.css` for:
- Custom CSS
- Component styles
- Utility classes

### Favicon
Replace files in `assets/` directory:
- `favicon.svg` - Main favicon
- `favicon-simple.svg` - Simple version
- PNG variants for different sizes

## 📚 Documentation

### Setup Guides
- **[Gmail Setup](./docs/setup/VERCEL_GMAIL_SETUP.md)** - Configure Gmail with Vercel Functions
- **[Theme Guide](./docs/setup/THEME_GUIDE.md)** - Theme system documentation
- **[i18n Migration](./docs/setup/I18N_MIGRATION_SUMMARY.md)** - Internationalization setup

### Environment Variables
Copy `env.example` to `.env` and configure:
- `GMAIL_USER` - Your Gmail email
- `GMAIL_APP_PASSWORD` - Gmail App Password (16 characters)
- `RECIPIENT_EMAIL` - Email to receive contact form messages (optional)
- `GA_MEASUREMENT_ID` - Google Analytics ID (optional)

### Key Features
- **Theme System**: Dark/light mode with CSS variables
- **Component Architecture**: Modular React components
- **Styling Strategy**: Tailwind CSS with custom components
- **Internationalization**: Multi-language support
- **PWA Features**: Service worker and manifest

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Code Standards
- Follow ESLint rules
- Use Prettier for formatting
- Write TypeScript for type safety
- Add comments for complex logic
- Update documentation as needed

### Testing
- Test in multiple browsers
- Verify responsive design
- Check accessibility
- Validate performance

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 👨‍💻 Author

**David Fernández-Cuenca Marcos**
- Software Engineer specializing in air traffic control systems
- 10+ years of experience in backend development
- Expert in Python, Ada, C, and critical systems

## 🔗 Links

- **Portfolio**: [david-fernandez-cuenca.com](https://david-fernandez-cuenca.com)
- **GitHub**: [@illuminatus503](https://github.com/illuminatus503)
- **LinkedIn**: [David Fernández-Cuenca](https://linkedin.com/in/david-fernandez-cuenca)

---

**Built with ❤️ using React, Tailwind CSS, and TypeScript** 
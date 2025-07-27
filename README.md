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
portfolio-react/
├── 📄 README.md                 # Main documentation
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
├── 📄 THEME_GUIDE.md            # Theme system documentation
├── 📄 test-favicon.html         # Favicon testing page
│
├── 📁 src/                      # Source code
│   ├── 📄 globals.css           # Global styles and Tailwind
│   ├── 📄 App.jsx               # Main React component
│   ├── 📄 types.d.ts            # TypeScript definitions
│   ├── 📄 analytics.js          # Analytics utilities
│   ├── 📄 README.md             # Source code documentation
│   │
│   └── 📁 components/           # React components
│       ├── 📄 Navbar.jsx        # Navigation component
│       ├── 📄 Hero.jsx          # Hero section
│       ├── 📄 About.jsx         # About section
│       ├── 📄 Skills.jsx        # Skills section
│       ├── 📄 Projects.jsx      # Projects section
│       ├── 📄 Contact.jsx       # Contact section
│       └── 📄 Footer.jsx        # Footer component
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

### Documentation Hub
- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Complete documentation index
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Technical development guide

### Core Documentation
- **[README.md](./README.md)** - Main project documentation
- **[THEME_GUIDE.md](./THEME_GUIDE.md)** - Theme system guide
- **[src/README.md](./src/README.md)** - Source code documentation
- **[assets/README.md](./assets/README.md)** - Assets documentation

### Key Concepts
- **Theme System**: Dark/light mode with CSS variables
- **Component Architecture**: Modular React components
- **Styling Strategy**: Tailwind CSS with custom components
- **Internationalization**: Multi-language support
- **PWA Features**: Service worker and manifest

### Development Guidelines
- **Code Style**: ESLint + Prettier configuration
- **Type Safety**: TypeScript for better development
- **Performance**: Optimized builds and lazy loading
- **Accessibility**: WCAG AA compliance
- **SEO**: Meta tags and structured data

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
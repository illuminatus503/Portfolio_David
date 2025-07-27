# Development Guide

Technical documentation for developers working on David Fernández-Cuenca's portfolio.

## 🏗 Architecture Overview

### Technology Stack
- **Frontend**: React 18 with JSX
- **Styling**: Tailwind CSS with custom design system
- **Build**: PostCSS + Autoprefixer
- **Deployment**: Vercel with static hosting
- **Development**: CDN-based React (no bundler required)

### Project Structure
```
portfolio-react/
├── 📄 index.html              # Entry point with React CDN
├── 📄 src/                    # Source code
│   ├── 📄 App.jsx            # Main React component
│   ├── 📄 globals.css        # Global styles
│   └── 📁 components/        # React components
├── 📄 dist/                  # Build output
│   └── 📄 output.css         # Compiled CSS
└── 📄 assets/                # Static assets
```

## 🧩 Component Architecture

### React Context Pattern
```jsx
// Global state management
const AppContext = createContext();

function App() {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const contextValue = {
    theme, setTheme,
    language, setLanguage,
    mobileMenuOpen, setMobileMenuOpen
  };

  return (
    <AppContext.Provider value={contextValue}>
      {/* Child components */}
    </AppContext.Provider>
  );
}
```

### Component Structure
```jsx
// Standard component pattern
function ComponentName() {
  const { theme, language } = useAppContext();
  
  // Translations
  const translations = {
    es: { title: 'Título', description: 'Descripción' },
    en: { title: 'Title', description: 'Description' }
  };
  
  const t = translations[language];
  
  // Theme-aware styling
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };
  
  return (
    <section className={getThemeClasses(
      'section-classes',
      'dark-theme-classes',
      'light-theme-classes'
    )}>
      <h2>{t.title}</h2>
      <p>{t.description}</p>
    </section>
  );
}
```

## 🎨 Styling System

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ffffff',
          dark: '#0d0d0d',
        },
        secondary: {
          light: '#f3f4f6',
          dark: '#1f1f1f',
        },
        accent: {
          DEFAULT: '#6366f1',
          // ... accent shades
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
}
```

### CSS Architecture
```css
/* src/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* CSS Variables for theming */
:root {
  --color-primary-light: #ffffff;
  --color-primary-dark: #0d0d0d;
  /* ... more variables */
}

/* Theme classes */
.dark { /* dark theme variables */ }
.light { /* light theme variables */ }

/* Base styles */
@layer base {
  body {
    @apply bg-gray-900 text-white antialiased;
  }
}

/* Component styles */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-6 py-3 rounded-lg;
  }
  
  .card {
    @apply bg-gray-800 rounded-lg shadow-md;
  }
}
```

## 🔧 Development Workflow

### Setup
```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Watch CSS changes
npm run watch:css
```

### Code Quality
```bash
# Lint code
npm run lint

# Type check
npm run type-check

# Format code
npm run format
```

### File Organization
1. **Components**: One file per component in `src/components/`
2. **Styles**: Global styles in `src/globals.css`
3. **Types**: TypeScript definitions in `src/types.d.ts`
4. **Assets**: Static files in `assets/`

## 🎯 Key Patterns

### Theme Management
```jsx
// Theme initialization
useEffect(() => {
  const savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
  } else {
    setTheme(savedTheme);
  }
}, []);

// Theme application
useEffect(() => {
  const html = document.documentElement;
  html.classList.remove('dark', 'light');
  html.classList.add(theme);
  localStorage.setItem('theme', theme);
}, [theme]);
```

### Internationalization
```jsx
// Translation pattern
const translations = {
  es: {
    title: 'Título en Español',
    description: 'Descripción en Español'
  },
  en: {
    title: 'Title in English',
    description: 'Description in English'
  }
};

const t = translations[language];
```

### Responsive Design
```jsx
// Mobile-first approach
<div className="
  w-full                    /* Mobile: full width */
  md:w-1/2                  /* Tablet: half width */
  lg:w-1/3                  /* Desktop: third width */
  p-4                       /* Mobile: small padding */
  md:p-6                    /* Tablet: medium padding */
  lg:p-8                    /* Desktop: large padding */
">
```

## 🚀 Performance Optimization

### CSS Optimization
- **PurgeCSS**: Tailwind removes unused styles
- **Minification**: PostCSS minifies output
- **Critical CSS**: Inline critical styles

### JavaScript Optimization
- **CDN Loading**: React loaded from CDN
- **Lazy Loading**: Components load when needed
- **Minimal Dependencies**: No heavy frameworks

### Asset Optimization
- **SVG Favicons**: Scalable vector graphics
- **Image Compression**: Optimized PNG files
- **Caching**: Proper cache headers

## 🧪 Testing Strategy

### Manual Testing
1. **Theme Switching**: Verify dark/light mode
2. **Responsive Design**: Test all breakpoints
3. **Accessibility**: Screen reader compatibility
4. **Cross-browser**: Chrome, Firefox, Safari, Edge

### Automated Testing
```javascript
// Example test structure
describe('Theme System', () => {
  test('switches between themes', () => {
    // Test theme switching
  });
  
  test('persists theme preference', () => {
    // Test localStorage
  });
});
```

## 🔧 Configuration Files

### ESLint Configuration
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  }
}
```

### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

## 🚀 Deployment

### Vercel Configuration
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": ".",
        "buildCommand": "npm run build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### Build Process
1. **CSS Compilation**: Tailwind → PostCSS → Minified CSS
2. **Asset Optimization**: Images and favicons
3. **Static Generation**: HTML with embedded scripts
4. **Deployment**: Vercel static hosting

## 🔍 Debugging

### Common Issues
1. **Theme not switching**: Check localStorage and class application
2. **CSS not loading**: Verify build process and file paths
3. **Component not rendering**: Check script loading order
4. **Performance issues**: Monitor bundle size and loading times

### Debug Tools
```javascript
// Theme debugging
console.log('Theme:', theme);
console.log('HTML classes:', document.documentElement.className);
console.log('localStorage:', localStorage.getItem('theme'));

// Component debugging
console.log('Context value:', contextValue);
console.log('Translations:', translations);
```

## 📚 Best Practices

### Code Organization
- **Single Responsibility**: Each component has one purpose
- **Consistent Naming**: Use descriptive, consistent names
- **Modular Structure**: Keep components small and focused
- **Clear Interfaces**: Well-defined props and context

### Performance
- **Minimal Re-renders**: Use React.memo and useCallback
- **Efficient Styling**: Prefer Tailwind utilities over custom CSS
- **Optimized Assets**: Compress images and minimize file sizes
- **Caching Strategy**: Implement proper cache headers

### Accessibility
- **Semantic HTML**: Use proper HTML elements
- **ARIA Labels**: Provide screen reader support
- **Keyboard Navigation**: Ensure all interactions work with keyboard
- **Color Contrast**: Meet WCAG AA standards

### Security
- **Content Security Policy**: Implement CSP headers
- **Input Validation**: Validate all user inputs
- **HTTPS**: Use secure connections
- **Dependencies**: Keep dependencies updated

## 🔄 Maintenance

### Regular Tasks
- **Update Dependencies**: Keep packages current
- **Performance Monitoring**: Track loading times
- **Security Audits**: Check for vulnerabilities
- **Content Updates**: Keep portfolio information current

### Monitoring
- **Analytics**: Track user interactions
- **Error Tracking**: Monitor for JavaScript errors
- **Performance**: Monitor Core Web Vitals
- **Accessibility**: Regular accessibility audits 
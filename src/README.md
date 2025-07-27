# Source Code Documentation

This directory contains the main source code for David Fernández-Cuenca's portfolio website.

## 📁 File Structure

```
src/
├── 📄 globals.css          # Global styles and Tailwind CSS
├── 📄 App.jsx              # Main React application component
├── 📄 types.d.ts           # TypeScript type definitions
├── 📄 analytics.js         # Google Analytics utilities
├── 📄 README.md            # This file
│
└── 📁 components/          # React components
    ├── 📄 Navbar.jsx       # Navigation bar with theme toggle
    ├── 📄 Hero.jsx         # Hero section with introduction
    ├── 📄 About.jsx        # About section with background
    ├── 📄 Skills.jsx       # Skills and technologies section
    ├── 📄 Projects.jsx     # Projects showcase with GitHub API
    ├── 📄 Contact.jsx      # Contact form and information
    └── 📄 Footer.jsx       # Footer with social links
```

## 🎯 Core Files

### `App.jsx` - Main Application Component
- **Purpose**: Root component that manages global state
- **Features**: 
  - Theme management (dark/light mode)
  - Language switching (ES/EN)
  - Mobile menu state
  - Context provider for child components
- **Key Functions**:
  - `useEffect` for theme initialization
  - `useEffect` for theme application to DOM
  - Context value management

### `globals.css` - Global Styles
- **Purpose**: Centralized styling with Tailwind CSS
- **Features**:
  - Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
  - CSS custom properties for theming
  - Component styles (buttons, cards, forms)
  - Utility classes and animations
  - Responsive design utilities
  - Accessibility features

### `types.d.ts` - TypeScript Definitions
- **Purpose**: Type definitions for better development experience
- **Includes**:
  - Context interfaces
  - Component props types
  - API response types
  - Global window extensions

### `analytics.js` - Analytics Utilities
- **Purpose**: Google Analytics integration
- **Functions**:
  - Page view tracking
  - Custom event tracking
  - Form submission tracking
  - External link tracking

## 🧩 Component Architecture

### Component Structure
Each component follows a consistent pattern:
```jsx
// Component imports
import React from 'react';
import { useAppContext } from './App.jsx';

// Component definition
function ComponentName() {
  const { theme, language } = useAppContext();
  
  // Translations
  const translations = {
    es: { /* Spanish text */ },
    en: { /* English text */ }
  };
  
  const t = translations[language];
  
  // Component logic
  const handleAction = () => {
    // Action logic
  };
  
  // Render
  return (
    <section className="component-classes">
      {/* Component content */}
    </section>
  );
}
```

### Context Usage
All components use the `AppContext` for:
- **Theme**: `theme` (dark/light) and `setTheme`
- **Language**: `language` (es/en) and `setLanguage`
- **Mobile Menu**: `mobileMenuOpen` and `setMobileMenuOpen`

### Styling Approach
- **Tailwind CSS**: Primary styling method
- **Custom Classes**: Defined in `globals.css` with `@layer components`
- **Theme-Aware**: Dynamic classes based on current theme
- **Responsive**: Mobile-first design with breakpoint utilities

## 🎨 Styling System

### CSS Architecture
```css
/* 1. Tailwind Directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 2. CSS Variables */
:root {
  --color-primary-light: #ffffff;
  --color-primary-dark: #0d0d0d;
  /* ... more variables */
}

/* 3. Theme Classes */
.dark { /* dark theme variables */ }
.light { /* light theme variables */ }

/* 4. Base Styles */
@layer base {
  /* Typography, focus states, etc. */
}

/* 5. Component Styles */
@layer components {
  /* Buttons, cards, forms, etc. */
}

/* 6. Utility Classes */
@layer utilities {
  /* Custom utilities */
}
```

### Theme System
- **CSS Variables**: Dynamic color management
- **Tailwind Classes**: Theme-aware utility classes
- **Component Classes**: Pre-built styled components
- **Transitions**: Smooth theme switching

## 🔧 Development Guidelines

### Adding New Components
1. **Create Component File**: `src/components/NewComponent.jsx`
2. **Follow Structure**: Use the standard component pattern
3. **Add Translations**: Include Spanish and English text
4. **Use Context**: Access theme and language from `AppContext`
5. **Style Consistently**: Use Tailwind classes and custom components
6. **Import in App**: Add to `App.jsx` component list

### Component Best Practices
- **Single Responsibility**: Each component has one clear purpose
- **Reusable**: Components should be modular and reusable
- **Accessible**: Include ARIA labels and keyboard navigation
- **Responsive**: Design for all screen sizes
- **Performance**: Optimize for fast rendering

### Styling Best Practices
- **Utility First**: Prefer Tailwind utility classes
- **Custom Components**: Create reusable styled components
- **Theme Aware**: Always consider both light and dark themes
- **Consistent**: Use the established design system
- **Accessible**: Ensure proper contrast and focus states

## 🚀 Performance Considerations

### Optimization Strategies
- **Lazy Loading**: Components load when needed
- **CSS Optimization**: Tailwind purges unused styles
- **Image Optimization**: Use appropriate formats and sizes
- **Code Splitting**: Modular component structure
- **Caching**: Proper cache headers for static assets

### Bundle Analysis
- **CSS Size**: Monitor compiled CSS file size
- **JavaScript**: Keep component logic minimal
- **Dependencies**: Minimize external dependencies
- **Images**: Optimize favicon and asset sizes

## 🧪 Testing

### Component Testing
- **Visual Testing**: Verify appearance in both themes
- **Responsive Testing**: Test on different screen sizes
- **Accessibility Testing**: Check with screen readers
- **Interaction Testing**: Verify all interactive elements

### Browser Testing
- **Chrome**: Primary development browser
- **Firefox**: Secondary testing
- **Safari**: iOS compatibility
- **Edge**: Windows compatibility

## 📚 Related Documentation

- **[Main README](../README.md)** - Project overview and setup
- **[Theme Guide](../THEME_GUIDE.md)** - Detailed theme system documentation
- **[Assets README](../assets/README.md)** - Static assets documentation
- **[Tailwind Config](../tailwind.config.js)** - Tailwind CSS configuration

## 🔄 Maintenance

### Regular Tasks
- **Update Dependencies**: Keep packages up to date
- **Review Performance**: Monitor loading times
- **Check Accessibility**: Ensure WCAG compliance
- **Update Content**: Keep portfolio information current
- **Test Functionality**: Verify all features work correctly

### Code Quality
- **Linting**: Run `npm run lint` regularly
- **Formatting**: Use `npm run format` for consistent code
- **Type Checking**: Run `npm run type-check` for TypeScript validation
- **Documentation**: Keep this README updated 
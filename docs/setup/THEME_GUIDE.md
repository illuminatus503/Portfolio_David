# Theme System Guide

Comprehensive guide for the dark/light theme system used in David Fernández-Cuenca's portfolio.

## 🎨 Theme Overview

The portfolio features a sophisticated theme system with:
- **Dark Mode**: Default theme with dark backgrounds
- **Light Mode**: Alternative theme with light backgrounds
- **System Detection**: Automatic theme based on OS preference
- **Manual Toggle**: User-controlled theme switching
- **Persistence**: Theme preference saved in localStorage

## 🎯 Implementation

### CSS Architecture
```css
/* CSS Variables for Theme Colors */
:root {
  /* Light Theme Colors */
  --color-primary-light: #ffffff;
  --color-secondary-light: #f3f4f6;
  --color-text-light: #1f2937;
  --color-text-muted-light: #6b7280;
  
  /* Dark Theme Colors */
  --color-primary-dark: #0d0d0d;
  --color-secondary-dark: #1f1f1f;
  --color-text-dark: #f3f4f6;
  --color-text-muted-dark: #9ca3af;
}

/* Theme Class Application */
.dark {
  --color-primary: var(--color-primary-dark);
  --color-secondary: var(--color-secondary-dark);
  --color-text: var(--color-text-dark);
  --color-text-muted: var(--color-text-muted-dark);
}

.light {
  --color-primary: var(--color-primary-light);
  --color-secondary: var(--color-secondary-light);
  --color-text: var(--color-text-light);
  --color-text-muted: var(--color-text-muted-light);
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
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
        textLight: {
          light: '#1f2937',
          dark: '#f3f4f6',
        },
      },
    },
  },
}
```

## 🧩 Component Usage

### Theme Context
```jsx
// App.jsx - Theme Management
const [theme, setTheme] = useState('dark');

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

### Component Styling
```jsx
// Component with theme-aware styling
function MyComponent() {
  const { theme } = useAppContext();
  
  // Helper function for dynamic classes
  const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
    const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
    return `${baseClasses} ${themeSpecific}`;
  };
  
  return (
    <div className={getThemeClasses(
      'card transition-colors duration-300',
      'bg-gray-800 text-white border-gray-700',
      'bg-white text-gray-900 border-gray-200'
    )}>
      {/* Component content */}
    </div>
  );
}
```

## 🎨 Color Palette

### Primary Colors
- **Dark Background**: `#0d0d0d` (Very dark gray)
- **Light Background**: `#ffffff` (Pure white)
- **Accent**: `#6366f1` (Indigo)

### Secondary Colors
- **Dark Secondary**: `#1f1f1f` (Dark gray)
- **Light Secondary**: `#f3f4f6` (Light gray)
- **Accent Hover**: `#4f46e5` (Darker indigo)

### Text Colors
- **Dark Text**: `#f3f4f6` (Light gray)
- **Light Text**: `#1f2937` (Dark gray)
- **Muted Text**: `#9ca3af` (Medium gray)

## 🔧 Helper Functions

### Theme Class Generator
```jsx
// Utility function for theme-aware classes
const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
  const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
  return `${baseClasses} ${themeSpecific}`;
};

// Usage examples
const buttonClasses = getThemeClasses(
  'btn transition-colors duration-200',
  'bg-gray-700 text-white hover:bg-gray-600',
  'bg-gray-200 text-gray-900 hover:bg-gray-300'
);

const cardClasses = getThemeClasses(
  'card shadow-md',
  'bg-gray-800 border-gray-700',
  'bg-white border-gray-200'
);
```

### Common Theme Patterns
```jsx
// Background patterns
const bgClasses = getThemeClasses(
  'transition-colors duration-300',
  'bg-gray-900',
  'bg-white'
);

// Text patterns
const textClasses = getThemeClasses(
  'transition-colors duration-300',
  'text-white',
  'text-gray-900'
);

// Border patterns
const borderClasses = getThemeClasses(
  'border transition-colors duration-300',
  'border-gray-700',
  'border-gray-200'
);
```

## 🎯 Best Practices

### Component Design
1. **Always use theme context**: Access theme from `useAppContext()`
2. **Use helper functions**: Leverage `getThemeClasses()` for consistency
3. **Include transitions**: Add `transition-colors duration-300` for smooth switching
4. **Test both themes**: Verify appearance in light and dark modes
5. **Consider contrast**: Ensure text is readable in both themes

### CSS Guidelines
1. **Use CSS variables**: Define colors in `:root` for consistency
2. **Leverage Tailwind**: Use utility classes for theme-specific styling
3. **Maintain hierarchy**: Keep color relationships consistent
4. **Optimize performance**: Use efficient selectors and minimal repaints

### Accessibility
1. **High contrast**: Ensure sufficient contrast ratios
2. **Color independence**: Don't rely solely on color for information
3. **Focus states**: Maintain visible focus indicators in both themes
4. **Reduced motion**: Respect `prefers-reduced-motion` preference

## 🔄 Theme Switching

### User Interface
```jsx
// Theme toggle button
<button
  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  className={getThemeClasses(
    'px-3 py-1 rounded transition-colors duration-200',
    'bg-gray-700 text-white hover:bg-gray-600',
    'bg-gray-200 text-gray-900 hover:bg-gray-300'
  )}
  aria-label="Toggle theme"
>
  {theme === 'dark' ? '☀️' : '🌙'}
</button>
```

### System Integration
```jsx
// Listen for system theme changes
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
}, []);
```

## 🧪 Testing

### Manual Testing
1. **Toggle themes**: Use theme button to switch between modes
2. **System detection**: Change OS theme preference
3. **Persistence**: Refresh page to verify saved preference
4. **Transitions**: Verify smooth color transitions

### Automated Testing
```javascript
// Test theme switching
test('theme switches correctly', () => {
  render(<App />);
  const toggle = screen.getByLabelText('Toggle theme');
  
  fireEvent.click(toggle);
  expect(document.documentElement).toHaveClass('light');
  
  fireEvent.click(toggle);
  expect(document.documentElement).toHaveClass('dark');
});
```

### Browser Testing
- **Chrome**: Primary testing browser
- **Firefox**: CSS variable support
- **Safari**: System theme detection
- **Edge**: Windows integration

## 🔧 Troubleshooting

### Common Issues
1. **Theme not switching**: Check localStorage and class application
2. **Flickering**: Ensure theme is applied before render
3. **Inconsistent colors**: Verify CSS variable definitions
4. **Performance**: Optimize theme switching logic

### Debug Tools
```javascript
// Debug theme state
console.log('Current theme:', theme);
console.log('HTML classes:', document.documentElement.className);
console.log('localStorage:', localStorage.getItem('theme'));
```

## 📚 Related Documentation

- **[Main README](./README.md)** - Project overview
- **[Source README](./src/README.md)** - Component documentation
- **[Assets README](./assets/README.md)** - Static assets
- **[Tailwind Config](./tailwind.config.js)** - Tailwind configuration 
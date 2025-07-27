# Theme System Guide

This document explains how the theme system works in David Fernández-Cuenca's portfolio.

## 🎨 Theme Colors

### Dark Theme
- **Primary Background**: `#0d0d0d` (Very dark gray)
- **Secondary Background**: `#1f1f1f` (Dark gray)
- **Text Light**: `#f3f4f6` (Light gray)
- **Text Muted**: `#9ca3af` (Muted gray)

### Light Theme
- **Primary Background**: `#ffffff` (White)
- **Secondary Background**: `#f3f4f6` (Light gray)
- **Text Light**: `#1f2937` (Dark gray)
- **Text Muted**: `#6b7280` (Muted gray)

### Accent Color
- **Primary**: `#6366f1` (Indigo)
- **Hover**: `#4f46e5` (Darker indigo)

## 🔧 Implementation

### Tailwind Classes Used

#### Background Colors
```css
/* Dark Theme */
bg-primary-dark      /* #0d0d0d */
bg-secondary-dark    /* #1f1f1f */

/* Light Theme */
bg-primary-light     /* #ffffff */
bg-secondary-light   /* #f3f4f6 */
```

#### Text Colors
```css
/* Dark Theme */
text-textLight-dark  /* #f3f4f6 */
text-textMuted-dark  /* #9ca3af */

/* Light Theme */
text-textLight-light /* #1f2937 */
text-textMuted-light /* #6b7280 */
```

### Component Usage

#### Navbar Component
The navbar uses dynamic classes based on the current theme:

```jsx
// Helper function for dynamic theme classes
const getThemeClasses = (baseClasses, darkClasses, lightClasses) => {
  const themeSpecific = theme === 'dark' ? darkClasses : lightClasses;
  return `${baseClasses} ${themeSpecific}`;
};

// Usage example
<nav className={getThemeClasses(
  'fixed inset-x-0 top-0 z-50 backdrop-blur-md border-b transition-colors duration-300',
  'bg-primary-dark/90 border-secondary-dark',
  'bg-primary-light/90 border-secondary-light'
)}>
```

#### Theme Toggle
The theme toggle switches between 'dark' and 'light' modes:

```jsx
const toggleTheme = () => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
};
```

## 🎯 Theme Switching

### How It Works
1. **State Management**: Theme is stored in React state and localStorage
2. **CSS Classes**: The `dark` or `light` class is applied to the `<html>` element
3. **Tailwind Integration**: Tailwind's `darkMode: 'class'` configuration responds to these classes
4. **Dynamic Classes**: Components use conditional classes based on the current theme

### Theme Persistence
- **localStorage**: Theme preference is saved and restored on page load
- **System Preference**: Falls back to system preference if no saved theme
- **Default**: Dark theme if no preference is available

## 📱 Responsive Design

### Mobile Considerations
- **Touch Targets**: Minimum 44px for touch interactions
- **Contrast**: High contrast ratios for accessibility
- **Readability**: Appropriate text sizes for mobile screens

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility

### Color Contrast
- **WCAG AA**: All text meets accessibility standards
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences

### Focus States
- **Visible Focus**: Clear focus indicators for keyboard navigation
- **Color Independent**: Focus states work in both themes

## 🔄 Transitions

### Smooth Theme Switching
- **Duration**: 300ms transitions for color changes
- **Properties**: Background, text, and border colors
- **Performance**: Hardware-accelerated transitions

### CSS Variables
```css
:root {
  --transition-normal: 0.3s ease-in-out;
}

* {
  transition: background-color var(--transition-normal), 
              color var(--transition-normal), 
              border-color var(--transition-normal);
}
```

## 🚀 Best Practices

### Component Development
1. **Use Helper Function**: Always use `getThemeClasses()` for dynamic styling
2. **Test Both Themes**: Verify components work in both light and dark modes
3. **Accessibility First**: Ensure proper contrast and focus states
4. **Performance**: Minimize re-renders during theme switching

### CSS Guidelines
1. **CSS Variables**: Use CSS custom properties for theme values
2. **Tailwind Classes**: Prefer Tailwind utilities over custom CSS
3. **Responsive**: Design for all screen sizes
4. **Progressive Enhancement**: Ensure functionality without JavaScript

## 🐛 Troubleshooting

### Common Issues

#### Theme Not Switching
- Check if `theme` state is updating correctly
- Verify `localStorage` is working
- Ensure CSS classes are being applied to `<html>`

#### Colors Not Updating
- Verify Tailwind classes are correct
- Check if `getThemeClasses()` is being used
- Ensure CSS variables are defined

#### Performance Issues
- Use `useCallback` for theme toggle functions
- Minimize re-renders with `React.memo`
- Optimize CSS transitions

### Debug Tools
```javascript
// Check current theme
console.log('Current theme:', theme);

// Check localStorage
console.log('Saved theme:', localStorage.getItem('theme'));

// Check HTML classes
console.log('HTML classes:', document.documentElement.className);
```

## 📋 Testing Checklist

- [ ] Theme switches correctly between light and dark
- [ ] Theme preference is saved in localStorage
- [ ] System preference is detected on first visit
- [ ] All components adapt to theme changes
- [ ] Colors have proper contrast ratios
- [ ] Focus states are visible in both themes
- [ ] Transitions are smooth and performant
- [ ] Mobile menu works in both themes
- [ ] No layout shifts during theme switching
- [ ] Print styles work correctly

## 🎨 Customization

### Adding New Colors
1. Update `tailwind.config.js` with new color definitions
2. Add corresponding CSS variables in `globals.css`
3. Update component classes to use new colors
4. Test in both themes

### Modifying Transitions
1. Update CSS variables in `:root`
2. Modify transition classes in components
3. Test performance impact
4. Ensure accessibility compliance

## 📚 Resources

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [React Context API](https://reactjs.org/docs/context.html) 
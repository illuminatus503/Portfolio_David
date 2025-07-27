# CSS Configuration

This directory contains the CSS configuration for David Fernández-Cuenca's portfolio website.

## 📁 Files

### `globals.css`
The main CSS file containing:
- **Custom CSS Variables**: Theme colors, transitions, shadows
- **Base Styles**: Typography, focus states, scrollbar customization
- **Component Styles**: Buttons, cards, forms, navigation
- **Utility Classes**: Text gradients, animations, hover effects
- **Responsive Design**: Media queries for different screen sizes
- **Accessibility**: High contrast mode, reduced motion support

### `tailwind.config.js`
Tailwind CSS configuration file with:
- **Custom Colors**: Primary, secondary, accent color palette
- **Typography**: Font families (Inter, Poppins, JetBrains Mono)
- **Animations**: Custom keyframes and animation classes
- **Spacing**: Custom spacing values
- **Shadows**: Glow effects and custom shadows
- **Plugins**: Typography, forms, and aspect ratio plugins

## 🎨 Design System

### Color Palette
- **Primary**: Dark/Light theme backgrounds
- **Secondary**: Card and component backgrounds
- **Accent**: #6366f1 (Indigo) - Primary brand color
- **Text**: Light and muted text variants

### Typography
- **Sans**: Inter - Main body text
- **Display**: Poppins - Headings and titles
- **Mono**: JetBrains Mono - Code and technical content

### Components
- **Buttons**: Primary, secondary, outline variants
- **Cards**: Hover effects and animations
- **Forms**: Styled inputs and labels
- **Navigation**: Animated links and mobile menu

## 🔧 Configuration

### Development
- **Tailwind CDN**: Used for development (no build step required)
- **Custom CSS**: Global styles and component overrides
- **Hot Reload**: Changes reflect immediately

### Production
- **Build Process**: CSS can be compiled with Tailwind CLI
- **Optimization**: Minification and purging of unused styles
- **Performance**: Optimized for fast loading

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features
- **Mobile-first**: Base styles for mobile, enhanced for larger screens
- **Flexible Layouts**: Grid and flexbox for responsive components
- **Touch-friendly**: Appropriate sizing for mobile interactions

## ♿ Accessibility

### Features
- **Focus States**: Visible focus indicators
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences
- **Screen Readers**: Semantic HTML and ARIA labels

### Color Contrast
- **WCAG AA**: All text meets accessibility standards
- **Theme Support**: Both light and dark themes accessible

## 🚀 Usage

### Adding New Styles
1. **Utility Classes**: Use Tailwind utility classes when possible
2. **Component Styles**: Add to `@layer components` in `globals.css`
3. **Custom Utilities**: Add to `@layer utilities` in `globals.css`

### Theme Customization
1. **Colors**: Update CSS variables in `:root`
2. **Typography**: Modify font families in `tailwind.config.js`
3. **Spacing**: Add custom spacing values as needed

### Best Practices
- **Consistency**: Use design system tokens
- **Performance**: Minimize custom CSS
- **Maintainability**: Use semantic class names
- **Accessibility**: Test with screen readers and keyboard navigation

## 📦 Dependencies

### Development
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: Vendor prefixing

### Production
- **CDN**: Tailwind CSS via CDN for simplicity
- **Custom CSS**: Optimized global styles

## 🔄 Build Process

### Development
```bash
npm run dev          # Start development server
npm run build:css    # Watch CSS changes (if using build)
```

### Production
```bash
npm run build        # Build for production
npm run lint         # Lint CSS files
npm run format       # Format CSS files
```

## 📋 File Structure

```
src/
├── globals.css          # Main CSS file
├── components/          # React components
├── types.d.ts          # TypeScript definitions
├── analytics.js        # Analytics utilities
└── README.md           # This file
```

## 🎯 Next Steps

1. **CSS Optimization**: Implement CSS purging for production
2. **Design Tokens**: Create a comprehensive design system
3. **Component Library**: Build reusable UI components
4. **Performance**: Optimize CSS loading and rendering
5. **Testing**: Add visual regression testing 
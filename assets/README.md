# Assets Documentation

This directory contains all static assets for David Fernández-Cuenca's portfolio website.

## 📁 File Structure

```
assets/
├── 📄 README.md                    # This file
├── 📄 favicon.svg                  # Robot design favicon (32x32)
├── 📄 favicon-simple.svg           # Simple initials "DF" favicon
├── 📄 favicon.ico                  # Traditional ICO format
├── 📄 favicon-16x16.png            # 16x16 PNG favicon
├── 📄 favicon-32x32.png            # 32x32 PNG favicon
├── 📄 apple-touch-icon.png         # iOS touch icon (180x180)
├── 📄 android-chrome-192x192.png   # Android icon (192x192)
└── 📄 android-chrome-512x512.png   # PWA icon (512x512)
```

## 🎨 Favicon Designs

### Robot Favicon (`favicon.svg`)
- **Design**: Cute robot with antenna and code symbols
- **Colors**: Indigo (#6366f1) background, white robot face
- **Features**: Eyes, mouth, antenna, `</>` symbols
- **Size**: 32x32 viewBox, scalable

### Simple Favicon (`favicon-simple.svg`)
- **Design**: Minimalist initials "DF"
- **Colors**: Indigo background, white text
- **Features**: Clean, readable design
- **Size**: 32x32 viewBox, scalable

### Inline Favicon
- **Location**: Embedded in `index.html` as data URL
- **Purpose**: Fallback for maximum reliability
- **Design**: Simple "DF" initials
- **Advantage**: No HTTP request needed

## 🔧 Implementation

### HTML Integration
```html
<!-- Favicon links in index.html -->
<link rel="icon" href="data:image/svg+xml,..." />           <!-- Inline fallback -->
<link rel="icon" type="image/svg+xml" href="./assets/favicon-simple.svg" />
<link rel="icon" type="image/svg+xml" href="./assets/favicon.svg" />
<link rel="icon" type="image/x-icon" href="./assets/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="./assets/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="./assets/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="./assets/favicon-16x16.png" />
```

### PWA Manifest
```json
{
  "icons": [
    {
      "src": "/assets/favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png"
    },
    {
      "src": "/assets/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

## 📱 Platform Support

### Desktop Browsers
- **Chrome/Edge**: SVG, ICO, PNG support
- **Firefox**: Excellent SVG support
- **Safari**: Good all-format support

### Mobile Devices
- **iOS**: Apple Touch Icon (180x180)
- **Android**: Chrome icons (192x192, 512x512)
- **PWA**: Maskable icon (512x512)

### Fallback Strategy
1. **Inline SVG** (most reliable)
2. **favicon-simple.svg** (simple design)
3. **favicon.svg** (robot design)
4. **favicon.ico** (traditional format)
5. **PNG variants** (specific sizes)

## 🎯 Design Guidelines

### Color Palette
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #4f46e5 (Darker Indigo)
- **Background**: White or transparent
- **Text**: White for contrast

### Design Principles
- **Simplicity**: Clean, recognizable design
- **Scalability**: Works at all sizes
- **Contrast**: High contrast for visibility
- **Branding**: Consistent with portfolio theme

### Technical Requirements
- **SVG**: Vector format for scalability
- **PNG**: Raster format for specific sizes
- **ICO**: Traditional format for older browsers
- **Optimization**: Small file sizes

## 🔄 Maintenance

### Regular Tasks
- **Test Loading**: Verify favicons appear in all browsers
- **Check Cache**: Clear browser cache if needed
- **Update Content**: Replace with new designs if desired
- **Optimize Files**: Compress images for performance

### Troubleshooting
- **Not Appearing**: Check file paths and clear cache
- **Wrong Size**: Verify PNG dimensions
- **Format Issues**: Test different file formats
- **Performance**: Monitor file sizes

## 🧪 Testing

### Test Page
Use `test-favicon.html` to verify favicon loading:
```bash
# Open in browser
open test-favicon.html

# Check console for loading status
# Verify favicon appears in browser tab
```

### Browser Testing
- **Chrome**: Primary testing browser
- **Firefox**: SVG compatibility
- **Safari**: iOS compatibility
- **Edge**: Windows compatibility

## 📚 Related Documentation

- **[Main README](../README.md)** - Project overview
- **[Theme Guide](../THEME_GUIDE.md)** - Color system
- **[Source README](../src/README.md)** - Component documentation 
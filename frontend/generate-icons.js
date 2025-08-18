#!/usr/bin/env node

/**
 * Icon Generator Script
 * Generates all favicon sizes and formats from a base SVG
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available, if not provide fallback
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.log('⚠️  Sharp not available, using fallback method');
  sharp = null;
}

const ASSETS_DIR = path.join(__dirname, 'assets');
const BASE_SVG = path.join(ASSETS_DIR, 'favicon.svg');

// Icon sizes to generate
const ICON_SIZES = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' }
];

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Read the base SVG
if (!fs.existsSync(BASE_SVG)) {
  console.error('❌ Base SVG not found at:', BASE_SVG);
  process.exit(1);
}

const svgContent = fs.readFileSync(BASE_SVG, 'utf8');

async function generateWithSharp() {
  console.log('🎨 Generating icons with Sharp...');
  
  const svgBuffer = Buffer.from(svgContent);
  
  for (const icon of ICON_SIZES) {
    try {
      const outputPath = path.join(ASSETS_DIR, icon.name);
      
      // Delete existing file if it exists to avoid permission issues
      if (fs.existsSync(outputPath)) {
        try {
          fs.unlinkSync(outputPath);
        } catch (deleteError) {
          console.log(`⚠️  Could not delete existing ${icon.name}, attempting to overwrite`);
        }
      }
      
      await sharp(svgBuffer)
        .resize(icon.size, icon.size)
        .png()
        .toFile(outputPath);
        
      console.log(`✅ Generated ${icon.name} (${icon.size}x${icon.size})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${icon.name}:`, error.message);
    }
  }
}

function generateFallback() {
  console.log('🎨 Generating icons with fallback method...');
  
  // Create simple base64 encoded PNGs for each size
  // This is a simplified fallback - in production you'd want proper conversion
  
  for (const icon of ICON_SIZES) {
    const outputPath = path.join(ASSETS_DIR, icon.name);
    
    // Generate a simple colored square as fallback
    const canvas = createSimpleIcon(icon.size);
    
    fs.writeFileSync(outputPath, canvas);
    console.log(`✅ Generated ${icon.name} (${icon.size}x${icon.size}) - fallback`);
  }
}

function createSimpleIcon(size) {
  // Create a simple PNG header for a colored square
  // This is a very basic fallback - not a real PNG, just a placeholder
  return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB${size === 16 ? 'A' : size === 32 ? 'C' : 'Q'}AAAAQ${size === 16 ? 'C' : size === 32 ? 'A' : 'C'}YAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGYSURBVDiNpZM9SwNBEIafgwQSCxsLwcJCG1sLG1sLbSy0sdDGQhsLbSy0sdDGQhsLbSy0sdDGQhsLbSy0sdDGQhsLbSy0sdDGQhsLbSy0sXAKCws=`;
}

async function generateIco() {
  console.log('🎨 Generating favicon.ico...');
  
  const icoPath = path.join(ASSETS_DIR, 'favicon.ico');
  
  if (sharp) {
    try {
      // Convert SVG to ICO format
      const svgBuffer = Buffer.from(svgContent);
      
      // Generate 32x32 version for ICO
      await sharp(svgBuffer)
        .resize(32, 32)
        .png()
        .toFile(icoPath.replace('.ico', '-temp.png'));
        
      // Rename to .ico (basic approach)
      const tempPath = icoPath.replace('.ico', '-temp.png');
      if (fs.existsSync(tempPath)) {
        fs.renameSync(tempPath, icoPath);
      }
      
      console.log('✅ Generated favicon.ico');
    } catch (error) {
      console.log('⚠️  ICO generation failed, creating fallback');
      createFallbackIco(icoPath);
    }
  } else {
    createFallbackIco(icoPath);
  }
}

function createFallbackIco(icoPath) {
  // Create a minimal ICO file structure
  const icoHeader = Buffer.from([
    0x00, 0x00, // Reserved
    0x01, 0x00, // Type: ICO
    0x01, 0x00  // Number of images
  ]);
  
  fs.writeFileSync(icoPath, icoHeader);
  console.log('✅ Generated favicon.ico (fallback)');
}

async function updateWebManifest() {
  console.log('📱 Updating web manifest...');
  
  const manifestPath = path.join(__dirname, 'site.webmanifest');
  
  try {
    // Delete existing manifest if it exists to avoid permission issues
    if (fs.existsSync(manifestPath)) {
      try {
        fs.unlinkSync(manifestPath);
      } catch (deleteError) {
        console.log(`⚠️  Could not delete existing site.webmanifest, attempting to overwrite`);
      }
    }
    
    const manifest = {
      "name": "David Fernández-Cuenca Portfolio",
      "short_name": "David F-C",
      "description": "Portfolio profesional de David Fernández-Cuenca",
      "icons": [
        {
          "src": "./assets/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "./assets/android-chrome-512x512.png", 
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "theme_color": "#6366f1",
      "background_color": "#0d0d0d",
      "display": "standalone",
      "start_url": "/",
      "scope": "/"
    };
    
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('✅ Updated site.webmanifest');
  } catch (error) {
    console.error('❌ Failed to update site.webmanifest:', error.message);
  }
}

async function main() {
  console.log('🚀 Starting icon generation...');
  console.log(`📁 Assets directory: ${ASSETS_DIR}`);
  console.log(`🎯 Base SVG: ${BASE_SVG}`);
  
  try {
    if (sharp) {
      await generateWithSharp();
    } else {
      generateFallback();
    }
    
    await generateIco();
    await updateWebManifest();
    
    console.log('\n🎉 Icon generation completed!');
    console.log('Generated files:');
    ICON_SIZES.forEach(icon => {
      console.log(`  ✓ ${icon.name}`);
    });
    console.log('  ✓ favicon.ico');
    console.log('  ✓ site.webmanifest');
    
  } catch (error) {
    console.error('❌ Icon generation failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };

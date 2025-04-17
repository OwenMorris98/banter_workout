// This script generates PWA icons from an existing image
// To run: node scripts/generate-pwa-icons.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_IMAGE = path.join(__dirname, '../public/img/horse_bant.jpg');
const OUTPUT_DIR = path.join(__dirname, '../public/icons');
const FAVICON_PATH = path.join(__dirname, '../public/favicon.ico');

// Make sure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Define the icon sizes to generate
const icons = [
  { name: 'icon-192x192.png', size: 192 },
  { name: 'icon-512x512.png', size: 512 },
  { name: 'icon-maskable.png', size: 512, padding: true },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-16x16.png', size: 16 }
];

// Process each icon
async function generateIcons() {
  console.log(`Generating PWA icons from ${SOURCE_IMAGE}`);
  
  for (const icon of icons) {
    const outputPath = path.join(OUTPUT_DIR, icon.name);
    
    try {
      let image = sharp(SOURCE_IMAGE);
      
      // Resize the image, maintaining aspect ratio
      image = image.resize({
        width: icon.size,
        height: icon.size,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      });
      
      // For maskable icons, add padding (25% padding on all sides)
      if (icon.padding) {
        image = image.resize({
          width: Math.floor(icon.size * 0.75),
          height: Math.floor(icon.size * 0.75),
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        }).extend({
          top: Math.floor(icon.size * 0.125),
          bottom: Math.floor(icon.size * 0.125),
          left: Math.floor(icon.size * 0.125),
          right: Math.floor(icon.size * 0.125),
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        });
      }
      
      // Convert to PNG
      await image.png().toFile(outputPath);
      console.log(`Created ${outputPath}`);
    } catch (error) {
      console.error(`Error generating ${icon.name}:`, error);
    }
  }
  
  // For favicon.ico, we'll just copy the 32x32 version
  try {
    // Simple approach: copy the 32x32 PNG to favicon.ico location
    fs.copyFileSync(
      path.join(OUTPUT_DIR, 'favicon-32x32.png'),
      path.join(__dirname, '../public/favicon.ico')
    );
    console.log(`Created favicon.ico (copied from favicon-32x32.png)`);
  } catch (error) {
    console.error('Error generating favicon.ico:', error);
  }
  
  console.log('PWA icon generation complete!');
}

generateIcons().catch(console.error); 
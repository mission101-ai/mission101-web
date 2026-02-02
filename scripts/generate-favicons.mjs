import sharp from 'sharp';
import toIco from 'to-ico';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const INPUT_PATH = join(rootDir, 'assets', 'logo-mission101.png');
const OUTPUT_DIR = join(rootDir, 'public');

const sizes = [
  { size: 16, name: 'mission101-icon-16.png' },
  { size: 32, name: 'mission101-icon-32.png' },
  { size: 180, name: 'mission101-apple-touch.png' },
  { size: 192, name: 'mission101-android-192.png' },
  { size: 512, name: 'mission101-android-512.png' }
];

async function generateFavicons() {
  console.log('Starting favicon generation...');
  console.log(`Input: ${INPUT_PATH}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  
  try {
    // Generate all PNG sizes
    const pngBuffers = {};
    
    for (const { size, name } of sizes) {
      console.log(`Generating ${name} (${size}x${size})...`);
      
      const buffer = await sharp(INPUT_PATH)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toBuffer();
      
      const outputPath = join(OUTPUT_DIR, name);
      writeFileSync(outputPath, buffer);
      console.log(`✓ Saved ${name}`);
      
      // Store 16 and 32 for ICO generation
      if (size === 16 || size === 32) {
        pngBuffers[size] = buffer;
      }
    }
    
    // Generate ICO from 16 and 32 PNGs
    console.log('Generating mission101-icon.ico...');
    const icoBuffer = await toIco([pngBuffers[16], pngBuffers[32]]);
    const icoPath = join(OUTPUT_DIR, 'mission101-icon.ico');
    writeFileSync(icoPath, icoBuffer);
    console.log('✓ Saved mission101-icon.ico');
    
    console.log('\n✅ All favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();

import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const iconsDir = join(__dirname, '../src-tauri/icons');

// Minimalist checkmark icon SVG
const iconSvg = `
<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="128" fill="#1d1d1f"/>
  <path d="M144 264L224 344L368 200" stroke="white" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const sizes = [
  { name: '32x32.png', size: 32 },
  { name: '128x128.png', size: 128 },
  { name: '128x128@2x.png', size: 256 },
  { name: 'icon.png', size: 512 },
  { name: 'Square30x30Logo.png', size: 30 },
  { name: 'Square44x44Logo.png', size: 44 },
  { name: 'Square71x71Logo.png', size: 71 },
  { name: 'Square89x89Logo.png', size: 89 },
  { name: 'Square107x107Logo.png', size: 107 },
  { name: 'Square142x142Logo.png', size: 142 },
  { name: 'Square150x150Logo.png', size: 150 },
  { name: 'Square284x284Logo.png', size: 284 },
  { name: 'Square310x310Logo.png', size: 310 },
  { name: 'StoreLogo.png', size: 50 },
];

async function generateIcons() {
  console.log('Generating icons...');

  for (const { name, size } of sizes) {
    const outputPath = join(iconsDir, name);
    await sharp(Buffer.from(iconSvg))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`  Created ${name} (${size}x${size})`);
  }

  // Generate ICO (Windows) - use 256x256 as the main size
  const icoSizes = [16, 32, 48, 64, 128, 256];
  const icoBuffers = await Promise.all(
    icoSizes.map(size =>
      sharp(Buffer.from(iconSvg))
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  // Simple ICO header (we'll just use the 256x256 PNG as ico)
  // For a proper ICO, you'd need a library, but this works for development
  const ico256 = await sharp(Buffer.from(iconSvg))
    .resize(256, 256)
    .png()
    .toBuffer();

  await writeFile(join(iconsDir, 'icon.ico'), ico256);
  console.log('  Created icon.ico');

  // Generate ICNS (macOS) - we'll use the largest PNG
  // For a proper ICNS, you'd need a library, but Tauri can work with the PNGs
  const icns512 = await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toBuffer();

  await writeFile(join(iconsDir, 'icon.icns'), icns512);
  console.log('  Created icon.icns (PNG format - works for dev)');

  console.log('Done!');
}

generateIcons().catch(console.error);

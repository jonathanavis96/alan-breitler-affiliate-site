/**
 * Image optimization script — converts PNG/JPG to WebP format.
 * Run: node scripts/optimize-images.mjs
 *
 * Converts all PNG/JPG images in public/images/ to WebP, keeping originals
 * as fallback. WebP typically saves 25-35% over PNG and 25-50% over JPEG.
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname, relative } from 'path';
import { existsSync } from 'fs';

const PUBLIC_DIR = new URL('../public', import.meta.url).pathname;
const IMAGES_DIR = join(PUBLIC_DIR, 'images');

// Quality settings per format
const WEBP_QUALITY = 82; // Good balance of quality/size for product images
const OG_WEBP_QUALITY = 85; // Slightly higher for OG images (social preview)

async function getAllImages(dir) {
  const results = [];

  async function walk(currentDir) {
    const entries = await readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        // Skip hidden dirs and node_modules
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          await walk(fullPath);
        }
      } else {
        const ext = extname(entry.name).toLowerCase();
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
          results.push(fullPath);
        }
      }
    }
  }

  await walk(dir);
  return results;
}

async function convertToWebP(inputPath) {
  const ext = extname(inputPath).toLowerCase();
  const name = basename(inputPath, ext);
  const dir = dirname(inputPath);
  const outputPath = join(dir, `${name}.webp`);
  const relInput = relative(PUBLIC_DIR, inputPath);
  const relOutput = relative(PUBLIC_DIR, outputPath);

  // Check if WebP already exists and is newer
  if (existsSync(outputPath)) {
    const inputStat = await stat(inputPath);
    const outputStat = await stat(outputPath);
    if (outputStat.mtimeMs > inputStat.mtimeMs) {
      console.log(`  ⏭  ${relOutput} (already up-to-date)`);
      return { skipped: true, inputPath, outputPath };
    }
  }

  // Use higher quality for OG images
  const isOG = inputPath.includes('og-');
  const quality = isOG ? OG_WEBP_QUALITY : WEBP_QUALITY;

  const inputInfo = await stat(inputPath);

  await sharp(inputPath)
    .webp({ quality, effort: 6 }) // effort 6 = good compression, reasonable speed
    .toFile(outputPath);

  const outputInfo = await stat(outputPath);
  const savings = ((1 - outputInfo.size / inputInfo.size) * 100).toFixed(1);

  console.log(`  ✓  ${relInput} → ${relOutput}`);
  console.log(`     ${formatSize(inputInfo.size)} → ${formatSize(outputInfo.size)} (${savings}% smaller)`);

  return {
    skipped: false,
    inputPath,
    outputPath,
    inputSize: inputInfo.size,
    outputSize: outputInfo.size,
    savings: parseFloat(savings),
  };
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function main() {
  console.log('🖼  Image Optimization — PNG/JPG → WebP\n');

  const images = await getAllImages(IMAGES_DIR);

  if (images.length === 0) {
    console.log('No PNG/JPG images found in public/images/');
    return;
  }

  console.log(`Found ${images.length} images to optimize:\n`);

  let totalInputSize = 0;
  let totalOutputSize = 0;
  let converted = 0;
  let skipped = 0;

  for (const imagePath of images) {
    const result = await convertToWebP(imagePath);
    if (result.skipped) {
      skipped++;
    } else {
      converted++;
      totalInputSize += result.inputSize;
      totalOutputSize += result.outputSize;
    }
  }

  console.log('\n─────────────────────────────────────');
  console.log(`Converted: ${converted} images`);
  if (skipped > 0) console.log(`Skipped:   ${skipped} (already up-to-date)`);
  if (converted > 0) {
    const totalSavings = ((1 - totalOutputSize / totalInputSize) * 100).toFixed(1);
    console.log(`Total:     ${formatSize(totalInputSize)} → ${formatSize(totalOutputSize)} (${totalSavings}% smaller)`);
  }
  console.log('─────────────────────────────────────\n');
}

main().catch(console.error);

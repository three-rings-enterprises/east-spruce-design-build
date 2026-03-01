import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const screenshotsDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

let n = 1;
const base = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
while (fs.existsSync(path.join(screenshotsDir, label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`))) n++;
const outFile = path.join(screenshotsDir, label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`);

const browser = await puppeteer.launch({
  executablePath: '/Users/josephpascucci/.cache/puppeteer/chrome/mac-145.0.7632.77/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
// Wait for fonts to load
await new Promise(r => setTimeout(r, 800));
// Force all reveal animations to complete instantly
await page.evaluate(() => {
  // Disable all CSS transitions temporarily
  const style = document.createElement('style');
  style.id = 'no-transitions';
  style.textContent = '*, *::before, *::after { transition-duration: 0s !important; animation-duration: 0s !important; }';
  document.head.appendChild(style);
  // Force all reveal elements visible
  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('visible');
  });
  // Force animate-on-scroll elements visible
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('is-visible');
  });
  // Force brand words visible
  document.querySelectorAll('.brand-word').forEach(el => {
    el.classList.add('visible');
  });
  // Force typewriter to show first word
  const twEl = document.getElementById('typewriter-text');
  if (twEl && !twEl.textContent) twEl.textContent = 'Real Life.';
  // Also trigger hero animations
  document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});
await new Promise(r => setTimeout(r, 200));
// Re-enable transitions for a natural look
await page.evaluate(() => {
  const s = document.getElementById('no-transitions');
  if (s) s.remove();
});
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: outFile, fullPage: true });
await browser.close();

console.log(`Saved: ${outFile}`);

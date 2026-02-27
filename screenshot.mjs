import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mac Chrome path (installed via Puppeteer cache)
const CHROME_PATH =
  process.env.CHROME_PATH ||
  `${process.env.HOME}/.cache/puppeteer/chrome/mac-145.0.7632.77/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;

const SCREENSHOTS_DIR = path.join(__dirname, 'temporary screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Determine next auto-incremented filename
function nextFilename(label) {
  const files = fs.readdirSync(SCREENSHOTS_DIR).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'));
  let max = 0;
  for (const f of files) {
    const match = f.match(/^screenshot-(\d+)/);
    if (match) max = Math.max(max, parseInt(match[1], 10));
  }
  const n = max + 1;
  return label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
}

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  const filename = nextFilename(label);
  const outputPath = path.join(SCREENSHOTS_DIR, filename);
  await page.screenshot({ path: outputPath, fullPage: true });
  await browser.close();

  console.log(`Screenshot saved: temporary screenshots/${filename}`);
})();

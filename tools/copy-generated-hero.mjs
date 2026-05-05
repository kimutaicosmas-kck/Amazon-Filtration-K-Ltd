import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(
  'C:',
  'Users',
  'Admin',
  '.cursor',
  'projects',
  'c-xampp-htdocs-amazon',
  'assets',
  'homepage-air-filter-hero.png'
);
const destDir = path.join(__dirname, '..', 'images', 'hero');
const dest = path.join(destDir, 'homepage-air-filter-hero.png');

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
fs.writeFileSync(path.join(__dirname, 'copy-done.txt'), dest);

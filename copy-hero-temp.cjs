const fs = require('fs');
const path = require('path');
const src = 'C:\\Users\\Admin\\.cursor\\projects\\c-xampp-htdocs-amazon\\assets\\homepage-air-filter-hero.png';
const destDir = path.join(__dirname, 'images', 'hero');
const dest = path.join(destDir, 'homepage-air-filter-hero.png');
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);

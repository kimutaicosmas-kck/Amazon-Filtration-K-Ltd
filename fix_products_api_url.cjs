const fs = require('fs');
const path = 'c:/xampp/htdocs/amazon/static/js/main.d12675dc.js';
let s = fs.readFileSync(path, 'utf8');
const wrong = 'fetch("/backend-php';
const right =
  'fetch("".concat(typeof window!=="undefined"&&void 0!==window.__AMAZON_API_BASE__?window.__AMAZON_API_BASE__:"","/backend-php';
const n = s.split(wrong).length - 1;
if (n === 0) {
  console.log('no fetch("/backend-php left');
  process.exit(0);
}
s = s.split(wrong).join(right);
fs.writeFileSync(path, s);
console.log('replaced', n, 'fetch("/backend-php...');
require('child_process').execSync(`node --check "${path}"`, { stdio: 'inherit' });

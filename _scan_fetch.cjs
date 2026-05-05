const fs = require('fs');
for (const f of ['main.d12675dc.js', 'main.cebc31c7.js']) {
  const s = fs.readFileSync('c:/xampp/htdocs/amazon/static/js/' + f, 'utf8');
  const needle = 'fetch("/backend-php';
  console.log(f, s.split(needle).length - 1);
}

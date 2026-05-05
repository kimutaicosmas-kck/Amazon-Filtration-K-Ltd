const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "static", "js", "main.d12675dc.js");
let s = fs.readFileSync(p, "utf8");
const bad = "})]})]})]})]})}))},t))";
const good = "})]})]})]})})})},t))";
const c = s.split(bad).length - 1;
console.log("occurrences", c);
if (c !== 1) {
  const k = s.indexOf("w-5 h-5");
  console.log(JSON.stringify(s.slice(k, k + 90)));
  process.exit(1);
}
s = s.split(bad).join(good);
fs.writeFileSync(p, s);
console.log("patched");

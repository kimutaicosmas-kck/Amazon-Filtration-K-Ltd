const fs = require("fs");
const p = "_hp_patch.js";
let x = fs.readFileSync(p, "utf8");
const bad =
  'fetchPriority:"high"})})})]})})]})` `,(0,Qe.jsx)("section",{className:"py-12 md:py-16 bg-white"';
const good =
  'fetchPriority:"high"' +
  "})" +
  "})" +
  "})" +
  "]})" +
  "})" +
  "]})" +
  ',(0,Qe.jsx)("section",{className:"py-12 md:py-16 bg-white"';
if (!x.includes(bad)) {
  console.error("pattern not found");
  process.exit(1);
}
x = x.replace(bad, good);
fs.writeFileSync(p, x);
console.log("ok");

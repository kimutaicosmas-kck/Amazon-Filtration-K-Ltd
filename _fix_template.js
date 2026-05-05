const fs = require("fs");
const p = "_hp_patch.js";
let x = fs.readFileSync(p, "utf8");
const bad =
  ',"Get a quote"]})]})]})` `,(0,Qe.jsx)("div",{className:"order-1 lg:order-2 flex justify-center lg:justify-end",children:(0';
const good =
  ',"Get a quote"' +
  "]})" +
  "]})" +
  "]})" +
  ',(0,Qe.jsx)("div",{className:"order-1 lg:order-2 flex justify-center lg:justify-end",children:(0';
if (!x.includes(bad)) {
  console.error("pattern not found");
  process.exit(1);
}
x = x.replace(bad, good);
fs.writeFileSync(p, x);
console.log("ok");

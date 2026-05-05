/**
 * Patches static/js/main.d12675dc.js — "Built for industry partners" section.
 * Upgrades older layouts to three separate image | copy rows (Products, Industries, Services).
 */
const fs = require("fs");
const path = "c:/xampp/htdocs/amazon/static/js/main.d12675dc.js";
const stacked = fs.readFileSync("c:/xampp/htdocs/amazon/_industry_old.txt", "utf8");
const threeBlock = fs.readFileSync("c:/xampp/htdocs/amazon/_industry_three_bundle.txt", "utf8");

const darkCards =
  '(0,Qe.jsx)("section",{className:"py-12 md:py-20 bg-black border-t border-white/10",children:(0,Qe.jsxs)("div",{className:"container mx-auto px-4",children:[(0,Qe.jsxs)("div",{className:"text-center mb-8 md:mb-12",children:[(0,Qe.jsx)("h2",{className:"text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4",children:"Built for industry partners"}),(0,Qe.jsx)("p",{className:"text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto",children:"Distributor programmes, fleet support, and OEM-style runs — engineered and built in our Nairobi factory"})]}),(0,Qe.jsx)("div",{className:"flex flex-col gap-6 md:gap-8 max-w-5xl mx-auto",children:l.map((e,t)=>(0,Qe.jsxs)(Ie,{to:e.path,className:"group flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 text-left",children:[(0,Qe.jsx)("div",{className:"relative w-full sm:w-[42%] sm:max-w-sm shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[200px] md:min-h-[220px] bg-black/40",children:(0,Qe.jsx)("img",{src:"".concat(typeof window!=="undefined"&&void 0!==window.__AMAZON_API_BASE__?window.__AMAZON_API_BASE__:"",e.image),alt:e.imageAlt,className:"absolute inset-0 h-full w-full object-cover",loading:0===t?"eager":"lazy",decoding:"async"})}),(0,Qe.jsxs)("div",{className:"flex flex-1 flex-col justify-center p-6 md:p-8 lg:pl-10",children:[(0,Qe.jsx)("h3",{className:"text-lg md:text-xl font-semibold text-white mb-3",children:e.title}),(0,Qe.jsx)("p",{className:"text-sm md:text-base text-gray-400 mb-5 leading-relaxed",children:e.description}),(0,Qe.jsxs)("div",{className:"inline-flex items-center text-blue-400 font-medium group-hover:text-blue-300 text-sm md:text-base",children:["See more",(0,Qe.jsx)(xt,{className:"w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"})]})]})]},t))})]})})';

let s = fs.readFileSync(path, "utf8");

if (s.includes(threeBlock.slice(0, 80))) {
  console.log("already three-block layout:", path);
  process.exit(0);
}
if (s.includes(stacked)) {
  s = s.split(stacked).join(threeBlock);
  fs.writeFileSync(path, s);
  console.log("patched stacked → three-block", path);
  process.exit(0);
}
if (s.includes(darkCards)) {
  s = s.split(darkCards).join(threeBlock);
  fs.writeFileSync(path, s);
  console.log("patched dark cards → three-block", path);
  process.exit(0);
}
console.error("No known industry section found in", path);
process.exit(1);

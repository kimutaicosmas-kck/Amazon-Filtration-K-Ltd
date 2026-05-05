const fs = require("fs");
const path = "c:/xampp/htdocs/amazon/static/js/main.d12675dc.js";
let s = fs.readFileSync(path, "utf8");

const carouselStart =
  'var e;const t=[{src:"/images/about/Amazon-filtration-company-pic.jpg"';
const carouselEnd = "},[t.length]);";
const idxStart = s.indexOf(carouselStart);
const idxEnd = s.indexOf(carouselEnd, idxStart);
if (idxStart < 0 || idxEnd < 0) {
  console.error("carousel block not found", { idxStart, idxEnd });
  process.exit(1);
}
const afterCarousel = s.slice(idxEnd + carouselEnd.length);

const heroSrcDecl =
  'const heroSrc="".concat(typeof window!=="undefined"&&void 0!==window.__AMAZON_API_BASE__?window.__AMAZON_API_BASE__:"","/images/hero/homepage-air-filter-hero.png");';

s = s.slice(0, idxStart) + heroSrcDecl + afterCarousel;

const heroOldOpen =
  '(0,Qe.jsxs)("section",{className:"relative min-h-screen flex items-center justify-center overflow-hidden",children:[';
const heroEndMarker =
  ',(0,Qe.jsx)("section",{className:"py-12 md:py-16 bg-white"';

const h0 = s.indexOf(heroOldOpen);
const h1 = s.indexOf(heroEndMarker, h0);
if (h0 < 0 || h1 < 0) {
  console.error("hero section not found", { h0, h1 });
  process.exit(1);
}

const heroNew = `(0,Qe.jsxs)("section",{className:"relative min-h-screen flex items-center overflow-hidden bg-black",children:[(0,Qe.jsx)("div",{className:"absolute inset-0 opacity-50",style:{background:"radial-gradient(ellipse 85% 55% at 65% 35%, rgba(41, 151, 255, 0.22), transparent 55%), radial-gradient(ellipse 60% 45% at 20% 70%, rgba(168, 85, 247, 0.12), transparent 50%)"},"aria-hidden":!0}),(0,Qe.jsx)("div",{className:"relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24",children:(0,Qe.jsx)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center",children:[(0,Qe.jsx)("div",{className:"flex justify-center lg:justify-start",children:(0,Qe.jsx)("div",{className:"w-full max-w-md lg:max-w-lg",children:(0,Qe.jsx)("img",{src:heroSrc,alt:"High-performance conical air filter — premium filtration for engines and industrial use",className:"w-full h-auto max-h-96 object-contain object-center mx-auto lg:mx-0",width:520,height:780,decoding:"async",fetchPriority:"high"})})}),(0,Qe.jsxs)("div",{className:"text-center lg:text-left text-white",children:[(0,Qe.jsxs)("h1",{className:"text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-semibold leading-tight tracking-tight",children:["Your Trusted Supplier For",(0,Qe.jsx)("span",{className:"block mt-2 amazon-hero-title-gradient",children:"Machine Filtration"})]}),(0,Qe.jsx)("p",{className:"mt-6 text-xl sm:text-2xl font-medium text-white max-w-xl mx-auto lg:mx-0 leading-snug",children:"Reliable filtration solutions since 2020 — engineered for distributors and industry across East Africa."}),(0,Qe.jsx)("p",{className:"mt-4 text-lg amazon-text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed",children:"Air, fuel, oil, and hydraulic lines; premium conical and cartridge designs for high-performance intake and engine protection."}),(0,Qe.jsxs)("div",{className:"mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start",children:[(0,Qe.jsxs)(Ie,{to:"/manufacturing-range",className:"group amazon-btn-hero-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg",children:[(0,Qe.jsx)(ct,{className:"w-6 h-6"}),"Explore products",(0,Qe.jsx)(xt,{className:"w-5 h-5 group-hover:translate-x-1 transition-transform"})]}),(0,Qe.jsxs)(Ie,{to:"/contact",className:"amazon-btn-hero-outline inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg",children:[(0,Qe.jsx)(pt,{className:"w-6 h-6"}),"Get a quote"]})]})]})]})})]})`;

const oldHero = s.slice(h0, h1);
if (!oldHero.endsWith(")")) {
  console.warn("unexpected oldHero tail", oldHero.slice(-80));
}

s = s.slice(0, h0) + heroNew + s.slice(h1);

function countVar(name, str) {
  return (str.match(new RegExp("\\b" + name + "\\b", "g")) || []).length;
}

const leftDef = /,ft=We\("ChevronLeft",\[\["path"[^]*?\]\]\)/;
const rightDef = /,ht=We\("ChevronRight",\[\["path"[^]*?\]\]\)/;
const ftTotal = countVar("ft", s);
const htTotal = countVar("ht", s);
console.log("ft refs", ftTotal, "ht refs", htTotal);
if (ftTotal <= 1 && htTotal <= 1) {
  const out2 = s.replace(leftDef, "").replace(rightDef, "");
  if (out2.length !== s.length) {
    s = out2;
    console.log("removed chevron icon defs");
  } else {
    console.warn("chevron regex did not match");
  }
}

fs.writeFileSync(path, s);
console.log("patched", path, "len", s.length);

const fs = require("fs");
const path = "static/js/main.d12675dc.js";
let s = fs.readFileSync(path, "utf8");

const sig = "gt=()=>{";
const start = s.indexOf(sig);
if (start < 0) throw new Error("gt=()=>{ not found");

let i = start + sig.length - 1;
let depth = 0;
for (; i < s.length; i++) {
  const c = s[i];
  if (c === "{") depth++;
  else if (c === "}") {
    depth--;
    if (depth === 0) {
      i++;
      break;
    }
  }
}
const oldGt = s.slice(start, i);
console.log("old gt len", oldGt.length);

// Chevron defs to remove if unused outside old hero
const chevLeft = 'ft=We("ChevronLeft",';
const chevRight = 'ht=We("ChevronRight",';
const cl = s.indexOf(chevLeft);
const cr = s.indexOf(chevRight);

const beforeGt = s.slice(0, start);
const afterGt = s.slice(i);

function countVar(name, str) {
  const re = new RegExp("\\b" + name + "\\b", "g");
  return (str.match(re) || []).length;
}

const ftInBefore = countVar("ft", beforeGt.slice(Math.max(0, cl)));
const htInBefore = countVar("ht", beforeGt.slice(Math.max(0, cr)));
// ft/ht only in chevron defs line area - check full module from cl to i
const modChunk = s.slice(cl, i);
console.log("ft in modChunk", countVar("ft", modChunk), "ht", countVar("ht", modChunk));

const newGt = `gt=()=>{const t="".concat(typeof window!=="undefined"&&void 0!==window.__AMAZON_API_BASE__?window.__AMAZON_API_BASE__:"","/images/hero/homepage-air-filter-hero.png"),n=[{title:"Products",description:"Premium air, fuel, and oil filtration engineered for high-performance intake, OEM-style programmes, and volume manufacturing in Nairobi.",path:"/manufacturing-range",image:"/images/home/industry-triple-filters.png",imageAlt:"Performance air filters and carburettor assemblies — industrial filtration product lines"},{title:"Industries Served",description:"Automotive, performance, fleet, and industrial equipment — filtration built for demanding engine bays and machinery across East Africa.",path:"/industries",image:"/images/home/industry-engine-bay.png",imageAlt:"High-performance engine bay with intake filtration and engine components"},{title:"Services",description:"Distributor programmes, fleet support, and reliable supply — factory-direct logistics and partnership-focused service from our Kenya plant.",path:"/services",image:"/images/home/industry-delivery.png",imageAlt:"Delivery professional representing supply chain and partner logistics"}],r=[{icon:(0,Qe.jsx)(mt,{className:"w-12 h-12 text-primary-600"}),title:"Reliable Quality",description:"All our filters meet international standards and are rigorously tested for performance and durability."},{icon:(0,Qe.jsx)(mt,{className:"w-12 h-12 text-primary-600"}),title:"Industry Expertise",description:"Over 3 years of experience serving automotive, construction, agriculture, and industrial sectors."},{icon:(0,Qe.jsx)(pt,{className:"w-12 h-12 text-primary-600"}),title:"Customer Focus",description:"Dedicated support team providing technical consultation and after-sales service."}];return(0,Qe.jsxs)("div",{className:"min-h-screen overflow-x-hidden",children:[(0,Qe.jsx)("section",{className:"relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900",children:[(0,Qe.jsx)("div",{className:"absolute inset-0 opacity-40",style:{background:"radial-gradient(ellipse 80% 60% at 70% 40%, rgba(59, 130, 246, 0.35), transparent 55%)"},"aria-hidden":!0}),(0,Qe.jsx)("div",{className:"relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24",children:(0,Qe.jsx)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center",children:[(0,Qe.jsxs)("div",{className:"text-center lg:text-left text-white order-2 lg:order-1",children:[(0,Qe.jsxs)("h1",{className:"text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",children:["Your Trusted Supplier For",(0,Qe.jsx)("span",{className:"block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-emerald-300 mt-1",children:"Machine Filtration"})]}),(0,Qe.jsx)("p",{className:"mt-4 text-lg sm:text-xl text-slate-200 max-w-xl mx-auto lg:mx-0",children:"Reliable filtration solutions since 2020 — air, fuel, oil, and hydraulic filters engineered for distributors and industry across East Africa."}),(0,Qe.jsx)("p",{className:"mt-3 text-base text-slate-300 max-w-xl mx-auto lg:mx-0",children:"Premium conical and cartridge designs for high-performance intake and engine protection."}),(0,Qe.jsxs)("div",{className:"mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start",children:[(0,Qe.jsxs)(Ie,{to:"/manufacturing-range",className:"group inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg",children:[(0,Qe.jsx)(ct,{className:"w-6 h-6"}),"Explore products",(0,Qe.jsx)(xt,{className:"w-5 h-5 group-hover:translate-x-1 transition-transform"})]}),(0,Qe.jsxs)(Ie,{to:"/contact",className:"inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold text-lg",children:[(0,Qe.jsx)(pt,{className:"w-6 h-6"}),"Get a quote"]})]})]}),(0,Qe.jsx)("div",{className:"order-1 lg:order-2 flex justify-center lg:justify-end",children:(0,Qe.jsx)("div",{className:"w-full max-w-md lg:max-w-lg",children:(0,Qe.jsx)("img",{src:t,alt:"High-performance conical air filter — premium filtration for engines and industrial use",className:"w-full h-auto max-h-[min(70vh,520px)] object-contain object-center mx-auto",width:520,height:780,decoding:"async",fetchPriority:"high"})})})]})})]}),(0,Qe.jsx)("section",{className:"bg-[#e5e5e3] border-t border-black/10",children:[(0,Qe.jsx)("div",{className:"container mx-auto px-4 pt-12 md:pt-16 pb-2 md:pb-4",children:(0,Qe.jsxs)("div",{className:"text-center mb-10 md:mb-14 max-w-3xl mx-auto",children:[(0,Qe.jsx)("h2",{className:"text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 tracking-tight",children:"Built for industry partners"}),(0,Qe.jsx)("p",{className:"text-base sm:text-lg text-neutral-600 leading-relaxed",children:"Distributor programmes, fleet support, and OEM-style runs — engineered and built in our Nairobi factory"})]})})].concat(n.map((e,t)=>(0,Qe.jsx)("div",{className:"border-t border-black/10 bg-[#e5e5e3] last:border-b last:border-black/10",children:(0,Qe.jsx)("div",{className:"container mx-auto px-4 py-10 md:py-16",children:(0,Qe.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto",children:[(0,Qe.jsx)("div",{className:"min-w-0",children:(0,Qe.jsx)("div",{className:"overflow-hidden rounded-lg border border-neutral-900 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]",children:(0,Qe.jsx)("div",{className:"relative aspect-[4/3] w-full bg-neutral-100",children:(0,Qe.jsx)("img",{src:"".concat(typeof window!=="undefined"&&void 0!==window.__AMAZON_API_BASE__?window.__AMAZON_API_BASE__:"",e.image),alt:e.imageAlt,className:"absolute inset-0 h-full w-full object-cover",loading:0===t?"eager":"lazy",decoding:"async"})})})}),(0,Qe.jsxs)("div",{className:"text-left",children:[(0,Qe.jsx)("h3",{className:"text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight",children:e.title}),(0,Qe.jsx)("p",{className:"text-base md:text-lg text-neutral-600 leading-relaxed mb-6",children:e.description}),(0,Qe.jsxs)(Ie,{to:e.path,className:"inline-flex items-center gap-2 text-base font-bold text-blue-600 hover:text-blue-800 transition-colors",children:["See more",(0,Qe.jsx)(xt,{className:"w-5 h-5"})]})]})]})})},t)))})),(0,Qe.jsx)("section",{className:"py-12 md:py-16 bg-gray-50",children:(0,Qe.jsxs)("div",{className:"container mx-auto px-4",children:[(0,Qe.jsxs)("div",{className:"text-center mb-8 md:mb-12",children:[(0,Qe.jsx)("h2",{className:"text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4",children:"Why Choose Amazon Filtration?"}),(0,Qe.jsx)("p",{className:"text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto",children:"We deliver excellence through quality, expertise, and customer commitment"})]}),(0,Qe.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",children:r.map((e,t)=>(0,Qe.jsxs)("div",{className:"text-center p-4 md:p-6",children:[(0,Qe.jsx)("div",{className:"flex justify-center mb-4 md:mb-6",children:e.icon}),(0,Qe.jsx)("h3",{className:"text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4",children:e.title}),(0,Qe.jsx)("p",{className:"text-sm md:text-base text-gray-600 leading-relaxed",children:e.description})]},t))})]})}),(0,Qe.jsx)("section",{className:"py-12 md:py-16 bg-white",children:(0,Qe.jsxs)("div",{className:"container mx-auto px-4",children:[(0,Qe.jsxs)("div",{className:"text-center mb-8 md:mb-12",children:[(0,Qe.jsx)("h2",{className:"text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4",children:"Our Product Categories"}),(0,Qe.jsx)("p",{className:"text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto",children:"Comprehensive range of filtration solutions for every application"})]}),(0,Qe.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",children:[{name:"Air Filters",image:"/images/Air-Filters.jpeg",count:"40+"},{name:"Fuel Filters",image:"/images/Fuel-Filter.jpg",count:"30+"},{name:"Oil Filters",image:"/images/Oil-Filter.jpg",count:"50+"},{name:"Hydraulic Return Filters",image:"/images/Hydraulic-Return-Filter.jpg",count:"25+"},{name:"Coolant Filters",image:"/images/Coolant-Filter.jpg",count:"20+"},{name:"Cabin Filters",image:"/images/Cabin-Filter.jpg",count:"15+"}].map((e,t)=>(0,Qe.jsxs)("div",{className:"group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",children:[(0,Qe.jsx)("div",{className:"aspect-w-16 aspect-h-12",children:(0,Qe.jsx)("img",{src:e.image,alt:"".concat(e.name," for industrial applications"),loading:"lazy",decoding:"async",className:"w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-300",onError:t=>{t.target.src="https://via.placeholder.com/400x300/1e40af/ffffff?text=".concat(encodeURIComponent(e.name)),console.log("Failed to load image for ".concat(e.name,": ").concat(e.image))}})}),(0,Qe.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"}),(0,Qe.jsxs)("div",{className:"absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white",children:[(0,Qe.jsx)("h3",{className:"text-lg md:text-xl font-semibold mb-2",children:e.name}),(0,Qe.jsxs)("p",{className:"text-xs md:text-sm text-gray-200 mb-3 md:mb-4",children:[e.count," Products Available"]}),(0,Qe.jsxs)(Ie,{to:"/manufacturing-range?category=".concat(e.name),className:"inline-flex items-center text-primary-300 hover:text-primary-200 font-medium text-sm md:text-base",children:["View Products",(0,Qe.jsx)(xt,{className:"w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"})]})]})]},t))})]})}),(0,Qe.jsx)("section",{className:"py-12 md:py-16 bg-primary-600",children:(0,Qe.jsxs)("div",{className:"container mx-auto px-4 text-center",children:[(0,Qe.jsx)("h2",{className:"text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6",children:"Ready to Find Your Perfect Filtration Solution?"}),(0,Qe.jsx)("p",{className:"text-base sm:text-lg md:text-xl text-primary-100 mb-6 md:mb-8 max-w-2xl mx-auto",children:"Contact our experts today for personalized recommendations and competitive pricing"}),(0,Qe.jsxs)("div",{className:"flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto",children:[(0,Qe.jsx)(Ie,{to:"/contact",className:"bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base",children:"Get Free Quote"}),(0,Qe.jsx)(Ie,{to:"/manufacturing-range",className:"border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base",children:"Browse Products"})]})]})})]})}`;

let out = s.slice(0, start) + newGt + s.slice(i);

// Remove ChevronLeft and ChevronRight icon defs if only used in removed hero
const ftTotal = countVar("ft", out);
const htTotal = countVar("ht", out);
console.log("ft total", ftTotal, "ht total", htTotal);

if (ftTotal <= 1 && htTotal <= 1) {
  // each might appear once in definition only - actually definition uses ft= and body uses ft
  // after removal, ft might only appear in dead code line
  const leftDef = /,ft=We\("ChevronLeft",\[\["path"[^]*?\]\]\)/;
  const rightDef = /,ht=We\("ChevronRight",\[\["path"[^]*?\]\]\)/;
  const out2 = out.replace(leftDef, "").replace(rightDef, "");
  if (out2.length === out.length) {
    console.warn("chevron def regex did not match");
  } else {
    out = out2;
    console.log("removed chevron defs");
  }
}

fs.writeFileSync(path, out);
console.log("written", path, "new len", out.length);

// Syntax check
try {
  new Function(out.split("\n").slice(1).join("\n")); // skip license comment line?
} catch (e) {
  console.error("syntax check failed", e.message);
}

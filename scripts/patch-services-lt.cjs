/**
 * Patches the Services page component (Lt) in static/js/main.d12675dc.js
 * Run: node scripts/patch-services-lt.cjs
 */
const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, '..', 'static', 'js', 'main.d12675dc.js');

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');

const services = [
  {
    tag: 'ENGINEERING',
    title: 'Custom Filter Design & Engineering',
    description:
      'Our engineering team designs custom filtration solutions tailored to your specific requirements and applications.',
    image: '/amazon/images/services/custom-design-engineering.jpg',
    features: [
      'Custom filter specifications',
      'CAD design and modeling',
      'Prototype development',
      'Performance testing',
      'Technical documentation',
    ],
    benefits: 'Get exactly what you need with optimized performance and cost efficiency',
  },
  {
    tag: 'SUPPLY',
    title: 'OEM & Aftermarket Supply',
    description:
      'Comprehensive supply chain management for both original equipment manufacturers and aftermarket distribution.',
    image: '/amazon/images/services/oem-aftermarket-supply.jpg',
    features: [
      'OEM partnerships',
      'Aftermarket distribution',
      'Quality assurance',
      'Supply chain management',
      'Inventory optimization',
    ],
    benefits: 'Reliable supply with consistent quality and competitive pricing',
  },
  {
    tag: 'LOGISTICS',
    title: 'Bulk Distribution & Logistics',
    description:
      'Efficient logistics and distribution services for large-scale orders and international shipments.',
    image: '/amazon/images/services/bulk-distribution-logistics.jpg',
    features: [
      'Bulk order processing',
      'International shipping',
      'Warehouse management',
      'Inventory tracking',
      'Delivery optimization',
    ],
    benefits: 'Streamlined logistics with real-time tracking and on-time delivery',
  },
  {
    tag: 'CONSULTING',
    title: 'Technical Consultation & Training',
    description:
      'Expert technical support and training programs to help your team optimize filtration systems.',
    image: '/amazon/images/services/technical-consultation-training.jpg',
    features: [
      'Technical consultation',
      'Staff training programs',
      'System optimization',
      'Troubleshooting support',
      'Best practices guidance',
    ],
    benefits: 'Maximize system performance with expert knowledge and training',
  },
  {
    tag: 'SUPPORT',
    title: 'After-Sales Support & Warranty',
    description:
      'Comprehensive after-sales support including warranty services and ongoing maintenance assistance.',
    image: '/amazon/images/services/customer-support-service.jpg',
    features: [
      'Warranty coverage',
      'Technical support',
      'Maintenance guidance',
      'Replacement services',
      'Performance monitoring',
    ],
    benefits: 'Peace of mind with comprehensive support and warranty coverage',
  },
  {
    tag: 'QUALITY',
    title: 'Quality Assurance & Testing',
    description:
      'Rigorous quality testing and certification to ensure all products meet international standards.',
    image: '/amazon/images/services/quality-testing-certification.jpg',
    features: [
      'ISO certification',
      'Performance testing',
      'Quality control',
      'Compliance verification',
      'Documentation support',
    ],
    benefits: 'Guaranteed quality with certified testing and compliance standards',
  },
];

const iconIds = ['ct', 'Ft', 'ut', 'pt', 'Rt', 'mt'];
const iconClass = [
  'w-7 h-7 text-cyan-400/90',
  'w-7 h-7 text-violet-400/90',
  'w-7 h-7 text-amber-300/90',
  'w-7 h-7 text-cyan-400/90',
  'w-7 h-7 text-violet-400/90',
  'w-7 h-7 text-amber-300/90',
];

const gridCell = [
  'lg:col-span-7 lg:row-span-2 min-h-[440px] sm:min-h-[480px]',
  'lg:col-span-5 lg:col-start-8',
  'lg:col-span-5 lg:col-start-8 lg:row-start-2',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
];

function buildDataArray() {
  return services
    .map((s, i) => {
      const feats = s.features.map((f) => `"${esc(f)}"`).join(',');
      return `{tag:"${esc(s.tag)}",title:"${esc(s.title)}",description:"${esc(
        s.description
      )}",icon:(0,Qe.jsx)(${iconIds[i]},{className:"${iconClass[i]}"}),image:"${esc(
        s.image
      )}",features:[${feats}],benefits:"${esc(s.benefits)}"}`;
    })
    .join(',');
}

function resolveArrowRightId(bundle) {
  const m =
    bundle.match(/children:"Learn More",children:\(0,Qe\.jsx\)\(([a-zA-Z]+),/) ||
    bundle.match(/\(0,Qe\.jsx\)\(([a-zA-Z]+),\{className:"w-4 h-4 ml-2"/);
  if (!m) throw new Error('Could not resolve ArrowRight component id in bundle');
  return m[1];
}

function buildLt(bundle) {
  const arrowId = resolveArrowRightId(bundle);
  const eArr = buildDataArray();
  const gridQuoted = gridCell.map(esc);

  const serviceCards = `(0,Qe.jsx)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 lg:gap-5 auto-rows-min",children:e.map((t,n)=>(0,Qe.jsxs)("article",{className:"group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/35 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:border-white/15 hover:-translate-y-0.5 "+(["${gridQuoted.join(
    '","'
  )}"][n]),children:[(0,Qe.jsxs)("div",{className:0===n?"relative h-56 sm:h-64 shrink-0":"relative h-36 sm:h-40 shrink-0",children:[(0,Qe.jsx)("img",{src:t.image,alt:"",className:"absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"}),(0,Qe.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"}),(0,Qe.jsx)("div",{className:"absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3",children:(0,Qe.jsx)("div",{className:"flex items-center gap-3 min-w-0",children:[(0,Qe.jsx)("div",{className:"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-black/40 backdrop-blur-md",children:t.icon}),(0,Qe.jsxs)("div",{className:"min-w-0",children:[(0,Qe.jsx)("span",{className:"inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-200 ring-1 ring-white/10",children:t.tag}),(0,Qe.jsx)("h2",{className:0===n?"font-bold text-white leading-tight mt-1 text-xl md:text-2xl":"font-bold text-white leading-tight mt-1 text-base md:text-lg",children:t.title})]})]})})]}),(0,Qe.jsxs)("div",{className:"flex flex-1 flex-col p-5 md:p-6 pt-4",children:[(0,Qe.jsx)("p",{className:0===n?"text-zinc-400 text-sm md:text-base leading-relaxed":"text-zinc-400 text-xs md:text-sm leading-relaxed",children:t.description}),(0,Qe.jsx)("ul",{className:0===n?"mt-4 space-y-2":"mt-4 space-y-2 flex-1",children:t.features.slice(0,0===n?5:3).map((e,r)=>(0,Qe.jsxs)("li",{className:"flex items-start gap-2 text-xs md:text-sm text-zinc-300",children:[(0,Qe.jsx)("span",{className:"mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/80"}),(0,Qe.jsx)("span",{children:e})]},r))}),(0,Qe.jsx)("div",{className:"mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/5 px-4 py-3",children:(0,Qe.jsxs)("p",{className:"text-xs md:text-sm text-violet-100/90 leading-relaxed",children:[(0,Qe.jsx)("span",{className:"font-semibold text-white",children:"Key benefit · "}),(0,Qe.jsx)("span",{children:t.benefits})]})}),(0,Qe.jsxs)(Ie,{to:"/contact",className:"mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 hover:border-white/25",children:["Learn more",(0,Qe.jsx)(${arrowId},{className:"h-4 w-4 text-cyan-300/90"})]})]})]},n))})`;

  const processBlock = `(0,Qe.jsxs)("div",{className:"mt-12 md:mt-16 rounded-[1.75rem] border border-white/10 bg-zinc-950/50 p-6 md:p-10",children:[(0,Qe.jsxs)("div",{className:"mb-8 md:mb-10 max-w-2xl",children:[(0,Qe.jsx)("span",{className:"inline-block rounded-full bg-cyan-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-cyan-200 ring-1 ring-cyan-400/25",children:"How we work"}),(0,Qe.jsx)("h2",{className:"mt-3 text-2xl md:text-3xl font-bold text-white tracking-tight",children:"Our service process"}),(0,Qe.jsx)("p",{className:"mt-2 text-zinc-400 text-sm md:text-base",children:"A systematic approach to delivering exceptional filtration solutions."})]}),(0,Qe.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5",children:[{step:"01",title:"Initial Consultation",description:"We discuss your requirements and analyze your current filtration needs"},{step:"02",title:"Solution Design",description:"Our experts design the optimal filtration solution for your application"},{step:"03",title:"Implementation",description:"We implement the solution with full support and training"},{step:"04",title:"Ongoing Support",description:"Continuous support and optimization to ensure peak performance"}].map((e,t)=>(0,Qe.jsxs)("div",{className:"rounded-2xl border border-white/10 bg-black/30 p-5 md:p-6 hover:border-violet-400/25 transition-colors",children:[(0,Qe.jsx)("div",{className:"inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-500/10 text-sm font-bold text-cyan-200",children:e.step}),(0,Qe.jsx)("h3",{className:"mt-4 text-base font-semibold text-white",children:e.title}),(0,Qe.jsx)("p",{className:"mt-2 text-sm text-zinc-500 leading-relaxed",children:e.description})]},t))})]})`;

  const certBlock = `(0,Qe.jsxs)("div",{className:"mt-8 md:mt-10",children:[(0,Qe.jsxs)("div",{className:"mb-6 md:mb-8",children:[(0,Qe.jsx)("h2",{className:"text-2xl md:text-3xl font-bold text-white tracking-tight",children:"Certifications & standards"}),(0,Qe.jsx)("p",{className:"mt-2 text-sm md:text-base text-zinc-400 max-w-2xl",children:"We maintain the highest standards of quality and compliance."})]}),(0,Qe.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5",children:[{name:"ISO 9001:2015",description:"Quality Management System"},{name:"ISO 14001:2015",description:"Environmental Management"},{name:"OHSAS 18001",description:"Occupational Health & Safety"},{name:"IATF 16949",description:"Automotive Quality Management"}].map((e,t)=>(0,Qe.jsxs)("div",{className:"rounded-2xl border border-white/10 bg-zinc-900/40 p-6 text-center hover:border-amber-400/20 transition-colors",children:[(0,Qe.jsx)("div",{className:"mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40",children:(0,Qe.jsx)(mt,{className:"h-7 w-7 text-amber-300/90"})}),(0,Qe.jsx)("h3",{className:"mt-4 text-sm font-semibold text-white",children:e.name}),(0,Qe.jsx)("p",{className:"mt-2 text-xs text-zinc-500 leading-relaxed",children:e.description})]},t))})]})`;

  const ctaBlock = `(0,Qe.jsxs)("div",{className:"mt-12 md:mt-16 overflow-hidden rounded-[1.75rem] border border-violet-500/30 bg-gradient-to-r from-violet-600/90 via-fuchsia-700/80 to-cyan-700/70 p-8 md:p-10 text-center shadow-[0_0_60px_rgba(139,92,246,0.25)]",children:[(0,Qe.jsx)("h2",{className:"text-2xl md:text-3xl font-bold text-white",children:"Ready to experience our services?"}),(0,Qe.jsx)("p",{className:"mt-3 text-sm md:text-base text-white/85 max-w-2xl mx-auto leading-relaxed",children:"Contact us today to discuss your filtration needs and discover how our programmes can support your operation."}),(0,Qe.jsxs)("div",{className:"mt-6 flex flex-col sm:flex-row gap-3 justify-center",children:[(0,Qe.jsx)(Ie,{to:"/contact",className:"inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-zinc-100",children:"Get service quote"}),(0,Qe.jsx)(Ie,{to:"/about",className:"inline-flex items-center justify-center rounded-xl border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10",children:"Learn about us"})]})]})`;

  const heroBlock = `(0,Qe.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 mb-8 md:mb-10",children:[(0,Qe.jsxs)("div",{className:"lg:col-span-8 relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-zinc-900/95 via-zinc-950 to-black p-8 md:p-10 shadow-[0_0_80px_rgba(34,211,238,0.07)]",children:[(0,Qe.jsx)("div",{className:"pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.18),transparent_55%)]"}),(0,Qe.jsxs)("div",{className:"relative",children:[(0,Qe.jsxs)("div",{className:"flex flex-wrap gap-2 mb-5",children:[(0,Qe.jsx)("span",{className:"rounded-full bg-amber-400/15 text-amber-100 text-[11px] font-semibold px-3 py-1 border border-amber-400/25 uppercase tracking-wider",children:"B2B"}),(0,Qe.jsx)("span",{className:"rounded-full bg-violet-500/20 text-violet-100 text-[11px] font-semibold px-3 py-1 border border-violet-400/35 uppercase tracking-wider",children:"Filtration"}),(0,Qe.jsx)("span",{className:"rounded-full bg-cyan-500/15 text-cyan-100 text-[11px] font-semibold px-3 py-1 border border-cyan-400/25 uppercase tracking-wider",children:"Made in Kenya"})]}),(0,Qe.jsx)("h1",{className:"text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white",children:"Services."}),(0,Qe.jsx)("p",{className:"mt-4 text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed",children:"A modular delivery model — design, supply, logistics, training, lifecycle support, and certified quality — presented in a clean bento layout on a black canvas."})]})]}),(0,Qe.jsxs)("div",{className:"lg:col-span-4 flex flex-col gap-4 md:gap-5",children:[(0,Qe.jsxs)("div",{className:"flex-1 min-h-[140px] rounded-[1.75rem] border border-cyan-500/25 bg-zinc-950/90 p-6 md:p-7 flex flex-col justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",children:[(0,Qe.jsx)("p",{className:"text-[11px] uppercase tracking-[0.22em] text-cyan-300/90 font-semibold",children:"Programmes"}),(0,Qe.jsx)("p",{className:"text-4xl md:text-5xl font-bold text-white mt-1 tabular-nums",children:"6"}),(0,Qe.jsx)("p",{className:"text-sm text-zinc-500 mt-2",children:"Parallel service lines you can engage independently or as a bundle."})]}),(0,Qe.jsxs)("div",{className:"rounded-[1.75rem] border border-white/10 bg-zinc-900/55 p-6 md:p-7",children:[(0,Qe.jsx)("p",{className:"text-[11px] uppercase tracking-[0.22em] text-zinc-500 font-semibold",children:"Coverage"}),(0,Qe.jsx)("p",{className:"text-white font-medium mt-2 leading-snug",children:"OEM-style programmes · Aftermarket · Industrial fleets"})]})]})]})`;

  const inner = `(0,Qe.jsxs)("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16",children:[${heroBlock},${serviceCards},${processBlock},${certBlock},${ctaBlock}]})`;

  return `Lt=()=>{const e=[${eArr}];return(0,Qe.jsxs)("div",{className:"min-h-screen bg-black text-zinc-100 overflow-x-hidden antialiased",children:[${inner}]})}`;
}

function main() {
  let bundle = fs.readFileSync(bundlePath, 'utf8');
  const start = bundle.indexOf('Lt=()=>{const e=[');
  const endMarker = ',Ot=We("Target"';
  const end = bundle.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    throw new Error('Could not locate Lt component boundaries in bundle');
  }
  const oldLt = bundle.slice(start, end);
  const newLt = buildLt(bundle);
  if (!oldLt.startsWith('Lt=()=>{const e=[')) throw new Error('Unexpected oldLt prefix');
  const next = bundle.slice(0, start) + newLt + bundle.slice(end);
  fs.writeFileSync(bundlePath, next);
  console.log('Patched Lt:', oldLt.length, '->', newLt.length);
}

main();

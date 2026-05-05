import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { lineSlugFromName } from './productLineCatalog.js';

const publicUrl = () =>
  typeof window !== 'undefined' && window.__AMAZON_API_BASE__ !== undefined
    ? window.__AMAZON_API_BASE__
    : '';

const sectionId = (name) => `category-${lineSlugFromName(name)}`;

const LINE_DEFS = [
  {
    name: 'Air Filters',
    imageFile: 'Air-Filters.png',
    bullets: [
      'Panel, round, and conical intake media for automotive and industrial air circuits.',
      'Dust-loading curves matched to East African operating conditions.',
      'Programmes for distributors with MOQs and factory labelling.',
    ],
  },
  {
    name: 'Fuel Filters',
    imageFile: 'Fuel-Filter.png',
    bullets: [
      'Spin-on and cartridge assemblies for diesel and petrol systems.',
      'Water separation and particulate control for fleet and plant uptime.',
      'Cross-reference support for common OEM service intervals.',
    ],
  },
  {
    name: 'Oil Filters',
    imageFile: 'Oil-Filter.png',
    bullets: [
      'Full-flow and bypass-compatible designs for passenger, commercial, and off-road engines.',
      'Media packs specified for extended drain where fluids allow.',
      'Volume supply for workshops and regional distributors.',
    ],
  },
  {
    name: 'Hydraulic Return Filters',
    imageFile: 'Hydraulic-Return-Filter.png',
    bullets: [
      'Return-line protection for mobile hydraulics and stationary power units.',
      'Compatible element geometries for common reservoir and manifold layouts.',
      'Technical sign-off on pressure drop and cleanliness targets.',
    ],
  },
  {
    name: 'Coolant Filters',
    imageFile: 'Coolant-Filter.png',
    bullets: [
      'Cooling system integrity for engines and industrial heat-transfer loops.',
      'Corrosion control and debris management for mixed-metal circuits.',
      'Fleet and OEM-style batching from Nairobi production.',
    ],
  },
  {
    name: 'Cabin Filters',
    imageFile: 'Cabin-Filter.png',
    bullets: [
      'Pollen, dust, and odour control for operator comfort in on- and off-highway cabs.',
      'Standard and activated-carbon options for regional programmes.',
      'Packaging and part numbering aligned to your catalogue.',
    ],
  },
];

const FILTER_LINE_IO = { threshold: 0.14, rootMargin: '0px 0px -8% 0px' };

function FilterLineRow({ line, index, base }) {
  const imageOnRight = index % 2 === 1;
  const articleRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = articleRef.current;
    if (!root) return undefined;
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
          break;
        }
      }
    }, FILTER_LINE_IO);
    obs.observe(root);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={articleRef}
      id={sectionId(line.name)}
      className={[
        'pl-line-split scroll-mt-28',
        imageOnRight ? 'pl-line-split--copy-left' : 'pl-line-split--copy-right',
        inView ? 'pl-line-split--in-view' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={['pl-line-media', imageOnRight ? 'lg:order-2' : '', 'py-4 sm:py-6 lg:py-8 min-w-0']
          .filter(Boolean)
          .join(' ')}
      >
        <div className="pl-line-card rounded-2xl overflow-hidden">
          <img
            src={line.image}
            alt={line.name}
            className="w-full h-56 sm:h-72 object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${base}/images/logo.png`;
            }}
          />
        </div>
      </div>
      <div
        className={['pl-line-copy', imageOnRight ? 'lg:order-1' : '', 'py-3 sm:py-4 lg:py-6 min-w-0']
          .filter(Boolean)
          .join(' ')}
      >
        <p className="text-xs font-bold uppercase tracking-widest pl-accent-text mb-2">
          Line {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="text-2xl sm:text-3xl font-extrabold pl-line-title mb-4 tracking-tight">{line.name}</h3>
        <ul className="space-y-3 mb-8">
          {line.bullets.map((b) => (
            <li key={b} className="flex gap-3 pl-line-body leading-relaxed">
              <CheckCircle2
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: 'var(--pl-lime, #2997ff)' }}
                strokeWidth={2}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <Link to={`line/${lineSlugFromName(line.name)}`} relative="path" className="pl-line-cta">
          View more
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
}

const landingStyles = `
#products-evolu-landing {
  --pl-lime: #2997ff;
  --pl-lime-hover: #1a7fd9;
  --pl-hero: #f4f4f3;
  --pl-card: #1a1a1a;
}
#products-evolu-landing .pl-hero-bg {
  background-color: var(--pl-hero) !important;
}
#products-evolu-landing .pl-text-ink {
  color: #0a0a0a !important;
}
#products-evolu-landing .pl-text-sub {
  color: #64748b !important;
}
#products-evolu-landing .pl-headline {
  font-size: clamp(2.75rem, 7vw, 5rem);
  line-height: 0.98;
  font-weight: 800;
  letter-spacing: -0.045em;
  color: #0a0a0a !important;
}
#products-evolu-landing .pl-cta {
  background-color: var(--pl-lime) !important;
  color: #ffffff !important;
  font-weight: 700;
  clip-path: polygon(16px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 16px);
  padding: 1rem 1.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease, transform 0.2s ease;
  border: none;
  cursor: pointer;
  text-decoration: none;
}
#products-evolu-landing .pl-cta:hover {
  background-color: var(--pl-lime-hover) !important;
  transform: translateY(-1px);
}
#products-evolu-landing .pl-card-dark {
  background: var(--pl-card) !important;
  color: #fafafa !important;
  box-shadow: 0 24px 80px rgba(0,0,0,0.18) !important;
}
#products-evolu-landing .pl-accent-text {
  color: var(--pl-lime) !important;
}
#products-evolu-landing .pl-pagination-big {
  font-size: clamp(4rem, 12vw, 7.5rem);
  font-weight: 800;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: #ffffff !important;
}
#products-evolu-landing .pl-pagination-small {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255,255,255,0.45) !important;
  align-self: flex-end;
  padding-bottom: 0.5rem;
}
#products-evolu-landing .pl-vertical-label {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.9) !important;
}
#products-evolu-landing .pl-vline {
  width: 2px;
  min-height: 7rem;
  background: var(--pl-lime) !important;
  border-radius: 9999px;
}
#products-evolu-landing .pl-hero-img {
  filter: drop-shadow(0 32px 64px rgba(0,0,0,0.12));
}
#products-evolu-landing .pl-hero-visual {
  background-color: #ffffff !important;
}
@media (min-width: 1024px) {
  #products-evolu-landing .pl-hero-visual {
    justify-content: flex-end !important;
    align-items: flex-end !important;
  }
  #products-evolu-landing .pl-hero-img {
    margin-left: auto !important;
    margin-right: 0 !important;
    object-position: right bottom !important;
  }
}
#products-evolu-landing #filter-lines .pl-line-card {
  background: #ffffff !important;
  border: 1px solid rgba(0,0,0,0.06) !important;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06) !important;
}
/* h2/h3: beat #root h2 and #root { color: muted } inheritance (see amazon-dark-theme.css) */
#products-evolu-landing #filter-lines h2.pl-text-ink,
#products-evolu-landing #filter-lines h3.pl-line-title {
  color: #ffffff !important;
}
#products-evolu-landing #filter-lines .pl-text-ink {
  color: #ffffff !important;
}
#products-evolu-landing #filter-lines .pl-line-title {
  color: #ffffff !important;
}
#products-evolu-landing #filter-lines .pl-text-sub {
  color: rgba(255, 255, 255, 0.72) !important;
}
#products-evolu-landing #filter-lines .pl-line-body {
  color: rgba(255, 255, 255, 0.82) !important;
}
#products-evolu-landing #filter-lines .pl-line-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 700;
  font-size: 0.875rem;
  color: #ffffff !important;
  background: var(--pl-lime) !important;
  padding: 0.65rem 1.25rem;
  clip-path: polygon(10px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 10px);
  text-decoration: none;
  transition: background 0.2s;
}
#products-evolu-landing #filter-lines .pl-line-cta:hover {
  background: var(--pl-lime-hover) !important;
}
/* Filter line rows: explicit column gap + minmax so image/copy never overlap (Tailwind-only gaps were too tight / fragile) */
#products-evolu-landing #filter-lines .pl-line-split {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 3.5rem;
  column-gap: 0;
  align-items: start;
}
@media (min-width: 1024px) {
  #products-evolu-landing #filter-lines .pl-line-split {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    row-gap: 0;
  }
  /* Image left, copy right — extra air between photo and text */
  #products-evolu-landing #filter-lines .pl-line-split.pl-line-split--copy-right {
    column-gap: clamp(2.75rem, 7vw, 6.5rem);
  }
  #products-evolu-landing #filter-lines .pl-line-split.pl-line-split--copy-right .pl-line-media {
    margin-inline-end: clamp(1rem, 3vw, 2.25rem);
    padding-inline-end: clamp(0.5rem, 1.5vw, 1rem);
  }
  #products-evolu-landing #filter-lines .pl-line-split.pl-line-split--copy-right .pl-line-copy {
    margin-inline-start: clamp(0.75rem, 2vw, 1.5rem);
    padding-inline-start: clamp(0.5rem, 1.5vw, 1rem);
  }
  /* Copy left, image right */
  #products-evolu-landing #filter-lines .pl-line-split.pl-line-split--copy-left {
    column-gap: clamp(2rem, 5vw, 4rem);
  }
  #products-evolu-landing #filter-lines .pl-line-split.pl-line-split--copy-left .pl-line-media {
    margin-inline-start: clamp(0.75rem, 2vw, 1.5rem);
    padding-inline-start: clamp(0.5rem, 1.5vw, 1rem);
  }
  #products-evolu-landing #filter-lines .pl-line-split.pl-line-split--copy-left .pl-line-copy {
    margin-inline-end: clamp(0.75rem, 2vw, 1.5rem);
    padding-inline-end: clamp(0.5rem, 1.5vw, 1rem);
  }
}
/* Scroll-in: image card slides from the left; copy fades in */
#products-evolu-landing #filter-lines .pl-line-split .pl-line-card {
  will-change: transform, opacity;
  transition:
    transform 0.88s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.72s ease;
  transform: translate3d(-2.85rem, 0, 0);
  opacity: 0;
}
#products-evolu-landing #filter-lines .pl-line-split.pl-line-split--in-view .pl-line-card {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
#products-evolu-landing #filter-lines .pl-line-split .pl-line-copy {
  transition: opacity 0.78s ease 0.2s;
  opacity: 0;
}
#products-evolu-landing #filter-lines .pl-line-split.pl-line-split--in-view .pl-line-copy {
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
  #products-evolu-landing #filter-lines .pl-line-split .pl-line-card,
  #products-evolu-landing #filter-lines .pl-line-split.pl-line-split--in-view .pl-line-card {
    transform: none !important;
    opacity: 1 !important;
    transition: none !important;
    will-change: auto;
  }
  #products-evolu-landing #filter-lines .pl-line-split .pl-line-copy,
  #products-evolu-landing #filter-lines .pl-line-split.pl-line-split--in-view .pl-line-copy {
    opacity: 1 !important;
    transition: none !important;
  }
}
`;

const ProductsPage = () => {
  const base = publicUrl();
  const heroProductSrc = `${base}/images/products/hero-air-filters-3d.png?v=2026-04-29c`;
  const lines = LINE_DEFS.map((d) => ({
    name: d.name,
    image: `${base}/images/${d.imageFile}`,
    bullets: d.bullets,
  }));

  return (
    <div id="products-evolu-landing" className="min-h-screen overflow-x-hidden pl-hero-bg">
      <style dangerouslySetInnerHTML={{ __html: landingStyles }} />

      {/* Hero — Evolu-style light band + product visual right */}
      <section className="relative pl-hero-bg pt-6 pb-36 sm:pb-44 lg:pb-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-12 xl:gap-16 min-h-[min(78vh,640px)] lg:min-h-[560px]">
            <div className="shrink-0 pt-10 lg:pt-16 pb-4 z-10 w-full max-w-xl lg:max-w-[min(100%,28rem)] lg:pr-4">
              <h1 className="pl-headline pl-text-ink">
                Future of
                <br />
                Filtration
              </h1>
              <p className="mt-6 text-base sm:text-lg leading-relaxed pl-text-sub max-w-md">
                Factory-direct air, fuel, oil, and hydraulic programmes engineered in Nairobi for distributors and
                fleets — premium media, disciplined tooling, and regional logistics built for East Africa.
              </p>
              <div className="mt-9">
                <a href="#filter-lines" className="pl-cta">
                  Explore filter lines
                  <ArrowUpRight className="w-5 h-5 shrink-0" strokeWidth={2.5} />
                </a>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {['AF', 'FL', 'HY', 'KE'].map((t, i) => (
                    <div
                      key={t}
                      className="w-11 h-11 rounded-full border-[3px] border-[#f4f4f3] bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center text-[10px] font-bold text-white relative"
                      style={{ zIndex: 4 - i }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium pl-text-ink max-w-[200px] leading-snug">
                  Trusted by distributors &amp; fleets across East Africa.
                </p>
              </div>
            </div>

            <div className="pl-hero-visual relative flex flex-1 min-w-0 justify-center items-end min-h-[280px] sm:min-h-[340px] lg:min-h-[min(52vh,520px)]">
              <img
                src={heroProductSrc}
                alt="High-performance automotive air filters — Amazon Filtration product render"
                className="pl-hero-img relative z-[1] h-auto w-full max-w-[min(100%,460px)] sm:max-w-[520px] lg:max-w-[min(720px,56vw)] xl:max-w-[780px] object-contain object-bottom select-none pointer-events-none"
                width={720}
                height={720}
                decoding="async"
                fetchPriority="high"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${base}/images/product-hero-air-filters.png?v=2026-04-29c`;
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category lines */}
      <section id="filter-lines" className="scroll-mt-24 bg-[#121212] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-14">
          <div className="max-w-3xl mb-14 lg:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] pl-accent-text mb-3">Filter lines</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold pl-text-ink tracking-tight">
              What we manufacture
            </h2>
            <p className="mt-4 text-base sm:text-lg pl-text-sub leading-relaxed">
              Editorial overview of each programme — static on this page. When you are ready, route buyers to contact
              for MOQs, samples, and catalogue alignment.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-20">
            {lines.map((line, index) => (
              <FilterLineRow key={line.name} line={line} index={index} base={base} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 pl-hero-bg border-t border-black/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold pl-text-ink mb-4 tracking-tight">Next step</h2>
          <p className="pl-text-sub mb-8 leading-relaxed">
            Programme pricing, samples, and technical questionnaires ship through your commercial team — start on
            contact for datasheets and programme details when published.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 text-sm font-bold pl-text-ink border-b-2 border-[#2997ff] pb-0.5 hover:opacity-80"
          >
            Contact us
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

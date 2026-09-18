import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Briefcase, Factory, ShieldCheck, Truck } from 'lucide-react';
import { fetchOpenJobs } from './jobsApi';

const publicUrl = () =>
  typeof window !== 'undefined' && window.__AMAZON_API_BASE__ !== undefined
    ? window.__AMAZON_API_BASE__
    : '';

const FallbackImg = ({ sources, alt, className, ...rest }) => {
  const [index, setIndex] = useState(0);
  const src = sources[Math.min(index, sources.length - 1)];
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        setIndex((current) => (current < sources.length - 1 ? current + 1 : current));
      }}
      {...rest}
    />
  );
};

const imgSet = (localPath, livePartner) => {
  const base = publicUrl();
  return [
    `${base}${localPath}`,
    `https://amazonfiltration.co.ke${localPath}`,
    livePartner ? `${base}${livePartner}` : null,
    livePartner ? `https://amazonfiltration.co.ke${livePartner}` : null,
  ].filter(Boolean);
};

const HomePage = () => {
  const [openJobs, setOpenJobs] = useState([]);
  const localHeroSrc = `${publicUrl()}/images/hero/hero-engine-bay.png`;
  const liveHeroSrc = 'https://amazonfiltration.co.ke/images/hero/hero-engine-bay.png';
  const [heroImageSrc, setHeroImageSrc] = useState(localHeroSrc);

  useEffect(() => {
    let cancelled = false;
    const probe = new Image();
    probe.onload = () => {
      if (!cancelled) setHeroImageSrc(localHeroSrc);
    };
    probe.onerror = () => {
      if (!cancelled) setHeroImageSrc(liveHeroSrc);
    };
    probe.src = localHeroSrc;
    return () => {
      cancelled = true;
    };
  }, [localHeroSrc]);

  useEffect(() => {
    let cancelled = false;
    fetchOpenJobs()
      .then((list) => {
        if (!cancelled) setOpenJobs(list);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  const heroImageAlt =
    'High-performance engine bay with premium intake filtration for automotive and industrial applications';

  const industryPartnerCards = [
    {
      title: 'Custom Design',
      description:
        'Engineering designs custom air, fuel, oil, and hydraulic elements to your housing, media, and duty cycle. Not a catalogue guess.',
      path: '/contact?service=custom-design',
      sources: imgSet('/images/home/custom-design.jpg', '/images/services/industry-partners/custom-design.png'),
      imageAlt: 'Engineer reviewing a custom filter design beside production samples'
    },
    {
      title: 'Supply Chain Management',
      description:
        'Factory scheduling, batching, and stores control for OEM-style programmes and aftermarket volume across East Africa.',
      path: '/contact?service=supply-chain-management',
      sources: imgSet('/images/home/supply-chain.jpg', '/images/services/industry-partners/supply-chain.png'),
      imageAlt: 'Organised factory warehouse with filter cartons on racking'
    },
    {
      title: 'Distribution Services',
      description:
        'Plant-to-distributor logistics for large orders. Palletised lines, labelled cartons, and regional lead times you can plan around.',
      path: '/contact?service=distribution-services',
      sources: imgSet('/images/home/distribution.jpg', '/images/services/industry-partners/distribution.png'),
      imageAlt: 'Heavy goods truck on the road for factory distribution'
    },
    {
      title: 'Expert Support',
      description:
        'Application support at the engine and the plant: fitment, media choice, and training for your workshop or fleet team.',
      path: '/contact?service=expert-support',
      sources: imgSet('/images/home/expert-support.jpg', '/images/services/industry-partners/expert-support.png'),
      imageAlt: 'Technician explaining filter housings on a diesel engine'
    },
    {
      title: 'After-sales Support',
      description:
        'Warranty, replacements, and ongoing supply so a programme does not stop after the first invoice.',
      path: '/contact?service=after-sales-support',
      sources: imgSet('/images/home/after-sales.jpg', '/images/services/industry-partners/after-sales.png'),
      imageAlt: 'After-sales engineer issuing boxed filters from plant stores'
    },
    {
      title: 'Quality Testing',
      description:
        'Incoming media and finished filters are checked for fit, flow, and durability before a batch leaves Embakasi.',
      path: '/contact?service=quality-testing',
      sources: imgSet('/images/home/quality-testing.jpg', '/images/services/industry-partners/quality-testing.png'),
      imageAlt: 'Quality inspector checking oil and air filters on a test bench'
    },
  ];

  const features = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: 'Nairobi factory',
      description: 'Air, fuel, oil, and hydraulic lines are designed and produced at our Embakasi plant, not traded in from a shelf.',
      sources: imgSet('/images/home/nairobi-factory.jpg'),
      imageAlt: 'Filter production line inside the Nairobi factory'
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Tested to spec',
      description: 'Every run is checked for fit, flow, and durability so fleets and distributors get consistent product.',
      sources: imgSet('/images/home/tested-to-spec.jpg'),
      imageAlt: 'Inspector measuring a fuel filter during quality control'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Built for supply',
      description: 'OEM-style programmes and aftermarket volume for automotive, construction, agriculture, and industry.',
      sources: imgSet('/images/home/built-for-supply.jpg'),
      imageAlt: 'Warehouse aisle stacked with pallets ready for dispatch'
    }
  ];

  const productLines = [
    { name: 'Air filters', to: '/products#category-air-filters' },
    { name: 'Fuel filters', to: '/products#category-fuel-filters' },
    { name: 'Oil filters', to: '/products#category-oil-filters' },
    { name: 'Hydraulic return', to: '/products#category-hydraulic-return-filters' },
    { name: 'Coolant', to: '/products#category-coolant-filters' },
    { name: 'Cabin', to: '/products#category-cabin-filters' },
  ];

  const programmeSteps = [
    { num: '01', title: 'Tell us the machine', copy: 'Housing, media, duty cycle, and volume. We match a line or draw a custom spec.' },
    { num: '02', title: 'Approve a sample', copy: 'Factory samples and fitment checks before you commit a programme.' },
    { num: '03', title: 'We run the batch', copy: 'Production and QC at Embakasi, labelled and packed to your catalogue.' },
    { num: '04', title: 'Dispatch and support', copy: 'Palletised supply, lead times you can plan, and after-sales if something shifts.' },
  ];

  const sectors = [
    { name: 'Automotive', to: '/industries' },
    { name: 'Construction', to: '/industries' },
    { name: 'Agriculture', to: '/industries' },
    { name: 'Power & energy', to: '/industries' },
    { name: 'Industrial', to: '/industries' },
    { name: 'Marine', to: '/industries' },
  ];

  return (
    <div className="amazon-home-page min-h-screen overflow-x-hidden">
      {/* Full-bleed hero photo + light (white) gradients; copy on readable left */}
      <section className="amazon-home-hero relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImageSrc})` }}
          aria-hidden
        />
        <div
          className="amazon-home-hero-overlay absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.99) 8%, rgba(255,255,255,0.97) 16%, rgba(255,255,255,0.9) 26%, rgba(255,255,255,0.72) 38%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0.14) 62%, rgba(255,255,255,0.04) 76%, rgba(255,255,255,0) 100%), linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 26%, transparent 74%, rgba(255,255,255,0.55) 100%)',
          }}
          aria-hidden
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="af-home-hero-copy text-zinc-900">
            <p className="af-kicker-row">Made in Nairobi, since 2020</p>
            <h1>
              Your <span className="amazon-hero-trusted-gradient">Trusted Supplier</span>
              <span className="block">for Machine Filtration</span>
            </h1>
            <p className="af-home-hero-lead">
              Factory-direct filters for distributors, fleets, and industry across East Africa.
            </p>
            <p className="af-home-hero-sub amazon-text-muted">
              Air, fuel, oil, and hydraulic lines. Conical and cartridge designs built for intake and engine protection.
            </p>
            <div className="af-line-chips">
              {productLines.map((line) => (
                <Link key={line.name} to={line.to} className="af-line-chip">{line.name}</Link>
              ))}
            </div>
            <div className="af-home-hero-actions">
              <Link to="/products" className="amazon-btn-hero-primary">
                <Wrench className="w-5 h-5" />
                View manufacturing range
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="amazon-btn-hero-outline">
                Talk to the plant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {openJobs.length > 0 ? (
        <section className="amazon-hiring-banner">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm sm:text-base font-medium text-zinc-900 inline-flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-700 shrink-0" />
              We are hiring: {openJobs.length === 1 ? openJobs[0].title : `${openJobs.length} open vacancies`}
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-800 hover:text-orange-950"
            >
              View careers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      ) : null}

      <section className="af-path-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl mb-8 md:mb-10">
            <p className="af-kicker-row">How a programme starts</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              From spec to dispatch
            </h2>
          </div>
          <ol className="af-path-grid">
            {programmeSteps.map((step) => (
              <li key={step.num} className="af-path-step">
                <span>{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="af-prog-section" id="factory-programmes">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="af-prog-intro max-w-3xl mb-10 md:mb-12">
            <p className="af-kicker-row">Factory programmes</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Built for industry partners
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Distributor programmes, fleet support, and OEM-style runs, engineered and built in our Nairobi factory.
            </p>
          </div>

          <div className="af-prog-list">
            {industryPartnerCards.map((card, index) => (
              <article
                key={card.path}
                className={`af-prog-row ${index % 2 === 1 ? 'is-flipped' : ''}`}
              >
                <div className="amazon-industry-visual af-prog-row-media relative overflow-hidden min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]">
                  <FallbackImg
                    sources={card.sources}
                    alt={card.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <div className="af-prog-row-copy">
                  <span className="af-prog-num">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link to={card.path} className="af-prog-more">
                    Discuss this programme
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="af-why-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl mb-10 md:mb-12">
            <p className="af-kicker-row">Why the plant</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-black mb-3 md:mb-4 tracking-tight">
              A Kenyan filter manufacturer
            </h2>
            <p className="text-base sm:text-lg md:text-xl amazon-text-muted max-w-2xl leading-relaxed">
              Quality, factory control, and supply that distributors and workshops can plan around.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {features.map((feature) => (
              <article key={feature.title} className="af-why-card">
                <div className="af-why-photo">
                  <FallbackImg
                    sources={feature.sources}
                    alt={feature.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="af-why-copy">
                  <div className="af-why-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="af-sector-row">
            <p className="af-kicker-row">Sectors we supply</p>
            <div className="af-line-chips">
              {sectors.map((sector) => (
                <Link key={sector.name} to={sector.to} className="af-line-chip">{sector.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="af-factory-cta af-factory-cta--photo">
        <div className="af-factory-cta-media" aria-hidden>
          <FallbackImg
            sources={imgSet('/images/home/factory-cta.jpg')}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="af-kicker-row">Production &amp; supply</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Need a run, a spec, or a distributor programme?</h2>
            <p className="mt-2 text-sm sm:text-base text-white/75 max-w-xl">
              Speak to the Nairobi team for factory-direct pricing, samples, and lead times.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="af-site-cta text-center">Request a quote</Link>
            <Link to="/products" className="amazon-btn-hero-outline inline-flex items-center justify-center px-5 py-3 font-semibold">
              Browse lines
            </Link>
          </div>
        </div>
      </section>

      <div className="amazon-home-wave leading-none w-full" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block w-full h-16 sm:h-20 md:h-28"
        >
          <path fill="#ffffff" d="M0,48 C280,108 520,95 1440,38 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
};

export default HomePage;

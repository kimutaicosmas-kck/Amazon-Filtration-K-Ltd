import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Factory, ShieldCheck, Truck, MapPin, Phone, Mail } from 'lucide-react';

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

const imgSet = (...paths) => {
  const base = publicUrl();
  return paths.flatMap((path) => [`${base}${path}`, `https://amazonfiltration.co.ke${path}`]);
};

const AboutPage = () => {
  const plantPhoto = imgSet('/images/home/nairobi-factory.jpg', '/images/about/Amazon-filtration-company-pic.jpg');
  const heroPhoto = imgSet(
    '/images/home/nairobi-factory.jpg',
    '/images/about/Amazon-filtration-company-pic.jpg',
    '/images/about/about-hero-filters.png'
  );
  const qcPhoto = imgSet('/images/home/tested-to-spec.jpg', '/images/home/quality-testing.jpg');

  const milestones = [
    {
      year: '2020',
      title: 'Plant opened in Embakasi',
      description:
        'Amazon Filtration (K) Ltd started production at Bellway Industrial Park so distributors could buy Kenyan-made filters instead of mixed imports.',
    },
    {
      year: '2021',
      title: 'Automotive and fleet programmes',
      description:
        'First volume runs for workshops and commercial fleets. Air, fuel, and oil lines specified to local duty cycles.',
    },
    {
      year: '2022',
      title: 'Quality built into every batch',
      description:
        'Incoming media and finished filters checked for fit, flow, and durability before a carton leaves the plant.',
    },
    {
      year: '2023',
      title: 'Construction and agriculture',
      description:
        'Hydraulic, coolant, and heavy-duty air programmes added for plant hire, contractors, and farm machinery.',
    },
    {
      year: 'Today',
      title: 'East African supply',
      description:
        'The Embakasi plant now supports distributors and fleets across Kenya and the wider region with factory-direct lead times.',
    },
  ];

  const principles = [
    {
      icon: <Factory className="w-8 h-8" />,
      title: 'Made in the plant',
      description:
        'Air, fuel, oil, and hydraulic lines are designed and produced in Nairobi. We do not trade other people’s stock as our own.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Checked before dispatch',
      description:
        'Every run is inspected for media, fit, and finish. A batch that does not meet spec does not leave Embakasi.',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Supply you can plan',
      description:
        'Palletised orders, labelled cartons, and lead times that workshops and distributors can put on a calendar.',
    },
  ];

  const lines = [
    { name: 'Air filters', to: '/products#category-air-filters' },
    { name: 'Fuel filters', to: '/products#category-fuel-filters' },
    { name: 'Oil filters', to: '/products#category-oil-filters' },
    { name: 'Hydraulic return', to: '/products#category-hydraulic-return-filters' },
    { name: 'Coolant', to: '/products#category-coolant-filters' },
    { name: 'Cabin', to: '/products#category-cabin-filters' },
  ];

  const process = [
    { num: '01', title: 'Spec the machine', copy: 'Housing, media, duty cycle, and volume. We match a line or draw a custom spec.' },
    { num: '02', title: 'Sample and approve', copy: 'Factory samples and fitment checks before you commit a programme.' },
    { num: '03', title: 'Produce and inspect', copy: 'The batch is run at Embakasi, then checked for fit, flow, and durability.' },
    { num: '04', title: 'Pack and dispatch', copy: 'Labelled cartons, palletised supply, and after-sales if something shifts.' },
  ];

  return (
    <div className="amazon-about-page min-h-screen overflow-x-hidden">
      <section className="af-about-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="af-kicker-row">The manufacturer</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.08]">
                Nairobi filter plant, not a reseller
              </h1>
              <p className="mt-6 text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed">
                Amazon Filtration (K) Ltd designs and produces air, fuel, oil, and hydraulic filters at Bellway
                Industrial Park, Embakasi. Distributors, fleets, and workshops across East Africa buy factory programmes
                from this plant.
              </p>
              <p className="mt-4 text-base text-zinc-600 max-w-xl leading-relaxed">
                The work is simple: consistent media, correct fit, and supply you can plan. Standard lines and
                custom-engineered runs leave the same factory floor.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="af-site-cta text-center">
                  Talk to the plant
                </Link>
                <Link
                  to="/products"
                  className="amazon-btn-hero-outline inline-flex items-center justify-center px-5 py-3 font-semibold"
                >
                  View manufacturing range
                </Link>
              </div>
            </div>
            <div className="af-about-photo amazon-industry-visual relative overflow-hidden min-h-[280px] sm:min-h-[360px]">
              <FallbackImg
                sources={heroPhoto}
                alt="Filter production at the Amazon Filtration plant in Embakasi, Nairobi"
                className="absolute inset-0 w-full h-full object-cover"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="af-about-photo amazon-industry-visual relative overflow-hidden min-h-[260px] sm:min-h-[340px]">
              <FallbackImg
                sources={plantPhoto}
                alt="Pleated filter elements on the production line"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <p className="af-kicker-row">Inside the plant</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-4">
                Built in Embakasi for machines that work
              </h2>
              <p className="text-zinc-600 leading-relaxed mb-4">
                The factory sits off Airport North Road at Bellway Industrial Park. Production, stores, and quality sit
                in one place, so a programme does not get handed between traders.
              </p>
              <p className="text-zinc-600 leading-relaxed mb-6">
                Buyers come to us for OEM-style runs, aftermarket volume, and custom housings. Tell us the machine and
                the volume. We match a line or draw a spec, then run it here.
              </p>
              <div className="af-line-chips">
                {lines.map((line) => (
                  <Link key={line.name} to={line.to} className="af-line-chip">
                    {line.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="af-about-process py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="af-kicker-row">How a programme starts</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">From spec to dispatch</h2>
          </div>
          <ol className="af-path-grid">
            {process.map((step) => (
              <li key={step.num} className="af-path-step">
                <span>{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="af-kicker-row">Plant history</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-3">From founding to supply</h2>
            <p className="text-zinc-600 text-lg">Key years at the Nairobi factory. No filler, just how the plant grew.</p>
          </div>
          <ol className="af-about-timeline">
            {milestones.map((m) => (
              <li key={m.year} className="af-about-timeline-item">
                <span className="af-line-chip">{m.year}</span>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="af-about-process py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="af-kicker-row">How we run</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight mb-8">
                What buyers can hold us to
              </h2>
              <div className="space-y-5">
                {principles.map((item) => (
                  <div key={item.title} className="af-mfg-card af-about-principle">
                    <div className="af-why-icon">{item.icon}</div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="af-about-photo amazon-industry-visual relative overflow-hidden min-h-[280px] sm:min-h-[420px]">
              <FallbackImg
                sources={qcPhoto}
                alt="Quality check on finished filters before dispatch"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="af-about-visit">
            <div>
              <p className="af-kicker-row">Visit the plant</p>
              <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mb-4">Bellway Industrial Park, Embakasi</h2>
              <p className="text-zinc-600 leading-relaxed max-w-xl mb-6">
                Come and see production if you are specifying a programme. Bring a housing, a sample, or a parts list.
                The commercial team will walk the floor with you.
              </p>
              <div className="space-y-3 text-sm text-zinc-700">
                <p className="inline-flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-orange-700" />
                  <span>
                    Bellway Industrial Park, Embakasi Road
                    <br />
                    Off Airport North Road, Embakasi East, Nairobi
                    <br />
                    P.O. Box 3270-00506, Nairobi
                  </span>
                </p>
                <p className="inline-flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-orange-700" />
                  <span>
                    <a href="tel:+254714752613">+254 714 752 613</a>
                    {' / '}
                    <a href="tel:+254720799363">+254 720 799 363</a>
                  </span>
                </p>
                <p className="inline-flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0 text-orange-700" />
                  <a href="mailto:filterskenyaltd@gmail.com">filterskenyaltd@gmail.com</a>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/contact" className="af-site-cta text-center">
                Request a quote
              </Link>
              <Link
                to="/careers"
                className="amazon-btn-hero-outline inline-flex items-center justify-center px-5 py-3 font-semibold"
              >
                View careers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="af-factory-cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="af-kicker-row">Work with the plant</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Ready to specify a programme?</h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl">
              Speak to the Nairobi team about factory-direct supply, samples, and careers at the plant.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="af-site-cta text-center">
              Talk to the plant
            </Link>
            <Link
              to="/products"
              className="amazon-btn-hero-outline inline-flex items-center justify-center px-5 py-3 font-semibold"
            >
              Browse lines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

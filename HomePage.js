import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Wrench, Briefcase } from 'lucide-react';
import { fetchOpenJobs } from './jobsApi';

const publicUrl = () =>
  typeof window !== 'undefined' && window.__AMAZON_API_BASE__ !== undefined
    ? window.__AMAZON_API_BASE__
    : '';

const HomePage = () => {
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  const [openJobs, setOpenJobs] = useState([]);
  const heroImageSrc = `${publicUrl()}/images/hero/hero-engine-bay.png`;

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
    'High-performance engine bay with premium intake filtration — automotive and industrial applications';

  const industryPartnerCards = [
    {
      title: 'Custom Design',
      description:
        'Our engineering team designs custom filtration solutions tailored to your specific requirements and applications.',
      path: '/contact?service=custom-design',
      image: `${publicUrl()}/images/services/industry-partners/custom-design.png`,
      imageAlt: 'Engineering worker reviewing custom design plans'
    },
    {
      title: 'Supply Chain Management',
      description:
        'Comprehensive supply chain management for both original equipment manufacturers and aftermarket distribution.',
      path: '/contact?service=supply-chain-management',
      image: `${publicUrl()}/images/services/industry-partners/supply-chain.png`,
      imageAlt: 'Packages moving through supply chain conveyor system'
    },
    {
      title: 'Distribution Services',
      description:
        'Efficient logistics and distribution services for large-scale orders and international shipments.',
      path: '/contact?service=distribution-services',
      image: `${publicUrl()}/images/services/industry-partners/distribution.png`,
      imageAlt: 'Distribution truck for shipment logistics'
    },
    {
      title: 'Expert Support',
      description:
        'Expert technical support and training programs to help your team optimize filtration systems.',
      path: '/contact?service=expert-support',
      image: `${publicUrl()}/images/services/industry-partners/expert-support.png`,
      imageAlt: 'Technical experts providing support on site'
    },
    {
      title: 'After-sales Support',
      description:
        'Comprehensive after-sales support including warranty services and ongoing maintenance assistance.',
      path: '/contact?service=after-sales-support',
      image: `${publicUrl()}/images/services/industry-partners/after-sales.png`,
      imageAlt: 'Customer support representative on headset'
    },
    {
      title: 'Quality Testing',
      description:
        'Rigorous quality testing and certification to ensure all products meet international standards.',
      path: '/contact?service=quality-testing',
      image: `${publicUrl()}/images/services/industry-partners/quality-testing.png`,
      imageAlt: 'Technician performing quality testing in production'
    },
  ];

  const features = [
    {
      icon: <Award className="w-12 h-12 amazon-text-accent" />,
      title: 'Reliable Quality',
      description: 'All our filters meet international standards and are rigorously tested for performance and durability.'
    },
    {
      icon: <Award className="w-12 h-12 amazon-text-accent" />,
      title: 'Industry Expertise',
      description: 'Over 3 years of experience serving automotive, construction, agriculture, and industrial sectors.'
    },
    {
      icon: <Users className="w-12 h-12 amazon-text-accent" />,
      title: 'Customer Focus',
      description: 'Dedicated support team providing technical consultation and after-sales service.'
    }
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
          <div className="max-w-2xl text-center lg:text-left text-zinc-900">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-semibold leading-tight tracking-tight text-black">
              <span className="text-blue-600">Your</span>{' '}
              <span className="amazon-hero-trusted-gradient">Trusted Supplier</span> For
              <span className="block mt-2 text-black">Machine Filtration</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl font-medium text-zinc-800 max-w-xl mx-auto lg:mx-0 leading-snug">
              Reliable filtration solutions since 2020 — engineered for distributors and industry across East Africa.
            </p>
            <p className="mt-4 text-lg amazon-text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Air, fuel, oil, and hydraulic lines; premium conical and cartridge designs for high-performance intake and
              engine protection.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="group amazon-btn-hero-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg"
              >
                <Wrench className="w-6 h-6" />
                Explore products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="amazon-btn-hero-outline inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg"
              >
                <Users className="w-6 h-6" />
                Get a quote
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
              We are hiring — {openJobs.length === 1 ? openJobs[0].title : `${openJobs.length} open vacancies`}
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

      {/* Built for industry partners — left rail + large visual */}
      <section className="amazon-home-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-3xl mb-10 md:mb-14 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Built for industry partners
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Distributor programmes, fleet support, and OEM-style runs — engineered and built in our Nairobi factory
            </p>
          </div>

          <div className="amazon-industry-layout">
            <div className="flex flex-col min-w-0">
              <nav className="amazon-industry-rail flex flex-col" aria-label="Industry focus">
                {industryPartnerCards.map((card, index) => (
                  <button
                    key={card.path}
                    type="button"
                    onClick={() => setActiveIndustryIndex(index)}
                    className={`amazon-industry-tab text-left w-full flex items-center gap-3 py-4 px-2 rounded-lg transition-colors uppercase tracking-wide text-sm md:text-base ${
                      activeIndustryIndex === index ? 'is-active font-semibold' : ''
                    }`}
                  >
                    <ArrowRight
                      className={
                        activeIndustryIndex === index
                          ? 'w-5 h-5 shrink-0 text-blue-600'
                          : 'w-5 h-5 shrink-0 opacity-0 pointer-events-none'
                      }
                      aria-hidden
                    />
                    {card.title}
                  </button>
                ))}
              </nav>
              <div className="mt-8">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                  {industryPartnerCards[activeIndustryIndex].description}
                </p>
                <Link
                  to={industryPartnerCards[activeIndustryIndex].path}
                  className="inline-flex items-center gap-2 text-base font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  See more
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="amazon-industry-visual">
              <img
                key={industryPartnerCards[activeIndustryIndex].path}
                src={industryPartnerCards[activeIndustryIndex].image}
                alt={industryPartnerCards[activeIndustryIndex].imageAlt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.65) 38%, rgba(255,255,255,0.2) 68%, transparent 100%)',
                }}
                aria-hidden
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pointer-events-none">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 uppercase tracking-tight">
                  {industryPartnerCards[activeIndustryIndex].title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="amazon-home-section py-12 md:py-20 amazon-border-t-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-black mb-3 md:mb-4 tracking-tight">
              Why Choose Amazon Filtration?
            </h2>
            <p className="text-base sm:text-lg md:text-xl amazon-text-muted max-w-2xl mx-auto leading-relaxed">
              We deliver excellence through quality, expertise, and customer commitment
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4 md:p-6">
                <div className="flex justify-center mb-4 md:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-zinc-900 mb-3 md:mb-4">{feature.title}</h3>
                <p className="text-sm md:text-base amazon-text-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
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

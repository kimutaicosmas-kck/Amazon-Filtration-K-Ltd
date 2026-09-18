import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Target, Shield, Globe, Heart } from 'lucide-react';

const publicUrl = () =>
  typeof window !== 'undefined' && window.__AMAZON_API_BASE__ !== undefined
    ? window.__AMAZON_API_BASE__
    : '';

const AboutPage = () => {
  const heroFiltersSrc = `${publicUrl()}/images/about/about-hero-filters.png`;

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description:
        'Amazon Filtration (K) Ltd was established with a vision to provide reliable filtration solutions'
    },
    {
      year: '2021',
      title: 'First Major Contract',
      description:
        'Secured our first major automotive industry contract, establishing our market presence'
    },
    {
      year: '2022',
      title: 'ISO Certification',
      description: 'Achieved ISO 9001:2015 certification for quality management systems'
    },
    {
      year: '2023',
      title: 'Expansion',
      description: 'Expanded operations to serve construction and industrial sectors across Kenya'
    },
    {
      year: '2024',
      title: 'Future Growth',
      description: 'Planned expansion into East African markets and new product development'
    }
  ];

  const values = [
    {
      icon: <Shield className="w-12 h-12 text-cyan-600" />,
      title: 'Quality',
      description:
        'We maintain the highest standards of quality in all our products and services, ensuring reliability and performance.'
    },
    {
      icon: <Users className="w-12 h-12 text-cyan-600" />,
      title: 'Customer Focus',
      description:
        'Our customers are at the heart of everything we do. We build lasting relationships through exceptional service.'
    },
    {
      icon: <Target className="w-12 h-12 text-cyan-600" />,
      title: 'Innovation',
      description:
        'We continuously innovate to provide cutting-edge filtration solutions that meet evolving industry needs.'
    },
    {
      icon: <Globe className="w-12 h-12 text-cyan-600" />,
      title: 'Sustainability',
      description: 'We are committed to environmental responsibility and sustainable business practices.'
    },
    {
      icon: <Heart className="w-12 h-12 text-cyan-600" />,
      title: 'Integrity',
      description:
        'We conduct business with honesty, transparency, and ethical practices in all our interactions.'
    }
  ];

  const certifications = [
    { name: 'ISO 9001:2015', description: 'Quality Management System' },
    { name: 'ISO 14001:2015', description: 'Environmental Management' },
    { name: 'OHSAS 18001', description: 'Occupational Health & Safety' },
    { name: 'IATF 16949', description: 'Automotive Quality Management' }
  ];

  return (
    <div className="amazon-about-page min-h-screen bg-white text-zinc-900 overflow-x-hidden">
      {/* Hero — split layout (reference: bold left copy + right visual) */}
      <section className="relative min-h-[88vh] flex items-center border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl w-full px-5 sm:px-10 lg:px-14 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 text-left lg:pr-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.06]">
                Amazon Filtration (K) Ltd
              </h1>
              <div className="mt-8 space-y-4 text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed">
                <p>
                  Founded in 2020, Amazon Filtration (K) Ltd emerged from a vision to provide reliable, high-quality
                  filtration solutions to industries across Kenya. What started as a small operation has grown into a
                  trusted partner for businesses in automotive, construction, agriculture, and industrial sectors.
                </p>
                <p>
                  Our journey began with a simple mission: to protect machines and equipment through superior filtration
                  technology. Today, we serve over 500 clients across various industries, providing everything from
                  standard filters to custom-engineered solutions.
                </p>
                <p>
                  Based in Kenya Industrial Estates, we have built our reputation on quality, reliability, and customer
                  service. Our team of experienced professionals works tirelessly to ensure that every product meets the
                  highest standards and every customer receives exceptional service.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg lg:max-w-xl">
                <img
                  src={heroFiltersSrc}
                  alt="Industrial air, fuel, and oil filtration components"
                  className="w-full rounded-2xl object-cover shadow-xl border border-zinc-200 outline-none lg:scale-105"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones — vertical stepper */}
      <div className="bg-white py-16 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Our Journey</h2>
            <p className="text-xl text-zinc-600">Key milestones in our company&apos;s growth and development</p>
          </div>

          <ol className="max-w-3xl mx-auto list-none p-0 m-0">
            {milestones.map((m, i) => (
              <li key={m.year} className="flex gap-5 sm:gap-6">
                <div className="flex flex-col items-center w-11 sm:w-12 shrink-0">
                  <div
                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-cyan-500 text-black text-sm font-bold shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/40 z-[1]"
                    aria-hidden
                  >
                    {i + 1}
                  </div>
                  {i < milestones.length - 1 ? (
                  <div
                    className="w-px flex-1 min-h-[2.5rem] sm:min-h-[3rem] bg-gradient-to-b from-zinc-300 to-zinc-100 mt-1"
                    aria-hidden
                  />
                  ) : null}
                </div>
                <div className="pb-10 sm:pb-12 last:pb-2 flex-1 min-w-0">
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7 shadow-sm hover:border-cyan-400/60 transition-colors">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center rounded-full bg-cyan-100 text-cyan-800 px-3 py-1 text-xs font-semibold ring-1 ring-cyan-200">
                        {m.year}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-zinc-500">Step {i + 1}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-2">{m.title}</h3>
                    <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Values */}
      <div className="bg-zinc-50 py-16 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Our Values</h2>
            <p className="text-xl text-zinc-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-4 md:p-6 rounded-xl border border-zinc-200 bg-white shadow-sm">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-lg md:text-xl font-semibold text-zinc-900 mb-3">{value.title}</h3>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white py-16 border-t border-zinc-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Certifications & Standards</h2>
            <p className="text-xl text-zinc-600">We maintain the highest standards of quality and compliance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-zinc-200 p-6 text-center shadow-sm hover:border-cyan-400/50 transition-colors"
              >
                <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-cyan-100">
                  <Award className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2">{cert.name}</h3>
                <p className="text-zinc-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 py-12 border-t border-zinc-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-cyan-50 mb-6 max-w-2xl mx-auto">
            Discover how our expertise and commitment to quality can benefit your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-cyan-700 hover:bg-zinc-100 font-medium py-3 px-6 rounded-lg transition-all duration-300"
            >
              Get In Touch
            </Link>
            <Link
              to="/careers"
              className="border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-6 rounded-lg transition-all duration-300"
            >
              View careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Building, Tractor, Zap, Cog, Wrench } from 'lucide-react';

const publicUrl = () =>
  typeof window !== 'undefined' && window.__AMAZON_API_BASE__ !== undefined
    ? window.__AMAZON_API_BASE__
    : '';

const IndustriesPage = () => {
  const industries = [
    {
      name: 'Automotive',
      description: 'Cars, trucks, buses, and commercial vehicles',
      icon: <Truck className="w-12 h-12 text-white" />,
      image: `${publicUrl()}/images/industries/industry-01-automotive.png`,
      applications: [
        'Passenger cars and taxis',
        'Commercial trucks',
        'Buses and coaches',
        'Workshop and fleet service'
      ],
      products: [
        { name: 'Oil filters', to: '/products#category-oil-filters' },
        { name: 'Air filters', to: '/products#category-air-filters' },
        { name: 'Fuel filters', to: '/products#category-fuel-filters' },
        { name: 'Cabin filters', to: '/products#category-cabin-filters' },
      ]
    },
    {
      name: 'Construction',
      description: 'Excavators, loaders, bulldozers, and heavy machinery',
      icon: <Building className="w-12 h-12 text-white" />,
      image: `${publicUrl()}/images/industries/industry-02-construction.png`,
      applications: [
        'Excavators and loaders',
        'Graders and compactors',
        'Plant hire fleets',
        'Site generators'
      ],
      products: [
        { name: 'Hydraulic return', to: '/products#category-hydraulic-return-filters' },
        { name: 'Oil filters', to: '/products#category-oil-filters' },
        { name: 'Air filters', to: '/products#category-air-filters' },
        { name: 'Fuel filters', to: '/products#category-fuel-filters' },
      ]
    },
    {
      name: 'Agriculture',
      description: 'Tractors, harvesters, and farming equipment',
      icon: <Tractor className="w-12 h-12 text-white" />,
      image: `${publicUrl()}/images/industries/industry-03-agriculture.png`,
      applications: [
        'Tractors and harvesters',
        'Irrigation pumps',
        'Sprayers and planters',
        'Workshop service stock'
      ],
      products: [
        { name: 'Oil filters', to: '/products#category-oil-filters' },
        { name: 'Hydraulic return', to: '/products#category-hydraulic-return-filters' },
        { name: 'Air filters', to: '/products#category-air-filters' },
        { name: 'Coolant', to: '/products#category-coolant-filters' },
      ]
    },
    {
      name: 'Power & Energy',
      description: 'Standby generators, compressors, and plant power',
      icon: <Zap className="w-12 h-12 text-white" />,
      image: `${publicUrl()}/images/industries/industry-04-power-energy.png`,
      applications: [
        'Standby generators',
        'Compressors',
        'Factory power units',
        'Telecom and site power'
      ],
      products: [
        { name: 'Oil filters', to: '/products#category-oil-filters' },
        { name: 'Fuel filters', to: '/products#category-fuel-filters' },
        { name: 'Air filters', to: '/products#category-air-filters' },
        { name: 'Hydraulic return', to: '/products#category-hydraulic-return-filters' },
      ]
    },
    {
      name: 'Industrial Machines',
      description: 'Manufacturing equipment and hydraulic systems',
      icon: <Cog className="w-12 h-12 text-white" />,
      image: `${publicUrl()}/images/industries/industry-05-industrial.png`,
      applications: [
        'Factory hydraulics',
        'Processing machinery',
        'Material handling',
        'Maintenance stores'
      ],
      products: [
        { name: 'Hydraulic return', to: '/products#category-hydraulic-return-filters' },
        { name: 'Oil filters', to: '/products#category-oil-filters' },
        { name: 'Air filters', to: '/products#category-air-filters' },
        { name: 'Coolant', to: '/products#category-coolant-filters' },
      ]
    },
    {
      name: 'Marine & Offshore',
      description: 'Coastal vessels, fishing boats, and marine engines',
      icon: <Wrench className="w-12 h-12 text-white" />,
      image: `${publicUrl()}/images/industries/industry-06-marine.png`,
      applications: [
        'Fishing boats',
        'Coastal workboats',
        'Marine diesel engines',
        'Harbour equipment'
      ],
      products: [
        { name: 'Oil filters', to: '/products#category-oil-filters' },
        { name: 'Fuel filters', to: '/products#category-fuel-filters' },
        { name: 'Hydraulic return', to: '/products#category-hydraulic-return-filters' },
        { name: 'Air filters', to: '/products#category-air-filters' },
      ]
    }
  ];

  return (
    <div className="amazon-industries-page min-h-screen overflow-x-hidden">
      <section className="af-page-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="af-kicker-row">Sectors we supply</p>
          <h1 className="max-w-3xl text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900">
            Built for machines that work
          </h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-zinc-600 leading-relaxed">
            Factory programmes for automotive, construction, agriculture, power, industrial, and marine, specified
            from the Nairobi plant, not assembled from mixed imports.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="af-industry-card">
                <div className="relative">
                  <img
                    src={industry.image}
                    alt={`${industry.name} industry applications and machinery`}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${publicUrl()}/images/home/nairobi-factory.jpg`;
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none bg-gradient-to-br from-zinc-900/25 via-zinc-900/20 to-zinc-950/50"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 pointer-events-none"
                    aria-hidden
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-white/15 p-2">
                        {industry.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{industry.name}</h3>
                    </div>
                    <p className="text-gray-200">{industry.description}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Typical machines</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {industry.applications.map((app, appIndex) => (
                        <li key={appIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mr-3 flex-shrink-0"></div>
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Lines we supply</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.products.map((product) => (
                        <Link
                          key={product.to}
                          to={product.to}
                          className="af-line-chip"
                        >
                          {product.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={industry.products[0].to}
                      className="flex-1 amazon-btn-hero-primary inline-flex items-center justify-center px-4 py-3 font-semibold"
                    >
                      View products
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <Link
                      to="/contact"
                      className="flex-1 amazon-btn-hero-outline inline-flex items-center justify-center px-4 py-3 font-semibold"
                    >
                      Request a quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="af-kicker-row justify-center">Why plants specify us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              One factory, six working sectors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Media, fit, and lead times that workshops and distributors can plan around
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="af-mfg-card">
              <div className="w-12 h-12 bg-[#2f3b4c] flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Known applications</h3>
              <p className="text-gray-600">
                We specify to the machine: taxis, plant hire, tractors, generators, factory hydraulics, and workboats.
              </p>
            </div>
            
            <div className="af-mfg-card">
              <div className="w-12 h-12 bg-[#2f3b4c] flex items-center justify-center mb-4">
                <Cog className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Standard or custom</h3>
              <p className="text-gray-600">
                Catalogue lines for volume, or a housing and media spec drawn for your own programme.
              </p>
            </div>
            
            <div className="af-mfg-card">
              <div className="w-12 h-12 bg-[#2f3b4c] flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Factory-direct supply</h3>
              <p className="text-gray-600">
                Packed and labelled at Embakasi, then sent to your stores. No mixed import lots in the middle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="af-factory-cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="af-kicker-row">Specify a sector</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Need a line for your machines?</h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl">
              Tell the Nairobi team the application. We will match media, fit, and a factory programme.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="af-site-cta text-center">Talk to an engineer</Link>
            <Link to="/products" className="amazon-btn-hero-outline inline-flex items-center justify-center px-5 py-3 font-semibold">
              Browse lines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;

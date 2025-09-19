import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Building, Tractor, Zap, Cog, Wrench } from 'lucide-react';

const IndustriesPage = () => {
  const industries = [
    {
      name: 'Automotive',
      description: 'Cars, trucks, buses, and commercial vehicles',
      icon: <Truck className="w-12 h-12 text-primary-600" />,
      image: 'https://source.unsplash.com/600x400/?trucks,cars,automotive',
      applications: [
        'Passenger vehicles',
        'Commercial trucks',
        'Buses and coaches',
        'Fleet vehicles',
        'Emergency vehicles'
      ],
      products: ['Oil Filters', 'Air Filters', 'Fuel Filters', 'Cabin Filters']
    },
    {
      name: 'Construction',
      description: 'Excavators, loaders, bulldozers, and heavy machinery',
      icon: <Building className="w-12 h-12 text-primary-600" />,
      image: 'https://source.unsplash.com/600x400/?excavator,construction,heavy-machinery',
      applications: [
        'Excavators and loaders',
        'Bulldozers and graders',
        'Cranes and lifts',
        'Concrete equipment',
        'Road construction machinery'
      ],
      products: ['Hydraulic Filters', 'Oil Filters', 'Air Filters', 'Fuel Filters']
    },
    {
      name: 'Agriculture',
      description: 'Tractors, harvesters, and farming equipment',
      icon: <Tractor className="w-12 h-12 text-primary-600" />,
      image: 'https://source.unsplash.com/600x400/?tractor,harvester,agriculture',
      applications: [
        'Tractors and harvesters',
        'Planting equipment',
        'Spraying machinery',
        'Irrigation systems',
        'Livestock equipment'
      ],
      products: ['Oil Filters', 'Hydraulic Filters', 'Air Filters', 'Coolant Filters']
    },
    {
      name: 'Power & Energy',
      description: 'Generators, compressors, and power systems',
      icon: <Zap className="w-12 h-12 text-primary-600" />,
      image: 'https://source.unsplash.com/600x400/?generator,power-plant,energy',
      applications: [
        'Power generators',
        'Compressors',
        'Turbines',
        'Wind energy systems',
        'Solar power equipment'
      ],
      products: ['Oil Filters', 'Hydraulic Filters', 'Air Filters', 'Fuel Filters']
    },
    {
      name: 'Industrial Machines',
      description: 'Manufacturing equipment and hydraulic systems',
      icon: <Cog className="w-12 h-12 text-primary-600" />,
      image: 'https://source.unsplash.com/600x400/?manufacturing,industrial,hydraulic',
      applications: [
        'Manufacturing equipment',
        'Hydraulic systems',
        'Pneumatic systems',
        'Processing machinery',
        'Material handling'
      ],
      products: ['Hydraulic Filters', 'Oil Filters', 'Air Filters', 'Coolant Filters']
    },
    {
      name: 'Marine & Offshore',
      description: 'Boats, ships, and offshore equipment',
      icon: <Wrench className="w-12 h-12 text-primary-600" />,
      image: 'https://source.unsplash.com/600x400/?ship,marine,offshore',
      applications: [
        'Commercial vessels',
        'Fishing boats',
        'Offshore platforms',
        'Marine engines',
        'Navigation equipment'
      ],
      products: ['Oil Filters', 'Fuel Filters', 'Hydraulic Filters', 'Air Filters']
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Clients' },
    { number: '50+', label: 'Industries Served' },
    { number: '1000+', label: 'Products Available' },
    { number: '99%', label: 'Customer Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From automotive to industrial, we provide reliable filtration solutions across diverse industries worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industries Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img
                    src={industry.image}
                    alt={`${industry.name} industry applications and machinery`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                        {industry.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{industry.name}</h3>
                    </div>
                    <p className="text-gray-200">{industry.description}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Applications</h4>
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
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Recommended Products</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.products.map((product, productIndex) => (
                        <span
                          key={productIndex}
                          className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/products?industry=${industry.name.toLowerCase()}`}
                      className="flex-1 btn-primary text-center flex items-center justify-center"
                    >
                      View Products
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <Link
                      to="/contact"
                      className="flex-1 btn-outline text-center"
                    >
                      Get Quote
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Industries Trust Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our deep industry knowledge and proven track record make us the preferred choice
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Industry Expertise</h3>
              <p className="text-gray-600">
                Deep understanding of specific industry requirements and challenges across all sectors we serve.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cog className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Solutions</h3>
              <p className="text-gray-600">
                Tailored filtration solutions designed to meet the unique demands of your specific industry applications.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliable Supply</h3>
              <p className="text-gray-600">
                Consistent product availability and fast delivery to keep your operations running smoothly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Industry Operations?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Let our industry experts help you find the perfect filtration solutions for your specific needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Contact Industry Expert
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustriesPage;

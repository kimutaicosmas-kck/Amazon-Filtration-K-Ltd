import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, Users, Truck, Headphones, Award, Cog } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      title: 'Custom Filter Design & Engineering',
      description: 'Our engineering team designs custom filtration solutions tailored to your specific requirements and applications.',
      icon: <Wrench className="w-12 h-12 text-primary-600" />,
      image: '/images/services/custom-design-engineering.jpg',
      features: [
        'Custom filter specifications',
        'CAD design and modeling',
        'Prototype development',
        'Performance testing',
        'Technical documentation'
      ],
      benefits: 'Get exactly what you need with optimized performance and cost efficiency'
    },
    {
      title: 'OEM & Aftermarket Supply',
      description: 'Comprehensive supply chain management for both original equipment manufacturers and aftermarket distribution.',
      icon: <Cog className="w-12 h-12 text-primary-600" />,
      image: '/images/services/oem-aftermarket-supply.jpg',
      features: [
        'OEM partnerships',
        'Aftermarket distribution',
        'Quality assurance',
        'Supply chain management',
        'Inventory optimization'
      ],
      benefits: 'Reliable supply with consistent quality and competitive pricing'
    },
    {
      title: 'Bulk Distribution & Logistics',
      description: 'Efficient logistics and distribution services for large-scale orders and international shipments.',
      icon: <Truck className="w-12 h-12 text-primary-600" />,
      image: '/images/services/bulk-distribution-logistics.jpg',
      features: [
        'Bulk order processing',
        'International shipping',
        'Warehouse management',
        'Inventory tracking',
        'Delivery optimization'
      ],
      benefits: 'Streamlined logistics with real-time tracking and on-time delivery'
    },
    {
      title: 'Technical Consultation & Training',
      description: 'Expert technical support and training programs to help your team optimize filtration systems.',
      icon: <Users className="w-12 h-12 text-primary-600" />,
      image: '/images/services/technical-consultation-training.jpg',
      features: [
        'Technical consultation',
        'Staff training programs',
        'System optimization',
        'Troubleshooting support',
        'Best practices guidance'
      ],
      benefits: 'Maximize system performance with expert knowledge and training'
    },
    {
      title: 'After-Sales Support & Warranty',
      description: 'Comprehensive after-sales support including warranty services and ongoing maintenance assistance.',
      icon: <Headphones className="w-12 h-12 text-primary-600" />,
      image: '/images/services/customer-support-service.jpg',
      features: [
        'Warranty coverage',
        'Technical support',
        'Maintenance guidance',
        'Replacement services',
        'Performance monitoring'
      ],
      benefits: 'Peace of mind with comprehensive support and warranty coverage'
    },
    {
      title: 'Quality Assurance & Testing',
      description: 'Rigorous quality testing and certification to ensure all products meet international standards.',
      icon: <Award className="w-12 h-12 text-primary-600" />,
      image: '/images/services/quality-testing-certification.jpg',
      features: [
        'ISO certification',
        'Performance testing',
        'Quality control',
        'Compliance verification',
        'Documentation support'
      ],
      benefits: 'Guaranteed quality with certified testing and compliance standards'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Initial Consultation',
      description: 'We discuss your requirements and analyze your current filtration needs'
    },
    {
      step: '02',
      title: 'Solution Design',
      description: 'Our experts design the optimal filtration solution for your application'
    },
    {
      step: '03',
      title: 'Implementation',
      description: 'We implement the solution with full support and training'
    },
    {
      step: '04',
      title: 'Ongoing Support',
      description: 'Continuous support and optimization to ensure peak performance'
    }
  ];

  const certifications = [
    { name: 'ISO 9001:2015', description: 'Quality Management System' },
    { name: 'ISO 14001:2015', description: 'Environmental Management' },
    { name: 'OHSAS 18001', description: 'Occupational Health & Safety' },
    { name: 'IATF 16949', description: 'Automotive Quality Management' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive filtration services designed to meet your specific needs and exceed your expectations
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img
                    src={service.image}
                    alt={`${service.title} - Professional filtration services`}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/600x400/1e40af/ffffff?text=${encodeURIComponent(service.title)}`;
                      console.log(`Failed to load image for ${service.title}: ${service.image}`);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    </div>
                    <p className="text-gray-200 text-sm">{service.description}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6 p-4 bg-primary-50 rounded-lg">
                    <p className="text-sm text-primary-800 font-medium">
                      <strong>Key Benefit:</strong> {service.benefits}
                    </p>
                  </div>
                  
                  <Link
                    to="/contact"
                    className="w-full btn-primary text-center flex items-center justify-center"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Service Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A systematic approach to delivering exceptional filtration solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certifications & Standards
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We maintain the highest standards of quality and compliance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Experience Our Services?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Contact us today to discuss your filtration needs and discover how our services can benefit your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Service Quote
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

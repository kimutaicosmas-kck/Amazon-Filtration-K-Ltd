import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users, Truck, Wrench, Zap } from 'lucide-react';

const HomePage = () => {
  const quickLinks = [
    {
      title: 'Products',
      description: 'Browse our comprehensive range of filtration products',
      icon: <Wrench className="w-8 h-8" />,
      path: '/products',
      color: 'bg-primary-600'
    },
    {
      title: 'Industries Served',
      description: 'See how we serve various industries worldwide',
      icon: <Truck className="w-8 h-8" />,
      path: '/industries',
      color: 'bg-industrial-600'
    },
    {
      title: 'Services',
      description: 'Discover our professional filtration services',
      icon: <Zap className="w-8 h-8" />,
      path: '/services',
      color: 'bg-green-600'
    }
  ];

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-primary-600" />,
      title: 'Reliable Quality',
      description: 'All our filters meet international standards and are rigorously tested for performance and durability.'
    },
    {
      icon: <Award className="w-12 h-12 text-primary-600" />,
      title: 'Industry Expertise',
      description: 'Over 3 years of experience serving automotive, construction, agriculture, and industrial sectors.'
    },
    {
      icon: <Users className="w-12 h-12 text-primary-600" />,
      title: 'Customer Focus',
      description: 'Dedicated support team providing technical consultation and after-sales service.'
    }
  ];

  const categories = [
    { name: 'Oil Filters', image: 'https://source.unsplash.com/400x300/?oil-filter,engine', count: '50+' },
    { name: 'Fuel Filters', image: 'https://source.unsplash.com/400x300/?fuel-filter,diesel', count: '30+' },
    { name: 'Air Filters', image: 'https://source.unsplash.com/400x300/?air-filter,car', count: '40+' },
    { name: 'Hydraulic Filters', image: 'https://source.unsplash.com/400x300/?hydraulic-filter,machine', count: '25+' },
    { name: 'Coolant Filters', image: 'https://source.unsplash.com/400x300/?coolant-filter,radiator', count: '20+' },
    { name: 'Cabin Filters', image: 'https://source.unsplash.com/400x300/?cabin-filter,car-interior', count: '15+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://source.unsplash.com/1600x900/?filters,industrial,machine')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Reliable Filtration Solutions for Machines & Industry
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-up">
            High-performance filters for oil, fuel, air, and hydraulics – trusted by professionals worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link to="/products" className="btn-primary text-lg px-8 py-4">
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
            <Link to="/contact" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900">
              Request Quote
            </Link>
            <Link to="/contact" className="btn-secondary text-lg px-8 py-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of filtration products and services designed for your industry needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-8 text-center"
              >
                <div className={`${link.color} w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {link.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{link.title}</h3>
                <p className="text-gray-600 mb-6">{link.description}</p>
                <div className="flex items-center justify-center text-primary-600 font-medium group-hover:text-primary-700">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Amazon Filtration?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We deliver excellence through quality, expertise, and customer commitment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Product Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of filtration solutions for every application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={category.image}
                    alt={`${category.name} for industrial applications`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-4">{category.count} Products Available</p>
                  <Link
                    to={`/products?category=${category.name.split(' ')[0]}`}
                    className="inline-flex items-center text-primary-300 hover:text-primary-200 font-medium"
                  >
                    View Products
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Filtration Solution?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact our experts today for personalized recommendations and competitive pricing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Free Quote
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

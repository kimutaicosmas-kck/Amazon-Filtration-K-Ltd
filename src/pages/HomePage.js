import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users, Truck, Wrench, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const HomePage = () => {
  // Hero carousel images
  const heroImages = [
    {
      src: '/images/Air-Filters.jpeg',
      alt: 'Air Filters - High-performance air filtration solutions',
      title: 'Air Filters',
      description: 'Superior air filtration for engines and industrial applications'
    },
    {
      src: '/images/automotive.jpg',
      alt: 'Automotive Industry - Professional filtration solutions',
      title: 'Automotive Industry',
      description: 'Trusted by automotive professionals worldwide'
    },
    {
      src: '/images/Industrial-Machines.jpg',
      alt: 'Industrial Machinery - Heavy-duty filtration systems',
      title: 'Industrial Machinery',
      description: 'Robust filtration solutions for industrial applications'
    },
    {
      src: '/images/Construction.jpg',
      alt: 'Construction Equipment - Reliable filtration technology',
      title: 'Construction Equipment',
      description: 'Durable filters for construction and heavy machinery'
    },
    {
      src: '/images/Power-Energy.jpg',
      alt: 'Power & Energy - Advanced filtration systems',
      title: 'Power & Energy',
      description: 'Specialized filtration for power generation equipment'
    },
    {
      src: '/images/Cabin-Filter.jpg',
      alt: 'Cabin Filters - Clean air for passenger comfort',
      title: 'Cabin Filters',
      description: 'Ensure clean air quality in vehicle cabins'
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1);
  };

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
    { name: 'Air Filters', image: '/images/Air-Filters.jpeg', count: '40+' },
    { name: 'Fuel Filters', image: '/images/Fuel-Filter.jpg', count: '30+' },
    { name: 'Oil Filters', image: '/images/Oil-Filter.jpg', count: '50+' },
    { name: 'Hydraulic Return Filters', image: '/images/Hydraulic-Return-Filter.jpg', count: '25+' },
    { name: 'Coolant Filters', image: '/images/Coolant-Filter.jpg', count: '20+' },
    { name: 'Cabin Filters', image: '/images/Cabin-Filter.jpg', count: '15+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Moving Images */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${image.src}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.8) contrast(1.1) saturate(1.2)'
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto py-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 animate-fade-in-up leading-tight">
            Your Trusted Supplier For Machine Filtration
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-200 animate-fade-in-up max-w-4xl mx-auto">
            High-performance filters for oil, fuel, air, and hydraulics – trusted by professionals worldwide
          </p>
          
          {/* Current Image Info */}
          <div className="mb-8 animate-fade-in-up">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {heroImages[currentImageIndex].title}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
              {heroImages[currentImageIndex].description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center animate-fade-in-up max-w-2xl mx-auto">
            <Link to="/products" className="btn-primary text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-center">
              Shop Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 inline" />
            </Link>
            <Link to="/contact" className="btn-outline text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 md:py-4 border-white text-white hover:bg-white hover:text-gray-900 flex items-center justify-center">
              Request Quote
            </Link>
            <Link to="/contact" className="btn-secondary text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Explore Our Solutions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of filtration products and services designed for your industry needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 md:p-8 text-center"
              >
                <div className={`${link.color} w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {link.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">{link.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">{link.description}</p>
                <div className="flex items-center justify-center text-primary-600 font-medium group-hover:text-primary-700 text-sm md:text-base">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Why Choose Amazon Filtration?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              We deliver excellence through quality, expertise, and customer commitment
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4 md:p-6">
                <div className="flex justify-center mb-4 md:mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Our Product Categories
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive range of filtration solutions for every application
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={category.image}
                    alt={`${category.name} for industrial applications`}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300/1e40af/ffffff?text=${encodeURIComponent(category.name)}`;
                      console.log(`Failed to load image for ${category.name}: ${category.image}`);
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-xs md:text-sm text-gray-200 mb-3 md:mb-4">{category.count} Products Available</p>
                  <Link
                    to={`/products?category=${category.name}`}
                    className="inline-flex items-center text-primary-300 hover:text-primary-200 font-medium text-sm md:text-base"
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
      <section className="py-12 md:py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            Ready to Find Your Perfect Filtration Solution?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            Contact our experts today for personalized recommendations and competitive pricing
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              Get Free Quote
            </Link>
            <Link
              to="/products"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
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

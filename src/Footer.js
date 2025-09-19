import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'Oil Filters', path: '/products?category=Oil' },
      { name: 'Fuel Filters', path: '/products?category=Fuel' },
      { name: 'Air Filters', path: '/products?category=Air' },
      { name: 'Hydraulic Filters', path: '/products?category=Hydraulic' },
      { name: 'Coolant Filters', path: '/products?category=Coolant' },
      { name: 'Cabin Filters', path: '/products?category=Cabin' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Vision', path: '/vision' },
      { name: 'Services', path: '/services' },
      { name: 'Industries', path: '/industries' },
      { name: 'Support', path: '/support' },
      { name: 'Contact', path: '/contact' },
    ],
    support: [
      { name: 'FAQ', path: '/support#faq' },
      { name: 'Product Catalogs', path: '/support#catalogs' },
      { name: 'Technical Support', path: '/contact' },
      { name: 'Warranty', path: '/support#warranty' },
      { name: 'Distributor Locator', path: '/contact#distributors' },
    ],
  };

  return (
    <footer className="bg-industrial-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AF</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Amazon Filtration</h3>
                <p className="text-sm text-gray-300">(K) Ltd</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Reliable filtration solutions for machines and industry. High-performance filters 
              for oil, fuel, air, and hydraulics – trusted by professionals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Lokitang Road, Off Likoni Rd</p>
                  <p>Shed 18 – Kenya Industrial Estates</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>+254 720799363</p>
                  <p>+254 746751241</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <p className="text-sm text-gray-300">filterskenyaltd@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-industrial-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} Amazon Filtration (K) Ltd. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/support" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

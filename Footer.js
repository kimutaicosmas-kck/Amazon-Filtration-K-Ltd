import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Shield } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showAdminLink, setShowAdminLink] = useState(false);

  const footerLinks = {
    products: [
      { name: 'Oil Filters', path: '/products#category-oil-filters' },
      { name: 'Fuel Filters', path: '/products#category-fuel-filters' },
      { name: 'Air Filters', path: '/products#category-air-filters' },
      { name: 'Hydraulic Return Filters', path: '/products#category-hydraulic-return-filters' },
      { name: 'Coolant Filters', path: '/products#category-coolant-filters' },
      { name: 'Cabin Filters', path: '/products#category-cabin-filters' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Industries', path: '/industries' },
      { name: 'Contact', path: '/contact' },
    ],
  };

  return (
    <footer className="bg-black text-white border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo size="default" showText={true} variant="white" />
            <p className="amazon-text-muted text-sm leading-relaxed">
              Reliable filtration solutions for machines and industry. High-performance filters 
              for oil, fuel, air, and hydraulics – trusted by professionals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href={`https://wa.me/254714752613?text=${encodeURIComponent('Hello Amazon Filtration (K) Ltd')}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="WhatsApp">
                <svg viewBox="0 0 32 32" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                  <path d="M19.11 17.41c-.26-.13-1.55-.77-1.79-.86-.24-.09-.41-.13-.58.13-.17.26-.67.86-.82 1.04-.15.17-.3.2-.56.07-.26-.13-1.07-.39-2.05-1.24-.76-.68-1.27-1.52-1.42-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.39-.8-1.9-.21-.5-.42-.43-.58-.43-.15 0-.32-.02-.49-.02-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.13.17 1.81 2.77 4.39 3.89.61.26 1.08.41 1.45.53.61.19 1.16.16 1.6.1.49-.07 1.55-.63 1.77-1.25.22-.62.22-1.15.15-1.25-.06-.1-.24-.16-.5-.29z"/>
                  <path d="M16 3c-7.18 0-13 5.82-13 13 0 2.29.6 4.45 1.65 6.31L3 29l6.85-1.79C11.61 28.4 13.72 29 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23c-2.12 0-4.09-.62-5.75-1.68l-.41-.26-4.06 1.06 1.08-3.96-.27-.41C5.53 19.11 5 17.61 5 16 5 9.92 9.92 5 16 5s11 4.92 11 11-4.92 10-11 10z"/>
                </svg>
              </a>
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
                  <p>P.O BOX 3270-00506, NAIROBI</p>
                  <p>BELLWAY INDUSTRIAL PARK,EMBAKASI ROAD</p>
                  <p>OFF AIRPORT NORTH ROAD,EMBAKASI EAST CONSTITUENCY,NAIRO</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>+254 714752613</p>
                  <p>+254 720799363</p>
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
              {/* Hidden admin access - double click to reveal */}
              <span 
                className="ml-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-300"
                onDoubleClick={() => setShowAdminLink(!showAdminLink)}
                title="Double-click for Admin Access"
              >
                🔒
              </span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">
                Support
              </Link>
              {/* Hidden admin link */}
              {showAdminLink && (
                <Link to="/admin" className="text-red-400 hover:text-red-300 transition-colors flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

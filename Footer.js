import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
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
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' },
    ],
  };

  return (
    <footer className="af-site-footer text-white border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo size="default" showText={true} variant="white" />
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-500 mb-2">
              Plant, Embakasi, Nairobi
            </p>
            <p className="amazon-text-muted text-sm leading-relaxed">
              Filter manufacturer in Nairobi. Air, fuel, oil, and hydraulic lines for distributors,
              fleets, and industry across East Africa.
            </p>
            <a
              href={`https://wa.me/254714752613?text=${encodeURIComponent('Hello Amazon Filtration (K) Ltd')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              WhatsApp the plant
            </a>
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
                  <p>Bellway Industrial Park, Embakasi Road</p>
                  <p>Off Airport North Road, Embakasi East, Nairobi</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <a href="tel:+254714752613" className="block hover:text-white">+254 714 752 613</a>
                  <a href="tel:+254720799363" className="block hover:text-white">+254 720 799 363</a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:filterskenyaltd@gmail.com" className="text-sm text-gray-300 hover:text-white">filterskenyaltd@gmail.com</a>
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
              <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                Products
              </Link>
              <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                Careers
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
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

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [showAdminLink, setShowAdminLink] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle logo clicks for admin access
  const handleLogoClick = () => {
    setLogoClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowAdminLink(true);
        // Reset counter after 3 seconds
        setTimeout(() => {
          setLogoClickCount(0);
        }, 3000);
        return 0;
      }
      return newCount;
    });
  };

  const isProductsNavActive = (pathname) => pathname === '/products';

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Industries', path: '/industries' },
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
      <nav
        className={`af-site-nav sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'amazon-nav-scrolled' : ''
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
                {/* Logo */}
                <div 
                  onClick={handleLogoClick} 
                  className="af-nav-brand cursor-pointer"
                  title="Amazon Filtration (K) Ltd"
                >
                  <Logo size="default" showText={true} variant="onDark" />
                </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => {
                const active =
                  item.name === 'Products'
                    ? isProductsNavActive(location.pathname)
                    : item.name === 'Careers'
                      ? location.pathname.startsWith('/careers')
                      : location.pathname === item.path;
                return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`af-site-nav-link ${active ? 'is-active' : ''}`}
                >
                  {item.name}
                </Link>
              );
              })}
              {/* Hidden admin link */}
              {showAdminLink && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-5">
              <a href="tel:+254714752613" className="af-nav-phone">
                +254 714 752 613
              </a>
              <Link
                to="/contact"
                className="af-site-cta"
              >
                Get a quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/10"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden border-t border-white/10 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => {
                  const active =
                    item.name === 'Products'
                      ? isProductsNavActive(location.pathname)
                      : item.name === 'Careers'
                        ? location.pathname.startsWith('/careers')
                        : location.pathname === item.path;
                  return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`af-site-nav-link block py-2 ${active ? 'is-active' : ''}`}
                  >
                    {item.name}
                  </Link>
                );
                })}
                <div className="pt-4 border-t border-white/10">
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="af-site-cta w-full text-center block"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const publicUrl = () =>
  typeof window !== 'undefined' && window.__AMAZON_API_BASE__ !== undefined
    ? window.__AMAZON_API_BASE__
    : '';

const Logo = ({ className = "", showText = true, size = "default", variant = "default" }) => {
  const sizeClasses = {
    small: "w-20 h-10",
    default: "w-32 h-16", 
    large: "w-40 h-20"
  };

  const onDark = variant === 'onDark';
  const localLogoSrc = onDark ? `${publicUrl()}/images/logo-nav.png` : `${publicUrl()}/images/logo.png`;
  const fallbackLogoSrc = onDark
    ? 'https://amazonfiltration.co.ke/images/logo-nav.png'
    : 'https://amazonfiltration.co.ke/images/logo.png';
  const [logoSrc, setLogoSrc] = useState(localLogoSrc);
  const [logoUnavailable, setLogoUnavailable] = useState(false);

  return (
    <Link to="/" className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center justify-center ${variant === "white" ? "bg-white rounded-lg p-2 shadow-lg" : ""} ${onDark ? "af-nav-logo" : ""}`}>
        {!logoUnavailable ? (
          <img
            src={logoSrc}
            alt="Amazon Filtration (K) Ltd Logo"
            className="w-full h-full object-contain"
            onError={() => {
              if (logoSrc !== fallbackLogoSrc) {
                setLogoSrc(fallbackLogoSrc);
                return;
              }
              setLogoUnavailable(true);
            }}
          />
        ) : (
          <span className="text-white text-sm font-semibold tracking-wide">
            AMAZON
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;

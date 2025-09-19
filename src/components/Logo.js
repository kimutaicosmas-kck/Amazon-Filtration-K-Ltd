import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "", showText = true, size = "default", variant = "default" }) => {
  const sizeClasses = {
    small: "w-16 h-8",
    default: "w-24 h-12", 
    large: "w-32 h-16"
  };


  return (
    <Link to="/" className={`flex items-center space-x-3 ${className}`}>
      {/* Company Logo SVG */}
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <svg width="100%" height="100%" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* AF Letters with Diagonal Line */}
          <g transform="translate(10, 5)">
            {/* Letter A - Bold sans-serif */}
            <path d="M0 35 L12 5 L18 5 L30 35 L24 35 L21 27 L9 27 L6 35 Z M12 12 L18 12 L15 22 Z" fill={variant === "white" ? "white" : "black"} stroke={variant === "white" ? "white" : "black"} strokeWidth="0.5"/>
            
            {/* Letter F - Bold sans-serif */}
            <path d="M35 5 L35 35 L41 35 L41 20 L50 20 L50 14 L41 14 L41 5 Z" fill={variant === "white" ? "white" : "black"} stroke={variant === "white" ? "white" : "black"} strokeWidth="0.5"/>
            <path d="M35 5 L35 11 L50 11 L50 5 Z" fill={variant === "white" ? "white" : "black"} stroke={variant === "white" ? "white" : "black"} strokeWidth="0.5"/>
            
            {/* Diagonal Line - Thick line cutting through both letters */}
            <line x1="2" y1="8" x2="38" y2="32" stroke={variant === "white" ? "white" : "black"} strokeWidth="4" strokeLinecap="round"/>
          </g>
          
          {/* Company Name */}
          {showText && (
            <text x="90" y="50" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle" fill={variant === "white" ? "white" : "black"} letterSpacing="0.5px">
              AMAZON FILTRATION (K) LTD
            </text>
          )}
        </svg>
      </div>
    </Link>
  );
};

export default Logo;

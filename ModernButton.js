import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ModernButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  className = '',
  icon,
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    ghost: 'text-blue-600 hover:bg-blue-50',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-semibold rounded-lg transition-all duration-300
    focus:outline-none focus:ring-4 focus:ring-blue-200
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  return (
    <motion.button
      className={baseClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {icon && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </motion.button>
  );
};

export default ModernButton;

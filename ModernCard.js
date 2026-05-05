import React from 'react';
import { motion } from 'framer-motion';

const ModernCard = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false, 
  gradient = false,
  glass = false,
  ...props 
}) => {
  const baseClasses = `
    relative overflow-hidden rounded-xl transition-all duration-300
    ${glass ? 'glass-morphism' : 'bg-white shadow-lg'}
    ${gradient ? 'gradient-primary text-white' : ''}
    ${hover ? 'hover-lift hover:shadow-xl' : ''}
    ${glow ? 'hover-glow' : ''}
    ${className}
  `;

  return (
    <motion.div
      className={baseClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ModernCard;

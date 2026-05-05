import React from 'react';
import { motion } from 'framer-motion';

const AdvancedLoader = ({ 
  size = 'md', 
  variant = 'spinner',
  text = 'Loading...',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const SpinnerLoader = () => (
    <motion.div
      className={`${sizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const DotsLoader = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-blue-600 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );

  const PulseLoader = () => (
    <motion.div
      className={`${sizes[size]} bg-blue-600 rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1,
        repeat: Infinity
      }}
    />
  );

  const WaveLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="w-1 bg-blue-600 rounded-full"
          animate={{
            height: [20, 40, 20],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.1
          }}
        />
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      case 'wave':
        return <WaveLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      {renderLoader()}
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 text-sm font-medium"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
};

export default AdvancedLoader;

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatsCounter = ({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '', 
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <span className="text-4xl font-bold text-blue-600">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
    </motion.div>
  );
};

const StatsSection = () => {
  const stats = [
    { end: 20, prefix: '', suffix: '+', label: 'Years Experience' },
    { end: 500, prefix: '', suffix: '+', label: 'Products Available' },
    { end: 150, prefix: '', suffix: '+', label: 'Industries Served' },
    { end: 99, prefix: '', suffix: '%', label: 'Customer Satisfaction' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our numbers speak for themselves - delivering excellence in filtration solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <StatsCounter
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="block mb-4"
                />
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

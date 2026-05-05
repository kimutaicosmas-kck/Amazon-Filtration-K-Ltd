import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, Building, MessageSquare } from 'lucide-react';
import ModernButton from './ModernButton';

const ModernContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'product', label: 'Product Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'quote', label: 'Request Quote' },
    { value: 'partnership', label: 'Partnership' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600 mb-6">
          Thank you for your inquiry. We'll get back to you within 24 hours.
        </p>
        
        <ModernButton
          onClick={() => setIsSubmitted(false)}
          variant="outline"
        >
          Send Another Message
        </ModernButton>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600">
          Have a question or need a quote? We'd love to hear from you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <User className="w-4 h-4 mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your full name"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm flex items-center"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Mail className="w-4 h-4 mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm flex items-center"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Phone className="w-4 h-4 mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="+254 7XX XXX XXX"
            />
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Building className="w-4 h-4 mr-2" />
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Your company name"
            />
          </div>
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
              errors.subject ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Brief subject of your inquiry"
          />
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.subject}
            </motion.p>
          )}
        </div>

        {/* Inquiry Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Type of Inquiry
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            {inquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Please provide details about your inquiry..."
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm flex items-center"
            >
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <ModernButton
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
            icon={<Send className="w-5 h-5" />}
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </ModernButton>
        </div>
      </form>
    </motion.div>
  );
};

export default ModernContactForm;

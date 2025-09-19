import React, { useState } from 'react';
import { Download, FileText, HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: 'How often should I replace my oil filter?',
      answer: 'Oil filters should typically be replaced every 3,000 to 5,000 miles or every 3-6 months, depending on your vehicle and driving conditions. Heavy-duty vehicles may require more frequent changes.'
    },
    {
      question: 'What is the difference between OEM and aftermarket filters?',
      answer: 'OEM (Original Equipment Manufacturer) filters are made by the same company that built your vehicle, while aftermarket filters are made by third-party manufacturers. Both can be high quality, but OEM filters are specifically designed for your vehicle model.'
    },
    {
      question: 'How do I choose the right air filter for my vehicle?',
      answer: 'Check your vehicle\'s owner manual for the correct part number, or use our online filter finder tool. Consider your driving conditions - dusty environments may require more frequent changes.'
    },
    {
      question: 'What is your warranty policy?',
      answer: 'We offer a 12-month warranty on all our filters from the date of purchase. The warranty covers manufacturing defects and premature failure under normal operating conditions.'
    },
    {
      question: 'Do you offer bulk pricing for large orders?',
      answer: 'Yes, we offer competitive bulk pricing for orders over 100 units. Contact our sales team for a custom quote based on your specific requirements.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is processed, you will receive a tracking number via email. You can also log into your account on our website to check order status and tracking information.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and mobile money payments. For large orders, we also offer credit terms to qualified businesses.'
    },
    {
      question: 'Do you provide technical support?',
      answer: 'Yes, our technical team is available to help with product selection, installation guidance, and troubleshooting. Contact us via phone, email, or live chat for assistance.'
    }
  ];

  const resources = [
    {
      title: 'Product Catalog 2024',
      description: 'Complete catalog of all our filtration products with specifications and applications',
      type: 'PDF',
      size: '2.5 MB',
      downloads: '1,234'
    },
    {
      title: 'Installation Guide - Oil Filters',
      description: 'Step-by-step guide for proper oil filter installation and maintenance',
      type: 'PDF',
      size: '1.8 MB',
      downloads: '856'
    },
    {
      title: 'Technical Specifications',
      description: 'Detailed technical specifications for all filter categories',
      type: 'PDF',
      size: '3.2 MB',
      downloads: '642'
    },
    {
      title: 'Maintenance Schedule Template',
      description: 'Printable template for tracking filter maintenance schedules',
      type: 'Excel',
      size: '0.5 MB',
      downloads: '423'
    },
    {
      title: 'Warranty Information',
      description: 'Complete warranty terms and conditions for all products',
      type: 'PDF',
      size: '0.8 MB',
      downloads: '312'
    },
    {
      title: 'Safety Data Sheets',
      description: 'Safety information and handling procedures for all products',
      type: 'PDF',
      size: '1.2 MB',
      downloads: '189'
    }
  ];

  const blogPosts = [
    {
      title: '5 Signs Your Air Filter Needs Replacement',
      description: 'Learn to identify when your air filter is due for replacement to maintain optimal engine performance.',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: 'https://source.unsplash.com/400x250/?air-filter,car-maintenance'
    },
    {
      title: 'Understanding Hydraulic Filter Types',
      description: 'A comprehensive guide to different hydraulic filter types and their applications in industrial machinery.',
      date: 'March 10, 2024',
      readTime: '8 min read',
      image: 'https://source.unsplash.com/400x250/?hydraulic-filter,machine'
    },
    {
      title: 'Fuel Filter Maintenance Best Practices',
      description: 'Essential tips for maintaining fuel filters to prevent engine damage and ensure smooth operation.',
      date: 'March 5, 2024',
      readTime: '6 min read',
      image: 'https://source.unsplash.com/400x250/?fuel-filter,diesel'
    }
  ];

  const supportContacts = [
    {
      icon: <Phone className="w-6 h-6 text-primary-600" />,
      title: 'Phone Support',
      description: 'Speak directly with our technical experts',
      contact: '+254 720799363',
      hours: 'Mon-Fri: 8AM-5PM EAT'
    },
    {
      icon: <Mail className="w-6 h-6 text-primary-600" />,
      title: 'Email Support',
      description: 'Send us your questions and we\'ll respond within 24 hours',
      contact: 'filterskenyaltd@gmail.com',
      hours: '24/7 Response'
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary-600" />,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      contact: 'Available on website',
      hours: 'Mon-Fri: 9AM-4PM EAT'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Support & Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers, download resources, and get the help you need for all your filtration requirements
            </p>
          </div>
        </div>
      </div>

      {/* Support Contacts */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Help</h2>
            <p className="text-xl text-gray-600">Multiple ways to reach our support team</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  {contact.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.title}</h3>
                <p className="text-gray-600 mb-4">{contact.description}</p>
                <div className="text-primary-600 font-medium mb-2">{contact.contact}</div>
                <div className="text-sm text-gray-500">{contact.hours}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions about our products and services</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Download Center</h2>
            <p className="text-xl text-gray-600">Access product catalogs, guides, and technical documentation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-primary-600" />
                    <div>
                      <div className="text-sm font-medium text-primary-600">{resource.type}</div>
                      <div className="text-sm text-gray-500">{resource.size}</div>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{resource.downloads} downloads</span>
                  <button className="btn-primary text-sm py-2 px-4">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
            <p className="text-xl text-gray-600">Stay updated with filtration tips and industry insights</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.description}</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Still Need Help?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you with any questions or concerns
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              Contact Support
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;

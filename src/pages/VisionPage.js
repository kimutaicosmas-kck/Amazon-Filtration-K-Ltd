import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Heart, Globe, Users, Zap } from 'lucide-react';

const VisionPage = () => {
  const visionElements = [
    {
      icon: <Target className="w-12 h-12 text-primary-600" />,
      title: 'Our Vision',
      content: 'To be a global leader in innovative, sustainable, and reliable filtration solutions that power industries and protect machines worldwide.',
      highlight: 'Global Leadership'
    },
    {
      icon: <Eye className="w-12 h-12 text-primary-600" />,
      title: 'Our Mission',
      content: 'We deliver high-quality filtration products that extend machine life, reduce downtime, and ensure efficiency for our customers across diverse industries.',
      highlight: 'Quality Delivery'
    },
    {
      icon: <Heart className="w-12 h-12 text-primary-600" />,
      title: 'Our Purpose',
      content: 'To protect and enhance the performance of machinery and equipment through superior filtration technology, contributing to industrial efficiency and environmental sustainability.',
      highlight: 'Protection & Enhancement'
    }
  ];

  const values = [
    {
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: 'Innovation',
      description: 'We continuously invest in research and development to create cutting-edge filtration solutions that meet evolving industry needs.',
      details: [
        'Advanced filtration technology',
        'Custom engineering solutions',
        'Continuous improvement processes',
        'Future-ready product development'
      ]
    },
    {
      icon: <Target className="w-8 h-8 text-primary-600" />,
      title: 'Reliability',
      description: 'Our products and services are built on a foundation of trust, consistency, and dependability that our customers can count on.',
      details: [
        'Consistent product quality',
        'On-time delivery',
        'Proven performance',
        'Long-term partnerships'
      ]
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: 'Customer Focus',
      description: 'Every decision we make is guided by our commitment to exceeding customer expectations and building lasting relationships.',
      details: [
        'Customer-centric approach',
        'Personalized service',
        'Technical expertise',
        'Ongoing support'
      ]
    },
    {
      icon: <Globe className="w-8 h-8 text-primary-600" />,
      title: 'Sustainability',
      description: 'We are committed to environmental responsibility and sustainable business practices that benefit our planet and future generations.',
      details: [
        'Eco-friendly materials',
        'Energy-efficient processes',
        'Waste reduction initiatives',
        'Environmental compliance'
      ]
    },
    {
      icon: <Heart className="w-8 h-8 text-primary-600" />,
      title: 'Integrity',
      description: 'We conduct business with honesty, transparency, and ethical practices in all our interactions and operations.',
      details: [
        'Ethical business practices',
        'Transparent communication',
        'Fair pricing',
        'Honest relationships'
      ]
    }
  ];

  const goals = [
    {
      year: '2025',
      title: 'Market Expansion',
      description: 'Expand our presence across East Africa and establish partnerships with key distributors',
      progress: 60
    },
    {
      year: '2026',
      title: 'Product Innovation',
      description: 'Launch 20+ new filtration products and introduce smart filtration monitoring systems',
      progress: 30
    },
    {
      year: '2027',
      title: 'Sustainability Goals',
      description: 'Achieve carbon neutrality and implement 100% recyclable packaging across all products',
      progress: 15
    },
    {
      year: '2028',
      title: 'Global Reach',
      description: 'Establish operations in 5+ countries and become a recognized global filtration brand',
      progress: 5
    }
  ];

  const commitments = [
    {
      title: 'Quality Commitment',
      description: 'We maintain the highest standards of quality in every product we manufacture and every service we provide.',
      icon: <Target className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'Innovation Commitment',
      description: 'We continuously invest in research and development to stay at the forefront of filtration technology.',
      icon: <Zap className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'Customer Commitment',
      description: 'We are dedicated to providing exceptional customer service and building long-term partnerships.',
      icon: <Users className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'Environmental Commitment',
      description: 'We are committed to sustainable practices and environmental responsibility in all our operations.',
      icon: <Globe className="w-6 h-6 text-primary-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Vision
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Shaping the future of filtration technology through innovation, quality, and sustainability
            </p>
          </div>
        </div>
      </div>

      {/* Vision, Mission, Purpose */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {visionElements.map((element, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex justify-center mb-6">
                  {element.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{element.title}</h2>
                <div className="inline-block bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {element.highlight}
                </div>
                <p className="text-gray-600 leading-relaxed">{element.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide our actions and decisions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  {value.icon}
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">{value.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{value.description}</p>
                <ul className="space-y-2">
                  {value.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3 flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Goals */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Strategic Goals</h2>
            <p className="text-xl text-gray-600">Our roadmap for the future</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary-600">{goal.year}</div>
                  <div className="text-sm text-gray-500">{goal.progress}% Complete</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{goal.title}</h3>
                <p className="text-gray-600 mb-4">{goal.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Commitments */}
      <div className="bg-primary-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Commitments</h2>
            <p className="text-xl text-primary-100">What we promise to our customers and stakeholders</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {commitment.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">{commitment.title}</h3>
                    <p className="text-primary-100 leading-relaxed">{commitment.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Us in Shaping the Future
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of our journey as we continue to innovate and lead in the filtration industry
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary text-lg px-8 py-4"
            >
              Partner With Us
            </Link>
            <Link
              to="/about"
              className="btn-outline text-lg px-8 py-4"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionPage;

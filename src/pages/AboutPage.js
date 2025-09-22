import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Target, Shield, Globe, Heart } from 'lucide-react';

const AboutPage = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Amazon Filtration (K) Ltd was established with a vision to provide reliable filtration solutions'
    },
    {
      year: '2021',
      title: 'First Major Contract',
      description: 'Secured our first major automotive industry contract, establishing our market presence'
    },
    {
      year: '2022',
      title: 'ISO Certification',
      description: 'Achieved ISO 9001:2015 certification for quality management systems'
    },
    {
      year: '2023',
      title: 'Expansion',
      description: 'Expanded operations to serve construction and industrial sectors across Kenya'
    },
    {
      year: '2024',
      title: 'Future Growth',
      description: 'Planned expansion into East African markets and new product development'
    }
  ];

  const values = [
    {
      icon: <Shield className="w-12 h-12 text-primary-600" />,
      title: 'Quality',
      description: 'We maintain the highest standards of quality in all our products and services, ensuring reliability and performance.'
    },
    {
      icon: <Users className="w-12 h-12 text-primary-600" />,
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do. We build lasting relationships through exceptional service.'
    },
    {
      icon: <Target className="w-12 h-12 text-primary-600" />,
      title: 'Innovation',
      description: 'We continuously innovate to provide cutting-edge filtration solutions that meet evolving industry needs.'
    },
    {
      icon: <Globe className="w-12 h-12 text-primary-600" />,
      title: 'Sustainability',
      description: 'We are committed to environmental responsibility and sustainable business practices.'
    },
    {
      icon: <Heart className="w-12 h-12 text-primary-600" />,
      title: 'Integrity',
      description: 'We conduct business with honesty, transparency, and ethical practices in all our interactions.'
    }
  ];

  const team = [
    {
      name: 'Michael Kimaiyo',
      position: 'Managing Director',
      image: '/images/team/michael-kimaiyo.jpg',
      description: 'Over 15 years experience in filtration industry'
    },
    {
      name: 'Josphat Oleteipa',
      position: 'General Manager',
      image: '/images/team/josphat-oleteipa.jpg',
      description: 'Expert in operations management and business development'
    },
    {
      name: 'Harrison Maina',
      position: 'Sales Manager',
      image: '/images/team/harrison-maina.jpg',
      description: 'Specializes in sales strategy and customer relations'
    }
  ];

  const certifications = [
    { name: 'ISO 9001:2015', description: 'Quality Management System' },
    { name: 'ISO 14001:2015', description: 'Environmental Management' },
    { name: 'OHSAS 18001', description: 'Occupational Health & Safety' },
    { name: 'IATF 16949', description: 'Automotive Quality Management' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Amazon Filtration
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in filtration solutions, serving industries across Kenya and beyond
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, Amazon Filtration (K) Ltd emerged from a vision to provide reliable, 
                  high-quality filtration solutions to industries across Kenya. What started as a small 
                  operation has grown into a trusted partner for businesses in automotive, construction, 
                  agriculture, and industrial sectors.
                </p>
                <p>
                  Our journey began with a simple mission: to protect machines and equipment through 
                  superior filtration technology. Today, we serve over 500 clients across various 
                  industries, providing everything from standard filters to custom-engineered solutions.
                </p>
                <p>
                  Based in Kenya Industrial Estates, we have built our reputation on quality, reliability, 
                  and customer service. Our team of experienced professionals works tirelessly to ensure 
                  that every product meets the highest standards and every customer receives exceptional service.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/images/about/factory-facility.jpg"
                alt="Amazon Filtration manufacturing facility and team"
                className="rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/600x400/1e40af/ffffff?text=Factory+Facility`;
                  console.log(`Failed to load factory image: /images/about/factory-facility.jpg`);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our company's growth and development</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className={`bg-white p-6 rounded-lg shadow-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                    {index + 1}
                  </div>
                  <div className="w-1/2 px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The experts behind our success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.position}`}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x300/1e40af/ffffff?text=${encodeURIComponent(member.name)}`;
                    console.log(`Failed to load image for ${member.name}: ${member.image}`);
                  }}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & Standards</h2>
            <p className="text-xl text-gray-600">We maintain the highest standards of quality and compliance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Discover how our expertise and commitment to quality can benefit your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </Link>
            <Link
              to="/vision"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Our Vision
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
